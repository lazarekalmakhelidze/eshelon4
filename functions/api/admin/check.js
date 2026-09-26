import { isAdmin, json, denied } from '../../../lib/admin-auth';

export async function onRequestPost({ request, env }) {
  if (!env.ADMIN_PASSWORD) return json({ error: 'no-password-set' }, 503);
  if (!(await isAdmin(request, env))) return denied();
  const text = await env.SITE_KV.get('content');
  return json({ ok: true, content: text ? JSON.parse(text) : {} });
}
