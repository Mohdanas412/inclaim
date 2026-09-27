'use client';

import React from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';

interface CostAnomalyPanelProps {
  surveyAssessed: number;
  repairEstimate: number;
  multiplier: number;
}

export function CostAnomalyPanel({
  surveyAssessed,
  repairEstimate,
  multiplier,
}: CostAnomalyPanelProps) {
  const formatINR = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="bg-[#FBFAF8] border border-[#E6E2DC] rounded-lg p-4 my-4 font-sans">
      <div className="flex items-center justify-between text-xs text-[#6B6B67] mb-3 pb-2 border-b border-[#E6E2DC]">
        <div className="font-semibold text-[#191919] uppercase tracking-wider flex items-center gap-1.5">
          <DollarSign className="w-3.5 h-3.5 text-[#B5451B]" />
          Cost Variance Ratio Analysis
        </div>
        <div className="font-mono text-[11px] text-[#B45309] font-semibold bg-[#FFFBEB] px-2 py-0.5 rounded border border-[#FDE68A]">
          Ratio: {multiplier}× Variance
        </div>
      </div>

      <div className="bg-white p-4 rounded-md border border-[#E6E2DC] space-y-4">
        {/* Comparison Row 1: Survey Assessed Value */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-[#6B6B67]">
              Surveyor Assessed Damage Value
            </span>
            <span className="font-mono font-bold text-[#16A34A]">
              {formatINR(surveyAssessed)}
            </span>
          </div>
          <div className="h-3 w-full bg-[#FAF9F6] border border-[#E6E2DC] rounded-full overflow-hidden p-0.5">
            <div className="h-full bg-[#16A34A] rounded-full" style={{ width: '32%' }} />
          </div>
        </div>

        {/* Comparison Row 2: Repair Estimate */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-[#6B6B67]">
              Workshop Claimed Repair Estimate
            </span>
            <span className="font-mono font-bold text-[#DC2626]">
              {formatINR(repairEstimate)}
            </span>
          </div>
          <div className="h-3 w-full bg-[#FAF9F6] border border-[#E6E2DC] rounded-full overflow-hidden p-0.5">
            <div className="h-full bg-[#DC2626] rounded-full" style={{ width: '100%' }} />
          </div>
        </div>

        {/* Multiplier Summary Banner */}
        <div className="bg-[#FAF9F6] border border-[#E6E2DC] rounded p-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#52524E]">
            <TrendingUp className="w-4 h-4 text-[#B5451B]" />
            <span>
              Claimed estimate is <strong className="text-[#191919] font-mono">{multiplier}×</strong> higher than surveyor physical damage assessment.
            </span>
          </div>
          <span className="font-mono text-[11px] bg-[#B5451B]/10 text-[#B5451B] px-2 py-0.5 rounded font-semibold">
            ANOMALY DETECTED
          </span>
        </div>
      </div>
    </div>
  );
}
