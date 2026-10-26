'use client';
import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import styles from '@/app/contact/page.module.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('general');
  const [quantity, setQuantity] = useState('50');
  const [customQuantity, setCustomQuantity] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceLabels: Record<string, string> = {
      buy: 'Buy Gold',
      sell: 'Sell Gold',
      release: 'Release Pledged Gold',
      general: 'General Enquiry',
    };

    const selectedService = serviceLabels[service] || service;
    const qtyText = service === 'buy'
      ? `\nQuantity: ${quantity === 'custom' ? `${customQuantity || 'Custom'} Grams` : `${quantity} Grams`}`
      : '';
    const msgText = message.trim() ? `\nMessage: ${message}` : '';

    const text = `Hi WhiteAu, I have an enquiry from your website.\n\nEnquiry Type: ${selectedService}\nName: ${name}\nPhone: ${phone}${qtyText}${msgText}`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/917012288794?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          id="name" 
          placeholder="Your Name" 
          required 
          value={name} 
          onChange={e => setName(e.target.value)} 
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="phone">Phone</label>
        <input 
          type="tel" 
          id="phone" 
          placeholder="Your Phone Number" 
          required 
          inputMode="numeric" 
          maxLength={15}
          value={phone} 
          onChange={e => setPhone(e.target.value.replace(/\D/g, ''))} 
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="service">I want to</label>
        <select 
          id="service" 
          value={service} 
          onChange={e => setService(e.target.value)}
        >
          <option value="general">General Enquiry</option>
          <option value="buy">Buy Gold</option>
          <option value="sell">Sell Gold</option>
          <option value="release">Release Pledged Gold</option>
        </select>
      </div>

      {service === 'buy' && (
        <div className={styles.formGroup}>
          <label htmlFor="buyQuantity">Quantity to Buy (in Grams)</label>
          <select
            id="buyQuantity"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
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
          {quantity === 'custom' && (
            <input
              type="number"
              min="1"
              placeholder="Enter quantity in grams (e.g. 75)"
              value={customQuantity}
              style={{ marginTop: '0.5rem' }}
              onChange={e => setCustomQuantity(e.target.value)}
              required
            />
          )}
        </div>
      )}

      <div className={styles.formGroup}>
        <label htmlFor="message">Message (Optional)</label>
        <textarea 
          id="message" 
          rows={3} 
          placeholder="How can we help you?" 
          value={message} 
          onChange={e => setMessage(e.target.value)}
        ></textarea>
      </div>

      <Button variant="primary">
        {service === 'buy' ? 'Enquire Buy Gold' : 'Submit Enquiry'}
      </Button>
    </form>
  );
}
