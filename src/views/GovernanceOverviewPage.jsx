import React, { useState } from 'react';
import { ShieldCheck, FileCheck, CheckCircle2, Eye, Download, ExternalLink, AlertCircle, ArrowRight, Award, Lock, BookOpen } from 'lucide-react';
import SubNavPill from '../components/SubNavPill';
import GovernanceDocCard from '../components/GovernanceDocCard';
import DocPreviewModal from '../components/DocPreviewModal';
import CTAButton from '../components/CTAButton';
import { governanceDocs } from '../data/governanceData';

const GOVERNANCE_PAGES = [
  { label: 'Governance Hub & Overview', route: 'governance' },
  { label: 'B-BBEE Transformation', route: 'governance/bbee', badge: 'Level 1' },
  { label: 'Statutory Compliance & SARS', route: 'governance/compliance', badge: 'Active' },
  { label: 'Letter of Good Standing (COIDA)', route: 'governance/good-standing', badge: 'Valid' },
];

export default function GovernanceOverviewPage({ onNavigate }) {
  const [previewDoc, setPreviewDoc] = useState(null);

  const complianceMetrics = [
    { label: 'B-BBEE Status', value: 'Level 1', icon: ShieldCheck, color: '#F37121' },
    { label: 'Black Ownership', value: '100%', icon: CheckCircle2, color: '#F18728' },
    { label: 'CIPC Status', value: 'Active', icon: FileCheck, color: '#C5C8D4' },
    { label: 'SARS Compliance', value: 'Compliant', icon: CheckCircle2, color: '#9196AA' },
    { label: 'King IV Adherence', value: 'Full', icon: ShieldCheck, color: '#F37121' },
    { label: 'COIDA Standing', value: 'Good Standing', icon: CheckCircle2, color: '#F18728' },
  ];

  return (
    <div className="min-h-screen bg-afrilink-surface">
      {/* Hero */}
      <div className="relative pt-36 pb-20 lg:pt-44 lg:pb-24 bg-afrilink-navy overflow-hidden">
        <div className="absolute inset-0 bg-ndebele-pattern opacity-40" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-afrilink-gold/15 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="eyebrow mb-4">Statutory Rigor & Ethics</div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[68px] leading-[1.1] font-semibold text-white mb-4">
            Governance & <span className="text-afrilink-gold">Compliance</span>
          </h1>
          <p className="text-white/80 text-lg sm:text-xl font-light max-w-3xl leading-relaxed mb-8">
            Afrilink Corporation operates under rigorous institutional standards aligned with the King IV Code on Corporate Governance. Every credential, tax clearance, and B-BBEE rating is independently audited and current.
          </p>

          <div className="flex flex-wrap gap-4">
            <CTAButton variant="orange" size="md" onClick={() => onNavigate('governance/bbee')}>
              Level 1 B-BBEE Certificate <ArrowRight className="w-4 h-4 ml-1" />
            </CTAButton>
            <CTAButton variant="outline-light" size="md" onClick={() => onNavigate('partner')}>
              Institutional Due Diligence Request
            </CTAButton>
          </div>
        </div>
      </div>

      {/* Sibling SubNav Bar */}
      <SubNavPill
        items={GOVERNANCE_PAGES}
        activeRoute="governance"
        onNavigate={onNavigate}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Compliance Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {complianceMetrics.map((m, i) => (
            <div key={i} className="bg-afrilink-surface rounded-xl p-5 border border-afrilink-grey-light shadow-card text-center hover:shadow-card-hover transition-all">
              <m.icon className="w-6 h-6 mx-auto mb-2" style={{ color: m.color }} />
              <div className="font-heading font-semibold text-2xl text-afrilink-fg mb-1">{m.value}</div>
              <div className="text-xs font-medium text-afrilink-fg-60">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Feature Cards linking to the 3 Dedicated Governance Pages */}
        <div className="mb-20">
          <div className="max-w-2xl mb-10">
            <span className="text-xs uppercase tracking-widest font-bold text-afrilink-orange">Statutory Pillars</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-afrilink-fg mt-1">
              Dedicated Governance Pillars
            </h2>
            <p className="text-afrilink-fg-60 text-base mt-2">
              Explore each compliance domain on its own dedicated page with verified credential disclosures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1: B-BBEE */}
            <div className="bg-afrilink-surface rounded-2xl p-8 border border-afrilink-grey-light shadow-card hover:shadow-card-hover hover:border-afrilink-orange/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-afrilink-orange/10 border border-afrilink-orange/20 flex items-center justify-center text-afrilink-orange mb-6">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-afrilink-orange">Pillar 01</span>
                <h3 className="font-heading text-2xl font-semibold text-afrilink-fg mt-1 mb-3">
                  B-BBEE Transformation
                </h3>
                <p className="text-afrilink-fg-60 text-sm leading-relaxed mb-6">
                  Level 1 contributor rating (135% procurement recognition), 100% black ownership, and 38.4% black women ownership certified by Empowerdex.
                </p>
              </div>
              <CTAButton variant="orange" size="sm" onClick={() => onNavigate('governance/bbee')}>
                View B-BBEE Credentials <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </CTAButton>
            </div>

            {/* Pillar 2: Statutory Compliance */}
            <div className="bg-afrilink-surface rounded-2xl p-8 border border-afrilink-grey-light shadow-card hover:shadow-card-hover hover:border-afrilink-orange/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-afrilink-fg/10 border border-afrilink-fg/20 flex items-center justify-center text-afrilink-fg mb-6">
                  <FileCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-afrilink-orange">Pillar 02</span>
                <h3 className="font-heading text-2xl font-semibold text-afrilink-fg mt-1 mb-3">
                  Statutory & SARS Status
                </h3>
                <p className="text-afrilink-fg-60 text-sm leading-relaxed mb-6">
                  Official CIPC incorporation (2001/014920/07), active annual returns, SARS Tax Compliance Status PIN, and registered POPIA Information Officer.
                </p>
              </div>
              <CTAButton variant="outline" size="sm" onClick={() => onNavigate('governance/compliance')}>
                View Statutory Filings <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </CTAButton>
            </div>

            {/* Pillar 3: COIDA */}
            <div className="bg-afrilink-surface rounded-2xl p-8 border border-afrilink-grey-light shadow-card hover:shadow-card-hover hover:border-afrilink-orange/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-afrilink-gold/20 border border-afrilink-gold/40 flex items-center justify-center text-afrilink-fg mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-afrilink-orange">Pillar 03</span>
                <h3 className="font-heading text-2xl font-semibold text-afrilink-fg mt-1 mb-3">
                  Letter of Good Standing
                </h3>
                <p className="text-afrilink-fg-60 text-sm leading-relaxed mb-6">
                  Compensation Fund (COIDA) certification issued by the Department of Employment and Labour, valid through April 2027 with clear audit standing.
                </p>
              </div>
              <CTAButton variant="outline" size="sm" onClick={() => onNavigate('governance/good-standing')}>
                View COIDA Record <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </CTAButton>
            </div>
          </div>
        </div>

        {/* King IV Adherence Statement */}
        <div className="bg-gradient-to-br from-afrilink-navy to-[#182046] text-white rounded-2xl p-8 sm:p-12 mb-20">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest font-bold text-afrilink-gold">King IV Code Standards</span>
            <h3 className="font-heading text-2xl sm:text-3xl font-semibold mt-2 mb-4">
              Commitment to Ethical Leadership & Accountability
            </h3>
            <p className="text-white/80 text-base leading-relaxed mb-6">
              Afrilink Corporation subscribes to and reports against the King IV Report on Corporate Governance for South Africa™. The board of directors is responsible for the governance of the group and is accountable to all stakeholders. Our audit, social & ethics, and remuneration committees maintain rigorous independence.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-white/90">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-afrilink-gold" />
                <span>Ethical culture & integrity</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-afrilink-gold" />
                <span>Performance & value creation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-afrilink-gold" />
                <span>Adequate & effective control</span>
              </div>
            </div>
          </div>
        </div>

        {/* Complete Verified Documents Directory */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-afrilink-orange">Document Registry</span>
              <h2 className="font-heading text-3xl font-semibold text-afrilink-fg mt-1">
                Verified Compliance Documents
              </h2>
            </div>
            <p className="text-afrilink-fg-60 text-sm max-w-md">
              Click any certificate card to inspect verified metadata, registration codes, and preview the disclosure file.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {governanceDocs.map(doc => (
              <GovernanceDocCard
                key={doc.id}
                doc={doc}
                onPreview={setPreviewDoc}
              />
            ))}
          </div>
        </div>

        {/* Document Preview Modal */}
        {previewDoc && (
          <DocPreviewModal
            doc={previewDoc}
            onClose={() => setPreviewDoc(null)}
          />
        )}
      </div>
    </div>
  );
}
