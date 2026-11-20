import React, { useEffect, useMemo, useState } from 'react';
import { X, Minus, Plus, Calendar, MapPin, Lock, Loader2, AlertCircle } from 'lucide-react';
import CTAButton from './CTAButton';
import { formatZAR, formatEventDate, formatEventTime, placeLabel, startCheckout } from '../lib/eventsApi';

export default function BookingModal({ event, onClose, onOpenLegal }) {
  const available = event.ticket_types.filter((t) => t.remaining > 0);
  const [typeId, setTypeId] = useState(available[0]?.id ?? null);
  const [quantity, setQuantity] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const selected = event.ticket_types.find((t) => t.id === typeId);
  const maxQty = Math.min(10, selected?.remaining ?? 0);
  const total = useMemo(() => (selected ? selected.price_cents * quantity : 0), [selected, quantity]);

  const chooseType = (t) => {
    setTypeId(t.id);
    setQuantity((q) => Math.max(1, Math.min(q, Math.min(10, t.remaining))));
  };

  // Lock page scroll while open; close on Escape
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && !submitting && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, submitting]);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!selected) return setError('Please choose a ticket type.');
    if (!agreed) return setError('Please accept the terms to continue.');
    setSubmitting(true);
    try {
      await startCheckout({ ticketTypeId: selected.id, quantity, ...form });
      // Browser is now navigating to PayFast; keep the spinner showing
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full rounded-form border border-afrilink-grey bg-afrilink-surface px-3.5 py-2.5 text-[15px] text-afrilink-fg focus:outline-none focus:border-afrilink-orange focus:ring-2 focus:ring-afrilink-orange/20';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-afrilink-navy/70 backdrop-blur-sm p-0 sm:p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
      onClick={(e) => e.target === e.currentTarget && !submitting && onClose()}
    >
      <div className="relative w-full sm:max-w-2xl max-h-[95vh] overflow-y-auto bg-afrilink-surface rounded-t-2xl sm:rounded-2xl shadow-card-hover">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-afrilink-navy text-white px-6 py-5 flex items-start justify-between gap-4">
          <div>
            <div className="text-afrilink-gold text-[13px] font-semibold mb-1">Book tickets</div>
            <h2 id="booking-title" className="font-heading text-xl sm:text-2xl font-semibold leading-tight">{event.title}</h2>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/75">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-afrilink-orange" />
                {formatEventDate(event.starts_at)} · {formatEventTime(event.starts_at)}
              </span>
              {placeLabel(event) && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-afrilink-orange" />
                  {placeLabel(event)}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={submitting}
            className="p-2 rounded-full hover:bg-white/10 transition-colors shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Ticket types */}
          <fieldset>
            <legend className="text-sm font-semibold text-afrilink-fg mb-3">1. Choose your ticket</legend>
            <div className="space-y-2.5">
              {event.ticket_types.map((t) => {
                const soldOut = t.remaining <= 0;
                return (
                  <label
                    key={t.id}
                    className={`flex items-start gap-3 rounded-lg border p-4 transition-colors ${
                      soldOut
                        ? 'border-afrilink-grey-light bg-afrilink-cream/40 opacity-60 cursor-not-allowed'
                        : typeId === t.id
                          ? 'border-afrilink-orange bg-afrilink-butter/40 cursor-pointer'
                          : 'border-afrilink-grey hover:border-afrilink-orange/60 cursor-pointer'
                    }`}
                  >
                    <input
                      type="radio"
                      name="ticketType"
                      className="mt-1 accent-afrilink-orange"
                      checked={typeId === t.id}
                      disabled={soldOut}
                      onChange={() => chooseType(t)}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-semibold text-afrilink-fg">{t.name}</span>
                        <span className="font-bold text-afrilink-fg whitespace-nowrap">{formatZAR(t.price_cents)}</span>
                      </div>
                      {t.description && <p className="text-sm text-afrilink-fg-60 mt-0.5">{t.description}</p>}
                      <p className={`text-xs font-semibold mt-1 ${soldOut ? 'text-afrilink-fg-60' : t.remaining <= 20 ? 'text-afrilink-orange' : 'text-afrilink-fg-60'}`}>
                        {!t.salesOpen ? 'Sales closed' : soldOut ? 'Sold out' : t.remaining <= 20 ? `Only ${t.remaining} left` : 'Available'}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Quantity */}
          {selected && (
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-semibold text-afrilink-fg">2. How many?</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="w-9 h-9 rounded-full border border-afrilink-grey flex items-center justify-center hover:border-afrilink-orange disabled:opacity-40"
                  aria-label="Fewer tickets"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-lg font-bold" aria-live="polite">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                  disabled={quantity >= maxQty}
                  className="w-9 h-9 rounded-full border border-afrilink-grey flex items-center justify-center hover:border-afrilink-orange disabled:opacity-40"
                  aria-label="More tickets"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Buyer details */}
          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-afrilink-fg mb-3">3. Your details</legend>
            <div>
              <label htmlFor="bk-name" className="block text-xs font-semibold text-afrilink-fg-80 mb-1">Full name</label>
              <input id="bk-name" required autoComplete="name" value={form.name} onChange={update('name')} className={inputClass} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="bk-email" className="block text-xs font-semibold text-afrilink-fg-80 mb-1">Email (tickets are sent here)</label>
                <input id="bk-email" type="email" required autoComplete="email" value={form.email} onChange={update('email')} className={inputClass} />
              </div>
              <div>
                <label htmlFor="bk-phone" className="block text-xs font-semibold text-afrilink-fg-80 mb-1">Mobile (optional)</label>
                <input id="bk-phone" type="tel" autoComplete="tel" value={form.phone} onChange={update('phone')} className={inputClass} />
              </div>
            </div>
          </fieldset>

          <label className="flex items-start gap-2.5 text-sm text-afrilink-fg-80">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 accent-afrilink-orange" />
            <span>
              I agree to the{' '}
              <button type="button" onClick={() => onOpenLegal?.('terms')} className="text-afrilink-orange font-semibold hover:underline">
                Terms &amp; Conditions
              </button>{' '}
              and consent to my details being processed under the{' '}
              <button type="button" onClick={() => onOpenLegal?.('popia')} className="text-afrilink-orange font-semibold hover:underline">
                POPIA Privacy Notice
              </button>
              .
            </span>
          </label>

          {error && (
            <div className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800" role="alert">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          {/* Total + pay */}
          <div className="border-t border-afrilink-grey-light pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-afrilink-fg-60">Total</div>
              <div className="text-2xl font-bold text-afrilink-fg">{formatZAR(total)}</div>
            </div>
            <CTAButton type="submit" variant="orange" size="lg" disabled={submitting || !selected} icon={!submitting}>
              {submitting ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Redirecting to PayFast…
                </span>
              ) : (
                'Pay securely with PayFast'
              )}
            </CTAButton>
          </div>
          <p className="flex items-center gap-1.5 text-xs text-afrilink-fg-60">
            <Lock className="w-3.5 h-3.5" />
            You'll complete payment on PayFast's secure page. Afrilink never sees your card details.
          </p>
        </form>
      </div>
    </div>
  );
}
