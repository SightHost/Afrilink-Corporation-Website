import React from 'react';
import { FileText, Download, CheckCircle, ExternalLink, Calendar, ShieldCheck, Clock } from 'lucide-react';

export default function GovernanceDocCard({ doc, onPreview, onDownload }) {
  const {
    code,
    title,
    category,
    description,
    status,
    lastUpdated,
    expiryDate,
    verificationAgency,
    level,
    certificateNo,
    storageBucket,
    details
  } = doc;

  return (
    <div className="group rounded-lg bg-afrilink-surface border border-afrilink-grey-light hover:border-afrilink-orange/40 transition-all duration-300 p-6 flex flex-col justify-between shadow-card hover:shadow-card-hover">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2.5 py-1 rounded bg-afrilink-butter text-xs font-heading font-semibold text-afrilink-fg">
            {code}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
            <CheckCircle className="w-3.5 h-3.5" />
            {status}
          </span>
        </div>

        {/* Title */}
        <h4 className="font-heading font-semibold text-lg md:text-xl text-afrilink-fg group-hover:text-afrilink-orange transition-colors mb-2">
          {title}
        </h4>

        {/* Subtext description */}
        <p className="text-sm text-afrilink-fg-60 leading-relaxed mb-4">
          {description}
        </p>

        {/* Key Verification Data Grid */}
        <div className="bg-afrilink-cream rounded-md p-3.5 space-y-2 border border-afrilink-grey-light text-xs mb-4">
          <div className="flex items-center justify-between text-afrilink-fg-80">
            <span className="text-afrilink-fg-60">Verification Authority:</span>
            <span className="font-semibold text-afrilink-fg text-right truncate ml-2">{verificationAgency}</span>
          </div>
          <div className="flex items-center justify-between text-afrilink-fg-80">
            <span className="text-afrilink-fg-60">Classification / Level:</span>
            <span className="font-semibold text-afrilink-orange text-right truncate ml-2">{level}</span>
          </div>
          <div className="flex items-center justify-between text-afrilink-fg-80">
            <span className="text-afrilink-fg-60">Certificate Ref:</span>
            <span className="font-mono text-afrilink-fg-80">{certificateNo}</span>
          </div>
          <div className="flex items-center justify-between text-afrilink-fg-80 pt-1 border-t border-afrilink-grey">
            <span className="flex items-center gap-1 text-afrilink-fg-60">
              <Calendar className="w-3 h-3 text-afrilink-orange" /> Valid Until:
            </span>
            <span className="font-semibold text-afrilink-orange">{expiryDate}</span>
          </div>
        </div>

        {/* Detailed parameters if any */}
        {details && (
          <div className="grid grid-cols-2 gap-2 text-[11px] mb-4">
            {details.map((d, i) => (
              <div key={i} className="bg-afrilink-cream px-2.5 py-1.5 rounded">
                <span className="text-afrilink-fg-60 block text-[11px] font-medium">{d.label}</span>
                <span className="text-afrilink-fg font-medium truncate block">{d.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Actions & Supabase Storage Reference */}
      <div className="pt-4 border-t border-afrilink-grey-light">
        <div className="flex items-center justify-between text-[11px] text-afrilink-fg-60 mb-3">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> Updated: {lastUpdated}
          </span>
          <span className="font-mono text-[10px] text-afrilink-fg-60/80 truncate max-w-[140px]" title={storageBucket}>
            bucket: {storageBucket.split('/')[0]}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onPreview?.(doc)}
            className="w-full py-2.5 px-3 rounded-full bg-afrilink-surface hover:bg-afrilink-cream text-afrilink-fg text-sm font-semibold border border-afrilink-grey hover:border-afrilink-orange hover:text-afrilink-orange transition-all flex items-center justify-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-afrilink-orange" />
            <span>Inspect</span>
          </button>
          <button
            onClick={() => onDownload?.(doc)}
            className="w-full py-2.5 px-3 rounded-full btn-glass btn-glass-orange text-white text-sm font-semibold flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
}
