/* ── Project data ─────────────────────────────────────────────── */
export interface Project {
  id: string;
  slug: string;
  name: string;
  cat: string;
  desc: string;
  img: string;
  accent: string;
  isNew?: boolean;
  tools: string;
  year: string;
  url?: string; // external link; if absent, routes to /projekte/[slug]
}

export const projects: Project[] = [
  {
    id: 'studybuddy',
    slug: 'studybuddy',
    name: 'StudyBuddy',
    cat: 'UX/UI · Mobil · CPUX',
    desc: 'Capstone-Projekt: Lern-App mit strukturierten Blöcken, Fokus-Timer und Reflexion.',
    img: '/img/projects/studybuddy-thumbnail.webp',
    accent: '#fe8684',
    isNew: true,
    tools: 'Figma · FigJam · Miro',
    year: '2024',
  },
  {
    id: 'silly-crab',
    slug: 'silly-crab',
    name: 'Silly Crab',
    cat: 'Web Dev · React',
    desc: 'Animierte React-App mit spielerischer UI und interaktiven Charakteren.',
    img: '/img/projects/silly-crab.webp',
    accent: '#83cae2',
    tools: 'React · CSS · Vercel',
    year: '2024',
    url: 'https://silly-crab-sc75.vercel.app/',
  },
  {
    id: 'squishy-savings',
    slug: 'squishy-savings',
    name: 'Squishy Savings',
    cat: 'UX/UI · Mobile App',
    desc: 'Gamifizierte Finance-App für Gen Z mit Squishie-Sammel-Mechanik und visuellen Sparzielen.',
    img: '/img/projects/mosaic-savings.webp',
    accent: '#fe8684',
    tools: 'Figma · Procreate · FigJam',
    year: '2024',
  },
  {
    id: 'schwimmspass',
    slug: 'schwimmspass',
    name: 'SchwimmSpass',
    cat: 'UX/UI · Mobil',
    desc: 'App-Redesign für einen Mainzer Schwimmkursanbieter — optimiert für Eltern mit Kindern im Vorschulalter.',
    img: '/img/projects/schwimmspass-thumbnail.webp',
    accent: '#83cae2',
    tools: 'Figma · Maze · Miro',
    year: '2023',
  },
  {
    id: 'sentinel',
    slug: 'sentinel',
    name: 'Sentinel',
    cat: 'UX/UI · Dashboard · React',
    desc: 'Web-App für das Echtzeit-Monitoring von Online-Shops — Verkäufe, Lagerbestand und Traffic in einem Dark-UI-Dashboard.',
    img: '/img/projects/mosaic-sentinel.webp',
    accent: '#fe8684',
    tools: 'Figma · React',
    year: '2024',
  },
  {
    id: 'ecothread',
    slug: 'ecothread',
    name: 'EcoThread',
    cat: 'UX/UI · E-Commerce',
    desc: 'E-Commerce UX-Design für nachhaltige Mode.',
    img: '/img/projects/ecothread.webp',
    accent: '#83cae2',
    tools: 'Figma · Lovable',
    year: '2024',
    url: 'https://ecothread.lovable.app',
  },
  {
    id: 'obsidian',
    slug: 'obsidian',
    name: 'Obsidian',
    cat: 'UX/UI · Landingpage',
    desc: 'Crypto-Landingpage mit dunkler, Premium-UI und glassmorphischem Design.',
    img: '/img/projects/obsidian-thumbnail.webp',
    accent: '#fe8684',
    tools: 'Figma · Lovable',
    year: '2024',
    url: 'https://obsidian-rise-shine.lovable.app',
  },
  {
    id: 'vegetables-calendar',
    slug: 'vegetables-calendar',
    name: 'Vegetables Calendar',
    cat: 'Grafikdesign · Druck',
    desc: 'Saisonaler Gemüsekalender 2024 — Printdesign mit illustrierten Motiven.',
    img: '/img/projects/vegetables-calendar.png',
    accent: '#83cae2',
    tools: 'Adobe Illustrator · InDesign',
    year: '2023',
    url: 'https://www.behance.net/gallery/162725755/VEGETABLES-SEASONAL-CALENDAR-2024',
  },
  {
    id: 'photography',
    slug: 'photography',
    name: 'Photography',
    cat: 'Fotografie · Unsplash',
    desc: 'Kreative Porträt- und Street-Fotografie — veröffentlicht auf Unsplash.',
    img: '/img/projects/photography.webp',
    accent: '#fe8684',
    tools: 'Photoshop · Lightroom',
    year: '2022–2024',
    url: 'https://unsplash.com/@helvicium',
  },
  {
    id: 'branding',
    slug: 'branding',
    name: 'Branding',
    cat: 'Grafikdesign · Logo',
    desc: 'Drei vollständige Brand-Identities: AeroLeaf, NordWand und SüßMund Pâtisserie.',
    img: '/img/projects/branding-thumbnail.webp',
    accent: '#83cae2',
    tools: 'Adobe Illustrator · Photoshop',
    year: '2023–2024',
  },
  {
    id: 'posters',
    slug: 'posters',
    name: 'Posters',
    cat: 'Grafikdesign · Poster',
    desc: 'Grafikdesign-Posterserie mit kühner Typografie und experimenteller Ästhetik.',
    img: '/img/projects/posters.webp',
    accent: '#fe8684',
    tools: 'Photoshop · Illustrator · Procreate',
    year: '2022–2024',
    url: 'https://www.behance.net/hectoruribe2',
  },
  {
    id: '3d-models',
    slug: '3d-models',
    name: '3D Models',
    cat: '3D · Sketchfab',
    desc: '3D-Modelle und Skulpturen — modelliert in Maya & Blender, veröffentlicht auf Sketchfab.',
    img: '/img/projects/3D_model.webp',
    accent: '#83cae2',
    tools: 'Maya · Blender · 3DS Max',
    year: '2021–2023',
    url: 'https://sketchfab.com/hectorz151',
  },
];

