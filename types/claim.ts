export type ClaimStatus = 
  | 'Pending Investigation' 
  | 'Investigated' 
  | 'Needs Review' 
  | 'Cleared';

export type ClaimReferral = 'SIU Referral' | 'Score: 82/100' | 'Score: 76/100' | 'Score: 69/100' | 'Score: 88/100' | 'Score: 64/100';

export type ActionState = 'none' | 'confirmed' | 'false_positive' | 'more_evidence';

export interface Claim {
  id: string; // e.g. CLM-2026-04471
  policyholder: string;
  vehicleNumber: string;
  amount: string; // formatted e.g. ₹2,84,000
  amountRaw: number;
  referral: ClaimReferral;
  status: ClaimStatus;
  dateFlagged: string;
  claimType: string; // e.g. Motor Own Damage
  flagSource: string; // e.g. SIU Referral
  dateOfLoss: string;
  policyStatus: 'Active' | 'Under Review' | 'Expired';
  isFeatured?: boolean;
  isClean?: boolean;
}

export interface ClaimDocument {
  id: string;
  type: 'Survey Report' | 'FIR Copy' | 'RC Document' | 'Repair Estimate' | 'Claim Photos';
  filename: string;
  size: string;
  uploaded: boolean;
  metadata?: string;
  fileUrl?: string;
  thumbnails?: string[];
}

export interface EvidenceReference {
  label: string;
  document: string;
  field: string;
  value: string;
}

export interface Finding {
  id: string;
  title: string;
  severity: 'HIGH CONFIDENCE' | 'MEDIUM CONFIDENCE' | 'LOW CONFIDENCE';
  confidenceScore: number; // e.g. 94, 71, 58
  status: 'Review Required' | 'Cleared' | 'Pending';
  description: string;
  sources: EvidenceReference[];
  actionState: ActionState;
  type: 'photo_duplicate' | 'date_contradiction' | 'cost_anomaly';
  
  // Specific data for visualization components
  photoComparison?: {
    currentPhotoId: string;
    currentClaimId: string;
    matchedPhotoId: string;
    matchedClaimId: string;
    phashBitDifference: number; // e.g. 2 / 64
    currentImageLabel: string;
    matchedImageLabel: string;
  };
  
  timelineComparison?: {
    firDate: string;
    incidentDate: string;
    diffDays: number;
  };

  costComparison?: {
    surveyAssessed: number;
    repairEstimate: number;
    multiplier: number;
  };
}

export interface DeterministicCheck {
  id: string;
  title: string;
  status: 'PASSED' | 'FAILED' | 'NEEDS_VERIFICATION';
  sources: string;
  details: string;
}
