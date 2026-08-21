import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import styles from './page.module.css';

export const metadata = {
  title: 'Sell Gold | WhiteAu Bullion',
  description: 'Sell Gold with WhiteAu in Seven Easy Steps. Simple, transparent, and secure.',
};

export default function SellGold() {
  const steps = [
    {
      title: "Contact Us",
      description: "Reach us by phone, WhatsApp, or visit our office. Our team will guide you through the process."
    },
    {
      title: "Bring Your ID Proof",
      description: "Passport, or Aadhaar Card (serves as both photo ID and address proof), or a valid photo ID + local address proof."
    },
    {
      title: "Gold Purity Testing",
      description: "Tamper-proof testing using advanced German machines for accurate purity assessment."
    },
    {
      title: "Check Gold Rate",
      description: "A clear, transparent quotation based on your gold's verified purity and weight. No hidden charges."
    },
    {
      title: "Complete KYC Verification",
      description: "Photo ID and address proof required; a verification call to a family member may be requested as an added safety measure."
    },
    {
      title: "Receive Your Payment",
      description: "Instant, secure bank transfer. Confirm before you leave the branch."
    },
    {
      title: "Get More With Your Gold",
      description: "Bring your original purchase bill for an additional reward and better value."
    }
  ];

  return (
    <>
      <Header />
      
      <main className="container section-padding">
        <div className={styles.pageHeader}>
          <h1 className="font-serif">Sell Gold with WhiteAu in Seven Easy Steps</h1>
          <p className={styles.intro}>Selling your gold with WhiteAu is simple, transparent, and secure.</p>
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
          <p><strong>3% transaction fee applies</strong> — clearly communicated before any transaction.</p>
        </div>

        <div className={styles.ctaSection}>
          <h2 className="font-serif">Ready to sell your gold?</h2>
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
