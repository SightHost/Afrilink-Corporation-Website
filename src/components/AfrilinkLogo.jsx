import React from 'react';
import { withBase } from '../lib/paths';

export default function AfrilinkLogo({ className = '', imgClassName = 'h-10', variant = 'full', light = false, onClick }) {
  if (variant === 'icon') {
    return (
      <div 
        onClick={onClick} 
        className={`flex items-center justify-center cursor-pointer ${className}`}
        title="Afrilink Corporation (Pty) Ltd"
      >
        <img
          src={withBase('/afrilink-logo.png')}
          alt="Afrilink Corporation"
          className={`${imgClassName} w-auto object-contain`}
          onError={e => { e.target.src = withBase('/afrilink-logo-white.png'); }}
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
        src={light ? withBase('/afrilink-logo-white.png') : withBase('/afrilink-logo.png')}
        alt="Afrilink Corporation"
        className={`${imgClassName} w-auto object-contain`}
        onError={e => {
          // try the other one
          e.target.onerror = null;
          e.target.src = light ? withBase('/afrilink-logo.png') : withBase('/afrilink-logo-white.png');
        }}
      />
    </div>
  );
}
