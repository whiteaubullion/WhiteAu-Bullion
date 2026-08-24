import React from 'react';

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
  iconColor = '#000000', // Default to Black icon
  textColor = '#000000', // Default to Black text
  size = 52 // A little bit bigger
}: LogoProps) {
  const monogram = (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="monogram" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      {/* Curved Arch */}
      <path d="M10 80 Q50 30 90 80" stroke={iconColor} strokeWidth="2" fill="none" />
      {/* W */}
      <path d="M15 40 L35 90 L50 60 L65 90 L85 40" stroke={iconColor} strokeWidth="3" fill="none" strokeLinejoin="round" />
      {/* A */}
      <path d="M50 20 L25 80 M50 20 L75 80 M35 60 L65 60" stroke={iconColor} strokeWidth="3" fill="none" strokeLinejoin="round" />
      {/* Star Accent */}
      <path d="M50 5 L53 12 L60 15 L53 18 L50 25 L47 18 L40 15 L47 12 Z" fill={iconColor} />
    </svg>
  );

  const wordmark = (
    <span style={{ fontFamily: 'var(--font-libre-baskerville)', fontSize: '2rem', lineHeight: 1, color: textColor, marginLeft: '0.5rem', display: 'inline-block', verticalAlign: 'middle' }}>
      White Au.
    </span>
  );

  const bullion = (
    <span style={{ display: 'block', fontFamily: 'var(--font-montserrat)', fontSize: '0.6rem', letterSpacing: '0.4em', color: textColor, textAlign: 'center', marginTop: '0.2rem', textTransform: 'uppercase' }}>
      Bullion
    </span>
  );

  if (variant === 'mark') {
    return <div className={className}>{monogram}</div>;
  }

  if (variant === 'secondary') {
    return (
      <div className={className} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {monogram}
          {wordmark}
        </div>
        {bullion}
      </div>
    );
  }

  // full variant
  return (
    <div className={className} style={{ display: 'inline-flex', alignItems: 'center' }}>
      {monogram}
      {wordmark}
    </div>
  );
}
