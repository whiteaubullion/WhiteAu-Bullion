'use client';
import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import styles from '@/app/contact/page.module.css';

export default function BuyGoldButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi WhiteAu, I want to buy gold.\n\nName: ${name}\nPhone: ${phone}\nDetails: ${details}`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/917012288794?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
    setIsModalOpen(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        style={{
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
          textTransform: 'uppercase'
        }}
      >
        <span style={{ 
          display: 'inline-block', 
          width: '7px', 
          height: '7px', 
          borderRadius: '50%', 
          backgroundColor: '#d4af37', 
          boxShadow: '0 0 8px #d4af37' 
        }}></span>
        BUY GOLD
      </button>

      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'transparent',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          padding: '1rem'
        }} onClick={() => setIsModalOpen(false)}>
          <div style={{
            backgroundColor: '#ffffff',
            padding: '2rem 2.5rem',
            borderRadius: '16px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '500px',
            position: 'relative'
          }} onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              &times;
            </button>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#000', fontFamily: 'var(--font-serif)' }}>Buy Gold Enquiry</h3>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="buy-name">Name</label>
                <input type="text" id="buy-name" placeholder="Your Name" required value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="buy-phone">Phone</label>
                <input type="tel" id="buy-phone" placeholder="Your Phone Number" required value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="buy-details">Buy Details</label>
                <textarea id="buy-details" rows={3} placeholder="Tell us what you are looking for..." required value={details} onChange={e => setDetails(e.target.value)}></textarea>
              </div>
              <Button variant="primary">Submit Details</Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
