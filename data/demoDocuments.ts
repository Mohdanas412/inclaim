import { ClaimDocument } from '@/types/claim';

export const DEMO_DOCUMENTS: Record<string, ClaimDocument[]> = {
  'CLM-2026-04471': [
    {
      id: 'doc-1',
      type: 'Survey Report',
      filename: 'survey_report_CLM-04471.pdf',
      size: '2.4 MB',
      uploaded: false,
      metadata: 'Assessed Damage: ₹91,200 · Surveyor: R. K. Varma',
    },
    {
      id: 'doc-2',
      type: 'FIR Copy',
      filename: 'fir_copy_CLM-04471.pdf',
      size: '1.1 MB',
      uploaded: false,
      metadata: 'Station: Vijay Nagar PS · Filed: 14 Mar 2026',
    },
    {
      id: 'doc-3',
      type: 'RC Document',
      filename: 'rc_document_CLM-04471.pdf',
      size: '840 KB',
      uploaded: false,
      metadata: 'Owner: Rohit Sharma · Chassis: MAT612044N12984',
    },
    {
      id: 'doc-4',
      type: 'Repair Estimate',
      filename: 'repair_estimate_CLM-04471.pdf',
      size: '1.8 MB',
      uploaded: false,
      metadata: 'Estimate: ₹2,84,000 · Workshop: AutoCare Indore',
    },
    {
      id: 'doc-5',
      type: 'Claim Photos',
      filename: 'claim_photos_CLM-04471.zip',
      size: '14.2 MB',
      uploaded: false,
      metadata: '5 images uploaded · Front bumper, Side panel, Odometer',
      thumbnails: [
        'photo_01_front.jpg',
        'photo_02_side.jpg',
        'photo_03_damage.jpg',
        'photo_04_engine.jpg',
        'photo_05_vin.jpg',
      ],
    },
  ],
  'CLM-2026-04398': [
    {
      id: 'doc-clean-1',
      type: 'Survey Report',
      filename: 'survey_report_CLM-04398.pdf',
      size: '1.9 MB',
      uploaded: true,
      metadata: 'Assessed Damage: ₹1,12,500 · Surveyor: M. Iyer',
    },
    {
      id: 'doc-clean-2',
      type: 'RC Document',
      filename: 'rc_document_CLM-04398.pdf',
      size: '720 KB',
      uploaded: true,
      metadata: 'Owner: Priya Nair · Chassis: KA05N88412093',
    },
    {
      id: 'doc-clean-3',
      type: 'Repair Estimate',
      filename: 'repair_estimate_CLM-04398.pdf',
      size: '1.5 MB',
      uploaded: true,
      metadata: 'Estimate: ₹1,12,500 · Workshop: Express Motors Bangalore',
    },
  ],
};
