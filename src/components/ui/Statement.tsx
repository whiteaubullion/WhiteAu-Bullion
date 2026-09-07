import React from 'react';
import styles from './Statement.module.css';

export default function Statement() {
  return (
    <section className={styles.statementSection}>
      <div className={styles.particles}></div>
      <div className={`container ${styles.statementContainer}`}>
        <h2>YOUR GOLD<br/>DESERVES BETTER.</h2>
        <p>Where trust meets technology, and selling gold becomes a better experience.</p>
      </div>
    </section>
  );
}
