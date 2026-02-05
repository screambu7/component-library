// components/effects/hover-effect.tsx
// Hover effects and interactive animations

'use client';

import * as React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

// 3D Tilt Card
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number;
  glare?: boolean;
  scale?: number;
}

export function TiltCard({
  children,
  className,
  tiltAmount = 10,
  glare = true,
  scale = 1.02,
}: TiltCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${tiltAmount}deg`, `-${tiltAmount}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${tiltAmount}deg`, `${tiltAmount}deg`]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className={cn('relative', className)}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale }}
    >
      {children}
      {glare && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{
            background: `radial-gradient(circle at ${x.get() * 100 + 50}% ${y.get() * 100 + 50}%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}
    </motion.div>
  );
}

// Magnetic Element
interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function Magnetic({ children, className, strength = 0.3 }: MagneticProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  );
}

// Spotlight Effect
interface SpotlightProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
}

export function Spotlight({
  children,
  className,
  spotlightColor = 'rgba(124, 58, 237, 0.15)',
  spotlightSize = 400,
}: SpotlightProps) {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        animate={{
          background: isHovered
            ? `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`
            : 'transparent',
        }}
        transition={{ duration: 0.2 }}
      />
      {children}
    </div>
  );
}

// Hover Border Gradient
interface HoverBorderGradientProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  borderWidth?: number;
  gradientColors?: string[];
}

export function HoverBorderGradient({
  children,
  className,
  containerClassName,
  borderWidth = 2,
  gradientColors = ['#7c3aed', '#ec4899', '#f97316'],
}: HoverBorderGradientProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className={cn('relative p-[2px] rounded-xl', containerClassName)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{
          background: `linear-gradient(90deg, ${gradientColors.join(', ')})`,
          padding: borderWidth,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <div
        className={cn(
          'relative bg-background rounded-[10px] h-full w-full transition-colors',
          isHovered && 'bg-background/95',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

// Glow on Hover
interface GlowHoverProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  glowSize?: string;
}

export function GlowHover({
  children,
  className,
  glowColor = 'rgba(124, 58, 237, 0.5)',
  glowSize = '20px',
}: GlowHoverProps) {
  return (
    <motion.div
      className={cn('transition-shadow', className)}
      whileHover={{
        boxShadow: `0 0 ${glowSize} ${glowColor}`,
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

// Underline on Hover (for links/text)
interface UnderlineHoverProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  thickness?: number;
}

export function UnderlineHover({
  children,
  className,
  color = 'currentColor',
  thickness = 2,
}: UnderlineHoverProps) {
  return (
    <span className={cn('relative inline-block group', className)}>
      {children}
      <motion.span
        className="absolute bottom-0 left-0 w-full origin-left"
        style={{
          height: thickness,
          backgroundColor: color,
          scaleX: 0,
        }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </span>
  );
}

// Icon Hover Rotate
interface IconRotateProps {
  children: React.ReactNode;
  className?: string;
  rotation?: number;
}

export function IconRotate({ children, className, rotation = 15 }: IconRotateProps) {
  return (
    <motion.span
      className={cn('inline-block', className)}
      whileHover={{ rotate: rotation }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.span>
  );
}

/*
USAGE:

import { 
  TiltCard, 
  Magnetic, 
  Spotlight,
  HoverBorderGradient,
  GlowHover,
  UnderlineHover,
  IconRotate 
} from '@/components/effects/hover-effect';

// 3D Tilt effect
<TiltCard tiltAmount={15} glare>
  <Card>
    <CardContent>Tilt me!</CardContent>
  </Card>
</TiltCard>

// Magnetic follow cursor
<Magnetic strength={0.5}>
  <Button>Hover and move around</Button>
</Magnetic>

// Spotlight follows cursor
<Spotlight spotlightColor="rgba(59, 130, 246, 0.2)">
  <div className="p-8 bg-muted rounded-xl">
    Content with spotlight
  </div>
</Spotlight>

// Gradient border on hover
<HoverBorderGradient>
  <div className="p-6">
    Gradient border appears on hover
  </div>
</HoverBorderGradient>

// Glow effect
<GlowHover glowColor="rgba(34, 197, 94, 0.5)">
  <Card>Glows on hover</Card>
</GlowHover>

// Underline animation for links
<UnderlineHover color="#7c3aed">
  <a href="#">Hover for underline</a>
</UnderlineHover>

// Icon rotation
<IconRotate rotation={20}>
  <Settings className="h-6 w-6" />
</IconRotate>
*/
