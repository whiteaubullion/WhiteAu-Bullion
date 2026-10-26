'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './PageLoader.module.css';

export default function PageLoader() {
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        return !!sessionStorage.getItem('whiteau_loaded');
      } catch {
        return false;
      }
    }
    return false;
  });

  useEffect(() => {
    if (hidden) return;

    try {
      sessionStorage.setItem('whiteau_loaded', 'true');
    } catch {
      // ignore
    }

    // Keep loader visible for ~1.1s, then fade out smoothly
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        setHidden(true);
      }, 700);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`${styles.loaderOverlay} ${fading ? styles.fadeOut : ''}`}
      style={{ display: hidden ? 'none' : 'flex' }}
      aria-hidden={hidden}
    >
      {/* Warm champagne / gold ambient glow */}
      <div className={styles.ambientGlow} />

      <div className={styles.content}>
        {/* WhiteAu Gold Bar Floating Showcase */}
        <div className={styles.goldBarWrapper}>
          <div className={styles.auraRing} />
          <Image
            src="/goldbar.webp"
            alt="WhiteAu Gold Bar"
            width={240}
            height={240}
            priority
            className={styles.goldBarImage}
          />
        </div>

        {/* Brand Typography */}
        <div className={styles.brandGroup}>
          <h1 className={styles.brandTitle}>WhiteAu</h1>
        </div>

        {/* Golden Minimalist Progress Indicator */}
        <div className={styles.progressContainer}>
          <div className={styles.progressBar} />
        </div>
      </div>
    </div>
  );
}
