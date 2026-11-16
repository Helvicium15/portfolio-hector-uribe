'use client';

import { useLang } from './LanguageProvider';
import { languages, certifications } from '@/lib/data';
import { SkillTile } from '@/lib/skillIcons';

/* Recruiter quick-scan strip, directly under the hero: the facts a recruiter
   looks for in the first 30 seconds, visible without opening the diorama.
   Every fact comes from the existing site data (experience, languages,
   certifications) — nothing new is claimed here. */
const TOOLS = ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'InDesign', 'Adobe After Effects', 'React'];

export default function ProfileStrip() {
  const { lang } = useLang();
  const en = lang === 'en';
  const t = (de: string, e: string) => (en ? e : de);
  const cert = certifications[0];

  const facts = [
    { k: t('Rolle', 'Role'), v: t('UX/UI- & Grafikdesigner', 'UX/UI & Graphic Designer') },
    { k: t('Erfahrung', 'Experience'), v: t('4+ Jahre', '4+ years') },
    { k: t('Aktuell', 'Currently'), v: t('Arvaloo GmbH · Teilzeit', 'Arvaloo GmbH · part-time') },
    { k: t('Standort', 'Location'), v: 'Mainz' },
    { k: t('Abschluss', 'Qualifications'), v: `${cert ? `${cert.name} (${cert.issuer})` : 'CPUX-F'} · ${t('Mediengestalter Digital & Print', 'Media Designer, Digital & Print')}` },
    { k: t('Sprachen', 'Languages'), v: languages.map(l => `${en ? l.langEn : l.lang} ${(en ? l.levelEn : l.level).replace(' · Fließend', '').replace(' · Fluent', '')}`).join(' · ') },
  ];

  return (
    <section className="profile-strip theme-dark" aria-label={t('Kurzprofil', 'Profile at a glance')}>
      <div className="profile-wrap">
        <dl className="profile-facts">
          {facts.map(f => (
            <div key={f.k} className="profile-fact">
              <dt>{f.k}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </dl>
        <div className="profile-tools">
          <span className="profile-tools-label">{t('Werkzeuge', 'Tools')}</span>
          <ul>
            {TOOLS.map((name, i) => (
              <li key={name} title={name}>
                <SkillTile name={name} index={i} size={40} />
                <span className="sr-only">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
