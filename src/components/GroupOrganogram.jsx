import React from 'react';
import { Download, ExternalLink } from 'lucide-react';
import { withBase } from '../lib/paths';

const SUBSIDIARIES = [
  {
    name: 'Afrilink Building and Civils (Pty) Ltd',
    share: '100%',
    route: 'investments/afrilink-buildings',
  },
  {
    name: 'Strategic Ventures',
    share: '90%',
    route: 'investments/strategic-ventures',
  },
  {
    name: 'Afrilink Mining Group (Pty) Ltd',
    share: '60%',
    route: 'investments/afrilink-mining',
    children: [
      { title: 'Manganese — South Africa', subtitle: '10% interest' },
      { title: 'KP Mining — Botswana', subtitle: '60% interest', route: 'investments/afrilink-mg' },
      { title: 'Other initiatives', subtitle: 'Small-scale mining' },
    ],
  },
  {
    name: 'Smart Protect (Pty) Ltd',
    share: '50%',
    childrenLabel: 'Regional footprint',
    children: [
      { title: 'Botswana' },
      { title: 'Malawi' },
      { title: 'Mozambique' },
      { title: 'Swaziland (Eswatini)' },
    ],
  },
  {
    name: 'Mahlori Group',
    share: '35%',
    route: 'investments/mahlori-group',
  },
  {
    name: 'Strider (Pty) Ltd',
    share: '13%',
    route: 'investments/strider-digital',
  },
];

