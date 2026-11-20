// Cloudflare Worker for the Events API. Only /api/* requests reach this code
// (see "run_worker_first" in wrangler.jsonc); every other URL is served
// straight from the static Astro build in dist/.

import { createClient } from '@supabase/supabase-js';
import { payfastHost, signCheckoutFields, validateItn } from './payfast.js';
import { sendTicketEmail } from './email.js';

const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', ...headers },
  });

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function db(env) {
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// ---------------------------------------------------------------------------
// GET /api/events — published events split into upcoming and past
// ---------------------------------------------------------------------------
async function listEvents(env) {
  const supabase = db(env);
  const { data: events, error } = await supabase
    .from('events')
    .select(
      'id, slug, title, summary, description, venue, city, starts_at, ends_at, cover_image_url, featured, ' +
        'ticket_types(id, name, description, price_cents, sales_end_at, sort_order), ' +
        'event_media(id, url, caption, sort_order)'
    )
    .eq('published', true)
    .order('starts_at', { ascending: true });
  if (error) throw error;

  const typeIds = events.flatMap((e) => e.ticket_types.map((t) => t.id));
  const remaining = new Map();
  if (typeIds.length) {
    const { data: avail, error: availError } = await supabase
      .from('ticket_availability')
      .select('ticket_type_id, remaining')
      .in('ticket_type_id', typeIds);
    if (availError) throw availError;
    for (const a of avail) remaining.set(a.ticket_type_id, a.remaining);
  }

  const now = Date.now();
  const upcoming = [];
  const past = [];
  for (const e of events) {
    const { id: _id, ...rest } = e;
    const ticketTypes = e.ticket_types
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(({ sort_order: _sortOrder, ...t }) => {
        const salesOpen = now < Date.parse(t.sales_end_at || e.starts_at);
        return { ...t, remaining: salesOpen ? remaining.get(t.id) ?? 0 : 0, salesOpen };
      });
    const media = e.event_media.sort((a, b) => a.sort_order - b.sort_order).map(({ url, caption }) => ({ url, caption }));
    const event = { ...rest, ticket_types: ticketTypes, event_media: media };
    if (Date.parse(e.ends_at || e.starts_at) >= now) upcoming.push(event);
    else past.push(event);
  }
  past.reverse(); // most recent first

  return json({ upcoming, past }, 200, { 'cache-control': 'public, max-age=60' });
}

// ---------------------------------------------------------------------------
// POST /api/checkout — reserve seats and return a signed PayFast form
// ---------------------------------------------------------------------------
const CHECKOUT_ERRORS = {
  TICKET_TYPE_NOT_FOUND: [404, 'That ticket type no longer exists.'],
  EVENT_NOT_AVAILABLE: [409, 'This event is not available for booking.'],
  SALES_CLOSED: [409, 'Ticket sales for this event have closed.'],
  INVALID_QUANTITY: [400, 'Please choose between 1 and 10 tickets.'],
  SOLD_OUT: [409, 'Sorry, there are not enough tickets left for that quantity.'],
};

async function checkout(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }
  const ticketTypeId = Number(body.ticketTypeId);
  const quantity = Number(body.quantity);
  const name = String(body.name || '').trim().slice(0, 120);
  const email = String(body.email || '').trim().slice(0, 200);
  const phone = String(body.phone || '').trim().slice(0, 30);

  if (!Number.isInteger(ticketTypeId) || ticketTypeId <= 0) return json({ error: 'Please choose a ticket type.' }, 400);
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) return json({ error: CHECKOUT_ERRORS.INVALID_QUANTITY[1] }, 400);
  if (name.length < 2) return json({ error: 'Please enter your full name.' }, 400);
  if (!EMAIL_RE.test(email)) return json({ error: 'Please enter a valid email address.' }, 400);

  const supabase = db(env);
  const { data: order, error } = await supabase.rpc('create_order', {
    p_ticket_type_id: ticketTypeId,
    p_quantity: quantity,
    p_name: name,
    p_email: email,
    p_phone: phone || null,
  });
  if (error) {
    const known = Object.keys(CHECKOUT_ERRORS).find((code) => error.message?.includes(code));
    if (known) return json({ error: CHECKOUT_ERRORS[known][1] }, CHECKOUT_ERRORS[known][0]);
    throw error;
  }

  const { data: tt } = await supabase
    .from('ticket_types')
    .select('name, events(title)')
    .eq('id', ticketTypeId)
    .single();

  const site = env.SITE_URL.replace(/\/$/, '');
  const [first, ...rest] = name.split(/\s+/);
  // Field order matters for the signature — this is PayFast's documented order
  const fields = [
    ['merchant_id', env.PAYFAST_MERCHANT_ID],
    ['merchant_key', env.PAYFAST_MERCHANT_KEY],
    ['return_url', `${site}/events/success/?order=${order.id}`],
    ['cancel_url', `${site}/events/cancelled/?order=${order.id}`],
    ['notify_url', `${site}/api/payfast/itn`],
    ['name_first', first],
    ['name_last', rest.join(' ')],
    ['email_address', email],
    ['m_payment_id', order.id],
    ['amount', (order.amount_cents / 100).toFixed(2)],
    ['item_name', `${tt?.events?.title ?? 'Event'} — ${quantity} x ${tt?.name ?? 'Ticket'}`.slice(0, 100)],
  ].filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '');

  const signature = await signCheckoutFields(fields, env.PAYFAST_PASSPHRASE);
  fields.push(['signature', signature]);

  return json({ action: `https://${payfastHost(env)}/eng/process`, fields, orderId: order.id });
}

