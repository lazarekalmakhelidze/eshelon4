import React, { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { useLang } from '../i18n';

// Package cards. Three columns on bigger screens; on phones a swipeable row that
// opens on the recommended package, so the section is one card tall instead of three.
export default function PackageCards({ list, kind, onChoose }) {
  const { t } = useLang();
  const railRef = useRef(null);
  const raf = useRef(0);
  const featuredIdx = Math.max(0, list.findIndex((p) => p && p.featured));
  const [active, setActive] = useState(featuredIdx);

  const centre = (i, smooth) => {
    const rail = railRef.current;
    const card = rail && rail.children[i];
    if (!card) return;
    const left = card.offsetLeft - (rail.clientWidth - card.clientWidth) / 2;
    rail.scrollTo({ left: Math.max(0, left), behavior: smooth ? 'smooth' : 'auto' });
  };

  useEffect(() => {
    if (window.matchMedia('(min-width: 768px)').matches) return;
    centre(featuredIdx, false);
    setActive(featuredIdx);
  }, [featuredIdx, list.length]); // eslint-disable-line

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const onScroll = () => {
    if (raf.current) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      const rail = railRef.current;
      if (!rail) return;
      const mid = rail.scrollLeft + rail.clientWidth / 2;
      let best = 0;
      let dist = Infinity;
      Array.from(rail.children).forEach((c, i) => {
        const d = Math.abs(c.offsetLeft + c.clientWidth / 2 - mid);
        if (d < dist) { dist = d; best = i; }
      });
      setActive(best);
    });
  };

  return (
    <div className="pf-step">
      <div
        ref={railRef}
        onScroll={onScroll}
        className="flex md:grid md:grid-cols-3 gap-3 md:gap-4 lg:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 pt-4 pb-1 md:pt-0 md:pb-0"
      >
        {list.map((pkg, idx) => {
          const included = (pkg.features || []).filter((f) => f.included && f.text);
          return (
            <div key={idx} className="snap-center shrink-0 w-[84%] max-w-[360px] md:w-auto md:max-w-none flex">
              <div
                className={`relative flex flex-col w-full rounded-2xl p-6 sm:p-7 transition duration-300 ${pkg.featured ? 'bg-gradient-to-b from-[#1d1011] to-[#121212] border border-[#E50914]/70 shadow-[0_24px_60px_-30px_rgba(229,9,20,0.6)]' : 'surface-card bg-[#121212] border border-white/[0.08] hover:border-white/20'}`}
              >
                {pkg.featured && (
                  <span className="absolute -top-3 left-6 px-3 py-1 bg-[#E50914] text-white text-[11px] font-bold tracking-wide rounded-full">
                    {kind === 'branding' ? t('ყველაზე პოპულარული', 'Most popular') : t('რეკომენდებული', 'Recommended')}
                  </span>
                )}
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-lg font-bold text-white">{pkg.title}</h4>
                  {pkg.badge && !pkg.featured && <span className="text-[11px] text-gray-400 px-2 py-0.5 rounded-md border border-white/10">{pkg.badge}</span>}
                </div>
                <div className="mt-4 text-[28px] sm:text-[32px] leading-none font-black text-white tracking-tight">{pkg.price}</div>
                <p className="mt-2 text-[11px] font-semibold tracking-wide text-gray-500">{t('საორიენტაციო ფასი', 'Indicative price')}</p>
                {pkg.desc && <p className="mt-3 text-sm text-gray-400 leading-relaxed line-clamp-2">{pkg.desc}</p>}
                <ul className="mt-5 pt-5 border-t border-white/[0.08] space-y-2.5 flex-1">
                  {included.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-sm">
                      <Check className={`w-4 h-4 mt-0.5 shrink-0 ${feat.discount ? 'text-[#ff4d55]' : 'text-green-500'}`} />
                      <span className={feat.discount ? 'text-white font-semibold' : 'text-gray-200'}>
                        {feat.discount && <span className="mr-1.5 px-1.5 py-0.5 rounded bg-[#E50914] text-white text-[11px] font-black">-50%</span>}
                        {feat.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => onChoose(pkg)}
                  className={`mt-6 w-full py-3.5 px-4 rounded-xl font-bold text-sm transition active:scale-[0.98] ${pkg.featured ? 'bg-[#E50914] text-white hover:bg-red-700' : 'bg-white/[0.06] text-white hover:bg-white/[0.12] border border-white/10'}`}
                >
                  {t('არჩევა', 'Choose')}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {list.length > 1 && (
        <div className="md:hidden mt-4 flex items-center justify-center gap-2">
          {list.map((pkg, i) => (
            <button
              key={i}
              type="button"
              onClick={() => centre(i, true)}
              aria-label={pkg.title || String(i + 1)}
              className={`h-1.5 rounded-full transition-all ${i === active ? 'w-7 bg-[#E50914]' : 'w-1.5 bg-white/25'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
