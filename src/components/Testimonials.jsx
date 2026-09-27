import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLang } from '../i18n';
import Img from '../Img';

// Compact quote slider: one quote at a time, auto-advances, swipe on phones.
// All slides share one grid cell, so the block keeps the height of the longest quote (no jumping).
export default function Testimonials({ items }) {
  const { t } = useLang();
  const list = (items || []).filter((x) => x && x.quote && x.name);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touch = useRef(null);
  const count = list.length;

  useEffect(() => {
    if (count < 2 || paused) return undefined;
    const id = setInterval(() => setI((v) => (v + 1) % count), 7000);
    return () => clearInterval(id);
  }, [count, paused]);

  useEffect(() => { if (i >= count) setI(0); }, [i, count]);

  if (!count) return null;
  const go = (d) => setI((v) => (v + d + count) % count);

  return (
    <section id="testimonials" data-reveal className="reveal-section py-16 sm:py-20 bg-[#0b0b0c] border-y border-[#1a1a1f] relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 -top-24 -translate-x-1/2 w-[720px] h-[380px] bg-[radial-gradient(closest-side,rgba(229,9,20,0.08),transparent)]" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="section-eyebrow text-xs font-bold text-[#E50914] tracking-widest uppercase">
            {t('რას ამბობენ კლიენტები', 'What clients say')}
          </h2>
        </div>
        <div
          className="grid"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={(e) => { touch.current = e.touches[0].clientX; setPaused(true); }}
          onTouchEnd={(e) => {
            const s = touch.current; touch.current = null;
            if (s == null) return;
            const dx = e.changedTouches[0].clientX - s;
            if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
          }}
        >
          {list.map((item, k) => (
            <figure
              key={item.id || k}
              aria-hidden={k !== i}
              className={`[grid-area:1/1] self-center text-center transition-all duration-700 ease-out ${k === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'}`}
            >
              <span className="block text-6xl leading-none font-black text-[#E50914]/70 select-none" aria-hidden="true">“</span>
              <blockquote className="mt-2 text-lg sm:text-2xl leading-relaxed sm:leading-snug font-semibold text-white text-balance">
                {item.quote}
              </blockquote>
              <figcaption className="mt-6 sm:mt-8 flex items-center justify-center gap-3">
                {item.photo && (
                  <span className="w-11 h-11 rounded-full overflow-hidden border border-white/15 shrink-0 bg-white/5">
                    <Img src={item.photo} sizes="44px" alt="" className="w-full h-full object-cover" loading="lazy" />
                  </span>
                )}
                <span className="text-left">
                  <span className="block text-sm font-bold text-white">{item.name}</span>
                  {(item.role || item.company) && (
                    <span className="block text-[13px] text-gray-400">{[item.role, item.company].filter(Boolean).join(' · ')}</span>
                  )}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        {count > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button type="button" onClick={() => go(-1)} className="w-10 h-10 rounded-full border border-white/15 text-gray-300 hover:text-white hover:border-white/40 flex items-center justify-center" aria-label={t('წინა', 'Previous')}>
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {list.map((_, k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setI(k)}
                  aria-label={`${k + 1}`}
                  className={`h-1.5 rounded-full transition-all ${k === i ? 'w-7 bg-[#E50914]' : 'w-1.5 bg-white/25 hover:bg-white/50'}`}
                />
              ))}
            </div>
            <button type="button" onClick={() => go(1)} className="w-10 h-10 rounded-full border border-white/15 text-gray-300 hover:text-white hover:border-white/40 flex items-center justify-center" aria-label={t('შემდეგი', 'Next')}>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
