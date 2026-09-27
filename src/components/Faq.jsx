import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useLang } from '../i18n';

// Collapsed question list — takes little space until someone opens a question.
export default function Faq({ items }) {
  const { t } = useLang();
  const list = (items || []).filter((x) => x && x.q && x.a);
  const [open, setOpen] = useState(null);
  if (!list.length) return null;
  return (
    <div id="faq" className="max-w-3xl mx-auto">
      <p className="text-xl sm:text-2xl font-black text-white mb-5">{t('ხშირი კითხვები', 'Frequently asked questions')}</p>
      <div className="rounded-2xl border border-white/[0.08] bg-[#111] divide-y divide-white/[0.07]">
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
  );
}
