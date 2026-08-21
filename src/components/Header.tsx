import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerInner}`}>
        <Link href="/" className={styles.logoLink}>
          <Logo variant="secondary" color="#000000" />
        </Link>
        
        <nav className={styles.nav}>
          <Link href="/">HOME</Link>
          <Link href="/live-rates">LIVE RATES</Link>
          <Link href="/sell-gold">SELL GOLD</Link>
          <Link href="/buy-gold">BUY GOLD</Link>
          <Link href="/contact">SUPPORT</Link>
        </nav>
        
        <div className={styles.navCta}>
          <Link href="/#valuation" className={styles.headerCta}>
            Get a Valuation <span className={styles.arrow}>→</span>
          </Link>
        </div>
        
      </div>
    </header>
  );
}
