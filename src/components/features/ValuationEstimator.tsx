'use client';

import React, { useState } from 'react';
import styles from './ValuationEstimator.module.css';

export default function ValuationEstimator() {
  const [weight, setWeight] = useState<string>('');
  const [purity, setPurity] = useState<number>(24);

  // Mock rates per gram
  const rates: Record<number, number> = {
    24: 7250,
    22: 6645,
    20: 6041,
    18: 5437,
  };

  const estimatedValue = (parseFloat(weight || '0') * rates[purity]).toLocaleString('en-IN', {
    maximumFractionDigits: 0,
  });

  return (
    <div className={`glass-card ${styles.card}`}>
      <h3 className="font-serif">Know What Your Gold Is Worth</h3>
      
      <div className={styles.inputGroup}>
        <div className={styles.inputField}>
          <label htmlFor="weight">Gold Weight (grams)</label>
          <input
            type="number"
            id="weight"
            placeholder="e.g. 10"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            min="0"
            step="0.1"
          />
        </div>
        
        <div className={styles.inputField}>
          <label htmlFor="purity">Purity</label>
          <select
            id="purity"
            value={purity}
            onChange={(e) => setPurity(Number(e.target.value))}
          >
            <option value={24}>24K</option>
            <option value={22}>22K</option>
            <option value={20}>20K</option>
            <option value={18}>18K</option>
          </select>
        </div>
      </div>
      
      <div className={styles.outputArea}>
        <span className={styles.outputLabel}>Estimated Value</span>
        <div className={styles.outputValue}>
          ₹ {estimatedValue}
        </div>
      </div>
      
      <p className={styles.disclaimer}>
        This is an indicative estimate. Final valuation is done in person using certified testing equipment.
      </p>
    </div>
  );
}
