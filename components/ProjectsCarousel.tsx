'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { projects } from '@/lib/data';

export default function ProjectsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
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
                aria-label={`Projekt ansehen: ${p.name}`}
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
                  }}>Neu</span>
                )}

                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 20px 20px' }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 11,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: `${p.accent}dd`, marginBottom: 6,
                  }}>{p.cat}</div>
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

        {/* Prev / Next */}
        <button
          type="button"
          onClick={() => scrollByCards(-1)}
          aria-label="Vorherige Projekte"
          className="proj-arrow"
          data-side="prev"
          style={{ opacity: canPrev ? 1 : 0, pointerEvents: canPrev ? 'auto' : 'none' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
        </button>
        <button
          type="button"
          onClick={() => scrollByCards(1)}
          aria-label="Nächste Projekte"
          className="proj-arrow"
          data-side="next"
          style={{ opacity: canNext ? 1 : 0, pointerEvents: canNext ? 'auto' : 'none' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      </div>

      <p style={{
        textAlign: 'center', margin: '10px 0 0',
        fontFamily: 'var(--font-mono)', fontSize: 11,
        letterSpacing: '0.16em', textTransform: 'uppercase',
        color: 'rgba(15,41,64,0.72)',
      }}>
        Scrollen · Wischen · Klicken
      </p>
    </div>
  );
}
