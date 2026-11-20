-- ============================================================================
-- Afrilink Events — Supabase schema
-- Run once in Supabase → SQL Editor (safe to re-run: uses IF NOT EXISTS / OR REPLACE).
-- See docs/EVENTS_SETUP.md for the full setup guide.
-- ============================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

-- An event, past or future. Past/future is derived from starts_at.
create table if not exists events (
  id               bigint generated always as identity primary key,
  slug             text unique not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title            text not null,
  summary          text,                          -- one or two lines for cards and the reel
  description      text,                          -- full description (plain text, line breaks kept)
  venue            text,
  city             text,
  starts_at        timestamptz not null,
  ends_at          timestamptz,
  cover_image_url  text,                          -- public URL (e.g. from the event-media bucket)
  published        boolean not null default false, -- only published events appear on the site
  featured         boolean not null default false, -- featured events lead the home-page reel
  created_at       timestamptz not null default now()
);

-- Ticket tiers for an event (e.g. General, VIP). Prices in cents (ZAR).
create table if not exists ticket_types (
  id            bigint generated always as identity primary key,
  event_id      bigint not null references events(id) on delete cascade,
  name          text not null,
  description   text,
  price_cents   int not null check (price_cents >= 500),   -- PayFast minimum is R5.00
  capacity      int not null check (capacity >= 0),
  sold          int not null default 0 check (sold >= 0),
  sales_end_at  timestamptz,                                -- optional; defaults to event start
  sort_order    int not null default 0
);

-- One checkout attempt. id is sent to PayFast as m_payment_id.
create table if not exists orders (
  id              uuid primary key default gen_random_uuid(),
  ticket_type_id  bigint not null references ticket_types(id),
  quantity        int not null check (quantity between 1 and 10),
  amount_cents    int not null,
  buyer_name      text not null,
  buyer_email     text not null,
  buyer_phone     text,
  status          text not null default 'pending'
                  check (status in ('pending', 'paid', 'failed', 'expired')),
  pf_payment_id   text,
  created_at      timestamptz not null default now(),
  paid_at         timestamptz
);
create index if not exists orders_ticket_type_status_idx on orders (ticket_type_id, status, created_at);

-- One row per admitted person. id is encoded in the QR code.
create table if not exists tickets (
  id             uuid primary key default gen_random_uuid(),
  order_id       uuid not null references orders(id) on delete cascade,
  checked_in_at  timestamptz,
  created_at     timestamptz not null default now()
);
create index if not exists tickets_order_idx on tickets (order_id);

-- Photos for the past-events gallery.
create table if not exists event_media (
  id          bigint generated always as identity primary key,
  event_id    bigint not null references events(id) on delete cascade,
  url         text not null,
  caption     text,
  sort_order  int not null default 0
);
create index if not exists event_media_event_idx on event_media (event_id, sort_order);

-- ---------------------------------------------------------------------------
-- Availability: seats left = capacity − sold − seats held by unpaid orders (30 min)
-- ---------------------------------------------------------------------------
create or replace view ticket_availability with (security_invoker = true) as
select
  tt.id as ticket_type_id,
  greatest(
    tt.capacity - tt.sold - coalesce((
      select sum(o.quantity) from orders o
       where o.ticket_type_id = tt.id
         and o.status = 'pending'
         and o.created_at > now() - interval '30 minutes'
    ), 0),
    0
  )::int as remaining
from ticket_types tt;

-- ---------------------------------------------------------------------------
-- create_order: reserve seats and open a pending order, atomically.
-- The row lock (FOR UPDATE) stops two buyers taking the last seat at once.
-- ---------------------------------------------------------------------------
create or replace function create_order(
  p_ticket_type_id bigint,
  p_quantity       int,
  p_name           text,
  p_email          text,
  p_phone          text default null
) returns orders
language plpgsql security definer set search_path = public as $$
declare
  tt        ticket_types;
  ev        events;
  reserved  int;
  o         orders;
begin
  select * into tt from ticket_types where id = p_ticket_type_id for update;
  if not found then raise exception 'TICKET_TYPE_NOT_FOUND'; end if;

  select * into ev from events where id = tt.event_id;
  if not ev.published then raise exception 'EVENT_NOT_AVAILABLE'; end if;
  if now() >= coalesce(tt.sales_end_at, ev.starts_at) then raise exception 'SALES_CLOSED'; end if;
  if p_quantity < 1 or p_quantity > 10 then raise exception 'INVALID_QUANTITY'; end if;

  select coalesce(sum(quantity), 0) into reserved from orders
   where ticket_type_id = tt.id and status = 'pending'
     and created_at > now() - interval '30 minutes';

  if tt.sold + reserved + p_quantity > tt.capacity then raise exception 'SOLD_OUT'; end if;

  insert into orders (ticket_type_id, quantity, amount_cents, buyer_name, buyer_email, buyer_phone)
  values (tt.id, p_quantity, tt.price_cents * p_quantity, trim(p_name), lower(trim(p_email)), nullif(trim(p_phone), ''))
  returning * into o;

  return o;
end $$;

-- ---------------------------------------------------------------------------
-- complete_order: mark paid and issue tickets. Idempotent — if PayFast sends
-- the same notification twice, the second call returns no rows.
-- ---------------------------------------------------------------------------
create or replace function complete_order(p_order_id uuid, p_pf_payment_id text)
returns setof tickets
language plpgsql security definer set search_path = public as $$
declare o orders;
begin
  update orders
     set status = 'paid', pf_payment_id = p_pf_payment_id, paid_at = now()
   where id = p_order_id and status in ('pending', 'expired')
  returning * into o;
  if not found then return; end if;

  update ticket_types set sold = sold + o.quantity where id = o.ticket_type_id;

  return query
    insert into tickets (order_id)
    select o.id from generate_series(1, o.quantity)
    returning *;
end $$;

-- Only the server (service role) may call these.
revoke execute on function create_order(bigint, int, text, text, text) from public, anon, authenticated;
revoke execute on function complete_order(uuid, text) from public, anon, authenticated;

-- ---------------------------------------------------------------------------
-- Row Level Security. The website's server uses the service-role key, which
-- bypasses RLS; these policies only matter for the public anon key.
-- Orders and tickets have no public policies, so they are never exposed.
-- ---------------------------------------------------------------------------
alter table events       enable row level security;
alter table ticket_types enable row level security;
alter table orders       enable row level security;
alter table tickets      enable row level security;
alter table event_media  enable row level security;

drop policy if exists "public reads published events" on events;
create policy "public reads published events" on events
  for select using (published);

drop policy if exists "public reads ticket types of published events" on ticket_types;
create policy "public reads ticket types of published events" on ticket_types
  for select using (exists (select 1 from events e where e.id = event_id and e.published));

drop policy if exists "public reads media of published events" on event_media;
create policy "public reads media of published events" on event_media
  for select using (exists (select 1 from events e where e.id = event_id and e.published));

-- ---------------------------------------------------------------------------
-- Storage bucket for event covers and gallery photos (publicly readable).
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('event-media', 'event-media', true)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Expire unpaid orders every 10 minutes (needs the pg_cron extension:
-- Database → Extensions → enable "pg_cron" first, then run this block).
-- ---------------------------------------------------------------------------
create extension if not exists pg_cron;
select cron.unschedule('expire-unpaid-orders')
 where exists (select 1 from cron.job where jobname = 'expire-unpaid-orders');
select cron.schedule('expire-unpaid-orders', '*/10 * * * *', $$
  update public.orders set status = 'expired'
   where status = 'pending' and created_at < now() - interval '30 minutes'
$$);
