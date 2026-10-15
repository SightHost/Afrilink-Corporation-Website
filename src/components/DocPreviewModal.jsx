import React from 'react';
import { X, Download, Printer, ShieldCheck, CheckCircle2, Lock, ExternalLink } from 'lucide-react';

export default function DocPreviewModal({ doc, onClose, onDownload }) {
  if (!doc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-afrilink-navy/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-afrilink-surface text-afrilink-fg rounded-lg shadow-card-hover overflow-hidden flex flex-col max-h-[90vh] animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="bg-afrilink-navy text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-afrilink-orange/20 rounded-md text-afrilink-orange border border-afrilink-orange/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[13px] text-afrilink-gold font-semibold">
                Official Compliance Verification
              </div>
              <h3 className="font-heading font-semibold text-lg text-white">
                {doc.code} — {doc.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 rounded-md bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
              title="Print Certificate"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-md bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Body (Styled like an official corporate verification document) */}
        <div className="p-8 md:p-10 overflow-y-auto bg-gradient-to-b from-afrilink-cream to-afrilink-surface relative">
          {/* Subtle Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
            <div className="text-8xl font-semibold font-heading tracking-widest text-afrilink-fg rotate-[-25deg]">
              AFRILINK
            </div>
          </div>

          {/* Official Document Border */}
          <div className="border-2 border-afrilink-grey rounded-lg p-6 md:p-8 relative bg-afrilink-surface shadow-sm">
            {/* Top Certificate Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-afrilink-orange/40 gap-4">
              <div>
                <div className="text-[11px] font-semibold tracking-wider text-afrilink-fg-60 uppercase">
                  Republic of South Africa · Verification System
                </div>
                <h1 className="font-heading font-semibold text-2xl text-afrilink-fg mt-1">
                  AFRILINK CORPORATION (Pty) Ltd
                </h1>
                <div className="text-xs text-afrilink-fg-60 font-medium">
                  Registration No: 2001/014920/07 · Sandton, Johannesburg
                </div>
              </div>

              {/* Status Badge */}
              <div className="text-right">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {doc.status}
                </div>
                <div className="text-[11px] text-afrilink-fg-60 mt-1 font-mono">
                  REF: {doc.certificateNo}
                </div>
              </div>
            </div>

            {/* Certificate Core Statement */}
            <div className="py-6 space-y-4">
              <div className="text-[13px] font-semibold text-afrilink-orange">
                Certificate Description & Scope
              </div>
              <p className="text-base font-semibold text-afrilink-fg leading-snug">
                {doc.title}
              </p>
              <p className="text-sm text-afrilink-fg-80 leading-[1.7]">
                This document certifies that Afrilink Corporation (Pty) Ltd has been duly audited, verified, and confirmed to be in unconditional full compliance under the auspices of <strong className="text-afrilink-fg">{doc.verificationAgency}</strong>.
              </p>

              {/* Key Verified Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                <div className="p-3.5 bg-afrilink-cream rounded-md border border-afrilink-grey-light">
                  <div className="text-xs text-afrilink-fg-60 font-semibold">Classification / Level</div>
                  <div className="text-base font-heading font-semibold text-afrilink-fg mt-0.5">{doc.level}</div>
                </div>
                <div className="p-3.5 bg-afrilink-cream rounded-md border border-afrilink-grey-light">
                  <div className="text-xs text-afrilink-fg-60 font-semibold">Validity Period</div>
                  <div className="text-base font-heading font-semibold text-afrilink-fg mt-0.5">{doc.expiryDate}</div>
                </div>
              </div>

              {/* Additional parameters */}
              {doc.details && (
                <div className="pt-2">
                  <div className="text-[13px] font-semibold text-afrilink-fg-60 mb-2">
                    Verified Parameters
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {doc.details.map((d, i) => (
                      <div key={i} className="flex justify-between p-2 rounded bg-afrilink-cream/60 border border-afrilink-grey-light">
                        <span className="text-afrilink-fg-60">{d.label}:</span>
                        <span className="font-semibold text-afrilink-fg">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Signatures & Security Stamp */}
            <div className="pt-6 border-t border-afrilink-grey-light flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-afrilink-fg-60 mb-1">
                  <Lock className="w-3.5 h-3.5 text-afrilink-orange" />
                  <span>Digital Cryptographic Signature: Verified</span>
                </div>
                <div className="font-mono text-[10px] text-afrilink-fg-60">
                  SHA-256: e8731a0293b4f62c8a24af1c1c1e5a5f662026af
                </div>
                <div className="text-[10px] text-afrilink-fg-60 mt-1">
                  Supabase Bucket: <span className="font-mono">{doc.storageBucket}</span>
                </div>
              </div>

              {/* Stamp Emblem */}
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-afrilink-orange/70 flex flex-col items-center justify-center text-center p-2 rotate-[-5deg]">
                <div className="text-[8px] font-bold uppercase tracking-widest text-afrilink-orange">OFFICIAL SEAL</div>
                <div className="text-[9px] font-bold text-afrilink-fg">VERIFIED</div>
                <div className="text-[8px] text-afrilink-fg-60">2026/27</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-afrilink-cream px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-afrilink-grey-light">
          <div className="text-xs text-afrilink-fg-60 flex items-center gap-1.5">
            <span>Last audit: {doc.lastUpdated}</span>
            <span>·</span>
            <span className="text-emerald-400 font-medium">Valid across all national tenders & DFI due diligence</span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-full border border-afrilink-fg text-sm font-semibold text-afrilink-fg hover:bg-afrilink-navy hover:text-white transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => onDownload?.(doc)}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-afrilink-orange-btn hover:bg-afrilink-orange-hover text-white text-sm font-semibold rounded-full shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
