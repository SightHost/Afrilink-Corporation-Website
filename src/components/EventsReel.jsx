import React, { useEffect, useState } from 'react';
import { MapPin, Ticket, Images } from 'lucide-react';
import CTAButton from './CTAButton';
import EventDateBadge from './EventDateBadge';
import { fetchEvents, formatEventDate } from '../lib/eventsApi';
import { upcomingPlaceholders } from '../data/eventsPlaceholders';

const comingSoon = upcomingPlaceholders.map((e) => ({ ...e, kind: 'soon' }));

// A continuously scrolling strip of event cards shown under the home-page hero.
// Upcoming events (featured first) lead, followed by recent past events.
// With no real upcoming events (or no API), the "Coming soon" placeholders fill in.
export default function EventsReel({ onNavigate }) {
  const [items, setItems] = useState(null);

  useEffect(() => {
    fetchEvents()
      .then(({ upcoming, past }) => {
        const up = [...upcoming].sort((a, b) => Number(b.featured) - Number(a.featured));
        const lead = up.length ? up.map((e) => ({ ...e, kind: 'upcoming' })) : comingSoon;
        setItems([...lead, ...past.slice(0, 8).map((e) => ({ ...e, kind: 'past' }))]);
      })
      .catch(() => setItems(comingSoon));
  }, []);

  if (!items || items.length === 0) return null;

  // Enough copies to fill wide screens, then doubled so the loop is seamless
  const copies = Math.max(1, Math.ceil(6 / items.length));
  const base = Array.from({ length: copies }, () => items).flat();
  const loop = [...base, ...base];
  const duration = `${Math.max(30, base.length * 7)}s`;

  const open = (e) =>
    onNavigate(e.kind === 'upcoming' ? `events/?event=${e.slug}` : e.kind === 'past' ? `events/?gallery=${e.slug}` : 'events');

  return (
    <section className="bg-afrilink-ink py-14 border-t border-white/5 overflow-hidden" aria-label="Afrilink events">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-afrilink-gold text-[13px] font-semibold mb-2">Events</div>
          <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-white leading-tight">Summits, forums &amp; gatherings</h2>
        </div>
        <CTAButton variant="outline-light" size="md" onClick={() => onNavigate('events')}>
          View all events
        </CTAButton>
      </div>

      <div className="events-reel relative">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-afrilink-ink to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-afrilink-ink to-transparent z-10" />

        <ul className="events-reel-track flex w-max" style={{ '--reel-duration': duration }}>
          {loop.map((e, i) => (
            <li key={`${e.slug}-${i}`} aria-hidden={i >= base.length ? 'true' : undefined} className="shrink-0 pr-5">
              <button
                onClick={() => open(e)}
                tabIndex={i >= base.length ? -1 : 0}
                className="group relative block w-[280px] sm:w-[340px] aspect-[4/3] rounded-xl overflow-hidden bg-afrilink-ink-soft text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-afrilink-orange/50"
              >
                {(e.cover_image_url || e.event_media?.[0]?.url) && (
                  <img
                    src={e.cover_image_url || e.event_media[0].url}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-afrilink-ink via-afrilink-ink/40 to-transparent" />
                {e.kind === 'upcoming' && <EventDateBadge iso={e.starts_at} className="absolute top-4 left-4" />}
                <span
                  className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                    e.kind === 'past' ? 'bg-white/15 text-white backdrop-blur' : 'bg-afrilink-orange text-white'
                  }`}
                >
                  {e.kind === 'upcoming' ? 'Upcoming' : e.kind === 'soon' ? 'Coming soon' : 'Past event'}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  {e.kind === 'soon' && <div className="text-afrilink-gold text-xs font-semibold mb-1">Date to be announced</div>}
                  {e.kind === 'past' && (
                    <div className="text-afrilink-gold text-xs font-semibold mb-1">{formatEventDate(e.starts_at, { dateStyle: 'long' })}</div>
                  )}
                  <h3 className="font-heading text-lg font-semibold text-white leading-snug line-clamp-2">{e.title}</h3>
                  <div className="mt-2 flex items-center justify-between gap-3 text-xs font-semibold text-white/75">
                    {e.city ? (
                      <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-afrilink-orange" />{e.city}</span>
                    ) : <span />}
                    <span className="inline-flex items-center gap-1 text-afrilink-gold group-hover:underline">
                      {e.kind === 'upcoming' ? <><Ticket className="w-3.5 h-3.5" /> Book tickets</> : e.kind === 'soon' ? <><Ticket className="w-3.5 h-3.5" /> Find out more</> : <><Images className="w-3.5 h-3.5" /> View gallery</>}
                    </span>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
