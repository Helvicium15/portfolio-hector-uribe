'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { projects } from '@/lib/data';
import { useLang } from './LanguageProvider';

export default function ProjectsCarousel() {
  const { lang } = useLang();
  const en = lang === 'en';
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [progress, setProgress] = useState(0);
  const [thumb, setThumb] = useState(0.4);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setThumb(el.scrollWidth > 0 ? Math.min(1, el.clientWidth / el.scrollWidth) : 1);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();

    // Mouse wheel → horizontal scroll (non-passive so we can preventDefault).
    // Only hijacks the wheel while the carousel can still scroll that way;
    // at either end the page scrolls normally.
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // trackpad horizontal already works
      const canRight = el.scrollLeft < el.scrollWidth - el.clientWidth - 1;
      const canLeft = el.scrollLeft > 1;
      if ((e.deltaY > 0 && canRight) || (e.deltaY < 0 && canLeft)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [updateArrows]);

  // One-time gentle nudge on first view to reveal the slider is scrollable.
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const el = trackRef.current;
    if (!el) return;
    let t2: ReturnType<typeof setTimeout>;
    const t1 = setTimeout(() => {
      if (!el || el.scrollLeft > 4) return;
      el.scrollTo({ left: 46, behavior: 'smooth' });
      t2 = setTimeout(() => el?.scrollTo({ left: 0, behavior: 'smooth' }), 680);
    }, 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const scrollByCards = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    const step = card ? card.offsetWidth + 20 : 340;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <div
          ref={trackRef}
          className="proj-carousel"
          style={{
            display: 'flex',
            gap: 20,
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            padding: '4px 2px 16px',
          }}
        >
          {projects.map((p) => {
            const href = p.url ?? `/projekte/${p.slug}`;
            const isExternal = !!p.url;
            return (
              <a
                data-card
                key={p.id}
                href={href}
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                aria-label={`${en ? 'View project' : 'Projekt ansehen'}: ${p.name}`}
                className="proj-card"
                style={{
                  position: 'relative',
                  flex: '0 0 auto',
                  width: 'clamp(258px, 80vw, 336px)',
                  scrollSnapAlign: 'center',
                  borderRadius: 20,
                  overflow: 'hidden',
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(15,41,64,0.08), 0 0 0 1px rgba(131,202,226,0.14)',
                }}
              >
                <img
                  src={p.img}
                  alt={p.name}
                  draggable={false}
                  style={{ width: '100%', aspectRatio: '16 / 10', objectFit: 'cover', display: 'block' }}
                />

                {/* Bottom gradient for legible text */}
                <div aria-hidden style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.76) 0%, rgba(0,0,0,0.22) 42%, transparent 100%)',
                  pointerEvents: 'none',
                }} />

                {p.isNew && (
                  <span style={{
                    position: 'absolute', top: 14, right: 14,
                    fontFamily: 'var(--font-mono)', fontSize: 11,
                    letterSpacing: '0.10em', textTransform: 'uppercase',
                    background: 'rgba(254,134,132,0.15)',
                    border: '1px solid rgba(254,134,132,0.35)',
                    borderRadius: 999, padding: '5px 12px',
                    color: '#fd7c7a',
                    backdropFilter: 'blur(8px)',
                  }}>{en ? 'New' : 'Neu'}</span>
                )}

                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 20px 20px' }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 11,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: `${p.accent}dd`, marginBottom: 6,
                  }}>{en && p.catEn ? p.catEn : p.cat}</div>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontWeight: 700,
                    fontSize: 20, lineHeight: 1.2, color: '#fff',
                  }}>{p.name}</div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 12,
                    color: 'rgba(255,255,255,0.60)', marginTop: 6,
                  }}>{p.tools}</div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Edge fades — cue that more cards continue off-screen */}
        <div aria-hidden className="proj-fade proj-fade-left" style={{ opacity: canPrev ? 1 : 0 }} />
        <div aria-hidden className="proj-fade proj-fade-right" style={{ opacity: canNext ? 1 : 0 }} />

        {/* Prev / Next */}
        <button
          type="button"
          onClick={() => scrollByCards(-1)}
          aria-label={en ? 'Previous projects' : 'Vorherige Projekte'}
          className="proj-arrow"
          data-side="prev"
          style={{ opacity: canPrev ? 1 : 0, pointerEvents: canPrev ? 'auto' : 'none' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
        </button>
        <button
          type="button"
          onClick={() => scrollByCards(1)}
          aria-label={en ? 'Next projects' : 'Nächste Projekte'}
          className="proj-arrow"
          data-side="next"
          style={{ opacity: canNext ? 1 : 0, pointerEvents: canNext ? 'auto' : 'none' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      </div>

      {/* Scroll affordance: progress track + animated instruction */}
      <div className="proj-scrollbar" aria-hidden>
        <span
          className="proj-scrollbar-thumb"
          style={{ width: `${Math.max(thumb * 100, 12)}%`, left: `${progress * (1 - thumb) * 100}%` }}
        />
      </div>
      <p className="proj-hint">
        <span>{en ? 'Scroll or swipe to see more' : 'Scrollen oder wischen für mehr'}</span>
        <svg className="proj-hint-arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </p>
    </div>
  );
}
