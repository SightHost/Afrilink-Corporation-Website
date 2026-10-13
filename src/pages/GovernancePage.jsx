import React, { useState } from 'react';
import { ShieldCheck, FileCheck, CheckCircle2, Eye, Download, ExternalLink, AlertCircle } from 'lucide-react';
import GovernanceDocCard from '../components/GovernanceDocCard';
import DocPreviewModal from '../components/DocPreviewModal';
import { governanceDocs } from '../data/governanceData';
import CTAButton from '../components/CTAButton';

const CATEGORY_TABS = [
  { id: 'all', label: 'All Documents' },
  { id: 'bbee', label: 'B-BBEE' },
  { id: 'cipc', label: 'CIPC & Registration' },
  { id: 'tax', label: 'Tax & SARS' },
  { id: 'labour', label: 'Labour & COIDA' },
  { id: 'governance', label: 'King IV & Policy' },
];

export default function GovernancePage({ currentSub, onNavigate }) {
  const [activeCategory, setActiveCategory] = useState(
    currentSub === 'bbee' ? 'bbee' :
    currentSub === 'good-standing' ? 'labour' :
    currentSub === 'compliance' ? 'cipc' : 'all'
  );
  const [previewDoc, setPreviewDoc] = useState(null);

  const filtered = activeCategory === 'all'
    ? (governanceDocs || [])
    : (governanceDocs || []).filter(d => d.category === activeCategory);

  const complianceMetrics = [
    { label: 'B-BBEE Status', value: 'Level 1', icon: ShieldCheck, color: '#F37121' },
    { label: 'Black Ownership', value: '100%', icon: CheckCircle2, color: '#F18728' },
    { label: 'CIPC Status', value: 'Active', icon: FileCheck, color: '#2B3044' },
    { label: 'SARS Compliance', value: 'Compliant', icon: CheckCircle2, color: '#5A5E6E' },
    { label: 'King IV Adherence', value: 'Full', icon: ShieldCheck, color: '#F37121' },
    { label: 'COIDA Standing', value: 'Good Standing', icon: CheckCircle2, color: '#F18728' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="relative pt-36 pb-16 lg:pt-40 lg:pb-20 bg-afrilink-navy overflow-hidden">
        <div className="absolute inset-0 bg-ndebele-pattern opacity-40" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-afrilink-gold/10 rounded-full blur-[80px]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="eyebrow mb-4">Compliance & Governance</div>
          <h1 className="font-heading text-5xl lg:text-[70px] leading-[1.1] font-semibold text-white mb-4">
            Governance &<br />
            <span className="text-afrilink-gold">Compliance</span>
          </h1>
          <p className="text-white/75 text-lg lg:text-[21px] leading-[1.6] font-medium max-w-2xl">
            Afrilink Corporation maintains rigorous statutory compliance and institutional governance standards. All credentials below are independently verified and current.
          </p>
        </div>
      </div>

      {/* Metrics + notice */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Compliance Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {complianceMetrics.map((m, i) => (
              <div key={i} className="bg-white rounded-lg p-4 border border-afrilink-grey-light shadow-card text-center">
                <m.icon className="w-5 h-5 mx-auto mb-2" style={{ color: m.color }} />
                <div className="font-heading font-semibold text-xl text-afrilink-navy mb-0.5">{m.value}</div>
                <div className="text-[13px] font-medium text-afrilink-navy-60">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Notice */}
          <div className="flex items-start gap-3 p-5 rounded-lg bg-afrilink-butter/50 border border-afrilink-gold">
            <AlertCircle className="w-5 h-5 text-afrilink-orange shrink-0 mt-0.5" />
            <p className="text-afrilink-navy-80 text-sm leading-relaxed">
              Full authenticated versions of all statutory documents are available to qualified institutional investors, development finance institutions, and regulatory partners under a signed non-disclosure and confidentiality agreement. To request formal document access, please{' '}
              <button onClick={() => onNavigate('partner')} className="text-afrilink-orange font-semibold hover:underline">submit a partnership brief</button>.
            </p>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="bg-afrilink-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORY_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
                  activeCategory === tab.id
                    ? 'bg-afrilink-orange text-white border-afrilink-orange shadow-card'
                    : 'bg-white text-afrilink-navy border-afrilink-grey hover:border-afrilink-orange hover:text-afrilink-orange'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Documents Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(doc => (
                <GovernanceDocCard
                  key={doc.id}
                  doc={doc}
                  onPreview={() => setPreviewDoc(doc)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <ShieldCheck className="w-12 h-12 text-afrilink-navy-60 mx-auto mb-4 opacity-40" />
              <div className="text-afrilink-navy-60 text-sm">No documents in this category.</div>
            </div>
          )}
        </div>
      </section>

      {/* King IV Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="bg-white rounded-lg p-8 border border-afrilink-grey-light shadow-card">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="eyebrow mb-3">King IV Governance Report</div>
                <h2 className="font-heading text-3xl lg:text-[42px] leading-[1.2] font-semibold text-afrilink-navy mb-4">
                  Corporate Governance at the Highest Standard
                </h2>
                <p className="text-afrilink-navy-80 text-base leading-[1.7] mb-6">
                  Afrilink Corporation subscribes to and reports against the King IV Report on Corporate Governance for South Africa™. The board of directors is responsible for the governance of the group and is accountable to all stakeholders.
                </p>
                <div className="space-y-3">
                  {[
                    'Ethical and responsible leadership',
                    'Transparent stakeholder reporting',
                    'Independent audit and risk oversight',
                    'POPIA data protection compliance',
                    'Anti-corruption and anti-bribery policy',
                  ].map(item => (
                    <div key={item} className="flex items-center gap-2.5 text-base text-afrilink-navy-80">
                      <CheckCircle2 className="w-4 h-4 text-afrilink-orange shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 rounded-lg bg-afrilink-butter/60 border border-afrilink-gold">
                  <div className="text-afrilink-navy font-semibold text-base mb-2">B-BBEE Level 1 Contributor</div>
                  <p className="text-afrilink-navy-80 text-sm leading-relaxed">
                    Afrilink Corporation holds a Broad-Based Black Economic Empowerment (B-BBEE) Level 1 Contributor status — the highest possible rating, reflecting 100% Black ownership, management control, and procurement alignment.
                  </p>
                </div>
                <div className="p-5 rounded-lg bg-afrilink-cream border border-afrilink-grey-light">
                  <div className="text-afrilink-navy font-semibold text-base mb-2">Registration Details</div>
                  <div className="space-y-2 text-sm text-afrilink-navy-60">
                    <div className="flex justify-between gap-4"><span>Company Name:</span><span className="text-afrilink-navy font-medium text-right">Afrilink Corporation (Pty) Ltd</span></div>
                    <div className="flex justify-between gap-4"><span>Reg. Country:</span><span className="text-afrilink-navy font-medium text-right">Republic of South Africa</span></div>
                    <div className="flex justify-between gap-4"><span>Head Office:</span><span className="text-afrilink-navy font-medium text-right">Sandton, Johannesburg</span></div>
                    <div className="flex justify-between gap-4"><span>Entity Type:</span><span className="text-afrilink-navy font-medium text-right">Private Company (Pty) Ltd</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {previewDoc && (
        <DocPreviewModal doc={previewDoc} onClose={() => setPreviewDoc(null)} />
      )}
    </div>
  );
}
