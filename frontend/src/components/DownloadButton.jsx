import React, { useState } from 'react';
import { Download, Copy, Check } from 'lucide-react';

export default function DownloadButton({ reportContent, filename = 'research_report.md' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (reportContent) {
      navigator.clipboard.writeText(reportContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!reportContent) return;
    const blob = new Blob([reportContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-[#e8e4dc] transition-all"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-[#50c878]" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 text-[#ff8c32]" />
            Copy Report
          </>
        )}
      </button>

      <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff8c32] to-[#ff5a1a] text-[#0a0a0f] font-syne font-bold text-xs hover:shadow-lg hover:shadow-[#ff8c32]/20 transition-all"
      >
        <Download className="w-4 h-4" />
        Download .md
      </button>
    </div>
  );
}
