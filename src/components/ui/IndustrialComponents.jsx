'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// ═══ FLAT CONTENT CARD ═══
// Variant: 'paper' (default, bg-white, 24px/32px radius, black border) or 'solid' (bg-black, white text)
export const NeumorphicCard = ({
  children,
  className,
  title,
  hoverEffect = true,
  variant = 'paper',
  ...props
}) => {
  const isSolid = variant === 'solid' || className?.includes('bg-black') || className?.includes('bg-[#000000]');

  return (
    <div
      className={cn(
        isSolid
          ? 'bg-[#000000] text-[#ffffff] rounded-[20px] sm:rounded-[32px] p-4 sm:p-8 border border-transparent'
          : 'bg-[#ffffff] text-[#000000] rounded-[20px] sm:rounded-[32px] border border-[#000000] p-4 sm:p-8',
        hoverEffect && 'hover:-translate-y-0.5 transition-all duration-200',
        className
      )}
      {...props}
    >
      {title && (
        <div className={cn(
          "flex items-center justify-between mb-6 pb-3 border-b",
          isSolid ? "border-[#ffffff]/20" : "border-[#000000]/15"
        )}>
          <h3 className={cn(
            "font-suisseintl font-bold text-sm uppercase tracking-wider",
            isSolid ? "text-[#ffffff]" : "text-[#000000]"
          )}>
            {title}
          </h3>
          <div className="flex gap-2">
            <span className={cn("w-2 h-2 rounded-full", isSolid ? "bg-[#ffffff]/30" : "bg-[#000000]/20")} />
            <span className={cn("w-2 h-2 rounded-full", isSolid ? "bg-[#ffffff]/30" : "bg-[#000000]/20")} />
            <span className={cn("w-2 h-2 rounded-full", isSolid ? "bg-[#ffffff]/30" : "bg-[#000000]/20")} />
          </div>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export const IndustrialCard = NeumorphicCard;

// ═══ FLAT BUTTONS ═══
export const NeumorphicButton = ({
  children,
  variant = 'primary',
  className,
  ...props
}) => {
  const baseStyle = 'h-12 px-6 font-suisseintl font-medium text-xs uppercase tracking-wider transition-all duration-200 inline-flex items-center justify-center gap-2 select-none';
  
  const variants = {
    // Schedule Demo Button Style: background #000000, text #ffffff, 8px border-radius
    primary: 'bg-[#000000] text-[#ffffff] rounded-[8px] hover:bg-[#2f2f2f] active:bg-[#444444]',
    blue: 'bg-[#000000] text-[#ffffff] rounded-[8px] hover:bg-[#2f2f2f] active:bg-[#444444]',
    
    // Ghost Button Style: Transparent bg, color #979797, paddingRight=16, borderRadius=0px
    ghost: 'bg-transparent text-[#979797] hover:text-[#000000] rounded-none border-none hover:bg-transparent',
    secondary: 'bg-transparent text-[#444444] border border-[#979797] rounded-[8px] hover:bg-[#f3f3f3] hover:text-[#000000]',
    
    // Action Green highlights (Action green background, black border, 8px border-radius)
    green: 'bg-[#d1ffca] text-[#000000] border border-[#000000] rounded-[8px] hover:bg-[#b5f5ad]',
    success: 'bg-[#d1ffca] text-[#000000] border border-[#000000] rounded-[8px] hover:bg-[#b5f5ad]',
    
    // Alert Yellow
    yellow: 'bg-[#fff100] text-[#000000] border border-[#000000] rounded-[8px] hover:bg-yellow-400',
    
    // Pill Button with Round Corners Style (generic rounded button): bg transparent, color #000000, 4px border-radius
    outline: 'bg-transparent text-[#000000] border border-[#000000] rounded-[4px] hover:bg-[#f3f3f3]',
    danger: 'bg-red-600 text-white rounded-[8px] hover:bg-red-700 active:bg-red-800 border border-[#000000]',
    red: 'bg-red-600 text-white rounded-[8px] hover:bg-red-700 active:bg-red-800 border border-[#000000]',
  };

  return (
    <button
      className={cn(
        baseStyle,
        variants[variant] || variants.primary,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const IndustrialButton = NeumorphicButton;

// ═══ FLAT LAYOUT SECTION ═══
export const NeumorphicSection = ({
  children,
  className,
  id,
  ...props
}) => {
  return (
    <section
      id={id}
      className={cn(
        'py-20 px-4 relative overflow-hidden bg-[#e5e7eb]',
        className
      )}
      {...props}
    >
      <div className="max-w-5xl mx-auto relative z-10">
        {children}
      </div>
    </section>
  );
};

export const IndustrialSection = NeumorphicSection;

// ═══ ACHROMATIC BADGE / PILL ═══
export const NeumorphicBadge = ({
  children,
  color = 'green',
  led = false,
  className
}) => {
  const badgeColors = {
    green: 'bg-[#d1ffca] text-[#000000] border border-[#000000]',
    yellow: 'bg-[#fff100] text-[#000000] border border-[#000000]',
    red: 'bg-[#ffffff] text-[#000000] border border-red-500',
    blue: 'bg-[#ffffff] text-[#000000] border border-[#000000]',
  };

  return (
    <span className={cn(
      'inline-flex items-center gap-2 px-4 py-1.5 text-[10px] font-suisseintlmono font-bold uppercase tracking-wider rounded-none',
      badgeColors[color] || badgeColors.green,
      className
    )}>
      {led && <span className="w-1.5 h-1.5 rounded-full bg-[#000000] animate-pulse" />}
      {children}
    </span>
  );
};

export const IndustrialBadge = NeumorphicBadge;

// ═══ MARQUEE TEXT COMPONENT ═══
export const MarqueeText = ({ children, className }) => {
  return (
    <div className={cn('w-full max-w-full overflow-hidden whitespace-nowrap py-2 px-4 border-t border-b border-[#000000] bg-[#ffffff]', className)}>
      <div
        className="inline-block animate-[marquee_25s_linear_infinite]"
        style={{
          animation: 'marquee 25s linear infinite',
        }}
      >
        {children}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="marquee"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
};

// ═══ DECORATIVE SWATCHES (ACHROMATIC / SYSTEM HIGHLIGHTS) ═══
export const ColorSquares = ({ className }) => {
  const colors = [
    'bg-[#000000]', // Midnight Ink
    'bg-[#e5e7eb]', // Canvas Ice
    'bg-[#ffffff]', // Paper White
    'bg-[#979797]', // Fog Gray
    'bg-[#d1ffca]', // Action Green
    'bg-[#fff100]'  // Alert Yellow
  ];
  return (
    <div className={cn('flex gap-2 items-center justify-center p-1.5 bg-[#ffffff] border border-[#000000] w-fit', className)}>
      {colors.map((color, i) => (
        <div
          key={i}
          className={cn('w-4 h-4 border border-[#000000] hover:scale-105 transition-transform duration-200 cursor-pointer', color)}
        />
      ))}
    </div>
  );
};

// ═══ METADATA INDICATOR ═══
export const HitCounter = ({ className }) => {
  return (
    <div className={cn(
      'inline-flex items-center px-4 py-2 border border-[#000000] bg-[#ffffff] font-suisseintlmono text-[11px] font-bold text-[#000000] tracking-wider uppercase',
      className
    )}>
      <span className="w-1.5 h-1.5 rounded-full bg-[#000000] animate-pulse mr-2" />
      Secure Sandbox Active
    </div>
  );
};

// ═══ FLAT SHIMMER STRIPE ═══
export const ConstructionStripe = ({ className }) => {
  return (
    <div className={cn('relative h-[6px] w-full bg-[#000000] overflow-hidden', className)}>
      <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-[#d1ffca]/40 to-transparent animate-[shimmer_3s_infinite_linear]" 
        style={{
          backgroundSize: '200% 100%',
          animation: 'shimmer 4s infinite linear'
        }}
      />
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};

// ═══ FLAT LINE ═══
export const GrooveHr = ({ className }) => {
  return <div className={cn('soft-divider my-8 max-w-7xl mx-auto', className)} />;
};
