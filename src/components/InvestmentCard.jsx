import React from 'react';
import { ArrowRight, MapPin, Tag } from 'lucide-react';

export default function InvestmentCard({
  investment,
  onNavigate,
  layout = 'card', // 'card' or 'horizontal'
  className = ''
}) {
  const { name, sector, country, flag, heroImage, oneLiner, slug, metrics } = investment;

  return (
    <div
      onClick={() => onNavigate?.(`investments/${slug}`)}
      className={`group cursor-pointer rounded-lg overflow-hidden bg-afrilink-surface border border-afrilink-grey-light hover:border-afrilink-orange/50 transition-all duration-300 hover:-translate-y-1.5 shadow-card hover:shadow-card-hover flex flex-col justify-between ${className}`}
    >
      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-afrilink-cream">
        <img
          src={heroImage}
          alt={name}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-afrilink-navy/30 via-transparent to-transparent" />

        {/* Floating tags */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-afrilink-surface/95 backdrop-blur-md text-xs font-semibold text-afrilink-orange shadow-card">
            <Tag className="w-3 h-3" />
            {sector}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-afrilink-surface/95 backdrop-blur-md text-xs font-medium text-afrilink-fg shadow-card">
            <span>{flag}</span>
            <span>{country.split(' ')[0]}</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-heading font-semibold text-xl text-afrilink-fg group-hover:text-afrilink-orange transition-colors duration-200 mb-2">
            {name}
          </h4>
          <p className="text-sm text-afrilink-fg-60 leading-relaxed line-clamp-2 mb-4">
            {oneLiner}
          </p>
        </div>

        {/* Metrics Pill row */}
        {metrics && metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-2 py-3 mb-4 border-t border-b border-afrilink-grey-light">
            {metrics.slice(0, 2).map((m, idx) => (
              <div key={idx} className="bg-afrilink-cream p-2 rounded">
                <div className="text-[11px] font-medium text-afrilink-fg-60">{m.label}</div>
                <div className="text-xs font-semibold text-afrilink-fg truncate">{m.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Card Footer Link */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm font-semibold text-afrilink-orange group-hover:underline inline-flex items-center gap-1.5">
            Explore Asset Brief
          </span>
          <div className="w-8 h-8 rounded-full bg-afrilink-cream group-hover:bg-afrilink-orange group-hover:text-white text-afrilink-fg-60 flex items-center justify-center transition-all duration-300">
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}
