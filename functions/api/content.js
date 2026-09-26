// Public: returns everything saved from the admin panel as one JSON object.
export async function onRequestGet({ env }) {
  const text = await env.SITE_KV.get('content', { cacheTtl: 60 });
  return new Response(text || '{}', {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=30'
    }
  });
}
