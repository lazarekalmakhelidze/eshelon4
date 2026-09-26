import React, { useEffect, useState } from 'react';
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

// true once the loading screen (public/index.html) has finished
export function useBootReady() {
  const [ready, setReady] = useState(() => typeof window === 'undefined' || !window.__boot || window.__boot.ready);
  useEffect(() => {
    if (ready) return undefined;
    const on = () => setReady(true);
    window.addEventListener('eshelon:ready', on, { once: true });
    const fallback = setTimeout(on, 12000);
    return () => { window.removeEventListener('eshelon:ready', on); clearTimeout(fallback); };
  }, [ready]);
  return ready;
}

// Lazy images wait until the loading screen is gone, so on slow connections
// the first screen gets the whole bandwidth.
export default function Img({ src, sizes = '100vw', alt = '', pictureClassName = 'contents', ...rest }) {
  const ready = useBootReady();
  if (rest.loading === 'lazy' && !ready) return <img alt="" aria-hidden="true" {...rest} />;
  const set = webpSrcSet(src);
  if (!set) return <img src={src} alt={alt} {...rest} />;
  return (
    <picture className={pictureClassName}>
      <source type="image/webp" srcSet={set} sizes={sizes} />
      <img src={src} alt={alt} {...rest} />
    </picture>
  );
}
