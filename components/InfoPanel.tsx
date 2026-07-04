'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { skillGroups, experience, certifications, education, languages, hobbies, hobbiesEn, projects } from '@/lib/data';
import { SkillTile } from '@/lib/skillIcons';
import { useLang } from './LanguageProvider';

interface Props {
  sectionKey: string;
  onClose: () => void;
  origin?: { x: number; y: number } | null;
}

const LABELS: Record<string, { de: string; en: string }> = {
  info:    { de: 'Über mich',      en: 'About' },
  galerie: { de: 'Projekte',       en: 'Projects' },
  kontakt: { de: 'Arbeitsweise',   en: 'How I Work' },
  skills:  { de: 'Skills & Tools', en: 'Skills & Tools' },
  hobbys:  { de: 'Interessen',     en: 'Interests' },
};

const CARD_WIDTHS: Record<string, number> = {
  info:    640,
  galerie: 1040,
  kontakt: 580,
  skills:  650,
  hobbys:  480,
};

/* ── Dark glass card tokens ──────────────────────────────────────── */
const innerCard: React.CSSProperties = {
  background: 'rgba(255,255,255,0.80)',
  backdropFilter: 'blur(16px) saturate(140%)',
  WebkitBackdropFilter: 'blur(16px) saturate(140%)',
  border: '1px solid rgba(131,202,226,0.20)',
  borderRadius: 16,
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.90), 0 2px 10px rgba(15,41,64,0.07)',
};

/* ─────────────────────── PERSPECTIVE PROJECTS CAROUSEL ─────────── */

const CARD_W  = 230;
const CARD_H  = 320;
const XGAP    = [0, 225, 392];
const ROTY    = [0, 38, 58];
const SCALES  = [1, 0.81, 0.63];
const OPACS   = [1, 0.88, 0.66];

const navBtn: React.CSSProperties = {
  width: 36, height: 36, borderRadius: '50%',
  border: '1px solid rgba(131,202,226,0.18)',
  background: 'rgba(255,255,255,0.80)',
  backdropFilter: 'blur(12px)',
  color: 'rgba(15,41,64,0.72)',
  cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: 14,
  transition: 'background 0.18s ease, border-color 0.18s ease',
  flexShrink: 0,
};

const viewLinkBase: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 6,
  fontSize: 12, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
  color: 'rgba(15,41,64,0.72)',
  textDecoration: 'none',
  textTransform: 'uppercase',
  border: '1px solid rgba(131,202,226,0.20)',
  borderRadius: 999, padding: '7px 16px',
  background: 'rgba(255,255,255,0.80)',
  transition: 'background 0.2s ease, color 0.2s ease',
};

