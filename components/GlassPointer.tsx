'use client';

import { useEffect } from 'react';

/**
 * Liquid-glass touch: the specular highlight on every `.lg` panel follows the
 * pointer (updates --mx/--my used by `.lg::before`). rAF-throttled, passive,
 * and disabled under prefers-reduced-motion.
 */
export default function GlassPointer() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
