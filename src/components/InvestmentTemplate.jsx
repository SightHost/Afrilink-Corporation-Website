import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle, ShieldCheck, MapPin, Tag, Share2, Download } from 'lucide-react';
import CTAButton from './CTAButton';

export default function InvestmentTemplate({
  investment,
  onNavigate,
  onOpenLightbox
}) {
  const [copied, setCopied] = useState(false);

  if (!investment) return null;

  const {
    name,
    sector,
    country,
    flag,
    heroImage,
    galleryImages,
    oneLiner,
    description,
    facts,
    opportunity,
    metrics,
    slug,
    website
  } = investment;

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-afrilink-surface text-afrilink-fg">
      {/* Navy hero banner (top padding clears the ~94px white header) */}
      <section className="bg-afrilink-navy text-white pt-[130px] pb-14">
        {/* Back breadcrumb bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <button
            onClick={() => onNavigate?.('investments')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-afrilink-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Investments</span>
          </button>
        </div>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-lg overflow-hidden bg-afrilink-ink min-h-[420px] md:min-h-[500px] flex flex-col justify-end p-6 md:p-12">
            {/* Hero background image */}
            <img
              src={heroImage}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover object-center brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-afrilink-navy via-afrilink-navy/60 to-transparent" />

            {/* Floating tags */}
            <div className="relative z-10 flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-afrilink-orange text-white text-[13px] font-semibold">
                <Tag className="w-3.5 h-3.5" />
                {sector}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-afrilink-navy/70 backdrop-blur-md text-[13px] font-semibold text-white border border-white/20">
                <span className="text-base">{flag}</span>
                <span>{country}</span>
              </span>
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white hover:text-afrilink-navy text-[13px] font-semibold text-white border border-white/30 transition-colors"
                >
                  <span>Visit Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Heading */}
            <div className="relative z-10 max-w-4xl">
              <h1 className="font-heading font-semibold text-4xl sm:text-5xl lg:text-[70px] text-white mb-4 leading-[1.1]">
                {name}
              </h1>
              <p className="text-lg lg:text-[21px] text-white/75 font-medium max-w-3xl leading-[1.6] mb-6">
                {oneLiner}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <CTAButton
                  variant="orange"
                  size="md"
                  onClick={() => onNavigate?.(`partner?interest=${slug}`)}
                >
                  Discuss This Opportunity
                </CTAButton>
                <button
                  onClick={handleShare}
                  className="px-[23px] py-[11px] rounded-full bg-transparent hover:bg-white hover:text-afrilink-navy text-base font-semibold text-white border border-white/60 transition-all flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4 text-afrilink-gold" />
                  <span>{copied ? 'Link Copied!' : 'Share Portfolio Asset'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Band if present */}
      {metrics && metrics.length > 0 && (
        <section className="bg-afrilink-cream py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-lg bg-afrilink-surface border border-afrilink-grey-light shadow-card">
              {metrics.map((m, idx) => (
                <div key={idx} className="text-center sm:text-left sm:border-r last:border-r-0 border-afrilink-grey-light sm:px-4">
                  <div className="text-[13px] text-afrilink-orange font-semibold mb-1">
                    {m.label}
                  </div>
                  <div className="text-xl sm:text-2xl font-heading font-semibold text-afrilink-fg">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content Layout: Overview & Key Facts Side by Side */}
      <section className="bg-afrilink-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Deep-dive Article (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-afrilink-surface rounded-lg p-8 border border-afrilink-grey-light shadow-card">
                <h2 className="font-heading font-semibold text-2xl text-afrilink-fg mb-6 flex items-center gap-3">
                  <span className="w-3 h-3 rounded-sm bg-afrilink-orange" />
                  Operational Overview & Strategic Thesis
                </h2>
                <div className="prose max-w-none text-afrilink-fg-80 leading-[1.7] space-y-4 text-[17px] whitespace-pre-line">
                  {description}
                </div>
              </div>

              {/* Opportunity for Partners Section */}
              {opportunity && (
                <div className="bg-afrilink-cream rounded-lg p-8 border border-afrilink-orange/30 shadow-card relative overflow-hidden">
                  <div className="eyebrow mb-3">
                    <ShieldCheck className="w-4 h-4" />
                    Partnership Syndicate Brief
                  </div>
                  <h3 className="font-heading font-semibold text-2xl text-afrilink-fg mb-4">
                    {opportunity.headline}
                  </h3>
                  <p className="text-base text-afrilink-fg-80 leading-[1.7] mb-6">
                    {opportunity.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {opportunity.points.map((pt, i) => (
                      <div key={i} className="flex items-start gap-3 text-base text-afrilink-fg-80">
                        <div className="w-5 h-5 rounded-full bg-afrilink-orange/10 text-afrilink-orange flex items-center justify-center shrink-0 mt-1 border border-afrilink-orange/40">
                          <CheckCircle className="w-3.5 h-3.5" />
                        </div>
                        <span className="leading-relaxed">{pt}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-afrilink-grey">
                    <div className="text-sm text-afrilink-fg-60">
                      Direct access to technical geological files & NDA briefings
                    </div>
                    <CTAButton
                      variant="orange"
                      size="sm"
                      onClick={() => onNavigate?.(`partner?interest=${slug}`)}
                    >
                      Submit Syndicate Brief
                    </CTAButton>
                  </div>
                </div>
              )}
            </div>

            {/* Key Facts Panel Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-afrilink-surface rounded-lg p-6 border border-afrilink-grey-light sticky top-28 shadow-card">
                <h3 className="font-heading font-semibold text-xl text-afrilink-fg mb-4 pb-3 border-b border-afrilink-grey-light flex items-center justify-between">
                  <span>Key Facts & Parameters</span>
                  <span className="text-[13px] text-afrilink-orange font-semibold font-sans">Verified Profile</span>
                </h3>

                <div className="space-y-4">
                  {facts?.map((f, idx) => (
                    <div key={idx} className="pb-3 border-b border-afrilink-grey-light last:border-b-0">
                      <div className="text-[13px] text-afrilink-fg-60 mb-0.5">
                        {f.label}
                      </div>
                      <div className="text-base font-semibold text-afrilink-fg">
                        {f.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-afrilink-grey-light">
                  <CTAButton
                    variant="outline"
                    size="sm"
                    className="w-full text-center"
                    onClick={() => onNavigate?.(`partner?interest=${slug}`)}
                  >
                    Request Full Asset Deck
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {galleryImages && galleryImages.length > 0 && (
        <section className="bg-afrilink-cream py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="eyebrow">Visual Portfolio</div>
                <h3 className="font-heading font-semibold text-2xl lg:text-3xl text-afrilink-fg">Operational Facilities & Assets</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  onClick={() => onOpenLightbox?.({ image: img, title: `${name} — Facility Asset 0${i + 1}` })}
                  className="group relative rounded-lg overflow-hidden aspect-[4/3] bg-afrilink-surface cursor-pointer border border-afrilink-grey-light shadow-card hover:shadow-card-hover hover:border-afrilink-orange/50 transition-all duration-300"
                >
                  <img
                    src={img}
                    alt={`${name} asset view`}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-afrilink-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-sm font-semibold text-white flex items-center gap-1.5">
                      <span>Enlarge Image</span>
                      <ExternalLink className="w-3.5 h-3.5 text-afrilink-gold" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom Conversion Banner */}
      <section className="bg-afrilink-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-afrilink-orange p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-card-hover">
            <div className="max-w-2xl text-center md:text-left">
              <div className="text-[13px] font-semibold text-afrilink-gold mb-2">Ready to explore terms?</div>
              <h3 className="font-heading font-semibold text-2xl md:text-3xl leading-[1.2]">
                Initiate a confidential partnership dialogue for {investment.shortName || name}
              </h3>
              <p className="text-white/90 text-base mt-2">
                Our investment committee reviews investor briefs within 3 business days.
              </p>
            </div>
            <button
              onClick={() => onNavigate?.(`partner?interest=${slug}`)}
              className="px-8 py-3.5 rounded-full bg-afrilink-navy hover:bg-afrilink-ink text-white font-semibold text-base transition-all shadow-card-hover hover:-translate-y-0.5 shrink-0 flex items-center gap-2 group"
            >
              <span>Complete Brief Form</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
