'use client';

import React, { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { MetricCards } from '@/components/claims/MetricCards';
import { ClaimsToolbar } from '@/components/claims/ClaimsToolbar';
import { ClaimsTable } from '@/components/claims/ClaimsTable';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import { Claim } from '@/types/claim';
import { fetchClaims } from '@/lib/mockApi';

export default function DashboardPage() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchClaims();
      setClaims(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredClaims = claims.filter((claim) => {
    // Tab Filter
    if (activeTab === 'Pending' && claim.status !== 'Pending Investigation')
      return false;
    if (activeTab === 'Investigated' && claim.status === 'Pending Investigation')
      return false;
    if (activeTab === 'Cleared' && claim.status !== 'Cleared') return false;

    // Search Query Filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        claim.id.toLowerCase().includes(q) ||
        claim.policyholder.toLowerCase().includes(q) ||
        claim.vehicleNumber.toLowerCase().includes(q)
      );
    }

    return true;
  });

  return (
    <AppLayout>
      <Header title="Dashboard — Flagged Claims" />

      <main className="p-6 max-w-[1440px] mx-auto w-full font-sans">
        {/* Page Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl font-bold text-[#191919] tracking-tight">
              Flagged Claims
            </h1>
            <p className="text-xs text-[#6B6B67] mt-0.5">
              Claims referred for evidence-sufficiency investigation & cross-document validation
            </p>
          </div>

          <div>
            <Button variant="terracotta" size="sm" className="font-semibold shadow-xs">
              <Plus className="w-4 h-4" />
              <span>New Investigation</span>
            </Button>
          </div>
        </div>

        {/* Summary Metric Cards */}
        <MetricCards />

        {/* Queue Toolbar */}
        <ClaimsToolbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Claims Table */}
        {loading ? (
          <div className="bg-white border border-[#E6E2DC] rounded-lg p-12 text-center text-xs text-[#6B6B67]">
            <div className="animate-spin w-5 h-5 border-2 border-[#B5451B] border-t-transparent rounded-full mx-auto mb-2" />
            Loading referred claim queue...
          </div>
        ) : (
          <ClaimsTable claims={filteredClaims} />
        )}
      </main>
    </AppLayout>
  );
}
