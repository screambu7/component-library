// components/layouts/pricing-table.tsx
// Premium pricing table with animations

'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button, AnimatedButton } from '@/components/ui/button';
import { Check, X, Sparkles } from 'lucide-react';

interface PricingFeature {
  text: string;
  included: boolean;
  highlight?: boolean;
}

interface PricingPlan {
  name: string;
  description?: string;
  price: number | string;
  period?: string;
  currency?: string;
  features: PricingFeature[];
  cta: {
    text: string;
    href: string;
  };
  popular?: boolean;
  badge?: string;
}

interface PricingTableProps {
  plans: PricingPlan[];
  className?: string;
  billingToggle?: boolean;
  onBillingChange?: (isYearly: boolean) => void;
}

export function PricingTable({
  plans,
  className,
  billingToggle = false,
  onBillingChange,
}: PricingTableProps) {
  const [isYearly, setIsYearly] = React.useState(false);

  const handleBillingChange = () => {
    setIsYearly(!isYearly);
    onBillingChange?.(!isYearly);
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Billing Toggle */}
      {billingToggle && (
        <div className="flex items-center justify-center gap-4 mb-10">
          <span className={cn('text-sm font-medium', !isYearly && 'text-foreground', isYearly && 'text-muted-foreground')}>
            Monthly
          </span>
          <button
            onClick={handleBillingChange}
            className={cn(
              'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
              isYearly ? 'bg-primary' : 'bg-muted'
            )}
          >
            <motion.span
              className="inline-block h-4 w-4 rounded-full bg-white shadow-sm"
              animate={{ x: isYearly ? 24 : 4 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={cn('text-sm font-medium', isYearly && 'text-foreground', !isYearly && 'text-muted-foreground')}>
            Yearly
            <span className="ml-1.5 text-xs text-green-500 font-semibold">Save 20%</span>
          </span>
        </div>
      )}

      {/* Plans Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <PricingCard key={plan.name} plan={plan} index={index} />
        ))}
      </div>
    </div>
  );
}

interface PricingCardProps {
  plan: PricingPlan;
  index: number;
}

function PricingCard({ plan, index }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        'relative flex flex-col rounded-2xl border bg-card p-8',
        plan.popular && 'border-primary shadow-lg shadow-primary/10 scale-105 z-10'
      )}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold shadow-lg">
            <Sparkles className="h-4 w-4" />
            {plan.badge || 'Most Popular'}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
        {plan.description && (
          <p className="text-sm text-muted-foreground">{plan.description}</p>
        )}
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-sm text-muted-foreground">{plan.currency || '$'}</span>
          <span className="text-5xl font-bold tracking-tight">
            {typeof plan.price === 'number' ? plan.price : plan.price}
          </span>
          {plan.period && (
            <span className="text-muted-foreground">/{plan.period}</span>
          )}
        </div>
      </div>

      {/* Features */}
      <ul className="flex-1 space-y-3 mb-8">
        {plan.features.map((feature, i) => (
          <li
            key={i}
            className={cn(
              'flex items-start gap-3 text-sm',
              !feature.included && 'text-muted-foreground'
            )}
          >
            {feature.included ? (
              <Check className={cn('h-5 w-5 flex-shrink-0', feature.highlight ? 'text-green-500' : 'text-primary')} />
            ) : (
              <X className="h-5 w-5 flex-shrink-0 text-muted-foreground/50" />
            )}
            <span className={feature.highlight ? 'font-medium' : ''}>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <AnimatedButton
        variant={plan.popular ? 'gradient' : 'outline'}
        size="lg"
        className="w-full"
        asChild
      >
        <a href={plan.cta.href}>{plan.cta.text}</a>
      </AnimatedButton>
    </motion.div>
  );
}

// Simple Pricing Card (standalone)
interface SimplePricingCardProps {
  name: string;
  price: number | string;
  period?: string;
  features: string[];
  cta: { text: string; href: string };
  highlighted?: boolean;
  className?: string;
}

export function SimplePricingCard({
  name,
  price,
  period = 'month',
  features,
  cta,
  highlighted = false,
  className,
}: SimplePricingCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn(
        'rounded-2xl border bg-card p-6 transition-shadow hover:shadow-lg',
        highlighted && 'border-primary bg-primary/5',
        className
      )}
    >
      <h3 className="text-lg font-bold mb-2">{name}</h3>
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-4xl font-bold">${price}</span>
        <span className="text-muted-foreground">/{period}</span>
      </div>
      <ul className="space-y-2 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-green-500" />
            {feature}
          </li>
        ))}
      </ul>
      <Button variant={highlighted ? 'default' : 'outline'} className="w-full" asChild>
        <a href={cta.href}>{cta.text}</a>
      </Button>
    </motion.div>
  );
}

export { PricingTable as default };

/*
USAGE:

import { PricingTable, SimplePricingCard } from '@/components/layouts/pricing-table';

// Full pricing table
const plans = [
  {
    name: 'Starter',
    description: 'Perfect for side projects',
    price: 0,
    period: 'month',
    features: [
      { text: '5 projects', included: true },
      { text: 'Basic analytics', included: true },
      { text: 'Email support', included: true },
      { text: 'Custom domain', included: false },
      { text: 'API access', included: false },
    ],
    cta: { text: 'Get Started', href: '/signup' },
  },
  {
    name: 'Pro',
    description: 'For growing businesses',
    price: 29,
    period: 'month',
    popular: true,
    features: [
      { text: 'Unlimited projects', included: true, highlight: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Priority support', included: true },
      { text: 'Custom domain', included: true },
      { text: 'API access', included: true, highlight: true },
    ],
    cta: { text: 'Start Free Trial', href: '/signup?plan=pro' },
  },
  {
    name: 'Enterprise',
    description: 'For large teams',
    price: 99,
    period: 'month',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'SSO & SAML', included: true },
      { text: 'Dedicated support', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'SLA guarantee', included: true, highlight: true },
    ],
    cta: { text: 'Contact Sales', href: '/contact' },
  },
];

<PricingTable plans={plans} billingToggle />

// Simple standalone card
<SimplePricingCard
  name="Basic"
  price={9}
  features={['Feature 1', 'Feature 2', 'Feature 3']}
  cta={{ text: 'Buy Now', href: '/buy' }}
/>
*/
