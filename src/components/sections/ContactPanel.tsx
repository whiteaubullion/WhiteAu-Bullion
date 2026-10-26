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
    quantity: '50',
    customQuantity: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceLabels: Record<string, string> = {
      buy: 'Buy Gold',
      sell: 'Sell Gold',
      release: 'Release Pledged Gold',
      general: 'General Enquiry',
    };

    const selectedService = serviceLabels[formData.service] || formData.service;
    const qtyText = formData.service === 'buy'
      ? `\nQuantity: ${formData.quantity === 'custom' ? `${formData.customQuantity || 'Custom'} Grams` : `${formData.quantity} Grams`}`
      : '';

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    const text = `Hi WhiteAu, I have an enquiry from your website.\n\nEnquiry Type: ${selectedService}\nName: ${formData.name}\nPhone: ${cleanPhone}${qtyText}`;
    const encodedText = encodeURIComponent(text);
    try {
      const win = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      if (!win || win.closed || typeof win.closed === 'undefined') {
        window.location.href = whatsappUrl;
      }
    } catch {
      window.location.href = whatsappUrl;
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const isBuy = formData.service === 'buy';

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
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{ fontSize: '3rem', color: '#10b981', marginBottom: '1rem' }}>✓</div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-black)' }}>Enquiry Sent!</h3>
                <p style={{ color: 'rgba(0,0,0,0.7)', marginBottom: '1.5rem' }}>
                  Thank you! Our executive will connect with you on WhatsApp / Phone shortly.
                </p>
                <button 
                  type="button" 
                  onClick={() => setSubmitted(false)} 
                  className={styles.submitBtn}
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
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
                    placeholder="10-digit Mobile Number"
                    value={formData.phone}
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    title="Please enter a 10-digit mobile number"
                    onKeyDown={(e) => {
                      if (['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key) || (e.ctrlKey || e.metaKey)) return;
                      if (!/^[0-9]$/.test(e.key)) { e.preventDefault(); return; }
                      if (e.currentTarget.value.length >= 10 && e.currentTarget.selectionStart === e.currentTarget.selectionEnd) { e.preventDefault(); }
                    }}
                    onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10)})}
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
                    <option value="buy">Buy Gold</option>
                    <option value="sell">Sell Gold</option>
                    <option value="release">Release Pledged Gold</option>
                    <option value="general">General Enquiry</option>
                  </select>
                </div>

                {formData.service === 'buy' && (
                  <div className={styles.formGroup}>
                    <label htmlFor="quantity" className={styles.label}>
                      Quantity to Buy (in Grams)
                    </label>
                    <select
                      id="quantity"
                      className={styles.select}
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    >
                      <option value="20">20 Grams</option>
                      <option value="50">50 Grams</option>
                      <option value="100">100 Grams</option>
                      <option value="250">250 Grams</option>
                      <option value="500">500 Grams</option>
                      <option value="1000">1000 Grams (1 kg)</option>
                      <option value="2000">2000 Grams (2 kg)</option>
                      <option value="5000">5000 Grams (5 kg)</option>
                      <option value="custom">Other / Custom Quantity</option>
                    </select>

                    {formData.quantity === 'custom' && (
                      <input
                        type="number"
                        min="1"
                        className={styles.input}
                        placeholder="Enter quantity in grams (e.g. 75)"
                        style={{ marginTop: '0.5rem' }}
                        value={formData.customQuantity}
                        onChange={(e) => setFormData({ ...formData, customQuantity: e.target.value })}
                        required
                      />
                    )}
                  </div>
                )}
                
                <button type="submit" className={styles.submitBtn}>
                  {formData.service === 'buy' ? 'ENQUIRE BUY GOLD' : 'SUBMIT ENQUIRY'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
