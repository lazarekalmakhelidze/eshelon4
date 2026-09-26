import { useEffect, useState } from 'react';
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from './supabaseConfig';

const CACHE_KEY = 'eshelon-site-content-v1';

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
  if (!isSupabaseConfigured) return {};
  const res = await fetch(`${SUPABASE_URL}/rest/v1/site_content?select=key,data`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`
    }
  });
  if (!res.ok) throw new Error(`content ${res.status}`);
  const rows = await res.json();
  const content = {};
  rows.forEach((row) => {
    if (row && row.key && row.data != null) content[row.key] = row.data;
  });
  return content;
}

// Returns content saved from the admin panel. Missing keys fall back to the
// defaults written in App.js, so the site always renders even if Supabase is down.
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
