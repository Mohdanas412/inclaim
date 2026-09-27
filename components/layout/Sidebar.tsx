'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldAlert, LayoutDashboard, Layers, UserCheck } from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();

  const isDashboard = pathname === '/dashboard' || pathname === '/';
  const isWorkspace = pathname.startsWith('/claim');

  return (
    <aside className="w-60 shrink-0 bg-[#FBFAF8] border-r border-[#E6E2DC] flex flex-col justify-between h-screen sticky top-0 text-[#191919] select-none font-sans">
      <div>
        {/* Brand Header */}
        <div className="p-4 border-b border-[#E6E2DC]">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded bg-[#B5451B] flex items-center justify-center text-white shadow-xs group-hover:bg-[#9E3B16] transition-colors">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold tracking-tight text-base text-[#191919] leading-none">
                INCLAIM
              </div>
              <div className="text-[11px] text-[#6B6B67] mt-1 font-medium tracking-wide">
                Evidence Investigation
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Section */}
        <nav className="p-3 space-y-4">
          <div>
            <div className="px-2 pb-2 text-[10px] uppercase font-semibold text-[#8C8C88] tracking-wider">
              Navigation
            </div>
            <Link
              href="/dashboard"
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs font-medium transition-colors ${
                isDashboard
                  ? 'bg-[#F2EFEA] text-[#B5451B] border-l-2 border-[#B5451B]'
                  : 'text-[#52524E] hover:bg-[#F2EFEA] hover:text-[#191919]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
          </div>

          <div>
            <div className="px-2 pb-2 text-[10px] uppercase font-semibold text-[#8C8C88] tracking-wider">
              Workspace
            </div>
            <Link
              href="/dashboard"
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs font-medium transition-colors ${
                isWorkspace
                  ? 'bg-[#F2EFEA] text-[#B5451B] border-l-2 border-[#B5451B]'
                  : 'text-[#52524E] hover:bg-[#F2EFEA] hover:text-[#191919]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Claim Queue</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* User Footer Profile */}
      <div className="p-3 border-t border-[#E6E2DC] bg-[#FAF9F6]">
        <div className="flex items-center gap-2.5 p-2 rounded-md border border-[#E6E2DC]/60 bg-white">
          <div className="w-8 h-8 rounded-full bg-[#E6E2DC] text-[#191919] flex items-center justify-center font-semibold text-xs shrink-0">
            AM
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold text-[#191919] truncate flex items-center gap-1">
              A. Mehta
              <UserCheck className="w-3 h-3 text-[#16A34A]" />
            </div>
            <div className="text-[11px] text-[#6B6B67] truncate">
              SIU Operations
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
