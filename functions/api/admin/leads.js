import { isAdmin, json, denied } from '../../../lib/admin-auth';

// Body: { action: 'list' } | { action: 'update', key, done } | { action: 'delete', key }
export async function onRequestPost({ request, env }) {
  if (!(await isAdmin(request, env))) return denied();
  let body = {};
  try { body = await request.json(); } catch (e) { /* empty */ }
  const action = body.action || 'list';

  if (action === 'list') {
    const out = [];
    let cursor;
    do {
      const page = await env.SITE_KV.list({ prefix: 'lead:', cursor, limit: 1000 });
      const values = await Promise.all(page.keys.slice(0, 300 - out.length).map((k) => env.SITE_KV.get(k.name)));
      page.keys.slice(0, values.length).forEach((k, i) => {
        if (values[i]) out.push({ key: k.name, ...JSON.parse(values[i]) });
      });
      cursor = page.list_complete || out.length >= 300 ? null : page.cursor;
    } while (cursor);
    return json({ ok: true, leads: out });
  }

  const key = String(body.key || '');
  if (!key.startsWith('lead:')) return json({ error: 'bad-key' }, 400);

  if (action === 'update') {
    const raw = await env.SITE_KV.get(key);
    if (!raw) return json({ error: 'not-found' }, 404);
    const lead = JSON.parse(raw);
    lead.done = Boolean(body.done);
    await env.SITE_KV.put(key, JSON.stringify(lead));
    return json({ ok: true });
  }
  if (action === 'delete') {
    await env.SITE_KV.delete(key);
    return json({ ok: true });
  }
  return json({ error: 'bad-action' }, 400);
}
