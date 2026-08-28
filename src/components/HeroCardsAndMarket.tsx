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
                id="valuation-form"
                style={{ width: '100%', maxWidth: '850px', margin: '0 auto', background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.6)', borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'row', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)' }}
                initial={{ borderRadius: 40 }}
                transition={{ layout: { duration: 0.4, ease: "easeInOut" } }}
                className={marketStyles.analysisContainer}
              >
                
                {/* Text Side (from ContactPanel) */}
                <motion.div style={{ flex: 1, padding: '2rem', background: 'linear-gradient(135deg, rgba(234, 162, 33, 0.1) 0%, rgba(255, 255, 255, 0) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.3 } }} exit={{ opacity: 0, transition: { duration: 0.1 } }}>
                  <h2 style={{ fontFamily: 'var(--font-libre-baskerville)', fontSize: '1.8rem', color: 'var(--color-black)', marginBottom: '1rem', lineHeight: 1.2 }}>Know What Your Gold Is Worth.</h2>
                  <p style={{ color: 'var(--color-gold)', fontWeight: 600, marginBottom: '2rem', fontSize: '0.95rem' }}>
                    Purity + Weight + Gold Rate = Transparent Valuation
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {[
                      { title: 'Purity', desc: 'Professional gold testing determines the verified purity.' },
                      { title: 'Weight', desc: 'Precision weighing determines the net gold weight.' },
                      { title: 'Rate', desc: 'The applicable gold rate is clearly communicated before the transaction.' }
                    ].map((item, idx) => (
                      <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.5)', border: '1px solid rgba(255, 255, 255, 0.7)', padding: '0.75rem 1rem', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--color-gold)', borderRadius: '50%' }}></div>
                          <h3 style={{ fontFamily: 'var(--font-libre-baskerville)', color: 'var(--color-black)', fontSize: '1.1rem', margin: 0 }}>{item.title}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Form Side */}
                <motion.div style={{ flex: 1, padding: '2rem', background: 'rgba(255, 255, 255, 0.6)' }} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.3 } }} exit={{ opacity: 0, transition: { duration: 0.1 } }}>
                  <form onSubmit={(e) => { e.preventDefault(); alert('Thank you! Our executive will contact you shortly.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label htmlFor="name" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-black)' }}>Full Name</label>
                      <input type="text" id="name" placeholder="Enter your name" required style={{ padding: '0.75rem 1rem', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.8)', fontFamily: 'var(--font-montserrat), sans-serif', fontSize: '0.95rem', color: 'var(--color-black)' }} />
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label htmlFor="phone" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-black)' }}>Phone Number</label>
                      <input type="tel" id="phone" placeholder="Enter your phone number" required style={{ padding: '0.75rem 1rem', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.8)', fontFamily: 'var(--font-montserrat), sans-serif', fontSize: '0.95rem', color: 'var(--color-black)' }} />
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label htmlFor="service" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-black)' }}>I want to</label>
                      <select id="service" style={{ padding: '0.75rem 1rem', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.8)', fontFamily: 'var(--font-montserrat), sans-serif', fontSize: '0.95rem', color: 'var(--color-black)' }}>
                        <option value="sell">Sell Gold</option>
                        <option value="release">Release Pledged Gold</option>
                        <option value="other">General Enquiry</option>
                      </select>
                    </div>
                    
                    <button type="submit" style={{ marginTop: '0.5rem', backgroundColor: 'var(--color-gold)', color: 'var(--color-black)', border: 'none', padding: '1rem', borderRadius: '12px', fontSize: '0.95rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer' }}>
                      Request Call Back
                    </button>
                  </form>
                </motion.div>

              </motion.div>
            )}
          </AnimatePresence>
      </div>
      </LayoutGroup>
    </div>
  );
}
