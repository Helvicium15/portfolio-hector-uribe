'use client';

import { useRef, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { GlassCircle, GlassLozenge } from './GlassMesh';

/* ── Shared R3F canvas wrapper for small elements ───────────────── */
function TinyCanvas({ children }: { children: React.ReactNode }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 1.8], fov: 40 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent', position: 'absolute', inset: 0 }}
      dpr={[1, 2]}
    >
      <Environment preset="city" />
      <ambientLight intensity={0.3} color="#c8d8f0" />
      <directionalLight position={[-1, 2, 1]} intensity={0.8} color="#e0ecff" />
      <directionalLight position={[1, -1, -1]} intensity={0.2} color="#8ab0d0" />
      {children}
    </Canvas>
  );
}

/* ── Icon button (circle) — matches reference circular element ───── */
interface IconBtnProps {
  onClick?: () => void;
  href?: string;
  label: string;
  children: React.ReactNode;
  size?: number;
  className?: string;
}

export function GlassIconButton({ onClick, href, label, children, size = 52, className = '' }: IconBtnProps) {
  const [hovered, setHovered] = useState(false);

  const inner = (
    <span
      className={`glass-icon-btn ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role={href ? undefined : 'button'}
      tabIndex={href ? undefined : 0}
      aria-label={label}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      {/* R3F glass sphere behind the icon */}
      <span
        style={{ position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden', pointerEvents: 'none' }}
        aria-hidden="true"
      >
        <TinyCanvas>
          <GlassCircle radius={0.88} hovered={hovered} />
        </TinyCanvas>
      </span>
      {/* Icon content on top */}
      <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </span>
    </span>
  );

  if (href) {
    return (
      <a href={href} aria-label={label} className={`glass-icon-btn ${className}`}
        style={{ width: size, height: size, textDecoration: 'none', position: 'relative' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden', pointerEvents: 'none' }} aria-hidden="true">
          <TinyCanvas>
            <GlassCircle radius={0.88} hovered={hovered} />
          </TinyCanvas>
        </span>
        <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {children}
        </span>
      </a>
    );
  }

  return inner;
}

/* ── Lozenge button — matches reference "Upload" pill element ─────── */
interface LozengeBtnProps {
  onClick?: () => void;
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export function GlassLozengeButton({ onClick, href, children, className = '', variant = 'primary' }: LozengeBtnProps) {
  const [hovered, setHovered] = useState(false);

  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };

  const content = (
    <>
      {/* R3F glass lozenge layer */}
      <span
        style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', overflow: 'hidden', pointerEvents: 'none' }}
        aria-hidden="true"
      >
        <TinyCanvas>
          <GlassLozenge width={3.2} height={0.9} hovered={hovered} />
        </TinyCanvas>
      </span>
      {/* Label on top */}
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </>
  );

  const baseStyle: React.CSSProperties = { position: 'relative', overflow: 'hidden' };

  if (href) {
    return (
      <a href={href} className={`glass-btn ${className}`} style={baseStyle} {...handlers}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`glass-btn ${className}`} style={baseStyle} {...handlers}>
      {content}
    </button>
  );
}

/* ── Minimal CSS-only glass button (no R3F overhead for small btns) ─ */
export function GlassChip({ children, href, onClick, active }: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}) {
  const style: React.CSSProperties = active
    ? { boxShadow: '0 0 0 1px rgba(255,255,255,0.52), inset 0 1px 0 rgba(255,255,255,0.72), 0 4px 14px rgba(0,0,0,0.22)' }
    : {};

  if (href) {
    return <a href={href} className="glass-pill" style={{ ...style, textDecoration: 'none', cursor: 'pointer' }}>{children}</a>;
  }
  return (
    <button type="button" onClick={onClick} className="glass-pill" style={{ ...style, cursor: 'pointer' }}>
      {children}
    </button>
  );
}
