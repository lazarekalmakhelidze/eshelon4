import React, { useState } from 'react';
import { Check, Minus, Plus, ArrowRight } from 'lucide-react';
import { useLang } from '../i18n';

const fmt = (n) => Number(n || 0).toLocaleString('en-US');

function ToggleTile({ on, onClick, title, price, note }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`group w-full flex items-center gap-3 text-left rounded-xl border px-4 py-3.5 transition active:scale-[0.99] ${on ? 'border-[#E50914]/70 bg-[#E50914]/[0.08]' : 'border-white/10 bg-black/30 hover:border-white/25'}`}
    >
      <span className={`w-6 h-6 shrink-0 rounded-full border flex items-center justify-center transition ${on ? 'bg-[#E50914] border-[#E50914]' : 'border-white/25'}`}>
        {on && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-[15px] font-semibold text-white">{title}</span>
        {note && <span className="block text-[12px] text-gray-400">{note}</span>}
      </span>
      <span className={`text-sm font-bold tabular-nums ${on ? 'text-white' : 'text-gray-400'}`}>+{fmt(price)} ₾</span>
    </button>
  );
}

function Stepper({ label, value, min, max, step = 1, unitPrice, onChange }) {
  const set = (v) => onChange(Math.max(min, Math.min(max, v)));
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-3.5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="block text-[15px] font-semibold text-white">{label}</span>
          <span className="block text-[12px] text-gray-400">{fmt(unitPrice)} ₾ × {value} = <span className="text-gray-200 font-semibold">{fmt(unitPrice * value)} ₾</span></span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button type="button" onClick={() => set(value - step)} disabled={value <= min} className="w-9 h-9 rounded-lg bg-white/[0.06] hover:bg-white/10 disabled:opacity-30 flex items-center justify-center text-white" aria-label="−">
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-9 text-center text-lg font-black text-white tabular-nums">{value}</span>
          <button type="button" onClick={() => set(value + step)} disabled={value >= max} className="w-9 h-9 rounded-lg bg-white/[0.06] hover:bg-white/10 disabled:opacity-30 flex items-center justify-center text-white" aria-label="+">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => set(parseInt(e.target.value, 10))}
        className="calc-range mt-3 w-full"
        style={{ '--pct': `${pct}%` }}
        aria-label={label}
      />
    </div>
  );
}