function PerspectiveProjectCarousel() {
  const [active, setActive] = useState(0);
  const router = useRouter();
  const { lang } = useLang();
  const en = lang === 'en';
  const n = projects.length;
  const stageRef = useRef<HTMLDivElement>(null);
  const wheelLock = useRef(false);

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % n), 4200);
    return () => clearInterval(t);
  }, [n]);

  // Mouse-wheel navigation over the perspective stage (one notch = one card).
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 12) return;
      e.preventDefault();
      if (wheelLock.current) return;
      wheelLock.current = true;
      setActive(a => (delta > 0 ? (a + 1) % n : (a - 1 + n) % n));
      // Lock ≈ card transition (0.55s) so one wheel notch settles one card.
      window.setTimeout(() => { wheelLock.current = false; }, 480);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [n]);

  const prev = () => setActive(a => (a - 1 + n) % n);
  const next = () => setActive(a => (a + 1) % n);
  const go   = (i: number) => setActive(i);

  function navigateToProject(p: typeof projects[0]) {
    if (p.url) {
      window.open(p.url, '_blank', 'noopener,noreferrer');
    } else if (p.slug) {
      router.push(`/projekte/${p.slug}`);
    }
  }

  const activePrj = projects[active];

  function relPos(i: number) {
    let rel = i - active;
    if (rel >  n / 2) rel -= n;
    if (rel < -n / 2) rel += n;
    return rel;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

      {/* ── Perspective stage ──────────────────────────────────── */}
      <div ref={stageRef} style={{
        position: 'relative',
        width: '100%',
        height: CARD_H + 56,
        perspective: '900px',
        perspectiveOrigin: '50% 52%',
        overflow: 'hidden',
      }}>
        {/* Side vignettes */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none',
          background: 'linear-gradient(to right, rgba(238,247,251,0.96) 0%, transparent 15%, transparent 85%, rgba(238,247,251,0.96) 100%)',
        }} />

        {/* Cards */}
        {projects.map((p, i) => {
          const rel = relPos(i);
          const abs = Math.abs(rel);
          if (abs > 2) return null;

          const sign = Math.sign(rel) || 1;
          const tx = sign * XGAP[abs];
          const ry = -sign * ROTY[abs];
          const sc = SCALES[abs];
          const op = OPACS[abs];
          const zi = 5 - abs;
          const isCenter = rel === 0;

          return (
            <div
              key={p.id}
              onClick={() => isCenter ? navigateToProject(p) : go(i)}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: CARD_W,
                height: CARD_H,
                marginLeft: -CARD_W / 2,
                marginTop: -CARD_H / 2 - 8,
                transform: `translateX(${tx}px) rotateY(${ry}deg) scale(${sc})`,
                transition: 'transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.45s ease',
                zIndex: zi,
                opacity: op,
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: '100%', height: '100%',
                borderRadius: 18, overflow: 'hidden', position: 'relative',
                boxShadow: isCenter
                  ? '0 32px 64px rgba(0,0,0,0.78), 0 10px 24px rgba(0,0,0,0.45)'
                  : '0 14px 40px rgba(0,0,0,0.55)',
              }}>
                {/* Image */}
                <img
                  src={p.img}
                  alt={p.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />

                {/* Dark gradient overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: isCenter
                    ? 'linear-gradient(to top, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.30) 50%, rgba(0,0,0,0.08) 100%)'
                    : 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.20) 60%, transparent 100%)',
                }} />

                {/* Accent glow on center card */}
                {isCenter && (
                  <div aria-hidden style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    background: `radial-gradient(60% 50% at 30% 8%, ${p.accent}22, transparent 70%)`,
                  }} />
                )}

                {/* Text overlay */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: isCenter ? '18px 18px' : '11px 12px',
                }}>
                  {isCenter && (
                    <div style={{
                      fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: '#fff',
                      textShadow: '0 1px 6px rgba(0,0,0,0.65)',
                      marginBottom: 6,
                    }}>
                      {en && p.catEn ? p.catEn : p.cat}
                    </div>
                  )}
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: isCenter ? 17 : 11,
                    fontWeight: 700,
                    color: isCenter ? '#fff' : 'rgba(255,255,255,0.66)',
                    lineHeight: 1.22,
                    textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                  }}>
                    {p.name}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Controls row ───────────────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '4px 0 10px',
      }}>
        <button onClick={prev} style={navBtn} aria-label={en ? 'Previous project' : 'Vorheriges Projekt'}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M19 12H5M11 6l-6 6 6 6"/>
          </svg>
        </button>

        {/* Link to active project */}
        {activePrj.url ? (
          <a
            href={activePrj.url}
            target="_blank"
            rel="noopener noreferrer"
            style={viewLinkBase}
          >
            {en ? 'View project' : 'Projekt ansehen'}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M7 17L17 7M7 7h10v10"/>
            </svg>
          </a>
        ) : (
          <Link href={`/projekte/${activePrj.slug}`} style={viewLinkBase}>
            {en ? 'View project' : 'Projekt ansehen'}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </Link>
        )}

        <button onClick={next} style={navBtn} aria-label={en ? 'Next project' : 'Nächstes Projekt'}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M5 12h14M13 6l6 6-6 6"/>
          </svg>
        </button>
      </div>

      {/* ── Dot indicators ─────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 5, paddingBottom: 4 }}>
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Projekt ${i + 1}`}
            style={{
              width: i === active ? 20 : 6,
              height: 6,
              borderRadius: 999,
              background: i === active ? '#fe8684' : 'rgba(131,202,226,0.30)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all 0.30s cubic-bezier(0.22,1,0.36,1)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────── ABOUT ─────────────────────────────── */
function AboutContent() {
  const { lang } = useLang();
  const en = lang === 'en';
  const t = (de: string, e: string) => (en ? e : de);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Professional portrait */}
      <div style={{ borderRadius: 20, overflow: 'hidden', position: 'relative' }}>
        <img
          src="/img/hector-portrait-pro.jpg"
          alt="Hector Uribe Chacón"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
        {/* Name overlay */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, padding: '60px 24px 22px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.50) 50%, transparent 100%)',
        }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            Hector Uribe Chacón
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'rgba(15,41,64,0.82)', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 6 }}>
            {t('Mediengestalter · UX/UI Designer', 'Media Designer · UX/UI Designer')}
          </div>
        </div>
      </div>

      {/* Bio */}
      <p style={{ fontSize: 15, lineHeight: 1.82, color: 'rgba(15,41,64,0.72)', margin: 0, padding: '0 2px' }}>
        {t(
          'CPUX-F zertifizierter Designer mit 4+ Jahren Berufserfahrung in UX/UI-Design, Produktfotografie und KI-gestützten Workflows. Nationalität: Mexikanisch / Deutsch. Mein Fokus — nutzerzentrierte Produkte, die ästhetisch und funktional überzeugen.',
          'CPUX-F certified designer with 4+ years of professional experience in UX/UI design, product photography and AI-assisted workflows. Nationality: Mexican / German. My focus — user-centered products that convince both aesthetically and functionally.'
        )}
      </p>

      {/* Languages */}
      <div style={{ ...innerCard, padding: '14px 18px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'rgba(15,41,64,0.72)', marginBottom: 12 }}>{t('Sprachen', 'Languages')}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 12px' }}>
          {languages.map(l => (
            <div key={l.lang} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 17, lineHeight: 1 }}>{l.flag}</span>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13.5, color: 'rgba(15,41,64,0.88)' }}>{en ? l.langEn : l.lang}</div>
                <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'rgba(15,41,64,0.72)', marginTop: 1 }}>{en ? l.levelEn : l.level}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience — both entries */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'rgba(15,41,64,0.72)', paddingLeft: 2 }}>{t('Berufserfahrung', 'Experience')}</div>
      {experience.map((exp) => (
        <div key={exp.company} style={{ ...innerCard, padding: '16px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                  background: (exp as { accent?: string }).accent ?? '#fe8684',
                  boxShadow: `0 0 8px ${(exp as { accent?: string }).accent ?? '#fe8684'}88`,
                }} />
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: '#0F2940' }}>
                  {en ? ((exp as { roleEn?: string }).roleEn ?? exp.role) : exp.role}
                </div>
              </div>
              <div style={{ fontSize: 13, color: 'rgba(15,41,64,0.72)', paddingLeft: 16 }}>
                {exp.company} · {exp.location}
              </div>
            </div>
            <span style={{
              fontSize: 10.5, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em',
              color: 'rgba(15,41,64,0.72)',
              background: 'rgba(131,202,226,0.08)',
              border: '1px solid rgba(131,202,226,0.20)',
              borderRadius: 999, padding: '4px 10px',
              whiteSpace: 'nowrap', flexShrink: 0,
            }}>
              {exp.period}
            </span>
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5, paddingLeft: 16 }}>
            {(en ? ((exp as { bulletsEn?: string[] }).bulletsEn ?? exp.bullets) : exp.bullets).slice(0, 3).map(b => (
              <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, lineHeight: 1.64, color: 'rgba(15,41,64,0.72)' }}>
                <span style={{ color: 'rgba(15,41,64,0.72)', flexShrink: 0, marginTop: 4, fontSize: 9 }}>▸</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      ))}
      </div>

      {/* Education */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'rgba(15,41,64,0.72)', paddingLeft: 2 }}>{t('Bildung', 'Education')}</div>
        {education.map(e => (
          <div key={e.institution} style={{ ...innerCard, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, color: 'rgba(15,41,64,0.88)' }}>{en ? ((e as { degreeEn?: string }).degreeEn ?? e.degree) : e.degree}</div>
              <div style={{ fontSize: 12, color: 'rgba(15,41,64,0.72)', marginTop: 2 }}>{e.institution}</div>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'rgba(15,41,64,0.72)', whiteSpace: 'nowrap', flexShrink: 0 }}>{e.period}</span>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div style={{ display: 'flex', gap: 8 }}>
        {certifications.map(c => (
          <div key={c.name} style={{ ...innerCard, padding: '12px 16px', flex: 1, textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, color: '#0F2940' }}>{c.name}</div>
            <div style={{ fontSize: 11.5, color: 'rgba(15,41,64,0.72)', marginTop: 3 }}>{en ? ((c as { issuerEn?: string }).issuerEn ?? c.issuer) : c.issuer}</div>
            <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'rgba(15,41,64,0.72)', marginTop: 1 }}>{c.year}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────── ARBEITSWEISE ───────────────────────── */
const PROCESS_STEPS = [
  {
    num: '01', title: 'Verstehen', titleEn: 'Understand', accent: '#83cae2',
    desc: 'Nutzerforschung, Interviews und Anforderungsanalyse — verstehen, wer das Produkt nutzt und warum.',
    descEn: 'User research, interviews and requirements analysis — understanding who uses the product and why.',
    tags: ['User Research', 'Interviews', 'Personas'],
    tagsEn: ['User Research', 'Interviews', 'Personas'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7"/>
        <path d="M21 21l-4.35-4.35"/>
        <path d="M11 8v3M9.5 9.5l1.5 1.5 1.5-1.5"/>
      </svg>
    ),
  },
  {
    num: '02', title: 'Konzipieren', titleEn: 'Conceptualize', accent: '#fe8684',
    desc: 'Ideation, User Flows und Low-Fidelity Wireframes — die Struktur vor dem Design.',
    descEn: 'Ideation, user flows and low-fidelity wireframes — structure before design.',
    tags: ['User Flows', 'Wireframes', 'FigJam'],
    tagsEn: ['User Flows', 'Wireframes', 'FigJam'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2.5"/>
        <path d="M3 9h18M9 21V9"/>
      </svg>
    ),
  },
  {
    num: '03', title: 'Gestalten', titleEn: 'Design', accent: '#83cae2',
    desc: 'High-Fidelity Design, Prototyping und Micro-Animationen in Figma.',
    descEn: 'High-fidelity design, prototyping and micro-animations in Figma.',
    tags: ['Figma', 'Prototyping', 'Motion'],
    tagsEn: ['Figma', 'Prototyping', 'Motion'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z"/>
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    ),
  },
  {
    num: '04', title: 'Testen & Iterieren', titleEn: 'Test & Iterate', accent: '#fe8684',
    desc: 'Usability-Tests, Feedback-Schleifen und kontinuierliche Verbesserung.',
    descEn: 'Usability testing, feedback loops and continuous improvement.',
    tags: ['Usability-Tests', 'Maze', 'Iteration'],
    tagsEn: ['Usability Testing', 'Maze', 'Iteration'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
];

function ArbeitsweiseContent() {
  const { lang } = useLang();
  const en = lang === 'en';
  const t = (de: string, e: string) => (en ? e : de);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <p style={{ fontSize: 15, lineHeight: 1.76, color: 'rgba(15,41,64,0.72)', margin: '0 0 2px' }}>
        {t('Nutzerzentriert und iterativ — von der ersten Idee bis zum finalen Produkt.', 'User-centered and iterative — from the first idea to the final product.')}
      </p>

      {PROCESS_STEPS.map((s, i) => (
        <div key={s.num} style={{
          ...innerCard,
          padding: '16px 18px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Subtle accent glow */}
          <div aria-hidden style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: 120,
            background: `linear-gradient(90deg, ${s.accent}0a 0%, transparent 100%)`,
            pointerEvents: 'none',
          }} />

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, position: 'relative' }}>
            {/* Icon circle */}
            <div style={{
              width: 42, height: 42, borderRadius: 12, flexShrink: 0,
              background: `${s.accent}18`,
              border: `1px solid ${s.accent}38`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: s.accent,
              boxShadow: `0 0 16px ${s.accent}22`,
            }}>
              {s.icon}
            </div>

            <div style={{ flex: 1 }}>
              {/* Header row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
                  color: 'rgba(15,41,64,0.72)', letterSpacing: '0.14em',
                }}>{s.num}</span>
                <span style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15.5,
                  color: '#0F2940',
                }}>{en ? s.titleEn : s.title}</span>
              </div>

              {/* Description */}
              <div style={{ fontSize: 13.5, lineHeight: 1.68, color: 'rgba(15,41,64,0.72)', marginBottom: 10 }}>
                {en ? s.descEn : s.desc}
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {(en ? s.tagsEn : s.tags).map(t => (
                  <span key={t} style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10.5,
                    background: `${s.accent}14`,
                    border: `1px solid ${s.accent}28`,
                    borderRadius: 999, padding: '3px 9px',
                    color: 'rgba(15,41,64,0.72)',
                    letterSpacing: '0.04em',
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Step connector line (not on last item) */}
          {i < PROCESS_STEPS.length - 1 && (
            <div aria-hidden style={{
              position: 'absolute', bottom: -10, left: 29,
              width: 2, height: 10,
              background: `linear-gradient(180deg, ${s.accent}44, transparent)`,
            }} />
          )}
        </div>
      ))}

      {/* Reference quote — Vicampo Arbeitszeugnis */}
      <div style={{ ...innerCard, padding: '18px 20px', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(254,134,132,0.35)' }}>
        <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 130, background: 'linear-gradient(90deg, rgba(254,134,132,0.09) 0%, transparent 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(15,41,64,0.60)', marginBottom: 12 }}>
            {t('Aus dem Arbeitszeugnis · Vicampo.de GmbH', 'From the reference letter · Vicampo.de GmbH')}
          </div>
          <blockquote style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.58, fontStyle: 'italic', fontWeight: 600, color: '#0F2940' }}>
              {t('„Sein Aufgabengebiet beherrschte er in jeder Hinsicht perfekt.“', '“He mastered his area of responsibility perfectly in every respect.”')}
            </p>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.66, color: 'rgba(15,41,64,0.74)' }}>
              {t('„Herr Uribe zeigte stets höchste Eigenmotivation, beachtliches Engagement und ein ausgeprägtes Pflichtbewusstsein … ein hohes Maß an Selbstständigkeit, Zuverlässigkeit sowie intensiven Arbeitseinsatz, wodurch seine Arbeitsergebnisse jederzeit von sehr guter Qualität waren.“', '“Mr. Uribe consistently showed the highest self-motivation, remarkable commitment and a strong sense of duty … a high degree of independence, reliability and intensive dedication, so that his work results were always of very good quality.”')}
            </p>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.66, color: 'rgba(15,41,64,0.74)' }}>
              {t('„Mit Herrn Uribe verlieren wir einen wertvollen Mitarbeiter.“', '“With Mr. Uribe we are losing a valuable employee.”')}
            </p>
          </blockquote>
          <div style={{ marginTop: 14, display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {(en ? ['Overall grade: very good', '07/2023 – 09/2025', 'Graphics · UX · Print Marketing'] : ['Gesamtnote: sehr gut', '07/2023 – 09/2025', 'Grafik · UX · Print-Marketing']).map((t) => (
              <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, background: 'rgba(254,134,132,0.12)', border: '1px solid rgba(254,134,132,0.30)', borderRadius: 999, padding: '3px 10px', color: 'rgba(15,41,64,0.74)', letterSpacing: '0.04em' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── SKILLS ────────────────────────────── */
function SkillsContent() {
  const { lang } = useLang();
  const en = lang === 'en';
  let globalIdx = 0;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {skillGroups.map(group => (
        <div key={group.title}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'rgba(15,41,64,0.72)', marginBottom: 12,
          }}>{en ? group.titleEn : group.title}</div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))',
            gap: '14px 10px',
          }}>
            {group.skills.map(s => {
              const idx = globalIdx++;
              return (
                <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
                  <SkillTile name={s} index={idx} size={56} />
                  <span style={{
                    fontSize: 11.5, fontFamily: 'var(--font-mono)',
                    color: 'rgba(15,41,64,0.72)',
                    textAlign: 'center', lineHeight: 1.4,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                    overflow: 'hidden', maxWidth: 72,
                  }}>{s}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────── HOBBIES ───────────────────────────── */
const HOBBY_ICONS: Record<string, string> = {
  'Krafttraining': '🏋️',
  'Malen':         '🎨',
  'Videospiele':   '🎮',
  'Laufen':        '🏃',
  'Kochen':        '🍳',
};

function HobbiesContent() {
  const { lang } = useLang();
  const en = lang === 'en';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      {/* Gym hero photo */}
      <div style={{ borderRadius: 18, overflow: 'hidden', marginBottom: 6, background: '#0F2940' }}>
        <img
          src="/img/hector-gym.jpg"
          alt={en ? 'Strength Training' : 'Krafttraining'}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>
      <p style={{ fontSize: 15, lineHeight: 1.80, color: 'rgba(15,41,64,0.72)', margin: '0 0 2px' }}>
        {en ? 'Away from the screen, these passions keep me going:' : 'Abseits vom Bildschirm treiben mich diese Leidenschaften an:'}
      </p>
      {hobbies.map((h, i) => (
        <div key={h} style={{ ...innerCard, display: 'flex', alignItems: 'center', gap: 16, padding: '13px 18px' }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 11.5, fontWeight: 700,
            color: 'rgba(15,41,64,0.72)', letterSpacing: '0.10em', flexShrink: 0,
          }}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <span style={{ fontSize: 18, flexShrink: 0 }} aria-hidden>{HOBBY_ICONS[h] ?? '★'}</span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15.5, color: 'rgba(15,41,64,0.88)' }}>{en ? (hobbiesEn[h] ?? h) : h}</span>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────── ROUTER ────────────────────────────── */
function PanelBody({ sectionKey }: { sectionKey: string }) {
  switch (sectionKey) {
    case 'info':    return <AboutContent />;
    case 'galerie': return <PerspectiveProjectCarousel />;
    case 'kontakt': return <ArbeitsweiseContent />;
    case 'skills':  return <SkillsContent />;
    case 'hobbys':  return <HobbiesContent />;
    default:        return null;
  }
}

/* ══════════════════════════════════════════════════════════════════
   INFOPANEL
   ══════════════════════════════════════════════════════════════════ */
export default function InfoPanel({ sectionKey, onClose, origin }: Props) {
  const { lang } = useLang();
  const en = lang === 'en';
  const label = LABELS[sectionKey]?.[en ? 'en' : 'de'] ?? sectionKey;
  const width = CARD_WIDTHS[sectionKey] ?? 520;
  const isGalerie = sectionKey === 'galerie';

  // When opened from a diorama spot, the card emerges from that point and
  // grows to center (and retracts back to it on close).
  const emerge = origin && typeof window !== 'undefined'
    ? { x: origin.x - window.innerWidth / 2, y: origin.y - window.innerHeight / 2 }
    : null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <>
      {/* ── Backdrop ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={emerge ? { duration: 0.44, delay: 0.14 } : { duration: 0.20 }}
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(15,41,64,0.25)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          zIndex: 300,
        }}
      />

      {/* ── Centering shell ──────────────────────────────────────── */}
      <div style={{
        position: 'fixed', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 301, padding: '20px 16px',
        pointerEvents: 'none',
      }}>
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={label}
          initial={emerge ? { opacity: 0, scale: 0.12, x: emerge.x, y: emerge.y } : { opacity: 0, scale: 0.90, y: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          exit={emerge ? { opacity: 0, scale: 0.12, x: emerge.x, y: emerge.y } : { opacity: 0, scale: 0.94, y: 10 }}
          transition={emerge
            ? { type: 'spring', stiffness: 130, damping: 18, delay: 0.14, opacity: { duration: 0.3, delay: 0.14 } }
            : { type: 'spring', stiffness: 420, damping: 34 }}
          style={{
            position: 'relative',
            width,
            maxWidth: '96vw',
            maxHeight: '92vh',
            overflowY: isGalerie ? 'hidden' : 'auto',
            overflowX: 'hidden',
            pointerEvents: 'auto',
            background: 'rgba(252,253,253,0.92)',
            backdropFilter: 'blur(40px) saturate(160%)',
            WebkitBackdropFilter: 'blur(40px) saturate(160%)',
            borderRadius: 28,
            border: '1px solid rgba(131,202,226,0.16)',
            boxShadow: '0 24px 80px rgba(15,41,64,0.16), 0 4px 16px rgba(15,41,64,0.08), inset 0 1px 0 rgba(255,255,255,0.95)',
          }}
        >
          {/* Iridescent corner glow */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 'inherit',
            background: 'radial-gradient(45% 40% at 20% 5%, rgba(254,134,132,0.08), transparent 60%), radial-gradient(60% 55% at 35% 3%, rgba(131,202,226,0.06), transparent 70%)',
            filter: 'blur(8px)',
          }} />

          {/* ── X Close ──────────────────────────────────────────── */}
          <button
            onClick={onClose}
            aria-label={en ? 'Close' : 'Schließen'}
            style={{
              position: 'absolute', top: 16, right: 16,
              width: 32, height: 32, borderRadius: '50%',
              border: '1px solid rgba(131,202,226,0.22)',
              borderTopColor: 'rgba(131,202,226,0.38)',
              background: 'rgba(255,255,255,0.80)',
              backdropFilter: 'blur(12px)',
              color: 'rgba(15,41,64,0.72)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 10,
              boxShadow: [
                'inset 0 1px 0 rgba(255,255,255,0.90)',
                '0 2px 8px rgba(15,41,64,0.08)',
              ].join(', '),
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          {/* ── Header ───────────────────────────────────────────── */}
          <div style={{
            padding: '30px 34px 20px',
            borderBottom: '1px solid rgba(131,202,226,0.16)',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(20px, 2.4vw, 26px)',
              letterSpacing: '-0.03em',
              color: '#0F2940',
              margin: 0,
              paddingRight: 44,
            }}>
              {label}
            </h2>
          </div>

          {/* ── Body ─────────────────────────────────────────────── */}
          <div style={{ padding: isGalerie ? '18px 24px 26px' : '24px 32px 32px' }}>
            <PanelBody sectionKey={sectionKey} />
          </div>
        </motion.div>
      </div>
    </>
  );
}
