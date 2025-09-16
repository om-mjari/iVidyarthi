import React from 'react';

const Logo = ({ 
  size = 'medium', 
  showText = true, 
  onClick = null,
  className = '',
  style = {} 
}) => {
  const sizes = {
    small: { width: '32px', height: '32px', fontSize: '0.9rem' },
    medium: { width: '40px', height: '40px', fontSize: '1rem' },
    large: { width: '60px', height: '60px', fontSize: '1.2rem' },
    xlarge: { width: '80px', height: '80px', fontSize: '1.4rem' }
  };

  const logoSize = sizes[size] || sizes.medium;

  return (
    <div 
      className={`logo-container ${className}`}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: showText ? '0.75rem' : '0',
        cursor: onClick ? 'pointer' : 'default',
        ...style
      }}
    >
      {/* Logo Image - Replace src with your actual logo path */}
      <img 
        src="/src/assets/logo.png" // Update this path to your logo file
        alt="iVidhyarthi Logo"
        style={{
          width: logoSize.width,
          height: logoSize.height,
          objectFit: 'contain',
          borderRadius: '8px'
        }}
        onError={(e) => {
          // Fallback to text logo if image fails to load
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
      
      {/* Fallback Text Logo */}
      <div 
        style={{
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          width: logoSize.width,
          height: logoSize.height,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '8px',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '0.8rem'
        }}
      >
        iV
      </div>

      {/* Logo Text */}
      {showText && (
        <span 
          style={{
            color: 'inherit',
            fontSize: logoSize.fontSize,
            fontWeight: '700',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
          }}
        >
          iVidhyarthi
        </span>
      )}
    </div>
  );
};

export default Logo;
