import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactPanel from '@/components/sections/ContactPanel';
import ReleaseGoldSection from '@/components/sections/ReleaseGoldSection';

export const metadata = {
  title: 'Release Pledged Gold | WhiteAu Bullion',
  description: 'Release Your Gold Loan in Nine Easy Steps. Simple, transparent, and secure.',
};

export default function ReleaseGold() {
  return (
    <>
      <Header />
      
      <main style={{ paddingTop: '80px' }}>
        <ContactPanel />
        <ReleaseGoldSection />
      </main>

      <Footer />
    </>
  );
}
