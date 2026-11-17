'use client';

import { useEffect, useState } from 'react';

/* Intro curtain: "Hi!" → "¡Hola!" → the orange curtain lifts.
   The whole sequence is pure CSS (see "PRELOADER" in globals.css), so it starts
   on first paint instead of waiting for React to hydrate the 3D page — that wait
   used to leave the curtain empty for ~2s on phones.
   Plays once per tab session: an inline <head> script (layout.tsx) adds
   html.pl-skip on repeat visits before the first paint, so no orange flash.
   React only removes the node from the DOM once the CSS animation is over. */
const TOTAL_MS = 3300; // ≥ curtain lift end (2.35s delay + 0.85s)

export default function Preloader() {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (document.documentElement.classList.contains('pl-skip')) { setMounted(false); return; }
    // the animation clock started at first paint, not at hydration
    const left = Math.max(0, TOTAL_MS - performance.now());
    const t = setTimeout(() => setMounted(false), left);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;
  return (
    <div data-preloader aria-hidden className="preloader">
      <div className="pl-stage">
        <span className="pl-word pl-hi">Hi!</span>
        <span className="pl-word pl-hola">¡Hola!</span>
      </div>
    </div>
  );
}
