'use client';

import React, { useState } from 'react';
import { Finding, ActionState } from '@/types/claim';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PhotoComparisonPanel } from './PhotoComparisonPanel';
import { TimelineContradiction } from './TimelineContradiction';
import { CostAnomalyPanel } from './CostAnomalyPanel';
import { Check, HelpCircle, FileSearch, ShieldCheck } from 'lucide-react';

interface FindingCardProps {
  finding: Finding;
  index: number;
}

export function FindingCard({ finding, index }: FindingCardProps) {
  const [actionState, setActionState] = useState<ActionState>(finding.actionState);

  const getSeverityBadge = (severity: Finding['severity'], score: number) => {
    switch (severity) {
      case 'HIGH CONFIDENCE':
        return (
          <Badge variant="high_confidence">
            HIGH CONFIDENCE · {score}%
          </Badge>
        );
      case 'MEDIUM CONFIDENCE':
        return (
          <Badge variant="medium_confidence">
            MEDIUM CONFIDENCE · {score}%
          </Badge>
        );
      case 'LOW CONFIDENCE':
        return (
          <Badge variant="low_confidence">
            LOW CONFIDENCE · {score}%
          </Badge>
        );
    }
  };

  return (
    <div className="bg-white border border-[#E6E2DC] rounded-xl p-5 mb-6 shadow-2xs font-sans transition-all duration-200 hover:border-[#D6D2CC]">
      {/* Finding Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E6E2DC]">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded bg-[#FAF9F6] border border-[#E6E2DC] text-[#B5451B] font-mono text-xs font-bold flex items-center justify-center">
            0{index + 1}
          </div>
          <h3 className="text-sm font-bold text-[#191919]">{finding.title}</h3>
        </div>

        <div className="flex items-center gap-2">
          {getSeverityBadge(finding.severity, finding.confidenceScore)}
          <Badge variant={actionState === 'none' ? 'review' : 'neutral'}>
            {actionState === 'none'
              ? 'Review Required'
              : actionState === 'confirmed'
              ? 'Confirmed'
              : actionState === 'false_positive'
              ? 'False Positive'
              : 'More Evidence'}
          </Badge>
        </div>
      </div>

      {/* Explanation Text */}
      <div className="mt-4 text-xs text-[#333330] leading-relaxed bg-[#FAF9F6] p-3.5 rounded-md border border-[#E6E2DC]">
        <p>{finding.description}</p>
      </div>

      {/* Specific Visual Panel */}
      {finding.type === 'photo_duplicate' && finding.photoComparison && (
        <PhotoComparisonPanel
          currentPhotoId={finding.photoComparison.currentPhotoId}
          currentClaimId={finding.photoComparison.currentClaimId}
          matchedPhotoId={finding.photoComparison.matchedPhotoId}
          matchedClaimId={finding.photoComparison.matchedClaimId}
          phashBitDifference={finding.photoComparison.phashBitDifference}
          confidenceScore={finding.confidenceScore}
        />
      )}

      {finding.type === 'date_contradiction' && finding.timelineComparison && (
        <TimelineContradiction
          firDate={finding.timelineComparison.firDate}
          incidentDate={finding.timelineComparison.incidentDate}
          diffDays={finding.timelineComparison.diffDays}
        />
      )}

      {finding.type === 'cost_anomaly' && finding.costComparison && (
        <CostAnomalyPanel
          surveyAssessed={finding.costComparison.surveyAssessed}
          repairEstimate={finding.costComparison.repairEstimate}
          multiplier={finding.costComparison.multiplier}
        />
      )}

      {/* Sources Citations */}
      <div className="my-3 pt-3 border-t border-[#E6E2DC]/80">
        <div className="text-[11px] font-semibold text-[#8C8C88] uppercase tracking-wider mb-2">
          Source Evidence Citations
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {finding.sources.map((src, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FAF9F6] border border-[#E6E2DC] text-xs font-mono text-[#191919]"
            >
              <span className="text-[#B5451B] font-semibold">[{src.document}]</span>
              <span className="text-[#8C8C88]">·</span>
              <span className="text-[#52524E]">{src.field}:</span>
              <span className="font-semibold text-[#191919]">{src.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Bar & Audit State */}
      <div className="mt-4 pt-3 border-t border-[#E6E2DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant={actionState === 'confirmed' ? 'terracotta' : 'outline'}
            size="sm"
            onClick={() => setActionState('confirmed')}
            className="text-xs"
          >
            <Check className="w-3.5 h-3.5" />
            Confirm Finding
          </Button>

          <Button
            variant={actionState === 'false_positive' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setActionState('false_positive')}
            className="text-xs"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Mark as False Positive
          </Button>

          <Button
            variant={actionState === 'more_evidence' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setActionState('more_evidence')}
            className="text-xs text-[#B45309]"
          >
            <FileSearch className="w-3.5 h-3.5" />
            Request More Evidence
          </Button>
        </div>

        {/* Audit Status Display */}
        <div className="text-xs font-medium text-[#6B6B67] flex items-center gap-1.5 bg-[#FAF9F6] px-3 py-1.5 rounded border border-[#E6E2DC]">
          <ShieldCheck className="w-4 h-4 text-[#B5451B]" />
          <span>
            {actionState === 'none' && 'Pending investigator action'}
            {actionState === 'confirmed' && 'Finding confirmed by investigator'}
            {actionState === 'false_positive' && 'Marked for false-positive review'}
            {actionState === 'more_evidence' && 'Additional evidence requested'}
          </span>
        </div>
      </div>
    </div>
  );
}
