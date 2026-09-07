'use client';
import React, { useState } from 'react';
import styles from './Founder.module.css';

export default function Founder() {
  const [submitted, setSubmitted] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsModalOpen(false);
    }, 3000);
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
          <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
              <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>×</button>
              
              <div className={styles.formBoxHeader}>
                <div className={styles.formBoxIcon}>✉</div>
                <div>
                  <h3 className={styles.formBoxTitle}>File a Complaint</h3>
                  <p className={styles.formBoxSubtitle}>We take every concern seriously</p>
                </div>
              </div>

              {submitted ? (
                <div className={styles.successBox}>
                  <span className={styles.successIcon}>✓</span>
                  <p>Your complaint has been securely received. Our support team will investigate and get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.complaintForm}>
                  <div className={styles.formRow}>
                    <div className={styles.formField}>
                      <label>Full Name</label>
                      <input type="text" placeholder="Your name" required />
                    </div>
                    <div className={styles.formField}>
                      <label>Phone / Email</label>
                      <input type="text" placeholder="Contact info" required />
                    </div>
                  </div>
                  <div className={styles.formField}>
                    <label>Type of Complaint</label>
                    <select required>
                      <option value="">Select a category</option>
                      <option value="valuation">Valuation Dispute</option>
                      <option value="payment">Payment Issue</option>
                      <option value="service">Service Quality</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className={styles.formField}>
                    <label>Your Message</label>
                    <textarea rows={5} placeholder="Please describe the issue in detail, including the branch location..." required></textarea>
                  </div>
                  <button type="submit" className={styles.submitBtn}>Submit Complaint →</button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
