'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './InteractiveTimeline.module.css';

const steps = [
  { title: "Contact Us", desc: "Reach out to schedule your free valuation." },
  { title: "Bring Your ID Proof", desc: "Carry a valid government ID for a secure process." },
  { title: "Gold Purity Testing", desc: "We test your gold's purity precisely in front of you." },
  { title: "Check Gold Rate", desc: "We provide the transparent, live gold rate." },
  { title: "Complete KYC", desc: "A simple and quick verification process." },
  { title: "Receive Your Payment", desc: "Instant transfer directly to your bank account." },
  { title: "Get More With Your Gold", desc: "Walk away with the best value for your gold." }
];

export default function InteractiveTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveIndices((prev) => {
              const newSet = new Set(prev);
              newSet.add(index);
              return newSet;
            });
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -15% 0px',
        threshold: 0.5,
      }
    );

    const stepElements = document.querySelectorAll('.timeline-step');
    stepElements.forEach((el) => observer.observe(el));

    return () => {
      stepElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="section-padding" id="how-it-works" style={{backgroundColor: '#fff'}}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Sell Gold. Simply. Securely.</h2>
        </div>
        
        <div className={styles.timelineContainer} ref={containerRef}>
          <div className={styles.timelineLine}></div>
          <div className={styles.timelineLineActive} style={{ height: activeIndices.size > 0 ? `${(Math.max(...Array.from(activeIndices)) / (steps.length - 1)) * 100}%` : '0%' }}></div>
          
          {steps.map((step, index) => {
            const isActive = activeIndices.has(index);
            const isSubdued = activeIndices.size > 0 && Math.max(...Array.from(activeIndices)) > index;

            return (
              <div 
                key={index} 
                data-index={index}
                className={`timeline-step ${styles.step} ${isActive ? styles.active : ''} ${isSubdued ? styles.subdued : ''}`}
              >
                <div className={styles.numberWrapper}>
                  <div className={styles.number}>0{index + 1}</div>
                </div>
                
                <div className={styles.card}>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
