import React, { useState } from 'react';
import { Image, X, ExternalLink, Calendar, MapPin, Tag, Eye } from 'lucide-react';
import SubNavPill from '../components/SubNavPill';
import CTAButton from '../components/CTAButton';
import { galleryItems } from '../data/corporateData';

const ABOUT_PAGES = [
  { label: 'Company Overview & Values', route: 'about/overview' },
  { label: 'Founder & CEO Profile', route: 'about/ceo' },
  { label: 'Shareholders & Capital', route: 'about/shareholders' },
  { label: 'Corporate Gallery', route: 'about/gallery' },
];

const CATEGORIES = ['All', 'Projects', 'Events', 'Partnerships', 'Awards', 'Community'];

export default function AboutGalleryPage({ onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalItem, setActiveModalItem] = useState(null);

  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-afrilink-surface">
      {/* Hero */}
      <div className="relative pt-36 pb-20 lg:pt-44 lg:pb-24 bg-afrilink-navy overflow-hidden">
        <div className="absolute inset-0 bg-ndebele-pattern opacity-40" />
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-afrilink-orange/15 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="eyebrow mb-4">Historic Archive & Visual Record</div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[68px] leading-[1.1] font-semibold text-white mb-4">
            Corporate <span className="text-afrilink-gold">Gallery</span>
          </h1>
          <p className="text-white/80 text-lg sm:text-xl font-light max-w-3xl leading-relaxed mb-8">
            A photographic archive documenting our landmark initiatives, high-level diplomatic engagements, operational project sites, and grassroots community investments.
          </p>

          <div className="flex flex-wrap gap-4">
            <CTAButton variant="orange" size="md" onClick={() => onNavigate('partner')}>
              Partner With Us
            </CTAButton>
            <CTAButton variant="outline-light" size="md" onClick={() => onNavigate('about/overview')}>
              Company Overview
            </CTAButton>
          </div>
        </div>
      </div>

      {/* Sibling SubNav Bar */}
      <SubNavPill
        items={ABOUT_PAGES}
        activeRoute="about/gallery"
        onNavigate={onNavigate}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-10 border-b border-afrilink-grey-light">
          <span className="text-xs uppercase tracking-wider font-semibold text-afrilink-fg-60 mr-2 shrink-0">
            Filter:
          </span>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all shrink-0 border ${
                selectedCategory === cat
                  ? 'bg-afrilink-orange text-white border-afrilink-orange shadow-card'
                  : 'bg-afrilink-surface text-afrilink-fg border-afrilink-grey hover:border-afrilink-orange hover:text-afrilink-orange'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-afrilink-surface border border-afrilink-grey-light hover:border-afrilink-orange/40 transition-all duration-300 hover:-translate-y-1.5 shadow-card hover:shadow-card-hover flex flex-col justify-between"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-afrilink-cream">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-afrilink-navy/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded bg-afrilink-surface/90 backdrop-blur-md text-xs font-semibold text-afrilink-orange shadow-sm">
                    {item.category}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="p-2 rounded-full bg-afrilink-orange text-white shadow flex items-center justify-center">
                    <Eye className="w-4 h-4" />
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-afrilink-fg-60 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-afrilink-orange" />
                    <span>{item.year}</span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-afrilink-fg group-hover:text-afrilink-orange transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-afrilink-fg-60 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for item preview */}
        {activeModalItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-afrilink-navy/80 backdrop-blur-md"
            onClick={() => setActiveModalItem(null)}
          >
            <div
              className="bg-afrilink-surface rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative border border-white/20 animate-fade-in"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-[16/10] bg-black overflow-hidden">
                <img
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-afrilink-orange/10 text-afrilink-orange">
                    {activeModalItem.category}
                  </span>
                  <span className="text-xs text-afrilink-fg-60 font-medium">
                    {activeModalItem.year}
                  </span>
                </div>
                <h3 className="font-heading text-2xl font-semibold text-afrilink-fg mb-3">
                  {activeModalItem.title}
                </h3>
                <p className="text-afrilink-fg-80 text-sm sm:text-base leading-relaxed">
                  {activeModalItem.caption}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="bg-afrilink-cream rounded-2xl p-8 sm:p-12 border border-afrilink-grey-light flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold text-afrilink-orange uppercase tracking-wider">Explore Further</span>
            <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-afrilink-fg mt-1">
              Connect With Our Executive Team
            </h3>
            <p className="text-afrilink-fg-60 text-sm mt-1 max-w-xl">
              Submit an investment brief or schedule a direct engagement with Dr Molefe Mokgatle and the board.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <CTAButton variant="orange" size="md" onClick={() => onNavigate('partner')}>
              Partner With Us
            </CTAButton>
            <CTAButton variant="outline" size="md" onClick={() => onNavigate('about/overview')}>
              Overview
            </CTAButton>
            <CTAButton variant="outline" size="md" onClick={() => onNavigate('about/ceo')}>
              CEO Profile
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}
