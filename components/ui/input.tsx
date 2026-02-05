// components/ui/input.tsx
// Premium Input component with variants and animations

'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, Search, X } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  label?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, rightIcon, error, label, helperText, id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            type={type}
            className={cn(
              'flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-all',
              'file:border-0 file:bg-transparent file:text-sm file:font-medium',
              'placeholder:text-muted-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-destructive focus-visible:ring-destructive',
              className
            )}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-xs text-destructive" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1.5 text-xs text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

// Password Input with toggle visibility
const PasswordInput = React.forwardRef<HTMLInputElement, Omit<InputProps, 'type' | 'rightIcon'>>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <Input
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="hover:text-foreground transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
        className={className}
        {...props}
      />
    );
  }
);
PasswordInput.displayName = 'PasswordInput';

// Search Input with clear button
interface SearchInputProps extends Omit<InputProps, 'leftIcon' | 'rightIcon'> {
  onClear?: () => void;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onClear, onChange, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        type="search"
        value={value}
        onChange={onChange}
        leftIcon={<Search className="h-4 w-4" />}
        rightIcon={
          value ? (
            <button
              type="button"
              onClick={onClear}
              className="hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null
        }
        className={className}
        {...props}
      />
    );
  }
);
SearchInput.displayName = 'SearchInput';

// Floating Label Input
const FloatingInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, id, ...props }, ref) => {
    const inputId = id || React.useId();
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);

    return (
      <div className="relative">
        <input
          id={inputId}
          ref={ref}
          className={cn(
            'peer flex h-14 w-full rounded-lg border border-input bg-background px-4 pt-4 pb-2 text-sm ring-offset-background transition-all',
            'placeholder-transparent',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          placeholder={label}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            setHasValue(!!e.target.value);
          }}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            'absolute left-4 transition-all duration-200 pointer-events-none',
            'text-muted-foreground',
            isFocused || hasValue || props.value
              ? 'top-2 text-xs text-primary'
              : 'top-1/2 -translate-y-1/2 text-sm'
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);
FloatingInput.displayName = 'FloatingInput';

// Animated Input (entrance animation)
const AnimatedInput = React.forwardRef<HTMLInputElement, InputProps & { delay?: number }>(
  ({ delay = 0, ...props }, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay }}
      >
        <Input ref={ref} {...props} />
      </motion.div>
    );
  }
);
AnimatedInput.displayName = 'AnimatedInput';

export { Input, PasswordInput, SearchInput, FloatingInput, AnimatedInput };

/*
USAGE:

import { Input, PasswordInput, SearchInput, FloatingInput, AnimatedInput } from '@/components/ui/input';
import { Mail, User } from 'lucide-react';

// Basic Input
<Input placeholder="Enter your name" />

// With label and helper text
<Input 
  label="Email Address" 
  placeholder="you@example.com" 
  helperText="We'll never share your email"
/>

// With error
<Input 
  label="Username" 
  error="Username is already taken" 
/>

// With icons
<Input 
  leftIcon={<Mail className="h-4 w-4" />} 
  placeholder="Email" 
/>

// Password with toggle
<PasswordInput label="Password" placeholder="Enter password" />

// Search with clear
const [search, setSearch] = useState('');
<SearchInput 
  value={search} 
  onChange={(e) => setSearch(e.target.value)} 
  onClear={() => setSearch('')}
  placeholder="Search..."
/>

// Floating label
<FloatingInput label="Full Name" />

// Animated entrance
<AnimatedInput label="Animated" delay={0.2} />
*/
