import React, { useState } from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { useLang } from '../i18n';

// Its own quiet section just before the contact form: a title on the left,
// collapsed questions on the right — little to read until someone opens one.
export default function Faq({ items }) {
  const { t } = useLang();
  const list = (items || []).filter((x) => x && x.q && x.a);
  const [open, setOpen] = useState(null);
  if (!list.length) return null;
  return (
    <section id="faq" data-reveal className="reveal-section py-20 sm:py-24 bg-[#0d0d0d] border-t border-[#1e1e1e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        <div className="lg:col-span-4 space-y-4">
          <h2 className="section-eyebrow text-xs font-bold text-[#E50914] tracking-widest uppercase">{t('კითხვები', 'Questions')}</h2>
          <p className="mersad-heading text-[26px] leading-[1.15] sm:text-4xl text-white">{t('ᲮᲨᲘᲠᲘ ᲙᲘᲗᲮᲕᲔᲑᲘ', 'FREQUENTLY ASKED')}</p>
          <p className="text-[15px] text-gray-400 leading-relaxed max-w-xs">
            {t('ვერ იპოვეთ პასუხი?', 'Didn’t find your answer?')}{' '}
            <a href="#contact" className="inline-flex items-center gap-1 font-semibold text-white hover:text-[#ff4d55] transition">
              {t('მოგვწერეთ', 'Write to us')} <ArrowRight className="w-4 h-4" />
            </a>
          </p>
        </div>
        <div className="lg:col-span-8 rounded-2xl border border-white/[0.08] bg-[#111] divide-y divide-white/[0.07]">
          {list.map((item, k) => {
            const isOpen = open === k;
            return (
              <div key={item.id || k}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : k)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-4 sm:py-5 group"
                >
                  <span className={`text-[15px] sm:text-base font-semibold transition ${isOpen ? 'text-white' : 'text-gray-200 group-hover:text-white'}`}>{item.q}</span>
                  <span className={`w-8 h-8 shrink-0 rounded-full border flex items-center justify-center transition duration-300 ${isOpen ? 'rotate-45 bg-[#E50914] border-[#E50914] text-white' : 'border-white/15 text-gray-400 group-hover:text-white'}`}>
                    <Plus className="w-4 h-4" />
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 sm:px-6 pb-5 text-[15px] leading-relaxed text-gray-300">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