/* ── Skills ─────────────────────────────────────────────────────── */
export const skillGroups = [
  {
    title: 'Adobe Creative Cloud',
    skills: ['Adobe Photoshop', 'Adobe Illustrator', 'InDesign', 'Adobe After Effects', 'Adobe XD'],
  },
  {
    title: 'UI / Web',
    skills: ['Figma', 'HTML5', 'CSS3'],
  },
  {
    title: '3D & Motion',
    skills: ['Autodesk Maya', 'Autodesk 3ds Max', 'Motion Design'],
  },
  {
    title: 'UX & KI-Tools',
    skills: ['UX Research', 'UI Design', 'Usability Testing', 'Wireframing', 'Midjourney', 'Freepik AI', 'CPUX-F Zertifizierung'],
  },
];

/* ── Social links ────────────────────────────────────────────────── */
export const socialLinks = [
  { label: 'E-Mail',     value: 'hectoruch18@gmail.com',           url: 'mailto:hectoruch18@gmail.com' },
  { label: 'Telefon',    value: '+49 157 82780461',                  url: 'tel:+4915782780461' },
  { label: 'LinkedIn',   value: 'hectoruch18',                       url: 'https://www.linkedin.com/in/hectoruch18/' },
  { label: 'Behance',    value: 'hectoruribe2',                      url: 'https://www.behance.net/hectoruribe2' },
  { label: 'Instagram',  value: '@hectoruribechacon',                url: 'https://www.instagram.com/hectoruribechacon/' },
  { label: 'Unsplash',   value: '@helvicium',                        url: 'https://unsplash.com/@helvicium' },
];

