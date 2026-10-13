import React from 'react';

export default function AfrilinkLogo({ className = '', variant = 'full', light = false, onClick }) {
  if (variant === 'icon') {
    return (
      <div 
        onClick={onClick} 
        className={`flex items-center justify-center cursor-pointer ${className}`}
        title="Afrilink Corporation (Pty) Ltd"
      >
        <img
          src="/afrilink-logo.png"
          alt="Afrilink Corporation"
          className="h-10 w-auto object-contain"
          onError={e => { e.target.src = '/afrilink-logo-white.png'; }}
        />
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className={`inline-flex items-center cursor-pointer select-none group ${className}`}
      title="Afrilink Corporation (Pty) Ltd — Making Diaspora Work"
    >
      <img
        src={light ? '/afrilink-logo-white.png' : '/afrilink-logo.png'}
        alt="Afrilink Corporation"
        className="h-10 w-auto object-contain"
        onError={e => {
          // try the other one
          e.target.onerror = null;
          e.target.src = light ? '/afrilink-logo.png' : '/afrilink-logo-white.png';
        }}
      />
    </div>
  );
}
