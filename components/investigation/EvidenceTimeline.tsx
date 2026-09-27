'use client';

import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface TimelineEvent {
  date: string;
  title: string;
  details: string;
  isInconsistent?: boolean;
}

interface EvidenceTimelineProps {
  claimId: string;
  isClean?: boolean;
}

export function EvidenceTimeline({ claimId, isClean = false }: EvidenceTimelineProps) {
  const events: TimelineEvent[] = isClean
    ? [
        {
          date: '18 Sep 2026',
          title: 'Reported Incident Date',
          details: 'Collision reported near Indiranagar, Bangalore.',
        },
        {
          date: '19 Sep 2026',
          title: 'Survey Conducted',
          details: 'Physical survey completed by M. Iyer (Surveyor ID: SY-8841).',
        },
        {
          date: '20 Sep 2026',
          title: 'Repair Estimate Submitted',
          details: 'Estimate ₹1,12,500 submitted by Express Motors.',
        },
        {
          date: '25 Sep 2026',
          title: 'Investigation Completed',
          details: 'Cross-document verification finished with 0 contradictions.',
        },
      ]
    : [
        {
          date: '14 Mar 2026',
          title: 'FIR Filed',
          details: 'Vijay Nagar PS · Crime No. 441/2026',
          isInconsistent: true,
        },
        {
          date: '18 Mar 2026',
          title: 'Reported Incident Date',
          details: 'Motor Own Damage incident date per Survey Report',
          isInconsistent: true,
        },
        {
          date: '19 Mar 2026',
          title: 'Survey Conducted',
          details: 'Physical survey completed by R. K. Varma',
        },
        {
          date: '21 Mar 2026',
          title: 'Repair Estimate',
          details: 'Workshop estimate ₹2,84,000 received',
        },
        {
          date: '26 Sep 2026',
          title: 'Investigation Completed',
          details: 'InClaim cross-reference automated analysis completed',
        },
      ];

  return (
    <div className="bg-white border border-[#E6E2DC] rounded-xl p-5 mb-6 shadow-2xs font-sans">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E6E2DC]">
        <Clock className="w-4 h-4 text-[#B5451B]" />
        <h3 className="text-xs font-bold text-[#191919] uppercase tracking-wider">
          Evidence Chronological Timeline
        </h3>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E6E2DC]">
        {events.map((evt, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline node dot */}
            <div
              className={`absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full border-2 bg-white transition-all ${
                evt.isInconsistent
                  ? 'border-[#DC2626] bg-[#FEF2F2] ring-4 ring-[#FEF2F2]'
                  : 'border-[#191919] bg-[#FAF9F6]'
              }`}
            />

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-mono text-[#191919]">
                  {evt.date}
                </span>
                <span className="text-xs font-semibold text-[#191919]">
                  {evt.title}
                </span>
                {evt.isInconsistent && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-[#DC2626] bg-[#FEF2F2] px-1.5 py-0.2 rounded border border-[#FECACA]">
                    <AlertTriangle className="w-3 h-3" />
                    SEQUENCE INCONSISTENT
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs text-[#6B6B67] mt-0.5">{evt.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
