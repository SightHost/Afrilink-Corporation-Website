import React from 'react';
import { Droplet, Building2, Wrench, Shield, CheckCircle2, MapPin } from 'lucide-react';
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

export default function SectorInfrastructurePage({ onNavigate }) {
  const infraHoldings = investmentsData.filter(i => i.category === 'Infrastructure');

  const capabilities = [
    { title: 'Bulk Water Reticulation', desc: 'Engineering pipeline delivery, bulk storage reservoirs, and pump station automation for municipal districts.' },
    { title: 'Wastewater Treatment Plants', desc: 'Industrial and domestic effluent processing, biological filtration, and environmentally compliant water recycling.' },
    { title: 'Civic & Social Infrastructure', desc: 'Schools, healthcare clinic structures, and essential municipal civil engineering built to rigorous SANS standards.' },
    { title: 'Public-Private Partnerships (PPP)', desc: 'Structurally sound concession models delivering reliable utility infrastructure alongside local authorities.' },
  ];

  return (
    <div className="min-h-screen bg-afrilink-surface">
      {/* Hero */}
      <div className="relative pt-36 pb-20 lg:pt-44 lg:pb-24 bg-afrilink-navy overflow-hidden">
        <div className="absolute inset-0 bg-ndebele-pattern opacity-40" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-afrilink-orange/15 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="eyebrow mb-4">Investment Sector Tag: Infrastructure & Civils</div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[68px] leading-[1.1] font-semibold text-white mb-4">
            Infrastructure, Water & <span className="text-afrilink-gold">Civic Engineering</span>
          </h1>
          <p className="text-white/80 text-lg sm:text-xl font-light max-w-3xl leading-relaxed mb-8">
            Addressing Southern Africa’s pressing water security, bulk reticulation, and civic infrastructure deficits through disciplined project engineering, municipal partnerships, and sustainable delivery.
          </p>

          <div className="flex flex-wrap gap-4">
            <CTAButton variant="orange" size="md" onClick={() => onNavigate('partner')}>
              Submit Infrastructure Brief
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
        activeRoute="investments/infrastructure"
        onNavigate={onNavigate}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Engineering Capabilities Grid */}
        <div className="mb-20">
          <div className="max-w-2xl mb-10">
            <span className="text-xs uppercase tracking-widest font-bold text-afrilink-orange">Core Competencies</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-afrilink-fg mt-1">
              Civil Delivery & Water Security
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((c, i) => (
              <div key={i} className="bg-afrilink-surface rounded-xl p-6 border border-afrilink-grey-light shadow-card hover:shadow-card-hover transition-all">
                <div className="w-10 h-10 rounded-lg bg-afrilink-orange/10 flex items-center justify-center text-afrilink-orange mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-afrilink-fg mb-2">{c.title}</h3>
                <p className="text-afrilink-fg-60 text-xs sm:text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Holding */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-afrilink-orange">Portfolio Company</span>
              <h2 className="font-heading text-3xl font-semibold text-afrilink-fg mt-1">
                Afrilink Buildings & Civils
              </h2>
            </div>
            <p className="text-afrilink-fg-60 text-sm max-w-md">
              Our flagship civil engineering contractor delivering essential public assets across South Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {infraHoldings.map(holding => (
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
            <span className="text-xs uppercase tracking-widest font-bold text-afrilink-gold">Municipal & DFI Partners</span>
            <h3 className="font-heading text-2xl sm:text-3xl font-semibold mt-1">
              Partner on Civil Megaprojects
            </h3>
            <p className="text-white/70 text-sm mt-1 max-w-xl">
              Collaborate on turnkey water, civic construction, and municipal infrastructure concessions.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <CTAButton variant="orange" size="md" onClick={() => onNavigate('partner')}>
              Partner With Us
            </CTAButton>
            <CTAButton variant="outline-light" size="md" onClick={() => onNavigate('investments/digital')}>
              Next: Digital Engineering
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}
