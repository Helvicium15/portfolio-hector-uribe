'use client';

import { useLang } from './LanguageProvider';
import { PROCESS_STEPS } from '@/lib/process';

/* Four process steps in a row on the home page (2×2 on tablet, stacked on
   phones). Sits in a matte-black band, so orange may be used for numbers. */
export default function ProcessSteps() {
  const { lang } = useLang();
  const en = lang === 'en';

  return (
    <ol className="process-steps">
      {PROCESS_STEPS.map((s) => (
        <li key={s.num} className="process-step">
          <div className="process-step-head">
            <span className="process-num">{s.num}</span>
            <span className="process-rule" aria-hidden />
            <span className="process-icon" aria-hidden>{s.icon}</span>
          </div>
          <h3 className="process-title">{en ? s.titleEn : s.title}</h3>
          <p className="process-desc">{en ? s.descEn : s.desc}</p>
          <ul className="process-tags" aria-label={en ? 'Methods & tools' : 'Methoden & Tools'}>
            {(en ? s.tagsEn : s.tags).map((t) => <li key={t}>{t}</li>)}
          </ul>
        </li>
      ))}
    </ol>
  );
}