/* ── Experience ──────────────────────────────────────────────────── */
export const experience = [
  {
    period: '07/2023 – 09/2025',
    location: 'Mainz',
    role: 'Junior Grafik- & UX-Designer',
    company: 'Vicampo.de GmbH',
    accent: '#fe8684',
    bullets: [
      'Produktfotografie mit Orbitvu Alphashot-System',
      'KI-gestützte Bildproduktion mit Midjourney & Freepik AI',
      'UX-Optimierung auf Basis von A/B-Tests und Webanalyse',
      'HTML5/CSS-Umsetzung von Newsletter-Templates',
      'Gesamtnote im Abschlusszeugnis: sehr gut',
    ],
  },
  {
    period: '08/2021 – 07/2023',
    location: 'Mainz',
    role: 'Ausbildung Mediengestalter Digital & Print',
    company: 'Smartfox Media Group',
    accent: '#83cae2',
    bullets: [
      'Vektorillustrationen und Infografiken für Marketingkampagnen',
      'Motion Design und Videobearbeitung mit After Effects',
      'Layoutkonzepte für Web- und Printprodukte',
      'Bildbearbeitung und Composing in Adobe Photoshop',
    ],
  },
];

export const education = [
  { period: '2020 – 2023', institution: 'Berufsbildende Schule 1, Mainz', degree: 'Mediengestalter Digital & Print' },
  { period: '2014 – 2016', institution: 'U-tad, Madrid', degree: '3D-Animation & Game Design' },
];

export const certifications = [
  { name: 'CPUX-F', issuer: 'UXQB', year: '2026' },
  { name: 'Google UX', issuer: 'Grundlagen UX Design', year: '2023' },
];

export const languages = [
  { lang: 'Spanisch', level: 'Muttersprache', flag: '🇲🇽' },
  { lang: 'Deutsch',  level: 'C1 · Fließend',  flag: '🇩🇪' },
  { lang: 'Englisch', level: 'B2',              flag: '🇬🇧' },
  { lang: 'Italiano', level: 'B2',              flag: '🇮🇹' },
];

export const hobbies = ['Krafttraining', 'Malen', 'Videospiele', 'Laufen', 'Kochen'];

/* ── Diorama annotation chips ───────────────────────────────── */
export const ANNOS = [
  { key: 'info',    num: '01', label: 'Über mich',  color: '#83cae2', lx: 0.16, ly: 0.24, side: 'left'  as const, anchor: [-3.0, 3.05, -1.65] as [number,number,number] },
  { key: 'galerie', num: '02', label: 'Projekte',   color: '#fe8684', lx: 0.70, ly: 0.22, side: 'right' as const, anchor: [0,    3.4,  -4.5 ] as [number,number,number] },
  { key: 'kontakt', num: '03', label: 'Arbeitsweise', color: '#83cae2', lx: 0.14, ly: 0.50, side: 'left' as const, anchor: [-4.25,2.7, 1.45] as [number,number,number] },
  { key: 'skills',  num: '04', label: 'Skills',     color: '#83cae2', lx: 0.15, ly: 0.76, side: 'left'  as const, anchor: [-4.3, 2.05,  3.0 ] as [number,number,number] },
  { key: 'hobbys',  num: '05', label: 'Hobbys',     color: '#fe8684', lx: 0.70, ly: 0.76, side: 'right' as const, anchor: [0.3,  1.0,   2.9 ] as [number,number,number] },
];

export const ANNO_TINTS: Record<string, { s1: string; s2: string }> = {
  info:    { s1: '#a5dcef', s2: '#83cae2' },
  galerie: { s1: '#fd9a98', s2: '#fe8684' },
  kontakt: { s1: '#a5dcef', s2: '#83cae2' },
  skills:  { s1: '#a5dcef', s2: '#83cae2' },
  hobbys:  { s1: '#fd9a98', s2: '#fe8684' },
};

export const ANNO_TO_CARD: Record<string, string> = {
  info:    'about',
  galerie: 'projects',
  kontakt: 'arbeitsweise',
  skills:  'skills',
  hobbys:  'hobbies',
};

