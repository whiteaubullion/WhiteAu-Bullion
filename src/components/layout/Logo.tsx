import React from 'react';
import Image from 'next/image';

interface LogoProps {
  variant?: 'full' | 'mark' | 'secondary';
  className?: string;
  iconColor?: string;
  textColor?: string;
  size?: number; // width and height for the monogram
}

export default function Logo({ 
  variant = 'full', 
  className = '', 
  iconColor = 'var(--color-gold)', 
  textColor = 'var(--color-gold)', 
  size = 52 
}: LogoProps) {
  const monogram = (
    <Image 
      src="/gold-logo.webp" 
      alt="WhiteAu Gold Logo" 
      width={size}
      height={size}
      style={{ 
        width: `${size}px`, 
        height: `${size}px`, 
        objectFit: 'contain'
      }} 
    />
  );

  const wordmark = (
    <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.8rem', fontWeight: 600, lineHeight: 1, color: textColor, display: 'inline-block' }}>
      White Au.
    </span>
  );

  if (variant === 'mark') {
    return <div className={className}>{monogram}</div>;
  }

  return (
    <div className={className} style={{ display: 'inline-flex', alignItems: 'center' }}>
      {monogram}
      <div style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '0.8rem', marginTop: '0.4rem' }}>
        {wordmark}
      </div>
    </div>
  );
}
