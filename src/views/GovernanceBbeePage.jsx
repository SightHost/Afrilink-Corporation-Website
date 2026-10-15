import React, { useState } from 'react';
import { Award, ShieldCheck, CheckCircle2, Download, Eye, FileText, ExternalLink } from 'lucide-react';
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

export default function GovernanceBbeePage({ onNavigate }) {
  const [showModal, setShowModal] = useState(false);
  const bbeeDoc = governanceDocs.find(d => d.id === 'bbee-cert');

  const scorecardPillars = [
    { name: 'Ownership', score: '25.00 / 25', status: 'Full Points', desc: '100% black ownership and broad-based community trust participation.' },
    { name: 'Management Control', score: '19.00 / 19', status: 'Optimal', desc: 'Executive board leadership and operational voting stewardship.' },
    { name: 'Skills Development', score: '20.00 / 20', status: 'Accredited', desc: 'Active spend on technical bursaries, artisan training, and Mahlori Academy.' },
    { name: 'Enterprise & Supplier Dev', score: '42.00 / 42', status: 'Exemplary', desc: 'Preferential procurement from EMEs, QSEs, and SASDC black suppliers.' },
    { name: 'Socio-Economic Development', score: '5.00 / 5', status: 'Community', desc: 'Motokolo community agricultural and educational cooperative funding.' },
  ];

  return (
    <div className="min-h-screen bg-afrilink-surface">
      {/* Hero */}
      <div className="relative pt-36 pb-20 lg:pt-44 lg:pb-24 bg-afrilink-navy overflow-hidden">
        <div className="absolute inset-0 bg-ndebele-pattern opacity-40" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-afrilink-orange/15 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="eyebrow mb-4">Empowerment & Transformation</div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[68px] leading-[1.1] font-semibold text-white mb-4">
            Level 1 <span className="text-afrilink-gold">B-BBEE</span> Contributor
          </h1>
          <p className="text-white/80 text-lg sm:text-xl font-light max-w-3xl leading-relaxed mb-8">
            Afrilink Corporation is an empowering supplier with 100% Black Ownership and 38.4% Black Women Ownership, providing clients and joint venture partners with 135% preferential procurement recognition.
          </p>

          <div className="flex flex-wrap gap-4">
            <CTAButton variant="orange" size="md" onClick={() => setShowModal(true)}>
              Preview Certificate <Eye className="w-4 h-4 ml-1" />
            </CTAButton>
            <CTAButton variant="outline-light" size="md" onClick={() => onNavigate('partner')}>
              Procurement & Partner Brief
            </CTAButton>
          </div>
        </div>
      </div>

      {/* Sibling SubNav Bar */}
      <SubNavPill
        items={GOVERNANCE_PAGES}
        activeRoute="governance/bbee"
        onNavigate={onNavigate}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Verification Certificate Summary Card */}
        <div className="bg-afrilink-surface rounded-2xl p-8 sm:p-12 border-2 border-afrilink-orange/30 shadow-card mb-16 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-afrilink-orange/10 rounded-full blur-2xl" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-8 pb-8 border-b border-afrilink-grey-light">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-afrilink-orange text-white flex items-center justify-center shadow-md shrink-0">
                <Award className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-afrilink-orange">
                  SANAS Accredited Verification
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-afrilink-fg mt-1">
                  Level 1 Contributor (135% Recognition)
                </h2>
                <p className="text-afrilink-fg-60 text-sm mt-1">
                  Certificate No: <strong className="text-afrilink-fg">BEE-AFR-2026-9041</strong> · Verified by Empowerdex Rating Agency
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowModal(true)}
                className="px-5 py-2.5 rounded-lg bg-afrilink-orange text-white text-sm font-semibold hover:bg-afrilink-orange-hover transition-colors shadow-sm flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                <span>View Full Certificate</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="bg-afrilink-cream p-5 rounded-xl border border-afrilink-grey-light">
              <span className="text-xs text-afrilink-fg-60 font-medium">Black Ownership</span>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-afrilink-fg mt-1">100%</div>
              <div className="text-[11px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Fully Verified
              </div>
            </div>
            <div className="bg-afrilink-cream p-5 rounded-xl border border-afrilink-grey-light">
              <span className="text-xs text-afrilink-fg-60 font-medium">Black Women Ownership</span>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-afrilink-fg mt-1">38.4%</div>
              <div className="text-[11px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Qualifying Criteria
              </div>
            </div>
            <div className="bg-afrilink-cream p-5 rounded-xl border border-afrilink-grey-light">
              <span className="text-xs text-afrilink-fg-60 font-medium">Procurement Recognition</span>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-afrilink-orange mt-1">135%</div>
              <div className="text-[11px] text-afrilink-fg-60 font-medium mt-1">Preferential Multiplier</div>
            </div>
            <div className="bg-afrilink-cream p-5 rounded-xl border border-afrilink-grey-light">
              <span className="text-xs text-afrilink-fg-60 font-medium">Empowering Supplier</span>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-afrilink-fg mt-1">Yes</div>
              <div className="text-[11px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Designated Group
              </div>
            </div>
          </div>
        </div>

        {/* Scorecard Pillars */}
        <div className="mb-20">
          <div className="max-w-2xl mb-10">
            <span className="text-xs uppercase tracking-widest font-bold text-afrilink-orange">Detailed Breakdown</span>
            <h3 className="font-heading text-3xl font-semibold text-afrilink-fg mt-1">
              B-BBEE Scorecard Performance
            </h3>
            <p className="text-afrilink-fg-60 text-sm mt-2">
              Our holistic scoring reflects deep-rooted empowerment across every element of our operational and corporate structure.
            </p>
          </div>

          <div className="space-y-4">
            {scorecardPillars.map((p, i) => (
              <div
                key={i}
                className="bg-afrilink-surface rounded-xl p-6 border border-afrilink-grey-light shadow-card hover:shadow-card-hover transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <h4 className="font-heading text-xl font-semibold text-afrilink-fg">{p.name}</h4>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold">
                      {p.status}
                    </span>
                  </div>
                  <p className="text-afrilink-fg-60 text-sm mt-1">{p.desc}</p>
                </div>
                <div className="font-heading text-2xl font-bold text-afrilink-fg shrink-0">
                  {p.score}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commercial Benefits for Partners */}
        <div className="bg-gradient-to-br from-afrilink-navy to-[#182046] text-white rounded-2xl p-8 sm:p-12 mb-20">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest font-bold text-afrilink-gold">Client & JV Advantage</span>
            <h3 className="font-heading text-2xl sm:text-3xl font-semibold mt-2 mb-4">
              Why Partnering With a Level 1 Contributor Matters
            </h3>
            <p className="text-white/80 text-base leading-relaxed mb-6">
              Procuring goods and professional services from Afrilink Corporation gives private and public sector partners an immediate 135% recognition on their own Preferential Procurement element. Every R1,000,000 spent with Afrilink yields R1,350,000 in qualifying B-BBEE procurement recognition.
            </p>
            <div className="flex flex-wrap gap-4">
              <CTAButton variant="orange" size="md" onClick={() => onNavigate('partner')}>
                Initiate Procurement Partnership
              </CTAButton>
              <CTAButton variant="outline-light" size="md" onClick={() => onNavigate('governance/compliance')}>
                View Tax & CIPC Filings
              </CTAButton>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && bbeeDoc && (
          <DocPreviewModal
            doc={bbeeDoc}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
}
