'use client';
import React, { useState } from 'react';
import styles from './Founder.module.css';

export default function Founder() {
  const [submitted, setSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [complaintRef, setComplaintRef] = useState('');

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('valuation');
  const [branch, setBranch] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanName = fullName.trim();
    const cleanPhone = phone.replace(/\D/g, '');
    const cleanMessage = message.trim();

    if (!cleanName || !cleanMessage) {
      setErrorMsg('Please enter your full name and message.');
      return;
    }

    if (cleanPhone.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cleanName,
          phone: cleanPhone,
          email: email.trim(),
          category,
          branch: branch.trim() || 'General',
          message: cleanMessage,
        })
      });

      const data = await res.json();
      if (!res.ok || data?.error) {
        setErrorMsg(data?.error || 'Failed to submit complaint. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setComplaintRef(data?.complaint?.id || `comp-${Date.now()}`);
      setSubmitted(true);
      // Reset fields
      setFullName('');
      setPhone('');
      setEmail('');
      setCategory('valuation');
      setBranch('');
      setMessage('');
    } catch {
      setErrorMsg('Network error. Please try again or reach out directly via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSubmitted(false);
    setErrorMsg('');
  };

  return (
    <section className={`section-padding ${styles.complaintSection}`}>
      <div className={`container ${styles.complaintContainer}`}>
        
        {/* CTA Card */}
        <div className={styles.ctaCard}>
          <div className={styles.topBadge}>
            <span className={styles.badgeDot}></span>
            <span>CUSTOMER RESOLUTION <span className="ampersand">&amp;</span> SUPPORT</span>
          </div>
          <h2 className={styles.ctaTitle}>Need to file an official complaint?</h2>
          <p className={styles.ctaText}>
            We believe in a 100% transparent and honest gold selling experience for every customer. 
            However, if you've faced any issues, malpractice, or unfair valuation at any of our branches, 
            we want to hear from you directly so we can make it right.
          </p>
          <button 
            type="button"
            className={styles.openModalBtn}
            onClick={() => setIsModalOpen(true)}
          >
            <span className={styles.btnIcon}>!</span>
            <span>File a Complaint</span>
            <span className={styles.btnArrow}>→</span>
          </button>
        </div>

        {/* Complaint Modal */}
        {isModalOpen && (
          <div className={styles.modalOverlay} onClick={handleClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
              <button type="button" className={styles.closeBtn} onClick={handleClose}>×</button>
              
              <div className={styles.formBoxHeader}>
                <div className={styles.formBoxIcon}>✉</div>
                <div>
                  <h3 className={styles.formBoxTitle}>File an Official Complaint</h3>
                  <p className={styles.formBoxSubtitle}>Your issue is registered directly with WhiteAu management</p>
                </div>
              </div>

              {submitted ? (
                <div className={styles.successBox}>
                  <span className={styles.successIcon}>✓</span>
                  <div style={{ marginTop: '0.5rem' }}>
                    <h4 style={{ color: '#16a34a', margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700 }}>
                      Complaint Successfully Lodged
                    </h4>
                    <p style={{ margin: '0 0 0.5rem', color: '#334155', fontSize: '0.9rem', lineHeight: '1.5' }}>
                      Reference ID: <strong style={{ color: '#1c1917' }}>{complaintRef}</strong>
                    </p>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem', lineHeight: '1.5' }}>
                      Our grievance resolution officer has received your complaint and will investigate and contact you within 24 business hours.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleClose}
                    style={{
                      marginTop: '1rem',
                      padding: '0.65rem 1.5rem',
                      backgroundColor: '#16a34a',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.complaintForm}>
                  {errorMsg && (
                    <div style={{
                      padding: '0.65rem 1rem',
                      backgroundColor: '#fee2e2',
                      border: '1px solid #f87171',
                      borderRadius: '8px',
                      color: '#b91c1c',
                      fontSize: '0.85rem',
                      textAlign: 'center'
                    }}>
                      {errorMsg}
                    </div>
                  )}

                  <div className={styles.formRow}>
                    <div className={styles.formField}>
                      <label htmlFor="comp-name">Full Name *</label>
                      <input 
                        type="text" 
                        id="comp-name"
                        placeholder="Your full name" 
                        required 
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                      />
                    </div>
                    <div className={styles.formField}>
                      <label htmlFor="comp-phone">Mobile Number (10 digits) *</label>
                      <input 
                        type="tel" 
                        id="comp-phone"
                        placeholder="10-digit mobile number" 
                        required 
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        maxLength={10}
                        title="Please enter a 10-digit mobile number"
                        value={phone}
                        onKeyDown={(e) => {
                          if (['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key) || (e.ctrlKey || e.metaKey)) return;
                          if (!/^[0-9]$/.test(e.key)) { e.preventDefault(); return; }
                          if (e.currentTarget.value.length >= 10 && e.currentTarget.selectionStart === e.currentTarget.selectionEnd) { e.preventDefault(); }
                        }}
                        onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formField}>
                      <label htmlFor="comp-email">Email Address</label>
                      <input 
                        type="email" 
                        id="comp-email"
                        placeholder="e.g. rahul@example.com (optional)" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>
                    <div className={styles.formField}>
                      <label htmlFor="comp-branch">Branch Location</label>
                      <input 
                        type="text" 
                        id="comp-branch"
                        placeholder="e.g. Cherthala or Online" 
                        value={branch}
                        onChange={e => setBranch(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor="comp-category">Type of Complaint *</label>
                    <select 
                      id="comp-category"
                      required
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                    >
                      <option value="valuation">Valuation Dispute</option>
                      <option value="payment">Payment Issue</option>
                      <option value="service">Service Quality</option>
                      <option value="staff">Staff Behavior</option>
                      <option value="other">Other Concern</option>
                    </select>
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor="comp-message">Your Detailed Concern *</label>
                    <textarea 
                      id="comp-message"
                      rows={4} 
                      placeholder="Please describe the issue in detail, date of visit, and any supporting facts..." 
                      required
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className={styles.submitBtn}
                    disabled={isSubmitting}
                    style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                  >
                    {isSubmitting ? 'Registering Complaint...' : 'Submit Official Complaint →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
