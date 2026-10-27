'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './PageLoader.module.css';

export default function PageLoader() {
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Show quick premium intro for ~950ms, then smoothly fade out
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 950);

    // Completely unmount after fade transition finishes (~1450ms)
    const hideTimer = setTimeout(() => {
      setHidden(true);
    }, 1450);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div 
      className={`${styles.loaderOverlay} ${fading ? styles.fadeOut : ''}`}
      aria-hidden={fading}
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
