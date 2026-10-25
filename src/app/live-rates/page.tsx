import React from 'react';
import { createClient } from '@/utils/supabase/server';
import LiveRatesPanel, { RateData } from '@/components/features/LiveRatesPanel';
import ContactPanel from '@/components/sections/ContactPanel'; // Reuse existing contact panel if suitable
import { redirect } from 'next/navigation';

// Fallback rates based on actual market rates if DB takes too long or is sleeping
const mockRates: Record<string, RateData> = {
  '24K_GOLD': { price: 15691, fluctuation: 0 },
  '22K_GOLD': { price: 14379, fluctuation: 0 },
  '18K_GOLD': { price: 11881, fluctuation: 0 },
  '14K_GOLD': { price: 9230, fluctuation: 0 },
};

export const metadata = {
  title: 'Live Market Analysis | WhiteAu Bullion',
  description: 'Real-time gold and silver price fluctuation over the last 24 hours.',
};

function withTimeout<T>(promise: PromiseLike<T> | Promise<T>, ms: number = 2500): Promise<T> {
  return Promise.race([
    Promise.resolve(promise),
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error('TIMEOUT')), ms))
  ])
}

export const dynamic = 'force-dynamic';

export default async function LiveRatesPage() {
  let rates = mockRates;
  let userProfile = null;

  try {
    const supabase = await createClient();
    
    // Check customer session cookie or supabase user
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    const customerCookie = cookieStore.get('whiteau_customer_session')?.value
    let customerData = null
    if (customerCookie) {
      try {
        customerData = JSON.parse(customerCookie)
      } catch (e) {
        // invalid cookie
      }
    }

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user && !customerData) {
      redirect('/login');
    }

    if (customerData) {
      userProfile = {
        full_name: customerData.fullName,
        email: customerData.email,
        phone_number: customerData.phone,
        visit_count: customerData.visitCount
      };
    } else if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      userProfile = profile;
    }
    
    // Fetch the active rates with a fast timeout so page loads instantly
    const { data: rawRates, error }: any = await withTimeout(
      supabase
        .from('gold_rates')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(20)
    ).catch(err => ({ data: null, error: err }));

    if (!error && rawRates && rawRates.length > 0) {
      const processedRates: Record<string, RateData> = {};
      const itemTypes = ['24K_GOLD', '22K_GOLD', '18K_GOLD', '14K_GOLD'];
      
      itemTypes.forEach(type => {
        const itemRates = rawRates.filter((r: any) => r.gold_type === type);
        if (itemRates.length > 0) {
          const currentPrice = Number(itemRates[0].rate_per_gram);
          
          processedRates[type] = {
            price: currentPrice,
            fluctuation: 0 // Optional: Calculate from history
          };
        }
      });
      
      if (Object.keys(processedRates).length > 0) {
        rates = processedRates;
      }
    }
  } catch (err) {
    console.error('Failed to fetch live rates', err);
  }

  return (
    <main style={{ minHeight: '100vh', paddingTop: '120px', backgroundColor: 'transparent' }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0.85rem 1.25rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '1.5rem',
        backgroundColor: 'rgba(255, 253, 248, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(201, 148, 46, 0.25)',
        borderRadius: '9999px',
        boxShadow: '0 4px 20px rgba(74, 46, 24, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ display: 'inline-block', width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }}></span>
          <h2 style={{ color: '#2F2117', fontSize: '1.1rem', fontWeight: '700', letterSpacing: '-0.01em', margin: 0, fontFamily: 'var(--font-cormorant), serif' }}>
            Welcome, <span style={{ color: '#8a5d1b' }}>{userProfile?.full_name || 'Valued Client'}</span>
          </h2>
        </div>
        <form action="/auth/signout" method="post" style={{ margin: 0 }}>
          <button 
            type="submit" 
            style={{ 
              padding: '0.45rem 1.25rem', 
              backgroundColor: '#2F2117', 
              color: '#ffffff', 
              border: 'none', 
              borderRadius: '9999px', 
              cursor: 'pointer', 
              fontSize: '0.8rem', 
              fontWeight: '700',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              boxShadow: '0 2px 8px rgba(47, 33, 23, 0.2)',
              transition: 'all 0.2s ease'
            }}
          >
            Sign Out
          </button>
        </form>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <LiveRatesPanel rates={rates} />
      </div>
      
      <div style={{ height: '80px' }} />
      <ContactPanel />
    </main>
  );
}

