import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'terracotta' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function Button({
  children,
  variant = 'terracotta',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variantStyles = {
    terracotta:
      'bg-[#B5451B] text-white hover:bg-[#9E3B16] active:bg-[#853112] focus:ring-[#B5451B]/40 shadow-sm border border-transparent',
    secondary:
      'bg-[#F2EFEA] text-[#191919] hover:bg-[#E6E2DC] active:bg-[#D9D4CD] border border-[#E6E2DC] focus:ring-[#6B6B67]/30',
    outline:
      'bg-transparent text-[#191919] hover:bg-[#FAF9F6] border border-[#E6E2DC] active:bg-[#F2EFEA] focus:ring-[#6B6B67]/30',
    ghost:
      'bg-transparent text-[#6B6B67] hover:text-[#191919] hover:bg-[#F2EFEA] focus:ring-[#6B6B67]/20',
    danger:
      'bg-[#DC2626] text-white hover:bg-[#B91C1C] focus:ring-[#DC2626]/40 shadow-sm',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-3.5 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
