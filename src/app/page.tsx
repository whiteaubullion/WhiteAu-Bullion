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

              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', marginTop: '0.5rem', position: 'relative', zIndex: 10 }}>
                <a 
                  href="/live-rates" 
                  style={{ 
                    padding: '0.5rem 1.5rem', 
                    borderRadius: '9999px', 
                    background: 'rgba(255, 255, 255, 0.15)', 
                    backdropFilter: 'blur(12px)', 
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)', 
                    color: 'var(--color-gold)', 
                    fontWeight: 'bold', 
                    fontSize: '0.95rem', 
                    textDecoration: 'none', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)' 
                  }}
                >
                  <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }}></span>
                  <span style={{ 
                    letterSpacing: '0.1em', 
                    textTransform: 'uppercase', 
                    color: '#4e342e', /* Dark brown similar to the image */
                    fontSize: '0.75rem' /* Reduced text size */
                  }}>
                    Our Rate
                  </span>
                </a>
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
            <SellGoldSection />
            <ReleaseGoldSection />
            <WhyWhiteAuCards />

            <Founder />
            <Testimonials />
            <BranchInfo />
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}
