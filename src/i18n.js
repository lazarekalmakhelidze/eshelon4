import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_SETTINGS } from './siteSettings';
import { PORTFOLIO_EN, WORK_TYPE_EN, PACKAGE_EN, FEATURE_EN, NEWS_EN, COLLAB_EN, SETTINGS_EN, priceEn } from './contentEn';

const STORE_KEY = 'eshelon-lang';
const DEFAULT_PRICING_NOTE = DEFAULT_SETTINGS.pricingNote;

function initialLang() {
  try {
    const q = new URLSearchParams(window.location.search).get('lang');
    if (q === 'en' || q === 'ka') return q;
    const saved = window.localStorage.getItem(STORE_KEY);
    if (saved === 'en' || saved === 'ka') return saved;
  } catch (e) { /* ignore */ }
  return 'ka';
}

const LangContext = createContext({ lang: 'ka', setLang: () => {} });

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
    try { window.localStorage.setItem(STORE_KEY, lang); } catch (e) { /* ignore */ }
  }, [lang]);
  const value = useMemo(() => ({ lang, setLang }), [lang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const { lang, setLang } = useContext(LangContext);
  const t = (ka, en) => (lang === 'en' && en != null && en !== '' ? en : ka);
  return { lang, setLang, t, en: lang === 'en' };
}

/* ---------- content localisation ---------- */

export function featureTextEn(text) {
  const s = String(text || '');
  if (FEATURE_EN[s]) return FEATURE_EN[s];
  let m = s.match(/^პოსტები\s*\/\s*თვე:\s*(\d+)$/);
  if (m) return `${m[1]} posts / month`;
  m = s.match(/^სთორი\s*\/\s*თვე:\s*(\d+)$/);
  if (m) return `${m[1]} stories / month`;
  return s;
}

const pick = (en, key, fallback) => (en && en[key] != null && en[key] !== '' && !(Array.isArray(en[key]) && !en[key].length) ? en[key] : fallback);

export function localizeProject(p, lang) {
  if (lang !== 'en' || !p) return p;
  const en = { ...(PORTFOLIO_EN[p.id] || {}), ...(p.en || {}) };
  return {
    ...p,
    title: pick(en, 'title', p.title),
    category: pick(en, 'category', p.category),
    description: pick(en, 'description', p.description),
    longDescription: pick(en, 'longDescription', p.longDescription),
    features: pick(en, 'features', p.features),
    workType: pick(en, 'workType', WORK_TYPE_EN[p.workType] || p.workType)
  };
}

export function localizePackage(pkg, lang) {
  if (lang !== 'en' || !pkg) return pkg;
  const en = { ...(PACKAGE_EN[pkg.title] || {}), ...(pkg.en || {}) };
  const featuresEn = Array.isArray(en.features) && en.features.length ? en.features : null;
  return {
    ...pkg,
    title: pick(en, 'title', pkg.title),
    badge: pick(en, 'badge', pkg.badge),
    desc: pick(en, 'desc', pkg.desc),
    price: pick(en, 'price', priceEn(pkg.price)),
    features: (pkg.features || []).map((f, i) => ({
      ...f,
      text: featuresEn && featuresEn[i] ? featuresEn[i] : featureTextEn(f.text)
    }))
  };
}

export function localizeNews(post, lang) {
  if (lang !== 'en' || !post) return post;
  const en = { ...(NEWS_EN[post.id] || {}), ...(post.en || {}) };
  return {
    ...post,
    title: pick(en, 'title', post.title),
    excerpt: pick(en, 'excerpt', post.excerpt),
    readTime: pick(en, 'readTime', String(post.readTime || '').replace('წთ', 'min'))
  };
}

export function localizeOffer(offer, lang) {
  if (lang !== 'en' || !offer) return offer;
  const en = { ...(COLLAB_EN.offers[offer.id] || {}), ...(offer.en || {}) };
  return { ...offer, title: pick(en, 'title', offer.title), subtitle: pick(en, 'subtitle', offer.subtitle) };
}

export function localizeTerms(terms, termsEn, lang, defaults) {
  if (lang !== 'en') return terms;
  if (Array.isArray(termsEn) && termsEn.filter(Boolean).length) return termsEn.filter(Boolean);
  // default English terms only match when the Georgian list is still the default one
  return JSON.stringify(terms) === JSON.stringify(defaults) ? COLLAB_EN.terms : terms;
}

export function localizeSettings(s, lang) {
  if (lang !== 'en') return s;
  return {
    ...s,
    tagline: s.tagline_en || SETTINGS_EN.tagline,
    address: s.address_en || SETTINGS_EN.address,
    responseTime: s.responseTime_en || SETTINGS_EN.responseTime,
    pricingNote: s.pricingNote_en || (s.pricingNote && s.pricingNote !== DEFAULT_PRICING_NOTE ? s.pricingNote : SETTINGS_EN.pricingNote),
    stats: (s.stats || []).map((st) => ({ ...st, label: st.label_en || SETTINGS_EN.statLabels[st.label] || st.label }))
  };
}
