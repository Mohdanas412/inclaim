'use client';

import React from 'react';

interface SummaryStripProps {
  documentsReviewed: number;
  evidenceChecks: number;
  contradictions: number;
  highConfidence: number;
  humanReviewRequired: boolean;
}

export function SummaryStrip({
  documentsReviewed,
  evidenceChecks,
  contradictions,
  highConfidence,
  humanReviewRequired,
}: SummaryStripProps) {
  return (
    <div className="bg-white border border-[#E6E2DC] rounded-lg p-3.5 mb-6 grid grid-cols-2 sm:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-[#E6E2DC] shadow-2xs font-sans">
      {/* Docs reviewed */}
      <div className="p-2 sm:px-4 flex flex-col justify-center">
        <div className="text-[11px] font-medium text-[#6B6B67] uppercase tracking-wider">
          Documents reviewed
        </div>
        <div className="text-base font-bold font-mono text-[#191919] mt-0.5">
          {documentsReviewed}
        </div>
      </div>

      {/* Evidence checks */}
      <div className="p-2 sm:px-4 flex flex-col justify-center">
        <div className="text-[11px] font-medium text-[#6B6B67] uppercase tracking-wider">
          Evidence checks
        </div>
        <div className="text-base font-bold font-mono text-[#191919] mt-0.5">
          {evidenceChecks}
        </div>
      </div>

      {/* Contradictions */}
      <div className="p-2 sm:px-4 flex flex-col justify-center">
        <div className="text-[11px] font-medium text-[#6B6B67] uppercase tracking-wider">
          Contradictions
        </div>
        <div
          className={`text-base font-bold font-mono mt-0.5 ${
            contradictions > 0 ? 'text-[#DC2626]' : 'text-[#16A34A]'
          }`}
        >
          {contradictions}
        </div>
      </div>

      {/* High confidence */}
      <div className="p-2 sm:px-4 flex flex-col justify-center">
        <div className="text-[11px] font-medium text-[#6B6B67] uppercase tracking-wider">
          High confidence
        </div>
        <div className="text-base font-bold font-mono text-[#191919] mt-0.5">
          {highConfidence}
        </div>
      </div>

      {/* Human review */}
      <div className="p-2 sm:px-4 flex flex-col justify-center col-span-2 sm:col-span-1">
        <div className="text-[11px] font-medium text-[#6B6B67] uppercase tracking-wider">
          Human review
        </div>
        <div
          className={`text-xs font-semibold mt-1 inline-flex items-center gap-1.5 ${
            humanReviewRequired ? 'text-[#B45309]' : 'text-[#16A34A]'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              humanReviewRequired ? 'bg-[#B45309]' : 'bg-[#16A34A]'
            }`}
          />
          {humanReviewRequired ? 'Required' : 'Not required'}
        </div>
      </div>
    </div>
  );
}
