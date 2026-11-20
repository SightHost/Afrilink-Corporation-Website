import React, { useEffect, useState } from 'react';
import { MapPin, Ticket, Images, Loader2, Clock } from 'lucide-react';
import CTAButton from '../components/CTAButton';
import { upcomingPlaceholders } from '../data/eventsPlaceholders';
import EventDateBadge from '../components/EventDateBadge';
import BookingModal from '../components/BookingModal';
import EventGalleryModal from '../components/EventGalleryModal';
import {
  fetchEvents,
  formatEventDate,
  formatEventTime,
  formatZAR,
  lowestPrice,
  ticketsLeft,
  placeLabel,
} from '../lib/eventsApi';

function setQueryParam(key, value) {
  const url = new URL(window.location.href);
  url.searchParams.delete('event');
  url.searchParams.delete('gallery');
  if (value) url.searchParams.set(key, value);
  window.history.replaceState(null, '', url);
}

function ComingSoonCard({ event, onNavigate }) {
  return (
    <article className="group flex flex-col bg-afrilink-surface rounded-xl border border-afrilink-grey-light shadow-card hover:shadow-card-hover transition-shadow overflow-hidden">
      <div className="relative aspect-[16/9] bg-afrilink-navy overflow-hidden">
        {event.cover_image_url && (
          <img src={event.cover_image_url} alt="" loading="lazy" className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-afrilink-navy/70 to-transparent" />
        <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-afrilink-orange text-white text-xs font-bold tracking-wide">
          Coming soon
        </span>
      </div>
      <div className="flex-1 flex flex-col p-6">
        <h3 className="font-heading text-xl font-semibold text-afrilink-fg leading-snug mb-2">{event.title}</h3>
        <p className="text-afrilink-fg-80 text-[15px] leading-relaxed mb-4">{event.summary}</p>
        <div className="space-y-1.5 text-sm text-afrilink-fg-60 mb-5">
          <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-afrilink-orange shrink-0" />Date to be announced</div>
          <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-afrilink-orange shrink-0" />Venue to be announced</div>
        </div>
        <div className="mt-auto flex items-center justify-between gap-4 pt-4 border-t border-afrilink-grey-light">
          <div className="text-sm font-semibold text-afrilink-fg-60">Tickets coming soon</div>
          <CTAButton variant="outline" size="sm" onClick={() => onNavigate('contact')}>
            Register interest
          </CTAButton>
        </div>
      </div>
    </article>
  );
}

function UpcomingCard({ event, onBook }) {
  const from = lowestPrice(event);
  const left = ticketsLeft(event);
  const hasTickets = event.ticket_types.length > 0;
  const soldOut = hasTickets && left === 0;

  return (
    <article className="group flex flex-col bg-afrilink-surface rounded-xl border border-afrilink-grey-light shadow-card hover:shadow-card-hover transition-shadow overflow-hidden">
      <div className="relative aspect-[16/9] bg-afrilink-cream overflow-hidden">
        {event.cover_image_url && (
          <img src={event.cover_image_url} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        )}
        <EventDateBadge iso={event.starts_at} className="absolute top-4 left-4" />
        {event.featured && (
          <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-afrilink-orange text-white text-[11px] font-bold">Featured</span>
        )}
      </div>
      <div className="flex-1 flex flex-col p-6">
        <h3 className="font-heading text-xl font-semibold text-afrilink-fg leading-snug mb-2">{event.title}</h3>
        {event.summary && <p className="text-afrilink-fg-80 text-[15px] leading-relaxed mb-4">{event.summary}</p>}
        <div className="space-y-1.5 text-sm text-afrilink-fg-60 mb-5">
          <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-afrilink-orange shrink-0" />{formatEventDate(event.starts_at)} · {formatEventTime(event.starts_at)}</div>
          {placeLabel(event) && <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-afrilink-orange shrink-0" />{placeLabel(event)}</div>}
        </div>
        <div className="mt-auto flex items-center justify-between gap-4 pt-4 border-t border-afrilink-grey-light">
          <div>
            {hasTickets ? (
              <>
                <div className="text-xs font-semibold text-afrilink-fg-60">{soldOut ? 'Sold out' : 'Tickets from'}</div>
                {!soldOut && <div className="text-lg font-bold text-afrilink-fg">{formatZAR(from)}</div>}
              </>
            ) : (
              <div className="text-sm font-semibold text-afrilink-fg-60">Tickets coming soon</div>
            )}
          </div>
          <CTAButton variant="orange" size="sm" onClick={() => onBook(event)} disabled={!hasTickets || soldOut}>
            {soldOut ? 'Sold out' : 'Book tickets'}
          </CTAButton>
        </div>
      </div>
    </article>
  );
}

function PastCard({ event, onOpen }) {
  const count = event.event_media.length;
  return (
    <button
      onClick={() => onOpen(event)}
      className="group relative block w-full aspect-[4/3] rounded-xl overflow-hidden bg-afrilink-ink text-left shadow-card focus:outline-none focus-visible:ring-4 focus-visible:ring-afrilink-orange/40"
    >
      {(event.cover_image_url || event.event_media[0]?.url) && (
        <img
          src={event.cover_image_url || event.event_media[0].url}
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-afrilink-ink via-afrilink-ink/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="text-afrilink-gold text-xs font-semibold mb-1">{formatEventDate(event.starts_at, { dateStyle: 'long' })}</div>
        <h3 className="font-heading text-lg font-semibold text-white leading-snug">{event.title}</h3>
        <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-white/80">
          <Images className="w-3.5 h-3.5 text-afrilink-orange" />
          {count ? `${count} photo${count === 1 ? '' : 's'}` : 'View event'}
        </div>
      </div>
    </button>
  );
}

export default function EventsPage({ onNavigate, onOpenLegal }) {
  const [state, setState] = useState({ loading: true, error: null, upcoming: [], past: [] });
  const [booking, setBooking] = useState(null);
  const [gallery, setGallery] = useState(null);

  const load = () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    fetchEvents()
      .then(({ upcoming, past }) => {
        setState({ loading: false, error: null, upcoming, past });
        // Deep links from the home-page reel: ?event=<slug> or ?gallery=<slug>
        const params = new URLSearchParams(window.location.search);
        const bookSlug = params.get('event');
        const gallerySlug = params.get('gallery');
        if (bookSlug) {
          const e = upcoming.find((x) => x.slug === bookSlug);
          if (e?.ticket_types.length) setBooking(e);
          else document.getElementById('upcoming')?.scrollIntoView();
        } else if (gallerySlug) {
          const e = past.find((x) => x.slug === gallerySlug);
          if (e) setGallery(e);
        }
      })
      .catch(() => setState({ loading: false, error: null, upcoming: [], past: [] }));
  };

  useEffect(load, []);

  const openBooking = (e) => { setBooking(e); setQueryParam('event', e.slug); };
  const closeBooking = () => { setBooking(null); setQueryParam(); };
  const openGallery = (e) => { setGallery(e); setQueryParam('gallery', e.slug); };
  const closeGallery = () => { setGallery(null); setQueryParam(); };

  return (
    <div className="min-h-screen bg-afrilink-surface">
      {/* Hero */}
      <div className="relative pt-36 pb-20 lg:pt-44 lg:pb-24 bg-afrilink-navy overflow-hidden">
        <div className="absolute inset-0 bg-ndebele-pattern opacity-40" />
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-afrilink-orange/15 rounded-full blur-[100px]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="eyebrow mb-4">Summits · Forums · Community</div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[68px] leading-[1.1] font-semibold text-white mb-4">
            Afrilink <span className="text-afrilink-gold">Events</span>
          </h1>
          <p className="text-white/80 text-lg sm:text-xl font-light max-w-3xl leading-relaxed mb-8">
            Join us at our investor summits, sector forums and community gatherings, and explore highlights from events we have hosted across South Africa and Botswana.
          </p>
          <div className="flex flex-wrap gap-4">
            <CTAButton variant="orange" size="md" onClick={() => document.getElementById('upcoming')?.scrollIntoView({ behavior: 'smooth' })}>
              Upcoming events
            </CTAButton>
            <CTAButton variant="outline-light" size="md" onClick={() => document.getElementById('past')?.scrollIntoView({ behavior: 'smooth' })}>
              Past event gallery
            </CTAButton>
          </div>
        </div>
      </div>

      {state.loading && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex items-center justify-center gap-3 text-afrilink-fg-60">
          <Loader2 className="w-5 h-5 animate-spin text-afrilink-orange" /> Loading events…
        </div>
      )}

      {/* If the events API is unavailable, the page still renders with "coming soon" cards */}
      {!state.loading && (
        <>
          {/* Upcoming */}
          <section id="upcoming" className="scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="flex items-end justify-between gap-4 mb-10">
              <div>
                <div className="text-afrilink-orange text-[13px] font-semibold mb-2 inline-flex items-center gap-2"><Ticket className="w-4 h-4" /> Book your seat</div>
                <h2 className="font-heading text-3xl lg:text-[42px] font-semibold text-afrilink-fg leading-tight">Upcoming events</h2>
              </div>
            </div>
            {state.upcoming.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {state.upcoming.map((e) => <UpcomingCard key={e.slug} event={e} onBook={openBooking} />)}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {upcomingPlaceholders.map((e) => <ComingSoonCard key={e.slug} event={e} onNavigate={onNavigate} />)}
              </div>
            )}
          </section>

          {/* Past */}
          {state.past.length > 0 && (
            <section id="past" className="scroll-mt-28 bg-afrilink-cream/60 border-t border-afrilink-grey-light">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                <div className="mb-10">
                  <div className="text-afrilink-orange text-[13px] font-semibold mb-2 inline-flex items-center gap-2"><Images className="w-4 h-4" /> Gallery</div>
                  <h2 className="font-heading text-3xl lg:text-[42px] font-semibold text-afrilink-fg leading-tight">Past events</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {state.past.map((e) => <PastCard key={e.slug} event={e} onOpen={openGallery} />)}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {booking && <BookingModal event={booking} onClose={closeBooking} onOpenLegal={onOpenLegal} />}
      {gallery && <EventGalleryModal event={gallery} onClose={closeGallery} />}
    </div>
  );
}
