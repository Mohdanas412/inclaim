'use client';

import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export function Toast({ message, isOpen, onClose }: ToastProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#191919] text-white px-4 py-3 rounded-lg shadow-xl border border-neutral-700 text-sm animate-in fade-in slide-in-from-bottom-5 duration-200">
      <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0" />
      <span className="font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-neutral-400 hover:text-white transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
