'use client';

import { useEffect } from 'react';

/**
 * Global liquid-glass UI effects:
 *  1. The specular highlight on every `.lg` panel follows the pointer
 *     (updates --mx/--my used by `.lg::before`).
 *  2. Auto-hides the fixed language toggle + subpage back-link on scroll-down
 *     (toggles `html.nav-hidden`), in sync with the dock.
 * Both are rAF-throttled and passive; the pointer effect respects
 * prefers-reduced-motion.
 */
export default function GlassPointer() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let cx = 0, cy = 0;
    const onMove = (e: PointerEvent) => {
      cx = e.clientX; cy = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const els = document.querySelectorAll<HTMLElement>('.lg');
        for (let i = 0; i < els.length; i++) {
          const el = els[i];
          const r = el.getBoundingClientRect();
          if (r.width === 0) continue;
          if (cx < r.left - 130 || cx > r.right + 130 || cy < r.top - 130 || cy > r.bottom + 130) continue;
          el.style.setProperty('--mx', (((cx - r.left) / r.width) * 100).toFixed(1) + '%');
          el.style.setProperty('--my', (((cy - r.top) / r.height) * 100).toFixed(1) + '%');
        }
      });
    };
    if (!reduce) window.addEventListener('pointermove', onMove, { passive: true });

    let sTicking = false;
    let lastY = window.scrollY;
    const root = document.documentElement;
    const onScroll = () => {
      if (sTicking) return;
      sTicking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const nearBottom = window.innerHeight + y >= document.body.scrollHeight - 140;
        if (y < 150 || nearBottom) root.classList.remove('nav-hidden');
        else if (y > lastY + 6) root.classList.add('nav-hidden');
        else if (y < lastY - 6) root.classList.remove('nav-hidden');
        lastY = y;
        sTicking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
