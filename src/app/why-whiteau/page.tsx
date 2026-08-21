import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export const metadata = {
  title: 'Why WhiteAu | Trust. Transparency. Value.',
  description: 'At WhiteAu, we believe selling your gold should be simple, transparent, and completely trustworthy.',
};

export default function WhyWhiteAu() {
  const pillars = [
    {
      title: "Built on Trust",
      description: "Trust is earned through legacy, transparency, honest valuations, and doing right by our customers."
    },
    {
      title: "Accurate Gold Valuation",
      description: "Advanced technology to assess your gold accurately and transparently."
    },
    {
      title: "Transparent Gold Rates",
      description: "Clear, upfront pricing — without unnecessary surprises."
    },
    {
      title: "Secure & Hassle-Free",
      description: "From valuation to payment, a smooth and convenient experience."
    },
    {
      title: "People Come First",
      description: "A committed team that genuinely cares about every customer and interaction."
    },
    {
      title: "Building the Future",
      description: "Not just another place to sell gold — the future of gold selling: more transparent, accessible, and trusted."
    }
  ];

  return (
    <>
      <Header />
      
      <main className="container section-padding">
        <div className={styles.pageHeader}>
          <h1 className="font-serif">Trust. Transparency. Value.</h1>
          <p className={styles.intro}>
            At WhiteAu, we believe selling your gold should be simple, transparent, and completely trustworthy. We combine modern technology with professional expertise to give you a secure and reliable gold-selling experience.
          </p>
        </div>

        <div className={styles.pillarsContainer}>
          {pillars.map((pillar, index) => (
            <div key={index} className={styles.pillar}>
              <h2 className="font-serif">{pillar.title}</h2>
              <p>{pillar.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.closingSection}>
          <h2 className={`font-serif ${styles.closingTitle}`}>Your Gold Deserves Better.</h2>
          <p className={styles.closingSubline}>
            WhiteAu is where trust meets technology, and where selling gold becomes a better experience.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
