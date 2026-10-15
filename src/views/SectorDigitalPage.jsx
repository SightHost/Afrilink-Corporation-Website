import React from 'react';
import { Cpu, Users, Award, ShieldCheck, ArrowRight, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
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

export default function SectorDigitalPage({ onNavigate }) {
  const digitalHoldings = investmentsData.filter(i => i.category === 'Digital');

  const stats = [
    { label: 'Client Net Promoter Score', value: '9.6 / 10', desc: 'Tier-1 Banking Average' },
    { label: 'Talent Retention Rate', value: '94%', desc: 'Industry-leading tenure' },
    { label: 'Dedicated Squads Deployed', value: '45+', desc: 'Across SA & UK fintech' },
    { label: 'Disciplines Covered', value: 'UX & QA', desc: 'Design, automation, testing' },
  ];

  return (
    <div className="min-h-screen bg-afrilink-surface">
      {/* Hero */}
      <div className="relative pt-36 pb-20 lg:pt-44 lg:pb-24 bg-afrilink-navy overflow-hidden">
        <div className="absolute inset-0 bg-ndebele-pattern opacity-40" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-afrilink-gold/15 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="eyebrow mb-4">Investment Sector Tag: Digital Engineering & Tech</div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[68px] leading-[1.1] font-semibold text-white mb-4">
            Digital Engineering & <span className="text-afrilink-gold">Tech Talent</span>
          </h1>
          <p className="text-white/80 text-lg sm:text-xl font-light max-w-3xl leading-relaxed mb-8">
            Deploying high-caliber UX design, automated QA, and software engineering squads to South Africa’s leading retail and investment banks, insurance giants, and multinational fintech institutions.
          </p>

          <div className="flex flex-wrap gap-4">
            <CTAButton variant="orange" size="md" onClick={() => onNavigate('partner')}>
              Deploy Digital Squads <ArrowRight className="w-4 h-4 ml-1" />
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
        activeRoute="investments/digital"
        onNavigate={onNavigate}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-20">
          {stats.map((s, idx) => (
            <div key={idx} className="bg-afrilink-surface rounded-2xl p-6 border border-afrilink-grey-light shadow-card text-center hover:shadow-card-hover transition-all">
              <span className="text-xs text-afrilink-fg-60 font-medium">{s.label}</span>
              <div className="font-heading text-3xl sm:text-4xl font-bold text-afrilink-orange mt-2 mb-1">{s.value}</div>
              <div className="text-xs text-afrilink-fg-80 font-semibold">{s.desc}</div>
            </div>
          ))}
        </div>

        {/* Digital Value Proposition */}
        <div className="bg-gradient-to-br from-afrilink-cream to-afrilink-surface rounded-2xl p-8 sm:p-12 border border-afrilink-orange/20 mb-20">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest font-bold text-afrilink-orange">Solving The Talent Deficit</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-afrilink-fg mt-1 mb-4">
              Bank-Grade Quality Assurance & UX Design
            </h2>
            <p className="text-afrilink-fg-80 text-base leading-relaxed mb-6">
              Major financial institutions face an acute deficit of senior, autonomous digital engineering talent. Through <strong>Strider Digital</strong>, Afrilink Corporation provides structured placement, bespoke squad models, and continuous talent care. With an extraordinary client Net Promoter Score exceeding 9.6/10, Strider is the trusted talent engine powering South Africa's modern banking platforms.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-afrilink-fg">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-afrilink-orange shrink-0" />
                <span>Automated regression testing frameworks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-afrilink-orange shrink-0" />
                <span>Enterprise Design Systems & UX Research</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-afrilink-orange shrink-0" />
                <span>Cross-border diaspora tech talent channels</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-afrilink-orange shrink-0" />
                <span>High-retention talent care and mentorship</span>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Holding */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-afrilink-orange">Portfolio Company</span>
              <h2 className="font-heading text-3xl font-semibold text-afrilink-fg mt-1">
                Strider Digital
              </h2>
            </div>
            <p className="text-afrilink-fg-60 text-sm max-w-md">
              Specialist digital product engineering partner trusted by tier-1 banks and insurance corporations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {digitalHoldings.map(holding => (
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
            <span className="text-xs uppercase tracking-widest font-bold text-afrilink-gold">Talent & Scale</span>
            <h3 className="font-heading text-2xl sm:text-3xl font-semibold mt-1">
              Accelerate Your Digital Roadmap
            </h3>
            <p className="text-white/70 text-sm mt-1 max-w-xl">
              Partner with Strider Digital for vetted UX, QA, and cloud engineering squads ready for immediate deployment.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <CTAButton variant="orange" size="md" onClick={() => onNavigate('partner')}>
              Partner With Us <ArrowRight className="w-4 h-4 ml-1" />
            </CTAButton>
            <CTAButton variant="outline-light" size="md" onClick={() => onNavigate('investments/human-capital')}>
              Next: Human Capital <ArrowRight className="w-4 h-4 ml-1" />
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}
