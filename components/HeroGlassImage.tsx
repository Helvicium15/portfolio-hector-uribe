'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORDS   = ['HECTOR', 'DESIGNER'] as const;
const HOLD    = 2800;
const OUT_MS  = 520;

export default function HeroGlassImage() {
  const [wIdx,   setWIdx]   = useState(0);
  const [phase,  setPhase]  = useState<'in' | 'hold' | 'out'>('in');

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (phase === 'in') {
      t = setTimeout(() => setPhase('hold'), 600);
    } else if (phase === 'hold') {
      t = setTimeout(() => setPhase('out'), HOLD);
    } else {
      t = setTimeout(() => {
        setWIdx(i => (i + 1) % WORDS.length);
        setPhase('in');
      }, OUT_MS);
    }
    return () => clearTimeout(t);
  }, [phase]);

  const word = WORDS[wIdx];
  const src  = word === 'HECTOR' ? '/hector-glass.png' : '/designer-glass.png';

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 0' }}>

      {/* ── Ambient glow blobs — render BEHIND the image via z-index ── */}
      <div
        aria-hidden
        style={{ position: 'absolute', inset: '-30%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}
      >
        {/* Cyan — top-left */}
        <div style={{
          position: 'absolute', top: '5%', left: '15%',
          width: '45%', height: '55%',
          background: 'rgba(0, 220, 255, 0.28)',
          borderRadius: '50%',
          filter: 'blur(80px)',
        }} />
        {/* Magenta — bottom-right */}
        <div style={{
          position: 'absolute', bottom: '5%', right: '15%',
          width: '45%', height: '55%',
          background: 'rgba(220, 0, 255, 0.24)',
          borderRadius: '50%',
          filter: 'blur(90px)',
        }} />
        {/* Orange — center-right accent */}
        <div style={{
          position: 'absolute', top: '30%', right: '5%',
          width: '30%', height: '40%',
          background: 'rgba(255, 140, 0, 0.18)',
          borderRadius: '50%',
          filter: 'blur(70px)',
        }} />
        {/* Green — center-left accent */}
        <div style={{
          position: 'absolute', bottom: '20%', left: '5%',
          width: '28%', height: '38%',
          background: 'rgba(0, 240, 120, 0.16)',
          borderRadius: '50%',
          filter: 'blur(70px)',
        }} />
      </div>

      {/* ── Image with enter/exit crossfade ─────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={word}
          initial={{ opacity: 0, scale: 1.10, y: -8 }}
          animate={{ opacity: 1, scale: 1,    y: 0   }}
          exit={{    opacity: 0, scale: 0.94,  y: 6   }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          {/* Float animation wrapper — CSS translate doesn't conflict with
              Framer Motion transform (they compose independently in modern CSS) */}
          <div className="glass-float-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={word}
              style={{
                display: 'block',
                maxWidth: 'clamp(280px, 56vw, 780px)',
                height: 'auto',
                objectFit: 'contain',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
