import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Calendar, MapPin, Printer, Loader2, XCircle, CheckCircle2 } from 'lucide-react';
import CTAButton from '../components/CTAButton';
import { fetchTicket, formatEventDate, formatEventTime, placeLabel } from '../lib/eventsApi';

// A single ticket with its QR code. The QR encodes only the ticket ID, which
// door staff can look up (or scan, once a check-in tool is added).
export default function TicketPage({ onNavigate }) {
  const [ticket, setTicket] = useState(null);
  const [qr, setQr] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id');
    if (!id) return setError(true);
    fetchTicket(id)
      .then(async (t) => {
        setTicket(t);
        setQr(await QRCode.toString(`AFRILINK-TICKET:${t.id}`, { type: 'svg', margin: 1, errorCorrectionLevel: 'M' }));
      })
      .catch(() => setError(true));
  }, []);

  return (
    <div className="min-h-screen bg-afrilink-cream/50 pt-36 lg:pt-44 pb-24 px-4 flex justify-center print:pt-4 print:bg-white">
      {!ticket && !error && (
        <div className="flex items-center gap-3 text-afrilink-fg-60 py-24"><Loader2 className="w-5 h-5 animate-spin text-afrilink-orange" /> Loading ticket…</div>
      )}

      {error && (
        <div className="max-w-md w-full bg-afrilink-surface rounded-2xl border border-afrilink-grey-light shadow-card p-10 text-center">
          <XCircle className="w-12 h-12 text-afrilink-fg-60 mx-auto mb-4" />
          <h1 className="font-heading text-2xl font-semibold text-afrilink-fg mb-2">Ticket not found</h1>
          <p className="text-afrilink-fg-60 mb-6">Please use the link from your confirmation email, or contact us for help.</p>
          <CTAButton variant="orange" size="md" onClick={() => onNavigate('contact')}>Contact Us</CTAButton>
        </div>
      )}

      {ticket && (
        <div className="w-full max-w-md">
          <article className="bg-afrilink-surface rounded-2xl shadow-card-hover overflow-hidden border border-afrilink-grey-light">
            <div className="bg-afrilink-navy text-white p-6">
              <div className="text-afrilink-gold text-[13px] font-semibold">Afrilink Events · {ticket.ticketType}</div>
              <h1 className="font-heading text-2xl font-semibold leading-tight mt-1">{ticket.event?.title}</h1>
              <div className="mt-3 space-y-1 text-sm text-white/80">
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-afrilink-orange" />{formatEventDate(ticket.event.starts_at)} · {formatEventTime(ticket.event.starts_at)}</div>
                {placeLabel(ticket.event) && <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-afrilink-orange" />{placeLabel(ticket.event)}</div>}
              </div>
            </div>
            {/* Perforation */}
            <div className="relative h-0 border-t-2 border-dashed border-afrilink-grey mx-6">
              <span className="absolute -left-9 -top-3 w-6 h-6 rounded-full bg-afrilink-cream print:bg-white" />
              <span className="absolute -right-9 -top-3 w-6 h-6 rounded-full bg-afrilink-cream print:bg-white" />
            </div>
            <div className="p-6 flex flex-col items-center">
              <div className="w-56 h-56" aria-label="Ticket QR code" dangerouslySetInnerHTML={{ __html: qr }} />
              <div className="mt-4 text-center">
                <div className="text-xs font-semibold text-afrilink-fg-60">Ticket holder</div>
                <div className="font-semibold text-afrilink-fg">{ticket.holder}</div>
                <div className="mt-2 font-mono text-[11px] text-afrilink-fg-60 break-all">{ticket.id}</div>
              </div>
              {ticket.checkedInAt && (
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-green-50 border border-green-200 px-3 py-1 text-xs font-semibold text-green-800">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Checked in
                </div>
              )}
            </div>
          </article>
          <div className="mt-6 flex justify-center print:hidden">
            <CTAButton variant="outline" size="md" onClick={() => window.print()} icon={false}>
              <span className="inline-flex items-center gap-2"><Printer className="w-4 h-4" /> Print ticket</span>
            </CTAButton>
          </div>
        </div>
      )}
    </div>
  );
}
