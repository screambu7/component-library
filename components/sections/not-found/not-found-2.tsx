// components/sections/not-found/not-found-2.tsx
// 404 page with illustration placeholder + navigation links
// Inspired by Efferd Not-Found-2 (Free block)

'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface QuickLink {
  label: string;
  href: string;
  description?: string;
}

interface NotFound2Props {
  title?: string;
  description?: string;
  links?: QuickLink[];
  homeHref?: string;
  className?: string;
}

export function NotFound2({
  title = 'Page not found',
  description = "Sorry, we couldn't find the page you're looking for. Here are some helpful links instead.",
  links = [
    { label: 'Documentation', href: '/docs', description: 'Learn how to get started' },
    { label: 'Blog', href: '/blog', description: 'Read our latest articles' },
    { label: 'Support', href: '/support', description: 'Get help from our team' },
  ],
  homeHref = '/',
  className,
}: NotFound2Props) {
  return (
    <div className={cn('min-h-[70vh] flex flex-col items-center justify-center px-4 py-20', className)}>
      {/* Error Code */}
      <p className="text-sm font-semibold text-primary mb-2">404</p>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-center">
        {title}
      </h1>
      <p className="text-muted-foreground text-center max-w-md mb-10">
        {description}
      </p>

      {/* Quick Links */}
      <div className="w-full max-w-md space-y-3 mb-10">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-accent/50 transition-colors group"
          >
            <div>
              <p className="text-sm font-medium group-hover:text-primary transition-colors">
                {link.label}
              </p>
              {link.description && (
                <p className="text-xs text-muted-foreground mt-0.5">{link.description}</p>
              )}
            </div>
            <svg className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>
        ))}
      </div>

      {/* Home Link */}
      <a
        href={homeHref}
        className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Back to home
      </a>
    </div>
  );
}

export default NotFound2;
