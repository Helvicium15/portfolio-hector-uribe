'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const WORDS = ['Hi!', '¡Hola!'];

export default function Preloader() {
  const [stage, setStage] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Only play once per browser session
    if (typeof window !== 'undefined' && sessionStorage.getItem('hu_preloaded')) {
      setShow(false);
      return;
    }
    document.body.style.overflow = 'hidden';
    const t1 = setTimeout(() => setStage(1), 1000);   // Hi! → Hola!
    const t2 = setTimeout(() => setShow(false), 2050); // lift curtain
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (!show) {
      document.body.style.overflow = '';
      try { sessionStorage.setItem('hu_preloaded', '1'); } catch { /* ignore */ }
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(160deg, #EEF7FB 0%, #d6ebf2 100%)',
          }}
        >
          <div
            style={{
              position: 'relative', overflow: 'hidden', height: '1.15em',
              display: 'flex', alignItems: 'center',
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 'clamp(3.2rem, 13vw, 8rem)', letterSpacing: '-0.05em',
              color: 'rgba(15,41,64,0.97)', lineHeight: 1.12,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={stage}
                initial={{ y: '115%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-115%', opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'inline-block' }}
              >
                {WORDS[stage]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
