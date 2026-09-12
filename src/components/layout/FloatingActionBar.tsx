'use client';
import React from 'react';
import Link from 'next/link';
import styles from './FloatingActionBar.module.css';

export default function FloatingActionBar() {
  return (
    <div className={styles.floatingBarContainer}>
      <Link href="/contact" className={styles.itemGroup}>
        <svg xmlns="http://www.w3.org/O" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        Find Nearest Branch
      </Link>
      
      <Link href="/live-rates" className={`${styles.itemGroup} ${styles.goldRateGroup}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
        Live Gold Rate
      </Link>

      <Link href="/sell-gold" className={`${styles.actionButton} ${styles.sellGold}`}>
        Sell Gold
      </Link>

      <Link href="/release-gold" className={`${styles.actionButton} ${styles.releaseGold}`}>
        Release Gold
      </Link>

      <div style={{ color: '#52525b', padding: '0 0.25rem' }}>⋮</div>

      <a href="https://wa.me/919590704444" target="_blank" rel="noopener noreferrer" className={`${styles.iconButton} ${styles.whatsappButton}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
      </a>

      <a href="tel:+919590704444" className={styles.phoneGroup}>
        +91 95907 04444
      </a>
    </div>
  );
}
