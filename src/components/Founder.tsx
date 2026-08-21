import React from 'react';
import styles from './Founder.module.css';

export default function Founder() {
  return (
    <section className={`section-padding ${styles.founderSection}`}>
      <div className={`container ${styles.founderContainer}`}>
        <div className={styles.founderImage}>
          <div className={styles.imagePlaceholder}>
            <div className={styles.goldAccent}></div>
          </div>
        </div>
        <div className={styles.founderContent}>
          <h2>Building a Better Way to Sell Gold.</h2>
          <div className={styles.founderDetails}>
            <h3>SAIRAJ P R</h3>
            <p>FOUNDER</p>
          </div>
        </div>
      </div>
    </section>
  );
}
