import React from 'react';
import styles from './Button.module.css';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function Button({ children, variant = 'primary', href, onClick, className = '' }: ButtonProps) {
  const btnClass = `${styles.button} ${styles[variant]} ${className}`;
  
  if (href) {
    return (
      <Link href={href} className={btnClass}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={btnClass}>
      {children}
    </button>
  );
}
