// Shared admin check. The password lives in the ADMIN_PASSWORD secret
// (Cloudflare → Workers & Pages → eshelon4 → Settings → Variables and Secrets).
async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return new Uint8Array(buf);
}

export async function isAdmin(request, env) {
  const expected = env.ADMIN_PASSWORD;
  if (!expected) return false;
  const header = request.headers.get('Authorization') || '';
  const given = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!given) return false;
  const [a, b] = await Promise.all([sha256(given), sha256(expected)]);
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

export function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...extraHeaders }
  });
}

export async function denied() {
  // slow down password guessing
  await new Promise((r) => setTimeout(r, 1200));
  return json({ error: 'unauthorized' }, 401);
}
