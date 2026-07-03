'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import Link from 'next/link';
import type { Project } from '@/lib/data';

/* Responsive config per breakpoint */
const CFG = {
  mobile:  { radius: 190, perspective: 480, cardW: 155, cardH: 215, imgH: 115, speed: -0.20 },
  tablet:  { radius: 270, perspective: 680, cardW: 185, cardH: 258, imgH: 140, speed: -0.16 },
  desktop: { radius: 360, perspective: 880, cardW: 210, cardH: 286, imgH: 160, speed: -0.14 },
};

type Cfg = typeof CFG.desktop;

function getCfg(w: number): Cfg {
  if (w < 640)  return CFG.mobile;
  if (w < 1024) return CFG.tablet;
  return CFG.desktop;
}

function jitter(i: number) {
  return {
    tiltX: ((i * 41) % 9 - 4) * 3.5,
    tiltZ: ((i * 67) % 7 - 3) * 2.8,
  };
}

interface Props { projects: Project[] }

function CardLink({
  project,
  dragDist,
  children,
}: {
  project: Project;
  dragDist: React.RefObject<number>;
  children: React.ReactNode;
}) {
  const stop = (e: React.MouseEvent) => { if (dragDist.current > 8) e.preventDefault(); };
  const s: React.CSSProperties = { textDecoration: 'none', display: 'block', height: '100%' };

  if (project.url) {
    return (
      <a href={project.url} target="_blank" rel="noopener noreferrer" style={s} onClick={stop}>
        {children}
      </a>
    );
  }
  return (
    <Link href={`/projekte/${project.slug}`} style={s} onClick={stop}>
      {children}
    </Link>
  );
}

export default function RingCarousel({ projects }: Props) {
  const n = projects.length;
  const [cfg, setCfg] = useState<Cfg>(CFG.desktop);

  useEffect(() => {
    const update = () => setCfg(getCfg(window.innerWidth));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const angleStep = 360 / n;

  const ringRef  = useRef<HTMLDivElement>(null);
  const rotRef   = useRef(0);
  const dragging = useRef(false);
  const lastX    = useRef(0);
  const dragDist = useRef(0);
  const rafRef   = useRef<number>(0);
  const speedRef = useRef(cfg.speed);

  useEffect(() => { speedRef.current = cfg.speed; }, [cfg.speed]);

  useEffect(() => {
    const tick = () => {
      if (!dragging.current) rotRef.current += speedRef.current;
      if (ringRef.current)
        ringRef.current.style.transform = `rotateY(${rotRef.current}deg)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    dragDist.current = 0;
    lastX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastX.current;
    rotRef.current += dx * 0.28;
    dragDist.current += Math.abs(dx);
    lastX.current = e.clientX;
  }, []);

  const stopDrag = useCallback(() => { dragging.current = false; }, []);

  const containerH = cfg.cardH + 80;

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDrag}
      onPointerLeave={stopDrag}
      onPointerCancel={stopDrag}
      style={{
        height: containerH,
        perspective: `${cfg.perspective}px`,
        perspectiveOrigin: '50% 50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'grab',
        userSelect: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Fade edges — left + right vignette */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: 'linear-gradient(to right, #000710 0%, transparent 14%, transparent 86%, #000710 100%)',
      }} />

      {/* 3-D ring stage */}
      <div
        ref={ringRef}
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateY(0deg)',
          position: 'relative',
          width: 0,
          height: 0,
        }}
      >
        {projects.map((project, i) => {
          const angle = i * angleStep;
          const { tiltX, tiltZ } = jitter(i);
          const hw = cfg.cardW / 2;
          const hh = cfg.cardH / 2;

          return (
            <div
              key={project.id}
              style={{
                position: 'absolute',
                transformStyle: 'preserve-3d',
                transform: `rotateY(${angle}deg) translateZ(${cfg.radius}px) rotateX(${tiltX}deg) rotateZ(${tiltZ}deg)`,
                width: cfg.cardW,
                height: cfg.cardH,
                marginLeft: -hw,
                marginTop: -hh,
              }}
            >
              <CardLink project={project} dragDist={dragDist}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 18,
                  overflow: 'hidden',
                  position: 'relative',
                  background: 'linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))',
                  backdropFilter: 'blur(24px) saturate(140%)',
                  WebkitBackdropFilter: 'blur(24px) saturate(140%)',
                  border: '1px solid rgba(255,255,255,.10)',
                  boxShadow: '0 24px 70px rgba(0,0,0,.65), inset 0 1px 0 rgba(255,255,255,.12)',
                }}>
                  {/* Iridescent corner glow */}
                  <div aria-hidden style={{
                    position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
                    background: `radial-gradient(55% 55% at 30% 5%, ${project.accent}28, transparent 65%)`,
                    filter: 'blur(5px)',
                  }} />

                  {/* Thumbnail */}
                  <div style={{ height: cfg.imgH, overflow: 'hidden', flexShrink: 0 }}>
                    <img
                      src={project.img}
                      alt={project.name}
                      style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        opacity: 0.55, filter: 'saturate(0.82)',
                        display: 'block',
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div style={{ padding: '12px 14px', position: 'relative', zIndex: 2 }}>
                    <div style={{
                      fontSize: cfg.cardW < 170 ? 9 : 10,
                      fontFamily: 'var(--font-mono)',
                      letterSpacing: '0.10em',
                      color: `${project.accent}99`,
                      textTransform: 'uppercase',
                      marginBottom: 5,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {project.cat}
                    </div>
                    <div style={{
                      fontSize: cfg.cardW < 170 ? 12 : 14,
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      color: 'rgba(230,242,255,.96)',
                      lineHeight: 1.22,
                      fontFamily: 'var(--font-display)',
                    }}>
                      {project.name}
                    </div>
                    {cfg.cardW >= 185 && (
                      <div style={{
                        fontSize: 11,
                        color: 'rgba(180,200,230,.44)',
                        marginTop: 5,
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      } as React.CSSProperties}>
                        {project.desc}
                      </div>
                    )}
                  </div>
                </div>
              </CardLink>
            </div>
          );
        })}
      </div>
    </div>
  );
}
