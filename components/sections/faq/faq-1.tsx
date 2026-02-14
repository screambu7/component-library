// components/sections/faq/faq-1.tsx
// FAQ section with accordion — clean, single column
// Inspired by Efferd FAQ-1 (Free block)

'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQ1Props {
  title?: string;
  subtitle?: string;
  items?: FAQItem[];
  supportText?: string;
  supportLink?: { text: string; href: string };
  className?: string;
}

export function FAQ1({
  title = 'Frequently Asked Questions',
  subtitle,
  items = [
    { question: 'What is this product?', answer: 'A collection of beautifully crafted UI blocks and components, designed to help developers build modern websites with ease.' },
    { question: 'Who can benefit from it?', answer: 'Developers, designers, and teams who want to ship beautiful products faster without starting from scratch.' },
    { question: 'What features does it include?', answer: 'Pre-built components for auth, pricing, heroes, FAQs, contact pages, and more. All responsive and customizable.' },
    { question: 'Can I customize the components?', answer: 'Yes! All components are built with Tailwind CSS and are fully customizable. The code lives in your project.' },
    { question: 'Does it integrate with my existing tools?', answer: 'It works with any React framework including Next.js, Remix, and Vite. Compatible with Radix UI and shadcn/ui.' },
    { question: 'How do I get support?', answer: 'Reach out via email or open an issue on GitHub. We respond within 24 hours.' },
  ],
  supportText = "Can't find what you're looking for?",
  supportLink = { text: 'customer support team', href: '/contact' },
  className,
}: FAQ1Props) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <section className={cn('py-20 lg:py-32', className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">{title}</h2>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>

        {/* Accordion */}
        <div className="divide-y divide-border border-t border-b">
          {items.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-4 text-left text-sm font-medium hover:text-foreground/80 transition-colors"
              >
                <span>{item.question}</span>
                <svg
                  className={cn(
                    'h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-200',
                    openIndex === i && 'rotate-180'
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              <div
                className={cn(
                  'overflow-hidden transition-all duration-300 ease-in-out',
                  openIndex === i ? 'max-h-96 pb-4' : 'max-h-0'
                )}
              >
                <p className="text-sm text-muted-foreground leading-relaxed pr-8">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Support */}
        {supportText && (
          <p className="text-center text-sm text-muted-foreground mt-8">
            {supportText} Contact our{' '}
            <a href={supportLink.href} className="font-medium text-foreground hover:underline">
              {supportLink.text}
            </a>
          </p>
        )}
      </div>
    </section>
  );
}

export default FAQ1;
