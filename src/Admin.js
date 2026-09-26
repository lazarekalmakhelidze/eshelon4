import React, { useEffect, useMemo, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  ADMIN_EMAILS,
  IMAGE_BUCKET,
  isSupabaseConfigured
} from './supabaseConfig';
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

const supabase = isSupabaseConfigured ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

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
  collaboration: { offers: collaborationOffers, terms: collaborationTerms }
};

const TABS = [
  { key: 'portfolio', label: 'პორტფოლიო' },
  { key: 'news', label: 'პოსტები' },
  { key: 'branding', label: 'ბრენდინგის ფასები' },
  { key: 'smm', label: 'SMM ფასები' },
  { key: 'calculator', label: 'კალკულატორი' },
  { key: 'collaboration', label: 'თანამშრომლობა' }
];

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

async function uploadImage(file, folder) {
  const data = await compressImage(file);
  const ext = data.type === 'image/jpeg' ? 'jpg' : (file.name.split('.').pop() || 'img').toLowerCase();
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(IMAGE_BUCKET).upload(path, data, {
    contentType: data.type || file.type,
    cacheControl: '31536000'
  });
  if (error) throw error;
  return supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path).data.publicUrl;
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
          {smm && <Field label="შედარების მინიშნება (წითლად)" value={p.compareHint} onChange={(v) => set({ compareHint: v })} />}
          <Check label="გამოკვეთილი (წითელი ჩარჩო)" checked={p.featured} onChange={(v) => set({ featured: v })} />
          <FeaturesEditor value={p.features} allowDiscount={!smm} onChange={(v) => set({ features: v })} />
          {smm && (
            <LinesField label="რით სჯობს წინა პაკეტს" hint="თითო ცალკე ხაზზე. ცარიელი თუ დატოვე, ბლოკი არ გამოჩნდება." value={p.deltaFromPrev} onChange={(v) => set({ deltaFromPrev: v })} />
          )}
        </>
      )}
    />
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
            </>
          );
        }}
      />
      <div className="rounded-xl border border-white/10 bg-[#141414] p-4">
        <LinesField label="პირობები" hint="თითო პირობა ცალკე ხაზზე" value={value.terms} onChange={(v) => onChange({ ...value, terms: v })} />
      </div>
    </div>
  );
}

/* ---------------- normalize before saving ---------------- */

function normalize(key, data) {
  if (key === 'portfolio') {
    return data.map((p) => {
      const out = { ...p, features: cleanLines(p.features), modalImages: (p.modalImages || []).filter(Boolean) };
      if (!out.modalImages.length) delete out.modalImages;
      if (!out.modalImage) { delete out.modalImage; delete out.modalImageScrollable; }
      return out;
    });
  }
  if (key === 'branding' || key === 'smm') {
    return data.map((p) => {
      const out = { ...p, features: (p.features || []).filter((f) => f.text && f.text.trim()) };
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
  if (key === 'collaboration') {
    return { offers: data.offers || [], terms: cleanLines(data.terms) };
  }
  return data;
}

/* ---------------- main ---------------- */

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr('');
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) setErr('ელფოსტა ან პაროლი არასწორია');
    setBusy(false);
  };
  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-[#121212] border border-white/10 rounded-2xl p-6 space-y-4">
        <div>
          <p className="text-xs font-bold tracking-widest text-[#E50914]">ESHELON</p>
          <h1 className="text-2xl font-black text-white">ადმინ პანელი</h1>
        </div>
        <Field label="ელფოსტა" type="email" value={email} onChange={setEmail} />
        <Field label="პაროლი" type="password" value={password} onChange={setPassword} />
        {err && <p className="text-sm text-red-400">{err}</p>}
        <Btn kind="primary" type="submit" disabled={busy}>{busy ? 'შესვლა…' : 'შესვლა'}</Btn>
      </form>
    </div>
  );
}

export default function Admin() {
  const [session, setSession] = useState(null);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState('portfolio');
  const [data, setData] = useState(null);
  const [saved, setSaved] = useState(null);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.title = 'ადმინ პანელი | ESHELON';
    if (!supabase) return undefined;
    supabase.auth.getSession().then(({ data: d }) => {
      setSession(d.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    (async () => {
      const { data: rows, error } = await supabase.from('site_content').select('key,data');
      if (error) {
        setStatus('მონაცემები ვერ ჩაიტვირთა: ' + error.message);
        return;
      }
      const merged = clone(DEFAULTS);
      (rows || []).forEach((r) => {
        if (r.data != null) merged[r.key] = r.data;
      });
      setData(merged);
      setSaved(clone(merged));
    })();
  }, [session]);

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

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-gray-300 flex items-center justify-center p-6 text-center">
        ადმინ პანელი ჯერ არ არის დაკავშირებული Supabase-თან.
      </div>
    );
  }
  if (!ready) return <div className="min-h-screen bg-[#0d0d0d]" />;
  if (!session) return <Login />;

  const email = (session.user?.email || '').toLowerCase();
  const allowed = ADMIN_EMAILS.map((e) => e.toLowerCase()).includes(email);

  const setSection = (key, value) => setData((d) => ({ ...d, [key]: value }));

  const save = async () => {
    setSaving(true);
    setStatus('');
    const payload = dirtyKeys.map((k) => ({ key: k, data: normalize(k, data[k]), updated_at: new Date().toISOString() }));
    const { error } = await supabase.from('site_content').upsert(payload);
    if (error) {
      setStatus('შენახვა ვერ მოხერხდა: ' + error.message);
    } else {
      const next = { ...data };
      payload.forEach((p) => { next[p.key] = p.data; });
      setData(next);
      setSaved(clone(next));
      setStatus('შენახულია ✓ საიტზე ცვლილება უკვე ჩანს.');
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
          <Btn kind="primary" onClick={save} disabled={!allowed || saving || !dirtyKeys.length}>
            {saving ? 'ინახება…' : dirtyKeys.length ? `შენახვა (${dirtyKeys.length})` : 'შენახულია'}
          </Btn>
          <button type="button" className="text-xs text-gray-500 hover:text-white" onClick={() => supabase.auth.signOut()}>გასვლა</button>
        </div>
        <nav className="max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto">
          {TABS.map((t) => (
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
        {!allowed && (
          <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-300 text-sm p-3">
            ამ ანგარიშს ({email}) შენახვის უფლება არ აქვს.
          </p>
        )}
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
          </>
        )}
      </main>
    </div>
  );
}
