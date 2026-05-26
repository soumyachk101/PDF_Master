'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// ═══ NEUMORPHIC CARD ═══
// Semantic alias and standard export
export const NeumorphicCard = ({
  children,
  className,
  title,
  hoverEffect = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-[#F2F6F4] rounded-[32px] shadow-soft-extruded p-6 sm:p-8 transition-soft duration-300',
        hoverEffect && 'hover:-translate-y-1 hover:shadow-soft-extruded-hover',
        className
      )}
      {...props}
    >
      {title && (
        <div className="flex items-center justify-between mb-6 pb-3 shadow-[inset_0_-2px_0_rgba(189,201,193,0.3)]">
          <h3 className="font-display font-bold text-base uppercase tracking-wider text-[#2A3A31]">
            {title}
          </h3>
          <div className="flex gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F2F6F4] shadow-soft-inset-sm" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F2F6F4] shadow-soft-inset-sm" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F2F6F4] shadow-soft-inset-sm" />
          </div>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

// Map original name to the new styled component
export const IndustrialCard = NeumorphicCard;

// ═══ NEUMORPHIC BUTTON ═══
export const NeumorphicButton = ({
  children,
  variant = 'primary',
  className,
  ...props
}) => {
  const baseStyle = 'soft-btn h-12 px-6 font-semibold uppercase tracking-wider text-xs';
  
  const variants = {
    primary: 'soft-btn-primary',
    secondary: 'soft-btn',
    ghost: 'bg-transparent text-[#7C3AED] hover:bg-[#E4EDE8]/50 active:shadow-soft-inset-sm',
    red: 'bg-[#E11D48] text-white shadow-soft-extruded-sm hover:bg-[#F43F5E] active:shadow-soft-inset-sm',
    blue: 'soft-btn-primary',
    yellow: 'bg-amber-500 text-white shadow-soft-extruded-sm hover:bg-amber-600 active:shadow-soft-inset-sm',
    outline: 'border border-[#7C3AED] text-[#7C3AED] bg-transparent hover:bg-[#E4EDE8]/50 active:shadow-soft-inset-sm',
    green: 'soft-btn-success',
    danger: 'bg-[#E11D48] text-white shadow-soft-extruded-sm hover:bg-[#F43F5E] active:shadow-soft-inset-sm',
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

// ═══ NEUMORPHIC SECTION ═══
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
        'py-20 px-4 relative overflow-hidden bg-[#E4EDE8]',
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

// ═══ NEUMORPHIC BADGE / PILL ═══
export const NeumorphicBadge = ({
  children,
  color = 'green',
  led = false,
  className
}) => {
  const badgeColors = {
    green: 'text-[#0D9488]',
    red: 'text-[#E11D48]',
    yellow: 'text-amber-600',
    blue: 'text-[#7C3AED]',
  };

  return (
    <span className={cn(
      'inline-flex items-center gap-2 px-4 py-1.5 text-[10px] font-mono font-extrabold uppercase tracking-widest rounded-full bg-[#E4EDE8] shadow-soft-inset-sm',
      badgeColors[color] || badgeColors.green,
      className
    )}>
      {led && <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] animate-pulse-glow" />}
      {children}
    </span>
  );
};

export const IndustrialBadge = NeumorphicBadge;

// ═══ MARQUEE COMPONENT ═══
export const MarqueeText = ({ children, className }) => {
  return (
    <div className={cn('overflow-hidden whitespace-nowrap py-1.5 px-4 rounded-full bg-[#E4EDE8] shadow-soft-inset-sm', className)}>
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

// ═══ DECORATIVE COLOR DOTS (NEUMORPHIC STYLE) ═══
export const ColorSquares = ({ className }) => {
  // Beautiful pastel/neumorphic palette: Purple, Teal, Sage, Emerald, Rose, Amber
  const colors = ['bg-[#7C3AED]', 'bg-[#0D9488]', 'bg-[#10B981]', 'bg-[#F43F5E]', 'bg-[#F59E0B]', 'bg-[#6366F1]'];
  return (
    <div className={cn('flex gap-2 items-center justify-center p-2 rounded-full bg-[#E4EDE8] shadow-soft-inset-sm w-fit', className)}>
      {colors.map((color, i) => (
        <div
          key={i}
          className={cn('w-4 h-4 rounded-full shadow-soft-extruded-sm hover:scale-110 transition-transform duration-200 cursor-pointer', color)}
        />
      ))}
    </div>
  );
};

// ═══ DIGITAL TICKER / VISITORS COUNTER ═══
export const HitCounter = ({ className }) => {
  return (
    <div className={cn(
      'inline-flex items-center px-4 py-2 rounded-2xl bg-[#E4EDE8] shadow-soft-inset-deep font-mono text-[11px] font-bold text-[#7C3AED] tracking-wider uppercase',
      className
    )}>
      <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-pulse mr-2" />
      Secure Sandbox Active
    </div>
  );
};

// ═══ WAVE HIGHLIGHT / STRIPE ═══
export const ConstructionStripe = ({ className }) => {
  return (
    <div className={cn('relative h-[6px] w-full overflow-hidden bg-gradient-to-r from-[#7C3AED]/20 via-[#0D9488]/20 to-[#7C3AED]/20', className)}>
      <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-[#7C3AED]/30 to-transparent animate-[shimmer_3s_infinite_linear]" 
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

// ═══ GROOVE HR ═══
export const GrooveHr = ({ className }) => {
  return <div className={cn('soft-divider my-8 max-w-7xl mx-auto', className)} />;
};
