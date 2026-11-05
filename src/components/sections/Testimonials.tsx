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

const DEFAULT_CARD_REVIEWS: Review[] = [
  {
    id: "rev-default-1",
    name: "Vishnu",
    role: "Verified Client",
    rating: 5,
    title: "Highly satisfied with my valuation, thank you!",
    text: "They tested my gold right in front of me and offered the live market rate without deductions.",
    date: "2 days ago"
  },
  {
    id: "rev-default-2",
    name: "Bibin",
    role: "Verified Client",
    rating: 5,
    title: "Transparent & Fast Service",
    text: "I absolutely loved the transparency. It's not only secure but also very fast, making it a perfect solution for selling gold.",
    date: "2 days ago"
  },
  {
    id: "rev-default-3",
    name: "Ejas",
    role: "Verified Client",
    rating: 5,
    title: "Prompt and helpful responses to my inquiry!",
    text: "WhiteAu gave me the highest valuation for my gold with instant bank transfer within 10 minutes.",
    date: "3 days ago"
  },
  {
    id: "rev-default-4",
    name: "Nikhil & Maya",
    role: "Local Clients",
    rating: 5,
    title: "Incredible service and honesty",
    text: "Perfect experience, exceeded our expectations. Releasing pledged gold was smooth and direct.",
    date: "1 week ago"
  },
  {
    id: "rev-default-5",
    name: "Sherin",
    role: "Local Client",
    rating: 5,
    title: "Smooth and secure experience",
    text: "Very smooth experience. The staff was polite and explained the purity test clearly. Got my money transferred to my account in minutes.",
    date: "2 weeks ago"
  },
  {
    id: "rev-default-6",
    name: "Fahad",
    role: "Verified Customer",
    rating: 5,
    title: "Amazing Experience!",
    text: "When it comes to releasing pledged gold, this service is top-notch. Truly transparent valuation.",
    date: "3 weeks ago"
  }
];

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
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 70, damping: 16 }
  }
};

