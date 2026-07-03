'use client';

import { useLang } from './LanguageProvider';
import type { Lang } from '@/lib/i18n';

const LANGS: { code: Lang; label: string }[] = [
  { code: 'de', label: 'DE' },
  { code: 'en', label: 'EN' },
];

export default function LanguageToggle() {
  const { lang, setLang } = useLang();

  return (
    <div
      role="group"
      aria-label="Sprache / Language"
      style={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 500,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 2,
        padding: 3,
        borderRadius: 999,
        background: 'rgba(255,255,255,0.82)',
        backdropFilter: 'blur(16px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(16px) saturate(1.4)',
        border: '1px solid rgba(131,202,226,0.35)',
        boxShadow: '0 4px 16px rgba(15,41,64,0.10), inset 0 1px 0 rgba(255,255,255,0.9)',
      }}
    >
      {LANGS.map((l) => {
        const active = lang === l.code;
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            aria-pressed={active}
            style={{
              border: 'none',
              cursor: 'pointer',
              outline: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.06em',
              padding: '6px 13px',
              borderRadius: 999,
              color: active ? '#fff' : 'rgba(15,41,64,0.70)',
              background: active ? 'linear-gradient(180deg, #fd7c7a 0%, #fe8684 100%)' : 'transparent',
              boxShadow: active ? '0 4px 12px -3px rgba(254,134,132,0.55)' : 'none',
              transition: 'all 0.18s ease',
            }}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
