'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, LayoutGroup } from 'framer-motion';
import styles from '@/app/page.module.css';
import marketStyles from './LiveMarketAnalysis.module.css';

interface RateData {
  title: string;
  purity: string;
  price: string;
  change: string;
  isUp: boolean;
}

export default function HeroCardsAndMarket() {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // When user scrolls down ~100px, trigger the expansion
    if (latest > 100 && !isExpanded) {
      setIsExpanded(true);
    } else if (latest <= 100 && isExpanded) {
      setIsExpanded(false);
    }
  });

  const [rates] = useState<RateData[]>([
    { title: '24K GOLD', purity: '(99.9%)', price: '₹7,613', change: '−₹61', isUp: false },
    { title: '22K GOLD', purity: '(91.6%)', price: '₹6,978', change: '−₹56', isUp: false },
    { title: '18K GOLD', purity: '(75.0%)', price: '₹5,710', change: '−₹45', isUp: false },
    { title: 'SILVER', purity: '(99.9%)', price: '₹91', change: '+₹0.5', isUp: true }
  ]);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <LayoutGroup>
        
        {/* The 3 hero cards */}
        <div className={`container ${styles.overlapCardsContainer}`}>
          <AnimatePresence>
            {!isExpanded && (
              <motion.div 
                className={styles.overlapCardBrown}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.cardIconRound}>✓</div>
                <div>
                  <h4>100% Transparent</h4>
                  <div className={styles.cardStars}>★★★★★</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* The morphing middle slot */}
          <div style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <AnimatePresence mode="popLayout">
              {!isExpanded && (
                <motion.div 
                  layoutId="market-morph"
                  className={styles.overlapCardCream}
                  style={{ width: '100%', margin: 0 }}
                  initial={{ borderRadius: 16 }}
                  transition={{ layout: { duration: 0.4, ease: "easeInOut" } }}
                >
                  <motion.div className={styles.cardIconBox} exit={{ opacity: 0, transition: { duration: 0.1 } }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-black)" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  </motion.div>
                  <motion.div exit={{ opacity: 0, transition: { duration: 0.1 } }}>
                    <h4>Best Value</h4>
                    <p>Live market rates for maximum return.</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <AnimatePresence>
            {!isExpanded && (
              <motion.div 
                className={styles.overlapCardBrown}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <h4 style={{fontSize: '2rem', marginBottom: '0.5rem'}}>10,000+</h4>
                <p>Customers served securely.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* The big market analysis section */}
        <div style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 0', position: 'relative', zIndex: 20 }}>
          <AnimatePresence mode="popLayout">
            {isExpanded && (
              <motion.div 
                layoutId="market-morph"
                className={marketStyles.analysisContainer}
                style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', backgroundColor: 'var(--color-cream)' }}
                initial={{ borderRadius: 40 }}
                transition={{ layout: { duration: 0.4, ease: "easeInOut" } }}
              >
              <motion.div className={marketStyles.header} layoutId="market-header" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.3 } }} exit={{ opacity: 0, transition: { duration: 0.1 } }}>
                <div>
                  <h2 className={marketStyles.title}>Live Market Analysis</h2>
                  <p className={marketStyles.subtitle}>Real-time gold price fluctuation over the last 24 hours</p>
                </div>
                <div className={marketStyles.liveBadge}>
                  <span className={marketStyles.pulseDot}></span>
                  24H LIVE
                </div>
              </motion.div>

              <motion.div className={marketStyles.grid} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.3 } }} exit={{ opacity: 0, transition: { duration: 0.1 } }}>
                {rates.map((rate, index) => (
                  <div key={index} className={marketStyles.card}>
                    <div className={marketStyles.cardHeader}>
                      <div className={marketStyles.cardTitle}>
                        {rate.title} <span>{rate.purity}</span>
                      </div>
                      <div className={marketStyles.statusDot}></div>
                    </div>
                    
                    <div className={marketStyles.cardBody}>
                      <div className={marketStyles.priceContainer}>
                        <span className={marketStyles.price}>{rate.price}</span>
                        <span className={marketStyles.perGram}>per gram</span>
                      </div>
                      
                      <div className={marketStyles.changeContainer}>
                        <div className={`${marketStyles.changeTag} ${rate.isUp ? marketStyles.up : marketStyles.down}`}>
                          {rate.isUp ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                          ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>
                          )}
                          <span>{rate.change}</span>
                        </div>
                        <span className={marketStyles.vsYesterday}>vs yesterday</span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </LayoutGroup>
    </div>
  );
}
