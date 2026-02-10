/**
 * PDF VIEWER COMPONENT
 * Professional embedded PDF viewer with controls
 */

'use client';

import { useState, useCallback } from 'react';
import { 
  FileDown, 
  Maximize2, 
  Minimize2, 
  ExternalLink,
  Loader2,
  AlertCircle,
  Printer
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { resumeConfig } from '@/lib/resume-config';

interface PDFViewerProps {
  className?: string;
}

export function PDFViewer({ className }: PDFViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  const handlePrint = useCallback(() => {
    const printWindow = window.open(resumeConfig.file.path, '_blank');
    if (printWindow) {
      printWindow.addEventListener('load', () => {
        printWindow.print();
      });
    }
  }, []);

  const handleOpenNewTab = useCallback(() => {
    window.open(resumeConfig.file.path, '_blank');
  }, []);

  return (
    <div
      className={cn(
        'flex flex-col rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--card)]',
        isFullscreen && 'fixed inset-4 z-50 rounded-xl shadow-2xl',
        className
      )}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--background)]">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Resume Preview</span>
          <span className="text-xs text-[var(--muted)] hidden sm:inline">
            (Last updated: {resumeConfig.file.lastUpdated})
          </span>
        </div>

        <div className="flex items-center gap-1">
          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="hidden sm:flex p-2 rounded-lg hover:bg-[var(--card-hover)] transition-colors"
            aria-label="Print resume"
            title="Print"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* Open in New Tab */}
          <button
            onClick={handleOpenNewTab}
            className="p-2 rounded-lg hover:bg-[var(--card-hover)] transition-colors"
            aria-label="Open in new tab"
            title="Open in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg hover:bg-[var(--card-hover)] transition-colors"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>

          {/* Download Button */}
          <a
            href={resumeConfig.file.path}
            download={resumeConfig.file.downloadName}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors"
            title="Download Resume"
          >
            <FileDown className="w-4 h-4" />
            <span className="hidden sm:inline">Download</span>
          </a>
        </div>
      </div>

      {/* PDF Container */}
      <div
        className={cn(
          'relative',
          isFullscreen ? 'flex-1' : 'h-[800px]'
        )}
        style={{ backgroundColor: resumeConfig.display.backgroundColor }}
      >
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--background)]/80 z-10">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
              <span className="text-sm text-[var(--muted)]">Loading resume...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--background)] z-10">
            <div className="flex flex-col items-center gap-4 p-6 text-center max-w-md">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Unable to load resume preview</h3>
                <p className="text-sm text-[var(--muted)] mb-4">
                  Your browser may not support embedded PDF viewing. 
                  You can still download the resume directly.
                </p>
              </div>
              <a
                href={resumeConfig.file.path}
                download={resumeConfig.file.downloadName}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
              >
                <FileDown className="w-5 h-5" />
                Download Resume (PDF)
              </a>
            </div>
          </div>
        )}

        {/* PDF Embed */}
        <iframe
          src={`${resumeConfig.file.path}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
          className="w-full h-full border-0"
          title="Resume PDF"
          onLoad={handleLoad}
          onError={handleError}
          style={{ minHeight: '100%' }}
        />
      </div>

      {/* Fullscreen Overlay Background */}
      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black/60 -z-10"
          onClick={toggleFullscreen}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
