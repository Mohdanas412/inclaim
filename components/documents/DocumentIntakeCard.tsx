'use client';

import React from 'react';
import { ClaimDocument } from '@/types/claim';
import { FileText, CheckCircle2, UploadCloud, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface DocumentIntakeCardProps {
  doc: ClaimDocument;
  onLoadSample: (id: string) => void;
}

export function DocumentIntakeCard({ doc, onLoadSample }: DocumentIntakeCardProps) {
  const isPhotos = doc.type === 'Claim Photos';

  return (
    <div
      className={`bg-white border rounded-lg p-4 transition-all duration-200 ${
        doc.uploaded
          ? 'border-[#BBF7D0] bg-[#F0FDF4]/30'
          : 'border-[#E6E2DC] hover:border-[#D6D2CC]'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div
            className={`w-9 h-9 rounded-md flex items-center justify-center shrink-0 border ${
              doc.uploaded
                ? 'bg-[#F0FDF4] border-[#BBF7D0] text-[#16A34A]'
                : 'bg-[#FAF9F6] border-[#E6E2DC] text-[#6B6B67]'
            }`}
          >
            {isPhotos ? (
              <ImageIcon className="w-4 h-4" />
            ) : (
              <FileText className="w-4 h-4" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-semibold text-[#191919]">
                {doc.type}
              </h3>
              {doc.uploaded && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#16A34A]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Uploaded
                </span>
              )}
            </div>

            {doc.uploaded ? (
              <div className="mt-1">
                <div className="text-xs font-mono font-medium text-[#191919]">
                  {doc.filename}
                </div>
                <div className="text-[11px] text-[#6B6B67] mt-0.5">
                  {doc.size} · {doc.metadata}
                </div>
              </div>
            ) : (
              <div className="text-[11px] text-[#8C8C88] mt-1">
                Sample document required
              </div>
            )}
          </div>
        </div>

        <div>
          {!doc.uploaded && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onLoadSample(doc.id)}
              className="text-xs shrink-0"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              Load Sample Document
            </Button>
          )}
        </div>
      </div>

      {/* Photo thumbnail strip if photos are uploaded */}
      {isPhotos && doc.uploaded && doc.thumbnails && (
        <div className="mt-3 pt-3 border-t border-[#BBF7D0]/60 flex items-center gap-2 overflow-x-auto">
          {doc.thumbnails.map((t, idx) => (
            <div
              key={idx}
              className="w-16 h-12 rounded bg-[#E6E2DC]/40 border border-[#E6E2DC] shrink-0 flex flex-col items-center justify-center p-1 relative overflow-hidden group"
            >
              <div className="w-full h-full bg-[#333330] rounded-xs flex items-center justify-center text-[9px] font-mono text-white font-semibold">
                IMG #{idx + 1}
              </div>
              <div className="absolute inset-0 bg-[#B5451B]/80 text-white text-[9px] font-semibold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                View
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
