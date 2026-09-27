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

// Loading-screen phase (see public/index.html): 'boot' → 'warm' → 'ready'
const currentPhase = () => (typeof window === 'undefined' || !window.__boot ? 'ready' : window.__boot.phase);

export function useBootPhase() {
  const [phase, setPhase] = useState(currentPhase);
  useEffect(() => {
    if (phase === 'ready') return undefined;
    const update = () => setPhase(currentPhase());
    window.addEventListener('eshelon:warm', update);
    window.addEventListener('eshelon:ready', update);
    const fallback = setTimeout(() => setPhase('ready'), 14000);
    update();
    return () => {
      window.removeEventListener('eshelon:warm', update);
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
//  · while the loading screen is still up ('warm') they load right away and report to it,
//    so on a first visit the whole page is ready before it opens;
//  · afterwards they behave like normal lazy images.
export default function Img({ src, sizes = '100vw', alt = '', pictureClassName = 'contents', onLoad, onError, ...rest }) {
  const phase = useBootPhase();
  const imgRef = useRef(null);
  const tracked = useRef(false);
  const settled = useRef(false);
  const lazy = rest.loading === 'lazy';
  const warm = lazy && phase === 'warm' && Boolean(src);
  const settle = () => {
    if (tracked.current && !settled.current && window.__boot) {
      settled.current = true;
      window.__boot.loaded();
    }
  };
  useEffect(() => {
    if (!warm || tracked.current || !window.__boot) return;
    tracked.current = true;
    window.__boot.expect();
    const img = imgRef.current;
    if (img && img.complete) settle();
  }, [warm]); // eslint-disable-line
  if (lazy && phase === 'boot') return <img alt="" aria-hidden="true" {...rest} />;
  const set = webpSrcSet(src);
  const img = (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      {...rest}
      loading={warm ? 'eager' : rest.loading}
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
