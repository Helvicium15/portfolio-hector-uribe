'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Project } from '@/lib/data';

interface ProjectCardProps {
  project: Project;
  style?: React.CSSProperties;
}

export default function ProjectCard({ project, style }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/projekte/${project.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        textDecoration: 'none',
        borderRadius: 20,
        position: 'relative',
        ...style,
      }}
    >
      <article
        style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: 20,
          background: 'linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.018))',
          backdropFilter: 'blur(30px) saturate(140%)',
          WebkitBackdropFilter: 'blur(30px) saturate(140%)',
          border: '1px solid rgba(255,255,255,.08)',
          boxShadow: hovered
            ? '0 24px 60px rgba(0,0,0,.72), inset 0 1px 0 rgba(255,255,255,.14)'
            : '0 16px 50px rgba(0,0,0,.65), inset 0 1px 0 rgba(255,255,255,.10)',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'box-shadow 0.28s ease, transform 0.28s ease',
        }}
      >
        {/* Iridescent corner glow */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 'inherit',
          background: 'radial-gradient(38% 42% at 20% 6%, rgba(120,230,210,.10), transparent 60%), radial-gradient(55% 60% at 34% 4%, rgba(150,80,255,.28), transparent 66%)',
          filter: 'blur(6px)', zIndex: 0,
        }} />
        {/* Thumbnail area */}
        <div
          style={{
            height: 224,
            position: 'relative',
            overflow: 'hidden',
            background: `linear-gradient(140deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)`,
            flexShrink: 0,
          }}
        >
          <img
            src={project.img}
            alt={project.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: hovered ? 0.58 : 0.38,
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
              transition: 'opacity 0.42s ease, transform 0.55s cubic-bezier(0.22,1,0.36,1)',
              filter: 'saturate(0.72)',
            }}
          />

          {/* Accent color wash on hover */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(ellipse at 50% 60%, ${project.accent}20 0%, transparent 70%)`,
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.38s ease',
            }}
          />

          {/* "New" badge */}
          {project.isNew && (
            <span
              className="glass-pill"
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                fontSize: 9,
                letterSpacing: '0.12em',
                color: 'rgba(180,230,180,0.85)',
                boxShadow: '0 0 0 1px rgba(180,230,180,0.25), inset 0 1px 0 rgba(255,255,255,0.35)',
              }}
            >
              NEU
            </span>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '22px 24px 24px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1, position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <span
              className="mono-label"
              style={{ color: `${project.accent}99` }}
            >
              {project.cat}
            </span>
            <span className="mono-label">{project.year}</span>
          </div>

          <h3
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1.2rem',
              letterSpacing: '-0.02em',
              color: 'rgba(230,240,255,0.95)',
              lineHeight: 1.2,
              textWrap: 'balance',
            }}
          >
            {project.name}
          </h3>

          <p
            style={{
              margin: 0,
              fontSize: '13px',
              lineHeight: 1.72,
              color: 'rgba(190,210,235,0.56)',
              flex: 1,
            }}
          >
            {project.desc}
          </p>

          {/* Arrow CTA */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginTop: 4,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.04em',
              color: hovered ? 'rgba(220,232,255,0.88)' : 'rgba(180,200,230,0.45)',
              transition: 'color 0.22s ease',
            }}
          >
            Ansehen
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              style={{
                transform: hovered ? 'translateX(3px)' : 'translateX(0)',
                transition: 'transform 0.22s ease',
              }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}
