import React from 'react';

/**
 * Reusable navigation pill bar for sibling pages within a section
 * (e.g. About pages, Governance pages, Investment sector pages)
 */
export default function SubNavPill({ items, activeRoute, onNavigate, className = '' }) {
  return (
    <div className={`bg-afrilink-cream border-b border-afrilink-grey-light/80 sticky top-[73px] z-30 backdrop-blur-md bg-afrilink-surface/95 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs uppercase tracking-wider font-semibold text-afrilink-fg-60 mr-2 shrink-0 hidden sm:inline">
            Section:
          </span>
          {items.map((item) => {
            const isActive = activeRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => onNavigate(item.route)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all shrink-0 border flex items-center gap-2 ${
                  isActive
                    ? 'bg-afrilink-orange text-white border-afrilink-orange shadow-card'
                    : 'bg-afrilink-surface text-afrilink-fg border-afrilink-grey hover:border-afrilink-orange hover:text-afrilink-orange'
                }`}
              >
                {item.icon && <item.icon className="w-3.5 h-3.5" />}
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                    isActive ? 'bg-afrilink-surface text-afrilink-orange' : 'bg-afrilink-orange/10 text-afrilink-orange'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
