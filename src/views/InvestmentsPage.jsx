import React, { useState } from 'react';
import { ArrowRight, Filter, Globe, Pickaxe, Droplet, Cpu, BookOpen, Factory, ShieldCheck, CheckCircle2 } from 'lucide-react';
import SubNavPill from '../components/SubNavPill';
import InvestmentCard from '../components/InvestmentCard';
import InvestmentTemplate from '../components/InvestmentTemplate';
import CTAButton from '../components/CTAButton';
import { investmentsData, focusAreasData } from '../data/investmentsData';

const SECTOR_NAV_ITEMS = [
  { label: 'All Holdings', route: 'investments' },
  { label: 'Mining & Commodities', route: 'investments/mining', badge: '2 Holdings' },
  { label: 'Infrastructure & Civils', route: 'investments/infrastructure', badge: 'Civils' },
  { label: 'Digital Engineering', route: 'investments/digital', badge: 'Tech' },
  { label: 'Human Capital', route: 'investments/human-capital', badge: 'Academy' },
  { label: 'Strategic Ventures', route: 'investments/strategic', badge: 'AI & EdTech' },
];

const SECTORS = ['All', 'Mining', 'Infrastructure', 'Digital', 'Human Capital', 'Strategic'];

export default function InvestmentsPage({ currentSlug, onNavigate }) {
  const [activeSector, setActiveSector] = useState('All');

  // If a specific investment is selected
  if (currentSlug) {
    const inv = investmentsData.find(i => i.slug === currentSlug);
    if (inv) {
      return (
        <InvestmentTemplate
          investment={inv}
          onNavigate={onNavigate}
          onBack={() => onNavigate('investments')}
        />
      );
    }
  }

  const filtered = activeSector === 'All'
    ? investmentsData
    : investmentsData.filter(inv =>
        inv.category?.toLowerCase().includes(activeSector.toLowerCase()) ||
        inv.sector?.toLowerCase().includes(activeSector.toLowerCase())
      );

  const sectorFeatureCards = [
    {
      title: 'Mining & Commodities',
      route: 'investments/mining',
      icon: Pickaxe,
      count: '2 Holdings',
      desc: 'Gold, diamonds, and manganese prospecting rights in Botswana alongside South African chrome & vanadium.',
    },
    {
      title: 'Infrastructure & Civils',
      route: 'investments/infrastructure',
      icon: Droplet,
      count: 'Civic Assets',
      desc: 'Bulk municipal water reticulation, wastewater treatment plants, and public civic engineering.',
    },
    {
      title: 'Digital Engineering',
      route: 'investments/digital',
      icon: Cpu,
      count: '9.6/10 NPS',
      desc: 'Strider Digital tier-1 UX and automated QA squads deploying to leading banks and fintech giants.',
    },
    {
      title: 'Human Capital Academy',
      route: 'investments/human-capital',
      icon: BookOpen,
      count: 'Daveyton Hub',
      desc: 'Mahlori Group accredited vocational education, artisan learnerships, and township youth empowerment.',
    },
    {
      title: 'Strategic Ventures & AI',
      route: 'investments/strategic',
      icon: Factory,
      count: 'Global Alliances',
      desc: 'German ELO AI software alliance, University of Botswana EdTech MOU, and Hindsight cloud accounting software.',
    },
  ];

  return (
    <div className="min-h-screen bg-afrilink-surface">
      {/* Page Header */}
      <div className="relative pt-36 pb-16 lg:pt-40 lg:pb-20 bg-afrilink-navy overflow-hidden">
        <div className="absolute inset-0 bg-ndebele-pattern opacity-40" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-afrilink-orange/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="eyebrow mb-4">Investment Portfolio</div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[70px] leading-[1.1] font-semibold text-white mb-4">
            Holdings & <span className="text-afrilink-gold">Ventures</span>
          </h1>
          <p className="text-white/75 text-lg lg:text-[21px] leading-[1.6] font-medium max-w-2xl mb-8">
            Afrilink Corporation's diversified investment portfolio spans mining and commodities, infrastructure and civils, digital engineering, and human capital development across South Africa, Botswana and strategic global markets.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-4">
            {[
              { label: 'Active Holdings', value: '6+' },
              { label: 'Countries', value: '2' },
              { label: 'Sectors', value: '5' },
              { label: 'Partner Opportunities', value: 'Open' },
            ].map(s => (
              <div key={s.label} className="rounded-lg px-5 py-3 bg-white/5 border border-white/15 text-center">
                <div className="font-heading font-semibold text-2xl text-afrilink-orange">{s.value}</div>
                <div className="text-[13px] font-medium text-white/75">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sibling SubNav Bar */}
      <SubNavPill
        items={SECTOR_NAV_ITEMS}
        activeRoute="investments"
        onNavigate={onNavigate}
      />

      {/* Dedicated Sector Hub Cards */}
      <section className="bg-afrilink-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-afrilink-orange">Sector Breakdown</span>
              <h2 className="font-heading text-3xl lg:text-[40px] leading-[1.2] font-semibold text-afrilink-fg mt-1">
                Explore Dedicated Sector Pages
              </h2>
            </div>
            <p className="text-afrilink-fg-60 text-sm max-w-md">
              Each sector has its own dedicated page with deep industry context, thesis, and asset factsheets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectorFeatureCards.map((sc, i) => (
              <div
                key={i}
                onClick={() => onNavigate(sc.route)}
                className="group cursor-pointer bg-afrilink-surface rounded-xl p-7 border border-afrilink-grey-light hover:border-afrilink-orange/50 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-lg bg-afrilink-orange/10 flex items-center justify-center text-afrilink-orange group-hover:bg-afrilink-orange group-hover:text-white transition-colors">
                      <sc.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-afrilink-cream text-afrilink-fg border border-afrilink-grey-light">
                      {sc.count}
                    </span>
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-afrilink-fg group-hover:text-afrilink-orange transition-colors mb-2">
                    {sc.title}
                  </h3>
                  <p className="text-afrilink-fg-60 text-sm leading-relaxed mb-4">
                    {sc.desc}
                  </p>
                </div>
                <div className="text-xs font-bold text-afrilink-orange flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>View Dedicated Sector Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Portfolio Holdings Grid */}
      <section className="bg-afrilink-cream border-t border-afrilink-grey-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-afrilink-orange">Portfolio Grid</span>
              <h2 className="font-heading text-3xl font-semibold text-afrilink-fg mt-1">
                All Investment Holdings
              </h2>
            </div>

            {/* Sector Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <Filter className="w-4 h-4 text-afrilink-fg-60 mr-1" />
              {SECTORS.map(sector => (
                <button
                  key={sector}
                  onClick={() => setActiveSector(sector)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    activeSector === sector
                      ? 'bg-afrilink-orange text-white border-afrilink-orange shadow-sm'
                      : 'bg-afrilink-surface text-afrilink-fg border-afrilink-grey hover:border-afrilink-orange hover:text-afrilink-orange'
                  }`}
                >
                  {sector}
                </button>
              ))}
            </div>
          </div>

          {/* Investment Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(inv => (
              <InvestmentCard
                key={inv.id}
                investment={inv}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Partner CTA */}
      <section className="bg-afrilink-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="text-[13px] font-semibold text-afrilink-gold mb-3">Open for Partnerships</div>
          <h2 className="font-heading text-3xl lg:text-[42px] leading-[1.2] font-semibold text-white mb-4">
            Interested in a Joint Venture?
          </h2>
          <p className="text-white/90 text-base leading-[1.7] max-w-xl mx-auto mb-8">
            Each of our investment platforms is actively structured for co-investment, offtake partnerships, DFI debt, and technical joint ventures. Submit a brief and our executive team will revert within 48 hours.
          </p>
          <CTAButton variant="outline-light" size="lg" onClick={() => onNavigate('partner')}>
            Submit Partnership Brief
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
