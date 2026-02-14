// components/sections/gallery/gallery-1.tsx
// Responsive image gallery with lightbox-ready grid
// Inspired by Efferd Image Gallery-1 (Free block)

'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface GalleryImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface Gallery1Props {
  images?: GalleryImage[];
  columns?: 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  onImageClick?: (image: GalleryImage, index: number) => void;
  className?: string;
}

export function Gallery1({
  images = [],
  columns = 3,
  gap = 'md',
  rounded = true,
  onImageClick,
  className,
}: Gallery1Props) {
  const colClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  };

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };

  return (
    <section className={cn('py-12', className)}>
      <div className={cn('grid', colClasses[columns], gapClasses[gap])}>
        {images.map((image, i) => (
          <button
            key={i}
            onClick={() => onImageClick?.(image, i)}
            className={cn(
              'group relative overflow-hidden bg-muted aspect-square',
              rounded && 'rounded-xl',
              onImageClick && 'cursor-pointer'
            )}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </button>
        ))}
      </div>

      {images.length === 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className={cn(
                'aspect-square bg-muted flex items-center justify-center',
                rounded && 'rounded-xl'
              )}
            >
              <svg className="h-8 w-8 text-muted-foreground/30" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
              </svg>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Gallery1;
