import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';

export const metadata = {
  title: 'Why WhiteAu | Trust. Transparency. Value.',
  description: 'At WhiteAu, we believe selling your gold should be simple, transparent, and completely trustworthy.',
};

export default function WhyWhiteAu() {
  const pillars = [
    {
      title: "Built on Trust",
      description: "We believe trust is earned through legacy, transparency, honest valuations, and doing the right thing for our customers."
    },
    {
      title: "Accurate Gold Valuation",
      description: "We use advanced technology to assess your gold accurately and transparently."
    },
    {
      title: "Transparent Gold Rates",
      description: "Know the value of your gold with clear and transparent pricing—without unnecessary surprises."
    },
    {
      title: <>Secure <span className="ampersand">&amp;</span> Hassle-Free</>,
      description: "From valuation to payment, we ensure a smooth, secure, and convenient experience."
    },
    {
      title: "People Come First",
      description: "Behind WhiteAu is a committed team that genuinely cares about every customer and every interaction."
    },
    {
      title: "Building the Future",
      description: "We are not just creating another place to sell gold. We are building the future of gold selling — one that is more transparent, accessible, and trusted."
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
