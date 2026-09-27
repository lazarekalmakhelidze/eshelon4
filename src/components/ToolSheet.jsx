import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useLang } from '../i18n';

// A window for the helpers (package finder, calculator): a bottom sheet on phones,
// a centred window on bigger screens. Keeps the pricing section itself short.
export default function ToolSheet({ title, subtitle, wide = false, onClose, children }) {
  const { t } = useLang();
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[60] bg-black/80 flex items-end sm:items-center justify-center sm:p-4 pv-fade" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full ${wide ? 'sm:max-w-5xl' : 'sm:max-w-3xl'} max-h-[92vh] sm:max-h-[88vh] overflow-y-auto overscroll-contain bg-[#121212] border border-white/10 rounded-t-3xl sm:rounded-2xl shadow-2xl sheet-up`}
      >
        <div className="sticky top-0 z-20 bg-[#121212] px-5 sm:px-8 pt-3 sm:pt-6 pb-4 border-b border-white/[0.06]">
          <div className="sm:hidden mx-auto mb-3 w-10 h-1 rounded-full bg-white/20" />
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-lg sm:text-xl font-black text-white">{title}</p>
              {subtitle && <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 shrink-0 flex items-center justify-center text-gray-300 hover:text-white bg-white/5 rounded-full border border-white/10 transition"
              aria-label={t('დახურვა', 'Close')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="px-5 sm:px-8 pt-5 pb-5 sm:pb-8">{children}</div>
      </div>
    </div>
  );
}
