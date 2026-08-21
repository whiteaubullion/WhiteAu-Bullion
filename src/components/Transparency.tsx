import React from 'react';
import styles from './Transparency.module.css';

export default function Transparency() {
  return (
    <>
      <section className="section-padding" style={{backgroundColor: 'var(--color-cream)'}}>
        <div className="container">
          <div className={styles.transparencyHeader}>
            <h2>Everything Clear. From Start to Finish.</h2>
          </div>
          
          <div className={styles.transparencyGrid}>
            <div className={`premium-card ${styles.tCard}`}>
              <h3>Clear Rates</h3>
              <p>Know the applicable gold rate before proceeding with your transaction.</p>
            </div>
            <div className={`premium-card ${styles.tCard}`}>
              <h3>No Hidden Surprises</h3>
              <p>Applicable charges and transaction terms are communicated clearly upfront.</p>
            </div>
            <div className={`premium-card ${styles.tCard}`}>
              <h3>Secure Payment</h3>
              <p>Payment is transferred directly to your bank account with complete transparency.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={`section-padding ${styles.processSection}`}>
        <div className={`container ${styles.processContainer}`}>
          <div className={styles.processLeft}>
            <h2>No Guesswork.<br/>No Confusion.<br/>Just Clarity.</h2>
            <p>Our Process, Your Peace of Mind.</p>
          </div>
          
          <div className={styles.processRight}>
            <div className={`${styles.overlappingCard} ${styles.card1}`}>
              <span className={styles.cardNumber}>01</span>
              <div>
                <h3>Test</h3>
                <p>Professional purity testing.</p>
              </div>
            </div>
            <div className={`${styles.overlappingCard} ${styles.card2}`}>
              <span className={styles.cardNumber}>02</span>
              <div>
                <h3>Value</h3>
                <p>Clear valuation based on purity and weight.</p>
              </div>
            </div>
            <div className={`${styles.overlappingCard} ${styles.card3}`}>
              <span className={styles.cardNumber}>03</span>
              <div>
                <h3>Pay</h3>
                <p>Secure payment directly to your bank account.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
