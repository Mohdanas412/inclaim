'use client';

import React from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

interface ClaimsToolbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function ClaimsToolbar({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
}: ClaimsToolbarProps) {
  const tabs = ['All', 'Pending', 'Investigated', 'Cleared'];

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 bg-white p-3 rounded-lg border border-[#E6E2DC]">
      {/* Filter Tabs */}
      <div className="flex items-center gap-1 bg-[#FAF9F6] p-1 rounded-md border border-[#E6E2DC]">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              activeTab === tab
                ? 'bg-white text-[#191919] shadow-2xs border border-[#E6E2DC]'
                : 'text-[#6B6B67] hover:text-[#191919]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search & Action Controls */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 md:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8C88]" />
          <input
            type="text"
            placeholder="Search claims, vehicle, holder..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAF9F6] border border-[#E6E2DC] rounded-md text-[#191919] placeholder:text-[#8C8C88] focus:outline-none focus:ring-1 focus:ring-[#B5451B] focus:border-[#B5451B]"
          />
        </div>

        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#52524E] bg-[#FAF9F6] border border-[#E6E2DC] rounded-md hover:bg-[#F2EFEA]">
          <Filter className="w-3.5 h-3.5 text-[#6B6B67]" />
          <span>Filter</span>
        </button>

        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#52524E] bg-[#FAF9F6] border border-[#E6E2DC] rounded-md hover:bg-[#F2EFEA]">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#6B6B67]" />
          <span>Sort</span>
        </button>
      </div>
    </div>
  );
}
