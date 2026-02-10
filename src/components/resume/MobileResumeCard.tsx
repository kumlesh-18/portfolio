/**
 * MOBILE RESUME CARD
 * Optimized resume display for mobile devices
 */

'use client';

import { FileDown, ExternalLink, FileText, Calendar, HardDrive } from 'lucide-react';
import { resumeConfig } from '@/lib/resume-config';
import { Card } from '@/components/ui';

export function MobileResumeCard() {
  const fileSizeKB = Math.round(resumeConfig.file.size / 1024);

  return (
    <Card className="p-6">
      <div className="flex flex-col items-center text-center">
        {/* PDF Icon */}
        <div className="w-20 h-24 rounded-lg bg-red-500/10 flex items-center justify-center mb-4 relative">
          <FileText className="w-10 h-10 text-red-500" />
          <span className="absolute bottom-1 right-1 text-[10px] font-bold text-red-500 bg-red-500/20 px-1 rounded">
            PDF
          </span>
        </div>

        {/* File Info */}
        <h3 className="font-semibold text-lg mb-2">{resumeConfig.file.name}</h3>
        
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-[var(--muted)] mb-6">
          <span className="flex items-center gap-1">
            <HardDrive className="w-3.5 h-3.5" />
            {fileSizeKB} KB
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            Updated {resumeConfig.file.lastUpdated}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <a
            href={resumeConfig.file.path}
            download={resumeConfig.file.downloadName}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
          >
            <FileDown className="w-5 h-5" />
            Download Resume
          </a>
          <a
            href={resumeConfig.file.path}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[var(--border)] bg-[var(--card)] font-medium hover:bg-[var(--card-hover)] transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            View in Browser
          </a>
        </div>
      </div>
    </Card>
  );
}
