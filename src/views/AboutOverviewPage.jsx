import React from 'react';
import { Globe, Award, Users, Shield, TrendingUp, CheckCircle2, Building2 } from 'lucide-react';
import SubNavPill from '../components/SubNavPill';
import CTAButton from '../components/CTAButton';
import { milestonesData, strategicPartnersData } from '../data/corporateData';

const ABOUT_PAGES = [
  { label: 'Company Overview & Values', route: 'about/overview' },
  { label: 'Founder & CEO Profile', route: 'about/ceo' },
  { label: 'Shareholders & Capital', route: 'about/shareholders' },
  { label: 'Corporate Gallery', route: 'about/gallery' },
];

export default function AboutOverviewPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-afrilink-surface">
      {/* Hero */}
      <div className="relative pt-36 pb-20 lg:pt-44 lg:pb-24 bg-afrilink-navy overflow-hidden">
        <div className="absolute inset-0 bg-ndebele-pattern opacity-40" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-afrilink-orange/15 rounded-full blur-[100px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="eyebrow mb-4">About Afrilink Corporation</div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[68px] leading-[1.1] font-semibold text-white mb-6">
            Pan-African Vision.<br />
            <span className="text-afrilink-gold">Boardroom Credibility.</span>
          </h1>
          <p className="text-white/80 text-lg sm:text-xl lg:text-[22px] leading-[1.6] max-w-3xl font-light">
            Afrilink Corporation (Pty) Ltd is an avant-garde South African investment holding company committed to broad-based economic transformation, mobilizing diaspora expertise, and creating enduring commercial value across high-impact African sectors.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <CTAButton variant="orange" size="md" onClick={() => onNavigate('partner')}>
              Partner With Us
            </CTAButton>
            <CTAButton variant="outline-light" size="md" onClick={() => onNavigate('about/ceo')}>
              Meet Our Founder & CEO
            </CTAButton>
          </div>
        </div>
      </div>

      {/* Sibling SubNav Bar */}
      <SubNavPill
        items={ABOUT_PAGES}
        activeRoute="about/overview"
        onNavigate={onNavigate}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Core Pillars: Mission, Vision, Values */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest font-bold text-afrilink-orange">Foundational Principles</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-afrilink-fg mt-2">
              The Bedrock of Our Strategy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                label: 'Our Mission',
                icon: Globe,
                color: '#F37121',
                text: 'To be the pre-eminent pan-African investment holding company, channelling diaspora capital and expertise into transformative economic opportunities across Africa, in service of a prosperous, self-reliant continent.'
              },
              {
                label: 'Our Vision',
                icon: Award,
                color: '#F18728',
                text: 'To create sustainable, broad-based wealth through strategic investment in mining, infrastructure, technology, and human capital — ensuring host communities directly participate in and benefit from our commercial growth.'
              },
              {
                label: 'Our Values',
                icon: Users,
                color: '#2B3044',
                text: 'Ubuntu · Integrity · Excellence · Transformation · Sustainability · Pan-African Solidarity. These are not corporate slogans; they are the governing principles behind every board decision and capital allocation.'
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-afrilink-surface rounded-xl p-8 border border-afrilink-grey-light shadow-card hover:shadow-card-hover hover:border-afrilink-orange/30 transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                  style={{ background: `${item.color}15`, border: `1px solid ${item.color}35` }}
                >
                  <item.icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <h3 className="font-heading text-2xl font-semibold text-afrilink-fg mb-4">{item.label}</h3>
                <p className="text-afrilink-fg-80 text-base leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Thesis: Making Diaspora Work */}
        <div className="bg-gradient-to-br from-afrilink-navy to-[#151c3d] rounded-2xl p-8 sm:p-12 lg:p-16 text-white mb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-afrilink-gold/10 rounded-full blur-[80px]" />
          <div className="relative z-10 max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-afrilink-orange/20 text-afrilink-gold text-xs font-semibold uppercase tracking-wider mb-4 border border-afrilink-orange/30">
              Strategic Thesis
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6">
              Making Diaspora Work
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-6 font-light">
              Over $95 billion is remitted annually by the African diaspora, yet the vast majority funds consumptive support rather than wealth-generating equity assets. Afrilink Corporation structures bankable, institutionally governed investment conduits that connect global diaspora capital in London, New York, Frankfurt, and Paris directly with Tier-1 industrial assets in Southern Africa.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-white/90">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-afrilink-gold shrink-0" />
                <span className="text-sm font-medium">Bespoke SPVs with sovereign tenure rights</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-afrilink-gold shrink-0" />
                <span className="text-sm font-medium">100% compliant with King IV and SARS standards</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-afrilink-gold shrink-0" />
                <span className="text-sm font-medium">Co-investment alongside host community trusts</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-afrilink-gold shrink-0" />
                <span className="text-sm font-medium">Transparent reporting and forensic audit trail</span>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Alliances & Institutional Partners */}
        {strategicPartnersData && strategicPartnersData.length > 0 && (
          <div className="mb-20">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-afrilink-orange">Global Ecosystem</span>
                <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-afrilink-fg mt-1">
                  Strategic Alliances & Partnerships
                </h2>
              </div>
              <p className="text-afrilink-fg-60 text-sm max-w-md">
                Afrilink collaborates with premier academic institutions, multinational technology enterprises, and industry councils.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {strategicPartnersData.map((p, i) => (
                <div
                  key={i}
                  className="bg-afrilink-surface rounded-xl p-6 sm:p-8 border border-afrilink-grey-light shadow-card hover:shadow-card-hover hover:border-afrilink-orange/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded bg-afrilink-orange/10 text-afrilink-orange border border-afrilink-orange/20">
                        {p.badge}
                      </span>
                      <span className="text-xs text-afrilink-fg-60 font-medium">{p.location}</span>
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-afrilink-fg mb-2">{p.name}</h3>
                    <p className="text-afrilink-fg-80 text-sm leading-relaxed mb-4">{p.description}</p>
                  </div>
                  <div className="pt-4 border-t border-afrilink-grey-light flex items-center justify-between text-xs text-afrilink-fg-60">
                    <span className="font-semibold text-afrilink-fg">{p.type}</span>
                    <span className="text-afrilink-orange font-medium">{p.logoText}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Milestones Timeline */}
        {milestonesData && milestonesData.length > 0 && (
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs uppercase tracking-widest font-bold text-afrilink-orange">Track Record</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-afrilink-fg mt-2">
                Two Decades of Impact
              </h2>
              <p className="text-afrilink-fg-60 text-base mt-3">
                Key milestones shaping the evolution of Afrilink Corporation across the continent.
              </p>
            </div>

            <div className="relative border-l-2 border-afrilink-orange/30 ml-4 sm:ml-8 space-y-12">
              {milestonesData.map((m, i) => (
                <div key={i} className="relative pl-8 sm:pl-10">
                  <div className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-afrilink-surface border-4 border-afrilink-orange shadow" />
                  <div className="inline-block px-3 py-1 rounded bg-afrilink-orange text-white text-xs font-bold tracking-wide mb-2">
                    {m.year}
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-afrilink-fg mb-2">{m.title}</h3>
                  <p className="text-afrilink-fg-80 text-sm sm:text-base leading-relaxed max-w-3xl">{m.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA to sibling pages */}
        <div className="bg-afrilink-cream rounded-2xl p-8 sm:p-12 border border-afrilink-grey-light flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold text-afrilink-orange uppercase tracking-wider">Next in About</span>
            <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-afrilink-fg mt-1">
              Explore Executive Leadership & Capital
            </h3>
            <p className="text-afrilink-fg-60 text-sm mt-1 max-w-xl">
              Discover Dr Molefe M.D. Mokgatle’s 39-year career, our broad-based shareholding structure, and corporate gallery.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <CTAButton variant="orange" size="md" onClick={() => onNavigate('about/ceo')}>
              CEO Profile
            </CTAButton>
            <CTAButton variant="outline" size="md" onClick={() => onNavigate('about/shareholders')}>
              Shareholders
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
