import { useEffect, useState } from 'react';

const CACHE_KEY = 'eshelon-site-content-v2';

function readCache() {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function writeCache(content) {
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(content));
  } catch (e) {
    // ignore
  }
}

export async function fetchSiteContent() {
  const res = await fetch('/api/content', { headers: { Accept: 'application/json' } });
  const type = res.headers.get('Content-Type') || '';
  if (!res.ok || !type.includes('application/json')) throw new Error(`content ${res.status}`);
  const data = await res.json();
  return data && typeof data === 'object' ? data : {};
}

// Returns content saved from the admin panel (stored in Cloudflare KV).
// Missing sections fall back to the defaults written in App.js, so the site
// always renders even if the content API is unavailable.
export function useSiteContent() {
  const [content, setContent] = useState(() => (typeof window === 'undefined' ? {} : readCache()));

  useEffect(() => {
    let cancelled = false;
    fetchSiteContent()
      .then((fresh) => {
        if (cancelled) return;
        setContent(fresh);
        writeCache(fresh);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}

export function pickList(value, fallback) {
  return Array.isArray(value) ? value : fallback;
}
