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
        <span className={styles.text}>{children || "SELL YOUR GOLD"}</span>
        
        {/* Layered Geometric Frame (Inner) */}
        <span className={styles.innerFrame}></span>

        {/* Outer Extending Decorative Lines */}
        <span className={styles.lineTop}></span>
        <span className={styles.lineRight}></span>
        <span className={styles.lineBottom}></span>
        <span className={styles.lineLeft}></span>
      </button>
    </div>
  );
}
