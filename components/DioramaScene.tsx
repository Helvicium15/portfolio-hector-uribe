'use client';
import { useEffect, useRef, useState, Fragment } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { ANNOS } from '@/lib/data';
import { type Lang, annoLabels, ui } from '@/lib/i18n';

/* Iridescent accent colors per chip — inspired by the glass-lettering palette */
const CHIP_ACCENTS: Record<string, [number,number,number]> = {
  info:    [255, 179, 122],   /* sky blue           */
  galerie: [255, 106, 19],   /* coral accent       */
  kontakt: [255, 179, 122],   /* sky blue           */
  skills:  [255, 179, 122],   /* sky blue           */
  hobbys:  [255, 106, 19],   /* coral accent       */
};

// Theme-aware SVG icons for annotation chips
function getAnnoIcon(key: string, isDark: boolean): React.ReactNode {
  // Light theme inherits the tile colour (navy, or white when the hotspot is pressed)
  const c = isDark ? 'white' : 'currentColor';
  switch (key) {
    case 'info':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8.5" r="4"/>
          <path d="M4 21c0-4.2 3.6-7.5 8-7.5s8 3.3 8 7.5"/>
        </svg>
      );
    case 'galerie':
      return (
        <svg width="19" height="19" viewBox="0 0 24 24" fill={c}>
          <rect x="2" y="2" width="9.5" height="9.5" rx="2.2"/>
          <rect x="12.5" y="2" width="9.5" height="9.5" rx="2.2"/>
          <rect x="2" y="12.5" width="9.5" height="9.5" rx="2.2"/>
          <rect x="12.5" y="12.5" width="9.5" height="9.5" rx="2.2"/>
        </svg>
      );
    case 'kontakt':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
          <path d="M2 21c0-3 1.85-5.36 5.08-6"/>
        </svg>
      );
    case 'skills':
      return (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round">
          <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/>
          <circle cx="12" cy="12" r="3.5"/>
        </svg>
      );
    case 'hobbys':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7.5" width="20" height="13" rx="2.5"/>
          <path d="M7 7.5l2-3.5h6l2 3.5"/>
          <circle cx="12" cy="14" r="3.8"/>
        </svg>
      );
    default: return null;
  }
}

interface Props {
  onSectionOpen: (key: string, origin?: { x: number; y: number }) => void;
  isDark?: boolean;
  lang?: Lang;
  /** Key of the section panel currently open — its hotspot button renders pressed */
  activeKey?: string | null;
}

// """ helpers (same as remake) """""""""""""""""""""""""""""""""""""""""""""""""
function tex(w: number, h: number, draw: (g: CanvasRenderingContext2D, w: number, h: number) => void) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d')!, w, h);
  const t = new THREE.CanvasTexture(c); t.anisotropy = 4; return t;
}
// """ Load room (Blender build — blender/diorama.py) """""""""""""""""""""""""""""""
/* The model ships with its lighting baked into one texture atlas, so every
   surface is drawn unlit (MeshBasicMaterial) — it looks like the Cycles render
   at the cost of a texture lookup. Hotspot groups are nodes named hs_<key>;
   the screen and the 12 frame_glass_<i> quads are textured here at runtime. */
const MODEL_URL = '/models/diorama.glb';

