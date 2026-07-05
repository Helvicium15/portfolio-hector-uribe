'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MagneticDock, type DockItemData } from '@/components/ui/magnetic-dock';

/* ================================================================
   GLASSMORPHISM ICONS — responsive (fill 100% of magnetic button)
   ================================================================ */

const glassBox = (_tint = ''): React.CSSProperties => ({
  width: '100%', height: '100%',
  borderRadius: '22.5%',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  background: 'linear-gradient(180deg, rgba(255,255,255,0.60) 0%, rgba(131,202,226,0.16) 100%)',
  backdropFilter: 'blur(18px) saturate(1.4)',
  WebkitBackdropFilter: 'blur(18px) saturate(1.4)',
  border: '0.5px solid rgba(255,255,255,0.70)',
  boxShadow: '0 4px 10px rgba(15,41,64,0.10), inset 0 1px 2px rgba(255,255,255,0.95), inset 0 -1px 2px rgba(131,202,226,0.18)',
});

/* Top-glass highlight shine */
const Gloss = () => (
  <span style={{
    position: 'absolute',
    top: '3px', left: '8%', width: '84%', height: '38%',
    background: 'rgba(255,255,255,0.55)',
    borderRadius: '999px',
    filter: 'blur(3px)',
    pointerEvents: 'none',
    zIndex: 1,
  }} />
);

