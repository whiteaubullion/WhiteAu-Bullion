'use client';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Button from '@/components/ui/Button';
import styles from '@/app/contact/page.module.css';

export default function BuyGoldButton({
  className,
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
} = {}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState('50');

  const QUANTITY_OPTIONS = [
    20, 25, 30, 35, 40, 45, 50,
    100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800,
    850, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450, 1500,
    1550, 1600, 1650, 1700, 1750, 1800, 1850, 1900, 1950, 2000, 2050, 2100, 2150,
    2200, 2250, 2300, 2350, 2400, 2450, 2500, 2550, 2600, 2650, 2700, 2750, 2800,
    2850, 2900, 2950, 3000, 3050, 3100, 3150, 3200, 3250, 3300, 3350, 3400, 3450,
    3500, 3550, 3600, 3650, 3700, 3750, 3800, 3850, 3900, 3950, 4000, 4050, 4100,
    4150, 4200, 4250, 4300, 4350, 4400, 4450, 4500, 4550, 4600, 4650, 4700, 4750,
    4800, 4850, 4900, 4950, 5000
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi WhiteAu, I want to buy gold.\n\nName: ${name}\nPhone: ${phone}\nQuantity: ${quantity} Grams`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/917012288794?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
    setIsModalOpen(false);
  };

  return (
    <>
      <button 
        type="button"
        onClick={() => setIsModalOpen(true)}
        className={className}
        style={className ? style : {
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.22) 0%, rgba(245, 215, 110, 0.12) 100%)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(212, 175, 55, 0.45)',
          color: '#4e342e',
          padding: '0.5rem 1.4rem',
          borderRadius: '9999px',
          fontWeight: '700',
          textDecoration: 'none',
          letterSpacing: '0.1em',
          boxShadow: '0 4px 15px rgba(212, 175, 55, 0.15)',
          transition: 'all 0.3s ease',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.45rem',
          fontSize: '0.75rem',
          cursor: 'pointer',
          textTransform: 'uppercase',
          ...style
        }}
      >
        {!className && (
          <span style={{ 
            display: 'inline-block', 
            width: '7px', 
            height: '7px', 
            borderRadius: '50%', 
            backgroundColor: '#d4af37', 
            boxShadow: '0 0 8px #d4af37' 
          }}></span>
        )}
        {children || 'BUY GOLD'}
      </button>

      {isModalOpen && mounted && createPortal(
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(26, 16, 8, 0.6)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999999,
            padding: '1.25rem',
            overflowY: 'auto',
          }} 
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            style={{
              backgroundColor: '#ffffff',
              padding: '2.25rem 2rem',
              borderRadius: '24px',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.25)',
              width: '100%',
              maxWidth: '480px',
              position: 'relative',
              margin: 'auto',
              animation: 'fadeInScale 0.25s ease-out',
            }} 
            onClick={e => e.stopPropagation()}
          >
            <button 
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(0, 0, 0, 0.05)',
                border: 'none',
                fontSize: '1.25rem',
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#4e342e',
                transition: 'background 0.2s',
              }}
            >
              &times;
            </button>

            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ 
                fontSize: '0.75rem', 
                fontWeight: 700, 
                letterSpacing: '0.14em', 
                color: 'var(--color-gold, #c9942e)', 
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.35rem'
              }}>
                WhiteAu Bullion
              </span>
              <h3 style={{ 
                fontSize: '1.75rem', 
                color: '#2a1a0f', 
                fontFamily: 'var(--font-serif)', 
                margin: 0,
                fontWeight: 700
              }}>
                Buy Gold Enquiry
              </h3>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="buy-name">Full Name</label>
                <input 
                  type="text" 
                  id="buy-name" 
                  placeholder="e.g. Rahul Sharma" 
                  required 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="buy-phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="buy-phone" 
                  placeholder="e.g. +91 98765 43210" 
                  required 
                  value={phone} 
                  onChange={e => setPhone(e.target.value)} 
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="buy-quantity">Quantity (in Grams)</label>
                <select 
                  id="buy-quantity" 
                  value={quantity} 
                  onChange={e => setQuantity(e.target.value)}
                  required
                >
                  {QUANTITY_OPTIONS.map((grams) => (
                    <option key={grams} value={grams}>
                      {grams} Grams {grams >= 1000 ? `(${(grams / 1000).toFixed(grams % 1000 === 0 ? 0 : 2)} kg)` : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginTop: '0.5rem' }}>
                <Button variant="primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Send Enquiry via WhatsApp ↗
                </Button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
