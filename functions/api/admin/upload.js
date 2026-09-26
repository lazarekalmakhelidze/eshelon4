import { isAdmin, json, denied } from '../../../lib/admin-auth';

const TYPES = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif', 'image/svg+xml': 'svg' };

// Body: raw image bytes. Returns { url: "/img/<id>.<ext>" }.
export async function onRequestPost({ request, env }) {
  if (!(await isAdmin(request, env))) return denied();
  const type = (request.headers.get('Content-Type') || '').split(';')[0].trim();
  if (!TYPES[type]) return json({ error: 'unsupported-type' }, 415);
  const data = await request.arrayBuffer();
  if (!data.byteLength) return json({ error: 'empty' }, 400);
  if (data.byteLength > 20 * 1024 * 1024) return json({ error: 'too-large' }, 413);
  const name = `${Date.now().toString(36)}-${crypto.randomUUID().slice(0, 8)}.${TYPES[type]}`;
  await env.SITE_KV.put(`img:${name}`, data, { metadata: { type } });
  return json({ ok: true, url: `/img/${name}` });
}
