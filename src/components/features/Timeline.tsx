import React from 'react';
import styles from './Timeline.module.css';

interface TimelineStep {
  title: string;
  description?: string;
}

interface TimelineProps {
  steps: TimelineStep[];
}

export default function Timeline({ steps }: TimelineProps) {
  return (
    <div className={styles.timeline}>
      {steps.map((step, index) => (
        <div key={index} className={styles.step}>
          <div className={styles.markerContainer}>
            <div className={styles.marker}>{index + 1}</div>
            {index < steps.length - 1 && <div className={styles.line}></div>}
          </div>
          <div className={styles.content}>
            <h4 className={styles.title}>{step.title}</h4>
            {step.description && <p className={styles.description}>{step.description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