// ---------------------------------------------------------------------------
// POST /api/payfast/itn — PayFast's server-to-server payment notification.
// This is the ONLY place an order becomes "paid".
// ---------------------------------------------------------------------------
async function payfastItn(request, env) {
  const params = new URLSearchParams(await request.text());
  const orderId = params.get('m_payment_id');
  if (!UUID_RE.test(orderId || '')) return new Response('Bad request', { status: 400 });

  const supabase = db(env);
  const { data: order } = await supabase.from('orders').select('*').eq('id', orderId).single();
  if (!order) return new Response('Unknown order', { status: 400 });

  const check = await validateItn({ params, request, env, expectedAmountCents: order.amount_cents });
  if (!check.ok) {
    console.error(`ITN rejected for order ${orderId}: ${check.reason}`);
    return new Response('Invalid notification', { status: 400 });
  }

  const status = params.get('payment_status');
  if (status === 'COMPLETE') {
    const { data: tickets, error } = await supabase.rpc('complete_order', {
      p_order_id: orderId,
      p_pf_payment_id: params.get('pf_payment_id'),
    });
    if (error) throw error;

    // Empty = this notification was already processed (PayFast retries); don't email twice
    if (tickets?.length) {
      const { data: tt } = await supabase
        .from('ticket_types')
        .select('name, events(title, starts_at, venue, city)')
        .eq('id', order.ticket_type_id)
        .single();
      await sendTicketEmail(env, { order, event: tt.events, ticketType: tt, tickets });
    }
  } else if (status === 'CANCELLED' || status === 'FAILED') {
    await supabase.from('orders').update({ status: 'failed' }).eq('id', orderId).eq('status', 'pending');
  }

  return new Response('OK');
}

// ---------------------------------------------------------------------------
// GET /api/orders/:id — status for the "thank you" page (no personal data)
// ---------------------------------------------------------------------------
async function orderStatus(id, env) {
  if (!UUID_RE.test(id)) return json({ error: 'Not found' }, 404);
  const supabase = db(env);
  const { data: order } = await supabase
    .from('orders')
    .select('id, status, quantity, amount_cents, ticket_types(name, events(title, starts_at)), tickets(id)')
    .eq('id', id)
    .single();
  if (!order) return json({ error: 'Not found' }, 404);
  return json(
    {
      id: order.id,
      status: order.status,
      quantity: order.quantity,
      amountCents: order.amount_cents,
      ticketType: order.ticket_types?.name,
      event: order.ticket_types?.events,
      tickets: order.status === 'paid' ? order.tickets.map((t) => t.id) : [],
    },
    200,
    { 'cache-control': 'no-store' }
  );
}

// ---------------------------------------------------------------------------
// GET /api/tickets/:id — a single ticket for the ticket/QR page
// ---------------------------------------------------------------------------
async function ticket(id, env) {
  if (!UUID_RE.test(id)) return json({ error: 'Not found' }, 404);
  const supabase = db(env);
  const { data: t } = await supabase
    .from('tickets')
    .select('id, checked_in_at, orders(id, status, buyer_name, ticket_types(name, events(title, starts_at, ends_at, venue, city)))')
    .eq('id', id)
    .single();
  if (!t || t.orders?.status !== 'paid') return json({ error: 'Not found' }, 404);
  return json(
    {
      id: t.id,
      checkedInAt: t.checked_in_at,
      holder: t.orders.buyer_name,
      orderId: t.orders.id,
      ticketType: t.orders.ticket_types?.name,
      event: t.orders.ticket_types?.events,
    },
    200,
    { 'cache-control': 'no-store' }
  );
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '');
    const method = request.method;

    try {
      if (path === '/api/events' && method === 'GET') return await listEvents(env);
      if (path === '/api/checkout' && method === 'POST') return await checkout(request, env);
      if (path === '/api/payfast/itn' && method === 'POST') return await payfastItn(request, env);

      let m;
      if ((m = path.match(/^\/api\/orders\/([^/]+)$/)) && method === 'GET') return await orderStatus(m[1], env);
      if ((m = path.match(/^\/api\/tickets\/([^/]+)$/)) && method === 'GET') return await ticket(m[1], env);

      if (path.startsWith('/api')) return json({ error: 'Not found' }, 404);
      return env.ASSETS.fetch(request);
    } catch (err) {
      console.error(`${method} ${path} failed:`, err?.message || err);
      return json({ error: 'Something went wrong. Please try again.' }, 500);
    }
  },
};
