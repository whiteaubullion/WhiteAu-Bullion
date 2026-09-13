'use client';
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './LiveMarketAnalysis.module.css';

interface RateData {
  title: string;
  purity: string;
  price: string;
  change: string;
  isUp: boolean;
}

export default function LiveMarketAnalysis() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "center center"]
  });
  
  // Animate from a small card-like shape at the top (near the Best Value card) to full size
  const scale = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.5, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [-150, 0]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["40px", "24px"]);

  const [rates, setRates] = useState<RateData[]>([
    { title: '24K GOLD', purity: '(99.9%)', price: '₹7,613', change: '−₹61', isUp: false },
    { title: '22K GOLD', purity: '(91.6%)', price: '₹6,978', change: '−₹56', isUp: false },
    { title: '18K GOLD', purity: '(75.0%)', price: '₹5,710', change: '−₹45', isUp: false }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <section className="section-padding" ref={containerRef}>
      <div className="container">
        <motion.div 
          className={styles.analysisContainer}
          style={{ 
            scale, 
            opacity, 
            y,
            borderRadius,
            transformOrigin: "center top"
          }}
        >
          <div className={styles.header}>
            <div>
              <h2 className={styles.title}>Get the White Au Gold Rate</h2>
              <p className={styles.subtitle}>Share your details below to know today’s latest rate.</p>
              <button className={styles.getRateBtn}>GET GOLD RATE</button>
            </div>
          </div>

          <div className={styles.grid}>
            {rates.map((rate, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardTitle}>
                    {rate.title} <span>{rate.purity}</span>
                  </div>
                  <div className={styles.statusDot}></div>
                </div>
                
                <div className={styles.cardBody}>
                  <div className={styles.priceContainer}>
                    <span className={loading ? styles.skeleton : styles.price}>{rate.price}</span>
                    <span className={styles.perGram}>per gram</span>
                  </div>
                  
                  <div className={styles.changeContainer}>
                    <div className={`${styles.changeTag} ${rate.isUp ? styles.up : styles.down}`}>
                      {rate.isUp ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>
                      )}
                      <span className={loading ? styles.skeletonText : ''}>{rate.change}</span>
                    </div>
                    <span className={styles.vsYesterday}>vs yesterday</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
