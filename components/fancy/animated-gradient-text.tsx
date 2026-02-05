// components/fancy/animated-gradient-text.tsx
// Animated gradient text with shimmer effect (MagicUI style)

'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradientColors?: string[];
  animationDuration?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

export function AnimatedGradientText({
  children,
  className,
  gradientColors = ['#7c3aed', '#ec4899', '#f97316', '#7c3aed'],
  animationDuration = 3,
  as: Component = 'span',
}: AnimatedGradientTextProps) {
  return (
    <Component
      className={cn(
        'inline-block bg-clip-text text-transparent',
        'bg-[length:200%_auto]',
        className
      )}
      style={{
        backgroundImage: `linear-gradient(90deg, ${gradientColors.join(', ')})`,
        animation: `gradient-shift ${animationDuration}s linear infinite`,
      }}
    >
      {children}
      <style jsx>{`
        @keyframes gradient-shift {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </Component>
  );
}

// Typewriter effect
interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  cursor?: boolean;
  onComplete?: () => void;
}

export function Typewriter({
  text,
  className,
  speed = 50,
  cursor = true,
  onComplete,
}: TypewriterProps) {
  const [displayText, setDisplayText] = React.useState('');
  const [isComplete, setIsComplete] = React.useState(false);

  React.useEffect(() => {
    let index = 0;
    setDisplayText('');
    setIsComplete(false);

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {cursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block ml-0.5"
        >
          |
        </motion.span>
      )}
    </span>
  );
}

// Text Reveal Animation
interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export function TextReveal({
  children,
  className,
  delay = 0,
  staggerDelay = 0.03,
}: TextRevealProps) {
  const words = children.split(' ');

  return (
    <motion.span className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-1">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: delay + (wordIndex * word.length + charIndex) * staggerDelay,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}

// Blur Text Animation
interface BlurTextProps {
  children: string;
  className?: string;
  delay?: number;
}

export function BlurText({ children, className, delay = 0 }: BlurTextProps) {
  return (
    <motion.span
      className={cn('inline-block', className)}
      initial={{ filter: 'blur(10px)', opacity: 0 }}
      animate={{ filter: 'blur(0px)', opacity: 1 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.span>
  );
}

// Shiny Text (hover shine effect)
interface ShinyTextProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

export function ShinyText({ children, className, as: Component = 'span' }: ShinyTextProps) {
  return (
    <Component
      className={cn(
        'relative inline-block overflow-hidden',
        'before:absolute before:inset-0 before:-translate-x-full',
        'before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
        'hover:before:animate-shine',
        className
      )}
    >
      {children}
      <style jsx>{`
        @keyframes shine {
          100% { transform: translateX(100%); }
        }
        .hover\\:before\\:animate-shine:hover::before {
          animation: shine 0.8s ease-in-out;
        }
      `}</style>
    </Component>
  );
}

// Counter Animation
interface AnimatedCounterProps {
  value: number;
  className?: string;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export function AnimatedCounter({
  value,
  className,
  duration = 1,
  decimals = 0,
  prefix = '',
  suffix = '',
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    const startTime = Date.now();
    const startValue = displayValue;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (value - startValue) * easeOut;

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return (
    <span className={className}>
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/*
USAGE:

import { 
  AnimatedGradientText, 
  Typewriter, 
  TextReveal, 
  BlurText,
  ShinyText,
  AnimatedCounter 
} from '@/components/fancy/animated-gradient-text';

// Animated gradient
<AnimatedGradientText as="h1" className="text-5xl font-bold">
  Premium Experience
</AnimatedGradientText>

// Custom gradient colors
<AnimatedGradientText gradientColors={['#3b82f6', '#10b981', '#3b82f6']}>
  Blue to Green
</AnimatedGradientText>

// Typewriter effect
<Typewriter 
  text="Hello, I'm your AI assistant." 
  speed={80}
  onComplete={() => console.log('Done!')}
/>

// Character by character reveal
<TextReveal className="text-4xl font-bold">
  Welcome to the future
</TextReveal>

// Blur entrance
<BlurText className="text-2xl" delay={0.5}>
  Fade in from blur
</BlurText>

// Shiny on hover
<ShinyText as="h2" className="text-3xl font-bold">
  Hover for shine effect
</ShinyText>

// Animated counter
<AnimatedCounter 
  value={1234} 
  prefix="$" 
  suffix=" USD"
  duration={2}
/>
*/
