import React from 'react';
import { Factory, Cpu, Globe, Award, CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react';
import SubNavPill from '../components/SubNavPill';
import CTAButton from '../components/CTAButton';
import InvestmentCard from '../components/InvestmentCard';
import { investmentsData } from '../data/investmentsData';

const SECTOR_NAV_ITEMS = [
  { label: 'All Holdings', route: 'investments' },
  { label: 'Mining & Commodities', route: 'investments/mining', badge: '2 Holdings' },
  { label: 'Infrastructure & Civils', route: 'investments/infrastructure', badge: 'Civils' },
  { label: 'Digital Engineering', route: 'investments/digital', badge: 'Tech' },
  { label: 'Human Capital', route: 'investments/human-capital', badge: 'Academy' },
  { label: 'Strategic Ventures', route: 'investments/strategic', badge: 'AI & EdTech' },
];

export default function SectorStrategicPage({ onNavigate }) {
  const strategicHoldings = investmentsData.filter(i => i.category === 'Strategic');

  const ventures = [
    {
      title: 'ELO Digital Office Alliance',
      badge: 'German Enterprise Automation',
      desc: 'Strategic partnership with Stuttgart-based software titan ELO Digital Office (1.3M+ global users). Integrating intelligent enterprise content management, sovereign AI document processing, and compliance workflows into African corporates.',
    },
    {
      title: 'University of Botswana EdTech MOU',
      badge: 'Academic Digitization',
      desc: 'Binding 5-year digital transformation alliance digitizing sovereign curricula, enterprise LMS deployment, and academic faculty upskilling for Southern Africa’s premier national university.',
    },
  ];

  return (
    <div className="min-h-screen bg-afrilink-surface">
      {/* Hero */}
      <div className="relative pt-36 pb-20 lg:pt-44 lg:pb-24 bg-afrilink-navy overflow-hidden">
        <div className="absolute inset-0 bg-ndebele-pattern opacity-40" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-afrilink-orange/15 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="eyebrow mb-4">Investment Sector Tag: Strategic Ventures & Alliances</div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[68px] leading-[1.1] font-semibold text-white mb-4">
            Enterprise Technology & <span className="text-afrilink-gold">Global Alliances</span>
          </h1>
          <p className="text-white/80 text-lg sm:text-xl font-light max-w-3xl leading-relaxed mb-8">
            Enterprise AI software integration, academic digitization, and cross-border technology alliances.
          </p>

          <div className="flex flex-wrap gap-4">
            <CTAButton variant="orange" size="md" onClick={() => onNavigate('partner')}>
              Strategic Venture Brief
            </CTAButton>
            <CTAButton variant="outline-light" size="md" onClick={() => onNavigate('investments')}>
              View All Holdings
            </CTAButton>
          </div>
        </div>
      </div>

      {/* Sibling SubNav Bar */}
      <SubNavPill
        items={SECTOR_NAV_ITEMS}
        activeRoute="investments/strategic"
        onNavigate={onNavigate}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Key Ventures Grid */}
        <div className="space-y-6 mb-20">
          <div className="max-w-2xl mb-8">
            <span className="text-xs uppercase tracking-widest font-bold text-afrilink-orange">Strategic Alliances</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-afrilink-fg mt-1">
              Technology & Knowledge Platforms
            </h2>
          </div>

          {ventures.map((v, i) => (
            <div
              key={i}
              className="bg-afrilink-surface rounded-2xl p-8 border border-afrilink-grey-light shadow-card hover:shadow-card-hover transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded bg-afrilink-orange/10 text-afrilink-orange">
                  {v.badge}
                </span>
                <span className="text-xs text-afrilink-fg-60 font-medium">Strategic Holding & Alliance</span>
              </div>
              <h3 className="font-heading text-2xl font-semibold text-afrilink-fg mb-3">
                {v.title}
              </h3>
              <p className="text-afrilink-fg-80 text-base leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Portfolio Holding */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-afrilink-orange">Portfolio Company</span>
              <h2 className="font-heading text-3xl font-semibold text-afrilink-fg mt-1">
                Strategic Ventures Portfolio
              </h2>
            </div>
            <p className="text-afrilink-fg-60 text-sm max-w-md">
              Review our specialized investment vehicle housing enterprise software and technology alliance assets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {strategicHoldings.map(holding => (
              <InvestmentCard
                key={holding.id}
                investment={holding}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-br from-afrilink-navy to-[#182046] text-white rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-afrilink-gold">Global Co-Investment</span>
            <h3 className="font-heading text-2xl sm:text-3xl font-semibold mt-1">
              Co-Invest in African Technology Ventures
            </h3>
            <p className="text-white/70 text-sm mt-1 max-w-xl">
              Connect with Afrilink Corporation to structure equity participation across enterprise AI, software, and EdTech ventures.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <CTAButton variant="orange" size="md" onClick={() => onNavigate('partner')}>
              Partner With Us
            </CTAButton>
            <CTAButton variant="outline-light" size="md" onClick={() => onNavigate('investments/mining')}>
              Explore Mining Sector
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}
