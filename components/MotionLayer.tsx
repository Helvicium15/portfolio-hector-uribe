'use client';

import { useEffect } from 'react';

/**
 * Page-wide micro-interactions, all transform/opacity only (60fps) and all
 * disabled under prefers-reduced-motion:
 *  1. Scroll reveal — cards and labels fade + rise as they enter (60ms stagger per group).
 *  2. Card tilt — project cards tilt up to 4° towards the pointer with a moving light.
 *  3. Magnetic primary buttons — drift 3–4px towards the pointer.
 *  4. Hero cursor glow — soft orange radial follows the pointer in the hero.
 *  5. Diorama parallax — the stage drifts up to 8px with the pointer.
 * Content is only hidden once JS has run, so nothing stays invisible without it.
 */
const REVEAL = '.live-card, .proj-card, .contact-email, .contact-links > a, .sub-section, .sec-label, .glass-card';
const TILT = '.live-card, .proj-card';
const MAGNET = '.btn-primary';

export default function MotionLayer() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.documentElement;
    root.classList.add('motion-ok');

    /* 1 ── scroll reveal ─────────────────────────────────────── */
    const io = new IntersectionObserver((entries) => {
      // a clipped .sec-label is observed through its parent (clip-path hides it from IO)
      const batch = entries.filter(e => e.isIntersecting).map(e => proxied.get(e.target) ?? (e.target as HTMLElement));
      batch.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top || a.getBoundingClientRect().left - b.getBoundingClientRect().left);
      batch.forEach((el, i) => {
        el.style.setProperty('--rv-delay', `${i * 60}ms`);
        el.classList.add('is-in');
        io.unobserve(el.classList.contains('sec-label') && el.parentElement ? el.parentElement : el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    const observed = new WeakSet<Element>();
    const proxied = new Map<Element, HTMLElement>();
    const scan = () => {
      document.querySelectorAll<HTMLElement>(REVEAL).forEach(el => {
        if (observed.has(el)) return;
        observed.add(el);
        el.classList.add('rv');
        if (el.classList.contains('sec-label') && el.parentElement) { proxied.set(el.parentElement, el); io.observe(el.parentElement); }
        else io.observe(el);
      });
    };
    scan();
    const mo = new MutationObserver(() => scan());
    mo.observe(document.body, { childList: true, subtree: true });

    /* 2–5 ── pointer-driven effects (rAF-throttled) ───────────── */
    let raf = 0;
    let px = 0, py = 0;
    let tilted: HTMLElement | null = null;
    let magnet: HTMLElement | null = null;
    const hero = document.getElementById('hero');

    const frame = () => {
      raf = 0;
      const target = document.elementFromPoint(px, py) as HTMLElement | null;

      // tilt
      const card = target?.closest<HTMLElement>(TILT) ?? null;
      if (tilted && tilted !== card) { tilted.style.removeProperty('--rx'); tilted.style.removeProperty('--ry'); tilted.classList.remove('is-tilt'); }
      if (card) {
        const r = card.getBoundingClientRect();
        const nx = (px - r.left) / r.width - 0.5, ny = (py - r.top) / r.height - 0.5;
        card.style.setProperty('--rx', `${(-ny * 8).toFixed(2)}deg`);   // max ±4°
        card.style.setProperty('--ry', `${(nx * 8).toFixed(2)}deg`);
        card.style.setProperty('--lx', `${((nx + 0.5) * 100).toFixed(1)}%`);
        card.style.setProperty('--ly', `${((ny + 0.5) * 100).toFixed(1)}%`);
        card.classList.add('is-tilt');
      }
      tilted = card;

      // magnetic primary buttons
      const btn = target?.closest<HTMLElement>(MAGNET) ?? null;
      if (magnet && magnet !== btn) magnet.style.removeProperty('translate');
      if (btn) {
        const r = btn.getBoundingClientRect();
        const dx = ((px - (r.left + r.width / 2)) / (r.width / 2)) * 4;
        const dy = ((py - (r.top + r.height / 2)) / (r.height / 2)) * 3;
        btn.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
      }
      magnet = btn;

      // hero glow
      if (hero) {
        const r = hero.getBoundingClientRect();
        if (py >= r.top && py <= r.bottom) {
          hero.style.setProperty('--hx', `${px - r.left}px`);
          hero.style.setProperty('--hy', `${py - r.top}px`);
        }
      }

      // diorama parallax (±8px)
      const stage = document.querySelector<HTMLElement>('.diorama-canvas');
      if (stage) {
        const r = stage.getBoundingClientRect();
        if (py >= r.top - 200 && py <= r.bottom + 200) {
          const nx = (px - (r.left + r.width / 2)) / (r.width / 2);
          const ny = (py - (r.top + r.height / 2)) / (r.height / 2);
          stage.style.setProperty('--px', `${(nx * 8).toFixed(1)}px`);
          stage.style.setProperty('--py', `${(ny * 6).toFixed(1)}px`);
        }
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      px = e.clientX; py = e.clientY;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
      root.classList.remove('motion-ok');
    };
  }, []);
  return null;
}
