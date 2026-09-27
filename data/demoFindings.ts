import { Finding, DeterministicCheck } from '@/types/claim';

export const DEMO_FINDINGS: Record<string, Finding[]> = {
  'CLM-2026-04471': [
    {
      id: 'fnd-01',
      title: 'Duplicate Photo Detected',
      severity: 'HIGH CONFIDENCE',
      confidenceScore: 94,
      status: 'Review Required',
      description:
        'Perceptual hash comparison indicates that the two images are near-identical. Text in the corner differs between the images, which is consistent with a reused image where claim-number text may have been edited.',
      type: 'photo_duplicate',
      actionState: 'none',
      sources: [
        {
          label: 'Primary Source',
          document: 'Claim Photo #3',
          field: 'Image Data (pHash)',
          value: 'Hash: a8f03c...12b9',
        },
        {
          label: 'Cross-referenced against',
          document: 'CLM-2026-03118 · Photo #1',
          field: 'Historical Archive',
          value: 'Hash: a8f03c...12b7',
        },
      ],
      photoComparison: {
        currentPhotoId: 'Photo #3',
        currentClaimId: 'CLM-2026-04471',
        matchedPhotoId: 'Photo #1',
        matchedClaimId: 'CLM-2026-03118',
        phashBitDifference: 2,
        currentImageLabel: 'Photo from this claim',
        matchedImageLabel: 'Matching photo in prior claim',
      },
    },
    {
      id: 'fnd-02',
      title: 'Date Sequence Contradiction',
      severity: 'MEDIUM CONFIDENCE',
      confidenceScore: 71,
      status: 'Review Required',
      description:
        'FIR was filed on 14 March 2026. Survey report lists the incident date as 18 March 2026 — 4 days after the FIR was filed.',
      type: 'date_contradiction',
      actionState: 'none',
      sources: [
        {
          label: 'Source 1',
          document: 'FIR document',
          field: 'Date of Incident',
          value: '14 Mar 2026',
        },
        {
          label: 'Source 2',
          document: 'Survey Report',
          field: 'Date of Loss',
          value: '18 Mar 2026',
        },
      ],
      timelineComparison: {
        firDate: '14 Mar 2026',
        incidentDate: '18 Mar 2026',
        diffDays: 4,
      },
    },
    {
      id: 'fnd-03',
      title: 'Repair Cost Anomaly',
      severity: 'MEDIUM CONFIDENCE',
      confidenceScore: 58,
      status: 'Review Required',
      description:
        "Repair estimate (₹2,84,000) is approximately 3.1× the survey report's assessed damage value (₹91,200) for comparable damage severity.",
      type: 'cost_anomaly',
      actionState: 'none',
      sources: [
        {
          label: 'Source 1',
          document: 'Repair Estimate',
          field: 'Total Cost',
          value: '₹2,84,000',
        },
        {
          label: 'Source 2',
          document: 'Survey Report',
          field: 'Assessed Damage Value',
          value: '₹91,200',
        },
      ],
      costComparison: {
        surveyAssessed: 91200,
        repairEstimate: 284000,
        multiplier: 3.1,
      },
    },
  ],
  'CLM-2026-04398': [],
};

export const DEMO_DETERMINISTIC_CHECKS: Record<string, DeterministicCheck[]> = {
  'CLM-2026-04471': [
    {
      id: 'chk-1',
      title: 'Chassis Number Match',
      status: 'PASSED',
      sources: 'RC ↔ Survey Report',
      details: 'Chassis MAT612044N12984 matches across RC registration and surveyor physical inspection log.',
    },
    {
      id: 'chk-2',
      title: 'RC Ownership Match',
      status: 'PASSED',
      sources: 'Policyholder ↔ RC owner',
      details: 'Policyholder Rohit Sharma matches registered vehicle owner in Vahan DB record.',
    },
    {
      id: 'chk-3',
      title: 'Policy Coverage Active',
      status: 'PASSED',
      sources: 'Policy Register ↔ Date of Loss',
      details: 'Policy OD-8841-2025 was active on reported date of loss with zero gaps in premium history.',
    },
  ],
  'CLM-2026-04398': [
    {
      id: 'chk-clean-1',
      title: 'Chassis Number Match',
      status: 'PASSED',
      sources: 'RC ↔ Survey Report',
      details: 'Chassis KA05N88412093 verified consistent across all 3 documents.',
    },
    {
      id: 'chk-clean-2',
      title: 'RC Ownership Match',
      status: 'PASSED',
      sources: 'Policyholder ↔ RC owner',
      details: 'Priya Nair verified as sole registered vehicle owner.',
    },
    {
      id: 'chk-clean-3',
      title: 'Policy Coverage Active',
      status: 'PASSED',
      sources: 'Coverage Check',
      details: 'Comprehensive Motor Policy active on date of loss.',
    },
    {
      id: 'chk-clean-4',
      title: 'Timeline Consistency',
      status: 'PASSED',
      sources: 'Incident ↔ Survey ↔ Workshop',
      details: 'Chronological timeline of incident report, survey inspection, and estimate generation is strictly logical.',
    },
    {
      id: 'chk-clean-5',
      title: 'Repair Estimate Consistency',
      status: 'PASSED',
      sources: 'Estimate ↔ Survey Assessed',
      details: 'Repair estimate (₹1,12,500) matches surveyor assessed damage value within 0.5% tolerance.',
    },
    {
      id: 'chk-clean-6',
      title: 'No Reused Photos Detected',
      status: 'PASSED',
      sources: 'Photo Hash Matcher',
      details: '3 claim photos cross-referenced against 4,213 historical claims with 0 matches detected.',
    },
  ],
};
