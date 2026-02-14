// components/sections/auth/auth-2.tsx
// Auth page with testimonial sidebar
// Inspired by Efferd Auth-2 (Free block)
// Usage: <Auth2 /> — split-screen login with social proof

'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

interface Auth2Props {
  logo?: React.ReactNode;
  title?: string;
  subtitle?: string;
  testimonial?: Testimonial;
  brandName?: string;
  onGoogleLogin?: () => void;
  onGitHubLogin?: () => void;
  onSubmit?: (data: { name: string; email: string; password: string }) => void;
  mode?: 'login' | 'signup';
  className?: string;
}

export function Auth2({
  logo,
  title,
  subtitle,
  testimonial = {
    quote: 'This platform has completely transformed how we work. The tools are intuitive and the results speak for themselves.',
    author: 'Sarah Johnson',
    role: 'CEO, TechCorp',
  },
  brandName = 'Acme Inc',
  onGoogleLogin,
  onGitHubLogin,
  onSubmit,
  mode = 'signup',
  className,
}: Auth2Props) {
  const [formData, setFormData] = React.useState({ name: '', email: '', password: '' });
  const isLogin = mode === 'login';

  return (
    <div className={cn('min-h-screen flex', className)}>
      {/* Left — Testimonial Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-foreground text-background flex-col justify-between p-12">
        <div>
          {logo || (
            <span className="text-xl font-bold">{brandName}</span>
          )}
        </div>

        <div className="space-y-6">
          <blockquote className="text-2xl font-medium leading-relaxed">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <div className="flex items-center gap-3">
            {testimonial.avatar ? (
              <img src={testimonial.avatar} alt={testimonial.author} className="w-10 h-10 rounded-full" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center text-sm font-bold">
                {testimonial.author.charAt(0)}
              </div>
            )}
            <div>
              <p className="font-semibold text-sm">{testimonial.author}</p>
              <p className="text-sm opacity-70">{testimonial.role}</p>
            </div>
          </div>
        </div>

        <p className="text-xs opacity-50">© {new Date().getFullYear()} {brandName}. All rights reserved.</p>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              {title || (isLogin ? 'Welcome back' : 'Create an account')}
            </h1>
            <p className="text-sm text-muted-foreground">
              {subtitle || (isLogin ? 'Enter your credentials to continue' : 'Get started with your free account')}
            </p>
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onGoogleLogin}
              className="flex items-center justify-center gap-2 rounded-lg border border-input px-4 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </button>
            <button
              onClick={onGitHubLogin}
              className="flex items-center justify-center gap-2 rounded-lg border border-input px-4 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or</span>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit?.(formData);
            }}
            className="space-y-4"
          >
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-1.5">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <a href="#" className="font-medium text-foreground hover:underline">
              {isLogin ? 'Sign up' : 'Sign in'}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth2;
