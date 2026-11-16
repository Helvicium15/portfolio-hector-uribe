'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLang } from './LanguageProvider';
import type { Lang } from '@/lib/i18n';

const LANGS: { code: Lang; label: string }[] = [
  { code: 'de', label: 'DE' },
  { code: 'en', label: 'EN' },
];

/* Glass-bubble toggle: a sunken pill with a liquid-glass capsule that is ~20%
   taller than the pill. On change the capsule slides to the other side
   (550ms, elastic), stretches mid-way (scaleX 1.15 / scaleY .92) and bounces
   on arrival. Each option is a real <button aria-pressed>. */
export default function LanguageToggle() {
  const { lang, setLang } = useLang();
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const prev = useRef<Lang>(lang);
  const index = LANGS.findIndex(l => l.code === lang);

  // place the bubble without animation on first paint
  useLayoutEffect(() => {
    bubbleRef.current?.style.setProperty('--bx', `${index * 100}%`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = bubbleRef.current;
    if (!el || prev.current === lang) return;
    const from = LANGS.findIndex(l => l.code === prev.current) * 100;
    const to = index * 100;
    prev.current = lang;
    el.style.setProperty('--bx', `${to}%`);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !el.animate) return;
    const mid = (from + to) / 2;
    el.animate(
      [
        { transform: `translateX(${from}%) scale(1, 1)` },
        { transform: `translateX(${mid}%) scale(1.15, .92)`, offset: 0.45 },
        { transform: `translateX(${to + (to > from ? 6 : -6)}%) scale(.96, 1.04)`, offset: 0.78 },
        { transform: `translateX(${to}%) scale(1, 1)` },
      ],
      { duration: 550, easing: 'cubic-bezier(.34,1.56,.64,1)' },
    );
  }, [lang, index]);

  return (
    <div role="group" aria-label="Sprache / Language" className="lang-toggle bubble-toggle">
      <span ref={bubbleRef} className="bubble is-on" aria-hidden />
      {LANGS.map((l) => {
        const active = lang === l.code;
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            aria-pressed={active}
            className="bubble-opt"
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
