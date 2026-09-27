'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, CheckCircle2, Loader2, Circle } from 'lucide-react';

interface ProcessingOverlayProps {
  claimId: string;
  isOpen: boolean;
}

interface Step {
  id: string;
  num: string;
  label: string;
  sublabel: string;
}

const PIPELINE_STEPS: Step[] = [
  {
    id: 'step-1',
    num: '01',
    label: 'Extracting text from documents',
    sublabel: 'OCR simulation & document parsing',
  },
  {
    id: 'step-2',
    num: '02',
    label: 'Cross-checking chassis, dates and repair costs',
    sublabel: 'Deterministic field verification',
  },
  {
    id: 'step-3',
    num: '03',
    label: 'Comparing claim photos against 4,213 prior claims',
    sublabel: 'Perceptual image hashing algorithm (pHash)',
  },
  {
    id: 'step-4',
    num: '04',
    label: 'Running contradiction analysis',
    sublabel: 'Cross-document inconsistency scoring',
  },
  {
    id: 'step-5',
    num: '05',
    label: 'Assembling investigation report',
    sublabel: 'Formatting evidence citations for human review',
  },
];

export function ProcessingOverlay({ claimId, isOpen }: ProcessingOverlayProps) {
  const router = useRouter();
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setActiveStepIndex(0);
      setCompletedSteps([]);
      return;
    }

    // Step 01 completes at 800ms
    const t1 = setTimeout(() => {
      setCompletedSteps((prev) => [...prev, 0]);
      setActiveStepIndex(1);
    }, 800);

    // Step 02 completes at 1700ms
    const t2 = setTimeout(() => {
      setCompletedSteps((prev) => [...prev, 1]);
      setActiveStepIndex(2);
    }, 1700);

    // Step 03 completes at 2700ms
    const t3 = setTimeout(() => {
      setCompletedSteps((prev) => [...prev, 2]);
      setActiveStepIndex(3);
    }, 2700);

    // Step 04 completes at 3600ms
    const t4 = setTimeout(() => {
      setCompletedSteps((prev) => [...prev, 3]);
      setActiveStepIndex(4);
    }, 3600);

    // Step 05 completes & navigates at 4500ms
    const t5 = setTimeout(() => {
      setCompletedSteps((prev) => [...prev, 4]);
      setTimeout(() => {
        router.push(`/claim/${claimId}/report`);
      }, 400);
    }, 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [isOpen, claimId, router]);

  if (!isOpen) return null;

  const totalSteps = PIPELINE_STEPS.length;
  const progressPercent = Math.round(
    ((completedSteps.length + (activeStepIndex < totalSteps ? 0.5 : 1)) / totalSteps) * 100
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF9F6] flex flex-col items-center justify-center p-6 select-none font-sans animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white border border-[#E6E2DC] rounded-xl shadow-xl p-8 relative overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#E6E2DC] pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#B5451B] flex items-center justify-center text-white">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#8C8C88] uppercase tracking-wider">
                InClaim Investigation Engine
              </div>
              <div className="text-sm font-mono font-bold text-[#191919]">
                {claimId}
              </div>
            </div>
          </div>
          <div className="px-2.5 py-1 rounded bg-[#FAF9F6] border border-[#E6E2DC] text-xs font-mono font-semibold text-[#B5451B]">
            PROCESSING
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-[#191919]">
            Running evidence investigation
          </h2>
          <p className="text-xs text-[#6B6B67] mt-1">
            Cross-checking the claim file against 4,213 historical records and source documents...
          </p>
        </div>

        {/* Vertical Pipeline Steps */}
        <div className="space-y-4 mb-8 relative before:absolute before:left-[19px] before:top-3 before:bottom-3 before:w-0.5 before:bg-[#E6E2DC]">
          {PIPELINE_STEPS.map((step, idx) => {
            const isDone = completedSteps.includes(idx);
            const isCurrent = activeStepIndex === idx && !isDone;

            return (
              <div key={step.id} className="flex items-start gap-4 relative z-10">
                {/* Step indicator */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 border transition-all duration-200 ${
                    isDone
                      ? 'bg-[#F0FDF4] border-[#16A34A] text-[#16A34A]'
                      : isCurrent
                      ? 'bg-[#FFF7ED] border-[#B5451B] text-[#B5451B] ring-4 ring-[#B5451B]/10'
                      : 'bg-[#FAF9F6] border-[#E6E2DC] text-[#8C8C88]'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                  ) : isCurrent ? (
                    <Loader2 className="w-5 h-5 animate-spin text-[#B5451B]" />
                  ) : (
                    <span>{step.num}</span>
                  )}
                </div>

                {/* Step Text */}
                <div className="pt-1 min-w-0 flex-1">
                  <div
                    className={`text-xs font-semibold ${
                      isDone
                        ? 'text-[#191919]'
                        : isCurrent
                        ? 'text-[#B5451B]'
                        : 'text-[#8C8C88]'
                    }`}
                  >
                    {step.label}
                  </div>
                  <div className="text-[11px] text-[#6B6B67] mt-0.5">
                    {step.sublabel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Overall Progress Bar */}
        <div className="space-y-2 pt-4 border-t border-[#E6E2DC]">
          <div className="flex justify-between text-xs font-mono text-[#6B6B67]">
            <span>Pipeline Execution</span>
            <span className="font-semibold text-[#191919]">{progressPercent}%</span>
          </div>
          <div className="h-2 w-full bg-[#FAF9F6] border border-[#E6E2DC] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#B5451B] transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
