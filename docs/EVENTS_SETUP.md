# Events & Ticketing — Setup Guide

The code for the Events feature is in this repo. This guide covers the parts that need
your accounts: Supabase (database), PayFast (payments), Resend (ticket emails) and
Cloudflare (hosting). Work through it top to bottom.

## How it fits together

```
Visitor's browser                Cloudflare (afrilinkcorp.co.za)              Outside services
─────────────────                ───────────────────────────────              ────────────────
/events  (static page)  ──GET──▶  /api/events ─────────────────────────────▶  Supabase (events, tickets)
"Book tickets"          ──POST─▶  /api/checkout  → reserves seats,
                                  returns a signed PayFast form
browser submits form  ─────────────────────────────────────────────────────▶  PayFast payment page
                                  /api/payfast/itn  ◀──── payment notice ────  PayFast
                                  → verifies it, marks order paid,
                                    creates tickets, emails buyer ─────────▶  Resend → buyer's inbox
/events/success  ──GET─▶          /api/orders/:id  (shows "You're booked!")
/events/ticket   ──GET─▶          /api/tickets/:id (QR code page)
```

- Pages stay static (fast, cheap). Only `/api/*` runs server code (`worker/index.js`).
- An order only becomes **paid** when PayFast's server notification passes all security
  checks. The "success" page alone proves nothing, because anyone can open that URL.
- The home page shows a scrolling **events reel** under the hero. It hides itself
  when there are no events.

| File | Purpose |
|---|---|
| `supabase/events-schema.sql` | Tables, security rules, booking functions, image bucket, expiry job |
| `supabase/events-seed-sample.sql` | Optional test events |
| `worker/` | API: events list, checkout, PayFast notifications, orders, tickets, email |
| `src/views/EventsPage.jsx` | Upcoming events and past-event gallery |
| `src/components/BookingModal.jsx` | Ticket picker and buyer form |
| `src/components/EventsReel.jsx` | Home-page reel |
| `src/views/EventCheckoutResultPage.jsx`, `TicketPage.jsx` | After-payment pages, ticket with QR code |
| `wrangler.jsonc` | Cloudflare config (Worker, settings) |

---

## Step 1: Paperwork (start now, approval takes days)

1. **PayFast business account:** register at payfast.co.za and complete verification
   (company docs, FICA, bank account).
