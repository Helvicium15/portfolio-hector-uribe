'use client';
import { useEffect, useRef, useState, Fragment } from 'react';
import * as THREE from 'three';
import { ANNOS } from '@/lib/data';
import { type Lang, annoLabels, ui } from '@/lib/i18n';

/* Iridescent accent colors per chip — inspired by the glass-lettering palette */
const CHIP_ACCENTS: Record<string, [number,number,number]> = {
  info:    [131, 202, 226],   /* sky blue           */
  galerie: [254, 134, 132],   /* coral accent       */
  kontakt: [131, 202, 226],   /* sky blue           */
  skills:  [131, 202, 226],   /* sky blue           */
  hobbys:  [254, 134, 132],   /* coral accent       */
};

// Theme-aware SVG icons for annotation chips
function getAnnoIcon(key: string, isDark: boolean): React.ReactNode {
  const c = isDark ? 'white' : 'rgba(35,38,68,0.72)';
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
  onSectionOpen: (key: string) => void;
  isDark?: boolean;
  lang?: Lang;
}

// """ helpers (same as remake) """""""""""""""""""""""""""""""""""""""""""""""""
function tex(w: number, h: number, draw: (g: CanvasRenderingContext2D, w: number, h: number) => void) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d')!, w, h);
  const t = new THREE.CanvasTexture(c); t.anisotropy = 4; return t;
}
function mat(color: string, opts?: Partial<THREE.MeshStandardMaterialParameters>) {
  return new THREE.MeshStandardMaterial({ color: new THREE.Color(color), roughness: 0.92, metalness: 0.02, flatShading: true, ...opts });
}
function box(w: number, h: number, d: number, m: THREE.Material) {
  return new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
}

