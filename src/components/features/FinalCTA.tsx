import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import styles from './FinalCTA.module.css';

export default function FinalCTA() {
  return (
    <section className="section-padding" style={{backgroundColor: 'var(--color-cream)'}}>
      <div className="container">
        <div className={`premium-card ${styles.ctaCard}`}>
          <div className={styles.ctaContent}>
            <h2>Ready to Know What Your Gold Is Worth?</h2>
            <div className={styles.buttons}>
              <Button href="/sell-gold" variant="primary">Sell Your Gold</Button>
              <Button href="/release-gold" variant="secondary">Release Pledged Gold</Button>
            </div>
            <div className={styles.secondaryAction}>
              <Link href="/contact" className={styles.talkLink}>Talk to WhiteAu <span>→</span></Link>
            </div>
          </div>
          <div className={styles.ctaVisual}>
            <div className={styles.visualCircle}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
