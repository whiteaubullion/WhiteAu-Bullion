import React from 'react';
import Header from '@/components/Header';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import TrustLayer from '@/components/TrustLayer';
import ContactPanel from '@/components/ContactPanel';
import HeroCardsAndMarket from '@/components/HeroCardsAndMarket';
import WhyWhiteAuCards from '@/components/WhyWhiteAuCards';
import ValuationFeature from '@/components/ValuationFeature';
import WhatWeBuy from '@/components/WhatWeBuy';
import SellGoldSection from '@/components/SellGoldSection';
import ReleaseGoldSection from '@/components/ReleaseGoldSection';

import Founder from '@/components/Founder';
import BranchInfo from '@/components/BranchInfo';
import PremiumSellButton from '@/components/PremiumSellButton';

import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <Header />
      
      <main>
        <section className={styles.heroSection}>
          <div className={styles.heroLayout}>
            {/* Center Content Panel */}
            <div className={`${styles.heroContentPanel} animate-fade-in-up`}>
              <div style={{ marginTop: '4rem', marginBottom: '2rem' }}>
                <Logo variant="mark" iconColor="#EAA221" size={90} />
              </div>
              <h1 className={styles.heroTitle}>Your Gold<br/>Deserves Better.</h1>

              <div className={styles.heroButtons}>
                <PremiumSellButton href="/sell-gold">SELL YOUR GOLD</PremiumSellButton>
              </div>
            </div>
          </div>
        </section>

        <HeroCardsAndMarket />

        <TrustLayer />
        <ContactPanel />
        <WhatWeBuy />
        <SellGoldSection />
        <ReleaseGoldSection />
        <WhyWhiteAuCards />

        <Founder />
        <BranchInfo />
      </main>

      <Footer />
    </>
  );
}