// """ Build room """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
function buildRoom(room: THREE.Group, hotspots: Map<string, THREE.Group>, isDarkMode: boolean): THREE.Mesh[] {
  function tag(g: THREE.Group, key: string) {
    g.userData.section = key; hotspots.set(key, g);
  }

  // FLOOR " modern light-ash engineered wood
  const floorTex = tex(512, 512, (g, w, h) => {
    g.fillStyle = '#c8b89a'; g.fillRect(0, 0, w, h);
    const pw = 52;
    for (let i = 0; i <= w; i += pw) {
      const grd = g.createLinearGradient(i, 0, i + pw, 0);
      grd.addColorStop(0,   'rgba(255,255,255,0.07)');
      grd.addColorStop(0.5, 'rgba(0,0,0,0)');
      grd.addColorStop(1,   'rgba(0,0,0,0.08)');
      g.fillStyle = grd; g.fillRect(i, 0, pw, h);
      g.strokeStyle = 'rgba(80,60,40,0.22)'; g.lineWidth = 1.5;
      g.beginPath(); g.moveTo(i, 0); g.lineTo(i, h); g.stroke();
    }
    for (let y = 0; y < h; y += 180) {
      g.strokeStyle = 'rgba(80,60,40,0.10)'; g.lineWidth = 1;
      g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke();
    }
  });
  const floor = box(10, 0.4, 10, mat('#c8b89a', { map: floorTex, roughness: 0.88 }));
  floor.position.y = -0.2; room.add(floor);
  const skirt = box(10.1, 0.5, 10.1, mat('#9e8a72'));
  skirt.position.y = -0.6; room.add(skirt);

  // WALLS " cool neutral with slight purple tint
  const wallMat  = mat(isDarkMode ? '#3a3d52' : '#d8d5e5', { roughness: 0.96 });
  const wallMat2 = mat(isDarkMode ? '#343748' : '#ccc9dc', { roughness: 0.96 });
  const wallL = box(0.3, 6, 10, wallMat);
  wallL.position.set(-5, 3, 0); room.add(wallL);

  const shape = new THREE.Shape();
  shape.moveTo(-5, 0); shape.lineTo(5, 0); shape.lineTo(5, 3.7);
  shape.lineTo(1.0, 6); shape.lineTo(-5, 6); shape.lineTo(-5, 0);
  const wallRGeo = new THREE.ExtrudeGeometry(shape, { depth: 0.3, bevelEnabled: false });
  const wallR = new THREE.Mesh(wallRGeo, wallMat2);
  wallR.position.set(0, 0, -5); room.add(wallR);

  // PICTURE FRAMES (hotspot: galerie)
  const frames = new THREE.Group();
  const frameMat = mat('#b9694a', { roughness: 0.7 });
  const frameGlasses: THREE.Mesh[] = [];
  for (let r = 0; r < 3; r++) {
    for (let c2 = 0; c2 < 4; c2++) {
      const fg = new THREE.Group();
      const border2 = box(0.88, 1.12, 0.07, frameMat);
      // Individual material per frame so each can receive its own texture
      const gm = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#9b98a6'),
        roughness: 0.5, metalness: 0.1,
        transparent: true, opacity: 0.55,
        emissive: new THREE.Color(0x2a2a33),
      });
      const glass = box(0.74, 0.98, 0.09, gm);
      // Mark meshes so per-frame hover can find their parent group
      border2.userData.frameGroup = fg;
      glass.userData.frameGroup = fg;
      fg.add(border2); fg.add(glass);
      fg.position.set(-2.95 + c2 * 1.97, 3.7 - r * 1.38, -4.62);
      frames.add(fg);
      frameGlasses.push(glass);
    }
  }
  tag(frames, 'galerie'); room.add(frames);

  // AC UNIT
  const ac = new THREE.Group();
  const acBody = box(0.4, 0.9, 2.4, mat('#eceaf0', { roughness: 0.6 }));
  acBody.position.set(-4.74, 0, 0);
  const acGrille = box(0.18, 0.34, 2.0, mat('#cfcdd6'));
  acGrille.position.set(-4.52, -0.2, 0);
  ac.add(acBody); ac.add(acGrille);
  ac.position.set(0, 4.7, -2.6); room.add(ac);

  // RUG
  const rug = box(4.6, 0.06, 4.6, mat('#2e3248', { roughness: 1 }));
  rug.position.set(0.4, 0.04, 0.6); room.add(rug);

  // DESK (hotspot: info) " modern minimal, light-oak top + matte-black hairpin frame
  const desk = new THREE.Group();
  const woodTop = mat('#d4c9b2', { roughness: 0.55, metalness: 0.0 });
  const metalLeg = mat('#1c1e28', { roughness: 0.35, metalness: 0.72 });
  const top = box(2.0, 0.08, 3.4, woodTop);
  top.position.set(0, 1.5, 0); desk.add(top);
  // hairpin-style legs: two thin rods per corner meeting at a single foot
  [[-0.82, -1.52], [0.82, -1.52], [-0.82, 1.52], [0.82, 1.52]].forEach(([px, pz]) => {
    const leg = box(0.07, 1.48, 0.07, metalLeg);
    leg.position.set(px, 0.75, pz); desk.add(leg);
  });
  const monStand = box(0.18, 0.5, 0.18, metalLeg);
  monStand.position.set(-0.6, 1.82, -0.3); desk.add(monStand);
  const monBase = box(0.45, 0.05, 0.7, metalLeg);
  monBase.position.set(-0.6, 1.58, -0.3); desk.add(monBase);

  const screenTex = tex(512, 320, (g, w, h) => {
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
  const screen = box(0.08, 1.18, 1.66, new THREE.MeshStandardMaterial({
    map: screenTex, emissive: new THREE.Color(0x223344),
    emissiveIntensity: 0.6, roughness: 0.4, flatShading: true,
  }));
  screen.position.set(-0.5, 2.52, -0.3); desk.add(screen);
  const screenBack = box(0.06, 1.24, 1.72, mat('#2b2f3d'));
  screenBack.position.set(-0.56, 2.52, -0.3); desk.add(screenBack);

  const tablet = box(0.62, 0.05, 0.92, mat('#33384a', { roughness: 0.5 }));
  tablet.position.set(0.12, 1.59, 0.25); desk.add(tablet);
  const tabActive = box(0.42, 0.055, 0.72, mat('#5b6076', { roughness: 0.6 }));
  tabActive.position.set(0.12, 1.595, 0.25); desk.add(tabActive);
  const stylus = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8), mat('#222'));
  stylus.rotation.x = Math.PI / 2; stylus.rotation.z = 0.2;
  stylus.position.set(0.42, 1.62, 0.5); desk.add(stylus);

  const mouse = box(0.16, 0.06, 0.24, mat('#e6e3ea'));
  mouse.position.set(0.62, 1.59, -0.05); desk.add(mouse);

  const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.11, 0.32, 16), mat('#caa06e'));
  cup.position.set(-0.68, 1.72, 1.05); desk.add(cup);
  ['#5b8cff', '#ff6f8b', '#3fd49a'].forEach((cl, i) => {
    const pen = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.42, 8), mat(cl));
    pen.position.set(-0.68, 1.92, 1.05 + (i - 1) * 0.05);
    pen.rotation.x = (i - 1) * 0.12; desk.add(pen);
  });

  const nb = box(0.62, 0.07, 0.9, mat('#2c2f3a'));
  nb.position.set(-0.12, 1.585, 1.0); nb.rotation.y = 0.1; desk.add(nb);
  const nbBand = box(0.64, 0.075, 0.1, mat('#c45b6a'));
  nbBand.position.set(-0.12, 1.59, 1.0); nbBand.rotation.y = 0.1; desk.add(nbBand);

  ['#6a7bdc', '#c45b6a', '#3fae8e', '#d8a24a'].forEach((cl, i) => {
    const bk = box(0.46, 0.6, 0.11, mat(cl));
    bk.position.set(-0.46, 1.86, -1.45 + i * 0.13);
    bk.rotation.x = (i - 1.5) * 0.05; desk.add(bk);
  });

  const potS = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.11, 0.22, 12), mat('#d9d4cc'));
  potS.position.set(0.06, 1.67, -1.28); desk.add(potS);
  const suc = new THREE.Mesh(new THREE.SphereGeometry(0.17, 10, 8), mat('#5f9d63'));
  suc.position.set(0.06, 1.85, -1.28); suc.scale.set(1, 0.8, 1); desk.add(suc);

  const phone = box(0.3, 0.04, 0.56, mat('#3a3f4d', { roughness: 0.4 }));
  phone.position.set(0.42, 1.585, -1.4); phone.rotation.y = -0.15; desk.add(phone);

  desk.position.set(-3.15, 0, -1.4);
  tag(desk, 'info'); room.add(desk);

  // OFFICE CHAIR " modern ergonomic mesh (dark navy + matte-black base)
  const chair = new THREE.Group();
  const meshFabric  = mat('#1a1d2e', { roughness: 0.80 });
  const seatFoam    = mat('#22263a', { roughness: 0.70 });
  const seat = box(0.95, 0.16, 0.95, seatFoam); seat.position.y = 0.95; chair.add(seat);
  const back = box(0.16, 1.05, 0.92, meshFabric); back.position.set(0.44, 1.52, 0); chair.add(back);
  const headrest = box(0.14, 0.30, 0.72, meshFabric); headrest.position.set(0.44, 2.08, 0); chair.add(headrest);
  const armLMat = mat('#2a2d3e', { roughness: 0.55, metalness: 0.3 });
  const armL = box(0.62, 0.08, 0.14, armLMat); armL.position.set(0, 1.18, -0.48); chair.add(armL);
  const armR = armL.clone(); armR.position.z = 0.48; chair.add(armR);
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.72, 12), metalLeg);
  post.position.y = 0.5; chair.add(post);
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const ft = box(0.48, 0.06, 0.08, metalLeg);
    ft.position.set(Math.cos(a) * 0.30, 0.10, Math.sin(a) * 0.30);
    ft.rotation.y = -a; chair.add(ft);
    const wh = new THREE.Mesh(new THREE.SphereGeometry(0.065, 8, 6), mat('#18191f'));
    wh.position.set(Math.cos(a) * 0.48, 0.07, Math.sin(a) * 0.48); chair.add(wh);
  }
  chair.position.set(-1.55, 0, -1.05); chair.rotation.y = -0.22; room.add(chair);

  // PLANT (hotspot: kontakt)
  const plant = new THREE.Group();
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.30, 0.7, 18), mat('#e7e2da', { roughness: 0.85 }));
  pot.position.y = 0.35; plant.add(pot);
  const soil = new THREE.Mesh(new THREE.CylinderGeometry(0.37, 0.37, 0.06, 18), mat('#3a2a20'));
  soil.position.y = 0.68; plant.add(soil);
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 2.1, 8), mat('#6e5a3e'));
  trunk.position.y = 1.7; plant.add(trunk);
  const leafMat1 = mat('#6f9152', { roughness: 0.8 });
  const leafMat2 = mat('#5c7e45', { roughness: 0.8 });
  for (let i = 0; i < 16; i++) {
    const a2 = i * 2.399;
    const yy = 1.15 + i * 0.095;
    const rad = 0.34 + (i % 3) * 0.1;
    const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.4, 12, 9), i % 2 ? leafMat1 : leafMat2);
    leaf.scale.set(1.0, 0.42, 0.78);
    leaf.position.set(Math.cos(a2) * rad, yy, Math.sin(a2) * rad);
    leaf.rotation.y = -a2; leaf.rotation.z = 0.42; plant.add(leaf);
  }
  plant.position.set(-4.25, 0, 1.45);
  tag(plant, 'kontakt'); room.add(plant);

  // CABINET (hotspot: skills) " sleek off-white lacquer, floating on slim legs
  const cab = new THREE.Group();
  const cabMat  = mat('#eae6f4', { roughness: 0.22, metalness: 0.08 });
  const cabMat2 = mat('#ddd9ec', { roughness: 0.22, metalness: 0.08 });
  const cb = box(1.4, 1.72, 0.92, cabMat); cb.position.y = 0.98; cab.add(cb);
  const seam = box(0.025, 1.44, 0.94, cabMat2); seam.position.set(0, 0.98, 0); cab.add(seam);
  // minimal recessed bar handles
  [[-0.22], [0.22]].forEach(([px]) => {
    const hd = box(0.03, 0.22, 0.03, mat('#a8a4bc', { roughness: 0.3, metalness: 0.5 }));
    hd.position.set(px, 0.98, 0.48); cab.add(hd);
  });
  const cabTop = box(1.46, 0.06, 0.96, mat('#f0ecf8', { roughness: 0.18 })); cabTop.position.y = 1.86; cab.add(cabTop);
  // slim floating legs instead of block feet
  [[-0.55, -0.35], [0.55, -0.35], [-0.55, 0.35], [0.55, 0.35]].forEach(([px, pz]) => {
    const lg = box(0.06, 0.20, 0.06, mat('#1c1e28', { roughness: 0.35, metalness: 0.7 }));
    lg.position.set(px, 0.10, pz); cab.add(lg);
  });
  cab.position.set(-4.3, 0, 3.0); cab.rotation.y = Math.PI / 2;
  tag(cab, 'skills'); room.add(cab);

  // ARMCHAIR (hotspot: profil) " low Scandinavian lounge chair, slate-blue fabric + walnut legs
  const arm = new THREE.Group();
  const ch2     = mat('#2e3254', { roughness: 0.75 });  // deep slate-blue
  const cushMat = mat('#363a5c', { roughness: 0.70 });
  const aSeat = box(1.5, 0.38, 1.38, ch2); aSeat.position.y = 0.56; arm.add(aSeat);
  const aBack = box(1.5, 1.0, 0.32, ch2); aBack.position.set(0, 1.10, -0.55); arm.add(aBack);
  const aArmL = box(0.28, 0.52, 1.38, ch2); aArmL.position.set(-0.62, 0.78, 0); arm.add(aArmL);
  const aArmR = aArmL.clone(); aArmR.position.x = 0.62; arm.add(aArmR);
  const cush = box(1.24, 0.16, 1.08, cushMat); cush.position.set(0, 0.78, 0.04); arm.add(cush);
  // walnut tapered legs
  const legMat = mat('#8a6244', { roughness: 0.55, metalness: 0.04 });
  [[-0.58, -0.52], [0.58, -0.52], [-0.58, 0.52], [0.58, 0.52]].forEach(([px, pz]) => {
    const ft = box(0.09, 0.38, 0.09, legMat);
    ft.position.set(px, 0.19, pz); arm.add(ft);
  });
  arm.position.set(3.05, 0, 0.35); arm.rotation.y = -0.82;
  room.add(arm); // sin hotspot

  // COFFEE TABLE (hotspot: hobbys) " smoked glass top + matte black legs
  const ct = new THREE.Group();
  const glassTex = mat('#b0b8c8', { roughness: 0.08, metalness: 0.18, transparent: true, opacity: 0.72 });
  const ctTop2 = box(1.8, 0.06, 0.95, glassTex); ctTop2.position.y = 0.62; ct.add(ctTop2);
  [[-0.74, -0.34], [0.74, -0.34], [-0.74, 0.34], [0.74, 0.34]].forEach(([px, pz]) => {
    const lg = box(0.06, 0.60, 0.06, metalLeg); lg.position.set(px, 0.30, pz); ct.add(lg);
  });
  const dev = box(0.56, 0.1, 0.42, mat('#eef0f2', { roughness: 0.5 }));
  dev.position.set(-0.42, 0.72, -0.02); dev.rotation.y = 0.08; ct.add(dev);
  const devScreen = box(0.4, 0.105, 0.28, mat('#cfd3da'));
  devScreen.position.set(-0.42, 0.725, -0.02); devScreen.rotation.y = 0.08; ct.add(devScreen);
  const dial = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.04, 18), mat('#2a2e38'));
  dial.position.set(-0.42, 0.78, -0.02); ct.add(dial);
  const swTex = tex(256, 180, (g2, w, h) => {
    const cols = ['#ff5b5b', '#ff9d3c', '#ffd23c', '#7ed957', '#4ec3ff', '#7d6bff', '#d96bff'];
    cols.forEach((cl, i) => { g2.fillStyle = cl; g2.fillRect(i * (w / cols.length), 0, w / cols.length, h); });
  });
  const sw = box(0.62, 0.06, 0.46, new THREE.MeshStandardMaterial({ map: swTex, roughness: 0.6, flatShading: true }));
  sw.position.set(0.42, 0.71, 0.05); sw.rotation.y = -0.12; ct.add(sw);
  ct.position.set(0.3, 0, 2.9);
  tag(ct, 'hobbys'); room.add(ct);

  return frameGlasses;
}

