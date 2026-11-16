import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { getProjectContent } from '@/lib/projectContent';
import { projects } from '@/lib/data';
import { SectionReveal } from '@/components/SectionReveal';
import type { Lang } from '@/lib/i18n';

interface Props {
  params: Promise<{ slug: string }>;
}

// Read per-request cookie (language) → must render dynamically so the DE/EN
// toggle also switches the sub-pages in production.
export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return Object.keys(getProjectContent('de')).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getProjectContent('de')[slug];
  if (!data) return {};
  return {
    title: `${data.title} — Hector Uribe`,
    description: data.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const lang = ((cookieStore.get('lang')?.value as Lang) || 'de');
  const t = (de: string, en: string) => (lang === 'en' ? en : de);
  const content = getProjectContent(lang);
  const data = content[slug];
  if (!data) notFound();

  const nextProject = data.nextSlug
    ? (projects.find((p) => p.slug === data.nextSlug) ??
       (content[data.nextSlug]
         ? { slug: data.nextSlug, name: content[data.nextSlug].title.split('—')[0].trim(), cat: content[data.nextSlug].category }
         : null))
    : null;

  return (
    <>
      {/* Fixed background video — same as main page */}
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
      {/* Dark navy overlay */}
      <div aria-hidden style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(158,163,169,0.95)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* Back button — secondary glass, 44px · radius 12 */}
      <Link
        href="/"
        className="btn btn-secondary lq btn-sm subpage-back"
        style={{ position: 'fixed', top: 16, left: 16, zIndex: 200 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Portfolio
      </Link>


      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        className="sub-hero"
        style={{
          position: 'relative',
          minHeight: '62svh',
          display: 'flex',
          alignItems: 'flex-end',
          paddingBottom: '4.5rem',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        {/* Hero image — blurred to a soft texture so its text never competes
            with the foreground copy; scaled up so the blur doesn't bleed at edges */}
        <img
          src={data.heroImg}
          alt=""
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.08,
            filter: 'saturate(0.45) blur(5px)',
            transform: 'scale(1.1)',
          }}
        />

        {/* Hero gradient overlay — stronger scrim at the top too */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse 110% 90% at 50% -10%, ${data.accent}14 0%, transparent 60%), linear-gradient(to bottom, rgba(30,31,34,0.62) 0%, rgba(30,31,34,0.9) 55%, rgba(30,31,34,0.96) 100%)`,
          }}
        />

        <div style={{ position: 'relative', zIndex: 2, padding: '0 40px', maxWidth: 1200, margin: '0 auto', width: '100%', paddingTop: 112 }}>
          {/* Company logo */}
          {data.logo && (
            <img
              src={data.logo}
              alt={`${data.title.split('—')[0].trim()} Logo`}
              className="hero-enter hero-enter-1"
              style={{ height: 34, width: 'auto', maxWidth: 'min(280px, 62vw)', display: 'block', marginBottom: 20 }}
            />
          )}
          {/* Category line */}
          <div
            className="hero-enter hero-enter-1"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: 'var(--text-2)',
              marginBottom: '1.1rem',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span style={{ display: 'block', width: 26, height: 1.5, background: data.accent }} />
            {data.category}
          </div>

          {/* Project title */}
          <h1
            className="hero-enter hero-enter-2"
            style={{
              margin: '0 0 18px',
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
              color: 'var(--text)',
              textWrap: 'balance',
            }}
          >
            {data.title.split('—')[0].trim()}
          </h1>

          {/* Intro */}
          <p
            className="hero-enter hero-enter-3"
            style={{
              color: 'var(--text-2)',
              fontSize: '0.97rem',
              lineHeight: 1.78,
              maxWidth: 580,
              margin: '0 0 2.2rem',
            }}
          >
            {data.intro}
          </p>

          {/* Meta row */}
          <div
            className="hero-enter hero-enter-4"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2rem 3rem',
              paddingTop: '1.6rem',
              borderTop: '1px solid var(--line-strong)',
            }}
          >
            {[
              { k: t('Kategorie', 'Category'), v: data.category },
              { k: t('Tools', 'Tools'), v: data.tools },
              { k: t('Rolle', 'Role'), v: data.role },
              { k: t('Zeitraum', 'Period'), v: data.year },
            ].map(({ k, v }) => (
              <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: '11.5px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-2)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                  {k}
                </span>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
                  {v}
                </span>
              </div>
            ))}
          </div>

          {data.liveUrl && (
            <a
              href={data.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-enter hero-enter-4 btn btn-primary btn-md"
              style={{
                marginTop: '1.9rem',
                boxShadow: '0 12px 26px -6px rgba(255,95,0,0.55), inset 0 1px 0 rgba(255,255,255,0.056)',
              }}
            >
              {data.liveLabel ?? t('Live ansehen', 'View live')}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg>
            </a>
          )}
        </div>
      </section>

      {/* ── CONTENT SECTIONS ─────────────────────────────── */}
      <main
        className="sub-content"
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '4.5rem 40px 3rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {data.sections.map((section, i) => (
          <SectionReveal key={i} delay={i * 0.06}>
            <section className="sub-section" style={{ marginBottom: '5rem' }}>
              {/* Section divider label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '2rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.58rem',
                    fontWeight: 700,
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: 'var(--text-2)',
                  }}
                >
                  {section.label}
                </span>
                <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
              </div>

              {section.content}
            </section>
          </SectionReveal>
        ))}
      </main>

      {/* ── NEXT PROJECT ─────────────────────────────────── */}
      {nextProject && (
        <SectionReveal>
        <div style={{ position: 'relative', zIndex: 1, padding: '0 40px 2rem', maxWidth: 1100, margin: '0 auto' }}>
          <Link
            href={`/projekte/${nextProject.slug}`}
            style={{ textDecoration: 'none', display: 'block' }}
          >
            <div
              className="glass-card"
              style={{
                padding: '32px 36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 20,
                cursor: 'pointer',
              }}
            >
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11.5,
                    fontWeight: 700,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'var(--text-2)',
                    marginBottom: 8,
                  }}
                >
                  {t('Nächstes Projekt', 'Next project')}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                    color: 'var(--text)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {nextProject.name}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 5 }}>
                  {nextProject.cat}
                </div>
              </div>

              <div
                className="glass-icon-btn"
                style={{ flexShrink: 0, position: 'relative', zIndex: 1 }}
                aria-hidden
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
        </SectionReveal>
      )}

      {/* ── CONTACT FOOTER ───────────────────────────────── */}
      <footer
        className="sub-footer"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '4rem 40px 3.5rem',
          borderTop: '1px solid var(--line)',
          textAlign: 'center',
          marginTop: '3rem',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11.5,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--text-2)',
            marginBottom: 22,
          }}
        >
          {t('Interesse an einer Zusammenarbeit?', 'Interested in working together?')}
        </p>
        <a href="mailto:hectoruch18@gmail.com" className="btn btn-secondary lq">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          hectoruch18@gmail.com
        </a>
        <p
          style={{
            marginTop: 28,
            fontSize: 11,
            color: 'var(--text-2)',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.08em',
          }}
        >
          © {new Date().getFullYear()} Hector Uribe · Mainz
        </p>
      </footer>
    </>
  );
}