/* ── Live / Praxis-Projekte (online & sichtbar) ─────────────────── */
export interface LiveProject {
  slug: string;
  name: string;
  org: string;
  cat: string;
  desc: string;
  img: string;
  imgPos?: string;
  liveUrl: string;
  liveLabel: string;
  role: string;
  year: string;
  accent: string;
  tags: string[];
  logo?: string;
}

export const liveProjects: LiveProject[] = [
  {
    slug: 'vicampo',
    name: 'Vicampo.de',
    org: 'Vicampo.de GmbH · Mainz',
    cat: 'Grafik · UX/UI · E-Commerce',
    desc: 'Zwei Jahre als Junior Grafik- & UX-Designer bei einem der größten deutschen Online-Weinhändler — Produktfotografie, KI-Bildproduktion und UX-Optimierung im Live-Shop.',
    img: '/img/projects/live/vicampo-shot.jpg',
    imgPos: '50% 0%',
    liveUrl: 'https://www.vicampo.de/',
    liveLabel: 'vicampo.de',
    role: 'Junior Grafik- & UX-Designer',
    year: '2023–2025',
    accent: '#fe8684',
    tags: ['Produktfotografie', 'KI-Workflow', 'UX-Optimierung', 'HTML/CSS'],
    logo: '/img/logos/vicampo.svg',
  },
  {
    slug: 'weinfuerst',
    name: 'Weinfürst — Goldstatus',
    org: 'Weinfürst · Online-Weinhandel',
    cat: 'Grafik · Web · Kampagne',
    desc: 'Gestaltung rund um das Goldstatus-Treueprogramm des Online-Weinhändlers Weinfürst — Toppreis-Garantie, exklusives Sortiment und Kampagnen-Assets für den Live-Shop.',
    img: '/img/projects/live/weinfuerst-shot.jpg',
    imgPos: '50% 0%',
    liveUrl: 'https://www.weinfuerst.de/pages/info-goldstatus',
    liveLabel: 'weinfuerst.de',
    role: 'Grafik & Design',
    year: '2023–2025',
    accent: '#83cae2',
    tags: ['Grafikdesign', 'Web', 'Kampagne', 'Branding'],
    logo: '/img/logos/weinfuerst.svg',
  },
  {
    slug: 'tuv-nord-akademie',
    name: 'TÜV Nord Akademie',
    org: 'Smartfox Media Group',
    cat: 'Illustration · E-Learning · Motion',
    desc: 'Illustrationen und Motion für interaktive E-Learning-Kurse der TÜV Nord Akademie (Arbeits- & Gesundheitsschutz) sowie digitale Fachartikel und ein Whitepaper.',
    img: '/img/projects/smartfox/smartfox-card.jpg',
    imgPos: '50% 0%',
    liveUrl: 'https://www.youtube.com/watch?v=RUcT0AwjBN0',
    liveLabel: 'Video ansehen',
    role: 'Illustration & Motion',
    year: '2021–2023',
    accent: '#fe8684',
    tags: ['Illustration', 'E-Learning', 'Animation', 'Whitepaper'],
    logo: '/img/logos/smartfox.svg',
  },
  {
    slug: 'vinou',
    name: 'Vinou',
    org: 'Vinou · Weinmanagement',
    cat: 'UX/UI · Illustration · Video',
    desc: 'Illustrationen, UI-Design, Mockups und Website-Optimierung für Vinou — Digitalisierungspartner für Weinerzeuger. Inklusive Produktion und Schnitt der Imagevideos.',
    img: '/img/projects/live/vinou-shot.jpg',
    imgPos: '50% 0%',
    liveUrl: 'https://www.vinou.de/',
    liveLabel: 'vinou.de',
    role: 'UI-Design, Illustration & Video',
    year: '2021–2023',
    accent: '#83cae2',
    tags: ['UI-Design', 'Illustration', 'Mockups', 'Videoschnitt'],
    logo: '/img/logos/vinou.svg',
  },
];
