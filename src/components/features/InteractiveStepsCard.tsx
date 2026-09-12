'use client';
import React, { useState } from 'react';
import styles from './InteractiveStepsCard.module.css';
import { motion, AnimatePresence } from 'framer-motion';

export type StepItem = {
  id: string;
  title: string;
  content: React.ReactNode;
};

export default function InteractiveStepsCard({ 
  title, 
  subtitle, 
  steps, 
  imageSrc 
}: { 
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  steps: StepItem[];
  imageSrc: string;
}) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.cardWrapper}>
          <div className={styles.stepsList}>
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div key={step.id} className={`${styles.stepItem} ${isActive ? styles.active : ''}`}>
                  <button className={styles.stepHeader} onClick={() => setActiveStep(idx)}>
                    <span className={styles.stepNumber}>{idx + 1}</span>
                    <span className={styles.stepTitle}>{step.title}</span>
                    <span className={styles.chevron}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isActive ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }}><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </span>
                  </button>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className={styles.stepContent}
                      >
                        {step.content}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className={styles.imageWrapper}>
            <img src={imageSrc} alt="Steps Guide" className={styles.modelImage} />
          </div>
        </div>
      </div>
    </div>
  );
}
