'use client';

import React from 'react';
import { Eye, ShieldAlert, Sparkles } from 'lucide-react';

interface PhotoComparisonPanelProps {
  currentPhotoId: string;
  currentClaimId: string;
  matchedPhotoId: string;
  matchedClaimId: string;
  phashBitDifference: number;
  confidenceScore: number;
}

export function PhotoComparisonPanel({
  currentPhotoId,
  currentClaimId,
  matchedPhotoId,
  matchedClaimId,
  phashBitDifference,
  confidenceScore,
}: PhotoComparisonPanelProps) {
  return (
    <div className="bg-[#FBFAF8] border border-[#E6E2DC] rounded-lg p-4 my-4 font-sans">
      <div className="flex items-center justify-between text-xs text-[#6B6B67] mb-3 pb-2 border-b border-[#E6E2DC]">
        <div className="font-semibold text-[#191919] uppercase tracking-wider flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-[#B5451B]" />
          Visual Perceptual Hashing (pHash) Comparison
        </div>
        <div className="font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-[#E6E2DC]">
          Algorithm: Difference Hash 64-bit
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Left: Photo from this claim */}
        <div className="bg-white border border-[#E6E2DC] rounded-md p-3">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="font-semibold text-[#191919]">Photo from this claim</span>
            <span className="font-mono text-[11px] text-[#6B6B67]">
              {currentClaimId} · {currentPhotoId}
            </span>
          </div>

          {/* Stylized neutral vehicle damage SVG illustration */}
          <div className="w-full h-40 bg-[#191919] rounded relative overflow-hidden flex flex-col items-center justify-center p-3 border border-neutral-700">
            <svg
              className="w-full h-28 text-neutral-500"
              viewBox="0 0 200 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Car Body Silhouette */}
              <path
                d="M20 60 L35 35 L70 30 L130 30 L165 40 L180 60 L185 70 L15 70 Z"
                fill="#2A2A2A"
                stroke="#555"
                strokeWidth="1.5"
              />
              {/* Wheels */}
              <circle cx="45" cy="72" r="12" fill="#111" stroke="#666" strokeWidth="2" />
              <circle cx="145" cy="72" r="12" fill="#111" stroke="#666" strokeWidth="2" />
              {/* Damage Highlight Box */}
              <rect
                x="30"
                y="38"
                width="35"
                height="24"
                fill="#B5451B"
                fillOpacity="0.25"
                stroke="#DC2626"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              {/* Damage crosshair */}
              <path d="M47.5 35 V65 M30 50 H65" stroke="#DC2626" strokeWidth="1" opacity="0.6" />
            </svg>

            {/* Overlay Stamp */}
            <div className="absolute top-2 left-2 bg-black/70 text-white font-mono text-[9px] px-1.5 py-0.5 rounded border border-neutral-600">
              IMG_04471_3.JPG · 3000x2000
            </div>
            <div className="absolute bottom-2 right-2 bg-[#B5451B]/90 text-white font-mono text-[9px] px-1.5 py-0.5 rounded">
              DAMAGE AREA #01
            </div>
          </div>
        </div>

        {/* Right: Matching photo from prior claim */}
        <div className="bg-white border border-[#E6E2DC] rounded-md p-3">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="font-semibold text-[#191919] text-[#B5451B] flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              Matching photo in prior claim
            </span>
            <span className="font-mono text-[11px] text-[#6B6B67]">
              {matchedClaimId} · {matchedPhotoId}
            </span>
          </div>

          {/* Stylized neutral vehicle damage SVG illustration (Near identical) */}
          <div className="w-full h-40 bg-[#191919] rounded relative overflow-hidden flex flex-col items-center justify-center p-3 border border-neutral-700">
            <svg
              className="w-full h-28 text-neutral-500"
              viewBox="0 0 200 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Car Body Silhouette */}
              <path
                d="M20 60 L35 35 L70 30 L130 30 L165 40 L180 60 L185 70 L15 70 Z"
                fill="#2A2A2A"
                stroke="#555"
                strokeWidth="1.5"
              />
              {/* Wheels */}
              <circle cx="45" cy="72" r="12" fill="#111" stroke="#666" strokeWidth="2" />
              <circle cx="145" cy="72" r="12" fill="#111" stroke="#666" strokeWidth="2" />
              {/* Identical Damage Highlight Box */}
              <rect
                x="30"
                y="38"
                width="35"
                height="24"
                fill="#B5451B"
                fillOpacity="0.25"
                stroke="#DC2626"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <path d="M47.5 35 V65 M30 50 H65" stroke="#DC2626" strokeWidth="1" opacity="0.6" />
            </svg>

            {/* Overlay Stamp (Edited Text overlay) */}
            <div className="absolute top-2 left-2 bg-black/70 text-amber-300 font-mono text-[9px] px-1.5 py-0.5 rounded border border-amber-500/50">
              IMG_03118_1.JPG · 3000x2000
            </div>
            <div className="absolute bottom-2 right-2 bg-black/80 text-white font-mono text-[9px] px-1.5 py-0.5 rounded border border-neutral-600">
              MATCH DETECTED
            </div>
          </div>
        </div>
      </div>

      {/* pHash Metric Bar */}
      <div className="bg-white p-3 rounded-md border border-[#E6E2DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="font-mono text-xs font-bold text-[#191919] bg-[#F2EFEA] px-2.5 py-1 rounded border border-[#E6E2DC]">
            {phashBitDifference} / 64 bit difference
          </div>
          <span className="text-xs text-[#6B6B67]">
            (Near-identical perceptual fingerprint)
          </span>
        </div>

        <div className="flex items-center gap-2 flex-1 max-w-xs">
          <span className="text-xs font-semibold text-[#191919] shrink-0 font-mono">
            {confidenceScore}% Match
          </span>
          <div className="h-2 flex-1 bg-[#FAF9F6] border border-[#E6E2DC] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#DC2626] rounded-full"
              style={{ width: `${confidenceScore}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
