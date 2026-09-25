import React from 'react';
import styles from './LiveRatesPanel.module.css';

export type RateData = {
  price: number;
  fluctuation: number; // Positive or negative vs yesterday
};

export type LiveRatesProps = {
  rates: {
    '24K_GOLD'?: RateData;
    '22K_GOLD'?: RateData;
    '18K_GOLD'?: RateData;
    '14K_GOLD'?: RateData;
  };
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 1,
  }).format(price).replace('₹', '₹');
};

const formatFluctuation = (value: number) => {
  const isPositive = value > 0;
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 1,
  }).format(absValue).replace('₹', '₹');

  if (isPositive) return `📈 +${formatted}`;
  if (isNegative) return `📉 -${formatted}`;
  return `➖ ${formatted}`;
};

export default function LiveRatesPanel({ rates }: LiveRatesProps) {
  const items = [
    { key: '24K_GOLD', label: '24K GOLD (99.9%)' },
    { key: '22K_GOLD', label: '22K GOLD (91.6%)' },
    { key: '18K_GOLD', label: '18K GOLD (75.0%)' },
    { key: '14K_GOLD', label: '14K GOLD (58.5%)' },
  ] as const;

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h2 className={styles.title}>Live Market Analysis</h2>
          <p className={styles.subtitle}>Real-time gold price fluctuation over the last 24 hours</p>
        </div>
        <div className={styles.liveBadge}>24H LIVE</div>
      </div>

      <div className={styles.grid}>
        {items.map(({ key, label }) => {
          const data = rates[key] || { price: 0, fluctuation: 0 };
          const isUp = data.fluctuation > 0;
          const isDown = data.fluctuation < 0;
          const pillClass = isUp ? styles.up : isDown ? styles.down : styles.neutral;

          return (
            <div key={key} className={styles.card}>
              <div className={styles.statusDot} />
              <div className={styles.rateInfo}>
                <span className={styles.itemName}>{label}</span>
                <div className={styles.priceGroup}>
                  <span className={styles.price}>{data.price > 0 ? formatPrice(data.price) : '---'}</span>
                  <span className={styles.unit}>per gram</span>
                </div>
              </div>
              
              <div className={styles.fluctuationBox}>
                {data.price > 0 && (
                  <>
                    <span className={`${styles.pill} ${pillClass}`}>
                      {formatFluctuation(data.fluctuation)}
                    </span>
                    <span className={styles.vsText}>vs yesterday</span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
