import React from 'react';
import { createClient } from '@/utils/supabase/server';
import LiveRatesPanel, { RateData } from '@/components/features/LiveRatesPanel';
import ContactPanel from '@/components/sections/ContactPanel'; // Reuse existing contact panel if suitable

// Fallback mock data based on the design provided
const mockRates: Record<string, RateData> = {
  '24K_GOLD': { price: 15691, fluctuation: -59 },
  '22K_GOLD': { price: 14379, fluctuation: -51 },
  '18K_GOLD': { price: 11881, fluctuation: -39 },
  'SILVER': { price: 234, fluctuation: 16.5 },
};

export const metadata = {
  title: 'Live Market Analysis | WhiteAu Bullion',
  description: 'Real-time gold and silver price fluctuation over the last 24 hours.',
};

export default async function LiveRatesPage() {
  let rates = mockRates;

  try {
    const supabase = await createClient();
    
    // Fetch the latest 10 ACTIVE rates
    const { data: rawRates, error } = await supabase
      .from('gold_rates')
      .select('*')
      .eq('status', 'ACTIVE')
      .order('effective_at', { ascending: false })
      .limit(10);

    if (!error && rawRates && rawRates.length > 0) {
      const processedRates: Record<string, RateData> = {};
      const itemTypes = ['24K_GOLD', '22K_GOLD', '18K_GOLD', 'SILVER'];
      
      itemTypes.forEach(type => {
        const itemRates = rawRates.filter(r => r.item_type === type);
        if (itemRates.length > 0) {
          const currentPrice = Number(itemRates[0].rate_value);
          let fluctuation = 0;
          
          if (itemRates.length > 1) {
            const previousPrice = Number(itemRates[1].rate_value);
            fluctuation = currentPrice - previousPrice;
          }
          
          processedRates[type] = {
            price: currentPrice,
            fluctuation: fluctuation
          };
        }
      });
      
      if (Object.keys(processedRates).length > 0) {
        rates = processedRates;
      }
    }
  } catch (err) {
    console.error('Failed to fetch live rates, using mock data fallback', err);
  }

  return (
    <main style={{ minHeight: '100vh', paddingTop: '120px', backgroundColor: 'var(--primary-dark)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
        <form action="/auth/signout" method="post">
          <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: 'rgba(212, 175, 55, 0.1)', border: '1px solid var(--color-gold)', color: 'var(--color-gold)', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 'bold' }}>
            Sign Out
          </button>
        </form>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <LiveRatesPanel rates={rates} />
      </div>
      
      {/* Adding some spacing before footer or other sections */}
      <div style={{ height: '80px' }} />
      <ContactPanel />
    </main>
  );
}
