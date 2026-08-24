import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.brandCol}>
          <Logo variant="secondary" />
          <p className={styles.tagline}>Your Trusted Gold Partner</p>
        </div>
        
        <div className={styles.linksCol}>
          <h4 className="font-serif">Quick Links</h4>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/sell-gold">Sell Gold</Link>
            <Link href="/release-gold">Release Gold</Link>
            <Link href="/why-whiteau">Why WhiteAu</Link>
            <Link href="/faqs">FAQs</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </nav>
        </div>
        
        <div className={styles.contactCol}>
          <h4 className="font-serif">Contact</h4>
          <p>
            WhiteAu Bullion Pvt Ltd<br/>
            Poonjikkavil, S N Puram P.O.,<br/>
            Cherthala, Kerala — 688582
          </p>
          <p>
            <a href="tel:+917012288794">+91 70122 88794</a><br/>
            <a href="mailto:sairajpr.whiteau@gmail.com">sairajpr.whiteau@gmail.com</a>
          </p>
        </div>
      </div>
      <div className={`container ${styles.copy}`}>
        <div className="thin-gold-line" style={{ marginBottom: '2rem', opacity: 0.3 }}></div>
        <p>&copy; 2026 WhiteAu Bullion Pvt Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
}
