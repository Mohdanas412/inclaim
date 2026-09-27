'use client';

import React, { useState } from 'react';
import { DeterministicCheck } from '@/types/claim';
import { CheckCircle2, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

interface DeterministicChecksProps {
  checks: DeterministicCheck[];
  defaultExpanded?: boolean;
}

export function DeterministicChecks({
  checks,
  defaultExpanded = false,
}: DeterministicChecksProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);

  const passedCount = checks.filter((c) => c.status === 'PASSED').length;

  return (
    <div className="bg-white border border-[#E6E2DC] rounded-xl overflow-hidden mb-6 shadow-2xs font-sans">
      {/* Clickable Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 bg-[#FBFAF8] hover:bg-[#F2EFEA] transition-colors flex items-center justify-between text-left border-b border-[#E6E2DC]"
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-[#F0FDF4] border border-[#BBF7D0] text-[#16A34A] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#191919] uppercase tracking-wider flex items-center gap-2">
              Deterministic Checks Passed
              <span className="font-mono text-xs bg-[#F0FDF4] text-[#16A34A] px-2 py-0.5 rounded border border-[#BBF7D0]">
                {passedCount} / {checks.length} PASSED
              </span>
            </h3>
            <p className="text-[11px] text-[#6B6B67] mt-0.5">
              Verified baseline field consistency across official claim records
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-[#6B6B67]">
          <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-[#8C8C88]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#8C8C88]" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-4 bg-white divide-y divide-[#E6E2DC]/60">
          {checks.map((check) => (
            <div key={check.id} className="py-3 first:pt-0 last:pb-0 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-semibold text-[#191919]">
                    {check.title}
                  </h4>
                  <span className="font-mono text-[10px] text-[#52524E] bg-[#FAF9F6] border border-[#E6E2DC] px-2 py-0.5 rounded">
                    {check.sources}
                  </span>
                </div>
                <p className="text-[11px] text-[#6B6B67] mt-1">
                  {check.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
