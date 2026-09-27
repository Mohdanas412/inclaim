import React from 'react';

export type BadgeVariant = 
  | 'pending'
  | 'investigated'
  | 'review'
  | 'cleared'
  | 'siu'
  | 'high_confidence'
  | 'medium_confidence'
  | 'low_confidence'
  | 'neutral';

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant, children, className = '' }: BadgeProps) {
  const variantStyles: Record<BadgeVariant, string> = {
    pending: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
    investigated: 'bg-[#F3F4F6] text-[#374151] border-[#E5E7EB]',
    review: 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]',
    cleared: 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]',
    siu: 'bg-[#FFF7ED] text-[#C2410C] border-[#FFEDD5]',
    high_confidence: 'bg-[#FEF2F2] text-[#991B1B] border-[#FCA5A5] font-semibold',
    medium_confidence: 'bg-[#FFFBEB] text-[#B45309] border-[#FCD34D]',
    low_confidence: 'bg-[#F3F4F6] text-[#4B5563] border-[#E5E7EB]',
    neutral: 'bg-[#FAFAFA] text-[#525252] border-[#E5E5E5]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium tracking-wide uppercase border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
