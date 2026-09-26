import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ArrowRight, Check, Link2, Maximize2 } from 'lucide-react';
import { useLang } from '../i18n';
import Img from '../Img';

export function projectImages(project) {
  if (!project) return [];
  if (Array.isArray(project.modalImages) && project.modalImages.length) return project.modalImages;
  const single = project.modalImage || project.coverImage;
  return single ? [single] : [];
}

function FadeImage({ src, alt, className = '', eager, onClick, sizes = '100vw' }) {
  const { t } = useLang();
  const [loaded, setLoaded] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      className={`pv-img group relative block w-full overflow-hidden rounded-xl bg-white/[0.03] border border-white/[0.06] cursor-zoom-in ${className}`}
      aria-label={`${alt} — ${t('გადიდება', 'enlarge')}`}
    >
      <Img
        src={src}
        sizes={sizes}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`block w-full h-auto transition duration-700 ease-out ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'}`}
      />
      {!loaded && <span className="absolute inset-0 min-h-[220px] animate-pulse bg-white/[0.04]" />}
      <span className="pointer-events-none absolute right-3 top-3 hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-black/60 border border-white/15 text-white opacity-0 group-hover:opacity-100 transition">
        <Maximize2 className="w-4 h-4" />
      </span>
    </button>
  );
}

