import React from 'react';
import styles from './WhatWeBuy.module.css';

const items = [
  { title: "Gold Jewellery", color: "#C1C9C1", textCol: "#ffffff", bgImage: "url('/images/gold-jewellery.png')" },
  { title: "Gold Coins", color: "#A8A194", textCol: "#ffffff", bgImage: "url('/images/gold-coins.png')" },
  { title: "Gold Bars", color: "#E7D5BD", textCol: "#ffffff", bgImage: "url('/images/gold-bars.jpg')" },
  { title: "Other Eligible Gold Articles", color: "#D6B277", textCol: "#ffffff", bgImage: "url('/images/other-gold.jpg')" }
];

export default function WhatWeBuy() {
  return (
    <section className="section-padding">
      <div className="container">
        <h2 className={styles.sectionTitle}>What Can You Sell?</h2>
        
        <div className={styles.grid}>
          {items.map((item, index) => (
            <div 
              key={index} 
              className={styles.card}
              style={{ 
                backgroundColor: item.color,
                backgroundImage: item.bgImage,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className={styles.content}>
                <h3 style={{ color: item.textCol }}>{item.title}</h3>
                <div className={styles.arrow} style={{ color: item.textCol }}>→</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
