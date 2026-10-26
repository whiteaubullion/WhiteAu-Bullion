'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import marketStyles from '../features/LiveMarketAnalysis.module.css';

export default function HeroCardsAndMarket() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('sell');
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanPhone = phone.replace(/\D/g, '');

    if (!cleanName) {
      alert('Please enter your full name.');
      return;
    }
    if (cleanPhone.length !== 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    const serviceLabels: Record<string, string> = {
      buy: 'Buy Gold',
      sell: 'Sell Gold',
      release: 'Release Pledged Gold',
      other: 'General Enquiry',
    };

    const text = `Hi WhiteAu, I have an enquiry from your website.\n\nEnquiry Type: ${serviceLabels[service] || service}\nName: ${cleanName}\nPhone: ${cleanPhone}`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/917012288794?text=${encodedText}`;

    setIsRedirecting(true);

    // Reliable redirect: try opening WhatsApp tab, fallback to direct location change if blocked
    try {
      const win = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      if (!win || win.closed || typeof win.closed === 'undefined') {
        window.location.href = whatsappUrl;
      }
    } catch {
      window.location.href = whatsappUrl;
    }

    setTimeout(() => {
      setIsRedirecting(false);
    }, 4000);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 0', position: 'relative', zIndex: 20 }}>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ width: '100%', maxWidth: '1050px', margin: '0 auto', background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.6)', borderRadius: '24px', overflow: 'hidden', display: 'flex', flexWrap: 'wrap', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)' }}
          className={marketStyles.analysisContainer}
        >
          {/* Text Side */}
          <div style={{ flex: 1, minWidth: '250px', padding: '1.5rem', background: 'linear-gradient(135deg, rgba(234, 162, 33, 0.1) 0%, rgba(255, 255, 255, 0) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2rem', color: 'var(--color-black)', marginBottom: '1rem', lineHeight: 1.2 }}>Get the WhiteAu Gold Rate</h2>
            <p style={{ color: 'var(--color-gold)', fontWeight: 600, marginBottom: '2rem', fontSize: '0.95rem' }}>
              Share your details below to know today’s latest rate.
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
          <div style={{ flex: 1, minWidth: '250px', padding: '1.5rem', background: 'rgba(255, 255, 255, 0.6)' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', height: '100%', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label htmlFor="name" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-black)' }}>Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  placeholder="Enter your name" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ padding: '0.85rem 1rem', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.8)', fontFamily: 'var(--font-montserrat), sans-serif', fontSize: '0.95rem', color: 'var(--color-black)', outline: 'none' }} 
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label htmlFor="phone" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-black)' }}>Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  placeholder="Enter 10-digit phone number" 
                  required 
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  title="Please enter a 10-digit mobile number"
                  value={phone}
                  onKeyDown={(e) => {
                    if (['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key) || (e.ctrlKey || e.metaKey)) return
                    if (!/^[0-9]$/.test(e.key)) { e.preventDefault(); return }
                    if (e.currentTarget.value.length >= 10 && e.currentTarget.selectionStart === e.currentTarget.selectionEnd) { e.preventDefault() }
                  }}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  style={{ padding: '0.85rem 1rem', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.8)', fontFamily: 'var(--font-montserrat), sans-serif', fontSize: '0.95rem', color: 'var(--color-black)', outline: 'none' }} 
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label htmlFor="service" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-black)' }}>I want to</label>
                <select 
                  id="service" 
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  style={{ padding: '0.85rem 1rem', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.8)', fontFamily: 'var(--font-montserrat), sans-serif', fontSize: '0.95rem', color: 'var(--color-black)', outline: 'none' }}
                >
                  <option value="buy">Buy Gold</option>
                  <option value="sell">Sell Gold</option>
                  <option value="release">Release Pledged Gold</option>
                  <option value="other">General Enquiry</option>
                </select>
              </div>
              
              <button 
                type="submit" 
                disabled={isRedirecting}
                style={{ 
                  marginTop: '0.5rem', 
                  backgroundColor: isRedirecting ? '#16a34a' : 'var(--color-gold)', 
                  color: isRedirecting ? '#ffffff' : 'var(--color-black)', 
                  border: 'none', 
                  padding: '1rem', 
                  borderRadius: '12px', 
                  fontSize: '0.95rem', 
                  fontWeight: 600, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em', 
                  cursor: isRedirecting ? 'default' : 'pointer', 
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }} 
                onMouseEnter={(e) => { if (!isRedirecting) e.currentTarget.style.transform = 'translateY(-2px)' }} 
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
              >
                {isRedirecting ? 'Connecting to WhatsApp...' : 'GET GOLD RATE'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
