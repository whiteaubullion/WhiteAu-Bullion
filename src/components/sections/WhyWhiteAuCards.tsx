'use client';
import React from 'react';
import Image from 'next/image';
import styles from './WhyWhiteAuCards.module.css';
import { motion } from 'framer-motion';

const features = [
  {
    number: "01",
    title: "Built on Trust",
    description: "Honest valuations, transparent processes and customer-first service.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  },
  {
    number: "02",
    title: "Accurate Gold Valuation",
    description: "Advanced testing technology and precision weighing to determine the value of your gold.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
  },
  {
    number: "03",
    title: "Transparent Gold Rates",
    description: "Clear pricing before the transaction with no unnecessary surprises.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
  },
  {
    number: "04",
    title: "Secure & Hassle-Free",
    description: "A smooth journey from gold testing to final payment.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
  },
  {
    number: "05",
    title: "People Come First",
    description: "Professional assistance from a team focused on making the experience simple.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  }
];

export default function WhyWhiteAuCards() {
  return (
    <section className={`section-padding ${styles.whySection}`}>
      <div className="container">
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Why Sell Gold To WhiteAu ?
        </motion.h2>

        <div className={styles.contentWrapper}>
          <motion.div 
            className={styles.imageContainer}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >

            <div className={`${styles.floatingBadge} ${styles.badgeTopLeft}`}>
              <div className={styles.iconCircle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              Trusted Gold Buyer
            </div>

            <div className={`${styles.floatingBadge} ${styles.badgeBottomLeft}`}>
              <div className={styles.iconCircle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              Transparent Process
            </div>

            <div className={`${styles.floatingBadge} ${styles.badgeTopRight}`}>
              <div className={styles.iconCircle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              Best Value
            </div>

            <div className={`${styles.floatingBadge} ${styles.badgeBottomRight}`}>
              <div className={styles.iconCircle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              Secure Payments
            </div>

            <Image 
              src="/steps-model.webp" 
              alt="Why Sell to White Gold" 
              width={500}
              height={600}
              className={styles.mainImage}
            />
          </motion.div>

          <motion.div 
            className={styles.gridContainer}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.cardInner}>
                  <div className={styles.cardFront}>
                    <div className={styles.featureHeader}>
                      <div className={styles.featureNumber}>{feature.number}</div>
                      <div className={styles.featureIcon}>{feature.icon}</div>
                    </div>
                    <div className={styles.featureTextWrapper}>
                      <h3 className={styles.featureTitle}>{feature.title}</h3>
                    </div>
                  </div>
                  <div className={styles.cardBack}>
                    <p className={styles.featureDescription}>{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
