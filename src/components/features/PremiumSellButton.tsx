'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './PremiumSellButton.module.css';

interface PremiumSellButtonProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
  variant?: 'gold' | 'white';
}

export default function PremiumSellButton({ href, className = '', children, variant = 'gold' }: PremiumSellButtonProps) {
  const router = useRouter();
  const [isClicking, setIsClicking] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsClicking(true);
    
    // Smooth transition matching animation duration
    setTimeout(() => {
      router.push(href);
    }, 400); 
  };

  const buttonClass = `${styles.button} ${variant === 'white' ? styles.buttonWhite : ''}`;
  const wrapperClass = `${styles.wrapper} ${className} ${isClicking ? styles.clicking : ''} ${variant === 'white' ? styles.wrapperWhite : ''}`;

  return (
    <div className={wrapperClass}>
      <button 
        className={buttonClass}
        onClick={handleClick}
      >
        <span className={styles.leftIcon}>
          {variant === 'gold' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
              <line x1="7" y1="7" x2="7.01" y2="7"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          )}
        </span>
        <span className={styles.text}>{children || "SELL YOUR GOLD"}</span>
        <span className={styles.arrowIcon}>→</span>
      </button>
    </div>
  );
}
