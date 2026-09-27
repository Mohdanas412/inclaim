'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { ReportHeader } from '@/components/investigation/ReportHeader';
import { TrustBanner } from '@/components/investigation/TrustBanner';
import { SummaryStrip } from '@/components/investigation/SummaryStrip';
import { FindingCard } from '@/components/findings/FindingCard';
import { DeterministicChecks } from '@/components/investigation/DeterministicChecks';
import { EvidenceTimeline } from '@/components/investigation/EvidenceTimeline';
import { Toast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import { fetchInvestigationReport } from '@/lib/mockApi';
import { Claim, ClaimDocument, Finding, DeterministicCheck } from '@/types/claim';
import { FileDown, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function InvestigationReportPage() {
  const routeParams = useParams();
  const id = (routeParams?.id as string) || '';

  const [claim, setClaim] = useState<Claim | null>(null);
  const [documents, setDocuments] = useState<ClaimDocument[]>([]);
  const [findings, setFindings] = useState<Finding[]>([]);
  const [checks, setChecks] = useState<DeterministicCheck[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [toastOpen, setToastOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;
    async function loadData() {
      setLoading(true);
      const res = await fetchInvestigationReport(id);
      if (res) {
        setClaim(res.claim);
        setDocuments(res.documents);
        setFindings(res.findings);
        setChecks(res.checks);
      }
      setLoading(false);
    }
    loadData();
  }, [id]);

  if (loading || !claim) {
    return (
      <AppLayout>
        <Header title="Investigation Report — Loading..." />
        <div className="p-12 text-center text-xs text-[#6B6B67]">
          <div className="animate-spin w-5 h-5 border-2 border-[#B5451B] border-t-transparent rounded-full mx-auto mb-2" />
          Fetching investigation workstation report...
        </div>
      </AppLayout>
    );
  }

  const isClean = claim.isClean || findings.length === 0;
  const highConfidenceCount = findings.filter(
    (f) => f.severity === 'HIGH CONFIDENCE'
  ).length;

  return (
    <AppLayout>
      <Header title={`Investigation Workstation — ${claim.id}`} />

      <main className="p-6 max-w-[1280px] mx-auto w-full font-sans">
        {/* Report Header */}
        <ReportHeader
          claim={claim}
          contradictionCount={findings.length}
        />

        {/* Mandatory Trust Banner */}
        <TrustBanner />

        {/* Investigation Summary Strip */}
        <SummaryStrip
          documentsReviewed={documents.length}
          evidenceChecks={isClean ? 9 : 12}
          contradictions={findings.length}
          highConfidence={highConfidenceCount}
          humanReviewRequired={!isClean}
        />

        {/* Main Findings Section */}
        {isClean ? (
          /* Clean Claim Experience */
          <div className="bg-white border border-[#E6E2DC] rounded-xl p-6 mb-6 shadow-2xs">
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-[#E6E2DC]">
              <div className="w-9 h-9 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-[#16A34A] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#191919]">
                  No Contradictions Detected
                </h2>
                <p className="text-xs text-[#6B6B67]">
                  3 documents cross-checked. No reused photos found against 4,213 prior claims.
                </p>
              </div>
            </div>

            <div className="bg-[#FAF9F6] p-4 rounded-lg border border-[#E6E2DC] space-y-2 mb-4">
              <div className="text-xs font-semibold text-[#191919] uppercase tracking-wider">
                Recommended Next Step
              </div>
              <div className="text-sm font-semibold text-[#16A34A] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Proceed with standard settlement.
              </div>
              <p className="text-xs text-[#6B6B67]">
                All baseline deterministic checks passed with full chronological and estimate consistency.
              </p>
            </div>
          </div>
        ) : (
          /* Contradiction Findings List */
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-[#191919]">
                  Investigation Findings
                </h2>
                <p className="text-xs text-[#6B6B67] mt-0.5">
                  Evidence requiring investigator review and explicit verification
                </p>
              </div>
              <span className="font-mono text-xs text-[#DC2626] font-semibold bg-[#FEF2F2] px-2.5 py-1 rounded border border-[#FECACA]">
                {findings.length} CONTRADICTIONS SURFACED
              </span>
            </div>

            {findings.map((finding, idx) => (
              <FindingCard key={finding.id} finding={finding} index={idx} />
            ))}
          </div>
        )}

        {/* Deterministic Checks Section */}
        <DeterministicChecks
          checks={checks}
          defaultExpanded={isClean}
        />

        {/* Evidence Timeline */}
        <EvidenceTimeline claimId={claim.id} isClean={isClean} />

        {/* Report Footer & Export Committee Action */}
        <div className="bg-white border border-[#E6E2DC] rounded-xl p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-[#191919]">
              Committee-Ready Evidence Package
            </div>
            <div className="text-[11px] text-[#6B6B67] mt-0.5">
              Evidence package contains: {documents.length} source documents, {findings.length} findings, {checks.length} deterministic checks, {isClean ? 9 : 12} evidence references.
            </div>
          </div>

          <Button
            variant="terracotta"
            size="md"
            onClick={() => setToastOpen(true)}
            className="font-semibold shadow-xs shrink-0"
          >
            <FileDown className="w-4 h-4" />
            <span>Generate Report for Claims Committee</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </main>

      {/* Interactive Toast Notification */}
      <Toast
        message="Report exported — ready for committee review."
        isOpen={toastOpen}
        onClose={() => setToastOpen(false)}
      />
    </AppLayout>
  );
}
