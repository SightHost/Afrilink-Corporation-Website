import React, { useCallback, useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, MapPin } from 'lucide-react';
import { formatEventDate, placeLabel } from '../lib/eventsApi';

// Photo viewer for a past event: large image with prev/next and a thumbnail strip.
export default function EventGalleryModal({ event, onClose }) {
  const photos = event.event_media.length
    ? event.event_media
    : event.cover_image_url
      ? [{ url: event.cover_image_url, caption: event.title }]
      : [];
  const [index, setIndex] = useState(0);
  const go = useCallback((delta) => setIndex((i) => (i + delta + photos.length) % photos.length), [photos.length]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [go, onClose]);

  const current = photos[index];

  return (
    <div
      className="fixed inset-0 z-50 bg-afrilink-navy/95 flex flex-col animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`${event.title} gallery`}
    >
      {/* Top bar */}
      <div className="flex items-start justify-between gap-4 px-4 sm:px-8 py-4 text-white">
        <div className="min-w-0">
          <h2 className="font-heading text-lg sm:text-2xl font-semibold truncate">{event.title}</h2>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/70">
            <span className="inline-flex items-center gap-1.5"><Calendar className="w-4 h-4 text-afrilink-orange" />{formatEventDate(event.starts_at)}</span>
            {placeLabel(event) && <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4 text-afrilink-orange" />{placeLabel(event)}</span>}
          </div>
        </div>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 shrink-0" aria-label="Close gallery">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main image */}
      <div className="relative flex-1 min-h-0 flex items-center justify-center px-4 sm:px-16">
        {current ? (
          <figure className="max-h-full max-w-full flex flex-col items-center">
            <img src={current.url} alt={current.caption || event.title} className="max-h-[65vh] max-w-full object-contain rounded-lg shadow-2xl" />
            {current.caption && <figcaption className="mt-3 text-sm text-white/80 text-center">{current.caption}</figcaption>}
          </figure>
        ) : (
          <p className="text-white/70">Photos from this event will be added soon.</p>
        )}
        {photos.length > 1 && (
          <>
            <button onClick={() => go(-1)} className="absolute left-2 sm:left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white" aria-label="Previous photo">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={() => go(1)} className="absolute right-2 sm:right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white" aria-label="Next photo">
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {photos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 sm:px-8 py-4 justify-start sm:justify-center">
          {photos.map((p, i) => (
            <button
              key={p.url + i}
              onClick={() => setIndex(i)}
              className={`shrink-0 w-20 h-14 rounded-md overflow-hidden border-2 transition-all ${i === index ? 'border-afrilink-orange' : 'border-transparent opacity-60 hover:opacity-100'}`}
              aria-label={`Show photo ${i + 1}`}
            >
              <img src={p.url} alt="" loading="lazy" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
