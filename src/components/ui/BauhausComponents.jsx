'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const BauhausButton = ({ 
  children, 
  variant = 'red', 
  className, 
  ...props 
}) => {
  const variants = {
    red: 'bg-bauhaus-red text-white shadow-bauhaus hover:bg-red-700',
    blue: 'bg-bauhaus-blue text-white shadow-bauhaus hover:bg-blue-700',
    yellow: 'bg-bauhaus-yellow text-black shadow-bauhaus hover:bg-yellow-500',
    outline: 'bg-white text-black border-2 border-bauhaus-black shadow-bauhaus hover:bg-gray-100',
  };

  return (
    <button
      className={cn(
        'px-6 py-3 font-bold uppercase tracking-widest transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none border-2 border-bauhaus-black',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const BauhausCard = ({ 
  children, 
  className, 
  decoration = 'circle',
  decorationColor = 'blue',
  ...props 
}) => {
  const decorations = {
    circle: 'rounded-full',
    square: 'rounded-none',
    triangle: 'clip-path-triangle', // requires custom clip-path or simple div
  };

  const colors = {
    red: 'bg-bauhaus-red',
    blue: 'bg-bauhaus-blue',
    yellow: 'bg-bauhaus-yellow',
  };

  return (
    <div
      className={cn(
        'relative p-8 bg-white border-4 border-bauhaus-black shadow-bauhaus-lg hover:-translate-y-2 transition-transform',
        className
      )}
      {...props}
    >
      {/* Geometric Decoration */}
      <div className={cn(
        'absolute -top-3 -right-3 w-8 h-8 border-2 border-bauhaus-black',
        decorations[decoration],
        colors[decorationColor]
      )} />
      
      {children}
    </div>
  );
};

export const BauhausSection = ({ 
  children, 
  className, 
  bgVariant = 'white',
  ...props 
}) => {
  const bgs = {
    white: 'bg-bauhaus-white',
    red: 'bg-bauhaus-red text-white',
    blue: 'bg-bauhaus-blue text-white',
    yellow: 'bg-bauhaus-yellow text-black',
    black: 'bg-bauhaus-black text-white',
  };

  return (
    <section
      className={cn(
        'py-24 px-8 border-b-4 border-bauhaus-black',
        bgs[bgVariant],
        className
      )}
      {...props}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
};

export const BauhausBadge = ({ children, color = 'red', className }) => {
  const colors = {
    red: 'bg-bauhaus-red text-white',
    blue: 'bg-bauhaus-blue text-white',
    yellow: 'bg-bauhaus-yellow text-bauhaus-black',
  };

  return (
    <span className={cn(
      'px-3 py-1 text-xs font-bold uppercase tracking-tighter border-2 border-bauhaus-black shadow-[2px_2px_0px_0px_black]',
      colors[color],
      className
    )}>
      {children}
    </span>
  );
};
