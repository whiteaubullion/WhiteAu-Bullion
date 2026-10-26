'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import styles from './Testimonials.module.css';

interface Review {
  id: string | number;
  name: string;
  role?: string;
  rating: number;
  title?: string;
  text: string;
  date?: string;
  isNew?: boolean;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-1",
    name: "Rahul M.",
    role: "Verified Customer",
    rating: 5,
    title: "Extremely transparent and professional!",
    text: "They tested my gold right in front of me and offered the live market rate.",
    date: "2 days ago"
  },
  {
    id: "rev-2",
    name: "Sneha K.",
    role: "Local Client",
    rating: 5,
    title: "The instant payment was a lifesaver.",
    text: "I was skeptical about selling my old jewellery, but the team made it secure and easy.",
    date: "4 days ago"
  },
  {
    id: "rev-3",
    name: "David T.",
    role: "Verified Customer",
    rating: 5,
    title: "Best valuation in Kerala.",
    text: "WhiteAu gave me the most honest and highest return for my pledged gold.",
    date: "1 week ago"
  },
  {
    id: "rev-4",
    name: "Anjali S.",
    role: "Local Client",
    rating: 4,
    title: "Very smooth experience.",
    text: "The staff explained the purity test clearly. Got money transferred in minutes.",
    date: "2 weeks ago"
  },
  {
    id: "rev-5",
    name: "Vikram P.",
    role: "Verified Customer",
    rating: 5,
    title: "Totally hassle-free!",
    text: "Releasing my pledged gold was a headache until I found them. They handled the bank directly.",
    date: "3 weeks ago"
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
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [showMore, setShowMore] = React.useState(false);
  const [reviewsList, setReviewsList] = React.useState<Review[]>(INITIAL_REVIEWS);

  // Form state
  const [rating, setRating] = React.useState(5);
  const [name, setName] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [reviewText, setReviewText] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  // Load reviews on mount from localStorage and /api/reviews
  React.useEffect(() => {
    let localRev: Review[] = [];
    try {
      const stored = localStorage.getItem('whiteau_user_reviews');
      if (stored) {
        localRev = JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading local reviews:', e);
    }

    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        if (data?.reviews && Array.isArray(data.reviews)) {
          const ids = new Set(localRev.map((r) => String(r.id)));
          const merged = [...localRev, ...data.reviews.filter((r: Review) => !ids.has(String(r.id)))];
          setReviewsList(merged.length > 0 ? merged : INITIAL_REVIEWS);
        } else if (localRev.length > 0) {
          const ids = new Set(localRev.map((r) => String(r.id)));
          const merged = [...localRev, ...INITIAL_REVIEWS.filter((r) => !ids.has(String(r.id)))];
          setReviewsList(merged);
        }
      })
      .catch(() => {
        if (localRev.length > 0) {
          const ids = new Set(localRev.map((r) => String(r.id)));
          const merged = [...localRev, ...INITIAL_REVIEWS.filter((r) => !ids.has(String(r.id)))];
          setReviewsList(merged);
        }
      });
  }, []);

  // Handle escape key to close modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !reviewText.trim()) return;

    setIsSubmitting(true);

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      name: name.trim(),
      role: 'Verified Customer',
      rating,
      title: title.trim() || 'Great Customer Experience',
      text: reviewText.trim(),
      date: 'Just now',
      isNew: true
    };

    // Update state immediately
    const updated = [newReview, ...reviewsList];
    setReviewsList(updated);
    setShowMore(true);

    // Save to localStorage
    try {
      const stored = localStorage.getItem('whiteau_user_reviews');
      const existing: Review[] = stored ? JSON.parse(stored) : [];
      localStorage.setItem('whiteau_user_reviews', JSON.stringify([newReview, ...existing]));
    } catch (err) {
      console.error('Failed saving review to localStorage:', err);
    }

    // Post to API route
    try {
      await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      });
    } catch (err) {
      console.error('Failed saving review to API:', err);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsModalOpen(false);
      setTimeout(() => {
        setIsSubmitted(false);
        setName('');
        setTitle('');
        setReviewText('');
        setRating(5);
      }, 500);
    }, 2000);
  };

  return (
    <section className={styles.testimonialsSection} style={isModalOpen ? { zIndex: 99999 } : undefined}>
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

        {/* CTA Container with More Reviews toggle and Write a Review button */}
        <div className={styles.ctaContainer}>
          <button 
            type="button"
            onClick={() => setShowMore(!showMore)} 
            className={styles.moreReviewsBtn}
            aria-expanded={showMore}
          >
            {showMore ? 'Hide Reviews' : 'More Reviews'}
            <span className={styles.countBadge}>{reviewsList.length}</span>
            <span>{showMore ? '▲' : '▼'}</span>
          </button>

          <button 
            type="button"
            onClick={() => setIsModalOpen(true)} 
            className={styles.reviewBtn}
          >
            ★ Write a Review
          </button>
        </div>

        {/* Expandable More Reviews Section */}
        {showMore && (
          <motion.div 
            className={styles.moreReviewsSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.moreReviewsHeader}>
              <h3>Customer Reviews ({reviewsList.length})</h3>
              <p className={styles.reviewerRole}>Verified feedback from our valued customers</p>
            </div>

            <div className={styles.moreReviewsGrid}>
              {reviewsList.map((rev) => (
                <div key={rev.id} className={styles.moreReviewCard}>
                  {rev.isNew && <span className={styles.newReviewBadge}>New</span>}
                  
                  <div className={styles.reviewCardTop}>
                    <div className={styles.reviewAvatar}>
                      {rev.name ? rev.name.charAt(0).toUpperCase() : 'C'}
                    </div>
                    <div className={styles.reviewMeta}>
                      <span className={styles.reviewerName}>{rev.name}</span>
                      <span className={styles.reviewerRole}>{rev.role || 'Verified Customer'}</span>
                    </div>
                  </div>

                  <div className={styles.reviewStars}>
                    {'★'.repeat(Math.max(1, Math.min(5, rev.rating)))}
                    {'☆'.repeat(Math.max(0, 5 - Math.max(1, Math.min(5, rev.rating))))}
                  </div>

                  {rev.title && <h4 className={styles.reviewTitle}>{rev.title}</h4>}
                  <p className={styles.reviewBody}>{rev.text}</p>
                  <div className={styles.reviewDate}>{rev.date || 'Recent'}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Review Modal */}
      <div 
        className={`${styles.modalOverlay} ${isModalOpen ? styles.open : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsModalOpen(false);
        }}
      >
        <div className={styles.modalContent}>
          <button 
            type="button" 
            className={styles.modalClose} 
            onClick={() => setIsModalOpen(false)}
            aria-label="Close modal"
          >
            ×
          </button>
          
          {isSubmitted ? (
            <div className={styles.successMessage}>
              <div style={{ fontSize: '3rem', marginBottom: '0.75rem', color: '#10b981' }}>✓</div>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#2F2117', fontSize: '1.4rem' }}>Thank You!</h4>
              <p style={{ margin: 0, color: 'rgba(0, 0, 0, 0.7)', fontSize: '0.95rem' }}>
                Your review has been successfully added and is now visible on our website.
              </p>
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
                        role="button"
                        tabIndex={0}
                        aria-label={`${star} star`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className={styles.formGroup}>
                  <label>Your Name *</label>
                  <input 
                    type="text" 
                    className={styles.formInput} 
                    placeholder="e.g. Rahul M." 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Review Headline (Optional)</label>
                  <input 
                    type="text" 
                    className={styles.formInput} 
                    placeholder="e.g. Excellent gold valuation and fast service" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label>Your Review *</label>
                  <textarea 
                    className={styles.formTextarea} 
                    placeholder="Tell us about your experience..." 
                    required
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className={styles.submitBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
