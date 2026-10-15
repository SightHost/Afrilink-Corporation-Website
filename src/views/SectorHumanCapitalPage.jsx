import React from 'react';
import { BookOpen, Users, GraduationCap, Award, ArrowRight, CheckCircle2, MapPin, HeartHandshake } from 'lucide-react';
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
  { label: 'Strategic Ventures', route: 'investments/strategic', badge: 'Auto & AI' },
];

export default function SectorHumanCapitalPage({ onNavigate }) {
  const humanCapitalHoldings = investmentsData.filter(i => i.category === 'Human Capital');

  const pillars = [
    { title: 'SETA-Accredited Learnerships', desc: 'Structured National Qualifications Framework (NQF) vocational programs providing certified artisan and business qualifications.' },
    { title: 'Daveyton Campus & Community Hub', desc: 'Permanent training facility situated directly in Ekurhuleni, creating accessible educational pathways for township youth.' },
    { title: 'Corporate B-BBEE Skills Integration', desc: 'Assisting corporate sponsors in achieving optimal Skills Development scorecard points while transforming real lives.' },
    { title: 'Enterprise Development Incubation', desc: 'Mentoring emerging micro-enterprises and cooperatives into sustainable, bankable commercial suppliers.' },
  ];

  return (
    <div className="min-h-screen bg-afrilink-surface">
      {/* Hero */}
      <div className="relative pt-36 pb-20 lg:pt-44 lg:pb-24 bg-afrilink-navy overflow-hidden">
        <div className="absolute inset-0 bg-ndebele-pattern opacity-40" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-afrilink-orange/15 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="eyebrow mb-4">Investment Sector Tag: Human Capital & Skills</div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[68px] leading-[1.1] font-semibold text-white mb-4">
            Human Capital & <span className="text-afrilink-gold">Skills Academy</span>
          </h1>
          <p className="text-white/80 text-lg sm:text-xl font-light max-w-3xl leading-relaxed mb-8">
            Empowering the next generation of African artisans, corporate technicians, and business leaders through accredited vocational education, township academies, and enterprise incubation.
          </p>

          <div className="flex flex-wrap gap-4">
            <CTAButton variant="orange" size="md" onClick={() => onNavigate('partner')}>
              Sponsor Learnership Program <ArrowRight className="w-4 h-4 ml-1" />
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
        activeRoute="investments/human-capital"
        onNavigate={onNavigate}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Core Pillars */}
        <div className="mb-20">
          <div className="max-w-2xl mb-10">
            <span className="text-xs uppercase tracking-widest font-bold text-afrilink-orange">Transformative Education</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-afrilink-fg mt-1">
              Building Sustainable African Capacity
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, i) => (
              <div key={i} className="bg-afrilink-surface rounded-xl p-6 border border-afrilink-grey-light shadow-card hover:shadow-card-hover transition-all">
                <div className="w-10 h-10 rounded-lg bg-afrilink-orange/10 flex items-center justify-center text-afrilink-orange mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-afrilink-fg mb-2">{p.title}</h3>
                <p className="text-afrilink-fg-60 text-xs sm:text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Holding */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-afrilink-orange">Portfolio Company</span>
              <h2 className="font-heading text-3xl font-semibold text-afrilink-fg mt-1">
                Mahlori Group
              </h2>
            </div>
            <p className="text-afrilink-fg-60 text-sm max-w-md">
              Leading accredited training academy operating in Daveyton, East Rand, transforming young lives into skilled economic contributors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {humanCapitalHoldings.map(holding => (
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
            <span className="text-xs uppercase tracking-widest font-bold text-afrilink-gold">Corporate Learnerships</span>
            <h3 className="font-heading text-2xl sm:text-3xl font-semibold mt-1">
              Co-Fund Accredited Youth Training
            </h3>
            <p className="text-white/70 text-sm mt-1 max-w-xl">
              Partner with Mahlori Group to fulfill your corporate B-BBEE skills spend while delivering lasting grassroots social impact.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <CTAButton variant="orange" size="md" onClick={() => onNavigate('partner')}>
              Partner With Us <ArrowRight className="w-4 h-4 ml-1" />
            </CTAButton>
            <CTAButton variant="outline-light" size="md" onClick={() => onNavigate('investments/strategic')}>
              Next: Strategic Ventures <ArrowRight className="w-4 h-4 ml-1" />
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}
