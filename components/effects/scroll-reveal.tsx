// components/effects/scroll-reveal.tsx
// Scroll-based reveal animations

'use client';

import * as React from 'react';
import { motion, useInView, useAnimation, type Variant } from 'framer-motion';
import { cn } from '@/lib/utils';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  threshold?: number;
}

const directionVariants: Record<Direction, { hidden: Variant; visible: Variant }> = {
  up: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  none: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export function ScrollReveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  distance = 50,
  once = true,
  threshold = 0.1,
}: ScrollRevealProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const variants = {
    hidden: {
      opacity: 0,
      ...(direction === 'up' && { y: distance }),
      ...(direction === 'down' && { y: -distance }),
      ...(direction === 'left' && { x: distance }),
      ...(direction === 'right' && { x: -distance }),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}

// Staggered children reveal
interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  direction?: Direction;
  once?: boolean;
}

export function StaggerReveal({
  children,
  className,
  staggerDelay = 0.1,
  direction = 'up',
  once = true,
}: StaggerRevealProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={directionVariants[direction]}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// Scale reveal
interface ScaleRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export function ScaleReveal({
  children,
  className,
  delay = 0,
  duration = 0.5,
  once = true,
}: ScaleRevealProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}

// Blur reveal
interface BlurRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export function BlurReveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  once = true,
}: BlurRevealProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={
        isInView
          ? { opacity: 1, filter: 'blur(0px)' }
          : { opacity: 0, filter: 'blur(10px)' }
      }
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
}

// Parallax scroll
interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export function Parallax({ children, className, speed = 0.5 }: ParallaxProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrollProgress = rect.top / window.innerHeight;
      setOffset(scrollProgress * speed * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={cn('relative', className)}
      style={{ transform: `translateY(${offset}px)` }}
    >
      {children}
    </div>
  );
}

// Scroll Progress Bar
interface ScrollProgressProps {
  className?: string;
  color?: string;
  height?: number;
  position?: 'top' | 'bottom';
}

export function ScrollProgress({
  className,
  color = 'var(--primary)',
  height = 4,
  position = 'top',
}: ScrollProgressProps) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (window.scrollY / scrollHeight) * 100;
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={cn('fixed left-0 right-0 z-50', position === 'top' ? 'top-0' : 'bottom-0', className)}
      style={{ height }}
    >
      <motion.div
        className="h-full"
        style={{
          backgroundColor: color,
          width: `${progress}%`,
        }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
      />
    </div>
  );
}

/*
USAGE:

import { 
  ScrollReveal, 
  StaggerReveal, 
  ScaleReveal, 
  BlurReveal,
  Parallax,
  ScrollProgress 
} from '@/components/effects/scroll-reveal';

// Basic reveal from bottom
<ScrollReveal>
  <Card>Reveals as you scroll</Card>
</ScrollReveal>

// Reveal from different directions
<ScrollReveal direction="left" delay={0.2}>
  <h2>Slides in from right</h2>
</ScrollReveal>

// Staggered children
<StaggerReveal staggerDelay={0.15}>
  <Card>First</Card>
  <Card>Second</Card>
  <Card>Third</Card>
</StaggerReveal>

// Scale effect
<ScaleReveal>
  <Image src="..." />
</ScaleReveal>

// Blur reveal
<BlurReveal delay={0.3}>
  <p>Fades in from blur</p>
</BlurReveal>

// Parallax scrolling
<Parallax speed={0.3}>
  <div className="h-96 bg-gradient-to-b from-purple-500 to-pink-500" />
</Parallax>

// Scroll progress bar
<ScrollProgress position="top" color="#7c3aed" />
*/
