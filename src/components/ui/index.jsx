import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Button = ({ className, variant = 'primary', size = 'md', ...props }) => {
  const variants = {
    primary: 'bg-accent-blue text-white hover:bg-opacity-90',
    secondary: 'bg-primary-border text-text-primary hover:bg-primary-hover',
    outline: 'border border-primary-border text-text-primary hover:bg-primary-hover',
    ghost: 'text-text-secondary hover:text-text-primary hover:bg-primary-hover',
    danger: 'bg-accent-red text-white hover:bg-opacity-90',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm font-medium',
    lg: 'px-6 py-3 text-base font-semibold',
  };

  return (
    <button
      className={cn(
        'rounded-lg transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
};

export const Badge = ({ children, variant = 'gray', className }) => {
  const variants = {
    green: 'bg-accent-green/10 text-accent-green border-accent-green/20',
    red: 'bg-accent-red/10 text-accent-red border-accent-red/20',
    blue: 'bg-accent-blue/10 text-accent-blue border-accent-blue/20',
    gold: 'bg-accent-gold/10 text-accent-gold border-accent-gold/20',
    gray: 'bg-text-secondary/10 text-text-secondary border-text-secondary/20',
  };

  return (
    <span className={cn(
      'px-2 py-0.5 text-[10px] uppercase font-bold rounded-full border',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};

export const Card = ({ children, className, title, extra }) => {
  return (
    <div className={cn(
      'bg-primary-card border border-primary-border rounded-xl overflow-hidden',
      className
    )}>
      {(title || extra) && (
        <div className="px-6 py-4 border-b border-primary-border flex items-center justify-between">
          <h3 className="font-bold text-lg">{title}</h3>
          <div>{extra}</div>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};
