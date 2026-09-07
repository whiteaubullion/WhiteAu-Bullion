'use client';
import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import styles from '@/app/contact/page.module.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi WhiteAu, I have an enquiry from your website.\n\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/917012288794?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" placeholder="Your Name" required value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="phone">Phone</label>
        <input type="tel" id="phone" placeholder="Your Phone Number" required value={phone} onChange={e => setPhone(e.target.value)} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="message">Message</label>
        <textarea id="message" rows={3} placeholder="How can we help you?" required value={message} onChange={e => setMessage(e.target.value)}></textarea>
      </div>
      <Button variant="primary">Submit Enquiry</Button>
    </form>
  );
}
