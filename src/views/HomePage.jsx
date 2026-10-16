import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Globe, TrendingUp, Shield, Users, Building2, Zap, Leaf, BookOpen, ArrowUpRight } from 'lucide-react';
import AfricaMap from '../components/AfricaMap';
import StatCounter from '../components/StatCounter';
import InvestmentCard from '../components/InvestmentCard';
import CTAButton from '../components/CTAButton';
import { investmentsData, focusAreasData } from '../data/investmentsData';
import { milestonesData } from '../data/corporateData';
import { withBase } from '../lib/paths';

function HeroSection({ onNavigate }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-afrilink-ink">
      {/* Background with slight cinematic pan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src={withBase('/hero-bg.webp')}
          alt="Afrilink Pan-African Heritage and Insignia"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center animate-hero-pan select-none"
        />
        {/* Directional gradients: ensures pristine text readability while highlighting the bronze insignia */}
        <div className="absolute inset-0 bg-gradient-to-r from-afrilink-ink/70 via-afrilink-ink/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-afrilink-ink to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-afrilink-ink/50 to-transparent" />
        {/* Subtle brand orange ambient glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-afrilink-orange/15 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 lg:pt-44 pb-16">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className={`inline-flex items-center gap-2.5 mb-8 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-afrilink-orange animate-pulse" />
            <span className="text-afrilink-gold text-[13px] font-semibold">
              South African Investment Holding · Est. 1985
            </span>
          </div>

          {/* Main Headline */}
          <h1 className={`font-heading text-5xl lg:text-[70px] font-semibold leading-[1.1] mb-8 transition-all duration-700 delay-100 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <span className="text-white">Making</span>
            <br />
            <span className="text-afrilink-gold">Diaspora</span>
            <br />
            <span className="text-white">Work.</span>
          </h1>

          {/* Sub-copy */}
          <p className={`text-white/75 text-lg lg:text-[21px] leading-[1.6] font-medium max-w-2xl mb-10 transition-all duration-700 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Afrilink Corporation (Pty) Ltd is a broad-based Black-owned South African investment holding company driving economic empowerment, pan-African resource development, and sustainable business growth across the continent and diaspora corridors.
          </p>

          {/* CTA Row */}
          <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all duration-700 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <CTAButton variant="orange" size="lg" onClick={() => onNavigate('partner')}>
              Partner With Us
            </CTAButton>
            <CTAButton variant="outline-light" size="lg" onClick={() => onNavigate('investments')}>
              Explore Holdings
            </CTAButton>
          </div>

          {/* Trust Badges */}
          <div className={`mt-12 flex flex-wrap gap-4 transition-all duration-700 delay-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            {['B-BBEE Level 1', 'King IV Compliant', 'CIPC Registered', 'COIDA Good Standing'].map(badge => (
              <div key={badge} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 border border-white/15 text-xs text-white/80 font-semibold">
                <Shield className="w-3 h-3 text-afrilink-orange" />
                {badge}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex items-center gap-2 text-white/50 text-xs animate-bounce">
          <ChevronDown className="w-4 h-4" />
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}

function StatBarSection() {
  return (
    <section className="bg-afrilink-ink py-16">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <StatCounter />
      </div>
    </section>
  );
}

function FocusAreasSection({ onNavigate }) {
  const iconMap = {
    'Mining & Resources': TrendingUp,
    'Infrastructure & Civils': Building2,
    'Digital & Technology': Zap,
    'Human Capital & Training': BookOpen,
    'Agriculture & Food Security': Leaf,
  };

  const areas = focusAreasData || [
    { title: 'Mining & Resources', icon: 'mining', description: 'Strategic mineral tenure, prospecting and offtake across Botswana and South Africa.', color: '#F37121' },
    { title: 'Infrastructure & Civils', icon: 'infra', description: 'Water, sanitation, civic engineering and essential public infrastructure delivery.', color: '#FFD177' },
    { title: 'Digital & Technology', icon: 'digital', description: 'UX engineering, QA assurance and enterprise digital transformation through Strider Digital.', color: '#5A5E6E' },
    { title: 'Human Capital & Training', icon: 'human', description: 'Skills development, learnerships and workforce transformation through Mahlori Group.', color: '#2B3044' },
  ];

  return (
    <section className="py-20 lg:py-28 bg-afrilink-surface relative">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="eyebrow mb-4">
            <span className="w-8 h-px bg-afrilink-orange" />
            Core Focus Areas
            <span className="w-8 h-px bg-afrilink-orange" />
          </div>
          <h2 className="font-heading text-3xl lg:text-[42px] leading-[1.2] font-semibold text-afrilink-fg">
            Where Afrilink <span className="text-afrilink-orange">Creates Value</span>
          </h2>
          <p className="mt-4 text-afrilink-fg-60 max-w-2xl mx-auto text-[17px] leading-[1.7]">
            Diversified across high-impact sectors driving Africa's sovereign economic transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area, i) => {
            const Icon = iconMap[area.title] || TrendingUp;
            return (
              <div key={area.title}
                className="group bg-afrilink-surface border border-afrilink-grey-light shadow-card hover:shadow-card-hover rounded-lg p-6 hover:border-afrilink-orange/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => onNavigate('investments')}
              >
                <div className="w-12 h-12 rounded-md flex items-center justify-center mb-5 bg-afrilink-butter text-afrilink-orange"
                  style={area.color ? { background: `${area.color}20`, border: `1px solid ${area.color}40` } : undefined}>
                  <Icon className="w-6 h-6 text-afrilink-orange" style={area.color ? { color: area.color } : undefined} />
                </div>
                <h3 className="font-heading font-semibold text-afrilink-fg text-xl mb-2 group-hover:text-afrilink-orange transition-colors">
                  {area.title}
                </h3>
                <p className="text-afrilink-fg-60 text-[15px] leading-[1.7]">
                  {area.summary || area.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-afrilink-orange opacity-0 group-hover:opacity-100 transition-opacity">
                  View Holdings <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FootprintSection({ onNavigate }) {
  return (
    <section className="py-20 lg:py-28 bg-afrilink-cream relative overflow-hidden">
      <div className="absolute inset-0 bg-ndebele-pattern" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Pinned to the top so it stays put while the map's details panel changes height */}
          <div className="lg:sticky lg:top-28">
            <div className="eyebrow mb-4">
              <span className="w-8 h-px bg-afrilink-orange" />
              Geographic Footprint
            </div>
            <h2 className="font-heading text-3xl lg:text-[42px] leading-[1.2] font-semibold text-afrilink-fg mb-6">
              Pan-African Reach,<br />
              <span className="text-afrilink-orange">Diaspora Connected</span>
            </h2>
            <p className="text-afrilink-fg-80 text-[17px] leading-[1.7] mb-8">
              Headquartered in Sandton, Johannesburg, Afrilink Corporation operates active investment platforms in South Africa and Botswana, with strategic partnerships and diaspora capital conduits extending to the United Kingdom, Europe, and North America.
            </p>
            <div className="space-y-3">
              {[
                { flag: '🇿🇦', label: 'South Africa — Head Office, Mining & Civils', primary: true },
                { flag: '🇧🇼', label: 'Botswana — Mining Exploration & Tenure', primary: true },
                { flag: '🇬🇧', label: 'United Kingdom — Diaspora Capital & Partnerships', primary: false },
                { flag: '🌍', label: 'Europe & North America — Diaspora Conduits', primary: false },
              ].map(loc => (
                <div key={loc.label} className={`flex items-center gap-3 p-3 rounded-md ${loc.primary ? 'bg-afrilink-surface border border-afrilink-grey-light shadow-card' : 'opacity-70'}`}>
                  <span className="text-xl">{loc.flag}</span>
                  <span className="text-sm font-medium text-afrilink-fg-80">{loc.label}</span>
                  {loc.primary && <span className="ml-auto text-[11px] font-semibold text-afrilink-fg bg-afrilink-butter px-2 py-0.5 rounded">Active</span>}
                </div>
              ))}
            </div>
            <div className="mt-8">
              <CTAButton variant="orange" size="md" onClick={() => onNavigate('about')}>
                Our Story
              </CTAButton>
            </div>
          </div>
          <div className="relative">
            <AfricaMap onNavigate={onNavigate} />
          </div>
        </div>
      </div>
    </section>
  );
}

function InvestmentsPreview({ onNavigate }) {
  return (
    <section className="py-20 lg:py-28 bg-afrilink-surface relative">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="eyebrow mb-4">
              <span className="w-8 h-px bg-afrilink-orange" />
              Investment Portfolio
            </div>
            <h2 className="font-heading text-3xl lg:text-[42px] leading-[1.2] font-semibold text-afrilink-fg">
              Holdings & <span className="text-afrilink-orange">Ventures</span>
            </h2>
          </div>
          <CTAButton variant="outline" size="sm" onClick={() => onNavigate('investments')}>
            All Holdings
          </CTAButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {investmentsData.slice(0, 6).map(inv => (
            <InvestmentCard
              key={inv.id}
              investment={inv}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MilestonesSection() {
  return (
    <section className="py-20 lg:py-28 bg-afrilink-cream relative">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="eyebrow mb-4">
            <span className="w-8 h-px bg-afrilink-orange" />
            Corporate Timeline
            <span className="w-8 h-px bg-afrilink-orange" />
          </div>
          <h2 className="font-heading text-3xl lg:text-[42px] leading-[1.2] font-semibold text-afrilink-fg">
            39 Years of <span className="text-afrilink-orange">Leadership</span>
          </h2>
        </div>

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-afrilink-orange/60 via-afrilink-grey to-transparent hidden lg:block" />

          <div className="space-y-8 lg:space-y-0">
            {(milestonesData || []).slice(0, 6).map((m, i) => (
              <div key={m.year + i} className={`lg:flex items-center gap-8 lg:gap-0 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                <div className={`lg:w-1/2 ${i % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12'}`}>
                  <div className="bg-afrilink-surface rounded-lg p-5 border border-afrilink-grey-light shadow-card hover:shadow-card-hover hover:border-afrilink-orange/30 transition-all">
                    <div className="text-afrilink-orange font-heading font-semibold text-2xl mb-1">{m.year}</div>
                    <div className="text-afrilink-fg font-semibold text-lg mb-1">{m.title}</div>
                    <div className="text-afrilink-fg-60 text-[15px] leading-[1.7]">{m.description}</div>
                  </div>
                </div>
                {/* Center dot */}
                <div className="hidden lg:flex w-0 items-center justify-center relative">
                  <div className="w-3.5 h-3.5 rounded-full bg-afrilink-orange border-2 border-afrilink-cream glow-orange z-10" />
                </div>
                <div className="lg:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnerCTA({ onNavigate }) {
  return (
    <section className="py-24 lg:py-32 bg-afrilink-navy relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-ndebele-pattern opacity-60" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-afrilink-orange/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-afrilink-gold/30 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-afrilink-orange/10 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 mb-6 text-afrilink-gold text-[13px] font-semibold">
          <span className="w-8 h-px bg-afrilink-gold" />
          New Business & Partnerships
          <span className="w-8 h-px bg-afrilink-gold" />
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl lg:text-[56px] leading-[1.15] font-semibold text-white mb-6">
          Ready to Make <br />
          <span className="text-afrilink-gold">Diaspora Work</span>?
        </h2>
        <p className="text-white/75 text-lg leading-[1.7] mb-10 max-w-2xl mx-auto">
          Whether you represent institutional capital, a mining joint-venture consortium, a development finance institution, or a diaspora fund — Afrilink Corporation has structured pathways to collaborate. Submit a partnership brief and our executive team will respond within 48 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CTAButton variant="orange" size="xl" onClick={() => onNavigate('partner')}>
            Submit Partnership Brief
          </CTAButton>
          <CTAButton variant="outline-light" size="xl" onClick={() => onNavigate('contact')}>
            Get In Touch
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

export default function HomePage({ onNavigate }) {
  return (
    <div>
      <HeroSection onNavigate={onNavigate} />
      <StatBarSection />
      <FocusAreasSection onNavigate={onNavigate} />
      <FootprintSection onNavigate={onNavigate} />
      <InvestmentsPreview onNavigate={onNavigate} />
      <MilestonesSection />
      <PartnerCTA onNavigate={onNavigate} />
    </div>
  );
}
