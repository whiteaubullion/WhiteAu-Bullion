import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BuyGoldSection from '@/components/sections/BuyGoldSection';

export const metadata = {
  title: 'Buy Gold | WhiteAu Bullion',
  description: 'Buy Imported 999-Purity Gold Bars from WhiteAu in Seven Easy Steps. Trusted, transparent, and rewarding.',
};

export default function BuyGoldPage() {
  return (
    <>
      <Header />
      
      <main style={{ paddingTop: '80px' }}>
        <BuyGoldSection showContactPanel={true} />
      </main>

      <Footer />
    </>
  );
}
