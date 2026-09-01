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
  iconColor = '#2F2117', // Website primary dark color
  textColor = '#2F2117', // Website primary dark color
  size = 52 // A little bit bigger
}: LogoProps) {
  const monogram = (
    <img 
      src="/gold-logo.png" 
      alt="WhiteAu Gold Logo" 
      style={{ 
        width: `${size}px`, 
        height: 'auto', 
        display: 'inline-block', 
        verticalAlign: 'middle',
        marginTop: '5px',
        filter: 'drop-shadow(0 2px 6px rgba(201, 148, 46, 0.25))'
      }} 
    />
  );

  const wordmark = (
    <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2rem', lineHeight: 1, color: textColor, marginLeft: '0.5rem', display: 'inline-block', verticalAlign: 'middle' }}>
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
