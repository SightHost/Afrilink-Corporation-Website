import React from 'react';
import { Award, Briefcase, Globe, BookOpen, Quote, Shield, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import SubNavPill from '../components/SubNavPill';
import CTAButton from '../components/CTAButton';
import { ceoProfile } from '../data/corporateData';

const ABOUT_PAGES = [
  { label: 'Company Overview & Values', route: 'about/overview' },
  { label: 'Founder & CEO Profile', route: 'about/ceo' },
  { label: 'Shareholders & Capital', route: 'about/shareholders' },
  { label: 'Corporate Gallery', route: 'about/gallery' },
];

export default function AboutCeoPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative pt-36 pb-20 lg:pt-44 lg:pb-24 bg-afrilink-navy overflow-hidden">
        <div className="absolute inset-0 bg-ndebele-pattern opacity-40" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-afrilink-gold/15 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="eyebrow mb-4">Founder & Executive Leadership</div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[68px] leading-[1.1] font-semibold text-white mb-4">
            Dr Molefe M.D. <span className="text-afrilink-gold">Mokgatle</span>
          </h1>
          <p className="text-white/80 text-lg sm:text-xl font-medium mb-3">
            {ceoProfile.title}
          </p>
          <p className="text-white/70 text-sm sm:text-base font-light max-w-3xl leading-relaxed mb-8">
            {ceoProfile.credentials}
          </p>

          <div className="flex flex-wrap gap-4">
            <CTAButton variant="orange" size="md" onClick={() => onNavigate('partner')}>
              Initiate Partnership Brief <ArrowRight className="w-4 h-4 ml-1" />
            </CTAButton>
            <CTAButton variant="outline-light" size="md" onClick={() => onNavigate('contact')}>
              Direct Executive Inquiry
            </CTAButton>
          </div>
        </div>
      </div>

      {/* Sibling SubNav Bar */}
      <SubNavPill
        items={ABOUT_PAGES}
        activeRoute="about/ceo"
        onNavigate={onNavigate}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Profile Card & Key Quote */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <div className="relative rounded-2xl overflow-hidden border border-afrilink-grey-light shadow-card group">
                <img
                  src={ceoProfile.image}
                  alt={ceoProfile.name}
                  className="w-full aspect-[4/5] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-afrilink-navy via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs font-bold uppercase tracking-wider text-afrilink-gold">
                    39 Years Executive Track Record
                  </span>
                  <div className="font-heading text-2xl font-semibold mt-1">
                    Dr Molefe M.D. Mokgatle
                  </div>
                  <div className="text-xs text-white/80 mt-1">
                    DBA (Paris) · MBA (Cardiff) · M.A. (London) · Cert. Dir (SA)
                  </div>
                </div>
              </div>

              {/* Key Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-afrilink-cream p-4 rounded-xl border border-afrilink-grey-light text-center">
                  <div className="font-heading text-3xl font-bold text-afrilink-orange">39+</div>
                  <div className="text-xs font-medium text-afrilink-navy-60 mt-1">Years Leadership</div>
                </div>
                <div className="bg-afrilink-cream p-4 rounded-xl border border-afrilink-grey-light text-center">
                  <div className="font-heading text-3xl font-bold text-afrilink-orange">7+</div>
                  <div className="text-xs font-medium text-afrilink-navy-60 mt-1">Blue-Chip Entities</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-10">
            {/* Executive Quote */}
            <div className="relative bg-gradient-to-br from-afrilink-cream to-white rounded-2xl p-8 sm:p-10 border border-afrilink-orange/20 shadow-card">
              <Quote className="w-10 h-10 text-afrilink-orange/30 absolute top-6 right-6" />
              <p className="font-heading text-xl sm:text-2xl text-afrilink-navy font-medium italic leading-relaxed mb-4">
                "{ceoProfile.quote}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-afrilink-grey-light">
                <div className="w-3 h-3 rounded-full bg-afrilink-orange" />
                <span className="text-sm font-semibold text-afrilink-navy">
                  Dr Molefe Mokgatle — Founder & CEO
                </span>
              </div>
            </div>

            {/* Overview Summary */}
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-afrilink-navy mb-4">
                Executive Biography
              </h2>
              <p className="text-afrilink-navy-80 text-base sm:text-lg leading-relaxed">
                {ceoProfile.overview}
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-8">
              {ceoProfile.sections.map((section, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 sm:p-8 border border-afrilink-grey-light shadow-card hover:shadow-card-hover transition-all"
                >
                  <h3 className="font-heading text-xl sm:text-2xl font-semibold text-afrilink-navy mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-afrilink-orange/10 text-afrilink-orange flex items-center justify-center text-sm font-bold">
                      {idx + 1}
                    </span>
                    {section.title}
                  </h3>
                  <div className="text-afrilink-navy-80 text-sm sm:text-base leading-relaxed space-y-2 whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA to sibling pages */}
        <div className="bg-afrilink-cream rounded-2xl p-8 sm:p-12 border border-afrilink-grey-light flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold text-afrilink-orange uppercase tracking-wider">Next in About</span>
            <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-afrilink-navy mt-1">
              Shareholding Structure & Board Governance
            </h3>
            <p className="text-afrilink-navy-60 text-sm mt-1 max-w-xl">
              Explore how Afrilink balances entrepreneurial leadership with broad-based community trust equity.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <CTAButton variant="orange" size="md" onClick={() => onNavigate('about/shareholders')}>
              Shareholders & Board <ArrowRight className="w-4 h-4 ml-1" />
            </CTAButton>
            <CTAButton variant="outline" size="md" onClick={() => onNavigate('about/overview')}>
              Overview
            </CTAButton>
            <CTAButton variant="outline" size="md" onClick={() => onNavigate('about/gallery')}>
              Gallery
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}
