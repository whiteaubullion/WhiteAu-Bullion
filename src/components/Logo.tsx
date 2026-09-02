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
        filter: 'drop-shadow(0 2px 6px rgba(201, 148, 46, 0.25))'
      }} 
    />
  );

  const wordmark = (
    <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2.1rem', fontWeight: 600, lineHeight: 1, color: textColor, display: 'inline-block' }}>
      White Au.
    </span>
  );

  const bullion = (
    <span style={{ display: 'block', fontFamily: 'var(--font-montserrat)', fontSize: '0.58rem', letterSpacing: '0.45em', color: textColor, textAlign: 'center', marginTop: '0.25rem', textTransform: 'uppercase', paddingLeft: '0.45em' }}>
      BULLION
    </span>
  );

  if (variant === 'mark') {
    return <div className={className}>{monogram}</div>;
  }

  return (
    <div className={className} style={{ display: 'inline-flex', alignItems: 'center' }}>
      {monogram}
      <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', marginLeft: '0.6rem' }}>
        {wordmark}
        {bullion}
      </div>
    </div>
  );
}
