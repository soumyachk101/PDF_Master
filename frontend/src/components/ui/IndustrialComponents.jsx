'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Skeuomorphic Screw Detail
export const Screw = ({ className }) => (
  <div className={cn("absolute w-3.5 h-3.5 rounded-full bg-chassis shadow-neu-pressed flex items-center justify-center pointer-events-none z-10", className)}>
    <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 flex items-center justify-center shadow-inner">
      <div className="w-1.5 h-[2px] bg-gray-600 rotate-45 transform"></div>
    </div>
  </div>
);

// Skeuomorphic Ventilation Slots
export const VentSlots = ({ className }) => (
  <div className={cn("flex space-x-1", className)}>
    {[1, 2, 3].map((i) => (
      <div key={i} className="w-1 h-5 rounded-full bg-black/20 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)] border-t border-l border-white/40" />
    ))}
  </div>
);

export const IndustrialButton = ({ 
  children, 
  variant = 'primary', 
  className, 
  ...props 
}) => {
  const variants = {
    primary: 'bg-accent text-white shadow-neu hover:-translate-y-0.5 active:translate-y-0 active:shadow-neu-pressed border border-accent/20',
    secondary: 'bg-chassis text-ink shadow-neu hover:-translate-y-0.5 active:translate-y-0 active:shadow-neu-pressed border border-white/50',
    ghost: 'bg-transparent text-ink hover:bg-black/5 active:bg-black/10 shadow-none border border-transparent',
    // Mappings for Bauhaus components compatibility
    red: 'bg-accent text-white shadow-neu hover:-translate-y-0.5 active:translate-y-0 active:shadow-neu-pressed border border-accent/20',
    blue: 'bg-chassis text-ink shadow-neu hover:-translate-y-0.5 active:translate-y-0 active:shadow-neu-pressed border border-white/50',
    yellow: 'bg-accent text-white shadow-neu hover:-translate-y-0.5 active:translate-y-0 active:shadow-neu-pressed border border-accent/20',
    outline: 'bg-chassis text-ink shadow-neu hover:-translate-y-0.5 active:translate-y-0 active:shadow-neu-pressed border border-white/50',
  };

  return (
    <button
      className={cn(
        'h-12 px-6 font-bold uppercase tracking-wider transition-all duration-150 rounded-lg flex items-center justify-center gap-2 select-none font-display text-sm',
        variants[variant] || variants.primary,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const IndustrialCard = ({ 
  children, 
  className, 
  screws = true,
  ventSlots = true,
  hoverEffect = true,
  ...props 
}) => {
  return (
    <div
      className={cn(
        'relative p-8 bg-chassis rounded-2xl shadow-neu-card border border-white/30 overflow-hidden',
        hoverEffect && 'hover:-translate-y-1 hover:shadow-neu-float transition-all duration-300',
        className
      )}
      {...props}
    >
      {screws && (
        <>
          <Screw className="top-3 left-3" />
          <Screw className="top-3 right-3" />
          <Screw className="bottom-3 left-3" />
          <Screw className="bottom-3 right-3" />
        </>
      )}
      
      {ventSlots && (
        <div className="absolute top-2.5 right-8 pointer-events-none z-10">
          <VentSlots />
        </div>
      )}

      <div className={cn((screws || ventSlots) ? 'pt-2' : '')}>
        {children}
      </div>
    </div>
  );
};

export const IndustrialSection = ({ 
  children, 
  className, 
  bgVariant = 'chassis',
  ...props 
}) => {
  const bgs = {
    chassis: 'bg-chassis text-ink',
    dark: 'bg-[#2d3436] text-white bg-blueprint-dark',
    accent: 'bg-chassis text-ink bg-blueprint',
    // Mappings for Bauhaus components compatibility
    white: 'bg-chassis text-ink',
    red: 'bg-[#2d3436] text-white bg-blueprint-dark',
    blue: 'bg-chassis text-ink',
    yellow: 'bg-chassis text-ink bg-blueprint',
    black: 'bg-[#2d3436] text-white bg-blueprint-dark',
  };

  return (
    <section
      className={cn(
        'py-20 px-6 border-b border-border-dark/50 relative overflow-hidden',
        bgs[bgVariant] || bgs.chassis,
        className
      )}
      {...props}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {children}
      </div>
    </section>
  );
};

export const IndustrialBadge = ({ 
  children, 
  color = 'green', 
  led = true, 
  className 
}) => {
  const colors = {
    green: 'bg-chassis text-ink shadow-neu-sharp',
    red: 'bg-chassis text-ink shadow-neu-sharp',
    yellow: 'bg-chassis text-ink shadow-neu-sharp',
  };

  const ledColors = {
    green: 'led-green',
    red: 'led-red',
    yellow: 'led-red',
  };

  return (
    <span className={cn(
      'inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider rounded-full border border-white/40',
      colors[color] || colors.green,
      className
    )}>
      {led && <span className={cn('led-indicator flex-shrink-0', ledColors[color] || 'led-green')} />}
      {children}
    </span>
  );
};
