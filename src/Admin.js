import React, { useEffect, useMemo, useState } from 'react';
import {
  portfolioData,
  extraPortfolioData,
  workTypeByProjectId,
  brandingPackages,
  smmPackages,
  facebookNewsPosts,
  collaborationOffers,
  collaborationTerms
} from './App';
import { DEFAULT_SETTINGS, telHref, whatsappHref } from './siteSettings';
import { PORTFOLIO_EN, PACKAGE_EN, NEWS_EN, COLLAB_EN, SETTINGS_EN, priceEn } from './contentEn';
import { featureTextEn } from './i18n';

const PW_KEY = 'eshelon-admin-pw';
const getPw = () => {
  try { return window.localStorage.getItem(PW_KEY) || ''; } catch (e) { return ''; }
};
const setPw = (v) => {
  try { if (v) window.localStorage.setItem(PW_KEY, v); else window.localStorage.removeItem(PW_KEY); } catch (e) { /* ignore */ }
};

async function api(path, { body, raw, type } = {}) {
  const res = await fetch(path, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${encodeURIComponent(getPw())}`,
      'Content-Type': raw ? type : 'application/json'
    },
    body: raw ? raw : JSON.stringify(body || {})
  });
  let data = {};
  try { data = await res.json(); } catch (e) { /* ignore */ }
  if (!res.ok) {
    const err = new Error(data.error || `HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return data;
}

const clone = (v) => JSON.parse(JSON.stringify(v));

const DEFAULTS = {
  portfolio: [...portfolioData, ...extraPortfolioData].map((p) => ({
    ...p,
    workType: p.workType || workTypeByProjectId[p.id] || 'სოც. მედია'
  })),
  news: facebookNewsPosts,
  branding: brandingPackages,
  smm: smmPackages,
  calculator: { logo: 500, guidelines: 3000, post: 220, story: 40, advertising: 400, shadowTesting: 250 },
  collaboration: { offers: collaborationOffers, terms: collaborationTerms },
  settings: DEFAULT_SETTINGS
};

function withEnglish(key, data) {
  if (!data) return data;
  const has = (o) => o && Object.values(o).some((v) => (Array.isArray(v) ? v.length : v));
  if (key === 'portfolio') {
    return data.map((p) => (has(p.en) ? p : { ...p, en: { title: '', ...(PORTFOLIO_EN[p.id] || {}) } }));
  }
  if (key === 'branding' || key === 'smm') {
    return data.map((p) => {
      if (has(p.en)) return p;
      const d = PACKAGE_EN[p.title] || {};
      return { ...p, en: { title: d.title || '', badge: d.badge || '', desc: d.desc || '', price: priceEn(p.price) === p.price ? '' : priceEn(p.price), features: (p.features || []).map((f) => featureTextEn(f.text)) } };
    });
  }
  if (key === 'news') {
    return data.map((p) => (has(p.en) ? p : { ...p, en: { ...(NEWS_EN[p.id] || {}) } }));
  }
  if (key === 'collaboration') {
    const offers = (data.offers || []).map((o) => (has(o.en) ? o : { ...o, en: { ...(COLLAB_EN.offers[o.id] || {}) } }));
    const terms_en = Array.isArray(data.terms_en) && data.terms_en.length ? data.terms_en : (JSON.stringify(data.terms) === JSON.stringify(collaborationTerms) ? COLLAB_EN.terms : []);
    return { ...data, offers, terms_en };
  }
  if (key === 'settings') {
    return {
      ...data,
      tagline_en: data.tagline_en || SETTINGS_EN.tagline,
      address_en: data.address_en || SETTINGS_EN.address,
      responseTime_en: data.responseTime_en || SETTINGS_EN.responseTime,
      pricingNote_en: data.pricingNote_en || SETTINGS_EN.pricingNote,
      stats: (data.stats || []).map((st) => ({ ...st, label_en: st.label_en || SETTINGS_EN.statLabels[st.label] || '' }))
    };
  }
  return data;
}

function EnBox({ children, hint }) {
  return (
    <details className="rounded-xl border border-sky-400/20 bg-sky-400/[0.04] group">
      <summary className="cursor-pointer select-none px-4 py-2.5 text-sm font-semibold text-sky-200 flex items-center justify-between">
        <span>🇬🇧 English</span>
        <span className="text-xs font-normal text-sky-200/60">{hint || 'ცარიელი ველი = ქართული ტექსტი გამოჩნდება'}</span>
      </summary>
      <div className="px-4 pb-4 space-y-4">{children}</div>
    </details>
  );
}

const TABS = [
  { key: 'portfolio', label: 'პორტფოლიო' },
  { key: 'news', label: 'პოსტები' },
  { key: 'branding', label: 'ბრენდინგის ფასები' },
  { key: 'smm', label: 'SMM ფასები' },
  { key: 'calculator', label: 'კალკულატორი' },
  { key: 'collaboration', label: 'თანამშრომლობა' },
  { key: 'settings', label: 'კონტაქტები & ციფრები' }
];
const ALL_TABS = [{ key: 'inbox', label: 'მოთხოვნები' }, ...TABS];

const newId = (prefix) => `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

/* ---------------- image upload with compression ---------------- */

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve({ img, url });
    img.onerror = reject;
    img.src = url;
  });
}

async function compressImage(file, maxWidth = 1800, quality = 0.84) {
  if (!file.type.startsWith('image/') || file.type === 'image/svg+xml' || file.type === 'image/gif') return file;
  const { img, url } = await loadImage(file);
  const scale = Math.min(1, maxWidth / img.naturalWidth);
  const w = Math.round(img.naturalWidth * scale);
  const h = Math.round(img.naturalHeight * scale);
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0d0d0d';
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0, w, h);
  URL.revokeObjectURL(url);
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
  if (!blob) return file;
  return blob.size < file.size ? blob : file;
}

async function uploadImage(file) {
  const data = await compressImage(file);
  const res = await api('/api/admin/upload', { raw: data, type: data.type || file.type });
  return res.url;
}

/* ---------------- small UI pieces ---------------- */

const inputCls = 'w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#E50914]';

function Field({ label, value, onChange, textarea, type = 'text', placeholder, rows = 3 }) {
  return (
    <label className="block space-y-1">
      <span className="text-xs font-semibold text-gray-400">{label}</span>
      {textarea ? (
        <textarea className={inputCls} rows={rows} value={value ?? ''} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className={inputCls} type={type} value={value ?? ''} placeholder={placeholder} onChange={(e) => onChange(type === 'number' ? e.target.value : e.target.value)} />
      )}
    </label>
  );
}

function Check({ label, checked, onChange }) {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-gray-300 cursor-pointer select-none">
      <input type="checkbox" className="accent-[#E50914] w-4 h-4" checked={!!checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}

function Btn({ children, onClick, kind = 'ghost', disabled, small, type = 'button' }) {
  const base = small ? 'px-2.5 py-1 text-xs' : 'px-4 py-2 text-sm';
  const kinds = {
    primary: 'bg-[#E50914] text-white hover:bg-red-700',
    ghost: 'bg-white/5 text-gray-200 hover:bg-white/10 border border-white/10',
    danger: 'bg-transparent text-red-400 hover:bg-red-500/10 border border-red-500/30'
  };
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`${base} ${kinds[kind]} rounded-lg font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed`}>
      {children}
    </button>
  );
}

function LinesField({ label, value, onChange, hint }) {
  const text = (value || []).join('\n');
  return (
    <label className="block space-y-1">
      <span className="text-xs font-semibold text-gray-400">{label}</span>
      <textarea
        className={inputCls}
        rows={Math.max(3, (value || []).length + 1)}
        value={text}
        onChange={(e) => onChange(e.target.value.split('\n'))}
      />
      {hint && <span className="text-[11px] text-gray-600">{hint}</span>}
    </label>
  );
}

const cleanLines = (arr) => (arr || []).map((s) => s.trim()).filter(Boolean);

function ImageField({ label, value, onChange, folder, hint }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const onFile = async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    setBusy(true);
    setErr('');
    try {
      onChange(await uploadImage(file, folder));
    } catch (ex) {
      setErr('ატვირთვა ვერ მოხერხდა: ' + (ex.message || ex));
    }
    setBusy(false);
  };
  return (
    <div className="space-y-1">
      <span className="text-xs font-semibold text-gray-400">{label}</span>
      <div className="flex items-start gap-3">
        <div className="w-28 h-20 rounded-lg bg-black/40 border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center">
          {value ? <img src={value} alt="" className="w-full h-full object-cover" /> : <span className="text-[10px] text-gray-600">სურათი არ არის</span>}
        </div>
        <div className="space-y-2 min-w-0 flex-1">
          <label className={`inline-block px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${busy ? 'bg-white/5 text-gray-500' : 'bg-white/10 text-white hover:bg-white/15'}`}>
            {busy ? 'იტვირთება…' : value ? 'შეცვლა' : 'ატვირთვა'}
            <input type="file" accept="image/*" className="hidden" disabled={busy} onChange={onFile} />
          </label>
          {value && (
            <button type="button" className="ml-2 text-xs text-gray-500 hover:text-red-400" onClick={() => onChange('')}>წაშლა</button>
          )}
          {hint && <p className="text-[11px] text-gray-600">{hint}</p>}
          {err && <p className="text-xs text-red-400">{err}</p>}
        </div>
      </div>
    </div>
  );
}

function ImageListField({ label, value, onChange, folder, hint }) {
  const list = value || [];
  const [busy, setBusy] = useState(0);
  const [err, setErr] = useState('');
  const onFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = '';
    if (!files.length) return;
    setErr('');
    setBusy(files.length);
    const urls = [];
    for (const f of files) {
      try {
        urls.push(await uploadImage(f, folder));
      } catch (ex) {
        setErr('ზოგი სურათი ვერ აიტვირთა: ' + (ex.message || ex));
      }
      setBusy((b) => b - 1);
    }
    onChange([...list, ...urls]);
  };
  const move = (i, d) => {
    const next = [...list];
    const j = i + d;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div className="space-y-2">
      <span className="text-xs font-semibold text-gray-400">{label} ({list.length})</span>
      {hint && <p className="text-[11px] text-gray-600">{hint}</p>}
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-2">
        {list.map((src, i) => (
          <div key={`${src}-${i}`} className="relative group rounded-lg overflow-hidden border border-white/10 bg-black/40 aspect-square">
            <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-x-0 bottom-0 flex justify-between bg-black/70 text-[11px]">
              <button type="button" className="px-2 py-1 text-gray-300 hover:text-white" onClick={() => move(i, -1)}>←</button>
              <button type="button" className="px-2 py-1 text-red-400 hover:text-red-300" onClick={() => onChange(list.filter((_, k) => k !== i))}>✕</button>
              <button type="button" className="px-2 py-1 text-gray-300 hover:text-white" onClick={() => move(i, 1)}>→</button>
            </div>
          </div>
        ))}
        <label className="aspect-square rounded-lg border border-dashed border-white/20 flex items-center justify-center text-xs text-gray-400 hover:border-[#E50914] hover:text-white cursor-pointer text-center p-2">
          {busy ? `იტვირთება… (${busy})` : '+ სურათების დამატება'}
          <input type="file" accept="image/*" multiple className="hidden" disabled={!!busy} onChange={onFiles} />
        </label>
      </div>
      {err && <p className="text-xs text-red-400">{err}</p>}
    </div>
  );
}

/* ---------------- generic list with collapsible items ---------------- */

function ItemList({ items, onChange, renderTitle, renderEditor, makeNew, addLabel }) {
  const [open, setOpen] = useState(null);
  const move = (i, d) => {
    const j = i + d;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
    if (open === i) setOpen(j);
  };
  const remove = (i) => {
    if (!window.confirm(`წავშალო „${renderTitle(items[i]) || 'ეს ჩანაწერი'}“?`)) return;
    onChange(items.filter((_, k) => k !== i));
    setOpen(null);
  };
  const update = (i, patch) => onChange(items.map((it, k) => (k === i ? { ...it, ...patch } : it)));
  const add = () => {
    onChange([makeNew(), ...items]);
    setOpen(0);
  };
  return (
    <div className="space-y-3">
      <Btn kind="primary" onClick={add}>+ {addLabel}</Btn>
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-white/10 bg-[#141414]">
          <div className="flex items-center gap-2 px-4 py-3">
            <button type="button" className="flex-1 text-left min-w-0" onClick={() => setOpen(open === i ? null : i)}>
              <span className="text-sm font-bold text-white truncate block">{renderTitle(item) || <span className="text-gray-500">(უსათაურო)</span>}</span>
            </button>
            <Btn small onClick={() => move(i, -1)} disabled={i === 0}>↑</Btn>
            <Btn small onClick={() => move(i, 1)} disabled={i === items.length - 1}>↓</Btn>
            <Btn small onClick={() => setOpen(open === i ? null : i)}>{open === i ? 'დახურვა' : 'რედაქტირება'}</Btn>
            <Btn small kind="danger" onClick={() => remove(i)}>წაშლა</Btn>
          </div>
          {open === i && <div className="border-t border-white/10 p-4 space-y-4">{renderEditor(item, (patch) => update(i, patch))}</div>}
        </div>
      ))}
    </div>
  );
}

/* ---------------- editors per section ---------------- */

function PortfolioEditor({ value, onChange }) {
  return (
    <ItemList
      items={value}
      onChange={onChange}
      addLabel="ახალი პროექტი"
      renderTitle={(p) => p.title}
      makeNew={() => ({ id: newId('project'), title: '', category: '', workType: 'სოც. მედია', description: '', longDescription: '', coverImage: '', modalImages: [], features: [] })}
      renderEditor={(p, set) => (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="სათაური" value={p.title} onChange={(v) => set({ title: v })} />
            <Field label="კატეგორია (ფანჯარაში, სათაურის ზემოთ)" value={p.category} onChange={(v) => set({ category: v })} />
          </div>
          <label className="block space-y-1">
            <span className="text-xs font-semibold text-gray-400">ნამუშევრის ტიპი (ბარათზე)</span>
            <input className={inputCls} list="work-types" value={p.workType || ''} onChange={(e) => set({ workType: e.target.value })} />
            <datalist id="work-types">
              <option value="ვიზუალური იდენტობა" />
              <option value="სოც. მედია" />
            </datalist>
          </label>
          <Field label="მოკლე აღწერა (ბარათზე)" textarea value={p.description} onChange={(v) => set({ description: v })} />
          <Field label="სრული აღწერა (ფანჯარაში)" textarea rows={5} value={p.longDescription} onChange={(v) => set({ longDescription: v })} />
          <LinesField label="მთავარი პუნქტები" hint="თითო პუნქტი ცალკე ხაზზე" value={p.features} onChange={(v) => set({ features: v })} />
          <ImageField label="ქავერი (ბარათის სურათი)" folder="portfolio" value={p.coverImage} onChange={(v) => set({ coverImage: v })} />
          <ImageListField
            label="გალერეა"
            folder="portfolio"
            hint="რამდენიმე სურათი, რომელიც პროექტის ფანჯარაში ბადედ გამოჩნდება."
            value={p.modalImages}
            onChange={(v) => set({ modalImages: v })}
          />
          <ImageField
            label="ერთი გრძელი სურათი (არასავალდებულო)"
            folder="portfolio"
            hint="თუ გალერეა ცარიელია, ფანჯარაში ეს გრძელი, ჩამოსასქროლი სურათი გამოჩნდება."
            value={p.modalImage}
            onChange={(v) => set({ modalImage: v, modalImageScrollable: !!v })}
          />
          <EnBox>
            {(() => {
              const en = p.en || {};
              const setEn = (patch) => set({ en: { ...en, ...patch } });
              return (
                <>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Title" value={en.title} onChange={(v) => setEn({ title: v })} placeholder={p.title} />
                    <Field label="Category" value={en.category} onChange={(v) => setEn({ category: v })} />
                  </div>
                  <Field label="Work type (card)" value={en.workType} onChange={(v) => setEn({ workType: v })} placeholder="Visual identity / Social media" />
                  <Field label="Short description" textarea value={en.description} onChange={(v) => setEn({ description: v })} />
                  <Field label="Full description" textarea rows={5} value={en.longDescription} onChange={(v) => setEn({ longDescription: v })} />
                  <LinesField label="Key points (one per line)" value={en.features} onChange={(v) => setEn({ features: v })} />
                </>
              );
            })()}
          </EnBox>
        </>
      )}
    />
  );
}

function NewsEditor({ value, onChange }) {
  return (
    <ItemList
      items={value}
      onChange={onChange}
      addLabel="ახალი პოსტი"
      renderTitle={(p) => p.title}
      makeNew={() => ({ id: newId('post'), title: '', excerpt: '', date: new Date().toISOString().slice(0, 10), readTime: '2 წთ', image: '', url: 'https://www.facebook.com/' })}
      renderEditor={(p, set) => (
        <>
          <Field label="სათაური" value={p.title} onChange={(v) => set({ title: v })} />
          <Field label="მოკლე ტექსტი" textarea value={p.excerpt} onChange={(v) => set({ excerpt: v })} />
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="თარიღი" type="date" value={p.date} onChange={(v) => set({ date: v })} />
            <Field label="კითხვის დრო" value={p.readTime} onChange={(v) => set({ readTime: v })} />
            <Field label="ბმული (Facebook პოსტი)" value={p.url} onChange={(v) => set({ url: v })} />
          </div>
          <ImageField label="სურათი" folder="news" value={p.image} onChange={(v) => set({ image: v })} />
          <EnBox>
            <Field label="Title" value={(p.en || {}).title} onChange={(v) => set({ en: { ...(p.en || {}), title: v } })} />
            <Field label="Short text" textarea value={(p.en || {}).excerpt} onChange={(v) => set({ en: { ...(p.en || {}), excerpt: v } })} />
            <Field label="Read time" value={(p.en || {}).readTime} onChange={(v) => set({ en: { ...(p.en || {}), readTime: v } })} placeholder="2 min" />
          </EnBox>
        </>
      )}
    />
  );
}

function FeaturesEditor({ value, onChange, allowDiscount }) {
  const list = value || [];
  const update = (i, patch) => onChange(list.map((f, k) => (k === i ? { ...f, ...patch } : f)));
  return (
    <div className="space-y-2">
      <span className="text-xs font-semibold text-gray-400">რა შედის პაკეტში</span>
      {list.map((f, i) => (
        <div key={i} className="flex items-center gap-2">
          <input type="checkbox" title="შედის" className="accent-[#E50914] w-4 h-4 flex-shrink-0" checked={!!f.included} onChange={(e) => update(i, { included: e.target.checked })} />
          <input className={inputCls} value={f.text} onChange={(e) => update(i, { text: e.target.value })} />
          {allowDiscount && (
            <label className="text-[11px] text-gray-400 flex items-center gap-1 flex-shrink-0">
              <input type="checkbox" className="accent-[#E50914]" checked={!!f.discount} onChange={(e) => update(i, { discount: e.target.checked || undefined })} />
              ფასდაკლება
            </label>
          )}
          <button type="button" className="text-red-400 hover:text-red-300 px-2 flex-shrink-0" onClick={() => onChange(list.filter((_, k) => k !== i))}>✕</button>
        </div>
      ))}
      <div className="flex items-center gap-3">
        <Btn small onClick={() => onChange([...list, { text: '', included: true }])}>+ პუნქტი</Btn>
        <span className="text-[11px] text-gray-600">მონიშნული = შედის, მოუნიშნავი = გადახაზული</span>
      </div>
    </div>
  );
}

function PackagesEditor({ value, onChange, smm }) {
  return (
    <ItemList
      items={value}
      onChange={onChange}
      addLabel="ახალი პაკეტი"
      renderTitle={(p) => `${p.title || ''}${p.price ? ' — ' + p.price : ''}`}
      makeNew={() => ({ title: '', price: smm ? ' ₾ / თვეში' : ' ₾', desc: '', badge: '', features: [] })}
      renderEditor={(p, set) => (
        <>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="სახელი" value={p.title} onChange={(v) => set({ title: v })} />
            <Field label="ფასი" value={p.price} onChange={(v) => set({ price: v })} placeholder={smm ? '3,000 ₾ / თვეში' : '500 ₾'} />
            <Field label="პატარა წარწერა (ბეჯი)" value={p.badge} onChange={(v) => set({ badge: v })} />
          </div>
          <Field label="აღწერა" textarea value={p.desc} onChange={(v) => set({ desc: v })} />
          <Check label="გამოკვეთილი (წითელი ჩარჩო)" checked={p.featured} onChange={(v) => set({ featured: v })} />
          <FeaturesEditor value={p.features} allowDiscount={!smm} onChange={(v) => set({ features: v })} />
          <p className="text-[11px] text-gray-500">საიტზე მხოლოდ მონიშნული („შედის“) პუნქტები ჩანს.</p>
          <EnBox>
            {(() => {
              const en = p.en || {};
              const setEn = (patch) => set({ en: { ...en, ...patch } });
              return (
                <>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <Field label="Name" value={en.title} onChange={(v) => setEn({ title: v })} placeholder={p.title} />
                    <Field label="Price" value={en.price} onChange={(v) => setEn({ price: v })} placeholder={smm ? '3,000 ₾ / month' : '500 ₾'} />
                    <Field label="Badge" value={en.badge} onChange={(v) => setEn({ badge: v })} />
                  </div>
                  <Field label="Description" textarea value={en.desc} onChange={(v) => setEn({ desc: v })} />
                  <LinesField label="Features — same order as above, one per line" value={en.features} onChange={(v) => setEn({ features: v })} />
                </>
              );
            })()}
          </EnBox>
        </>
      )}
    />
  );
}

function SettingsEditor({ value, onChange }) {
  const v = { ...DEFAULT_SETTINGS, ...value };
  const set = (patch) => onChange({ ...v, ...patch });
  const stats = Array.isArray(v.stats) ? v.stats : [];
  const setStat = (i, patch) => set({ stats: [0, 1, 2].map((k) => (k === i ? { ...(stats[k] || { value: '', label: '' }), ...patch } : (stats[k] || { value: '', label: '' }))) });
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="rounded-xl border border-white/10 bg-[#141414] p-4 space-y-4">
        <p className="text-sm font-bold text-white">მთავარი ბლოკი</p>
        <Field label="მოკლე აღწერა სლოგანის ქვეშ" value={v.tagline} onChange={(x) => set({ tagline: x })} />
        <div className="space-y-2">
          <span className="text-xs font-semibold text-gray-400">ციფრები (ცარიელს არ აჩვენებს). მაგ: „40+“ — „შექმნილი ბრენდი“</span>
          {[0, 1, 2].map((i) => (
            <div key={i} className="grid grid-cols-[110px_1fr] gap-2">
              <input className={inputCls} placeholder="40+" value={(stats[i] || {}).value || ''} onChange={(e) => setStat(i, { value: e.target.value })} />
              <input className={inputCls} placeholder="შექმნილი ბრენდი" value={(stats[i] || {}).label || ''} onChange={(e) => setStat(i, { label: e.target.value })} />
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-white/10 bg-[#141414] p-4 space-y-4">
        <p className="text-sm font-bold text-white">კონტაქტები</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="ტელეფონი" value={v.phone} onChange={(x) => set({ phone: x })} placeholder="551 98 15 02" />
          <Field label="WhatsApp ნომერი" value={v.whatsapp} onChange={(x) => set({ whatsapp: x })} placeholder="551 98 15 02" />
          <Field label="მთავარი ელფოსტა" value={v.email} onChange={(x) => set({ email: x })} />
          <Field label="მეორე ელფოსტა" value={v.email2} onChange={(x) => set({ email2: x })} />
        </div>
        <Field label="მისამართი" value={v.address} onChange={(x) => set({ address: x })} />
        <Field label="პასუხის დრო (ფორმის თავზე)" value={v.responseTime} onChange={(x) => set({ responseTime: x })} />
        <Field label="ფასების მინიშნება (ფასების ბლოკის თავზე; პირველი წინადადება მუქად)" textarea value={v.pricingNote} onChange={(x) => set({ pricingNote: x })} />
      </div>
      <EnBox hint="ინგლისური ვერსიისთვის">
        <Field label="Tagline" value={v.tagline_en} onChange={(x) => set({ tagline_en: x })} />
        <Field label="Address" value={v.address_en} onChange={(x) => set({ address_en: x })} />
        <Field label="Response time" value={v.responseTime_en} onChange={(x) => set({ responseTime_en: x })} />
        <Field label="Pricing note" textarea value={v.pricingNote_en} onChange={(x) => set({ pricingNote_en: x })} />
        <div className="space-y-2">
          <span className="text-xs font-semibold text-gray-400">Stat labels (same order)</span>
          {[0, 1, 2].map((i) => (
            <input key={i} className={inputCls} placeholder={(stats[i] || {}).label || ''} value={(stats[i] || {}).label_en || ''} onChange={(e) => setStat(i, { label_en: e.target.value })} />
          ))}
        </div>
      </EnBox>
      <div className="rounded-xl border border-white/10 bg-[#141414] p-4 space-y-4">
        <p className="text-sm font-bold text-white">სოციალური ქსელები <span className="font-normal text-gray-500">— ცარიელი არ გამოჩნდება</span></p>
        <Field label="Facebook გვერდის ბმული" value={v.facebook} onChange={(x) => set({ facebook: x })} placeholder="https://www.facebook.com/…" />
        <Field label="Instagram ბმული" value={v.instagram} onChange={(x) => set({ instagram: x })} placeholder="https://www.instagram.com/…" />
        <Field label="Messenger ბმული" value={v.messenger} onChange={(x) => set({ messenger: x })} placeholder="https://m.me/…" />
      </div>
    </div>
  );
}

const LEAD_TYPES = { contact: 'შეტყობინება', order: 'შეკვეთა', finder: 'კითხვარი' };

function LeadsInbox() {
  const [leads, setLeads] = useState(null);
  const [err, setErr] = useState('');
  const [filter, setFilter] = useState('open');
  const load = async () => {
    setErr('');
    try {
      const res = await api('/api/admin/leads', { body: { action: 'list' } });
      setLeads(res.leads || []);
    } catch (e) {
      setErr('ვერ ჩაიტვირთა: ' + e.message);
      setLeads([]);
    }
  };
  useEffect(() => { load(); }, []);
  const update = async (lead, patch) => {
    setLeads((ls) => ls.map((l) => (l.key === lead.key ? { ...l, ...patch } : l)));
    try { await api('/api/admin/leads', { body: { action: 'update', key: lead.key, ...patch } }); } catch (e) { setErr('ვერ შეინახა'); }
  };
  const remove = async (lead) => {
    if (!window.confirm(`წავშალო ${lead.name}-ის მოთხოვნა?`)) return;
    setLeads((ls) => ls.filter((l) => l.key !== lead.key));
    try { await api('/api/admin/leads', { body: { action: 'delete', key: lead.key } }); } catch (e) { setErr('ვერ წაიშალა'); }
  };
  if (!leads) return <p className="text-gray-500 text-sm">იტვირთება…</p>;
  const shown = leads.filter((l) => (filter === 'open' ? !l.done : filter === 'done' ? l.done : true));
  const openCount = leads.filter((l) => !l.done).length;
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {[['open', `ახალი (${openCount})`], ['done', 'დამუშავებული'], ['all', `ყველა (${leads.length})`]].map(([k, label]) => (
          <button key={k} type="button" onClick={() => setFilter(k)} className={`px-3 py-1.5 rounded-lg text-sm font-semibold border ${filter === k ? 'bg-[#E50914] border-[#E50914] text-white' : 'border-white/10 text-gray-300 hover:bg-white/5'}`}>{label}</button>
        ))}
        <Btn small onClick={load}>განახლება</Btn>
      </div>
      {err && <p className="text-sm text-red-300">{err}</p>}
      {shown.length === 0 && <p className="text-gray-500 text-sm py-8 text-center">აქ ჯერ არაფერია.</p>}
      {shown.map((l) => (
        <div key={l.key} className={`rounded-xl border p-4 space-y-3 ${l.done ? 'border-white/5 bg-[#101010] opacity-70' : 'border-white/10 bg-[#141414]'}`}>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="text-base font-bold text-white">{l.name} <span className="ml-2 text-[11px] font-semibold px-2 py-0.5 rounded bg-white/10 text-gray-300">{LEAD_TYPES[l.type] || l.type}</span></p>
              <p className="text-xs text-gray-500">{new Date(l.createdAt).toLocaleString('ka-GE')}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {telHref(l.phone) && <a href={telHref(l.phone)} className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-sm font-semibold hover:bg-white/15">📞 {l.phone}</a>}
              {whatsappHref(l.phone) && <a href={whatsappHref(l.phone)} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-[#25D366]/15 text-[#5ee08f] text-sm font-semibold hover:bg-[#25D366]/25">WhatsApp</a>}
            </div>
          </div>
          {(l.package || l.price) && <p className="text-sm text-gray-200">📦 {l.package}{l.price ? ` — ${l.price}` : ''}</p>}
          {l.details && <p className="text-sm text-gray-400">{l.details}</p>}
          {l.company && <p className="text-sm text-gray-300">🏢 {l.company}</p>}
          {l.message && <p className="text-sm text-gray-200 whitespace-pre-wrap">{l.message}</p>}
          <div className="flex gap-2 pt-1">
            <Btn small onClick={() => update(l, { done: !l.done })}>{l.done ? 'დაბრუნება ახალში' : '✓ დამუშავებულია'}</Btn>
            <Btn small kind="danger" onClick={() => remove(l)}>წაშლა</Btn>
          </div>
        </div>
      ))}
    </div>
  );
}

function CalculatorEditor({ value, onChange }) {
  const rows = [
    ['logo', 'ლოგოს დიზაინი (₾)'],
    ['guidelines', 'ბრენდბუქი & გრიდები (₾)'],
    ['post', '1 პოსტის ფასი (₾)'],
    ['story', '1 სთორის ფასი (₾)'],
    ['advertising', 'რეკლამის მართვა (₾)'],
    ['shadowTesting', 'შადოუ რეკლამების ტესტირება (₾)']
  ];
  return (
    <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
      {rows.map(([k, label]) => (
        <Field key={k} label={label} type="number" value={value[k]} onChange={(v) => onChange({ ...value, [k]: v })} />
      ))}
    </div>
  );
}

function CollaborationEditor({ value, onChange }) {
  const offers = value.offers || [];
  const setOffers = (o) => onChange({ ...value, offers: o });
  return (
    <div className="space-y-6">
      <ItemList
        items={offers}
        onChange={setOffers}
        addLabel="ახალი მიმართულება"
        renderTitle={(o) => o.title}
        makeNew={() => ({ id: newId('offer'), title: '', subtitle: '', accent: 'from-[#E50914]/25 to-transparent', rows: [] })}
        renderEditor={(o, set) => {
          const rows = o.rows || [];
          const upd = (i, patch) => set({ rows: rows.map((r, k) => (k === i ? { ...r, ...patch } : r)) });
          return (
            <>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="სათაური" value={o.title} onChange={(v) => set({ title: v })} />
                <Field label="ქვესათაური" value={o.subtitle} onChange={(v) => set({ subtitle: v })} />
              </div>
              <div className="space-y-2">
                <div className="hidden sm:grid grid-cols-[1fr_1fr_1fr_1fr_auto_auto] gap-2 text-[11px] text-gray-500 font-semibold">
                  <span>პაკეტი</span><span>პარტნიორის ფასი</span><span>საჯარო ფასი</span><span>სარგებელი</span><span>გამოკვეთა</span><span />
                </div>
                {rows.map((r, i) => (
                  <div key={i} className="grid grid-cols-2 sm:grid-cols-[1fr_1fr_1fr_1fr_auto_auto] gap-2 items-center">
                    <input className={inputCls} value={r.pack} onChange={(e) => upd(i, { pack: e.target.value })} />
                    <input className={inputCls} value={r.partner} onChange={(e) => upd(i, { partner: e.target.value })} />
                    <input className={inputCls} value={r.public} onChange={(e) => upd(i, { public: e.target.value })} />
                    <input className={inputCls} value={r.benefit} onChange={(e) => upd(i, { benefit: e.target.value })} />
                    <input type="checkbox" className="accent-[#E50914] w-4 h-4 justify-self-center" checked={!!r.featured} onChange={(e) => upd(i, { featured: e.target.checked || undefined })} />
                    <button type="button" className="text-red-400 px-2" onClick={() => set({ rows: rows.filter((_, k) => k !== i) })}>✕</button>
                  </div>
                ))}
                <Btn small onClick={() => set({ rows: [...rows, { pack: '', partner: '', public: '', benefit: '' }] })}>+ ხაზი</Btn>
              </div>
              <EnBox>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Title" value={(o.en || {}).title} onChange={(v) => set({ en: { ...(o.en || {}), title: v } })} />
                  <Field label="Subtitle" value={(o.en || {}).subtitle} onChange={(v) => set({ en: { ...(o.en || {}), subtitle: v } })} />
                </div>
              </EnBox>
            </>
          );
        }}
      />
      <div className="rounded-xl border border-white/10 bg-[#141414] p-4">
        <LinesField label="პირობები" hint="თითო პირობა ცალკე ხაზზე" value={value.terms} onChange={(v) => onChange({ ...value, terms: v })} />
        <div className="mt-4">
          <EnBox>
            <LinesField label="Terms (one per line)" value={value.terms_en} onChange={(v) => onChange({ ...value, terms_en: v })} />
          </EnBox>
        </div>
      </div>
    </div>
  );
}

/* ---------------- normalize before saving ---------------- */

function normalize(key, data) {
  if (key === 'portfolio') {
    return data.map((p) => {
      const out = { ...p, features: cleanLines(p.features), modalImages: (p.modalImages || []).filter(Boolean) };
      if (out.en) out.en = { ...out.en, features: cleanLines(out.en.features) };
      if (!out.modalImages.length) delete out.modalImages;
      if (!out.modalImage) { delete out.modalImage; delete out.modalImageScrollable; }
      return out;
    });
  }
  if (key === 'branding' || key === 'smm') {
    return data.map((p) => {
      const out = { ...p, features: (p.features || []).filter((f) => f.text && f.text.trim()) };
      if (out.en) out.en = { ...out.en, features: (out.en.features || []).map((x) => String(x || '').trim()) };
      const delta = cleanLines(p.deltaFromPrev);
      if (delta.length) out.deltaFromPrev = delta; else delete out.deltaFromPrev;
      if (!out.compareHint) delete out.compareHint;
      if (!out.featured) delete out.featured;
      return out;
    });
  }
  if (key === 'calculator') {
    const out = {};
    Object.entries(data).forEach(([k, v]) => { out[k] = Number(v) || 0; });
    return out;
  }
  if (key === 'settings') {
    return { ...data, stats: (data.stats || []).filter((st) => st && (st.value || '').trim()) };
  }
  if (key === 'collaboration') {
    return { offers: data.offers || [], terms: cleanLines(data.terms), terms_en: cleanLines(data.terms_en) };
  }
  return data;
}

/* ---------------- main ---------------- */

function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr('');
    setPw(password);
    try {
      const res = await api('/api/admin/check');
      onLogin(res.content || {});
    } catch (ex) {
      setPw('');
      setErr(ex.message === 'no-password-set'
        ? 'პაროლი ჯერ არ არის დაყენებული Cloudflare-ში.'
        : ex.status === 401 ? 'პაროლი არასწორია' : 'კავშირის შეცდომა, სცადე თავიდან');
    }
    setBusy(false);
  };
  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-[#121212] border border-white/10 rounded-2xl p-6 space-y-4">
        <div>
          <p className="text-xs font-bold tracking-widest text-[#E50914]">ESHELON</p>
          <h1 className="text-2xl font-black text-white">ადმინ პანელი</h1>
        </div>
        <Field label="პაროლი" type="password" value={password} onChange={setPassword} />
        {err && <p className="text-sm text-red-400">{err}</p>}
        <Btn kind="primary" type="submit" disabled={busy}>{busy ? 'შესვლა…' : 'შესვლა'}</Btn>
      </form>
    </div>
  );
}

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState('inbox');
  const [data, setData] = useState(null);
  const [saved, setSaved] = useState(null);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  const loadContent = (stored) => {
    const merged = clone(DEFAULTS);
    Object.keys(DEFAULTS).forEach((k) => {
      if (stored && stored[k] != null) merged[k] = stored[k];
      merged[k] = withEnglish(k, merged[k]);
    });
    setData(merged);
    setSaved(clone(merged));
    setLoggedIn(true);
  };

  useEffect(() => {
    document.title = 'ადმინ პანელი | ESHELON';
    if (!getPw()) {
      setReady(true);
      return;
    }
    api('/api/admin/check')
      .then((res) => loadContent(res.content))
      .catch(() => setPw(''))
      .finally(() => setReady(true));
  }, []);

  const dirtyKeys = useMemo(() => {
    if (!data || !saved) return [];
    return TABS.map((t) => t.key).filter((k) => JSON.stringify(data[k]) !== JSON.stringify(saved[k]));
  }, [data, saved]);

  useEffect(() => {
    const h = (e) => {
      if (dirtyKeys.length) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [dirtyKeys]);

  if (!ready) return <div className="min-h-screen bg-[#0d0d0d]" />;
  if (!loggedIn) return <Login onLogin={loadContent} />;

  const setSection = (key, value) => setData((d) => ({ ...d, [key]: value }));

  const logout = () => {
    if (dirtyKeys.length && !window.confirm('შეუნახავი ცვლილებები დაიკარგება. გავიდე?')) return;
    setPw('');
    setLoggedIn(false);
    setData(null);
    setSaved(null);
  };

  const save = async () => {
    setSaving(true);
    setStatus('');
    const sections = {};
    dirtyKeys.forEach((k) => { sections[k] = normalize(k, data[k]); });
    try {
      await api('/api/admin/save', { body: { sections } });
      const next = { ...data, ...sections };
      setData(next);
      setSaved(clone(next));
      setStatus('შენახულია ✓ საიტზე ცვლილება დაახლოებით 1 წუთში გამოჩნდება.');
    } catch (ex) {
      if (ex.status === 401) {
        setStatus('სესია ამოიწურა ან პაროლი შეიცვალა — გადი და თავიდან შედი (ცვლილებები არ შეინახა).');
      } else {
        setStatus('შენახვა ვერ მოხერხდა: ' + ex.message);
      }
    }
    setSaving(false);
  };

  const discard = () => {
    if (window.confirm('გავაუქმო შეუნახავი ცვლილებები?')) setData(clone(saved));
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <header className="sticky top-0 z-20 bg-[#0d0d0d]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3">
          <div className="mr-auto">
            <p className="text-[10px] font-bold tracking-widest text-[#E50914]">ESHELON</p>
            <h1 className="text-lg font-black leading-tight">ადმინ პანელი</h1>
          </div>
          <a href="/" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-white">საიტის ნახვა ↗</a>
          {dirtyKeys.length > 0 && <Btn onClick={discard}>გაუქმება</Btn>}
          <Btn kind="primary" onClick={save} disabled={saving || !dirtyKeys.length}>
            {saving ? 'ინახება…' : dirtyKeys.length ? `შენახვა (${dirtyKeys.length})` : 'შენახულია'}
          </Btn>
          <button type="button" className="text-xs text-gray-500 hover:text-white" onClick={logout}>გასვლა</button>
        </div>
        <nav className="max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto">
          {ALL_TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`px-3 py-2 text-sm font-semibold whitespace-nowrap border-b-2 transition ${tab === t.key ? 'border-[#E50914] text-white' : 'border-transparent text-gray-500 hover:text-gray-200'}`}
            >
              {t.label}
              {dirtyKeys.includes(t.key) && <span className="ml-1 text-[#E50914]">•</span>}
            </button>
          ))}
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        {status && (
          <p className={`rounded-lg text-sm p-3 border ${status.startsWith('შენახულია') ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' : 'border-red-500/30 bg-red-500/10 text-red-300'}`}>
            {status}
          </p>
        )}
        {!data ? (
          <p className="text-gray-500 text-sm">იტვირთება…</p>
        ) : (
          <>
            {tab === 'portfolio' && <PortfolioEditor value={data.portfolio} onChange={(v) => setSection('portfolio', v)} />}
            {tab === 'news' && <NewsEditor value={data.news} onChange={(v) => setSection('news', v)} />}
            {tab === 'branding' && <PackagesEditor value={data.branding} onChange={(v) => setSection('branding', v)} />}
            {tab === 'smm' && <PackagesEditor smm value={data.smm} onChange={(v) => setSection('smm', v)} />}
            {tab === 'calculator' && <CalculatorEditor value={data.calculator} onChange={(v) => setSection('calculator', v)} />}
            {tab === 'collaboration' && <CollaborationEditor value={data.collaboration} onChange={(v) => setSection('collaboration', v)} />}
            {tab === 'settings' && <SettingsEditor value={data.settings} onChange={(v) => setSection('settings', v)} />}
            {tab === 'inbox' && <LeadsInbox />}
          </>
        )}
      </main>
    </div>
  );
}
