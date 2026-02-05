// components/fancy/orbiting-circles.tsx
// Orbiting circles animation (MagicUI style)

'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface OrbitingCirclesProps {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
}

export function OrbitingCircles({
  className,
  children,
  reverse = false,
  duration = 20,
  delay = 0,
  radius = 160,
  path = true,
  iconSize = 30,
}: OrbitingCirclesProps) {
  const childArray = React.Children.toArray(children);

  return (
    <div className={cn('relative flex h-[400px] w-full items-center justify-center', className)}>
      {/* Orbit path */}
      {path && (
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-muted-foreground/20"
          />
        </svg>
      )}

      {/* Center content slot */}
      <div className="absolute z-10 flex items-center justify-center">
        <div className="rounded-full bg-gradient-to-br from-primary/20 to-primary/5 p-8 backdrop-blur-sm border border-primary/10">
          <div className="text-4xl">✨</div>
        </div>
      </div>

      {/* Orbiting items */}
      {childArray.map((child, index) => {
        const angle = (360 / childArray.length) * index;
        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              width: iconSize,
              height: iconSize,
            }}
            animate={{
              rotate: reverse ? [angle, angle - 360] : [angle, angle + 360],
            }}
            transition={{
              duration,
              delay: delay + index * 0.2,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <motion.div
              className="absolute flex items-center justify-center rounded-full bg-background shadow-lg border"
              style={{
                width: iconSize,
                height: iconSize,
                left: `calc(50% - ${iconSize / 2}px + ${radius}px)`,
                top: `calc(50% - ${iconSize / 2}px)`,
              }}
              animate={{
                rotate: reverse ? [0, 360] : [0, -360],
              }}
              transition={{
                duration,
                delay: delay + index * 0.2,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {child}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Floating Elements
interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
  delay?: number;
}

export function FloatingElement({
  children,
  className,
  duration = 3,
  distance = 10,
  delay = 0,
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -distance, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

// Rotating Border
interface RotatingBorderProps {
  children: React.ReactNode;
  className?: string;
  borderWidth?: number;
  duration?: number;
  gradientColors?: string[];
}

export function RotatingBorder({
  children,
  className,
  borderWidth = 2,
  duration = 3,
  gradientColors = ['#7c3aed', '#ec4899', '#f97316', '#7c3aed'],
}: RotatingBorderProps) {
  return (
    <div className={cn('relative p-[2px] rounded-xl overflow-hidden', className)}>
      <motion.div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from 0deg, ${gradientColors.join(', ')})`,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <div
        className="relative bg-background rounded-[10px] h-full w-full"
        style={{ padding: borderWidth }}
      >
        {children}
      </div>
    </div>
  );
}

// Particles Background
interface ParticlesProps {
  className?: string;
  quantity?: number;
  color?: string;
  size?: number;
}

export function Particles({
  className,
  quantity = 50,
  color = 'currentColor',
  size = 2,
}: ParticlesProps) {
  const particles = React.useMemo(() => {
    return Array.from({ length: quantity }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 2,
    }));
  }, [quantity]);

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: size,
            height: size,
            backgroundColor: color,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
            y: [0, -30, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Pulse Ring
interface PulseRingProps {
  className?: string;
  color?: string;
  size?: number;
  duration?: number;
}

export function PulseRing({
  className,
  color = 'rgba(124, 58, 237, 0.5)',
  size = 100,
  duration = 2,
}: PulseRingProps) {
  return (
    <div className={cn('relative', className)} style={{ width: size, height: size }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: color }}
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{
            duration,
            delay: i * (duration / 3),
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
      <div
        className="absolute inset-0 m-auto rounded-full"
        style={{
          width: size / 4,
          height: size / 4,
          backgroundColor: color,
        }}
      />
    </div>
  );
}

export { OrbitingCircles as default };

/*
USAGE:

import { 
  OrbitingCircles, 
  FloatingElement, 
  RotatingBorder, 
  Particles,
  PulseRing 
} from '@/components/fancy/orbiting-circles';

// Orbiting icons
<OrbitingCircles radius={120} duration={15}>
  <span>⚛️</span>
  <span>🔥</span>
  <span>💎</span>
  <span>🚀</span>
</OrbitingCircles>

// Floating element
<FloatingElement duration={4} distance={15}>
  <Card>Floating card!</Card>
</FloatingElement>

// Rotating gradient border
<RotatingBorder>
  <div className="p-6">
    Premium content with animated border
  </div>
</RotatingBorder>

// Particles background
<div className="relative h-96">
  <Particles quantity={30} color="rgba(124, 58, 237, 0.5)" />
  <div className="relative z-10">Content over particles</div>
</div>

// Pulse ring indicator
<PulseRing size={80} color="rgba(59, 130, 246, 0.5)" />
*/
