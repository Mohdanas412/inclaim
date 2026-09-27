'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Claim } from '@/types/claim';
import { Badge } from '@/components/ui/Badge';
import { ChevronRight, ShieldAlert } from 'lucide-react';

interface ClaimsTableProps {
  claims: Claim[];
}

export function ClaimsTable({ claims }: ClaimsTableProps) {
  const router = useRouter();

  const getStatusBadge = (status: Claim['status']) => {
    switch (status) {
      case 'Pending Investigation':
        return <Badge variant="pending">Pending Investigation</Badge>;
      case 'Needs Review':
        return <Badge variant="review">Needs Review</Badge>;
      case 'Cleared':
        return <Badge variant="cleared">Cleared</Badge>;
      case 'Investigated':
        return <Badge variant="investigated">Investigated</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const getReferralBadge = (referral: Claim['referral']) => {
    if (referral === 'SIU Referral') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-[#FFF7ED] text-[#C2410C] border border-[#FFEDD5]">
          <ShieldAlert className="w-3 h-3 text-[#B5451B]" />
          SIU REFERRAL
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono text-[#52524E] bg-[#FAF9F6] border border-[#E6E2DC]">
        {referral}
      </span>
    );
  };

  return (
    <div className="bg-white border border-[#E6E2DC] rounded-lg overflow-hidden shadow-2xs font-sans">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FBFAF8] border-b border-[#E6E2DC] text-[11px] font-semibold text-[#6B6B67] uppercase tracking-wider select-none">
              <th className="py-3 px-4 w-4"></th>
              <th className="py-3 px-4">Claim ID</th>
              <th className="py-3 px-4">Policyholder</th>
              <th className="py-3 px-4">Vehicle</th>
              <th className="py-3 px-4 text-right">Claim Amount</th>
              <th className="py-3 px-4">Referral</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Date Flagged</th>
              <th className="py-3 px-3 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E6E2DC]/60 text-xs text-[#191919]">
            {claims.map((claim) => (
              <tr
                key={claim.id}
                onClick={() => router.push(`/claim/${claim.id}`)}
                className={`group cursor-pointer transition-colors hover:bg-[#FAF9F6] ${
                  claim.isFeatured
                    ? 'bg-[#FFFDFB] font-medium'
                    : ''
                }`}
              >
                {/* Left accent bar for featured claim */}
                <td className="py-3 px-1 relative w-2">
                  {claim.isFeatured && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#B5451B] rounded-r" />
                  )}
                </td>

                {/* Claim ID */}
                <td className="py-3.5 px-4 font-mono font-bold text-[#191919] group-hover:text-[#B5451B] transition-colors">
                  <div className="flex items-center gap-1.5">
                    <span>{claim.id}</span>
                    {claim.isFeatured && (
                      <span className="text-[10px] bg-[#B5451B]/10 text-[#B5451B] px-1.5 py-0.2 rounded font-sans font-semibold">
                        FEATURED
                      </span>
                    )}
                  </div>
                </td>

                {/* Policyholder */}
                <td className="py-3.5 px-4 font-medium text-[#191919]">
                  {claim.policyholder}
                </td>

                {/* Vehicle Number */}
                <td className="py-3.5 px-4">
                  <span className="font-mono bg-[#FAF9F6] border border-[#E6E2DC] px-2 py-0.5 rounded text-[11px] text-[#333330]">
                    {claim.vehicleNumber}
                  </span>
                </td>

                {/* Claim Amount */}
                <td className="py-3.5 px-4 text-right font-mono font-semibold text-[#191919]">
                  {claim.amount}
                </td>

                {/* Referral */}
                <td className="py-3.5 px-4">{getReferralBadge(claim.referral)}</td>

                {/* Status */}
                <td className="py-3.5 px-4">{getStatusBadge(claim.status)}</td>

                {/* Date Flagged */}
                <td className="py-3.5 px-4 text-[#6B6B67] text-[11px]">
                  {claim.dateFlagged}
                </td>

                {/* Chevron */}
                <td className="py-3.5 px-3 text-right">
                  <ChevronRight className="w-4 h-4 text-[#8C8C88] group-hover:text-[#B5451B] group-hover:translate-x-0.5 transition-all inline" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
