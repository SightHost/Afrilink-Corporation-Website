// PayFast helpers: request signing and ITN (Instant Transaction Notification) validation.
// Docs: https://developers.payfast.co.za/docs#step_1_form_fields and #step_4_confirm_payment

const HOSTS = {
  sandbox: 'sandbox.payfast.co.za',
  live: 'www.payfast.co.za',
};

// Hosts PayFast sends ITNs from (their docs validate the sender against these)
const ITN_SOURCE_HOSTS = ['www.payfast.co.za', 'sandbox.payfast.co.za', 'w1w.payfast.co.za', 'w2w.payfast.co.za'];

export function payfastHost(env) {
  return env.PAYFAST_MODE === 'live' ? HOSTS.live : HOSTS.sandbox;
}

// Matches PHP's urlencode(), which PayFast uses server-side to compute signatures
export function pfEncode(value) {
  return encodeURIComponent(String(value))
    .replace(/[!'()*~]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase())
    .replace(/%20/g, '+');
}

async function md5Hex(input) {
  // Cloudflare Workers support MD5 in crypto.subtle (needed by PayFast's signature scheme)
  const digest = await crypto.subtle.digest('MD5', new TextEncoder().encode(input));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function withPassphrase(paramString, passphrase) {
  return passphrase ? `${paramString}&passphrase=${pfEncode(passphrase.trim())}` : paramString;
}

// Signature for the checkout form. Fields must be in PayFast's documented order;
// empty values are left out.
export async function signCheckoutFields(fields, passphrase) {
  const paramString = fields
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '')
    .map(([k, v]) => `${k}=${pfEncode(String(v).trim())}`)
    .join('&');
  return md5Hex(withPassphrase(paramString, passphrase));
}

// Build the param string from an ITN body: every field, in the order received,
// up to (not including) "signature".
function itnParamString(params) {
  const parts = [];
  for (const [k, v] of params) {
    if (k === 'signature') break;
    parts.push(`${k}=${pfEncode(v)}`);
  }
  return parts.join('&');
}

async function resolveA(host) {
  const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${host}&type=A`, {
    headers: { accept: 'application/dns-json' },
  });
  if (!res.ok) return [];
  const json = await res.json();
  return (json.Answer || []).filter((a) => a.type === 1).map((a) => a.data);
}

async function isPayfastSourceIp(ip) {
  if (!ip) return false;
  const lists = await Promise.all(ITN_SOURCE_HOSTS.map(resolveA));
  return lists.flat().includes(ip);
}

/**
 * Run PayFast's four ITN security checks. Returns { ok: true } or { ok: false, reason }.
 * The amount check needs the order, so the caller passes expectedAmountCents.
 */
export async function validateItn({ params, request, env, expectedAmountCents }) {
  // 1. Signature
  const paramString = itnParamString(params);
  const expected = await md5Hex(withPassphrase(paramString, env.PAYFAST_PASSPHRASE));
  if (expected !== params.get('signature')) return { ok: false, reason: 'bad signature' };

  // 2. Merchant
  if (params.get('merchant_id') !== env.PAYFAST_MERCHANT_ID) return { ok: false, reason: 'wrong merchant' };

  // 3. Source IP (can be disabled with PAYFAST_IP_CHECK=off if PayFast changes infrastructure)
  if (env.PAYFAST_IP_CHECK !== 'off') {
    const ip = request.headers.get('CF-Connecting-IP');
    if (!(await isPayfastSourceIp(ip))) return { ok: false, reason: `unexpected source IP ${ip}` };
  }

  // 4. Amount
  const gross = Math.round(parseFloat(params.get('amount_gross')) * 100);
  if (!Number.isFinite(gross) || Math.abs(gross - expectedAmountCents) > 1) {
    return { ok: false, reason: `amount mismatch (${gross} vs ${expectedAmountCents})` };
  }

  // 5. Server confirmation: ask PayFast whether it really sent this notification
  const confirm = await fetch(`https://${payfastHost(env)}/eng/query/validate`, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: paramString,
  });
  const verdict = (await confirm.text()).trim();
  if (verdict !== 'VALID') return { ok: false, reason: `server confirmation: ${verdict}` };

  return { ok: true };
}
