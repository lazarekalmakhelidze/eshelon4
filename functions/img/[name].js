// Serves images uploaded from the admin panel, cached at the edge for a year.
export async function onRequestGet({ request, env, params, waitUntil }) {
  const cache = caches.default;
  const cached = await cache.match(request);
  if (cached) return cached;
  const { value, metadata } = await env.SITE_KV.getWithMetadata(`img:${params.name}`, { type: 'arrayBuffer', cacheTtl: 86400 });
  if (!value) return new Response('Not found', { status: 404 });
  const res = new Response(value, {
    headers: {
      'Content-Type': (metadata && metadata.type) || 'application/octet-stream',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  });
  waitUntil(cache.put(request, res.clone()));
  return res;
}
