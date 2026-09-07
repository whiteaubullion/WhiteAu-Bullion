import React from 'react';
import styles from './GoldRateBanner.module.css';

export default function GoldRateBanner() {
  // In a real implementation, you'd fetch this from an API
  const mockRate = "₹7,250";
  const mockTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={styles.bannerWrapper}>
      <div className={`container ${styles.bannerInner}`}>
        <span className={styles.label}>TODAY'S 24K GOLD RATE</span>
        <span className={styles.rate}>{mockRate}</span>
        <span className={styles.time}>UPDATED {mockTime}</span>
      </div>
    </div>
  );
}
