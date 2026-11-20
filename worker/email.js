// Ticket confirmation email via Resend (https://resend.com/docs/api-reference/emails/send-email).
// Skipped (with a log line) when RESEND_API_KEY is not configured.

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function formatDate(iso) {
  return new Intl.DateTimeFormat('en-ZA', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Africa/Johannesburg',
  }).format(new Date(iso));
}

export async function sendTicketEmail(env, { order, event, ticketType, tickets }) {
  if (!env.RESEND_API_KEY) {
    console.log(`RESEND_API_KEY not set; skipped ticket email for order ${order.id}`);
    return;
  }

  const site = env.SITE_URL.replace(/\/$/, '');
  const ticketLinks = tickets
    .map(
      (t, i) => `
        <tr><td style="padding:10px 0;border-bottom:1px solid #EDEDED">
          <strong>Ticket ${i + 1} of ${tickets.length}</strong><br>
          <a href="${site}/events/ticket/?id=${t.id}" style="color:#F37121;font-weight:600">View ticket &amp; QR code</a>
          <div style="color:#5A5E6E;font-size:12px;font-family:monospace">${t.id}</div>
        </td></tr>`
    )
    .join('');

  const where = [event.venue, event.city].filter(Boolean).join(', ');

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#040922">
    <div style="background:#040922;padding:24px;border-radius:8px 8px 0 0">
      <div style="color:#FFD177;font-size:13px;font-weight:600">AFRILINK EVENTS</div>
      <div style="color:#fff;font-size:22px;font-weight:600;margin-top:6px">Your tickets are confirmed</div>
    </div>
    <div style="border:1px solid #EDEDED;border-top:0;padding:24px;border-radius:0 0 8px 8px">
      <p>Hi ${esc(order.buyer_name)},</p>
      <p>Thank you for your purchase. Here are your tickets for:</p>
      <p style="font-size:18px;font-weight:600;margin:0">${esc(event.title)}</p>
      <p style="color:#2B3044;margin:4px 0 16px">${esc(formatDate(event.starts_at))}${where ? `<br>${esc(where)}` : ''}</p>
      <p style="margin:0 0 8px"><strong>${order.quantity} × ${esc(ticketType.name)}</strong> — R ${(order.amount_cents / 100).toFixed(2)} paid</p>
      <table style="width:100%;border-collapse:collapse">${ticketLinks}</table>
      <p style="margin-top:20px">Show each ticket's QR code at the entrance, on your phone or printed.</p>
      <p style="color:#5A5E6E;font-size:12px">Order reference: ${order.id}</p>
    </div>
  </div>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: env.EVENTS_FROM_EMAIL,
      to: [order.buyer_email],
      subject: `Your tickets: ${event.title}`,
      html,
    }),
  });
  if (!res.ok) console.error(`Ticket email failed for order ${order.id}: ${res.status} ${await res.text()}`);
}
