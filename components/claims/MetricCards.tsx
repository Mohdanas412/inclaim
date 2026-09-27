'use client';

import React from 'react';
import { AlertCircle, Clock, AlertTriangle, FileCheck } from 'lucide-react';

export function MetricCards() {
  const metrics = [
    {
      title: 'Claims Flagged Today',
      value: '12',
      subtitle: '+2 from yesterday',
      icon: AlertCircle,
      iconColor: 'text-[#B5451B]',
    },
    {
      title: 'Avg. Investigation Time',
      value: '4.2 min',
      subtitle: 'vs 45 min manual',
      icon: Clock,
      iconColor: 'text-[#6B6B67]',
    },
    {
      title: 'Contradictions Found',
      value: '31',
      subtitle: 'Cross-document matches',
      icon: AlertTriangle,
      iconColor: 'text-[#D97706]',
    },
    {
      title: 'Reused Photos Detected',
      value: '6',
      subtitle: 'pHash photo comparison',
      icon: FileCheck,
      iconColor: 'text-[#DC2626]',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <div
            key={idx}
            className="bg-white border border-[#E6E2DC] rounded-lg p-3.5 shadow-2xs hover:border-[#D6D2CC] transition-all"
          >
            <div className="flex items-center justify-between text-xs text-[#6B6B67] mb-1 font-medium">
              <span>{m.title}</span>
              <Icon className={`w-4 h-4 ${m.iconColor}`} />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-[#191919] tracking-tight font-mono">
                {m.value}
              </span>
              <span className="text-[11px] text-[#8C8C88]">{m.subtitle}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
