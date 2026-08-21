'use client';
import React, { useState } from 'react';
import styles from './WhyWhiteAuCards.module.css';

const cards = [
  {
    title: "Built on Trust",
    description: "Honest valuations, transparent processes and customer-first service.",
    number: "01"
  },
  {
    title: "Accurate Gold Valuation",
    description: "Advanced testing technology and precision weighing to determine the value of your gold.",
    number: "02"
  },
  {
    title: "Transparent Gold Rates",
    description: "Clear pricing before the transaction with no unnecessary surprises.",
    number: "03"
  },
  {
    title: "Secure & Hassle-Free",
    description: "A smooth journey from gold testing to final payment.",
    number: "04"
  },
  {
    title: "People Come First",
    description: "Professional assistance from a team focused on making the experience simple.",
    number: "05"
  }
];

export default function WhyWhiteAuCards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className={`section-padding ${styles.whySection}`}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Why WhiteAu?</h2>
          <p className={styles.subtitle}>Trust. Transparency. Value.</p>
        </div>

        <div className={styles.cardContainer}>
          {cards.map((card, index) => {
            const isHovered = hoveredIndex === index;
            const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;
            
            return (
              <div 
                key={index} 
                className={`${styles.card} ${isHovered ? styles.active : ''} ${isOtherHovered ? styles.dimmed : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className={styles.cardNumber}>{card.number}</div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <div className={styles.cardDescriptionWrapper}>
                    <p className={styles.cardDescription}>{card.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
