'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { Lang } from '@/lib/i18n';

interface LangCtxValue {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangCtxValue>({ lang: 'de', setLang: () => {} });

export const useLang = () => useContext(LangContext);

export function LanguageProvider({ initial, children }: { initial: Lang; children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initial);
  const router = useRouter();

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof document !== 'undefined') {
      document.cookie = `lang=${l}; path=/; max-age=31536000; samesite=lax`;
      document.documentElement.setAttribute('lang', l);
    }
    router.refresh(); // re-render server components (project subpages) in the new language
  }, [router]);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}