export default function PriceCalculator({ prices, onOrder }) {
  const { t } = useLang();
  const p = {
    logo: Number(prices.logo) || 0,
    guidelines: Number(prices.guidelines) || 0,
    post: Number(prices.post) || 0,
    story: Number(prices.story) || 0,
    advertising: Number(prices.advertising) || 0,
    shadowTesting: Number(prices.shadowTesting) || 0
  };
  const [sel, setSel] = useState({ logo: false, guidelines: false, posts: 10, stories: 10, advertising: true, shadowTesting: false });
  const toggle = (k) => setSel((s) => ({ ...s, [k]: !s[k] }));

  const once = (sel.logo ? p.logo : 0) + (sel.guidelines ? p.guidelines : 0);
  const monthly = sel.posts * p.post + sel.stories * p.story + (sel.advertising ? p.advertising : 0) + (sel.shadowTesting ? p.shadowTesting : 0);

  const lines = [
    sel.logo && [t('ლოგოს დიზაინი', 'Logo design'), p.logo, 'once'],
    sel.guidelines && [t('ბრენდბუქი & გრიდები', 'Brand book & grids'), p.guidelines, 'once'],
    sel.posts > 0 && [`${sel.posts} ${t('პოსტი', 'posts')}`, sel.posts * p.post, 'mo'],
    sel.stories > 0 && [`${sel.stories} ${t('სთორი', 'stories')}`, sel.stories * p.story, 'mo'],
    sel.advertising && [t('რეკლამის მართვა', 'Ad management'), p.advertising, 'mo'],
    sel.shadowTesting && [t('შადოუ ტესტირება', 'Shadow ad testing'), p.shadowTesting, 'mo']
  ].filter(Boolean);

  const perMonth = t('/ თვე', '/ month');
  const priceLabel = [monthly ? `${fmt(monthly)} ₾ ${perMonth}` : '', once ? `${fmt(once)} ₾ ${t('ერთჯერადად', 'one-time')}` : ''].filter(Boolean).join(' + ');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
      <div className="lg:col-span-7 space-y-6">
        <div className="space-y-2.5">
          <p className="text-xs font-bold tracking-wide text-gray-400">{t('ბრენდინგი · ერთჯერადი', 'Branding · one-time')}</p>
          <ToggleTile on={sel.logo} onClick={() => toggle('logo')} title={t('ლოგოს დიზაინი', 'Logo design')} price={p.logo} />
          <ToggleTile on={sel.guidelines} onClick={() => toggle('guidelines')} title={t('ბრენდბუქი & გრიდები', 'Brand book & grids')} price={p.guidelines} />
        </div>
        <div className="space-y-2.5">
          <p className="text-xs font-bold tracking-wide text-gray-400">{t('სოციალური მედია · ყოველთვიური', 'Social media · monthly')}</p>
          <Stepper label={t('პოსტები თვეში', 'Posts per month')} value={sel.posts} min={0} max={30} unitPrice={p.post} onChange={(v) => setSel((s) => ({ ...s, posts: v }))} />
          <Stepper label={t('სთორები თვეში', 'Stories per month')} value={sel.stories} min={0} max={30} unitPrice={p.story} onChange={(v) => setSel((s) => ({ ...s, stories: v }))} />
          <ToggleTile on={sel.advertising} onClick={() => toggle('advertising')} title={t('რეკლამის მართვა', 'Ad management')} note={t('Facebook / Instagram კამპანიები', 'Facebook / Instagram campaigns')} price={p.advertising} />
          <ToggleTile on={sel.shadowTesting} onClick={() => toggle('shadowTesting')} title={t('შადოუ რეკლამების ტესტირება', 'Shadow ad testing')} note={t('A/B ტესტები საუკეთესო შედეგისთვის', 'A/B tests for the best result')} price={p.shadowTesting} />
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28 rounded-2xl border border-white/10 bg-gradient-to-b from-[#1a1112] to-[#0f0f0f] p-6 sm:p-7">
          <p className="text-xs font-bold tracking-wide text-[#ff4d55]">{t('სავარაუდო ღირებულება', 'Estimated cost')}</p>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-white tabular-nums">{fmt(monthly)}</span>
              <span className="text-lg font-bold text-white">₾</span>
              <span className="text-sm text-gray-400">{perMonth}</span>
            </div>
            {once > 0 && (
              <p className="mt-2 text-sm text-gray-300">+ <span className="font-bold text-white tabular-nums">{fmt(once)} ₾</span> {t('ერთჯერადად', 'one-time')}</p>
            )}
          </div>
          <div className="mt-5 pt-5 border-t border-white/10 space-y-2 min-h-[60px]">
            {lines.length === 0 && <p className="text-sm text-gray-500">{t('აირჩიეთ მომსახურება', 'Pick a service')}</p>}
            {lines.map(([label, amount, kind]) => (
              <div key={label} className="flex items-center justify-between text-sm">
                <span className="text-gray-300">{label}</span>
                <span className="text-gray-200 font-semibold tabular-nums">{fmt(amount)} ₾{kind === 'mo' ? <span className="text-gray-500 font-normal"> {perMonth}</span> : ''}</span>
              </div>
            ))}
          </div>
          <button
            type="button"
            disabled={!lines.length}
            onClick={() => onOrder({
              title: t('ინდივიდუალური პაკეტი', 'Custom package'),
              price: priceLabel,
              details: lines.map(([l]) => l).join(', ')
            })}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-100 active:scale-[0.98] transition disabled:opacity-40"
          >
            {t('ამ პაკეტის მოთხოვნა', 'Request this package')}
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="mt-3 text-[12px] text-gray-500 leading-relaxed">{t('ზუსტი ფასი დაზუსტდება მოკლე საუბრის შემდეგ.', 'The final price is confirmed after a short call.')}</p>
        </div>
      </div>
    </div>
  );
}
