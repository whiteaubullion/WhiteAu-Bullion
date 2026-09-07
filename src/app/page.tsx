import React from 'react';
import Header from '@/components/layout/Header';
import Logo from '@/components/layout/Logo';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import TrustLayer from '@/components/sections/TrustLayer';

import HeroCardsAndMarket from '@/components/sections/HeroCardsAndMarket';
import WhyWhiteAuCards from '@/components/sections/WhyWhiteAuCards';
import ValuationFeature from '@/components/features/ValuationFeature';
import Testimonials from '@/components/sections/Testimonials';
import SellGoldSection from '@/components/sections/SellGoldSection';
import ReleaseGoldSection from '@/components/sections/ReleaseGoldSection';

import Founder from '@/components/sections/Founder';
import BranchInfo from '@/components/features/BranchInfo';
import PremiumSellButton from '@/components/features/PremiumSellButton';
import BackgroundMarquee from '@/components/ui/BackgroundMarquee';

import styles from './page.module.css';
import HeroTrustPanel from '@/components/sections/HeroTrustPanel';

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
