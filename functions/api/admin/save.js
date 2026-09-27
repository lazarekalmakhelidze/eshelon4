import { isAdmin, json, denied } from '../../../lib/admin-auth';

const ALLOWED = ['portfolio', 'news', 'branding', 'smm', 'calculator', 'collaboration', 'settings', 'testimonials', 'process', 'faq'];

// Body: { sections: { portfolio: [...], smm: [...] } } — merged into stored content.
export async function onRequestPost({ request, env }) {
  if (!(await isAdmin(request, env))) return denied();
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ error: 'bad-json' }, 400);
  }
  const sections = body && body.sections;
  if (!sections || typeof sections !== 'object') return json({ error: 'no-sections' }, 400);
  const current = JSON.parse((await env.SITE_KV.get('content')) || '{}');
  for (const [key, value] of Object.entries(sections)) {
    if (ALLOWED.includes(key)) current[key] = value;
  }
  current._updatedAt = new Date().toISOString();
  await env.SITE_KV.put('content', JSON.stringify(current));
  // keep a few backups in case something is deleted by mistake
  await env.SITE_KV.put(`backup:${Date.now()}`, JSON.stringify(current), { expirationTtl: 60 * 60 * 24 * 60 });
  return json({ ok: true, content: current });
}
