'use client';

import React from 'react';
import { Calendar, AlertCircle } from 'lucide-react';

interface TimelineContradictionProps {
  firDate: string;
  incidentDate: string;
  diffDays: number;
}

export function TimelineContradiction({
  firDate,
  incidentDate,
  diffDays,
}: TimelineContradictionProps) {
  return (
    <div className="bg-[#FBFAF8] border border-[#E6E2DC] rounded-lg p-4 my-4 font-sans">
      <div className="flex items-center justify-between text-xs text-[#6B6B67] mb-3 pb-2 border-b border-[#E6E2DC]">
        <div className="font-semibold text-[#191919] uppercase tracking-wider flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#B5451B]" />
          Temporal Inconsistency Diagram
        </div>
        <div className="font-mono text-[11px] text-[#DC2626] font-semibold bg-[#FEF2F2] px-2 py-0.5 rounded border border-[#FECACA]">
          Inverted Sequence: FIR Precedes Incident Date
        </div>
      </div>

      {/* Mini Visual Timeline */}
      <div className="bg-white p-5 rounded-md border border-[#E6E2DC] relative my-2">
        <div className="flex items-center justify-between max-w-lg mx-auto relative">
          {/* Timeline connecting line */}
          <div className="absolute top-1/2 left-10 right-10 -translate-y-1/2 h-1 bg-[#FDE68A] border-y border-[#D97706]/30 z-0" />

          {/* Point 1: FIR Filed */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#FFFBEB] border-2 border-[#D97706] text-[#B45309] font-mono text-xs font-bold flex items-center justify-center shadow-xs">
              01
            </div>
            <div className="mt-2 text-center">
              <div className="text-xs font-bold text-[#191919] font-mono">{firDate}</div>
              <div className="text-[11px] font-semibold text-[#B45309]">FIR Filed</div>
              <div className="text-[10px] text-[#6B6B67]">Vijay Nagar PS</div>
            </div>
          </div>

          {/* Anomaly Badge on line */}
          <div className="relative z-10 bg-[#FEF2F2] text-[#B91C1C] border border-[#FECACA] px-2.5 py-1 rounded text-[11px] font-mono font-bold flex items-center gap-1 shadow-xs">
            <AlertCircle className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>+{diffDays} Days Conflict</span>
          </div>

          {/* Point 2: Incident Date */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#FEF2F2] border-2 border-[#DC2626] text-[#DC2626] font-mono text-xs font-bold flex items-center justify-center shadow-xs">
              02
            </div>
            <div className="mt-2 text-center">
              <div className="text-xs font-bold text-[#191919] font-mono">{incidentDate}</div>
              <div className="text-[11px] font-semibold text-[#DC2626]">
                Reported Incident Date
              </div>
              <div className="text-[10px] text-[#6B6B67]">Survey Report</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
