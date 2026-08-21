import React from 'react';
import styles from './TrustLayer.module.css';

const trustPoints = [
  "Transparent Valuation",
  "Professional Testing",
  "Secure KYC",
  "Direct Bank Transfer",
  "Free Gold Valuation",
  "Customer-First Service"
];

export default function TrustLayer() {
  return (
    <div className={styles.trustLayer}>
      <div className={styles.marquee}>
        <div className={styles.marqueeContent}>
          {trustPoints.map((point, index) => (
            <div key={index} className={styles.trustCard}>
              <span className={styles.dot}></span> {point}
            </div>
          ))}
          {/* Duplicate for seamless looping */}
          {trustPoints.map((point, index) => (
            <div key={`dup-${index}`} className={styles.trustCard}>
              <span className={styles.dot}></span> {point}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
