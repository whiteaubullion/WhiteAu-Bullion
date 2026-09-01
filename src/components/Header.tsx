'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import styles from './Header.module.css';

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const lastScrollY = React.useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 30);
      if (currentY > lastScrollY.current && currentY > 80) {
        setHidden(true);   // scrolling down → hide
      } else {
        setHidden(false);  // scrolling up → show
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/', label: 'HOME' },
    { href: '/live-rates', label: 'LIVE RATES' },
    { href: '/sell-gold', label: 'SELL GOLD' },
    { href: '/contact', label: 'SUPPORT' },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${hidden ? styles.hidden : ''}`}>
      <div className={styles.pill}>
        {/* Logo */}
        <Link href="/" className={styles.logoLink}>
          <Logo variant="secondary" />
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.nav}>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.navLink} ${pathname === href ? styles.active : ''}`}
            >
              {label}
              {pathname === href && (
                <span className={styles.activeIndicator}>
                  <span className={styles.activeDot} />
                  <span className={styles.activeLine} />
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link href="/#valuation" className={styles.headerCta}>
          Get a Valuation <span className={styles.arrow}>↗</span>
        </Link>

        {/* Mobile hamburger */}
        <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
          <Link href="/#valuation" className={styles.mobileCta} onClick={() => setMenuOpen(false)}>
            Get a Valuation ↗
          </Link>
        </div>
      )}
    </header>
  );
}
