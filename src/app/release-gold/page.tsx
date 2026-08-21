import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
// Reusing the same layout styles as sell-gold
import styles from '../sell-gold/page.module.css';

export const metadata = {
  title: 'Release Pledged Gold | WhiteAu Bullion',
  description: 'Release Your Gold Loan in Nine Easy Steps. Release Your Gold. Move Forward.',
};

export default function ReleaseGold() {
  const steps = [
    {
      title: "Bring Your Pledge Receipt",
      description: "Locate the original receipt issued by your gold loan provider."
    },
    {
      title: "Carry Your ID Proof",
      description: "Passport or Aadhaar Card, plus address proof."
    },
    {
      title: "Complete KYC Verification",
      description: "Photo ID, address proof, and a verification call if required."
    },
    {
      title: "Check Gold Rate",
      description: "Transparent quotation based on purity, communicated upfront."
    },
    {
      title: "Complete Your Gold Loan Closure",
      description: "Documentation, confirmed rate, and signed term sheet."
    },
    {
      title: "Meet Our Representative",
      description: "A WhiteAu representative accompanies and assists you throughout."
    },
    {
      title: "Check Gold Purity",
      description: "Tamper-proof testing with German machines for accurate valuation."
    },
    {
      title: "Instant Payment",
      description: "Secure bank transfer, confirmed before you leave."
    },
    {
      title: "Customer Satisfaction & Gold Return",
      description: "Not satisfied? Pay the release value plus the applicable percentage and take your gold back."
    }
  ];

  return (
    <>
      <Header />
      
      <main className="container section-padding">
        <div className={styles.pageHeader}>
          <h1 className="font-serif">Release Your Gold Loan in Nine Easy Steps</h1>
          <p className={styles.intro} style={{ letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.9rem' }}>
            Release Your Gold. Move Forward.
          </p>
        </div>

        <div className={styles.stepsContainer}>
          {steps.map((step, index) => (
            <div key={index} className={styles.stepRow}>
              <div className={styles.stepNumber}>{index + 1}</div>
              <div className={styles.stepContent}>
                <h3 className="font-serif">{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.callout}>
          <p><strong>Not fully satisfied with your valuation?</strong> You may reclaim your gold by paying the release value plus 5%, per applicable terms.</p>
        </div>

        <div className={styles.ctaSection}>
          <h2 className="font-serif">Talk to us about releasing your pledged gold</h2>
          <div className={styles.ctaButtons}>
            <Button href="tel:+917012288794" variant="primary">Call Us</Button>
            <Button href="https://wa.me/917012288794" variant="outline">WhatsApp</Button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