2. **PayFast sandbox account:** sign up at https://sandbox.payfast.co.za for testing.
3. **Refund policy:** PayFast checks for one. Decide your rules (e.g. "refunds only if the
   event is cancelled") and add them to the site's Terms & Conditions
   (`src/components/LegalModal.jsx` → `terms`). The booking form links to those terms.
4. **POPIA:** the privacy notice already covers contact forms. Add a line that ticket buyers'
   name, email and phone are collected to issue tickets and are stored with Supabase in the
   EU/UK.

## Step 2: Create the Supabase projects

Create **two** projects: one for development/testing and one for production. Sandbox
orders then never mix with real ones.

1. supabase.com → New project. Region: **London (eu-west-2)** or **Frankfurt
   (eu-central-1)**. There is no South African region. Save the database password.
2. **Production project → upgrade to Pro (~$25/month).** Free projects pause after a week
   without traffic, which would break ticket sales between events. Pro also adds daily backups.
3. In each project: **Database → Extensions → enable `pg_cron`**.
4. **SQL Editor → New query** → paste all of `supabase/events-schema.sql` → **Run**.
   It should finish with "Success".
5. (Dev project only, optional) Run `supabase/events-seed-sample.sql` to get one sample
   upcoming event with tickets and one past event with photos.
6. **Project Settings → API**. Copy:
   - **Project URL**, e.g. `https://abcd1234.supabase.co`
   - **service_role key** (under "Project API keys"; click Reveal).
     ⚠️ This key bypasses all security. Only ever put it in Cloudflare secrets or `.dev.vars`,
     never in front-end code, git, email or chat.
7. **Advisors → Security Advisor:** it should show no RLS warnings for the events tables.

## Step 3: PayFast settings

In **both** sandbox and live dashboards:

1. **Settings → Developer Settings → Salt Passphrase:** set a long random passphrase.
   (The signature check requires one.)
2. Note the **Merchant ID** and **Merchant Key**.
3. No URLs need to be configured in PayFast. The site sends `return_url`, `cancel_url` and
   `notify_url` with each payment.

## Step 4: Ticket emails (Resend)

1. Sign up at resend.com → **Domains → Add `afrilinkcorp.co.za`**.
2. Add the DNS records it shows in **Cloudflare → afrilinkcorp.co.za → DNS**, then click Verify.
3. **API Keys → Create** (sending access only). Copy the key.
4. The sender is set in `wrangler.jsonc` → `EVENTS_FROM_EMAIL`
   (`Afrilink Events <events@afrilinkcorp.co.za>`). Change it there if you prefer another address.

Without a Resend key, payments and tickets still work, but no email is sent. Buyers would
only see their tickets on the success page.

## Step 5: Cloudflare login

Wrangler (Cloudflare's deploy tool) must be logged in on the computer you deploy from.

```powershell
npx wrangler login        # approve in the browser; wait for "Successfully logged in"
npx wrangler whoami       # should show your account
```

If login keeps failing on Windows, use an API token instead: Cloudflare → My Profile →
API Tokens → Create Token → **Edit Cloudflare Workers** template → choose your account
and the `afrilinkcorp.co.za` zone, then:

```powershell
setx CLOUDFLARE_API_TOKEN "your-token"     # then open a new terminal
```

## Step 6: Test locally with the PayFast sandbox

1. Copy `.dev.vars.example` to `.dev.vars`. Fill in your **dev** Supabase URL and
   service_role key, and your **sandbox** PayFast merchant ID, key and passphrase.
2. PayFast must reach your computer to send the payment notification. Start a free
   Cloudflare Tunnel in a second terminal:
   ```powershell
   winget install --id Cloudflare.cloudflared
   cloudflared tunnel --url http://localhost:8787
   ```
   Copy the `https://….trycloudflare.com` address it prints into `SITE_URL` in `.dev.vars`.
3. Run the site with its API:
   ```powershell
   npm run dev:api
   ```
4. Open the **tunnel address** (not localhost) → `/events/` → Book tickets → pay with the
   sandbox wallet.
5. Check that you get:
   - [ ] the "You're booked!" page with ticket links,
   - [ ] the order showing `paid` in Supabase → Table Editor → `orders`, with rows in `tickets`,
   - [ ] the ticket email (if a Resend key is set),
   - [ ] a cancelled payment showing "Payment not completed" and the order becoming `failed`,
   - [ ] the home page showing the events reel.
6. Logs: the `npm run dev:api` terminal prints any rejected PayFast notification with the
   reason.

For working on page design only, `npm run dev` runs the normal hot-reload server.
It forwards `/api` calls to `npm run dev:api` if that is running in another terminal.

## Step 7: Production settings and first deploy

1. Edit `wrangler.jsonc` → `vars`:
   - `SUPABASE_URL`: your **production** project URL.
   - Leave `PAYFAST_MODE` as `"sandbox"` for the first deploy.
2. Set the secrets (each command asks you to paste the value):
   ```powershell
   npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY   # production project
   npx wrangler secret put PAYFAST_MERCHANT_ID         # sandbox values for now
   npx wrangler secret put PAYFAST_MERCHANT_KEY
   npx wrangler secret put PAYFAST_PASSPHRASE
   npx wrangler secret put RESEND_API_KEY
   ```
3. Deploy: `npm run deploy`.
4. Do one sandbox purchase on https://afrilinkcorp.co.za/events/. Watch the logs live with
   `npx wrangler tail`. Then delete the test order and tickets in Supabase.

## Step 8: Go live

1. Re-run `wrangler secret put` for the three PAYFAST_* secrets with your **live**
   merchant ID, key and passphrase.
2. In `wrangler.jsonc` set `"PAYFAST_MODE": "live"`, then `npm run deploy`.
3. Buy one real R5–R10 ticket (create a cheap hidden test ticket type), check the money,
   ticket and email, then refund it from the PayFast dashboard.
4. Remove any sample data: `delete from events where slug like 'sample-%';`

## Running events day to day (Supabase Table Editor)

**Add an upcoming event**
1. **Storage → event-media** → upload the cover image → click it → **Get URL**.
2. **Table Editor → events → Insert row**: `slug` (lowercase-with-dashes, used in links),
   `title`, `summary` (1–2 lines), `description`, `venue`, `city`, `starts_at`, `ends_at`,
   `cover_image_url` (the URL from step 1), `featured` (leads the home reel).
   Leave `published` **false** until it's ready.
3. **ticket_types → Insert row** for each tier: `event_id`, `name`, `description`,
   `price_cents` (R350 = `35000`; minimum `500`), `capacity`, optional `sales_end_at`,
   `sort_order`.
4. Set the event's `published` to **true**. It appears on the site within about a minute.

**Add photos after an event**
Upload them to `event-media` (one folder per event is tidy), then add rows to
**event_media** (`event_id`, `url`, `caption`, `sort_order`). Once `starts_at`/`ends_at`
has passed, the event moves to the Past events gallery automatically.

**See sales:** `orders` (filter `status = paid`) and `tickets`. For a quick report, use
SQL Editor:
```sql
select e.title, tt.name, tt.sold, tt.capacity, sum(o.amount_cents)/100.0 as revenue_rand
from ticket_types tt join events e on e.id = tt.event_id
left join orders o on o.ticket_type_id = tt.id and o.status = 'paid'
group by e.title, tt.name, tt.sold, tt.capacity order by e.title;
```

**At the door:** each ticket's QR code holds `AFRILINK-TICKET:<ticket id>`. For now, look the
ID up in `tickets` and fill in `checked_in_at`. A scanner page for staff phones is a good
next step (see below).

**Refunds:** refund in the PayFast dashboard, then set the order's `status` to `failed` and
reduce that ticket type's `sold` by the order quantity.

## Behaviour worth knowing

- **Seat holds:** starting checkout reserves seats for 30 minutes. Unpaid orders expire
  automatically (pg_cron, every 10 minutes) and the seats return to sale.
- **Late payments:** if someone pays after their hold expired, they still get their tickets,
  because they have paid. In rare cases this can put an event one or two over capacity.
- **Duplicate notifications:** PayFast retries notifications. The database function ignores
  repeats, so nobody gets charged-but-double-ticketed or double-emailed.
- **GitHub Pages copy:** the GitHub Pages build has no `/api`, so its Events page shows
  "We couldn't load events" and the home reel stays hidden. The real site is on Cloudflare.
- **PayFast IP check:** notifications are only accepted from PayFast's servers. If PayFast
  changes servers and valid payments start being rejected (`unexpected source IP` in the
  logs), add `"PAYFAST_IP_CHECK": "off"` to `vars`. The signature and server confirmation
  checks still protect you.

## Suggested next steps

1. **Door check-in page:** staff-only `/admin/checkin` with a phone-camera QR scanner,
   protected by Cloudflare Access (free for up to 50 staff).
2. **Admin dashboard:** create events and upload photos without using Supabase directly.
3. **Free / RSVP events:** registration without payment (currently every ticket must cost at least R5).
4. **Discount codes and early-bird pricing.**
