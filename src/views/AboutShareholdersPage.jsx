import React from 'react';
import { PieChart, ShieldCheck, Users, Lock, ArrowRight, CheckCircle2, UserCheck, Building } from 'lucide-react';
import SubNavPill from '../components/SubNavPill';
import CTAButton from '../components/CTAButton';
import { shareholdersData, boardMembers, ceoProfile } from '../data/corporateData';

const ABOUT_PAGES = [
  { label: 'Company Overview & Values', route: 'about/overview' },
  { label: 'Founder & CEO Profile', route: 'about/ceo' },
  { label: 'Shareholders & Capital', route: 'about/shareholders' },
  { label: 'Corporate Gallery', route: 'about/gallery' },
];

export default function AboutShareholdersPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative pt-36 pb-20 lg:pt-44 lg:pb-24 bg-afrilink-navy overflow-hidden">
        <div className="absolute inset-0 bg-ndebele-pattern opacity-40" />
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-afrilink-orange/15 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="eyebrow mb-4">Capital Architecture & Board</div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[68px] leading-[1.1] font-semibold text-white mb-4">
            Shareholders & <span className="text-afrilink-gold">Capital</span>
          </h1>
          <p className="text-white/80 text-lg sm:text-xl font-light max-w-3xl leading-relaxed mb-8">
            An institutional ownership model that marries long-term executive stewardship with broad-based host community trusts, employee share participation, and strategic black diaspora capital.
          </p>

          <div className="flex flex-wrap gap-4">
            <CTAButton variant="orange" size="md" onClick={() => onNavigate('partner')}>
              Institutional Co-Investment Inquiry <ArrowRight className="w-4 h-4 ml-1" />
            </CTAButton>
            <CTAButton variant="outline-light" size="md" onClick={() => onNavigate('governance/bbee')}>
              View B-BBEE Credentials
            </CTAButton>
          </div>
        </div>
      </div>

      {/* Sibling SubNav Bar */}
      <SubNavPill
        items={ABOUT_PAGES}
        activeRoute="about/shareholders"
        onNavigate={onNavigate}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Equity Architecture Section */}
        <div className="mb-20">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase tracking-widest font-bold text-afrilink-orange">Equity Distribution</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-afrilink-navy mt-1 mb-4">
              Balanced, Transformation-Driven Capital
            </h2>
            <p className="text-afrilink-navy-80 text-base sm:text-lg leading-relaxed">
              {shareholdersData.philosophy}
            </p>
          </div>

          {/* Interactive Visual Bar */}
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-afrilink-grey-light shadow-card mb-12">
            <div className="h-6 w-full rounded-full overflow-hidden flex shadow-inner mb-6 bg-afrilink-grey-light">
              {shareholdersData.segments.map((seg, idx) => (
                <div
                  key={idx}
                  style={{ width: `${seg.percentage}%`, backgroundColor: seg.color }}
                  className="h-full transition-all duration-500 relative group cursor-pointer"
                  title={`${seg.name}: ${seg.percentage}%`}
                />
              ))}
            </div>

            {/* Segment Breakdown Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {shareholdersData.segments.map((seg, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-afrilink-grey-light bg-afrilink-cream/50 flex flex-col justify-between hover:shadow-card transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-4 h-4 rounded-full" style={{ backgroundColor: seg.color }} />
                      <span className="font-heading text-3xl font-bold" style={{ color: seg.color }}>
                        {seg.percentage}%
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-afrilink-navy mb-2">
                      {seg.name}
                    </h3>
                    <p className="text-afrilink-navy-60 text-sm leading-relaxed">
                      {seg.description}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-afrilink-grey-light text-xs font-semibold text-afrilink-navy-60 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-afrilink-orange" />
                    <span>Voting & Board Representation</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer & NDA box */}
          <div className="bg-gradient-to-r from-afrilink-navy to-[#182046] text-white rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5 text-afrilink-gold" />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-lg text-white">
                  Institutional Investor Register
                </h4>
                <p className="text-white/70 text-sm mt-1 max-w-xl">
                  {shareholdersData.disclaimer}
                </p>
              </div>
            </div>
            <CTAButton variant="orange" size="sm" onClick={() => onNavigate('partner')}>
              Request Under NDA
            </CTAButton>
          </div>
        </div>

        {/* Board of Directors */}
        <div className="mb-20">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-widest font-bold text-afrilink-orange">Governance & Stewardship</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-afrilink-navy mt-1 mb-3">
              Board of Directors
            </h2>
            <p className="text-afrilink-navy-60 text-base">
              Independent oversight and disciplined capital allocation adhering to the King IV corporate governance code.
            </p>
          </div>

          <div className={boardMembers.length > 0 ? "grid grid-cols-1 md:grid-cols-2 gap-8" : "max-w-3xl"}>
            {/* Dr Mokgatle as Chairman & CEO */}
            <div className="bg-white rounded-2xl p-8 border border-afrilink-grey-light shadow-card hover:shadow-card-hover transition-all flex flex-col sm:flex-row gap-6">
              <img
                src={ceoProfile.image}
                alt="Dr Molefe Mokgatle"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover object-top shrink-0 border border-afrilink-orange/30"
              />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-afrilink-orange">
                  Board Chairman & CEO
                </span>
                <h3 className="font-heading text-2xl font-semibold text-afrilink-navy mt-1">
                  Dr Molefe M.D. Mokgatle
                </h3>
                <p className="text-xs text-afrilink-navy-60 mt-1 mb-3">
                  DBA (Paris) · MBA (Cardiff) · M.A. (London) · Cert. Dir (SA)
                </p>
                <p className="text-afrilink-navy-80 text-sm leading-relaxed mb-4">
                  Over 39 years steering large-scale commercial strategy and restructuring across blue-chip multinationals including SABC, AfriSam, Aveng Grinaker-LTA, and Nedbank.
                </p>
                <button
                  onClick={() => onNavigate('about/ceo')}
                  className="text-xs font-bold text-afrilink-orange hover:underline flex items-center gap-1"
                >
                  Read Full Executive Profile <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Additional Directors */}
            {boardMembers.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 border border-afrilink-grey-light shadow-card hover:shadow-card-hover transition-all flex flex-col sm:flex-row gap-6"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover object-top shrink-0 border border-afrilink-orange/30"
                />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-afrilink-orange">
                    Executive Director
                  </span>
                  <h3 className="font-heading text-2xl font-semibold text-afrilink-navy mt-1">
                    {member.name}
                  </h3>
                  <p className="text-xs text-afrilink-navy-60 mt-1 mb-3">
                    {member.credentials}
                  </p>
                  <p className="text-afrilink-navy-80 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="mt-4 pt-3 border-t border-afrilink-grey-light text-xs font-semibold text-afrilink-navy flex items-center gap-2">
                    <UserCheck className="w-3.5 h-3.5 text-afrilink-orange" />
                    <span>{member.experience}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA to sibling pages */}
        <div className="bg-afrilink-cream rounded-2xl p-8 sm:p-12 border border-afrilink-grey-light flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold text-afrilink-orange uppercase tracking-wider">Next in About</span>
            <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-afrilink-navy mt-1">
              Explore Corporate Project Gallery
            </h3>
            <p className="text-afrilink-navy-60 text-sm mt-1 max-w-xl">
              Inspect project photographs, mining exploration surveys, and international diplomatic engagements.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <CTAButton variant="orange" size="md" onClick={() => onNavigate('about/gallery')}>
              Corporate Gallery <ArrowRight className="w-4 h-4 ml-1" />
            </CTAButton>
            <CTAButton variant="outline" size="md" onClick={() => onNavigate('about/overview')}>
              Overview
            </CTAButton>
            <CTAButton variant="outline" size="md" onClick={() => onNavigate('about/ceo')}>
              CEO Profile
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}
