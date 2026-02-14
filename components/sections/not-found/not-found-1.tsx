// components/sections/not-found/not-found-1.tsx
// Clean 404 page with go home button
// Inspired by Efferd Not-Found-1 (Free block)

'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface NotFound1Props {
  title?: string;
  description?: string;
  homeHref?: string;
  homeLabel?: string;
  className?: string;
}

export function NotFound1({
  title = '404',
  description = "The page you're looking for might have been moved or doesn't exist.",
  homeHref = '/',
  homeLabel = 'Go Home',
  className,
}: NotFound1Props) {
  return (
    <div className={cn('min-h-[70vh] flex flex-col items-center justify-center px-4', className)}>
      <h1 className="text-8xl sm:text-9xl font-black tracking-tighter text-foreground/10 select-none">
        {title}
      </h1>
      <p className="mt-4 text-center text-muted-foreground max-w-md">
        {description}
      </p>
      <a
        href={homeHref}
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
        {homeLabel}
      </a>
    </div>
  );
}

export default NotFound1;
