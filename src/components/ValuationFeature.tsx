import React from 'react';
import Link from 'next/link';
import Button from './Button';
import styles from './ValuationFeature.module.css';

export default function ValuationFeature() {
  return (
    <section className="section-padding" id="valuation">
      <div className="container">
        
        {/* Main Valuation Card */}
        <div className={`premium-card ${styles.mainCard}`}>
          <div className={styles.header}>
            <h2 className={styles.title}>Know What Your Gold Is Worth.</h2>
            <p className={styles.subtitle}>Purity + Weight + Gold Rate = Transparent Valuation</p>
          </div>
          
          <div className={styles.formulaGrid}>
            <div className={styles.formulaCard}>
              <h3>Purity</h3>
              <p>Professional gold testing determines the verified purity.</p>
            </div>
            <div className={styles.plusIcon}>+</div>
            <div className={styles.formulaCard}>
              <h3>Weight</h3>
              <p>Precision weighing determines the net gold weight.</p>
            </div>
            <div className={styles.plusIcon}>+</div>
            <div className={styles.formulaCard}>
              <h3>Rate</h3>
              <p>The applicable gold rate is clearly communicated before the transaction.</p>
            </div>
          </div>
          
          <div className={styles.ctaWrapper}>
            <Link href="/sell-gold" className={styles.textCta}>
              Understand Your Gold <span>→</span>
            </Link>
          </div>
        </div>

        {/* Free Valuation Horizontal Card */}
        <div className={`premium-card dark ${styles.horizontalCta}`}>
          <div className={styles.ctaContent}>
            <h2>Curious What Your Gold Is Worth?</h2>
            <p>Get your gold evaluated and understand its potential value before proceeding.</p>
          </div>
          <div className={styles.ctaButton}>
            <Button href="/contact" variant="glass">Get a Free Valuation <span style={{marginLeft: '0.5rem'}}>→</span></Button>
          </div>
          <div className={styles.goldDust1}></div>
          <div className={styles.goldDust2}></div>
        </div>

      </div>
    </section>
  );
}