function SubsidiaryCard({ item, onNavigate }) {
  const Tag = item.route ? 'button' : 'div';
  const interactiveClasses = item.route
    ? 'cursor-pointer hover:bg-[#cc6d12] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-afrilink-orange focus-visible:ring-offset-2'
    : '';

  return (
    <Tag
      type={item.route ? 'button' : undefined}
      onClick={item.route ? () => onNavigate?.(item.route) : undefined}
      className={`relative w-full rounded-lg bg-[#DE7A18] text-white px-3 pt-5 pb-3.5 min-h-[76px] flex items-center justify-center text-center shadow-sm transition-all ${interactiveClasses}`}
    >
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-[#6B3F1D] text-white text-[11px] font-bold tracking-wide shadow-sm">
        {item.share}
      </span>
      <span className="font-heading text-[13px] font-semibold leading-snug">
        {item.name}
      </span>
    </Tag>
  );
}

function SubNodeCard({ child, onNavigate }) {
  const Tag = child.route ? 'button' : 'div';
  const interactiveClasses = child.route
    ? 'cursor-pointer hover:bg-[#f6d9b8] hover:border-[#cc6d12] focus:outline-none focus-visible:ring-2 focus-visible:ring-afrilink-orange'
    : '';

  return (
    <Tag
      type={child.route ? 'button' : undefined}
      onClick={child.route ? () => onNavigate?.(child.route) : undefined}
      className={`w-full rounded-md bg-[#FBE7D2] border border-[#DE7A18]/75 px-2.5 py-2 text-center transition-colors ${interactiveClasses}`}
    >
      <div className="font-heading text-xs font-semibold text-[#5B3517] leading-snug">
        {child.title}
      </div>
      {child.subtitle && (
        <div className="text-[11px] text-[#7A5230] leading-tight mt-0.5">
          {child.subtitle}
        </div>
      )}
    </Tag>
  );
}

export default function GroupOrganogram({ onNavigate }) {
  const pdfUrl = withBase('/Afrilink_Group_Organogram.pdf');

  return (
    <section id="organogram" className="mb-20" aria-labelledby="organogram-heading">
      {/* Header row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-afrilink-orange">
            Group Structure
          </span>
          <h2
            id="organogram-heading"
            className="font-heading text-3xl sm:text-4xl font-semibold text-afrilink-fg mt-1"
          >
            Afrilink Group Organogram
          </h2>
          <p className="text-afrilink-fg-60 text-sm sm:text-base mt-2 max-w-2xl">
            Group structure and shareholding as at November 2026 across our holding company, operating subsidiaries, investments, and regional footprint.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-afrilink-surface hover:bg-afrilink-cream text-afrilink-fg text-sm font-semibold border border-afrilink-grey hover:border-afrilink-orange hover:text-afrilink-orange transition-all"
          >
            <ExternalLink className="w-4 h-4 text-afrilink-orange" />
            <span>View PDF</span>
          </a>
          <a
            href={pdfUrl}
            download="Afrilink_Group_Organogram.pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full btn-glass btn-glass-orange text-white text-sm font-semibold"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {/* Organogram Container */}
      <div className="bg-afrilink-surface rounded-2xl border border-afrilink-grey-light shadow-card p-6 sm:p-8 lg:p-10">
        {/* Desktop Tree (lg+) */}
        <div className="hidden lg:block">
          {/* Top Row: Holding Company centered + Afrilink Foundation on right */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center">
            <div />

            <div className="rounded-xl bg-[#6B3F1D] text-white px-8 py-4 text-center shadow-sm min-w-[290px]">
              <div className="font-heading text-lg font-semibold leading-tight">
                Afrilink Corporation (Pty) Ltd
              </div>
              <div className="text-xs text-white/80 mt-1">
                Reg No. 2018/440447/07
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-12 xl:w-16 border-t-2 border-dashed border-[#8E7B6A]" />
              <div className="rounded-lg border-2 border-dashed border-[#6B3F1D]/75 bg-[#FDFBF8] px-5 py-3 text-center">
                <span className="font-heading text-sm font-semibold text-[#6B3F1D] whitespace-nowrap">
                  Afrilink Foundation
                </span>
              </div>
            </div>
          </div>

          {/* Center Trunk */}
          <div className="flex justify-center">
            <div className="w-[1.5px] h-7 bg-[#9E978E]" />
          </div>

          {/* Horizontal Bus + 6 Subsidiary Columns */}
          <div className="relative -mx-2">
            {/* Horizontal connector line aligned to exact centers of col 1 (1/12) and col 6 (11/12) */}
            <div
              className="absolute top-0 h-[1.5px] bg-[#9E978E]"
              style={{ left: '8.333333%', right: '8.333333%' }}
            />

            <div className="grid grid-cols-6">
              {SUBSIDIARIES.map((item) => (
                <div key={item.name} className="px-2 flex flex-col items-center">
                  {/* Vertical drop from bus to subsidiary card */}
                  <div className="w-[1.5px] h-7 bg-[#9E978E]" />

                  <SubsidiaryCard item={item} onNavigate={onNavigate} />

                  {/* Nested projects / regional footprint */}
                  {item.children && item.children.length > 0 && (
                    <div className="w-full mt-0">
                      {item.childrenLabel ? (
                        <div className="relative pl-3.5 pt-3 pb-1.5">
                          <div className="absolute left-2 top-0 bottom-0 w-[1.5px] bg-[#9E978E]" />
                          <div className="text-[11px] italic font-medium text-[#7A6A5C] pl-1">
                            {item.childrenLabel}
                          </div>
                        </div>
                      ) : (
                        <div className="relative h-4">
                          <div className="absolute left-2 top-0 bottom-0 w-[1.5px] bg-[#9E978E]" />
                        </div>
                      )}

                      <div>
                        {item.children.map((child, idx) => {
                          const isLast = idx === item.children.length - 1;
                          return (
                            <div
                              key={child.title}
                              className={`relative pl-5 ${isLast ? '' : 'mb-2.5'}`}
                            >
                              {/* Vertical stem down to exact center of node */}
                              <div className="absolute left-2 top-0 h-1/2 w-[1.5px] bg-[#9E978E]" />
                              {/* Continue stem across margin gap unless last item */}
                              {!isLast && (
                                <div className="absolute left-2 top-1/2 -bottom-2.5 w-[1.5px] bg-[#9E978E]" />
                              )}
                              {/* Horizontal branch tick */}
                              <div className="absolute left-2 top-1/2 w-3 h-[1.5px] bg-[#9E978E]" />

                              <SubNodeCard child={child} onNavigate={onNavigate} />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Stacked Hierarchy (< lg) */}
        <div className="lg:hidden space-y-6">
          {/* Holding company & Foundation */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md rounded-xl bg-[#6B3F1D] text-white px-6 py-4 text-center shadow-sm">
              <div className="font-heading text-lg font-semibold">
                Afrilink Corporation (Pty) Ltd
              </div>
              <div className="text-xs text-white/80 mt-0.5">
                Reg No. 2018/440447/07
              </div>
            </div>

            <div className="h-4 border-l-2 border-dashed border-[#8E7B6A]" />

            <div className="rounded-lg border-2 border-dashed border-[#6B3F1D]/75 bg-[#FDFBF8] px-5 py-2 text-center">
              <span className="font-heading text-sm font-semibold text-[#6B3F1D]">
                Afrilink Foundation
              </span>
            </div>
          </div>

          {/* Subsidiaries Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {SUBSIDIARIES.map((item) => (
              <div key={item.name} className="flex flex-col">
                <SubsidiaryCard item={item} onNavigate={onNavigate} />

                {item.children && item.children.length > 0 && (
                  <div className="mt-0">
                    {item.childrenLabel ? (
                      <div className="relative pl-5 pt-3 pb-1.5">
                        <div className="absolute left-3 top-0 bottom-0 w-[1.5px] bg-[#9E978E]" />
                        <div className="text-[11px] italic font-medium text-[#7A6A5C] pl-1">
                          {item.childrenLabel}
                        </div>
                      </div>
                    ) : (
                      <div className="relative h-3">
                        <div className="absolute left-3 top-0 bottom-0 w-[1.5px] bg-[#9E978E]" />
                      </div>
                    )}

                    <div>
                      {item.children.map((child, idx) => {
                        const isLast = idx === item.children.length - 1;
                        return (
                          <div
                            key={child.title}
                            className={`relative pl-7 ${isLast ? '' : 'mb-2'}`}
                          >
                            <div className="absolute left-3 top-0 h-1/2 w-[1.5px] bg-[#9E978E]" />
                            {!isLast && (
                              <div className="absolute left-3 top-1/2 -bottom-2 w-[1.5px] bg-[#9E978E]" />
                            )}
                            <div className="absolute left-3 top-1/2 w-4 h-[1.5px] bg-[#9E978E]" />

                            <SubNodeCard child={child} onNavigate={onNavigate} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-10 pt-6 border-t border-afrilink-grey-light flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-afrilink-fg-60">
          <div className="flex items-center gap-2">
            <span className="w-5 h-3.5 rounded bg-[#6B3F1D] inline-block" />
            <span>Holding company</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-3.5 rounded bg-[#DE7A18] inline-block" />
            <span>Subsidiary / investment</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-3.5 rounded bg-[#FBE7D2] border border-[#DE7A18]/80 inline-block" />
            <span>Project / country operation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-full bg-[#6B3F1D] text-white text-[10px] font-bold leading-none">
              %
            </span>
            <span>Afrilink shareholding</span>
          </div>
        </div>
      </div>
    </section>
  );
}
