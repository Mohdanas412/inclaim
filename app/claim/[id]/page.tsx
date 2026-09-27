'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { DocumentIntakeCard } from '@/components/documents/DocumentIntakeCard';
import { DocumentCompletenessBar } from '@/components/documents/DocumentCompletenessBar';
import { ProcessingOverlay } from '@/components/investigation/ProcessingOverlay';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, CheckCircle2, UploadCloud } from 'lucide-react';
import { fetchClaimById } from '@/lib/mockApi';
import { Claim, ClaimDocument } from '@/types/claim';

export default function ClaimIntakePage() {
  const router = useRouter();
  const routeParams = useParams();
  const id = (routeParams?.id as string) || '';

  const [claim, setClaim] = useState<Claim | null>(null);
  const [documents, setDocuments] = useState<ClaimDocument[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isProcessingOverlayOpen, setIsProcessingOverlayOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;
    async function loadData() {
      setLoading(true);
      const res = await fetchClaimById(id);
      if (res) {
        setClaim(res.claim);
        setDocuments(res.documents);
      }
      setLoading(false);
    }
    loadData();
  }, [id]);

  const handleLoadSample = (docId: string) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === docId ? { ...doc, uploaded: true } : doc
      )
    );
  };

  const handleLoadAllSamples = () => {
    setDocuments((prev) =>
      prev.map((doc) => ({ ...doc, uploaded: true }))
    );
  };

  const loadedCount = documents.filter((d) => d.uploaded).length;
  const totalCount = documents.length;

  if (loading || !claim) {
    return (
      <AppLayout>
        <Header title="Claim Intake — Loading..." />
        <div className="p-12 text-center text-xs text-[#6B6B67]">
          <div className="animate-spin w-5 h-5 border-2 border-[#B5451B] border-t-transparent rounded-full mx-auto mb-2" />
          Loading claim file...
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Header title={`Claim Intake — ${claim.id}`} />

      <main className="p-6 max-w-[1280px] mx-auto w-full font-sans">
        {/* Back Link & Header */}
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs text-[#6B6B67] hover:text-[#191919] transition-colors mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Claims</span>
          </Link>

          <div className="bg-white border border-[#E6E2DC] rounded-xl p-5 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-xl font-bold font-mono text-[#191919]">
                    {claim.id}
                  </h1>
                  <span className="text-base font-semibold text-[#191919]">
                    {claim.policyholder}
                  </span>
                  <span className="font-mono bg-[#FAF9F6] border border-[#E6E2DC] px-2.5 py-0.5 rounded text-xs text-[#333330]">
                    {claim.vehicleNumber}
                  </span>
                  <span className="font-mono text-base font-bold text-[#191919]">
                    {claim.amount}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant={claim.referral === 'SIU Referral' ? 'siu' : 'neutral'}>
                  {claim.referral}
                </Badge>
                <Badge variant="pending">{claim.status}</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Claim Context Strip */}
        <div className="bg-white border border-[#E6E2DC] rounded-lg p-4 mb-6 grid grid-cols-2 sm:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-[#E6E2DC] shadow-2xs">
          <div className="p-2 sm:px-4">
            <div className="text-[11px] text-[#6B6B67] uppercase font-medium">
              Claim Type
            </div>
            <div className="text-xs font-semibold text-[#191919] mt-0.5">
              {claim.claimType}
            </div>
          </div>

          <div className="p-2 sm:px-4">
            <div className="text-[11px] text-[#6B6B67] uppercase font-medium">
              Flag Source
            </div>
            <div className="text-xs font-semibold text-[#191919] mt-0.5">
              {claim.flagSource}
            </div>
          </div>

          <div className="p-2 sm:px-4">
            <div className="text-[11px] text-[#6B6B67] uppercase font-medium">
              Date of Loss
            </div>
            <div className="text-xs font-mono font-semibold text-[#191919] mt-0.5">
              {claim.dateOfLoss}
            </div>
          </div>

          <div className="p-2 sm:px-4">
            <div className="text-[11px] text-[#6B6B67] uppercase font-medium">
              Policy Status
            </div>
            <div className="text-xs font-semibold text-[#16A34A] mt-0.5 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              {claim.policyStatus}
            </div>
          </div>

          <div className="p-2 sm:px-4">
            <div className="text-[11px] text-[#6B6B67] uppercase font-medium">
              Investigation
            </div>
            <div className="text-xs font-semibold text-[#B45309] mt-0.5">
              Not Started
            </div>
          </div>
        </div>

        {/* Document Intake Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-[#191919]">
              Evidence Package
            </h2>
            <p className="text-xs text-[#6B6B67] mt-0.5">
              Load the documents already available in the claim file.
            </p>
          </div>

          {loadedCount < totalCount && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleLoadAllSamples}
              className="text-xs text-[#B5451B]"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              Load All Sample Documents
            </Button>
          )}
        </div>

        {/* Document Cards List */}
        <div className="space-y-3">
          {documents.map((doc) => (
            <DocumentIntakeCard
              key={doc.id}
              doc={doc}
              onLoadSample={handleLoadSample}
            />
          ))}
        </div>

        {/* Completeness Bar */}
        <DocumentCompletenessBar
          loadedCount={loadedCount}
          totalCount={totalCount}
          onRunInvestigation={() => setIsProcessingOverlayOpen(true)}
        />
      </main>

      {/* Processing Pipeline Overlay */}
      <ProcessingOverlay
        claimId={claim.id}
        isOpen={isProcessingOverlayOpen}
      />
    </AppLayout>
  );
}
