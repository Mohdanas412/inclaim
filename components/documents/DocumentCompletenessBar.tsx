'use client';

import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface DocumentCompletenessBarProps {
  loadedCount: number;
  totalCount: number;
  onRunInvestigation: () => void;
  isLoading?: boolean;
}

export function DocumentCompletenessBar({
  loadedCount,
  totalCount,
  onRunInvestigation,
  isLoading = false,
}: DocumentCompletenessBarProps) {
  const isComplete = loadedCount === totalCount;
  const percentage = Math.round((loadedCount / totalCount) * 100);

  return (
    <div className="bg-white border border-[#E6E2DC] rounded-lg p-5 shadow-2xs mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2 flex-1 max-w-md">
          <div className="flex items-center justify-between text-xs font-semibold text-[#191919]">
            <span>Evidence package</span>
            <span className="font-mono text-[#52524E]">
              {loadedCount} / {totalCount} documents ready
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-2.5 w-full bg-[#FAF9F6] border border-[#E6E2DC] rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-[#B5451B] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="text-[11px] text-[#6B6B67] flex items-center gap-1.5">
            {isComplete ? (
              <span className="text-[#16A34A] font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Ready for investigation
              </span>
            ) : (
              <span>Load remaining sample documents to begin cross-checking.</span>
            )}
          </div>
        </div>

        {/* Terracotta CTA Button */}
        <div>
          {isComplete && (
            <Button
              variant="terracotta"
              size="lg"
              onClick={onRunInvestigation}
              isLoading={isLoading}
              className="w-full sm:w-auto font-semibold shadow-md animate-in fade-in zoom-in-95 duration-200"
            >
              <span>Run Investigation</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
