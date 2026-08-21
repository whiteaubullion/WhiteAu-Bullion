'use client';

import React, { useState } from 'react';
import styles from './Accordion.module.css';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => (
        <div 
          key={index} 
          className={`${styles.item} ${activeIndex === index ? styles.active : ''}`}
        >
          <button 
            className={styles.header} 
            onClick={() => toggleItem(index)}
            aria-expanded={activeIndex === index}
          >
            <span className={styles.question}>{item.question}</span>
            <span className={styles.icon}>{activeIndex === index ? '−' : '+'}</span>
          </button>
          <div 
            className={styles.content}
            style={{ maxHeight: activeIndex === index ? '500px' : '0' }}
          >
            <div className={styles.answer}>
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
