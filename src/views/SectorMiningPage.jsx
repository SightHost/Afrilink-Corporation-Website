import React from 'react';
import { Pickaxe, Shield, Globe, TrendingUp, ArrowRight, CheckCircle2, MapPin, Award } from 'lucide-react';
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

export default function SectorMiningPage({ onNavigate }) {
  const miningHoldings = investmentsData.filter(i => i.category === 'Mining');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative pt-36 pb-20 lg:pt-44 lg:pb-24 bg-afrilink-navy overflow-hidden">
        <div className="absolute inset-0 bg-ndebele-pattern opacity-40" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-afrilink-orange/15 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="eyebrow mb-4">Investment Sector Tag: Mining & Commodities</div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[68px] leading-[1.1] font-semibold text-white mb-4">
            Mining & <span className="text-afrilink-gold">Strategic Resources</span>
          </h1>
          <p className="text-white/80 text-lg sm:text-xl font-light max-w-3xl leading-relaxed mb-8">
            Capitalizing on Africa's richest geological formations across Botswana and South Africa. Our assets encompass precious metals (gold, diamonds), battery minerals (manganese), and heavy industrial commodities (chrome, vanadium).
          </p>

          <div className="flex flex-wrap gap-4">
            <CTAButton variant="orange" size="md" onClick={() => onNavigate('partner')}>
              Offtake & JV Syndication Brief <ArrowRight className="w-4 h-4 ml-1" />
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
        activeRoute="investments/mining"
        onNavigate={onNavigate}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Sector Thesis Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          <div className="bg-white rounded-2xl p-8 border border-afrilink-grey-light shadow-card">
            <div className="w-12 h-12 rounded-xl bg-afrilink-orange/10 flex items-center justify-center text-afrilink-orange mb-6">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-afrilink-navy mb-3">
              Dual-Jurisdiction Strength
            </h3>
            <p className="text-afrilink-navy-60 text-sm leading-relaxed">
              Operating within the world-class, sovereign rule-of-law environment of Botswana, combined with premier mineral endowments and community royalty frameworks in South Africa.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-afrilink-grey-light shadow-card">
            <div className="w-12 h-12 rounded-xl bg-afrilink-navy/10 flex items-center justify-center text-afrilink-navy mb-6">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-afrilink-navy mb-3">
              Critical Energy Transition Minerals
            </h3>
            <p className="text-afrilink-navy-60 text-sm leading-relaxed">
              Targeted focus on battery-grade manganese, industrial vanadium, and high-purity chrome essential for global renewable infrastructure and specialty alloys.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-afrilink-grey-light shadow-card">
            <div className="w-12 h-12 rounded-xl bg-afrilink-gold/20 flex items-center justify-center text-afrilink-navy mb-6">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-afrilink-navy mb-3">
              Broad-Based Community Equity
            </h3>
            <p className="text-afrilink-navy-60 text-sm leading-relaxed">
              Every mining concession operates in direct alignment with host community trusts, securing durable social license to operate, local employment, and shared prosperity.
            </p>
          </div>
        </div>

        {/* Holdings in this Sector */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-afrilink-orange">Active Platforms</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-afrilink-navy mt-1">
                Mining Portfolio Holdings
              </h2>
            </div>
            <p className="text-afrilink-navy-60 text-sm max-w-md">
              Select an asset below to review detailed concession factsheets, operational stages, and investment tranches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {miningHoldings.map(holding => (
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
            <span className="text-xs uppercase tracking-widest font-bold text-afrilink-gold">Syndication & Offtake</span>
            <h3 className="font-heading text-2xl sm:text-3xl font-semibold mt-1">
              Explore Mining Co-Investment
            </h3>
            <p className="text-white/70 text-sm mt-1 max-w-xl">
              We welcome institutional exploration capital, drilling joint-ventures, and industrial commodity offtakers.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <CTAButton variant="orange" size="md" onClick={() => onNavigate('partner')}>
              Partner With Us <ArrowRight className="w-4 h-4 ml-1" />
            </CTAButton>
            <CTAButton variant="outline-light" size="md" onClick={() => onNavigate('investments/infrastructure')}>
              Next: Infrastructure <ArrowRight className="w-4 h-4 ml-1" />
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}
