'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from './ProcessAccordion.module.css';

export interface ProcessStep {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface ProcessGroup {
  groupName: string;
  steps: ProcessStep[];
}

interface ProcessAccordionProps {
  groups: ProcessGroup[];
}

export default function ProcessAccordion({ groups }: ProcessAccordionProps) {
  // Store the active step index globally across all groups
  const [activeStepId, setActiveStepId] = useState<string | null>(null);

  const toggleStep = (id: string) => {
    setActiveStepId(prev => prev === id ? null : id);
  };

  return (
    <div className={styles.accordionContainer}>
      {groups.map((group, groupIdx) => (
        <div key={groupIdx} className={styles.groupContainer}>
          {group.groupName && (
            <div className={styles.groupLabel}>{group.groupName}</div>
          )}
          
          <div className={styles.stepsList}>
            {group.steps.map((step) => {
              const isActive = activeStepId === step.id;
              
              return (
                <div 
                  key={step.id} 
                  className={`${styles.stepCard} ${isActive ? styles.active : ''}`}
                >
                  <button 
                    className={styles.stepHeader}
                    onClick={() => toggleStep(step.id)}
                    aria-expanded={isActive}
                  >
                    <div className={styles.headerLeft}>
                      <span className={styles.stepNumber}>{step.id}</span>
                      <span className={styles.stepTitle}>{step.title}</span>
                    </div>
                    <div className={`${styles.chevron} ${isActive ? styles.chevronOpen : ''}`}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </button>
                  
                  <div 
                    className={styles.stepContentWrapper}
                    style={{ 
                      maxHeight: isActive ? '1000px' : '0',
                      opacity: isActive ? 1 : 0,
                    }}
                  >
                    <div className={styles.stepContentInner}>
                      {step.content}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
