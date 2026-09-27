import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const isClean = id === 'CLM-2026-04398';

  return NextResponse.json({
    status: 'completed',
    claimId: id,
    documentsReviewed: isClean ? 3 : 5,
    evidenceChecks: isClean ? 9 : 12,
    findings: isClean ? 0 : 3,
    contradictions: isClean ? 0 : 3,
    highConfidenceContradictions: isClean ? 0 : 1,
    processingTime: '4.2 min',
  });
}
