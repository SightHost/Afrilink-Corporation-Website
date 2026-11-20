import React from 'react';
import { dateBadge } from '../lib/eventsApi';

export default function EventDateBadge({ iso, className = '' }) {
  const { day, month, year } = dateBadge(iso);
  return (
    <div className={`flex flex-col items-center justify-center w-16 rounded-lg bg-afrilink-surface/95 shadow-card py-2 text-afrilink-fg ${className}`}>
      <span className="text-[11px] font-bold tracking-wider text-afrilink-orange">{month}</span>
      <span className="text-2xl font-bold leading-none">{day}</span>
      <span className="text-[10px] font-semibold text-afrilink-fg-60 mt-0.5">{year}</span>
    </div>
  );
}
