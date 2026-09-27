'use client';

import React from 'react';
import { ShieldCheck, User } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="h-14 bg-[#FBFAF8] border-b border-[#E6E2DC] px-6 flex items-center justify-between sticky top-0 z-30 font-sans">
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-semibold text-[#191919] tracking-tight">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Environment Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F2EFEA] border border-[#E6E2DC] text-[11px] font-mono font-medium text-[#6B6B67]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#B5451B]" />
          <span>DEMO ENVIRONMENT</span>
        </div>

        {/* User Badge */}
        <div className="flex items-center gap-1.5 text-xs text-[#52524E] border-l border-[#E6E2DC] pl-4">
          <User className="w-3.5 h-3.5 text-[#6B6B67]" />
          <span className="font-medium text-[#191919]">A. Mehta</span>
          <span className="text-[#8C8C88]">· Investigator</span>
        </div>
      </div>
    </header>
  );
}
