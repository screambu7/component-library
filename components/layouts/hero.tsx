// components/layouts/hero.tsx
// Premium hero section components

'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AnimatedGradientText } from '@/components/fancy/animated-gradient-text';
import { Button, AnimatedButton } from '@/components/ui/button';
import { Particles } from '@/components/fancy/orbiting-circles';
import { ArrowRight, Play } from 'lucide-react';

interface HeroProps {
  badge?: string;
  title: string;
  titleGradient?: boolean;
  subtitle?: string;
  description?: string;
  primaryCta?: {
    text: string;
    href: string;
    icon?: React.ReactNode;
  };
  secondaryCta?: {
    text: string;
    href: string;
    icon?: React.ReactNode;
  };
  className?: string;
  children?: React.ReactNode;
}

export function Hero({
  badge,
  title,
  titleGradient = true,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  className,
  children,
}: HeroProps) {
  return (
    <section
      className={cn(
        'relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-20 overflow-hidden',
        className
      )}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30" />
      
      {/* Particles */}
      <Particles quantity={40} color="rgba(124, 58, 237, 0.3)" size={2} />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              {badge}
            </span>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
        >
          {titleGradient ? (
            <AnimatedGradientText as="span">{title}</AnimatedGradientText>
          ) : (
            title
          )}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl sm:text-2xl text-muted-foreground mb-4"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Description */}
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            {description}
          </motion.p>
        )}

        {/* CTAs */}
        {(primaryCta || secondaryCta) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {primaryCta && (
              <AnimatedButton
                variant="gradient"
                size="lg"
                rightIcon={primaryCta.icon || <ArrowRight className="h-5 w-5" />}
                asChild
              >
                <a href={primaryCta.href}>{primaryCta.text}</a>
              </AnimatedButton>
            )}
            {secondaryCta && (
              <AnimatedButton
                variant="outline"
                size="lg"
                leftIcon={secondaryCta.icon}
                asChild
              >
                <a href={secondaryCta.href}>{secondaryCta.text}</a>
              </AnimatedButton>
            )}
          </motion.div>
        )}

        {/* Custom children */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Minimal Hero (cleaner, less elements)
interface MinimalHeroProps {
  title: string;
  description?: string;
  cta?: {
    text: string;
    href: string;
  };
  className?: string;
}

export function MinimalHero({ title, description, cta, className }: MinimalHeroProps) {
  return (
    <section
      className={cn(
        'relative min-h-[60vh] flex flex-col items-center justify-center px-4 py-20',
        className
      )}
    >
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-center mb-6"
      >
        {title}
      </motion.h1>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-muted-foreground text-center max-w-xl mb-8"
        >
          {description}
        </motion.p>
      )}
      {cta && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Button size="lg" asChild>
            <a href={cta.href}>{cta.text}</a>
          </Button>
        </motion.div>
      )}
    </section>
  );
}

// Video Hero (with background video)
interface VideoHeroProps {
  videoSrc: string;
  title: string;
  description?: string;
  cta?: {
    text: string;
    href: string;
  };
  overlay?: boolean;
  className?: string;
}

export function VideoHero({
  videoSrc,
  title,
  description,
  cta,
  overlay = true,
  className,
}: VideoHeroProps) {
  return (
    <section className={cn('relative min-h-screen overflow-hidden', className)}>
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-black/60" />
      )}

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-white text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/80 max-w-xl mb-8"
          >
            {description}
          </motion.p>
        )}
        {cta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black" asChild>
              <a href={cta.href}>{cta.text}</a>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export { Hero as default };

/*
USAGE:

import { Hero, MinimalHero, VideoHero } from '@/components/layouts/hero';
import { Play } from 'lucide-react';

// Full featured hero
<Hero
  badge="New Release"
  title="Build faster with premium components"
  subtitle="Your UI toolkit for modern apps"
  description="A collection of beautifully designed, animated components ready to copy and paste into your projects."
  primaryCta={{ text: "Get Started", href: "/docs" }}
  secondaryCta={{ text: "Watch Demo", href: "#demo", icon: <Play className="h-4 w-4" /> }}
/>

// Minimal hero
<MinimalHero
  title="Simple. Clean. Effective."
  description="Sometimes less is more."
  cta={{ text: "Learn More", href: "/about" }}
/>

// Video background hero
<VideoHero
  videoSrc="/hero-video.mp4"
  title="Immersive Experience"
  description="Full screen video backgrounds"
  cta={{ text: "Explore", href: "/explore" }}
/>
*/