export default function Testimonials() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [showMore, setShowMore] = React.useState(false);
  const [reviewsList, setReviewsList] = React.useState<Review[]>(DEFAULT_CARD_REVIEWS);

  // Form state
  const [rating, setRating] = React.useState(5);
  const [name, setName] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [reviewText, setReviewText] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  // Load reviews on mount from /api/reviews
  React.useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        if (data?.reviews && Array.isArray(data.reviews) && data.reviews.length > 0) {
          setReviewsList(data.reviews);
        }
      })
      .catch((e) => {
        console.error('Error loading reviews from backend:', e);
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

  // Fast, instant submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanText = reviewText.trim();
    const cleanTitle = title.trim();

    if (!cleanName || !cleanText) return;

    setIsSubmitting(true);

    const optimisticReview: Review = {
      id: `rev-${Date.now()}`,
      name: cleanName,
      role: 'Verified Customer',
      rating,
      title: cleanTitle || 'Great Customer Experience',
      text: cleanText,
      date: 'Just now',
      isNew: true
    };

    // 1. Instant local update: the review appears immediately on the homepage
    setReviewsList((prev) => [optimisticReview, ...prev.filter(r => r.id !== optimisticReview.id)]);
    setIsSubmitting(false);
    setIsSubmitted(true);

    // 2. Fast background persist to Supabase & backend
    fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: optimisticReview.name,
        role: optimisticReview.role,
        rating: optimisticReview.rating,
        title: optimisticReview.title,
        text: optimisticReview.text,
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.reviews && Array.isArray(data.reviews)) {
          setReviewsList(data.reviews);
        }
      })
      .catch((err) => {
        console.warn('Background review sync error:', err);
      });

    // 3. Fast auto-close modal in 750ms
    setTimeout(() => {
      setIsModalOpen(false);
      setTimeout(() => {
        setIsSubmitted(false);
        setName('');
        setTitle('');
        setReviewText('');
        setRating(5);
      }, 300);
    }, 750);
  };

  // Build the 6 dynamic cards: take from real reviewsList first, pad with defaults
  const displayCards: Review[] = React.useMemo(() => {
    const list = [...reviewsList];
    for (const def of DEFAULT_CARD_REVIEWS) {
      if (list.length >= 6) break;
      if (!list.some(r => r.name.toLowerCase() === def.name.toLowerCase())) {
        list.push(def);
      }
    }
    return list.slice(0, 6);
  }, [reviewsList]);

  const card1 = displayCards[0] || DEFAULT_CARD_REVIEWS[0];
  const card2 = displayCards[1] || DEFAULT_CARD_REVIEWS[1];
  const card3 = displayCards[2] || DEFAULT_CARD_REVIEWS[2];
  const card4 = displayCards[3] || DEFAULT_CARD_REVIEWS[3];
  const card5 = displayCards[4] || DEFAULT_CARD_REVIEWS[4];
  const card6 = displayCards[5] || DEFAULT_CARD_REVIEWS[5];

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
            {card1.isNew && <span className={styles.newReviewBadge} style={{ position: 'absolute', top: 12, right: 12 }}>New</span>}
            <div className={styles.starsCenter}>
              {Array.from({ length: Math.min(5, Math.max(1, card1.rating)) }).map((_, i) => (
                <span key={i} className={styles.star}>★</span>
              ))}
            </div>
            <h3 className={styles.titleCenter}>{card1.title || card1.text}</h3>
            <div className={styles.pills}>
              <span className={styles.pill}>Fast service</span>
              <span className={styles.pill}>Best Value</span>
              <span className={styles.pill}>Verified</span>
            </div>
            <p className={styles.authorTag}>- {card1.name} -</p>
          </motion.div>

          {/* Card 2: Top middle wide card */}
          <motion.div variants={cardVariants} className={`${styles.card} ${styles.cardWide1} ${styles.cardYellow}`}>
            {card2.isNew && <span className={styles.newReviewBadge} style={{ position: 'absolute', top: 12, right: 12 }}>New</span>}
            <div className={styles.cardTopRow}>
              <div className={styles.authorSmall}>
                <div className={styles.avatarSmall}>
                  {card2.name ? card2.name.charAt(0).toUpperCase() : 'C'}
                </div>
                <div className={styles.authorInfoSmall}>
                  <span className={styles.nameSmall}>{card2.name}</span>
                  <span className={styles.timeSmall}>{card2.date || 'Recent'}</span>
                </div>
              </div>
              <div className={styles.ratingPill}>★ {card2.rating}.0/5.0</div>
            </div>
            <p className={styles.textSmall}>{card2.text}</p>
            {card2.title && <p className={styles.readMore}>{card2.title}</p>}
          </motion.div>

          {/* Card 3: Huge center card (Hero Review) */}
          <motion.div variants={cardVariants} className={`${styles.card} ${styles.cardHuge} ${styles.cardWhite}`}>
            {card3.isNew && <span className={styles.newReviewBadge} style={{ position: 'absolute', top: 12, right: 12 }}>New</span>}
            <div className={styles.cardTopRow}>
              <div className={styles.author}>
                <div className={styles.avatar}>
                  {card3.name ? card3.name.charAt(0).toUpperCase() : 'C'}
                </div>
                <div className={styles.authorInfo}>
                  <span className={styles.name}>{card3.name}</span>
                  <span className={styles.role}>{card3.role || 'Verified Client'}</span>
                </div>
              </div>
              <div className={styles.starsRight}>
                {Array.from({ length: Math.min(5, Math.max(1, card3.rating)) }).map((_, i) => (
                  <span key={i} className={styles.star}>★</span>
                ))}
              </div>
            </div>
            <h3 className={styles.cardTitle}>{card3.title || 'Exceptional Valuation & Transparent Service'}</h3>
            <p className={styles.cardSubtitle}>{card3.text}</p>
          </motion.div>

          {/* Card 4: Top right square */}
          <motion.div variants={cardVariants} className={`${styles.card} ${styles.cardSquare1} ${styles.cardYellow}`}>
            {card4.isNew && <span className={styles.newReviewBadge} style={{ position: 'absolute', top: 12, right: 12 }}>New</span>}
            <p className={styles.dateSmall}>{card4.name} {card4.role ? `• ${card4.role}` : ''}</p>
            <h3 className={styles.titleMedium}>{card4.title || 'Incredible service'}</h3>
            <p className={styles.textMedium}>{card4.text}</p>
            <div className={styles.starsLeft}>
              {Array.from({ length: Math.min(5, Math.max(1, card4.rating)) }).map((_, i) => (
                <span key={i} className={styles.star}>★</span>
              ))}
            </div>
          </motion.div>

          {/* Card 5: Bottom left wide */}
          <motion.div variants={cardVariants} className={`${styles.card} ${styles.cardWide2} ${styles.cardWhite}`}>
            {card5.isNew && <span className={styles.newReviewBadge} style={{ position: 'absolute', top: 12, right: 12 }}>New</span>}
            <div className={styles.starsLeft}>
              {Array.from({ length: Math.min(5, Math.max(1, card5.rating)) }).map((_, i) => (
                <span key={i} className={styles.star}>★</span>
              ))}
            </div>
            <p className={styles.textSmall}>{card5.text}</p>
            <div className={styles.authorBottomRight}>
              <div className={styles.authorInfoRight}>
                <span className={styles.nameSmall}>{card5.name}</span>
                <span className={styles.timeSmall}>{card5.role || 'Local Client'}</span>
              </div>
              <div className={styles.avatarSmall}>
                {card5.name ? card5.name.charAt(0).toUpperCase() : 'C'}
              </div>
            </div>
            <span className={styles.pillBottomLeft}>Verified review</span>
          </motion.div>

          {/* Card 6: Bottom right tall card */}
          <motion.div variants={cardVariants} className={`${styles.card} ${styles.cardTall2} ${styles.cardYellow}`}>
            {card6.isNew && <span className={styles.newReviewBadge} style={{ position: 'absolute', top: 12, right: 12 }}>New</span>}
            <div className={styles.avatarLarge}>
              {card6.name ? card6.name.charAt(0).toUpperCase() : 'C'}
            </div>
            <p style={{textAlign: 'center', fontWeight: 600, marginTop: '0.5rem', marginBottom: '0.5rem'}}>{card6.name}</p>
            <h3 className={styles.titleCenter}>{card6.title || 'Amazing Experience!'}</h3>
            <p className={styles.textCenterSmall}>{card6.text}</p>
            <div className={styles.statsRow}>
              <span>★ {card6.rating}.0 Rating</span>
              <span>🤍 Verified</span>
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
            transition={{ duration: 0.3 }}
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
