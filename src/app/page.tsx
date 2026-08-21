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
              <h1 className={styles.heroTitle}>Your Gold<br/>Deserves Better.</h1>

              <div className={styles.heroButtons}>
                <Button href="/sell-gold" variant="primary" className={styles.heroBtn}>SELL YOUR GOLD</Button>
                <Button href="/buy-gold" className={`${styles.heroBtn} ${styles.heroBtnGlass}`}>BUY GOLD</Button>
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
