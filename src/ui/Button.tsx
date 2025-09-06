import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  loading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  loading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const { theme } = useTheme();

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const variantClasses = {
    primary: theme === 'light'
      ? 'bg-black text-white hover:bg-black/90 focus:ring-black/50 shadow-sm'
      : 'bg-white text-black hover:bg-white/90 focus:ring-white/50 shadow-sm',
    secondary: theme === 'light'
      ? 'bg-white text-black border border-black/20 hover:bg-black/5 focus:ring-black/50 shadow-sm'
      : 'bg-black text-white border border-white/20 hover:bg-white/5 focus:ring-white/50 shadow-sm',
    ghost: theme === 'light'
      ? 'text-black hover:bg-black/10 focus:ring-black/50'
      : 'text-white hover:bg-white/10 focus:ring-white/50',
    danger: theme === 'light'
      ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm'
      : 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-sm'
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="m15.84 9.46a8 8 0 0 1-7.37 7.37"></path>
        </svg>
      )}
      {children}
    </button>
  );
}