import React, { useEffect, useState } from 'react';
import { CheckCircle2, Clock, XCircle, Loader2, Ticket } from 'lucide-react';
import CTAButton from '../components/CTAButton';
import { fetchOrder, formatEventDate, formatZAR } from '../lib/eventsApi';
import { withBase } from '../lib/paths';

// PayFast sends the buyer back here. The page never trusts the redirect itself:
// it asks the server, which only marks an order paid after PayFast's ITN.
export default function EventCheckoutResultPage({ variant, onNavigate }) {
  const [order, setOrder] = useState(null);
  const [phase, setPhase] = useState('loading'); // loading | paid | waiting | cancelled | unknown

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('order');
    if (!id) {
      setPhase(variant === 'cancelled' ? 'cancelled' : 'unknown');
      return;
    }
    let attempts = 0;
    let timer;
    const poll = async () => {
      attempts += 1;
      try {
        const o = await fetchOrder(id);
        setOrder(o);
        if (o.status === 'paid') return setPhase('paid');
        if (variant === 'cancelled' || o.status === 'failed' || o.status === 'expired') return setPhase('cancelled');
        // PayFast's notification can arrive a few seconds after the redirect
        if (attempts < 12) {
          setPhase('waiting');
          timer = setTimeout(poll, 2500);
        } else setPhase('waiting');
      } catch {
        setPhase(variant === 'cancelled' ? 'cancelled' : 'unknown');
      }
    };
    poll();
    return () => clearTimeout(timer);
  }, [variant]);

  const card = 'max-w-xl w-full bg-afrilink-surface rounded-2xl border border-afrilink-grey-light shadow-card p-8 sm:p-10 text-center';

  return (
    <div className="min-h-screen bg-afrilink-cream/50 pt-36 lg:pt-44 pb-24 px-4 flex justify-center">
      {phase === 'loading' && (
        <div className={card}>
          <Loader2 className="w-10 h-10 text-afrilink-orange animate-spin mx-auto mb-4" />
          <p className="text-afrilink-fg-60">Checking your order…</p>
        </div>
      )}

      {phase === 'paid' && order && (
        <div className={card}>
          <CheckCircle2 className="w-14 h-14 text-green-600 mx-auto mb-4" />
          <h1 className="font-heading text-3xl font-semibold text-afrilink-fg mb-2">You're booked!</h1>
          <p className="text-afrilink-fg-80 mb-6">
            Payment received for <strong>{order.quantity} × {order.ticketType}</strong> ({formatZAR(order.amountCents)}). We've emailed your tickets too.
          </p>
          {order.event && (
            <div className="rounded-lg bg-afrilink-cream/60 p-4 mb-6 text-left">
              <div className="font-semibold text-afrilink-fg">{order.event.title}</div>
              <div className="text-sm text-afrilink-fg-60">{formatEventDate(order.event.starts_at)}</div>
            </div>
          )}
          <div className="space-y-2 mb-8">
            {order.tickets.map((id, i) => (
              <a
                key={id}
                href={withBase(`/events/ticket/?id=${id}`)}
                className="flex items-center justify-between gap-3 rounded-lg border border-afrilink-grey px-4 py-3 hover:border-afrilink-orange transition-colors"
              >
                <span className="inline-flex items-center gap-2 font-semibold text-afrilink-fg"><Ticket className="w-4 h-4 text-afrilink-orange" /> Ticket {i + 1}</span>
                <span className="text-sm text-afrilink-orange font-semibold">View QR code →</span>
              </a>
            ))}
          </div>
          <CTAButton variant="outline" size="md" onClick={() => onNavigate('events')}>Back to events</CTAButton>
        </div>
      )}

      {phase === 'waiting' && (
        <div className={card}>
          <Clock className="w-14 h-14 text-afrilink-orange mx-auto mb-4" />
          <h1 className="font-heading text-3xl font-semibold text-afrilink-fg mb-2">Confirming your payment</h1>
          <p className="text-afrilink-fg-80 mb-2">We're waiting for PayFast to confirm your payment. This usually takes a few seconds.</p>
          <p className="text-afrilink-fg-60 text-sm mb-8">
            You can close this page. Your tickets will be emailed as soon as payment is confirmed. If they haven't arrived within an hour, please contact us with reference <span className="font-mono">{order?.id}</span>.
          </p>
          <CTAButton variant="outline" size="md" onClick={() => window.location.reload()}>Check again</CTAButton>
        </div>
      )}

      {phase === 'cancelled' && (
        <div className={card}>
          <XCircle className="w-14 h-14 text-afrilink-fg-60 mx-auto mb-4" />
          <h1 className="font-heading text-3xl font-semibold text-afrilink-fg mb-2">Payment not completed</h1>
          <p className="text-afrilink-fg-80 mb-8">Your payment was cancelled, so you have not been charged. Your seats have been released.</p>
          <CTAButton variant="orange" size="md" onClick={() => onNavigate('events')}>Back to events</CTAButton>
        </div>
      )}

      {phase === 'unknown' && (
        <div className={card}>
          <XCircle className="w-14 h-14 text-afrilink-fg-60 mx-auto mb-4" />
          <h1 className="font-heading text-3xl font-semibold text-afrilink-fg mb-2">Order not found</h1>
          <p className="text-afrilink-fg-80 mb-8">We couldn't find this order. If you were charged, please contact us and we'll sort it out.</p>
          <CTAButton variant="orange" size="md" onClick={() => onNavigate('contact')}>Contact Us</CTAButton>
        </div>
      )}
    </div>
  );
}
