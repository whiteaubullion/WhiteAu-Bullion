'use client';
import React from 'react';
import styles from './BackgroundMarquee.module.css';

export default function BackgroundMarquee() {
  return (
    <div className={styles.stickyWrapper}>
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack}>
          <span>WHITEAU BULLION • INDIA'S MOST TRUSTED GOLD BUYER • </span>
          <span>WHITEAU BULLION • INDIA'S MOST TRUSTED GOLD BUYER • </span>
          <span>WHITEAU BULLION • INDIA'S MOST TRUSTED GOLD BUYER • </span>
          <span>WHITEAU BULLION • INDIA'S MOST TRUSTED GOLD BUYER • </span>
          <span>WHITEAU BULLION • INDIA'S MOST TRUSTED GOLD BUYER • </span>
          <span>WHITEAU BULLION • INDIA'S MOST TRUSTED GOLD BUYER • </span>
          <span>WHITEAU BULLION • INDIA'S MOST TRUSTED GOLD BUYER • </span>
          <span>WHITEAU BULLION • INDIA'S MOST TRUSTED GOLD BUYER • </span>
        </div>
      </div>
    </div>
  );
}
