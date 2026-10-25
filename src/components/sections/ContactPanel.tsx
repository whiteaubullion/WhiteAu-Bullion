'use client';
import React, { useState } from 'react';
import styles from './ContactPanel.module.css';

type ContactPanelProps = {
  type?: 'sell' | 'release' | 'buy' | 'all';
};

export default function ContactPanel({ type = 'all' }: ContactPanelProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: type === 'all' ? 'sell' : (type as string),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for actual form submission logic
    alert('Thank you! Our executive will contact you shortly.');
  };

  const isBuy = type === 'buy';

  return (
    <section className="section-padding">
      <div className="container">
        <div className={styles.panelContainer}>
          <div className={styles.contentSide}>
            <h2 className={styles.title}>
              {isBuy ? 'Buy Gold from WhiteAu' : 'Get the WhiteAu Gold Rate'}
            </h2>
            <p className={styles.subtitle} style={{ color: 'var(--color-gold)', fontWeight: 600, marginBottom: '2.5rem' }}>
              {isBuy ? 'Share your details below to book at today’s latest rate.' : 'Share your details below to know today’s latest rate.'}
            </p>
            
            <div className={styles.valuationGrid}>
              <div className={styles.valuationItem}>
                <div className={styles.itemHeader}>
                  <div className={styles.itemDot}></div>
                  <h3>Purity</h3>
                </div>
                <p>{isBuy ? 'Imported 999-purity certified gold bars (99.9% pure gold).' : 'Professional gold testing determines the verified purity.'}</p>
              </div>
              
              <div className={styles.valuationItem}>
                <div className={styles.itemHeader}>
                  <div className={styles.itemDot}></div>
                  <h3>{isBuy ? 'Pricing' : 'Weight'}</h3>
                </div>
                <p>{isBuy ? 'Competitive market rates inclusive of GST with clear price breakdown.' : 'Precision weighing determines the net gold weight.'}</p>
              </div>
              
              <div className={styles.valuationItem}>
                <div className={styles.itemHeader}>
                  <div className={styles.itemDot}></div>
                  <h3>{isBuy ? 'Delivery' : 'Rate'}</h3>
                </div>
                <p>{isBuy ? 'Secure destination courier delivery or convenient branch collection.' : 'The applicable gold rate is clearly communicated before the transaction.'}</p>
              </div>
            </div>
          </div>
          
          <div className={styles.formSide}>
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Full Name</label>
                <input 
                  type="text" 
                  id="name"
                  className={styles.input}
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>Phone Number</label>
                <input 
                  type="tel" 
                  id="phone"
                  className={styles.input}
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  inputMode="numeric"
                  maxLength={15}
                  onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="service" className={styles.label}>I want to</label>
                <select 
                  id="service"
                  className={styles.select}
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                >
                  <option value="sell">Sell Gold</option>
                  <option value="release">Release Pledged Gold</option>
                  <option value="pledge">Pledge Gold</option>
                  <option value="buy">Buy Gold</option>
                </select>
              </div>
              
              <button type="submit" className={styles.submitBtn}>
                {formData.service === 'buy' ? 'ENQUIRE BUY GOLD' : 'GET GOLD RATE'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
