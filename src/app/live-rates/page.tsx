import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LiveMarketAnalysis from '@/components/LiveMarketAnalysis';
import ContactPanel from '@/components/ContactPanel';

export default function LiveRatesPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '80px', minHeight: '80vh' }}>
        <LiveMarketAnalysis />
        <div id="valuation-form">
          <ContactPanel />
        </div>
      </main>
      <Footer />
    </>
  );
}
