-- ============================================================================
-- OPTIONAL sample data for testing the Events pages in the PayFast sandbox.
-- Run in your development Supabase project only. Delete before going live:
--   delete from events where slug like 'sample-%';
-- ============================================================================

with upcoming as (
  insert into events (slug, title, summary, description, venue, city, starts_at, ends_at, cover_image_url, published, featured)
  values (
    'sample-investor-summit',
    'Sample: Diaspora Investor Summit',
    'A one-day summit on structured investment into SADC mining and infrastructure.',
    E'Join Afrilink leadership, DFIs and diaspora investors for a day of briefings and networking.\n\nThis is sample data for testing.',
    'Sandton Convention Centre', 'Johannesburg',
    now() + interval '30 days', now() + interval '30 days 8 hours',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80',
    true, true
  )
  returning id
)
insert into ticket_types (event_id, name, description, price_cents, capacity, sort_order)
select id, 'General Admission', 'Full-day access, lunch included', 35000, 200, 1 from upcoming
union all
select id, 'VIP', 'Front seating, VIP lounge and networking dinner', 150000, 30, 2 from upcoming;

with past as (
  insert into events (slug, title, summary, venue, city, starts_at, cover_image_url, published)
  values (
    'sample-botswana-mining-forum',
    'Sample: Botswana Mining Forum',
    'Highlights from our mining tenure and offtake forum in Gaborone.',
    'Gaborone International Convention Centre', 'Gaborone',
    now() - interval '60 days',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80',
    true
  )
  returning id
)
insert into event_media (event_id, url, caption, sort_order)
select id, u.url, u.caption, u.ord from past,
  (values
    ('https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80', 'Opening keynote', 1),
    ('https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80', 'Panel discussion', 2),
    ('https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80', 'Networking session', 3)
  ) as u(url, caption, ord);
