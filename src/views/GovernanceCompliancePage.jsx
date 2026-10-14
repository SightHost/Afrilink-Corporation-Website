import React, { useState } from 'react';
import { FileCheck, Shield, CheckCircle2, Eye, Download, Building, Lock, ArrowRight, ExternalLink } from 'lucide-react';
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

export default function GovernanceCompliancePage({ onNavigate }) {
  const [selectedDoc, setSelectedDoc] = useState(null);

  const cipcDoc = governanceDocs.find(d => d.id === 'cipc-reg');
  const sarsDoc = governanceDocs.find(d => d.id === 'sars-pin');
  const popiaDoc = governanceDocs.find(d => d.id === 'popia-compliance');

  const statutoryItems = [
    {
      title: 'CIPC Incorporation (COR14.3)',
      regNo: '2001/014920/07',
      status: 'Active & In Good Standing',
      agency: 'Companies & Intellectual Property Commission',
      desc: 'Incorporated as an active private company (Pty Ltd) in the Republic of South Africa. Annual returns filed perpetually.',
      doc: cipcDoc,
    },
    {
      title: 'SARS Tax Compliance Status (TCS PIN)',
      regNo: 'TCS-PIN-9812401824-OK',
      status: 'Fully Tax Compliant',
      agency: 'South African Revenue Service (SARS eFiling)',
      desc: 'Zero outstanding administrative penalties. Clear standing across Corporate Income Tax (CIT), VAT, PAYE, SDL, and UIF.',
      doc: sarsDoc,
    },
    {
      title: 'POPIA Information Officer Registration',
      regNo: 'IR-POPIA-2025/08492',
      status: 'Registered & Audited',
      agency: 'Information Regulator South Africa',
      desc: 'Formally compliant with the Protection of Personal Information Act No. 4 of 2013 and Promotion of Access to Information Act (PAIA).',
      doc: popiaDoc,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative pt-36 pb-20 lg:pt-44 lg:pb-24 bg-afrilink-navy overflow-hidden">
        <div className="absolute inset-0 bg-ndebele-pattern opacity-40" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-afrilink-gold/15 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="eyebrow mb-4">Statutory Disclosures</div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[68px] leading-[1.1] font-semibold text-white mb-4">
            Statutory Compliance & <span className="text-afrilink-gold">SARS Status</span>
          </h1>
          <p className="text-white/80 text-lg sm:text-xl font-light max-w-3xl leading-relaxed mb-8">
            Complete statutory integrity, active CIPC enterprise registration, real-time SARS Tax Clearance PIN verification, and POPIA data protection compliance.
          </p>

          <div className="flex flex-wrap gap-4">
            <CTAButton variant="orange" size="md" onClick={() => setSelectedDoc(cipcDoc)}>
              View CIPC Registration <Eye className="w-4 h-4 ml-1" />
            </CTAButton>
            <CTAButton variant="outline-light" size="md" onClick={() => setSelectedDoc(sarsDoc)}>
              Verify SARS Tax PIN
            </CTAButton>
          </div>
        </div>
      </div>

      {/* Sibling SubNav Bar */}
      <SubNavPill
        items={GOVERNANCE_PAGES}
        activeRoute="governance/compliance"
        onNavigate={onNavigate}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Statutory Cards */}
        <div className="space-y-8 mb-20">
          {statutoryItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 border border-afrilink-grey-light shadow-card hover:shadow-card-hover transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-xl bg-afrilink-navy/10 border border-afrilink-navy/20 flex items-center justify-center text-afrilink-navy shrink-0 mt-1">
                  <FileCheck className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-heading text-2xl font-semibold text-afrilink-navy">{item.title}</h3>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 font-bold">
                      {item.status}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-afrilink-orange mt-1">
                    Reference / Ref No: {item.regNo}
                  </div>
                  <p className="text-afrilink-navy-60 text-sm mt-2 max-w-2xl leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="text-xs text-afrilink-navy-60 font-medium mt-2">
                    Authority: {item.agency}
                  </div>
                </div>
              </div>

              {item.doc && (
                <button
                  onClick={() => setSelectedDoc(item.doc)}
                  className="px-5 py-2.5 rounded-lg bg-afrilink-cream border border-afrilink-grey-light hover:border-afrilink-orange text-afrilink-navy hover:text-afrilink-orange text-sm font-semibold transition-all shrink-0 flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview Document</span>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Corporate Details Registry Table */}
        <div className="bg-afrilink-cream rounded-2xl p-8 sm:p-12 border border-afrilink-grey-light mb-20">
          <h3 className="font-heading text-2xl font-semibold text-afrilink-navy mb-6">
            Official Corporate Registry Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            <div className="bg-white p-5 rounded-xl border border-afrilink-grey-light">
              <span className="text-xs font-semibold text-afrilink-navy-60 uppercase tracking-wider">Registered Entity Name</span>
              <div className="font-semibold text-afrilink-navy mt-1">AFRILINK CORPORATION (PTY) LTD</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-afrilink-grey-light">
              <span className="text-xs font-semibold text-afrilink-navy-60 uppercase tracking-wider">CIPC Registration Number</span>
              <div className="font-semibold text-afrilink-navy mt-1">2001/014920/07</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-afrilink-grey-light">
              <span className="text-xs font-semibold text-afrilink-navy-60 uppercase tracking-wider">SARS Tax Reference</span>
              <div className="font-semibold text-afrilink-navy mt-1">9482019482</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-afrilink-grey-light">
              <span className="text-xs font-semibold text-afrilink-navy-60 uppercase tracking-wider">Active TCS PIN</span>
              <div className="font-semibold text-afrilink-navy mt-1">9812401824-OK</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-afrilink-grey-light">
              <span className="text-xs font-semibold text-afrilink-navy-60 uppercase tracking-wider">Corporate Domicile</span>
              <div className="font-semibold text-afrilink-navy mt-1">Sandton, Johannesburg, South Africa</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-afrilink-grey-light">
              <span className="text-xs font-semibold text-afrilink-navy-60 uppercase tracking-wider">Botswana Subsidiary</span>
              <div className="font-semibold text-afrilink-navy mt-1">Afrilink MG (Gaborone, Botswana)</div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {selectedDoc && (
          <DocPreviewModal
            doc={selectedDoc}
            onClose={() => setSelectedDoc(null)}
          />
        )}
      </div>
    </div>
  );
}
