'use client';

import React from 'react';
import Link from 'next/link';
import { Claim } from '@/types/claim';
import { Badge } from '@/components/ui/Badge';
import { ChevronRight, ShieldAlert, CheckCircle2, FileText } from 'lucide-react';

interface ReportHeaderProps {
  claim: Claim;
  contradictionCount: number;
}

export function ReportHeader({ claim, contradictionCount }: ReportHeaderProps) {
  const isClean = contradictionCount === 0;

  return (
    <div className="mb-6 font-sans">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-[#6B6B67] mb-3">
        <Link href="/dashboard" className="hover:text-[#191919] transition-colors">
          Claims
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#8C8C88]" />
        <Link
          href={`/claim/${claim.id}`}
          className="font-mono hover:text-[#191919] transition-colors"
        >
          {claim.id}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#8C8C88]" />
        <span className="font-semibold text-[#191919]">Investigation Report</span>
      </div>

      {/* Main Header Card */}
      <div className="bg-white border border-[#E6E2DC] rounded-xl p-5 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl font-bold font-mono text-[#191919]">
                {claim.id}
              </h1>
              <span className="text-base font-semibold text-[#191919]">
                {claim.policyholder}
              </span>
              <span className="font-mono bg-[#FAF9F6] border border-[#E6E2DC] px-2.5 py-1 rounded text-xs text-[#333330]">
                {claim.vehicleNumber}
              </span>
              <span className="font-mono text-base font-bold text-[#191919]">
                {claim.amount}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-[#6B6B67]">
              <span>{claim.claimType}</span>
              <span>·</span>
              <span>Source: {claim.flagSource}</span>
              <span>·</span>
              <span>Investigation completed 26 Sep 2026 · 15:42 IST</span>
            </div>
          </div>

          {/* Right Status Badge */}
          <div className="flex items-center gap-2 self-start lg:self-auto">
            {isClean ? (
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] text-[#16A34A]">
                <CheckCircle2 className="w-5 h-5" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider">
                    NO CONTRADICTIONS FOUND
                  </div>
                  <div className="text-[11px] font-medium text-[#15803D]">
                    ✓ Investigation Clear
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#FEF2F2] border border-[#FECACA] text-[#DC2626]">
                <ShieldAlert className="w-5 h-5 text-[#DC2626]" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider">
                    CONTRADICTIONS FOUND
                  </div>
                  <div className="text-[11px] font-medium text-[#991B1B]">
                    Human Review Required
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
