import React from 'react';
import { createClient } from '@/utils/supabase/server';
import LiveRatesPanel, { RateData } from '@/components/features/LiveRatesPanel';
import ContactPanel from '@/components/sections/ContactPanel'; // Reuse existing contact panel if suitable
import { redirect } from 'next/navigation';

// Fallback mock data based on the design provided
const mockRates: Record<string, RateData> = {
  '24K_GOLD': { price: 0, fluctuation: 0 },
  '22K_GOLD': { price: 0, fluctuation: 0 },
  '18K_GOLD': { price: 0, fluctuation: 0 },
  '14K_GOLD': { price: 0, fluctuation: 0 },
};

export const metadata = {
  title: 'Live Market Analysis | WhiteAu Bullion',
  description: 'Real-time gold and silver price fluctuation over the last 24 hours.',
};

export const dynamic = 'force-dynamic';

export default async function LiveRatesPage() {
  let rates = mockRates;
  let userProfile = null;

  try {
    const supabase = await createClient();
    
    // Make sure user is authenticated and get their profile
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      redirect('/login');
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
      
    userProfile = profile;
    
    // Fetch the active rates
    const { data: rawRates, error } = await supabase
      .from('gold_rates')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(20);

    if (!error && rawRates && rawRates.length > 0) {
      const processedRates: Record<string, RateData> = {};
      const itemTypes = ['24K_GOLD', '22K_GOLD', '18K_GOLD', '14K_GOLD'];
      
      itemTypes.forEach(type => {
        const itemRates = rawRates.filter(r => r.gold_type === type);
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
    <main style={{ minHeight: '100vh', paddingTop: '120px', backgroundColor: 'var(--primary-dark)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ color: 'white', fontSize: '1.25rem' }}>Welcome, {userProfile?.full_name || 'User'}</h2>
        <form action="/auth/signout" method="post">
          <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: 'rgba(212, 175, 55, 0.1)', border: '1px solid var(--color-gold)', color: 'var(--color-gold)', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 'bold' }}>
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

