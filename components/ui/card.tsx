// components/ui/card.tsx
// Premium Card component with hover effects and variants

'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

// Base Card
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-xl border bg-card text-card-foreground shadow-sm',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

// Animated Card with hover effects
interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: 'lift' | 'glow' | 'border' | 'scale' | 'none';
  delay?: number;
}

const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ className, hoverEffect = 'lift', delay = 0, children, ...props }, ref) => {
    const hoverStyles = {
      lift: 'hover:-translate-y-2 hover:shadow-xl',
      glow: 'hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]',
      border: 'hover:border-primary/50',
      scale: 'hover:scale-[1.02]',
      none: '',
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className={cn(
          'rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-300',
          hoverStyles[hoverEffect],
          className
        )}
        {...(props as any)}
      >
        {children}
      </motion.div>
    );
  }
);
AnimatedCard.displayName = 'AnimatedCard';

// Glass Card (glassmorphism effect)
const GlassCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-xl border border-white/20 bg-white/10 backdrop-blur-lg shadow-xl',
      'dark:border-white/10 dark:bg-black/20',
      className
    )}
    {...props}
  />
));
GlassCard.displayName = 'GlassCard';

// Gradient Border Card
const GradientCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative rounded-xl p-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500',
      className
    )}
    {...props}
  >
    <div className="rounded-[10px] bg-background p-6 h-full">
      {children}
    </div>
  </div>
));
GradientCard.displayName = 'GradientCard';

// Spotlight Card (hover spotlight effect)
interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  spotlightColor?: string;
}

const SpotlightCard = React.forwardRef<HTMLDivElement, SpotlightCardProps>(
  ({ className, spotlightColor = 'rgba(124, 58, 237, 0.15)', children, ...props }, ref) => {
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = React.useState(false);
    const cardRef = React.useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm',
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <div
          ref={cardRef}
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
          }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);
SpotlightCard.displayName = 'SpotlightCard';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  AnimatedCard,
  GlassCard,
  GradientCard,
  SpotlightCard,
};

/*
USAGE:

import { 
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  AnimatedCard, GlassCard, GradientCard, SpotlightCard 
} from '@/components/ui/card';

// Basic Card
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here...</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Animated Card with hover effects
<AnimatedCard hoverEffect="lift" delay={0.1}>
  <CardContent>Lifts on hover</CardContent>
</AnimatedCard>

<AnimatedCard hoverEffect="glow">
  <CardContent>Glows on hover</CardContent>
</AnimatedCard>

// Glass Card (glassmorphism)
<GlassCard>
  <CardContent>Frosted glass effect</CardContent>
</GlassCard>

// Gradient Border Card
<GradientCard>
  <CardTitle>Premium Feature</CardTitle>
  <p>With gradient border</p>
</GradientCard>

// Spotlight Card (follows cursor)
<SpotlightCard spotlightColor="rgba(59, 130, 246, 0.2)">
  <CardContent>Move your cursor around!</CardContent>
</SpotlightCard>
*/
