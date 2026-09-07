'use client';
import React, { useState } from 'react';
import styles from './ContactPanel.module.css';

export default function ContactPanel() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'sell',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for actual form submission logic
    alert('Thank you! Our executive will contact you shortly.');
  };

  return (
    <section className="section-padding">
      <div className="container">
        <div className={styles.panelContainer}>
          <div className={styles.contentSide}>
            <h2 className={styles.title}>Know What Your Gold Is Worth.</h2>
            <p className={styles.subtitle} style={{ color: 'var(--color-gold)', fontWeight: 600, marginBottom: '2.5rem' }}>
              Purity + Weight + Gold Rate = Transparent Valuation
            </p>
            
            <div className={styles.valuationGrid}>
              <div className={styles.valuationItem}>
                <div className={styles.itemHeader}>
                  <div className={styles.itemDot}></div>
                  <h3>Purity</h3>
                </div>
                <p>Professional gold testing determines the verified purity.</p>
              </div>
              
              <div className={styles.valuationItem}>
                <div className={styles.itemHeader}>
                  <div className={styles.itemDot}></div>
                  <h3>Weight</h3>
                </div>
                <p>Precision weighing determines the net gold weight.</p>
              </div>
              
              <div className={styles.valuationItem}>
                <div className={styles.itemHeader}>
                  <div className={styles.itemDot}></div>
                  <h3>Rate</h3>
                </div>
                <p>The applicable gold rate is clearly communicated before the transaction.</p>
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
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
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
                  <option value="other">General Enquiry</option>
                </select>
              </div>
              
              <button type="submit" className={styles.submitBtn}>
                Request Call Back
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