// """ COMPONENT """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
export default function DioramaScene({ onSectionOpen, isDark = true, lang = 'de' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const svgLinesRef = useRef<(SVGLineElement | null)[]>([]);
  const svgDotsRef  = useRef<(SVGCircleElement | null)[]>([]);
  const svgRingsRef = useRef<(SVGCircleElement | null)[]>([]);
  const svgGradsRef = useRef<(SVGLinearGradientElement | null)[]>([]);
  const chipElsRef  = useRef<(HTMLButtonElement | null)[]>([]);
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
    const aspect = W / H;
    const d = 5.6;
    const cam = new THREE.OrthographicCamera(-d * aspect, d * aspect, d * 1.55, -d * 0.80, -50, 100);
    const off = new THREE.Vector3(1, 0.92, 1).normalize().multiplyScalar(40);
    cam.position.copy(off);
    cam.lookAt(new THREE.Vector3(0, 1.5, 0));

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Lighting " theme-aware, warm key + cool fill + purple accent
    scene.add(new THREE.HemisphereLight(
      isDark ? 0xc8d0f0 : 0xf4f2ff,
      isDark ? 0x1a1e30 : 0x909090,
      isDark ? 1.05 : 1.20,
    ));
    const dir = new THREE.DirectionalLight(0xfff5e8, isDark ? 1.35 : 1.45);
    dir.position.set(7, 14, 6); scene.add(dir);
    const fill = new THREE.DirectionalLight(isDark ? 0x8090e0 : 0xb8c8ff, isDark ? 0.45 : 0.52);
    fill.position.set(-8, 5, -6); scene.add(fill);
    const warm = new THREE.PointLight(0xffcaa0, isDark ? 0.70 : 0.28, 18);
    warm.position.set(-3, 2.6, -2); scene.add(warm);
    if (isDark) {
      // subtle purple accent to complement the UI palette
      const accent = new THREE.PointLight(0x7040ff, 0.28, 12);
      accent.position.set(3, 3, 2); scene.add(accent);
    }

    const room = new THREE.Group();
    scene.add(room);
    const hotspots = new Map<string, THREE.Group>();
    const frameGlasses = buildRoom(room, hotspots, isDark);
    const frameGroups = frameGlasses.map(g => g.parent as THREE.Group);
    let hoveredFg: THREE.Group | null = null;

    // Load project thumbnail images into wall frames
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
    const texLoader = new THREE.TextureLoader();
    FRAME_IMGS.forEach((src, i) => {
      if (i >= frameGlasses.length) return;
      texLoader.load(src, (t) => {
        t.colorSpace = THREE.SRGBColorSpace;
        const m = frameGlasses[i].material as THREE.MeshStandardMaterial;
        m.map = t;
        m.color.set(0xffffff);
        m.transparent = false;
        m.opacity = 1.0;
        m.roughness = 0.42;
        m.metalness = 0.0;
        m.emissive.set(0x000000);
        m.needsUpdate = true;
      });
    });

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
          g.traverse(m => {
            if ((m as THREE.Mesh).material && ((m as THREE.Mesh).material as THREE.MeshStandardMaterial).emissive) {
              ((m as THREE.Mesh).material as THREE.MeshStandardMaterial).emissive.setHex(on ? 0x4a4a55 : 0x000000);
            }
          });
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
      const CHIP_W = 186;
      ANNOS.forEach((a, i) => {
        const v = anchorVecs[i].clone().applyEuler(euler).project(cam);
        const ox = (v.x * 0.5 + 0.5) * cW;
        const oy = (-v.y * 0.5 + 0.5) * cH;
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

    let rafId = 0;
    const loop = (t: number) => {
      const idle = (performance.now() - lastInteract) > 2600;
      const sway = idle ? Math.sin(t * 0.00035) * 0.16 : 0;
      curRot += ((targetRot + sway) - curRot) * 0.08;
      room.rotation.y = curRot;
      renderer.render(scene, cam);
      updateAnnos();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    // ResizeObserver
    const ro = new ResizeObserver(() => {
      const w2 = mount.clientWidth, h2 = mount.clientHeight;
      if (!w2 || !h2) return;
      const a2 = w2 / h2;
      cam.left = -d * a2; cam.right = d * a2;
      cam.top = d * 1.55; cam.bottom = -d * 0.80;
      cam.updateProjectionMatrix();
      renderer.setSize(w2, h2);
    });
    ro.observe(mount);

    setLoaded(true);

    threeRef.current = { renderer, scene, cam, room, hotspots, targetRot, curRot, lastInteract, raf: rafId, ro };

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      el.removeEventListener('mousedown', onDown as EventListener);
      window.removeEventListener('mousemove', onMove as EventListener);
      window.removeEventListener('mouseup', onUp as EventListener);
      renderer.dispose();
      if (mount.contains(el)) mount.removeChild(el);
    };
  }, [onSectionOpen, isDark]);

  return (
    <div ref={containerRef} className="diorama-canvas" style={{ position: 'relative', width: '100%', height: 'min(740px, 78vh)' }}>
      {/* Three.js canvas */}
      <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} />

      {/* Loading spinner */}
      {!loaded && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: isDark ? 'rgba(240,244,255,0.5)' : 'rgba(20,25,60,0.5)', fontSize: '13px', fontWeight: 600 }}>
            <span style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)', borderTopColor: '#7c3aed', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
            Loading the room
          </div>
        </div>
      )}

      {/* SVG connecting lines */}
      <svg
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
            const [r,g,b] = CHIP_ACCENTS[a.key] ?? [131,202,226];
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
          const [r,g,b] = CHIP_ACCENTS[a.key] ?? [131,202,226];
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
        const ac = CHIP_ACCENTS[a.key] ?? [131, 202, 226];
        const acStr = ac.join(',');
        return (
          <Fragment key={a.key}>
            {/* Toggle-glass chip */}
            <button
              ref={el => { chipElsRef.current[i] = el; }}
              onClick={() => onSectionOpen(a.key)}
              aria-label={`Open ${annoLabels[a.key]?.[lang] ?? a.label} panel`}
              className="lg-anno"
              style={{
                '--ac': acStr,
                position: 'absolute',
                left: `${a.lx * 100}%`,
                top: `${a.ly * 100}%`,
                transform: 'translate(0, -50%)',
                display: 'inline-flex',
                flexDirection: a.side === 'right' ? 'row-reverse' : 'row',
                alignItems: 'center',
                gap: '10px',
                width: '186px',
                height: '58px',
                padding: a.side === 'right' ? '0 0 0 20px' : '0 20px 0 0',
                borderRadius: '999px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                zIndex: 10,
              } as React.CSSProperties}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translate(0, -50%) translateY(-4px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translate(0, -50%)';
              }}
            >
              <span className="lg-anno-sphere" style={{
                position: 'relative', zIndex: 3, flexShrink: 0,
                width: 72, height: 72,
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span className="lg-neon">{getAnnoIcon(a.key, isDark)}</span>
              </span>
              {/* Label */}
              <span className="lg-anno-label" style={{
                position: 'relative', zIndex: 2,
                fontFamily: 'var(--font-display)', fontSize: '13.5px',
                fontWeight: 700,
                color: '#0F2940',
                letterSpacing: '0.01em',
                textShadow: '0 1px 3px rgba(255,255,255,0.9), 0 0 12px rgba(255,255,255,0.65)',
              }}>
                {annoLabels[a.key]?.[lang] ?? a.label}
              </span>
            </button>
          </Fragment>
        );
      })}

      {/* Drag hint */}
      <div className="lq-pill" style={{ position: 'absolute', left: '50%', bottom: '-36px', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 18px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', color: isDark ? 'rgba(240,244,255,0.88)' : 'rgba(20,25,60,0.72)', pointerEvents: 'none', whiteSpace: 'nowrap', boxShadow: isDark ? '0 0 16px rgba(120,80,255,0.18) inset, 0 4px 16px rgba(0,0,0,0.35)' : '0 4px 16px rgba(0,0,0,0.10)', animation: 'scrollBob 3s ease-in-out infinite' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M9 11V6a2 2 0 0 1 4 0v5"/><path d="M13 8a2 2 0 0 1 4 0v4"/><path d="M17 9.5a2 2 0 0 1 4 0V15a6 6 0 0 1-6 6h-2a6 6 0 0 1-5.3-3.2L4.5 13a2 2 0 0 1 3.5-2"/></svg>
        {ui[lang].dioramaHint}
      </div>
    </div>
  );
}

