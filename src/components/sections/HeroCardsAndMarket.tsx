'use client';

import React from 'react';
import { motion } from 'framer-motion';
import marketStyles from '../features/LiveMarketAnalysis.module.css';

export default function HeroCardsAndMarket() {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 0', position: 'relative', zIndex: 20 }}>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ width: '100%', maxWidth: '850px', margin: '0 auto', background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.6)', borderRadius: '24px', overflow: 'hidden', display: 'flex', flexWrap: 'wrap', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)' }}
          className={marketStyles.analysisContainer}
        >
          {/* Text Side */}
          <div style={{ flex: 1, minWidth: '300px', padding: '2.5rem', background: 'linear-gradient(135deg, rgba(234, 162, 33, 0.1) 0%, rgba(255, 255, 255, 0) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2rem', color: 'var(--color-black)', marginBottom: '1rem', lineHeight: 1.2 }}>Know What Your Gold Is Worth.</h2>
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
                    <h3 style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--color-black)', fontSize: '1.2rem', margin: 0 }}>{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <div style={{ flex: 1, minWidth: '300px', padding: '2.5rem', background: 'rgba(255, 255, 255, 0.6)' }}>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you! Our executive will contact you shortly.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', height: '100%', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label htmlFor="name" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-black)' }}>Full Name</label>
                <input type="text" id="name" placeholder="Enter your name" required style={{ padding: '0.85rem 1rem', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.8)', fontFamily: 'var(--font-montserrat), sans-serif', fontSize: '0.95rem', color: 'var(--color-black)', outline: 'none' }} />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label htmlFor="phone" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-black)' }}>Phone Number</label>
                <input type="tel" id="phone" placeholder="Enter your phone number" required style={{ padding: '0.85rem 1rem', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.8)', fontFamily: 'var(--font-montserrat), sans-serif', fontSize: '0.95rem', color: 'var(--color-black)', outline: 'none' }} />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label htmlFor="service" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-black)' }}>I want to</label>
                <select id="service" style={{ padding: '0.85rem 1rem', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.8)', fontFamily: 'var(--font-montserrat), sans-serif', fontSize: '0.95rem', color: 'var(--color-black)', outline: 'none' }}>
                  <option value="sell">Sell Gold</option>
                  <option value="release">Release Pledged Gold</option>
                  <option value="other">General Enquiry</option>
                </select>
              </div>
              
              <button type="submit" style={{ marginTop: '0.5rem', backgroundColor: 'var(--color-gold)', color: 'var(--color-black)', border: 'none', padding: '1rem', borderRadius: '12px', fontSize: '0.95rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                Request Call Back
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
