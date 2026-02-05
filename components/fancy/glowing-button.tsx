// components/fancy/glowing-button.tsx
// Glowing button with animated gradient border (Aceternity style)

'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  gradientColors?: string[];
  glowIntensity?: 'low' | 'medium' | 'high';
  size?: 'sm' | 'md' | 'lg';
}

const GlowingButton = React.forwardRef<HTMLButtonElement, GlowingButtonProps>(
  (
    {
      className,
      children,
      gradientColors = ['#7c3aed', '#ec4899', '#f97316'],
      glowIntensity = 'medium',
      size = 'md',
      ...props
    },
    ref
  ) => {
    const glowSizes = {
      low: '10px',
      medium: '20px',
      high: '30px',
    };

    const buttonSizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    const gradientString = `linear-gradient(90deg, ${gradientColors.join(', ')})`;

    return (
      <motion.button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center font-semibold text-white rounded-xl overflow-hidden',
          'transition-all duration-300',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          buttonSizes[size],
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          background: gradientString,
          boxShadow: `0 0 ${glowSizes[glowIntensity]} ${gradientColors[0]}40`,
        }}
        {...props}
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, ${gradientColors[1]}, ${gradientColors[2]}, ${gradientColors[0]})`,
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }
);
GlowingButton.displayName = 'GlowingButton';

// Shimmer Button (text shimmer effect)
interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  background?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      className,
      children,
      shimmerColor = '#ffffff',
      background = 'linear-gradient(110deg, #0a0a0a 45%, #1a1a1a 55%, #0a0a0a)',
      size = 'md',
      ...props
    },
    ref
  ) => {
    const buttonSizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center font-semibold text-white rounded-xl overflow-hidden border border-white/10',
          buttonSizes[size],
          className
        )}
        style={{ background }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(110deg, transparent 25%, ${shimmerColor}20 50%, transparent 75%)`,
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: ['200% 0', '-200% 0'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }
);
ShimmerButton.displayName = 'ShimmerButton';

// Magnetic Button (follows cursor)
const MagneticButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { strength?: number }
>(({ className, children, strength = 0.3, ...props }, ref) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (e.clientX - centerX) * strength;
    const y = (e.clientY - centerY) * strength;

    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      className={cn(
        'relative inline-flex items-center justify-center px-6 py-3 font-semibold rounded-xl',
        'bg-primary text-primary-foreground',
        className
      )}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </motion.button>
  );
});
MagneticButton.displayName = 'MagneticButton';

// Ripple Button
const RippleButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, onClick, ...props }, ref) => {
  const [ripples, setRipples] = React.useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);

    onClick?.(e);
  };

  return (
    <button
      ref={ref}
      className={cn(
        'relative overflow-hidden inline-flex items-center justify-center px-6 py-3 font-semibold rounded-xl',
        'bg-primary text-primary-foreground',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{ width: 300, height: 300, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </button>
  );
});
RippleButton.displayName = 'RippleButton';

export { GlowingButton, ShimmerButton, MagneticButton, RippleButton };

/*
USAGE:

import { GlowingButton, ShimmerButton, MagneticButton, RippleButton } from '@/components/fancy/glowing-button';

// Glowing gradient button
<GlowingButton>Get Started</GlowingButton>

// Custom colors and intensity
<GlowingButton 
  gradientColors={['#3b82f6', '#8b5cf6', '#ec4899']}
  glowIntensity="high"
  size="lg"
>
  Premium Feature
</GlowingButton>

// Shimmer effect
<ShimmerButton>Shimmer Text</ShimmerButton>

// Magnetic (follows cursor)
<MagneticButton strength={0.5}>Hover me!</MagneticButton>

// Ripple effect on click
<RippleButton>Click me!</RippleButton>
*/