/* Responsive SVG wrapper — 55% of container */
const Icon = ({ children }: { children: React.ReactNode }) => (
  <div style={{ width: '55%', height: '55%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {children}
  </div>
);

function IconProjects() {
  return (
    <div style={glassBox()}>
      <Gloss />
      <Icon>
        <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%' }} fill="none">
          <rect x="2"  y="2"  width="9" height="9"  rx="2" fill="rgba(15,41,64,0.86)" />
          <rect x="13" y="2"  width="9" height="9"  rx="2" fill="rgba(15,41,64,0.52)" />
          <rect x="2"  y="13" width="9" height="9"  rx="2" fill="rgba(15,41,64,0.52)" />
          <rect x="13" y="13" width="9" height="9"  rx="2" fill="rgba(15,41,64,0.32)" />
        </svg>
      </Icon>
    </div>
  );
}

function IconSkills() {
  return (
    <div style={glassBox()}>
      <Gloss />
      <Icon>
        <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%' }} fill="none">
          <rect x="2"    y="14" width="5.5" height="8"  rx="2" fill="rgba(15,41,64,0.86)" />
          <rect x="9.2"  y="8"  width="5.5" height="14" rx="2" fill="rgba(15,41,64,0.86)" />
          <rect x="16.5" y="2"  width="5.5" height="20" rx="2" fill="rgba(15,41,64,0.86)" />
        </svg>
      </Icon>
    </div>
  );
}

function IconInstagram() {
  return (
    <div style={glassBox()}>
      <Gloss />
      <Icon>
        <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%' }} fill="none">
          <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="rgba(15,41,64,0.84)" strokeWidth="2.2" />
          <circle cx="12" cy="12" r="4.5" stroke="rgba(15,41,64,0.84)" strokeWidth="2.2" />
          <circle cx="17.5" cy="6.5" r="1.4" fill="rgba(15,41,64,0.84)" />
        </svg>
      </Icon>
    </div>
  );
}

function IconBehance() {
  return (
    <div style={glassBox()}>
      <Gloss />
      <Icon>
        {/* Official Behance "Bē" brand mark paths */}
        <svg viewBox="0 0 448 512" style={{ width: '100%', height: '100%' }} fill="rgba(15,41,64,0.84)">
          <path d="M186.86 230a55.76 55.76 0 0 0 32-52.95C218.86 111.23 168.62 96 117 96H0v320h130.14c54.33 0 115.86-23.08 115.86-85.87a71.52 71.52 0 0 0-59.14-100.13zM64 160h44.57c21.77 0 43.43 6.17 43.43 31.84C152 216.09 132.43 225 111.43 225H64zm52 192H64v-73.78h53.71c25.14 0 48.57 9.4 48.57 37.46C166.28 342.25 142 352 116 352zM336 96h-32v32h32V96zm80 160c0-52.93-30.14-96-96-96s-96 43.07-96 96 43.07 96 96 96a96.33 96.33 0 0 0 86-53.33H352a44.49 44.49 0 0 1-32 13.33c-24.28 0-43.14-16.17-44.57-42.67H416v-13.33z"/>
        </svg>
      </Icon>
    </div>
  );
}

function IconLinkedIn() {
  return (
    <div style={glassBox()}>
      <Gloss />
      <Icon>
        <svg viewBox="0 0 448 512" style={{ width: '100%', height: '100%' }} fill="rgba(15,41,64,0.84)">
          <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
        </svg>
      </Icon>
    </div>
  );
}

function IconEmail() {
  return (
    <div style={glassBox()}>
      <Gloss />
      <Icon>
        <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%' }} fill="none">
          <rect x="2" y="4" width="20" height="16" rx="3" fill="rgba(131,202,226,0.22)" stroke="rgba(15,41,64,0.72)" strokeWidth="1.5" />
          <path d="M2 7l10 7 10-7" stroke="rgba(15,41,64,0.84)" strokeWidth="2.2" strokeLinecap="round"/>
        </svg>
      </Icon>
    </div>
  );
}

/* ================================================================
   DOCK
   ================================================================ */
export default function Dock() {
  const [isMobile, setMobile]  = useState(false);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Auto-hide on scroll-down so the fixed dock never covers content while
  // reading; reveal on scroll-up and near the top/bottom of the page.
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const nearBottom = window.innerHeight + y >= document.body.scrollHeight - 140;
        if (y < 160 || nearBottom) setHidden(false);
        else if (y > lastY + 6) setHidden(true);
        else if (y < lastY - 6) setHidden(false);
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const iconSize = isMobile ? 40 : 52;

  const items: DockItemData[] = [
    {
      id: 'instagram',
      label: 'Instagram',
      icon: <IconInstagram />,
      onClick: () => window.open('https://www.instagram.com/hectoruribechacon/', '_blank', 'noopener,noreferrer'),
    },
    {
      id: 'behance',
      label: 'Behance',
      icon: <IconBehance />,
      onClick: () => window.open('https://www.behance.net/hectoruribe2', '_blank', 'noopener,noreferrer'),
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: <IconLinkedIn />,
      onClick: () => window.open('https://www.linkedin.com/in/hectoruch18/', '_blank', 'noopener,noreferrer'),
    },
    {
      id: 'email',
      label: 'E-Mail',
      icon: <IconEmail />,
      onClick: () => { window.location.href = 'mailto:hectoruch18@gmail.com'; },
    },
  ];

  return (
    <nav
      aria-label="Hauptnavigation"
      style={{
        position: 'fixed', bottom: 22, left: '50%', zIndex: 100,
        transform: hidden ? 'translateX(-50%) translateY(160%)' : 'translateX(-50%) translateY(0)',
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? 'none' : 'auto',
        transition: 'transform 0.42s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease',
      }}
    >
      <motion.div
        className="lg"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
        style={{
          background: 'rgba(255,255,255,0.62)',
          backdropFilter: 'blur(30px) saturate(200%) brightness(1.06)',
          WebkitBackdropFilter: 'blur(30px) saturate(200%) brightness(1.06)',
          border: '1px solid rgba(255,255,255,0.7)',
          boxShadow: '0 10px 34px rgba(15,41,64,0.18), 0 2px 8px rgba(15,41,64,0.10), inset 0 1.5px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(15,41,64,0.04)',
          borderRadius: 9999,
          padding: isMobile ? '6px 8px' : '7px 10px',
        }}
      >
        <MagneticDock
          items={items}
          iconSize={iconSize}
          maxScale={isMobile ? 1.28 : 1.48}
          magneticDistance={130}
          showLabels={true}
          variant="transparent"
          className="gap-2 p-0 shadow-none rounded-none"
        />
      </motion.div>
    </nav>
  );
}
