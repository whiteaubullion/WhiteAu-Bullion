import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactPanel from '@/components/ContactPanel';
import ReleaseGoldSection from '@/components/ReleaseGoldSection';

export const metadata = {
  title: 'Release Pledged Gold | WhiteAu Bullion',
  description: 'Release Your Gold Loan in Eight Easy Steps. Simple, transparent, and secure.',
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
