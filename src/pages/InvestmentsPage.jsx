import React, { useState } from 'react';
import { ArrowRight, Filter } from 'lucide-react';
import InvestmentCard from '../components/InvestmentCard';
import InvestmentTemplate from '../components/InvestmentTemplate';
import CTAButton from '../components/CTAButton';
import { investmentsData, focusAreasData } from '../data/investmentsData';

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

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="relative pt-36 pb-16 lg:pt-40 lg:pb-20 bg-afrilink-navy overflow-hidden">
        <div className="absolute inset-0 bg-ndebele-pattern opacity-40" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-afrilink-orange/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="eyebrow mb-4">Investment Portfolio</div>
          <h1 className="font-heading text-5xl lg:text-[70px] leading-[1.1] font-semibold text-white mb-4">
            Holdings &<br />
            <span className="text-afrilink-gold">Ventures</span>
          </h1>
          <p className="text-white/75 text-lg lg:text-[21px] leading-[1.6] font-medium max-w-2xl mb-8">
            Afrilink Corporation's diversified investment portfolio spans mining and commodities, infrastructure and civils, digital engineering, and human capital development across South Africa, Botswana and strategic global markets.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-4">
            {[
              { label: 'Active Holdings', value: '6+' },
              { label: 'Countries', value: '2' },
              { label: 'Sectors', value: '4' },
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

      {/* Focus Areas */}
      {focusAreasData && focusAreasData.length > 0 && (
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="font-heading text-3xl lg:text-[42px] leading-[1.2] font-semibold text-afrilink-navy mb-8">Core Investment Pillars</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {focusAreasData.map((area, i) => (
                <div key={i} className="bg-white rounded-lg p-6 border border-afrilink-grey-light shadow-card hover:shadow-card-hover hover:border-afrilink-orange/30 transition-all">
                  <div className="text-afrilink-orange font-heading font-semibold text-3xl mb-2">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="font-heading font-semibold text-afrilink-navy text-xl mb-2">{area.title}</h3>
                  <p className="text-afrilink-navy-60 text-base leading-relaxed">{area.summary || area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Portfolio */}
      <section className="bg-afrilink-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Sector Filter */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <Filter className="w-4 h-4 text-afrilink-navy-60" />
            {SECTORS.map(sector => (
              <button
                key={sector}
                onClick={() => setActiveSector(sector)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
                  activeSector === sector
                    ? 'bg-afrilink-orange text-white border-afrilink-orange shadow-card'
                    : 'bg-white text-afrilink-navy border-afrilink-grey hover:border-afrilink-orange hover:text-afrilink-orange'
                }`}
              >
                {sector}
              </button>
            ))}
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
            Submit Partnership Brief <ArrowRight className="w-4 h-4" />
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
