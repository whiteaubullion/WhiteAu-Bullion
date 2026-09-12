import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactPanel from '@/components/sections/ContactPanel';
import SellGoldSection from '@/components/sections/SellGoldSection';

export const metadata = {
  title: 'Sell Gold | WhiteAu Bullion',
  description: 'Sell Gold with WhiteAu in Seven Easy Steps. Simple, transparent, and secure.',
};

export default function SellGold() {
  return (
    <>
      <Header />
      
      <main style={{ paddingTop: '80px' }}>
        <ContactPanel type="sell" />
        <SellGoldSection />
      </main>

      <Footer />
    </>
  );
}
