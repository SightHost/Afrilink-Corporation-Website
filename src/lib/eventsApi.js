// Browser-side helpers for the Events pages. All data comes from the
// Cloudflare Worker under /api (worker/index.js), which talks to Supabase.
import { withBase } from './paths';

const api = (path) => withBase(`/api${path}`);

let eventsPromise = null;

/** { upcoming: Event[], past: Event[] } — cached for the page's lifetime */
export function fetchEvents() {
  if (!eventsPromise) {
    eventsPromise = fetch(api('/events'))
      .then((res) => {
        if (!res.ok) throw new Error(`Events request failed (${res.status})`);
        return res.json();
      })
      .catch((err) => {
        eventsPromise = null; // allow a retry
        throw err;
      });
  }
  return eventsPromise;
}

export async function fetchOrder(id) {
  const res = await fetch(api(`/orders/${encodeURIComponent(id)}`));
  if (!res.ok) throw new Error('Order not found');
  return res.json();
}

export async function fetchTicket(id) {
  const res = await fetch(api(`/tickets/${encodeURIComponent(id)}`));
  if (!res.ok) throw new Error('Ticket not found');
  return res.json();
}

/**
 * Create the order, then hand the browser to PayFast by submitting the
 * signed form the server returned. Throws with a user-facing message on failure.
 */
export async function startCheckout({ ticketTypeId, quantity, name, email, phone }) {
  const res = await fetch(api('/checkout'), {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ticketTypeId, quantity, name, email, phone }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Could not start checkout. Please try again.');

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = data.action;
  for (const [name, value] of data.fields) {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }
  document.body.appendChild(form);
  form.submit();
}

// ---------------------------------------------------------------------------
// Formatting (South African conventions)
// ---------------------------------------------------------------------------
const TZ = 'Africa/Johannesburg';

export function formatZAR(cents) {
  return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(cents / 100);
}

export function formatEventDate(iso, opts = {}) {
  return new Intl.DateTimeFormat('en-ZA', { dateStyle: 'full', timeZone: TZ, ...opts }).format(new Date(iso));
}

export function formatEventTime(iso) {
  return new Intl.DateTimeFormat('en-ZA', { hour: '2-digit', minute: '2-digit', timeZone: TZ }).format(new Date(iso));
}

/** { day: '14', month: 'MAR', year: '2027' } for date badges */
export function dateBadge(iso) {
  const d = new Date(iso);
  const part = (o) => new Intl.DateTimeFormat('en-ZA', { ...o, timeZone: TZ }).format(d);
  return { day: part({ day: 'numeric' }), month: part({ month: 'short' }).toUpperCase(), year: part({ year: 'numeric' }) };
}

export function lowestPrice(event) {
  const prices = (event.ticket_types || []).map((t) => t.price_cents);
  return prices.length ? Math.min(...prices) : null;
}

export function ticketsLeft(event) {
  return (event.ticket_types || []).reduce((sum, t) => sum + (t.remaining || 0), 0);
}

export function placeLabel(event) {
  return [event.venue, event.city].filter(Boolean).join(', ');
}
