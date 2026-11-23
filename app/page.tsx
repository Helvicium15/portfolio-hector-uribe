'use client';

import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import Dock from '@/components/Dock';
import InfoPanel from '@/components/InfoPanel';
import ProjectsCarousel from '@/components/ProjectsCarousel';
import LiveProjects from '@/components/LiveProjects';
import ProfileStrip from '@/components/ProfileStrip';
import Preloader from '@/components/Preloader';
import ProcessSteps from '@/components/ProcessSteps';
import { useLang } from '@/components/LanguageProvider';

const DioramaScene = dynamic(() => import('@/components/DioramaScene'), { ssr: false });

/* ── Fade-up animation variant ─────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.56, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 },
  }),
};

/* ── Section wrapper ────────────────────────────────────────────── */
function Section({ id, children, style }: { id: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <section
      id={id}
      style={{
        padding: '100px 28px',
        maxWidth: 1140,
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
        ...style,
      }}
    >
      {children}
    </section>
  );
}

/* ── Copy e-mail — confirms in place and to screen readers ───────── */
function CopyEmail({ label, done }: { label: string; done: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText('hectoruch18@gmail.com'); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard blocked */ }
  };
  return (
    <button type="button" className="btn btn-secondary lq btn-sm" onClick={copy}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {copied ? <path d="M5 12l5 5L20 7" /> : <><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></>}
      </svg>
      <span aria-live="polite">{copied ? done : label}</span>
    </button>
  );
}

/* ── Section heading ────────────────────────────────────────────── */
function SectionHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
      className="section-head"
      style={{ marginBottom: 64, textAlign: 'center' }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          margin: 0,
          fontSize: 'clamp(40px, 5.5vw, 72px)',
          lineHeight: 1.04,
          letterSpacing: '-0.04em',
          color: 'var(--text)',
          textWrap: 'balance',
        }}
      >
        {title}
      </h2>
      {sub && (
        <p
          style={{
            fontSize: 'clamp(16px, 1.4vw, 18px)',
            lineHeight: 1.72,
            color: 'var(--text-2)',
            maxWidth: 540,
            margin: '18px auto 0',
            letterSpacing: '-0.01em',
          }}
        >
          {sub}
        </p>
      )}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════════ */
