import React from 'react';
import styles from './BranchInfo.module.css';

export default function BranchInfo() {
  return (
    <section className={styles.branchSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.contentSide}>
          <h2 className={styles.title}>
            Our Flagship <span className={styles.highlight}>Branch</span>
          </h2>
          <p className={styles.description}>
            Visit our secure, state-of-the-art valuation center in Cherthala for instant, transparent gold testing and immediate payouts.
          </p>
        </div>

        <div className={styles.cardSide}>
          <div className={styles.branchCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className={styles.badge}>Open Now</div>
            </div>

            <div className={styles.cardBody}>
              <h3 className={styles.branchName}>WhiteAu Bullion Pvt Ltd</h3>
              <p className={styles.branchAddress}>
                Poonjikkavil, S N Puram P.O.,<br />
                Cherthala, Kerala — 688582
              </p>

              <div className={styles.contactInfo}>
                <div className={styles.infoRow}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.infoIcon}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>8129359933</span>
                </div>
                <div className={styles.infoRow}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.infoIcon}>
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>Mon-Sat: 10:00 AM - 7:00 PM</span>
                </div>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <span className={styles.footerLabel}>Main Branch</span>
              <a 
                href="https://maps.google.com/?q=WhiteAu+Bullion+Pvt+Ltd+Cherthala+Kerala" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.directionsLink}
              >
                Get Directions
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
