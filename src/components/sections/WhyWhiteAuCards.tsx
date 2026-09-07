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
    title: <>Secure <span className="ampersand">&amp;</span> Hassle-Free</>,
    description: "A smooth journey from gold testing to final payment.",
    number: "04"
  },
  {
    title: "People Come First",
    description: "Professional assistance from a team focused on making the experience simple.",
    number: "05"
  }
];

import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] }
  }
};

export default function WhyWhiteAuCards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className={`section-padding ${styles.whySection}`}>
      <div className="container">
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>Why WhiteAu?</h2>
          <p className={styles.subtitle}>Trust. Transparency. Value.</p>
        </motion.div>

        <motion.div 
          className={styles.cardContainer}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          {cards.map((card, index) => {
            const isHovered = hoveredIndex === index;
            const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;
            
            return (
              <motion.div 
                key={index} 
                variants={cardVariants}
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
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
