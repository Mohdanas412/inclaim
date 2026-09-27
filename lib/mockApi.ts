import { DEMO_CLAIMS } from '@/data/demoClaims';
import { DEMO_DOCUMENTS } from '@/data/demoDocuments';
import { DEMO_FINDINGS, DEMO_DETERMINISTIC_CHECKS } from '@/data/demoFindings';
import { Claim, ClaimDocument, Finding, DeterministicCheck } from '@/types/claim';

export async function fetchClaims(): Promise<Claim[]> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return DEMO_CLAIMS;
}

export async function fetchClaimById(id: string): Promise<{
  claim: Claim;
  documents: ClaimDocument[];
} | null> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const claim = DEMO_CLAIMS.find((c) => c.id === id);
  if (!claim) return null;

  const documents = DEMO_DOCUMENTS[id] || DEMO_DOCUMENTS['CLM-2026-04471'];
  return { claim, documents };
}

export async function fetchInvestigationReport(id: string): Promise<{
  claim: Claim;
  documents: ClaimDocument[];
  findings: Finding[];
  checks: DeterministicCheck[];
} | null> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const claim = DEMO_CLAIMS.find((c) => c.id === id);
  if (!claim) return null;

  const documents = DEMO_DOCUMENTS[id] || DEMO_DOCUMENTS['CLM-2026-04471'];
  const findings = DEMO_FINDINGS[id] || [];
  const checks = DEMO_DETERMINISTIC_CHECKS[id] || [];

  return { claim, documents, findings, checks };
}
