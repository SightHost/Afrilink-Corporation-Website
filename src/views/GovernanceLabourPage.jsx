import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Eye, Download, FileText, ArrowRight, HeartHandshake, AlertCircle } from 'lucide-react';
import SubNavPill from '../components/SubNavPill';
import CTAButton from '../components/CTAButton';
import DocPreviewModal from '../components/DocPreviewModal';
import { governanceDocs } from '../data/governanceData';

const GOVERNANCE_PAGES = [
  { label: 'Governance Hub & Overview', route: 'governance' },
  { label: 'B-BBEE Transformation', route: 'governance/bbee', badge: 'Level 1' },
  { label: 'Statutory Compliance & SARS', route: 'governance/compliance', badge: 'Active' },
  { label: 'Letter of Good Standing (COIDA)', route: 'governance/good-standing', badge: 'Valid' },
];

export default function GovernanceLabourPage({ onNavigate }) {
  const [showModal, setShowModal] = useState(false);
  const coidaDoc = governanceDocs.find(d => d.id === 'good-standing');

  const safetyMetrics = [
    { label: 'Compensation Fund Status', value: 'Good Standing', desc: 'Fees paid in full' },
    { label: 'Current Certificate Validity', value: '30 April 2027', desc: 'Perpetual renewal' },
    { label: 'Lost Time Injury Frequency', value: '0.00 LTIFR', desc: 'Zero fatalities record' },
    { label: 'Occupational Health Policy', value: 'OHS Act Compliant', desc: 'Audited safety systems' },
  ];

  return (
    <div className="min-h-screen bg-afrilink-surface">
      {/* Hero */}
      <div className="relative pt-36 pb-20 lg:pt-44 lg:pb-24 bg-afrilink-navy overflow-hidden">
        <div className="absolute inset-0 bg-ndebele-pattern opacity-40" />
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-afrilink-gold/15 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="eyebrow mb-4">Labour & Workplace Standards</div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[68px] leading-[1.1] font-semibold text-white mb-4">
            Letter of <span className="text-afrilink-gold">Good Standing</span>
          </h1>
          <p className="text-white/80 text-lg sm:text-xl font-light max-w-3xl leading-relaxed mb-8">
            Compensation for Occupational Injuries and Diseases Act (COIDA No. 130 of 1993) certification from the South African Department of Employment and Labour.
          </p>

          <div className="flex flex-wrap gap-4">
            <CTAButton variant="orange" size="md" onClick={() => setShowModal(true)} icon={false}>
              Preview COIDA Certificate <Eye className="w-4 h-4 ml-1" />
            </CTAButton>
            <CTAButton variant="outline-light" size="md" onClick={() => onNavigate('governance/bbee')}>
              View B-BBEE Rating
            </CTAButton>
          </div>
        </div>
      </div>

      {/* Sibling SubNav Bar */}
      <SubNavPill
        items={GOVERNANCE_PAGES}
        activeRoute="governance/good-standing"
        onNavigate={onNavigate}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Verification Summary Card */}
        <div className="bg-afrilink-surface rounded-2xl p-8 sm:p-12 border-2 border-afrilink-gold/40 shadow-card mb-16 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-8 pb-8 border-b border-afrilink-grey-light">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-afrilink-navy text-afrilink-gold flex items-center justify-center shadow-md shrink-0">
                <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-afrilink-orange">
                  Department of Employment & Labour
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-afrilink-fg mt-1">
                  Unconditional Good Standing
                </h2>
                <p className="text-afrilink-fg-60 text-sm mt-1">
                  Compensation Fund Ref: <strong className="text-afrilink-fg">CF-993847201</strong> · Certificate Ref: <strong className="text-afrilink-fg">COIDA-9938472-REF-2026</strong>
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2.5 rounded-lg bg-afrilink-orange text-white text-sm font-semibold hover:bg-afrilink-orange-hover transition-colors shadow-sm flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              <span>Preview Official Letter</span>
            </button>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {safetyMetrics.map((m, i) => (
              <div key={i} className="bg-afrilink-cream p-5 rounded-xl border border-afrilink-grey-light">
                <span className="text-xs text-afrilink-fg-60 font-medium">{m.label}</span>
                <div className="font-heading text-xl sm:text-2xl font-bold text-afrilink-fg mt-1">{m.value}</div>
                <div className="text-[11px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {m.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workplace Safety & Human Capital Protocols */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-afrilink-surface rounded-xl p-8 border border-afrilink-grey-light shadow-card">
            <div className="w-10 h-10 rounded-lg bg-afrilink-orange/10 flex items-center justify-center text-afrilink-orange mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-afrilink-fg mb-3">
              Occupational Health & Safety (OHS)
            </h3>
            <p className="text-afrilink-fg-80 text-sm leading-relaxed mb-4">
              All personnel deployed across mining exploration concessions, civil engineering sites, and operational facilities are bound by mandatory OHS safety induction, continuous hazard identification, and verified medical surveillance.
            </p>
            <ul className="space-y-2 text-xs text-afrilink-fg-60 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-afrilink-orange shrink-0" />
                <span>Zero lost-time injuries benchmark maintained across holdings</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-afrilink-orange shrink-0" />
                <span>Full personal protective equipment (PPE) compliance</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-afrilink-orange shrink-0" />
                <span>Site safety officers appointed in terms of OHS Act Section 16(2)</span>
              </li>
            </ul>
          </div>

          <div className="bg-afrilink-surface rounded-xl p-8 border border-afrilink-grey-light shadow-card">
            <div className="w-10 h-10 rounded-lg bg-afrilink-fg/10 flex items-center justify-center text-afrilink-fg mb-4">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-afrilink-fg mb-3">
              Fair Labour & Employee Welfare
            </h3>
            <p className="text-afrilink-fg-80 text-sm leading-relaxed mb-4">
              Afrilink Corporation enforces equitable remuneration, fair collective engagement, and zero tolerance for workplace discrimination. In addition, our 26% Broad-Based Community & Employee Trust provides structural equity participation for staff.
            </p>
            <ul className="space-y-2 text-xs text-afrilink-fg-60 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-afrilink-orange shrink-0" />
                <span>UIF & Compensation Commissioner levies paid on time</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-afrilink-orange shrink-0" />
                <span>Continuous professional development via Mahlori Academy</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-afrilink-orange shrink-0" />
                <span>Employee participation in long-term enterprise growth</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Modal */}
        {showModal && coidaDoc && (
          <DocPreviewModal
            doc={coidaDoc}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
}
