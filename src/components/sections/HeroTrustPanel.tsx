import React from 'react';
import styles from './HeroTrustPanel.module.css';

const benefits = [
  {
    title: "100%",
    subtitle: "Secure Process",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    )
  },
  {
    title: "Best Market",
    subtitle: "Price",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v12M15 9.5H10.5a2.5 2.5 0 0 0 0 5H14a2.5 2.5 0 0 1 0 5H9"/>
      </svg>
    )
  },
  {
    title: "Instant",
    subtitle: "Payment",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    )
  },
  {
    title: "100%",
    subtitle: "Hallmarked Gold",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/>
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    )
  }
];

export default function HeroTrustPanel() {
  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        {benefits.map((item, index) => (
          <React.Fragment key={index}>
            <div className={styles.item}>
              <div className={styles.iconWrapper}>
                {item.icon}
              </div>
              <div className={styles.textWrapper}>
                <span className={styles.itemTitle}>{item.title}</span>
                <span className={styles.itemSubtitle}>{item.subtitle}</span>
              </div>
            </div>
            {index < benefits.length - 1 && <div className={styles.divider} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
