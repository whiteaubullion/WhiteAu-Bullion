import React from 'react';
import styles from './Button.module.css';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  href?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function Button({ children, variant = 'primary', href, onClick, className = '', style }: ButtonProps) {
  const btnClass = `${styles.button} ${styles[variant]} ${className}`;
  
  if (href) {
    return (
      <Link href={href} className={btnClass} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={btnClass} style={style}>
      {children}
    </button>
  );
}
