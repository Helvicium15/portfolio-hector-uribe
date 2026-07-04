'use client';

import Link from 'next/link';
import { liveProjects } from '@/lib/data';
import { useLang } from './LanguageProvider';

export default function LiveProjects() {
  const { lang } = useLang();
  const en = lang === 'en';
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(440px, 100%), 1fr))',
      gap: 22,
      marginBottom: 28,
    }}>
      {liveProjects.map((p) => (
        <Link key={p.slug} href={`/projekte/${p.slug}`} className="live-card">
          {/* Image */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <img
              src={p.img}
              alt={p.name}
              style={{ width: '100%', aspectRatio: '16 / 10', objectFit: 'cover', objectPosition: p.imgPos ?? '50% 50%', display: 'block' }}
            />
            {/* Live badge */}
            <span style={{
              position: 'absolute', top: 14, left: 14,
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: 'rgba(255,255,255,0.90)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(131,202,226,0.35)',
              borderRadius: 999, padding: '5px 12px',
              fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: '#0F2940',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#fe8684', boxShadow: '0 0 8px #fe8684' }} />
              Live
            </span>
            <span style={{
              position: 'absolute', top: 14, right: 14,
              fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
              background: 'rgba(15,41,64,0.72)', color: '#fff',
              borderRadius: 999, padding: '4px 11px', backdropFilter: 'blur(8px)',
            }}>{p.year}</span>
            {/* Company logo chip */}
            {p.logo && (
              <span style={{
                position: 'absolute', bottom: 14, left: 14,
                display: 'inline-flex', alignItems: 'center',
                background: 'rgba(255,255,255,0.94)',
                backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(131,202,226,0.35)',
                borderRadius: 10, padding: '7px 12px',
                boxShadow: '0 4px 14px rgba(15,41,64,0.10)',
              }}>
                <img src={p.logo} alt={`${p.name} Logo`} style={{ height: 18, width: 'auto', maxWidth: 130, display: 'block' }} />
              </span>
            )}
          </div>

          {/* Content */}
          <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(15,41,64,0.72)' }}>
              {en && p.orgEn ? p.orgEn : p.org}
            </div>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, lineHeight: 1.12, letterSpacing: '-0.02em', color: '#0F2940' }}>
              {p.name}
            </h3>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.66, color: 'rgba(15,41,64,0.72)' }}>
              {en && p.descEn ? p.descEn : p.desc}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 2 }}>
              {(en && p.tagsEn ? p.tagsEn : p.tags).map((t) => (
                <span key={t} style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600,
                  letterSpacing: '0.04em',
                  background: 'rgba(131,202,226,0.14)',
                  border: '1px solid rgba(131,202,226,0.30)',
                  borderRadius: 999, padding: '3px 10px',
                  color: 'rgba(15,41,64,0.72)',
                }}>{t}</span>
              ))}
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 'auto', paddingTop: 14, borderTop: '1px solid rgba(15,41,64,0.08)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(15,41,64,0.72)', letterSpacing: '0.02em' }}>{en && p.roleEn ? p.roleEn : p.role}</span>
              <span className="live-card-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: '#fe8684' }}>
                {en ? 'View' : 'Ansehen'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
