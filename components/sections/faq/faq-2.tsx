// components/sections/faq/faq-2.tsx
// FAQ section — two-column split layout with bordered cards
// Inspired by Efferd FAQ-2 (Free block)

'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQ2Props {
  title?: string;
  subtitle?: string;
  items?: FAQItem[];
  className?: string;
}

export function FAQ2({
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know about our product.',
  items = [
    { question: 'How does billing work?', answer: 'We offer monthly and annual billing. Annual plans come with a 20% discount.' },
    { question: 'Can I cancel anytime?', answer: 'Yes, you can cancel your subscription at any time. No questions asked.' },
    { question: 'Do you offer refunds?', answer: 'We offer a 30-day money-back guarantee for all plans.' },
    { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, PayPal, and bank transfers.' },
    { question: 'Is there a free trial?', answer: 'Yes! We offer a 14-day free trial with full access to all features.' },
    { question: 'How do I get support?', answer: 'Our support team is available 24/7 via email and live chat.' },
  ],
  className,
}: FAQ2Props) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const midpoint = Math.ceil(items.length / 2);
  const leftItems = items.slice(0, midpoint);
  const rightItems = items.slice(midpoint);

  const renderItem = (item: FAQItem, index: number) => (
    <div key={index} className="rounded-lg border border-border overflow-hidden">
      <button
        onClick={() => setOpenIndex(openIndex === index ? null : index)}
        className="w-full flex items-center justify-between p-4 text-left text-sm font-medium hover:bg-accent/50 transition-colors"
      >
        <span>{item.question}</span>
        <svg
          className={cn(
            'h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-200',
            openIndex === index && 'rotate-45'
          )}
          fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
      <div className={cn(
        'overflow-hidden transition-all duration-300',
        openIndex === index ? 'max-h-96' : 'max-h-0'
      )}>
        <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  );

  return (
    <section className={cn('py-20 lg:py-32', className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">{title}</h2>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            {leftItems.map((item, i) => renderItem(item, i))}
          </div>
          <div className="space-y-4">
            {rightItems.map((item, i) => renderItem(item, i + midpoint))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ2;
