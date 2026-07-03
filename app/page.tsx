'use client';

import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import Dock from '@/components/Dock';
import InfoPanel from '@/components/InfoPanel';
import ProjectsCarousel from '@/components/ProjectsCarousel';
import LiveProjects from '@/components/LiveProjects';
import Preloader from '@/components/Preloader';
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

/* ── Section heading ────────────────────────────────────────────── */
function SectionHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
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
          color: '#0F2940',
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
            color: 'rgba(15,41,64,0.72)',
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
  const handleDioramaOpen = useCallback((key: string) => {
    setActivePanel(key);
  }, []);


  return (
    <>
      <Preloader />
      {/* ── Fixed parallax background video ─────────────────── */}
      <video
        autoPlay
        muted
        loop
        playsInline
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
        <source src="/bg_navy.mp4" type="video/mp4" />
      </video>
      {/* ── Light overlay ── */}
      <div aria-hidden style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(238,247,251,0.94)',
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
          background: 'radial-gradient(ellipse 80% 60% at 50% -5%, rgba(131,202,226,0.07) 0%, transparent 72%)',
        }}
      >

        {/* Badge — pinned top-center */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ position: 'absolute', top: 32, zIndex: 2 }}
        >
          <span
            className="glass-pill"
            style={{ color: '#0F2940', gap: 10, padding: '7px 18px' }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#fe8684',
                boxShadow: '0 0 8px #fe8684',
                flexShrink: 0,
                display: 'inline-block',
              }}
            />
            {tr('Offen für neue Projekte', 'Open to new projects')}
          </span>
        </motion.div>

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
              fontSize: 'clamp(46px, 7.5vw, 96px)',
              lineHeight: 1.08,
              letterSpacing: '-0.04em',
              color: '#0F2940',
              margin: 0,
            }}>
              {/* ── Line 1: Ich bin Hector [portrait] ── */}
              <span className="bio-line">
                {tr('Ich bin ', "I'm ")}
                <em style={{ fontStyle: 'italic', color: 'rgba(15,41,64,0.72)' }}>Hector</em>
                <motion.span
                  aria-hidden
                  whileHover={{ scale: 1.28, zIndex: 10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    width: '1.90em', height: '0.74em',
                    borderRadius: 999,
                    overflow: 'hidden',
                    margin: '0 0.10em 0.06em 0.32em',
                    border: '1px solid rgba(131,202,226,0.30)',
                    boxShadow: '0 4px 16px rgba(15,41,64,0.12), inset 0 1px 0 rgba(131,202,226,0.20)',
                    position: 'relative', top: '-0.03em',
                    cursor: 'zoom-in',
                  }}
                >
                  <img
                    src="/img/hector-profile-new.jpg"
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
                  whileHover={{ scale: 1.28, zIndex: 10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    width: '1.90em', height: '0.74em',
                    borderRadius: 999,
                    overflow: 'hidden',
                    margin: '0 0.10em 0.06em',
                    border: '1px solid rgba(131,202,226,0.30)',
                    boxShadow: '0 4px 16px rgba(15,41,64,0.12), inset 0 1px 0 rgba(131,202,226,0.20)',
                    position: 'relative', top: '-0.03em',
                    cursor: 'zoom-in',
                  }}
                >
                  <img
                    src="/img/projects/mosaic-sentinel.webp"
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', objectPosition: '66% 45%' }}
                  />
                </motion.span>
                <em style={{ fontStyle: 'italic', color: 'rgba(15,41,64,0.72)' }}>{' Designer'}</em>
              </span>

              {/* ── Line 3: und Grafikdesigner ── */}
              <span className="bio-line">
                <em style={{ fontStyle: 'italic', color: 'rgba(15,41,64,0.72)' }}>{tr('und Grafikdesigner', 'and Graphic Designer')}</em>
              </span>

              {/* ── Line 4: aus Mainz [Mainz pill] ── */}
              <span className="bio-line">
                {tr('aus Mainz ', 'from Mainz ')}
                <motion.span
                  aria-hidden
                  whileHover={{ scale: 1.28, zIndex: 10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    width: '1.90em', height: '0.74em',
                    borderRadius: 999,
                    overflow: 'hidden',
                    margin: '0 0.04em 0.06em',
                    border: '1px solid rgba(131,202,226,0.30)',
                    boxShadow: '0 4px 16px rgba(15,41,64,0.12), inset 0 1px 0 rgba(131,202,226,0.20)',
                    position: 'relative', top: '-0.03em',
                    cursor: 'zoom-in',
                  }}
                >
                  <img
                    src="/img/mainz-cathedral.jpg"
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', objectPosition: '50% 30%' }}
                  />
                </motion.span>
              </span>
            </h1>
          </motion.div>

          {/* Bio paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.42 }}
            style={{
              fontSize: 'clamp(17px, 1.5vw, 20px)',
              lineHeight: 1.72,
              color: 'rgba(15,41,64,0.72)',
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

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.60 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginTop: 36,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <motion.a
              href="#work"
              className="layers-cta"
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            >
              {tr('Projekte ansehen', 'View projects')}
              <span className="layers-orb">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </motion.a>

            <motion.a
              href="/Lebenslauf_Hector_Uribe.pdf"
              download
              className="layers-cta layers-ghost"
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            >
              {tr('Lebenslauf', 'Download CV')}
            </motion.a>
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
            color: '#fe8684',
            textDecoration: 'none',
            filter: 'drop-shadow(0 2px 8px rgba(254,134,132,0.45))',
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

      {/* ── SECTIONS BELOW HERO ──────────────────────────────── */}
      <div style={{ position: 'relative' }}>

      {/* ── DIORAMA ──────────────────────────────────────────── */}
      <div style={{ background: '#FFFFFF', borderTop: '1px solid rgba(15,41,64,0.06)' }}>
      <section
        id="diorama"
        style={{ padding: '96px 0 48px', position: 'relative', zIndex: 1 }}
      >
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 28px' }}>
          <SectionHead
            title="Das Studio"
            sub="Klicke auf die Objekte — oder nutze den Dock unten."
          />
        </div>
        <DioramaScene onSectionOpen={handleDioramaOpen} isDark={false} lang="de" />
      </section>
      </div>

      {/* ── PROJECTS ─────────────────────────────────────────── */}
      <div style={{ background: '#d6ebf2', borderTop: '1px solid rgba(15,41,64,0.05)' }}>
      <section id="work" style={{ padding: '96px 0', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 28px' }}>
          <SectionHead
            title="Ausgewählte Projekte"
            sub="UX/UI-Design, Branding und Produktfotografie aus 2+ Jahren Praxiserfahrung."
          />

          {/* Live / real-world projects — online & visible */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', color: '#0F2940' }}>
              Live &amp; in Produktion
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(15,41,64,0.72)' }}>
              Berufliche Projekte, online sichtbar
            </span>
            <div style={{ flex: 1, height: 1, background: 'rgba(15,41,64,0.12)' }} />
          </div>
          <LiveProjects />

          {/* Further work */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '48px 0 22px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', color: '#0F2940' }}>
              Weitere Projekte
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(15,41,64,0.72)' }}>
              Studien, Konzepte &amp; eigene Arbeiten
            </span>
            <div style={{ flex: 1, height: 1, background: 'rgba(15,41,64,0.12)' }} />
          </div>
          <ProjectsCarousel />
        </div>
      </section>
      </div>{/* end projects bg */}

      {/* ── CONTACT ──────────────────────────────────────────── */}
      <div style={{ background: '#FFFFFF', borderTop: '1px solid rgba(15,41,64,0.05)' }}>
      <Section id="contact" style={{ paddingBottom: 160 }}>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          style={{
            position: 'relative',
            maxWidth: 460,
            margin: '0 auto',
            borderRadius: 30,
            padding: '42px 34px 36px',
            background: 'linear-gradient(160deg, rgba(255,255,255,0.92), rgba(238,247,251,0.80) 50%, rgba(240,244,243,0.90))',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '0.5px solid rgba(131,202,226,0.22)',
            boxShadow: '0 8px 40px rgba(15,41,64,0.10), 0 1px 4px rgba(15,41,64,0.06), inset 0 1px 0 rgba(255,255,255,0.90)',
            overflow: 'hidden',
          }}
        >
          {/* Terracotta halo */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: `radial-gradient(60% 50% at 30% 8%, rgba(254,134,132,0.10), transparent 70%)`,
            filter: 'blur(30px)',
            opacity: 0.6,
            zIndex: 0,
          }} />

          {/* Heading */}
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: 30 }}>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(28px, 5vw, 38px)', letterSpacing: '-0.02em',
              margin: '0 0 8px', color: '#0F2940',
            }}>
              Kontakt aufnehmen
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(15,41,64,0.72)', margin: 0, lineHeight: 1.6 }}>
              Offen für Projekte, Kooperationen und Herausforderungen.
            </p>
          </div>

          {/* Email CTA — primary action */}
          <a
            href="mailto:hectoruch18@gmail.com"
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex', alignItems: 'center', gap: 14,
              background: 'rgba(255,255,255,0.88)',
              border: '1px solid rgba(131,202,226,0.18)',
              borderRadius: 16, padding: '13px 13px 13px 20px',
              boxShadow: '0 2px 10px rgba(15,41,64,0.06), inset 0 1px 0 rgba(255,255,255,0.90)',
              textDecoration: 'none', marginBottom: 20,
              transition: 'border-color .2s ease, box-shadow .2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(254,134,132,0.45)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 16px rgba(15,41,64,0.08), 0 0 0 3px rgba(254,134,132,0.10)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(131,202,226,0.18)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 2px 10px rgba(15,41,64,0.06), inset 0 1px 0 rgba(255,255,255,0.90)';
            }}
          >
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <span style={{ fontSize: 12, color: 'rgba(15,41,64,0.72)', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>E-Mail</span>
              <span style={{ fontSize: 16, color: '#0F2940', fontWeight: 500 }}>hectoruch18@gmail.com</span>
            </div>
            <span style={{
              width: 46, height: 46, borderRadius: '50%', flexShrink: 0,
              display: 'grid', placeItems: 'center', color: 'rgba(255,255,255,0.92)',
              background: 'linear-gradient(140deg, #fd7c7a, #fe8684)',
              boxShadow: '0 6px 18px rgba(254,134,132,0.50), inset 0 1px 0 rgba(255,255,255,0.30)',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </span>
          </a>

          {/* Divider */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14,
            margin: '0 0 20px',
            position: 'relative', zIndex: 1,
            color: 'rgba(15,41,64,0.72)', fontSize: 12,
            letterSpacing: '.12em', fontFamily: 'var(--font-mono)',
          }}>
            <span style={{ flex: 1, height: 1, background: 'rgba(131,202,226,0.18)' }} />
            ODER
            <span style={{ flex: 1, height: 1, background: 'rgba(131,202,226,0.18)' }} />
          </div>

          {/* Social links */}
          {[
            { label: 'LinkedIn',  value: 'hectoruch18',       url: 'https://www.linkedin.com/in/hectoruch18/' },
            { label: 'Behance',   value: 'hectoruribe2',      url: 'https://www.behance.net/hectoruribe2' },
            { label: 'Instagram', value: '@hectoruribechacon', url: 'https://www.instagram.com/hectoruribechacon/' },
          ].map((link, i) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'relative',
                display: 'flex', alignItems: 'center', gap: 14,
                background: 'rgba(255,255,255,0.80)',
                border: '1px solid rgba(131,202,226,0.14)',
                borderRadius: 16, padding: '15px 13px 15px 20px',
                boxShadow: '0 2px 8px rgba(15,41,64,0.05), inset 0 1px 0 rgba(255,255,255,0.90)',
                textDecoration: 'none',
                marginTop: i > 0 ? 10 : 0,
                zIndex: 1,
                transition: 'background .2s ease, border-color .2s ease, box-shadow .2s ease, transform .15s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'rgba(255,255,255,0.96)';
                el.style.borderColor = 'rgba(131,202,226,0.28)';
                el.style.boxShadow = '0 4px 14px rgba(15,41,64,0.08), inset 0 1px 0 rgba(255,255,255,0.95)';
                el.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'rgba(255,255,255,0.80)';
                el.style.borderColor = 'rgba(131,202,226,0.14)';
                el.style.boxShadow = '0 2px 8px rgba(15,41,64,0.05), inset 0 1px 0 rgba(255,255,255,0.90)';
                el.style.transform = 'none';
              }}
            >
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 15.5, color: '#0F2940', fontWeight: 500 }}>{link.label}</span>
                <span style={{ fontSize: 13.5, color: 'rgba(15,41,64,0.72)', marginLeft: 6 }}>{link.value}</span>
              </div>
              <span style={{
                width: 34, height: 34, borderRadius: '50%',
                display: 'grid', placeItems: 'center',
                border: '1px solid rgba(131,202,226,0.20)',
                color: 'rgba(15,41,64,0.72)', flexShrink: 0,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </span>
            </a>
          ))}
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
            onClose={() => setActivePanel(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
