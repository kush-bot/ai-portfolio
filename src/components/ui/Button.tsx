'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  className = '',
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-full cursor-pointer';

  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]',
    secondary: 'bg-card text-foreground border border-border hover:bg-muted/50',
    ghost: 'hover:bg-muted/50 text-foreground',
  };

  const sizes = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-10 py-2 px-6',
    lg: 'h-12 px-8 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
