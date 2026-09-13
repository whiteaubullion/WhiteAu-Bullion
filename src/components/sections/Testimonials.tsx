'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import styles from './Testimonials.module.css';



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
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [rating, setRating] = React.useState(5);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setTimeout(() => setIsSubmitted(false), 500);
    }, 2000);
  };

  return (
    <section className={styles.testimonialsSection}>
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

            <div className={styles.starsCenter}>
              <span className={styles.star}>★</span><span className={styles.star}>★</span><span className={styles.star}>★</span><span className={styles.star}>★</span><span className={styles.star}>★</span>
            </div>
            <h3 className={styles.titleCenter}>Highly satisfied with my valuation, thank you!</h3>
            <div className={styles.pills}>
              <span className={styles.pill}>Fast service</span>
              <span className={styles.pill}>Perfect</span>
              <span className={styles.pill}>Good deal</span>
            </div>
            <p className={styles.authorTag}>- Vishnu -</p>
          </motion.div>

          {/* Card 2: Top middle wide card */}
          <motion.div variants={cardVariants} className={`${styles.card} ${styles.cardWide1} ${styles.cardYellow}`}>
            <div className={styles.cardTopRow}>
              <div className={styles.authorSmall}>
                <div className={styles.avatarSmall}>B</div>
                <div className={styles.authorInfoSmall}>
                  <span className={styles.nameSmall}>Bibin</span>
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
                <div className={styles.avatar}>E</div>
                <div className={styles.authorInfo}>
                  <span className={styles.name}>Ejas</span>
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
            <p className={styles.dateSmall}>Nikhil & Maya</p>
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
                <span className={styles.nameSmall}>Sherin</span>
                <span className={styles.timeSmall}>Local Client</span>
              </div>
              <div className={styles.avatarSmall}>S</div>
            </div>
            <span className={styles.pillBottomLeft}>Great service</span>
          </motion.div>

          {/* Card 6: Bottom right tall card */}
          <motion.div variants={cardVariants} className={`${styles.card} ${styles.cardTall2} ${styles.cardYellow}`}>

            <div className={styles.avatarLarge}>F</div>
            <p style={{textAlign: 'center', fontWeight: 600, marginTop: '0.5rem', marginBottom: '0.5rem'}}>Fahad</p>
            <h3 className={styles.titleCenter}>Amazing Experience!</h3>
            <p className={styles.textCenterSmall}>When it comes to releasing pledged gold, this service is top-notch.</p>
            <div className={styles.statsRow}>
              <span>🤍 1,914</span>
              <span>👁 21.7k</span>
            </div>
          </motion.div>

        </motion.div>

        <div className={styles.ctaContainer}>
          <button onClick={() => setIsModalOpen(true)} className={styles.reviewBtn}>
            Write a Review
          </button>
        </div>
      </div>

      {/* Review Modal */}
      <div className={`${styles.modalOverlay} ${isModalOpen ? styles.open : ''}`}>
        <div className={styles.modalContent}>
          <button className={styles.modalClose} onClick={() => setIsModalOpen(false)}>×</button>
          
          {isSubmitted ? (
            <div className={styles.successMessage}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
              Thank you for your review!
            </div>
          ) : (
            <>
              <h3 className={styles.modalTitle}>Write a Review</h3>
              <p className={styles.modalSubtitle}>Share your experience with WhiteAu Bullion</p>
              
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label>Your Rating</label>
                  <div className={styles.starRating}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span 
                        key={star} 
                        className={star <= rating ? styles.active : ''}
                        onClick={() => setRating(star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className={styles.formGroup}>
                  <label>Your Name</label>
                  <input type="text" className={styles.formInput} placeholder="e.g. Rahul M." required />
                </div>
                
                <div className={styles.formGroup}>
                  <label>Your Review</label>
                  <textarea className={styles.formTextarea} placeholder="Tell us about your experience..." required></textarea>
                </div>
                
                <button type="submit" className={styles.submitBtn}>Submit Review</button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
