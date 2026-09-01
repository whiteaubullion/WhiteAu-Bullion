import React from 'react';
import Header from '@/components/Header';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import TrustLayer from '@/components/TrustLayer';

import HeroCardsAndMarket from '@/components/HeroCardsAndMarket';
import WhyWhiteAuCards from '@/components/WhyWhiteAuCards';
import ValuationFeature from '@/components/ValuationFeature';
import Testimonials from '@/components/Testimonials';
import SellGoldSection from '@/components/SellGoldSection';
import ReleaseGoldSection from '@/components/ReleaseGoldSection';

import Founder from '@/components/Founder';
import BranchInfo from '@/components/BranchInfo';
import PremiumSellButton from '@/components/PremiumSellButton';
import BackgroundMarquee from '@/components/BackgroundMarquee';

import styles from './page.module.css';
import HeroTrustPanel from '@/components/HeroTrustPanel';

export default function Home() {
  return (
    <>
      <Header />
      
      <main>
        <section className={styles.heroSection}>
          <div className={styles.heroLayout}>
            {/* Center Content Panel */}
            <div className={`${styles.heroContentPanel} animate-fade-in-up`}>
              <div className={styles.goldBarWrapper}>
                <img
                  src="/goldbar.png"
                  alt="WhiteAu Gold Bar"
                  className={styles.goldBarImage}
                />
              </div>

              <h1 className={styles.heroTitle}>
                India's Most Trusted<br/>Gold Buying Partner
              </h1>

              <div className={styles.heroTagline}>
                <span className={styles.taglineDivider}>✦</span>
                <span>TRUSTED · TRANSPARENT · REWARDING</span>
                <span className={styles.taglineDivider}>✦</span>
              </div>

              <div className={styles.heroButtons}>
                <PremiumSellButton href="/sell-gold">SELL YOUR GOLD</PremiumSellButton>
                <PremiumSellButton href="/release-gold" variant="white">RELEASE GOLD</PremiumSellButton>
              </div>
            </div>
          </div>
        </section>

        <HeroCardsAndMarket />

        <TrustLayer />
        <div className={styles.lowerFixedGradient}>
          <BackgroundMarquee />
          
          <div style={{ position: 'relative', zIndex: 2 }}>
            <Testimonials />
            <SellGoldSection />
            <ReleaseGoldSection />
            <WhyWhiteAuCards />

            <Founder />
            <BranchInfo />
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}
