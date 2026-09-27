import React, { useEffect, useRef, useState } from 'react';
import manifest from './imageManifest.json';

// Static images get light WebP copies (see scripts/make-image-variants.py).
// Admin-uploaded images (/img/...) are already compressed and are used as-is.

const clean = (src) => String(src || '').split('?')[0];

export function webpSrcSet(src) {
  const key = clean(src);
  const entry = manifest[key];
  if (!entry) return '';
  const base = key.replace(/\.(jpe?g|png)$/i, '');
  return entry.w.map((w) => `${encodeURI(`/v${base}-${w}.webp`)} ${w}w`).join(', ');
}

// Best single WebP URL not wider than `maxWidth` (used for background prefetching).
export function webpUrl(src, maxWidth = 960) {
  const key = clean(src);
  const entry = manifest[key];
  if (!entry) return src;
  const base = key.replace(/\.(jpe?g|png)$/i, '');
  const fitting = entry.w.filter((w) => w <= maxWidth);
  const w = fitting.length ? fitting[fitting.length - 1] : entry.w[0];
  return encodeURI(`/v${base}-${w}.webp`);
}

// Loading-screen phase (see public/index.html): 'boot' → 'warm' → 'warm2' → 'ready'
const currentPhase = () => (typeof window === 'undefined' || !window.__boot ? 'ready' : window.__boot.phase);

export function useBootPhase() {
  const [phase, setPhase] = useState(currentPhase);
  useEffect(() => {
    if (phase === 'ready') return undefined;
    const update = () => setPhase(currentPhase());
    window.addEventListener('eshelon:warm', update);
    window.addEventListener('eshelon:warm2', update);
    window.addEventListener('eshelon:ready', update);
    const fallback = setTimeout(() => setPhase('ready'), 18000);
    update();
    return () => {
      window.removeEventListener('eshelon:warm', update);
      window.removeEventListener('eshelon:warm2', update);
      window.removeEventListener('eshelon:ready', update);
      clearTimeout(fallback);
    };
  }, [phase]);
  return phase;
}

export function useBootReady() {
  return useBootPhase() === 'ready';
}

// Lazy images:
//  · while the first screen loads ('boot') they wait, so it gets the whole connection;
//  · 'critical' ones (logos, posters, first portfolio covers) load next ('warm') and are decoded
//    before the loading screen opens, so the first thing people scroll to never stutters;
//  · the rest load while the loading screen is still up ('warm2') on a first visit;
//  · afterwards they behave like normal lazy images.
export default function Img({ src, sizes = '100vw', alt = '', pictureClassName = 'contents', critical = false, onLoad, onError, ...rest }) {
  const phase = useBootPhase();
  const imgRef = useRef(null);
  const tracked = useRef(false);
  const settled = useRef(false);
  const lazy = rest.loading === 'lazy';
  const crit = Boolean(critical);
  const active = lazy && Boolean(src) && ((phase === 'warm' && crit) || phase === 'warm2');
  const settle = () => {
    if (!tracked.current || settled.current || !window.__boot) return;
    const done = () => {
      if (settled.current) return;
      settled.current = true;
      window.__boot.loaded(crit);
    };
    const el = imgRef.current;
    if (crit && el && typeof el.decode === 'function') el.decode().then(done, done);
    else done();
  };
  useEffect(() => {
    if (!active || tracked.current || !window.__boot) return;
    tracked.current = true;
    window.__boot.expect(crit);
    const el = imgRef.current;
    if (el && el.complete) settle();
  }, [active]); // eslint-disable-line
  if (lazy && (phase === 'boot' || (phase === 'warm' && !crit))) return <img alt="" aria-hidden="true" {...rest} />;
  const set = webpSrcSet(src);
  const img = (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      {...rest}
      loading={active ? 'eager' : rest.loading}
      onLoad={(e) => { settle(); if (onLoad) onLoad(e); }}
      onError={(e) => { settle(); if (onError) onError(e); }}
    />
  );
  if (!set) return img;
  return (
    <picture className={pictureClassName}>
      <source type="image/webp" srcSet={set} sizes={sizes} />
      {img}
    </picture>
  );
}