function Lightbox({ images, index, title, onClose, onIndex }) {
  const { t } = useLang();
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState('50% 50%');
  const touch = useRef(null);
  const count = images.length;
  const go = useCallback((d) => {
    setZoom(false);
    onIndex((index + d + count) % count);
  }, [index, count, onIndex]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); onClose(); }
      if (e.key === 'ArrowRight' && count > 1) { e.stopPropagation(); go(1); }
      if (e.key === 'ArrowLeft' && count > 1) { e.stopPropagation(); go(-1); }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [go, onClose, count]);

  const onTouchStart = (e) => {
    if (e.touches.length !== 1) { touch.current = null; return; }
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: Date.now() };
  };
  const onTouchEnd = (e) => {
    const s = touch.current;
    touch.current = null;
    if (!s || count < 2 || window.visualViewport?.scale > 1.05) return;
    const dx = e.changedTouches[0].clientX - s.x;
    const dy = e.changedTouches[0].clientY - s.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3 && Date.now() - s.t < 700) go(dx < 0 ? 1 : -1);
    if (dy > 110 && Math.abs(dy) > Math.abs(dx) * 1.5) onClose();
  };
  const toggleZoom = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
    setZoom((z) => !z);
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/95 flex flex-col pv-fade" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="flex items-center justify-between px-4 sm:px-6 h-14 text-white/80 text-sm shrink-0">
        <span className="font-semibold truncate pr-4">{title}</span>
        <div className="flex items-center gap-3">
          {count > 1 && <span className="tabular-nums text-white/60">{index + 1} / {count}</span>}
          <button type="button" onClick={onClose} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center" aria-label={t('დახურვა', 'Close')}>
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="relative flex-1 min-h-0 overflow-auto flex items-center justify-center" style={{ touchAction: 'pinch-zoom pan-x pan-y' }}>
        <Img
          key={images[index]}
          src={images[index]}
          sizes="100vw"
          alt={`${title} ${index + 1}`}
          onClick={toggleZoom}
          className={`pv-zoom-in max-w-full max-h-full object-contain select-none transition-transform duration-300 ${zoom ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
          style={{ transform: zoom ? 'scale(2.2)' : 'none', transformOrigin: origin }}
          draggable={false}
        />
        {count > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center text-white" aria-label={t('წინა', 'Previous')}>
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button type="button" onClick={() => go(1)} className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center text-white" aria-label={t('შემდეგი', 'Next')}>
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
      <p className="sm:hidden text-center text-[12px] text-white/45 py-3 shrink-0">
        {count > 1 ? t('გადაფურცლეთ გვერდზე · გასადიდებლად გაწელეთ თითებით', 'Swipe to browse · pinch to zoom') : t('გასადიდებლად გაწელეთ თითებით', 'Pinch to zoom')}
      </p>
    </div>
  );
}

export default function ProjectViewer({ projects, index, onClose, onNavigate, onOrder, workTypeLabel }) {
  const { t } = useLang();
  const project = projects[index];
  const images = useMemo(() => projectImages(project), [project]);
  const isLong = Boolean(project && project.modalImageScrollable && !(project.modalImages && project.modalImages.length));
  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [copied, setCopied] = useState(false);
  const count = projects.length;
  const next = projects[(index + 1) % count];
  const prev = projects[(index - 1 + count) % count];

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    setProgress(0);
    setLightbox(null);
  }, [index]);

  useEffect(() => {
    const onKey = (e) => {
      if (lightbox !== null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && count > 1) onNavigate((index + 1) % count);
      if (e.key === 'ArrowLeft' && count > 1) onNavigate((index - 1 + count) % count);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, count, onClose, onNavigate, lightbox]);

  const onScroll = (e) => {
    const el = e.currentTarget;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? el.scrollTop / max : 0);
  };

  const copyLink = async () => {
    const url = `${window.location.origin}/#project-${project.id}`;
    try {
      if (navigator.share && window.matchMedia('(pointer: coarse)').matches) {
        await navigator.share({ title: `${project.title} — ESHELON`, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) { /* user cancelled */ }
  };

  if (!project) return null;
  const features = Array.isArray(project.features) ? project.features.filter(Boolean) : [];

  const Info = ({ compact }) => (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[12px] font-semibold tracking-wide text-[#ff4d55]">{project.category}</span>
          {workTypeLabel && (
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-gray-300">{workTypeLabel}</span>
          )}
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white leading-[1.1] break-words">{project.title}</h2>
      </div>
      {project.longDescription && (
        <p className="text-[15px] leading-relaxed text-gray-300">{project.longDescription}</p>
      )}
      {!compact && features.length > 0 && (
        <ul className="space-y-2.5">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-200">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-[#E50914]/15 border border-[#E50914]/40 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-[#ff4d55]" />
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      )}
      {!compact && (
        <div className="flex flex-col gap-3 pt-2">
          <button
            type="button"
            onClick={() => onOrder(project)}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#E50914] text-white font-bold text-sm hover:bg-red-700 active:scale-[0.98] transition"
          >
            {t('მსგავსი პროექტის შეკვეთა', 'Order a similar project')}
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={copyLink}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-gray-200 text-sm font-semibold hover:bg-white/5 transition"
          >
            <Link2 className="w-4 h-4" />
            {copied ? t('ბმული დაკოპირდა ✓', 'Link copied ✓') : t('პროექტის გაზიარება', 'Share project')}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a] pv-enter" role="dialog" aria-modal="true" aria-label={project.title}>
      {/* progress */}
      <div className="absolute top-0 left-0 right-0 h-[3px] z-20 bg-white/5">
        <div className="h-full bg-[#E50914] origin-left transition-transform duration-150" style={{ transform: `scaleX(${progress})` }} />
      </div>

      {/* top bar */}
      <div className="absolute top-[3px] left-0 right-0 z-10 h-16 flex items-center justify-between gap-3 px-3 sm:px-6 bg-[#0a0a0a]/85 backdrop-blur-md border-b border-white/[0.06]">
        <div className="flex items-center gap-2 min-w-0">
          <button type="button" onClick={onClose} className="w-10 h-10 shrink-0 rounded-full bg-white/[0.06] hover:bg-white/10 flex items-center justify-center text-white" aria-label={t('დახურვა', 'Close')}>
            <X className="w-5 h-5" />
          </button>
          <span className="text-sm font-bold text-white truncate">{project.title}</span>
        </div>
        {count > 1 && (
          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:inline text-xs text-gray-500 tabular-nums mr-1">{index + 1} / {count}</span>
            <button type="button" onClick={() => onNavigate((index - 1 + count) % count)} className="w-10 h-10 rounded-full bg-white/[0.06] hover:bg-white/10 flex items-center justify-center text-white" aria-label={`${t('წინა', 'Previous')}: ${prev.title}`}>
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button type="button" onClick={() => onNavigate((index + 1) % count)} className="w-10 h-10 rounded-full bg-white/[0.06] hover:bg-white/10 flex items-center justify-center text-white" aria-label={`${t('შემდეგი', 'Next')}: ${next.title}`}>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <div ref={scrollRef} onScroll={onScroll} className="h-full overflow-y-auto overscroll-contain custom-scroll pt-[67px]">
        <div key={project.id} className="pv-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* info — sticky on desktop */}
            <aside className="lg:col-span-4 order-1">
              <div className="lg:sticky lg:top-[96px]">
                <div className="lg:hidden"><Info compact /></div>
                <div className="hidden lg:block"><Info /></div>
              </div>
            </aside>

            {/* images */}
            <div className="lg:col-span-8 order-2">
              {isLong || images.length === 1 ? (
                <FadeImage src={images[0]} sizes="(min-width: 1024px) 860px, 100vw" alt={project.title} eager onClick={() => setLightbox(0)} />
              ) : (
                <div className="columns-1 sm:columns-2 gap-3 sm:gap-4 [&>*]:mb-3 sm:[&>*]:mb-4">
                  {images.map((src, i) => (
                    <div key={`${src}-${i}`} className="break-inside-avoid">
                      <FadeImage src={src} sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw" alt={`${project.title} ${i + 1}`} eager={i < 4} onClick={() => setLightbox(i)} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* mobile: features + CTA after images */}
            <div className="lg:hidden order-3 space-y-6">
              {features.length > 0 && (
                <ul className="space-y-2.5">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-200">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-[#E50914]/15 border border-[#E50914]/40 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-[#ff4d55]" />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-col gap-3">
                <button type="button" onClick={() => onOrder(project)} className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#E50914] text-white font-bold text-sm active:scale-[0.98] transition">
                  {t('მსგავსი პროექტის შეკვეთა', 'Order a similar project')}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button type="button" onClick={copyLink} className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-gray-200 text-sm font-semibold">
                  <Link2 className="w-4 h-4" />
                  {copied ? t('ბმული დაკოპირდა ✓', 'Link copied ✓') : t('პროექტის გაზიარება', 'Share project')}
                </button>
              </div>
            </div>
          </div>

          {/* next project */}
          {count > 1 && (
            <button
              type="button"
              onClick={() => onNavigate((index + 1) % count)}
              className="group mt-14 sm:mt-20 w-full text-left relative overflow-hidden rounded-2xl border border-white/10 bg-[#111]"
            >
              {next.coverImage && (
                <Img src={next.coverImage} sizes="100vw" alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:opacity-50 group-hover:scale-105 transition duration-700" />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/10" />
              <div className="relative flex items-center justify-between gap-4 p-6 sm:p-10 min-h-[140px] sm:min-h-[200px]">
                <div className="min-w-0">
                  <p className="text-xs font-semibold tracking-wide text-[#ff4d55] mb-2">{t('შემდეგი პროექტი', 'Next project')}</p>
                  <p className="text-2xl sm:text-4xl font-black text-white truncate">{next.title}</p>
                  <p className="text-sm text-gray-300 mt-1 truncate">{next.category}</p>
                </div>
                <span className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#E50914] flex items-center justify-center text-white group-hover:translate-x-1 transition">
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </span>
              </div>
            </button>
          )}
        </div>
      </div>

      {lightbox !== null && (
        <Lightbox images={images} index={lightbox} title={project.title} onClose={() => setLightbox(null)} onIndex={setLightbox} />
      )}
    </div>
  );
}
