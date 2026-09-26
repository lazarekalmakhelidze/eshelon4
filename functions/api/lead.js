// Public endpoint: saves contact/order requests from the site into KV.
// Optional Telegram notification if TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID secrets are set.
import { json } from '../../lib/admin-auth';

const clip = (v, n) => String(v == null ? '' : v).trim().slice(0, n);

export async function onRequestPost({ request, env, waitUntil }) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ error: 'bad-json' }, 400);
  }
  // honeypot field — bots fill it, people never see it
  if (body.website) return json({ ok: true });

  const lead = {
    type: clip(body.type, 20) || 'contact',
    name: clip(body.name, 120),
    phone: clip(body.phone, 40),
    company: clip(body.company, 160),
    message: clip(body.message, 3000),
    package: clip(body.package, 160),
    price: clip(body.price, 80),
    details: clip(body.details, 1500),
    page: clip(body.page, 200),
    createdAt: new Date().toISOString(),
    done: false
  };
  if (!lead.name || !lead.phone) return json({ error: 'missing-fields' }, 400);
  if (!/[0-9]{6,}/.test(lead.phone.replace(/[^0-9]/g, ''))) return json({ error: 'bad-phone' }, 400);

  // simple rate limit: 6 requests / 10 minutes per IP
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const rlKey = `rl:${ip}`;
  const count = Number((await env.SITE_KV.get(rlKey)) || 0);
  if (count >= 6) return json({ error: 'too-many' }, 429);
  waitUntil(env.SITE_KV.put(rlKey, String(count + 1), { expirationTtl: 600 }));

  const id = `${Date.now()}-${crypto.randomUUID().slice(0, 6)}`;
  // newest first when listing: invert timestamp in the key
  const sortKey = String(9999999999999 - Date.now()).padStart(13, '0');
  await env.SITE_KV.put(`lead:${sortKey}:${id}`, JSON.stringify({ id, ...lead }));

  if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
    const labels = { contact: 'შეტყობინება', order: 'შეკვეთა', finder: 'პაკეტის შერჩევა' };
    const lines = [
      `🔴 ESHELON — ახალი ${labels[lead.type] || 'მოთხოვნა'}`,
      `👤 ${lead.name}`,
      `📞 ${lead.phone}`,
      lead.company && `🏢 ${lead.company}`,
      lead.package && `📦 ${lead.package}${lead.price ? ` — ${lead.price}` : ''}`,
      lead.details && `🧩 ${lead.details}`,
      lead.message && `💬 ${lead.message}`
    ].filter(Boolean);
    waitUntil(
      fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text: lines.join('\n') })
      }).catch(() => {})
    );
  }
  return json({ ok: true });
}
