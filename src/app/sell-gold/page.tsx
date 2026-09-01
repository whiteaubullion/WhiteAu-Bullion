import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactPanel from '@/components/ContactPanel';
import SellGoldSection from '@/components/SellGoldSection';

export const metadata = {
  title: 'Sell Gold | WhiteAu Bullion',
  description: 'Sell Gold with WhiteAu in Seven Easy Steps. Simple, transparent, and secure.',
};

export default function SellGold() {
  return (
    <>
      <Header />
      
      <main style={{ paddingTop: '80px' }}>
        <ContactPanel />
        <SellGoldSection />
      </main>

      <Footer />
    </>
  );
}