export default function Home() {
  const { lang } = useLang();
  const tr = (de: string, en: string) => (lang === 'en' ? en : de);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [panelOrigin, setPanelOrigin] = useState<{ x: number; y: number } | null>(null);
  const handleDioramaOpen = useCallback((key: string, origin?: { x: number; y: number }) => {
    setPanelOrigin(origin ?? null);
    setActivePanel(key);
  }, []);


  return (
    <>
      <Preloader />
      {/* ── Fixed background video: orange honey poured between foam pads ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <source src="/video/background-orange.mp4" type="video/mp4" />
      </video>
      {/* ── Matte-black veil: keeps the background subtle under the content ── */}
      <div aria-hidden style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(30,31,34,0.72)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        id="hero"
        style={{
          position: 'relative',
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          overflow: 'hidden',
          zIndex: 1,
          padding: '76px 0 120px', /* top: language toggle · bottom: room for the fixed dock */
        }}
      >

        {/* Bio heading + CTAs */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0 28px',
            width: '100%',
          }}
        >
          {/* 4-line heading */}
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.80, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{ maxWidth: 1200, width: '100%', textAlign: 'center' }}
          >
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(46px, min(7.5vw, 10vh), 96px)',
              lineHeight: 1.08,
              letterSpacing: '-0.04em',
              color: 'var(--text)',
              margin: 0,
            }}>
              {/* ── Line 1: Ich bin Hector [portrait] ── */}
              <span className="bio-line">
                {tr('Ich bin ', "I'm ")}
                <em style={{ fontStyle: 'italic', color: 'var(--text-2)' }}>Hector</em>
                <motion.span
                  aria-hidden
                  className="hero-pill"
                  whileHover={{ scale: 1.28, zIndex: 10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    width: '1.90em', height: '0.74em',
                    borderRadius: 999,
                    overflow: 'hidden',
                    margin: '0 0.10em 0.06em 0.32em',
                    border: '1px solid var(--line-strong)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.36), inset 0 1px 0 rgba(255,255,255,0.1)',
                    position: 'relative', top: '-0.03em',
                    cursor: 'zoom-in',
                  }}
                >
                  <img
                    src="/img/hero-pill-hector.webp"
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', objectPosition: '50% 12%' }}
                  />
                </motion.span>
              </span>

              {/* ── Line 2: ein UX/UI [project] Designer ── */}
              <span className="bio-line">
                {tr('ein UX/UI ', 'a UX/UI ')}
                <motion.span
                  aria-hidden
                  className="hero-pill"
                  whileHover={{ scale: 1.28, zIndex: 10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    width: '1.90em', height: '0.74em',
                    borderRadius: 999,
                    overflow: 'hidden',
                    margin: '0 0.10em 0.06em',
                    border: '1px solid var(--line-strong)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.36), inset 0 1px 0 rgba(255,255,255,0.1)',
                    position: 'relative', top: '-0.03em',
                    cursor: 'zoom-in',
                  }}
                >
                  <img
                    src="/img/hero-pill-sentinel.webp"
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', objectPosition: '66% 45%' }}
                  />
                </motion.span>
                <em style={{ fontStyle: 'italic', color: 'var(--text-2)' }}>{' Designer'}</em>
              </span>

              {/* ── Line 3: und Grafikdesigner ── */}
              <span className="bio-line">
                <em style={{ fontStyle: 'italic', color: 'var(--text-2)' }}>{tr('und Grafikdesigner', 'and Graphic Designer')}</em>
              </span>

              {/* ── Line 4: aus Mainz [Mainz pill] ── */}
              <span className="bio-line">
                {tr('aus ', 'from ')}<span className="grad-text">Mainz</span>{' '}
                <motion.span
                  aria-hidden
                  className="hero-pill"
                  whileHover={{ scale: 1.28, zIndex: 10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    width: '1.90em', height: '0.74em',
                    borderRadius: 999,
                    overflow: 'hidden',
                    margin: '0 0.04em 0.06em',
                    border: '1px solid var(--line-strong)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.36), inset 0 1px 0 rgba(255,255,255,0.1)',
                    position: 'relative', top: '-0.03em',
                    cursor: 'zoom-in',
                  }}
                >
                  <img
                    src="/img/hero-pill-mainz.webp"
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', objectPosition: '50% 30%' }}
                  />
                </motion.span>
              </span>
            </h1>
          </motion.div>

          {/* Bio paragraph */}
          <motion.p
            className="hero-bio"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.42 }}
            style={{
              fontSize: 'clamp(17px, 1.5vw, 20px)',
              lineHeight: 1.72,
              color: 'var(--text-2)',
              maxWidth: 500,
              margin: '28px auto 0',
              textAlign: 'center',
              letterSpacing: '-0.01em',
            }}
          >
            {tr(
              '4+ Jahre Erfahrung in UI/UX-Design, Produktfotografie und KI-gestützten Workflows — nutzerzentrierte Produkte, die ästhetisch und funktional überzeugen.',
              '4+ years of experience in UI/UX design, product photography and AI-assisted workflows — user-centered products that are both aesthetic and functional.',
            )}
          </motion.p>

          {/* CTAs — primary (navy glass) + secondary (white glass), 56px · radius 14 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.60 }}
            className="hero-ctas"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginTop: 36,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <a href="#work" className="btn btn-primary" style={{ paddingRight: 14, paddingLeft: 26 }}>
              {tr('Projekte ansehen', 'View projects')}
              <span className="btn-orb" aria-hidden>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </span>
            </a>

            <a href={tr('/Lebenslauf_Hector_Uribe.pdf', '/CV_Hector_Uribe_EN.pdf')} download className="btn btn-secondary lq">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
              </svg>
              {tr('Lebenslauf', 'Download CV')}
              <span className="btn-suffix">PDF</span>
            </a>
          </motion.div>
        </div>


        {/* Scroll cue */}
        <motion.a
          href="#work"
          aria-label="Nach unten scrollen"
          className="scroll-cue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            position: 'absolute',
            bottom: 18,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 7,
            color: 'var(--accent)',
            textDecoration: 'none',
            filter: 'drop-shadow(0 2px 8px rgba(255,95,0,0.45))',
          }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700,
            letterSpacing: '0.28em', textTransform: 'uppercase',
          }}>Scroll</span>
          <svg
            width="34" height="34" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
            style={{ animation: 'bob 2.4s ease-in-out infinite' }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.a>
      </section>

      {/* ── PROFILE AT A GLANCE (recruiter quick scan) ───────── */}
      <ProfileStrip />

      {/* ── SECTIONS BELOW HERO ──────────────────────────────── */}
      <div style={{ position: 'relative' }}>

      {/* ── DIORAMA ──────────────────────────────────────────── */}
      <div style={{ background: 'var(--bg)', borderTop: '1px solid var(--line)' }}>
      <section
        id="diorama"
        style={{ padding: '96px 0 48px', position: 'relative', zIndex: 1 }}
      >
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 28px' }}>
          <SectionHead
            title={tr('Das Studio', 'The Studio')}
            sub={tr('Klicke auf die Objekte — oder nutze den Dock unten.', 'Click the objects — or use the dock below.')}
          />
        </div>
        <DioramaScene onSectionOpen={handleDioramaOpen} isDark={false} lang={lang} activeKey={activePanel} />
      </section>
      </div>

      {/* ── PROJECTS ─────────────────────────────────────────── */}
      <div style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--line)' }}>
      <section id="work" style={{ padding: '96px 0', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 28px' }}>
          <SectionHead
            title={tr('Ausgewählte Projekte', 'Selected Projects')}
            sub={tr('UX/UI-Design, Branding und Produktfotografie aus 4+ Jahren Praxiserfahrung.', 'UX/UI design, branding and product photography from 4+ years of hands-on experience.')}
          />

          {/* Live / real-world projects — online & visible */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
            <span className="sec-label" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'var(--text)' }}>
              {tr('Live & in Produktion', 'Live & in production')}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-2)' }}>
              {tr('Berufliche Projekte, online sichtbar', 'Professional projects, visible online')}
            </span>
            <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
          </div>
          <LiveProjects />

          {/* Further work */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '48px 0 22px' }}>
            <span className="sec-label" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'var(--text)' }}>
              {tr('Weitere Projekte', 'More Projects')}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-2)' }}>
              {tr('Studien, Konzepte & eigene Arbeiten', 'Studies, concepts & personal work')}
            </span>
            <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
          </div>
          <ProjectsCarousel />
        </div>
      </section>
      </div>{/* end projects bg */}

      {/* ── PROCESS (matte-black band) ───────────────────────── */}
      <div className="theme-dark" style={{ background: 'var(--bg)', borderTop: '1px solid var(--line)' }}>
      <section id="process" style={{ padding: '96px 0', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 28px' }}>
          <SectionHead
            title={tr('So arbeite ich', 'How I work')}
            sub={tr('Nutzerzentriert und iterativ — von der ersten Idee bis zum finalen Produkt.', 'User-centered and iterative — from the first idea to the final product.')}
          />
          <ProcessSteps />
        </div>
      </section>
      </div>{/* end process bg */}

      {/* ── CONTACT ──────────────────────────────────────────── */}
      <div style={{ background: 'var(--bg)', borderTop: '1px solid var(--line)' }}>
      <Section id="contact" style={{ paddingBottom: 160 }}>
        <motion.div
          className="contact-panel lg"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          style={{
            position: 'relative',
            borderRadius: 30,
            padding: '42px 34px 36px',
            background: 'var(--grad-surface)',
            backdropFilter: 'blur(26px) saturate(185%) brightness(1.03)',
            WebkitBackdropFilter: 'blur(26px) saturate(185%) brightness(1.03)',
            border: '1px solid rgba(255,255,255,0.084)',
            boxShadow: '0 14px 46px rgba(0,0,0,0.36), 0 2px 8px rgba(0,0,0,0.18), inset 0 1.5px 0 rgba(255,255,255,0.129), inset 0 -1px 0 rgba(0,0,0,0.15)',
            overflow: 'hidden',
          }}
        >
          {/* Soft orange key light (orange on matte black only) */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: `radial-gradient(60% 50% at 30% 8%, rgba(255,95,0,0.10), transparent 70%)`,
            filter: 'blur(30px)',
            opacity: 0.6,
            zIndex: 0,
          }} />

          {/* Heading */}
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: 30 }}>
            <p className="availability">
              <span className="availability-dot" aria-hidden />
              <span>
                {tr('Offen für Freelance-Projekte', 'Open to freelance projects')}
                <span className="availability-loc">{tr(' · Mainz / Remote', ' · Mainz / remote')}</span>
              </span>
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 'clamp(36px, 4.6vw, 56px)', letterSpacing: '-0.04em', lineHeight: 1.04,
              margin: '0 0 12px', color: 'var(--text)',
            }}>
              {tr('Kontakt aufnehmen', 'Get in touch')}
            </h2>
            <p style={{ fontSize: 17, color: 'var(--text-2)', margin: 0, lineHeight: 1.6 }}>
              {tr('Offen für Projekte, Kooperationen und Herausforderungen.', 'Open to projects, collaborations and new challenges.')}
            </p>
          </div>

          {/* Email + links body (2 columns on desktop) */}
          <div className="contact-body">
          {/* Main column — e-mail is the primary (orange) action, then copy + CV */}
          <div className="contact-main" style={{ position: 'relative', zIndex: 1 }}>
            <a className="btn btn-primary btn-row contact-email" href="mailto:hectoruch18@gmail.com">
              <span className="btn-row-text">
                <span className="btn-eyebrow">E-Mail</span>
                <span className="btn-title">hectoruch18@gmail.com</span>
              </span>
              <span className="btn-orb" aria-hidden>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
              </span>
            </a>
            <div className="contact-actions">
              <CopyEmail label={tr('Adresse kopieren', 'Copy address')} done={tr('Kopiert', 'Copied')} />
              <a className="btn btn-secondary lq btn-sm" href={tr('/Lebenslauf_Hector_Uribe.pdf', '/CV_Hector_Uribe_EN.pdf')} download>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></svg>
                {tr('Lebenslauf', 'CV')} <span className="btn-suffix">PDF</span>
              </a>
            </div>
          </div>


          {/* Divider */}
          <div className="contact-or" style={{
            display: 'flex', alignItems: 'center', gap: 14,
            margin: '0 0 20px',
            position: 'relative', zIndex: 1,
            color: 'var(--text-2)', fontSize: 12,
            letterSpacing: '.12em', fontFamily: 'var(--font-mono)',
          }}>
            <span style={{ flex: 1, height: 1, background: 'var(--line-strong)' }} />
            {tr('ODER', 'OR')}
            <span style={{ flex: 1, height: 1, background: 'var(--line-strong)' }} />
          </div>

          {/* Social links — secondary glass rows, 60px · radius 14 */}
          <div className="contact-links" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { label: 'LinkedIn',  value: 'hectoruch18',       url: 'https://www.linkedin.com/in/hectoruch18/' },
            { label: 'Behance',   value: 'hectoruribe2',      url: 'https://www.behance.net/hectoruribe2' },
            { label: 'Instagram', value: '@hectoruribechacon', url: 'https://www.instagram.com/hectoruribechacon/' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary lq btn-row btn-row-sm"
              style={{ position: 'relative', zIndex: 1 }}
            >
              <span className="btn-row-text">
                <span>{link.label}</span>
                <span className="btn-sub">{link.value}</span>
              </span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </a>
          ))}

          </div>{/* contact-links */}
          </div>{/* contact-body */}
        </motion.div>
      </Section>
      </div>{/* end contact bg */}
      </div>{/* end sections wrapper */}

      <Dock />

      <AnimatePresence>
        {activePanel && (
          <InfoPanel
            key={activePanel}
            sectionKey={activePanel}
            origin={panelOrigin}
            onClose={() => setActivePanel(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
