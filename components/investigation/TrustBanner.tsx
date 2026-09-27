'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export function TrustBanner() {
  return (
    <div className="bg-[#F2EFEA] border border-[#E6E2DC] rounded-lg p-4 mb-6 text-[#191919] font-sans">
      <div className="flex items-start gap-3">
        <div className="p-1 rounded bg-[#FAF9F6] border border-[#E6E2DC] text-[#6B6B67] shrink-0 mt-0.5">
          <ShieldCheck className="w-4 h-4 text-[#B5451B]" />
        </div>
        <div>
          <div className="text-xs font-bold tracking-wider uppercase text-[#191919] flex items-center gap-2">
            <span>INVESTIGATIVE FINDING — NOT A FRAUD DETERMINATION</span>
          </div>
          <p className="text-xs text-[#52524E] mt-1 leading-relaxed">
            This report surfaces evidence requiring human review. It does not determine fraud or claim eligibility. Any action must be confirmed by an authorized reviewer.
          </p>
        </div>
      </div>
    </div>
  );
}
