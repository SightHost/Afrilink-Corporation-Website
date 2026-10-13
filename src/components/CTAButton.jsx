import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CTAButton({
  children,
  onClick,
  href,
  variant = 'orange',
  size = 'md',
  className = '',
  icon = true,
  disabled = false,
  type = 'button'
}) {
  // Pill buttons, sentence case, 600 weight: matches afrilinkbuilding.co.za
  const baseStyles = 'inline-flex items-center justify-center font-semibold tracking-[0.015em] transition-all duration-300 rounded-full group relative overflow-hidden text-center';

  const sizeStyles = {
    sm: 'text-sm px-4 py-2 gap-2',
    md: 'text-base px-[23px] py-[11px] gap-2.5',
    lg: 'text-base px-8 py-3.5 gap-3',
    xl: 'text-lg px-10 py-4 gap-3'
  };

  const variantStyles = {
    orange: 'bg-afrilink-orange-btn text-white hover:bg-afrilink-orange-hover border border-transparent',
    // outline-light is for use on dark/orange backgrounds
    outline: 'bg-transparent text-afrilink-navy border border-afrilink-navy/25 hover:border-afrilink-orange hover:text-afrilink-orange',
    'outline-light': 'bg-transparent text-white border border-white/60 hover:bg-white hover:text-afrilink-navy',
    gold: 'bg-afrilink-gold text-afrilink-navy hover:bg-afrilink-butter border border-transparent',
    ghost: 'bg-transparent text-afrilink-navy hover:text-afrilink-orange border border-transparent'
  };

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {icon && (
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 relative z-10 shrink-0" />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {content}
    </button>
  );
}