function screenTexture() {
  // Same design-app screen as the original diorama
  const t = tex(512, 320, (g, w, h) => {
    g.fillStyle = '#1c2030'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#11141f'; g.fillRect(0, 0, 46, h);
    ['#5b8cff', '#a06bff', '#ff9d57', '#3fd49a', '#ff6f8b'].forEach((cl, i) => {
      g.fillStyle = cl; g.fillRect(10, 28 + i * 42, 26, 26);
    });
    g.fillStyle = '#272c40'; g.fillRect(64, 18, w - 200, h - 36);
    g.fillStyle = '#e8b04a'; g.fillRect(150, 110, 150, 30);
    g.fillStyle = '#c45b3c'; g.fillRect(150, 140, 150, 22);
    g.fillStyle = '#7fae5a'; g.fillRect(150, 162, 150, 14);
    g.fillStyle = '#e8b04a'; g.fillRect(150, 176, 150, 30);
    g.fillStyle = '#2a3047'; g.fillRect(w - 128, 18, 110, h - 36);
    for (let i = 0; i < 6; i++) {
      g.fillStyle = 'rgba(255,255,255,0.10)'; g.fillRect(w - 118, 34 + i * 28, 90, 16);
    }
  });
  t.flipY = false; t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

async function loadRoom(room: THREE.Group, hotspots: Map<string, THREE.Group>, anisotropy: number) {
  const draco = new DRACOLoader();
  draco.setDecoderPath('/draco/');
  const loader = new GLTFLoader();
  loader.setDRACOLoader(draco);
  const gltf = await loader.loadAsync(MODEL_URL);
  draco.dispose();

  let atlas: THREE.Texture | null = null;
  gltf.scene.traverse(o => {
    const m = (o as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
    if (!atlas && m?.map && m.name === 'baked') atlas = m.map;
  });
  if (atlas) (atlas as THREE.Texture).anisotropy = anisotropy;  // steadier texture on surfaces seen at a slant
  const baked = new THREE.MeshBasicMaterial({ map: atlas });
  const frameGlasses: THREE.Mesh[] = [];

  gltf.scene.traverse(o => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    if (mesh.name === 'screen') {
      mesh.material = new THREE.MeshBasicMaterial({ map: screenTexture() });
    } else if (mesh.name.startsWith('frame_glass_')) {
      mesh.material = new THREE.MeshBasicMaterial({ color: 0x9b98a6 });
      mesh.userData.frameGroup = mesh.parent;
      frameGlasses[Number(mesh.name.slice(12))] = mesh;
    } else {
      mesh.material = baked;
    }
  });
  // frame borders also pop their frame on hover
  gltf.scene.traverse(o => {
    if ((o as THREE.Mesh).isMesh && o.name.startsWith('frame_border_')) o.userData.frameGroup = o.parent;
  });

  // Hotspots: each group gets its own copy of the atlas material so hover can brighten it alone
  gltf.scene.traverse(o => {
    if (!o.name.startsWith('hs_')) return;
    const key = o.name.slice(3);
    const g = o as THREE.Group;
    g.userData.section = key;
    hotspots.set(key, g);
    if (key === 'galerie') return;
    const own = baked.clone();
    g.traverse(c => { const cm = c as THREE.Mesh; if (cm.isMesh && cm.material === baked) cm.material = own; });
    g.userData.hoverMat = own;
  });

  room.add(gltf.scene);
  return frameGlasses;
}

// """ COMPONENT """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
export default function DioramaScene({ onSectionOpen, isDark = true, lang = 'de', activeKey = null }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const svgLinesRef = useRef<(SVGLineElement | null)[]>([]);
  const svgDotsRef  = useRef<(SVGCircleElement | null)[]>([]);
  const svgRingsRef = useRef<(SVGCircleElement | null)[]>([]);
  const svgGradsRef = useRef<(SVGLinearGradientElement | null)[]>([]);
  const chipElsRef  = useRef<(HTMLButtonElement | null)[]>([]);
  const annoScreenRef = useRef<Record<string, { ox: number; oy: number }>>({});
  const pulseHotspotRef = useRef<(key: string) => void>(() => {});
  const [glow, setGlow] = useState<{ x: number; y: number; ac: string; id: number } | null>(null);
  const [loaded, setLoaded] = useState(false);
  const threeRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    cam: THREE.OrthographicCamera;
    room: THREE.Group;
    hotspots: Map<string, THREE.Group>;
    targetRot: number;
    curRot: number;
    lastInteract: number;
    raf: number;
    ro: ResizeObserver;
  } | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    const container = containerRef.current;
    if (!mount || !container) return;

    const W = mount.clientWidth || 900;
    const H = mount.clientHeight || 560;

    const scene = new THREE.Scene();

    // Responsive orthographic framing: always keep at least HALF_W of horizontal
    // world half-extent visible so the WHOLE room fits on portrait/mobile, and
    // ease the vertical frustum toward square as we zoom out so the room keeps
    // natural proportions instead of ballooning with empty margin.
    const HALF_W = 8.6;
    const frustum = (aspect: number) => {
      const dd = Math.max(5.6, HALF_W / aspect);
      const k = Math.min(Math.max((dd - 5.6) / 4.0, 0), 1); // 0 = desktop, 1 = very narrow
      const tM = 1.55 + (1.00 - 1.55) * k; // tighten top headroom on mobile
      const bM = 0.80 + (0.62 - 0.80) * k;
      return { left: -dd * aspect, right: dd * aspect, top: dd * tM, bottom: -dd * bM };
    };
    const f0 = frustum(W / H);
    const cam = new THREE.OrthographicCamera(f0.left, f0.right, f0.top, f0.bottom, -50, 100);
    const off = new THREE.Vector3(1, 0.92, 1).normalize().multiplyScalar(40);
    cam.position.copy(off);
    cam.lookAt(new THREE.Vector3(0, 1.5, 0));

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // No lights: the model's lighting is baked into its texture (blender/diorama.py)
    const room = new THREE.Group();
    scene.add(room);
    const hotspots = new Map<string, THREE.Group>();
    let frameGroups: THREE.Group[] = [];
    let hoveredFg: THREE.Group | null = null;
    let disposed = false;

    // Project thumbnails for the 12 wall frames — cropped to fill (object-fit: cover)
    const FRAME_IMGS = [
      '/img/projects/mosaic-sentinel.webp',
      '/img/projects/mosaic-savings.webp',
      '/img/projects/branding-thumbnail.webp',
      '/img/projects/photography.webp',
      '/img/projects/studybuddy-thumbnail.webp',
      '/img/projects/schwimmspass-thumbnail.webp',
      '/img/projects/obsidian-thumbnail.webp',
      '/img/projects/ecothread.webp',
      '/img/projects/graphic-design.png',
      '/img/projects/posters.webp',
      '/img/projects/3D_model.webp',
      '/img/projects/vegetables-calendar.png',
    ];
    const FRAME_ASPECT = 0.74 / 0.98;
    loadRoom(room, hotspots, Math.min(8, renderer.capabilities.getMaxAnisotropy())).then((frameGlasses) => {
      if (disposed) return;
      frameGroups = frameGlasses.map(g => g.parent as THREE.Group);
      const texLoader = new THREE.TextureLoader();
      FRAME_IMGS.forEach((src, i) => {
        const glass = frameGlasses[i];
        if (!glass) return;
        texLoader.load(src, (t) => {
          t.colorSpace = THREE.SRGBColorSpace;
          t.flipY = false;
          const img = t.image as { width: number; height: number };
          const ia = img.width / img.height;
          if (ia > FRAME_ASPECT) { t.repeat.set(FRAME_ASPECT / ia, 1); t.offset.set((1 - FRAME_ASPECT / ia) / 2, 0); }
          else { t.repeat.set(1, ia / FRAME_ASPECT); t.offset.set(0, (1 - ia / FRAME_ASPECT) / 2); }
          const m = glass.material as THREE.MeshBasicMaterial;
          m.map = t; m.color.set(0xffffff); m.needsUpdate = true;
        });
      });
      setLoaded(true);
    }).catch((err) => { console.warn('Diorama model failed to load', err); });

    // Prep annotation anchors
    const anchorVecs = ANNOS.map(a => new THREE.Vector3(...a.anchor));

    // Drag rotation
    let targetRot = 0;
    let curRot = 0;
    let lastInteract = -9999;
    let dragging = false;
    let moved = 0;
    let lastX = 0;
    let hoverKey: string | null = null;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function hoverPick() {
      raycaster.setFromCamera(mouse, cam);
      const hits = raycaster.intersectObject(room, true);
      let key: string | null = null;
      for (const h of hits) {
        let o: THREE.Object3D | null = h.object;
        while (o) {
          if (o.userData?.section) { key = o.userData.section as string; break; }
          o = o.parent;
        }
        if (key) break;
      }
      if (key !== hoverKey) {
        hoverKey = key;
        hotspots.forEach((g, k) => {
          if (k === 'galerie') return; // handled per-frame below
          const on = k === key;
          (g.userData.hoverMat as THREE.MeshBasicMaterial | undefined)?.color.setScalar(on ? 1.14 : 1);
          g.scale.setScalar(on ? 1.045 : 1);
        });
        renderer.domElement.style.cursor = key ? 'pointer' : 'grab';
      }
      // Individual frame pop " find which fg group was hit
      let hitFg: THREE.Group | null = null;
      if (key === 'galerie') {
        for (const h of hits) {
          if (h.object.userData.frameGroup) {
            hitFg = h.object.userData.frameGroup as THREE.Group;
            break;
          }
        }
      }
      if (hitFg !== hoveredFg) {
        hoveredFg = hitFg;
        frameGroups.forEach(fg => fg.scale.setScalar(fg === hitFg ? 1.13 : 1));
      }
    }

    const el = renderer.domElement;
    const onDown = (e: MouseEvent | TouchEvent) => {
      dragging = true; moved = 0;
      lastX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      el.style.cursor = 'grabbing';
    };
    const onMove = (e: MouseEvent | TouchEvent) => {
      const cx = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const cy = 'touches' in e ? e.touches[0].clientY : e.clientY;
      if (dragging) {
        const dx = cx - lastX; lastX = cx; moved += Math.abs(dx);
        targetRot = Math.max(-0.85, Math.min(0.85, targetRot + dx * 0.006));
        lastInteract = performance.now();
      }
      const r = el.getBoundingClientRect();
      mouse.x = ((cx - r.left) / r.width) * 2 - 1;
      mouse.y = -((cy - r.top) / r.height) * 2 + 1;
      hoverPick();
    };
    const onUp = (e: MouseEvent | TouchEvent) => {
      if (dragging && moved < 6 && hoverKey) {
        onSectionOpen(hoverKey);
      }
      dragging = false;
      el.style.cursor = hoverKey ? 'pointer' : 'grab';
      void e;
    };

    el.addEventListener('mousedown', onDown as EventListener);
    window.addEventListener('mousemove', onMove as EventListener);
    window.addEventListener('mouseup', onUp as EventListener);
    el.addEventListener('touchstart', onDown as EventListener, { passive: true });
    el.addEventListener('touchmove', onMove as EventListener, { passive: true });
    el.addEventListener('touchend', onUp as EventListener);

    // Update SVG annotations — chips are fixed to lx/ly corners, only dot follows 3D anchor
    function updateAnnos() {
      const cW = container!.clientWidth;
      const cH = container!.clientHeight;
      if (!cW || !cH) return;
      const euler = new THREE.Euler(0, curRot, 0);
      ANNOS.forEach((a, i) => {
        // Chips size to their label now — measure the real width (offsetWidth ignores the hover scale)
        const CHIP_W = chipElsRef.current[i]?.offsetWidth || 200;
        const v = anchorVecs[i].clone().applyEuler(euler).project(cam);
        const ox = (v.x * 0.5 + 0.5) * cW;
        const oy = (-v.y * 0.5 + 0.5) * cH;
        annoScreenRef.current[a.key] = { ox, oy };
        const isLeft = a.side === 'left';

        // Chip stays at its fixed lx/ly corner — never overlaps the 3D model
        const cx = Math.max(8, Math.min(cW - CHIP_W - 8, a.lx * cW));
        const cy = Math.max(36, Math.min(cH - 40, a.ly * cH));

        // SVG line runs from chip's inner edge to the animated anchor dot
        const lxPx = isLeft ? cx + CHIP_W : cx;
        const lyPx = cy;

        const ln = svgLinesRef.current[i];
        if (ln) { ln.setAttribute('x1', lxPx.toFixed(1)); ln.setAttribute('y1', lyPx.toFixed(1)); ln.setAttribute('x2', ox.toFixed(1)); ln.setAttribute('y2', oy.toFixed(1)); }
        const dt = svgDotsRef.current[i];
        if (dt) { dt.setAttribute('cx', ox.toFixed(1)); dt.setAttribute('cy', oy.toFixed(1)); }
        const rg = svgRingsRef.current[i];
        if (rg) { rg.setAttribute('cx', ox.toFixed(1)); rg.setAttribute('cy', oy.toFixed(1)); }
        const grd = svgGradsRef.current[i];
        if (grd) {
          grd.setAttribute('x1', lxPx.toFixed(1));
          grd.setAttribute('y1', lyPx.toFixed(1));
          grd.setAttribute('x2', ox.toFixed(1));
          grd.setAttribute('y2', oy.toFixed(1));
        }

        // Position chip button directly via DOM (avoids React re-renders)
        // On mobile (≤640px), chips are icon-only circles centered on anchor via translate(-50%,-50%)
        const chip = chipElsRef.current[i];
        if (chip) {
          if (cW <= 640) {
            chip.style.left = `${ox}px`;
            chip.style.top  = `${oy}px`;
          } else {
            chip.style.left = `${cx}px`;
            chip.style.top  = `${cy}px`;
          }
        }
      });
    }

    // Scale-bounce a hotspot when its mobile-menu button is tapped
    const pulseMap = new Map<string, number>();
    pulseHotspotRef.current = (key: string) => { pulseMap.set(key, performance.now()); };

    let rafId = 0;
    const loop = (t: number) => {
      const idle = (performance.now() - lastInteract) > 2600;
      const sway = idle ? Math.sin(t * 0.00035) * 0.16 : 0;
      curRot += ((targetRot + sway) - curRot) * 0.08;
      room.rotation.y = curRot;
      if (pulseMap.size) {
        const nowP = performance.now();
        pulseMap.forEach((start, key) => {
          const g = hotspots.get(key);
          if (!g) { pulseMap.delete(key); return; }
          const p = (nowP - start) / 620;
          if (p >= 1) { g.scale.setScalar(1); pulseMap.delete(key); return; }
          g.scale.setScalar(1 + 0.13 * Math.sin(p * Math.PI));
        });
      }
      renderer.render(scene, cam);
      updateAnnos();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    // ResizeObserver
    const ro = new ResizeObserver(() => {
      const w2 = mount.clientWidth, h2 = mount.clientHeight;
      if (!w2 || !h2) return;
      const f = frustum(w2 / h2);
      cam.left = f.left; cam.right = f.right;
      cam.top = f.top; cam.bottom = f.bottom;
      cam.updateProjectionMatrix();
      renderer.setSize(w2, h2);
    });
    ro.observe(mount);

    threeRef.current = { renderer, scene, cam, room, hotspots, targetRot, curRot, lastInteract, raf: rafId, ro };

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      ro.disconnect();
      el.removeEventListener('mousedown', onDown as EventListener);
      window.removeEventListener('mousemove', onMove as EventListener);
      window.removeEventListener('mouseup', onUp as EventListener);
      renderer.dispose();
      if (mount.contains(el)) mount.removeChild(el);
    };
  }, [onSectionOpen, isDark]);

  // Mobile menu tap → pop the 3D object, flash a glow on its spot, and open
  // the panel so it appears to emerge from that part of the diorama.
  const openFromDiorama = (key: string) => {
    const pos = annoScreenRef.current[key];
    const rect = containerRef.current?.getBoundingClientRect();
    let origin: { x: number; y: number } | undefined;
    if (pos && rect) {
      origin = { x: rect.left + pos.ox, y: rect.top + pos.oy };
      const ac = (CHIP_ACCENTS[key] ?? [255, 179, 122]).join(',');
      const id = Date.now();
      setGlow({ x: pos.ox, y: pos.oy, ac, id });
      pulseHotspotRef.current?.(key);
      window.setTimeout(() => setGlow(g => (g && g.id === id ? null : g)), 720);
    }
    onSectionOpen(key, origin);
  };

  return (
    <>
    <div ref={containerRef} className="diorama-canvas" style={{ position: 'relative', width: '100%', height: 'min(740px, 78svh)' }}>
      {/* Three.js canvas */}
      <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} />

      {/* Loading spinner */}
      {!loaded && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: isDark ? 'var(--text-2)' : 'var(--text-2)', fontSize: '13px', fontWeight: 600 }}>
            <span style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.028)', borderTopColor: 'var(--accent)', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
            Loading the room
          </div>
        </div>
      )}

      {/* SVG connecting lines */}
      <svg
        className="diorama-annos-svg"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}
        aria-hidden="true"
      >
        <defs>
          {/* Liquid-glass refraction filter for the chip icon circles */}
          <filter id="lg-liquid-glass" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.014 0.022" numOctaves="2" seed="7" result="noise" />
            <feGaussianBlur in="noise" stdDeviation="2.4" result="softNoise" />
            <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="16" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          {ANNOS.map((a, i) => {
            const [r,g,b] = CHIP_ACCENTS[a.key] ?? [255, 179, 122];
            const hex = `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
            return (
              <linearGradient
                key={i}
                id={`lg-anno-grad-${i}`}
                ref={(el: SVGLinearGradientElement | null) => { svgGradsRef.current[i] = el; }}
                gradientUnits="userSpaceOnUse"
                x1="0" y1="0" x2="0" y2="0"
              >
                <stop offset="0%"   stopColor={hex} stopOpacity="0.95" />
                <stop offset="55%"  stopColor={hex} stopOpacity="0.40" />
                <stop offset="100%" stopColor={hex} stopOpacity="0.00" />
              </linearGradient>
            );
          })}
        </defs>

        {ANNOS.map((a, i) => {
          const [r,g,b] = CHIP_ACCENTS[a.key] ?? [255, 179, 122];
          const col    = `rgba(${r},${g},${b},0.80)`;
          const dotCol = `rgba(${Math.min(r+30,255)},${Math.min(g+30,255)},${Math.min(b+30,255)},0.95)`;
          const delay = `${i * 0.44}s`;
          return (
            <g key={ANNOS[i].key}>
              {/* Dashed gradient line " marching ants animation */}
              <line
                ref={el => { svgLinesRef.current[i] = el; }}
                stroke={`url(#lg-anno-grad-${i})`}
                strokeWidth="2.8"
                strokeDasharray="6 7"
                strokeLinecap="round"
                x1="0" y1="0" x2="0" y2="0"
                style={{ animation: `marchAnno 2.2s linear ${delay} infinite` }}
              />
              {/* Outer pulsing ring at anchor */}
              <circle
                ref={el => { svgRingsRef.current[i] = el; }}
                cx="0" cy="0" r="5"
                fill="none" stroke={col} strokeWidth="1.2"
              >
                <animate attributeName="r"             values="4;11;4"    dur="2.6s" begin={delay} repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" values="0.8;0;0.8" dur="2.6s" begin={delay} repeatCount="indefinite" />
              </circle>
              {/* Center dot */}
              <circle
                ref={el => { svgDotsRef.current[i] = el; }}
                cx="0" cy="0" r="3"
                fill={dotCol}
              >
                <animate attributeName="opacity" values="1;0.4;1" dur="2.6s" begin={delay} repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* Annotation chips " toggle glass style */}
      {ANNOS.map((a, i) => {
        const ac = CHIP_ACCENTS[a.key] ?? [255, 179, 122];
        const acStr = ac.join(',');
        return (
          <Fragment key={a.key}>
            {/* Hotspot button — 52px · radius 14 · icon tile + number + label + chevron.
                Same fixed corner positions as before; only the look changed. */}
            <button
              ref={el => { chipElsRef.current[i] = el; }}
              type="button"
              onClick={() => onSectionOpen(a.key)}
              aria-label={`Open ${annoLabels[a.key]?.[lang] ?? a.label} panel`}
              aria-pressed={activeKey === a.key}
              className="lg-anno hs-btn lq"
              style={{
                '--ac': acStr,
                left: `${a.lx * 100}%`,
                top: `${a.ly * 100}%`,
              } as React.CSSProperties}
            >
              <span className="hs-tile">{getAnnoIcon(a.key, isDark)}</span>
              <span className="hs-text">
                <span className="hs-num">{a.num}</span>
                {annoLabels[a.key]?.[lang] ?? a.label}
              </span>
              <svg className="hs-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>

          </Fragment>
        );
      })}

      {/* Drag hint */}
      <div className="lq-pill diorama-hint" style={{ position: 'absolute', left: '50%', bottom: '-36px', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 18px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', color: isDark ? 'var(--text-2)' : 'var(--text-2)', pointerEvents: 'none', whiteSpace: 'nowrap', boxShadow: isDark ? '0 0 16px rgba(255,95,0,0.18) inset, 0 4px 16px rgba(0,0,0,0.35)' : '0 4px 16px rgba(0,0,0,0.10)', animation: 'scrollBob 3s ease-in-out infinite' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M9 11V6a2 2 0 0 1 4 0v5"/><path d="M13 8a2 2 0 0 1 4 0v4"/><path d="M17 9.5a2 2 0 0 1 4 0V15a6 6 0 0 1-6 6h-2a6 6 0 0 1-5.3-3.2L4.5 13a2 2 0 0 1 3.5-2"/></svg>
        {ui[lang].dioramaHint}
      </div>

      {/* Emerge glow — lights up the tapped section's spot on the diorama */}
      {glow && (
        <span
          key={glow.id}
          className="diorama-glow"
          style={{ left: glow.x, top: glow.y, ['--gac']: glow.ac } as React.CSSProperties}
        />
      )}
    </div>

    {/* Mobile-only labeled section menu — replaces the floating iso chips on
        phones, where they'd overlap unlabeled and taps are unreliable. */}
    <nav className="diorama-mobile-menu" aria-label={lang === 'en' ? 'Sections' : lang === 'es' ? 'Secciones' : 'Bereiche'}>
      {ANNOS.map((a) => {
        const ac = (CHIP_ACCENTS[a.key] ?? [255, 179, 122]).join(',');
        return (
          <button
            key={a.key}
            type="button"
            onClick={() => openFromDiorama(a.key)}
            className="dm-btn lq"
            style={{ '--ac': ac } as React.CSSProperties}
          >
            <span className="dm-ic">{getAnnoIcon(a.key, false)}</span>
            <span className="dm-label">{annoLabels[a.key]?.[lang] ?? a.label}</span>
          </button>
        );
      })}
    </nav>
    </>
  );
}

