'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import styles from './Testimonials.module.css';

interface Review {
  id: number;
  name: string;
  role: string;
  rating: number;
  title: string;
  text: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Rahul M.",
    role: "Verified Customer",
    rating: 5,
    title: "Extremely transparent and professional!",
    text: "They tested my gold right in front of me and offered the live market rate."
  },
  {
    id: 2,
    name: "Sneha K.",
    role: "Local Client",
    rating: 5,
    title: "The instant payment was a lifesaver.",
    text: "I was skeptical about selling my old jewellery, but the team made it secure and easy."
  },
  {
    id: 3,
    name: "David T.",
    role: "Verified Customer",
    rating: 5,
    title: "Best valuation in Kerala.",
    text: "WhiteAu gave me the most honest and highest return for my pledged gold."
  },
  {
    id: 4,
    name: "Anjali S.",
    role: "Local Client",
    rating: 4,
    title: "Very smooth experience.",
    text: "The staff explained the purity test clearly. Got money transferred in minutes."
  },
  {
    id: 5,
    name: "Vikram P.",
    role: "Verified Customer",
    rating: 5,
    title: "Totally hassle-free!",
    text: "Releasing my pledged gold was a headache until I found them. They handled the bank directly."
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 80, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 60, damping: 15 }
  }
};

export default function Testimonials() {
  return (
    <section className="section-padding" style={{ position: 'relative', zIndex: 2 }}>
      <div className="container">
        <div className={styles.header}>
          <h2>What Our Clients Say</h2>
          <p className={styles.subtitle}>Don't just take our word for it—hear from the people who trust us.</p>
        </div>

        <motion.div 
          className={styles.bentoGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "0px 0px -100px 0px" }}
        >
          
          {/* Card 1: Tall left card */}
          <motion.div variants={cardVariants} className={`${styles.card} ${styles.cardTall1} ${styles.cardWhite}`}>
            <div className={styles.cardClose}>×</div>
            <div className={styles.starsCenter}>
              <span className={styles.star}>★</span><span className={styles.star}>★</span><span className={styles.star}>★</span><span className={styles.star}>★</span><span className={styles.star}>★</span>
            </div>
            <h3 className={styles.titleCenter}>Highly satisfied with my valuation, thank you!</h3>
            <div className={styles.pills}>
              <span className={styles.pill}>Fast service</span>
              <span className={styles.pill}>Perfect</span>
              <span className={styles.pill}>Good deal</span>
            </div>
            <p className={styles.authorTag}>- @RahulM -</p>
          </motion.div>

          {/* Card 2: Top middle wide card */}
          <motion.div variants={cardVariants} className={`${styles.card} ${styles.cardWide1} ${styles.cardYellow}`}>
            <div className={styles.cardTopRow}>
              <div className={styles.authorSmall}>
                <div className={styles.avatarSmall}>S</div>
                <div className={styles.authorInfoSmall}>
                  <span className={styles.nameSmall}>Sneha K.</span>
                  <span className={styles.timeSmall}>2 days ago</span>
                </div>
              </div>
              <div className={styles.ratingPill}>★ 5.0/5.0</div>
            </div>
            <p className={styles.textSmall}>I absolutely loved the transparency. It's not only secure but also very fast, making it a perfect solution for selling gold.</p>
            <p className={styles.readMore}>Read more</p>
          </motion.div>

          {/* Card 3: Huge center card */}
          <motion.div variants={cardVariants} className={`${styles.card} ${styles.cardHuge} ${styles.cardWhite}`}>
            <div className={styles.cardTopRow}>
              <div className={styles.author}>
                <div className={styles.avatar}>D</div>
                <div className={styles.authorInfo}>
                  <span className={styles.name}>David T.</span>
                  <span className={styles.role}>Verified Client</span>
                </div>
              </div>
              <div className={styles.starsRight}>
                <span className={styles.star}>★</span><span className={styles.star}>★</span><span className={styles.star}>★</span><span className={styles.star}>★</span><span className={styles.star}>★</span>
              </div>
            </div>
            <h3 className={styles.cardTitle}>Prompt and helpful responses to my inquiry!</h3>
            <p className={styles.cardSubtitle}>Superb pricing, impressed.</p>
          </motion.div>

          {/* Card 4: Top right square */}
          <motion.div variants={cardVariants} className={`${styles.card} ${styles.cardSquare1} ${styles.cardYellow}`}>
            <p className={styles.dateSmall}>26 Mar 2026</p>
            <h3 className={styles.titleMedium}>Incredible service</h3>
            <p className={styles.textMedium}>Perfect, exceeded expectations.</p>
            <div className={styles.starsLeft}>
              <span className={styles.star}>★</span><span className={styles.star}>★</span><span className={styles.star}>★</span><span className={styles.star}>★</span><span className={styles.star}>★</span>
            </div>
          </motion.div>

          {/* Card 5: Bottom left wide */}
          <motion.div variants={cardVariants} className={`${styles.card} ${styles.cardWide2} ${styles.cardWhite}`}>
            <div className={styles.starsLeft}>
              <span className={styles.star}>★</span><span className={styles.star}>★</span><span className={styles.star}>★</span><span className={styles.star}>★</span><span className={styles.star}>★</span>
            </div>
            <p className={styles.textSmall}>Very smooth experience. The staff was polite and explained the purity test clearly. Got my money transferred to my account in minutes.</p>
            <div className={styles.authorBottomRight}>
              <div className={styles.authorInfoRight}>
                <span className={styles.nameSmall}>Anjali S.</span>
                <span className={styles.timeSmall}>Local Client</span>
              </div>
              <div className={styles.avatarSmall}>A</div>
            </div>
            <span className={styles.pillBottomLeft}>Great service</span>
          </motion.div>

          {/* Card 6: Bottom right tall card */}
          <motion.div variants={cardVariants} className={`${styles.card} ${styles.cardTall2} ${styles.cardYellow}`}>
            <div className={styles.cardClose}>×</div>
            <div className={styles.avatarLarge}>V</div>
            <h3 className={styles.titleCenter}>Amazing Experience!</h3>
            <p className={styles.textCenterSmall}>When it comes to releasing pledged gold, this service is top-notch.</p>
            <div className={styles.statsRow}>
              <span>🤍 1,914</span>
              <span>👁 21.7k</span>
            </div>
          </motion.div>

        </motion.div>

        <div className={styles.ctaContainer}>
          <a href="mailto:sairajpr.whiteau@gmail.com?subject=My%20Review%20for%20WhiteAu" className={styles.reviewBtn}>
            Write a Review
          </a>
        </div>
      </div>
    </section>
  );
}
