'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './PageLoader.module.css';

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Show smooth luxury loader on initial entry / refresh
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        setLoading(false);
      }, 700);
    }, 1700);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className={`${styles.loaderOverlay} ${fading ? styles.fadeOut : ''}`}>
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
