/* ── Project data ─────────────────────────────────────────────── */
export interface Project {
  id: string;
  slug: string;
  name: string;
  cat: string;
  catEn?: string;
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
    id: 'arvaloo',
    slug: 'arvaloo',
    name: 'SMASH. Super Sauce',
    cat: 'Packaging · Kampagne',
    catEn: 'Packaging · Campaign',
    desc: 'Verpackungssystem und Launch-Kampagne für fünf Pod-Sorten der Marke SMASH. Vapes (Arvaloo GmbH).',
    img: '/img/projects/arvaloo/poster-card.jpg',
    accent: '#FF5F00',
    isNew: true,
    tools: 'Illustrator · Photoshop · Pacdora',
    year: '2026',
  },
  {
    id: 'smash-cbd',
    slug: 'smash-cbd',
    name: 'SMASH. CBD — Gorilla Glue & Mango Ice',
    cat: 'Packaging · Launch-Kampagne',
    catEn: 'Packaging · Launch Campaign',
    desc: 'CBD-Linie in zwei Sorten und zwei Formaten — Prefilled Pods und 10-ml-Liquids — inkl. Launch-Kampagne für SMASH. (Arvaloo GmbH).',
    img: '/img/projects/arvaloo/cbd/card.jpg',
    accent: '#FF5F00',
    isNew: true,
    tools: 'Illustrator · Photoshop · Pacdora',
    year: '2026',
  },
  {
    id: 'studybuddy',
    slug: 'studybuddy',
    name: 'StudyBuddy',
    cat: 'UX/UI · Mobil · CPUX',
    catEn: 'UX/UI · Mobile · CPUX',
    desc: 'Capstone-Projekt: Lern-App mit strukturierten Blöcken, Fokus-Timer und Reflexion.',
    img: '/img/projects/studybuddy-thumbnail.webp',
    accent: '#FF5F00',
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
    accent: '#FF9A5A',
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
    accent: '#FF5F00',
    tools: 'Figma · Procreate · FigJam',
    year: '2024',
  },
  {
    id: 'schwimmspass',
    slug: 'schwimmspass',
    name: 'SchwimmSpass',
    cat: 'UX/UI · Mobil',
    catEn: 'UX/UI · Mobile',
    desc: 'App-Redesign für einen Mainzer Schwimmkursanbieter — optimiert für Eltern mit Kindern im Vorschulalter.',
    img: '/img/projects/schwimmspass-thumbnail.webp',
    accent: '#FF9A5A',
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
    accent: '#FF5F00',
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
    accent: '#FF9A5A',
    tools: 'Figma · Lovable',
    year: '2024',
    url: 'https://ecothread.lovable.app',
  },
  {
    id: 'obsidian',
    slug: 'obsidian',
    name: 'Obsidian',
    cat: 'UX/UI · Landingpage',
    catEn: 'UX/UI · Landing Page',
    desc: 'Crypto-Landingpage mit dunkler, Premium-UI und glassmorphischem Design.',
    img: '/img/projects/obsidian-thumbnail.webp',
    accent: '#FF5F00',
    tools: 'Figma · Lovable',
    year: '2024',
    url: 'https://obsidian-rise-shine.lovable.app',
  },
  {
    id: 'vegetables-calendar',
    slug: 'vegetables-calendar',
    name: 'Vegetables Calendar',
    cat: 'Grafikdesign · Druck',
    catEn: 'Graphic Design · Print',
    desc: 'Saisonaler Gemüsekalender 2024 — Printdesign mit illustrierten Motiven.',
    img: '/img/projects/vegetables-calendar.png',
    accent: '#FF9A5A',
    tools: 'Adobe Illustrator · InDesign',
    year: '2023',
    url: 'https://www.behance.net/gallery/162725755/VEGETABLES-SEASONAL-CALENDAR-2024',
  },
  {
    id: 'photography',
    slug: 'photography',
    name: 'Photography',
    cat: 'Fotografie · Unsplash',
    catEn: 'Photography · Unsplash',
    desc: 'Kreative Porträt- und Street-Fotografie — veröffentlicht auf Unsplash.',
    img: '/img/projects/photography.webp',
    accent: '#FF5F00',
    tools: 'Photoshop · Lightroom',
    year: '2022–2024',
    url: 'https://unsplash.com/@helvicium',
  },
  {
    id: 'branding',
    slug: 'branding',
    name: 'Branding',
    cat: 'Grafikdesign · Logo',
    catEn: 'Graphic Design · Logo',
    desc: 'Drei vollständige Brand-Identities: AeroLeaf, NordWand und SüßMund Pâtisserie.',
    img: '/img/projects/branding-thumbnail.webp',
    accent: '#FF9A5A',
    tools: 'Adobe Illustrator · Photoshop',
    year: '2023–2024',
  },
  {
    id: 'posters',
    slug: 'posters',
    name: 'Posters',
    cat: 'Grafikdesign · Poster',
    catEn: 'Graphic Design · Poster',
    desc: 'Grafikdesign-Posterserie mit kühner Typografie und experimenteller Ästhetik.',
    img: '/img/projects/posters.webp',
    accent: '#FF5F00',
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
    accent: '#FF9A5A',
    tools: 'Maya · Blender · 3DS Max',
    year: '2021–2023',
    url: 'https://sketchfab.com/hectorz151',
  },
];

/* ── Skills ─────────────────────────────────────────────────────── */
export const skillGroups = [
  {
    title: 'Adobe Creative Cloud',
    titleEn: 'Adobe Creative Cloud',
    skills: ['Adobe Photoshop', 'Adobe Illustrator', 'InDesign', 'Adobe After Effects', 'Adobe XD'],
  },
  {
    title: 'UI / Web',
    titleEn: 'UI / Web',
    skills: ['Figma', 'HTML5', 'CSS3'],
  },
  {
    title: '3D & Motion',
    titleEn: '3D & Motion',
    skills: ['Autodesk Maya', 'Autodesk 3ds Max', 'Motion Design'],
  },
  {
    title: 'UX & KI-Tools',
    titleEn: 'UX & AI Tools',
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
    period: '07/2026 – heute',
    periodEn: '07/2026 – present',
    location: 'Mainz',
    role: 'Produkt-, Grafik- & Kommunikationsdesigner (Teilzeit)',
    roleEn: 'Product, Graphic & Communication Designer (part-time)',
    company: 'Arvaloo GmbH',
    accent: '#FF5F00',
    bullets: [
      'Verpackungsdesign & Druckvorstufe für SMASH. (DE, AT, FR)',
      'Faltschachteln, Thekendisplays, Doypacks — druckfertige PDF/X-Daten inkl. Sonderfarben & Spot-UV',
      'Lokalisierung nach CLP-Kennzeichnung, loi Toubon & Triman',
      'Packshots für ~40 Artikel zum Launch des neuen Onlineshops',
      'KI-gestützte Mockup-Workflows (Nano Banana, Figma Weave, Pacdora)',
    ],
    bulletsEn: [
      'Packaging design & prepress for SMASH. (DE, AT, FR)',
      'Folding boxes, counter displays, doypacks — print-ready PDF/X files incl. spot colours & spot UV',
      'Localization under CLP labelling, loi Toubon & Triman',
      'Packshots for ~40 products for the launch of the new online shop',
      'AI-assisted mockup workflows (Nano Banana, Figma Weave, Pacdora)',
    ],
  },
  {
    period: '07/2023 – 09/2025',
    location: 'Mainz',
    role: 'Junior Grafik- & UX-Designer',
    roleEn: 'Junior Graphic & UX Designer',
    company: 'Vicampo.de GmbH',
    accent: '#FF5F00',
    bullets: [
      'Produktfotografie mit Orbitvu Alphashot-System',
      'KI-gestützte Bildproduktion mit Midjourney & Freepik AI',
      'UX-Optimierung auf Basis von A/B-Tests und Webanalyse',
      'HTML5/CSS-Umsetzung von Newsletter-Templates',
      'Gesamtnote im Abschlusszeugnis: sehr gut',
    ],
    bulletsEn: [
      'Product photography with the Orbitvu Alphashot system',
      'AI-assisted image production with Midjourney & Freepik AI',
      'UX optimization based on A/B tests and web analytics',
      'HTML5/CSS implementation of newsletter templates',
      'Final reference grade: very good',
    ],
  },
  {
    period: '08/2021 – 07/2023',
    location: 'Mainz',
    role: 'Ausbildung Mediengestalter Digital & Print',
    roleEn: 'Apprenticeship — Media Designer (Digital & Print)',
    company: 'Smartfox Media Group',
    accent: '#FF9A5A',
    bullets: [
      'Vektorillustrationen und Infografiken für Marketingkampagnen',
      'Motion Design und Videobearbeitung mit After Effects',
      'Layoutkonzepte für Web- und Printprodukte',
      'Bildbearbeitung und Composing in Adobe Photoshop',
    ],
    bulletsEn: [
      'Vector illustrations and infographics for marketing campaigns',
      'Motion design and video editing with After Effects',
      'Layout concepts for web and print products',
      'Image editing and compositing in Adobe Photoshop',
    ],
  },
];

export const education = [
  { period: '2020 – 2023', institution: 'Berufsbildende Schule 1, Mainz', degree: 'Mediengestalter Digital & Print', degreeEn: 'Media Designer (Digital & Print)' },
  { period: '2014 – 2016', institution: 'U-tad, Madrid', degree: '3D-Animation & Game Design', degreeEn: '3D Animation & Game Design' },
];

export const certifications = [
  { name: 'CPUX-F', issuer: 'UXQB', issuerEn: 'UXQB', year: '2026' },
  { name: 'Google UX', issuer: 'Grundlagen UX Design', issuerEn: 'UX Design Fundamentals', year: '2023' },
];

export const languages = [
  { lang: 'Spanisch', langEn: 'Spanish', level: 'Muttersprache', levelEn: 'Native',       flag: '🇲🇽' },
  { lang: 'Deutsch',  langEn: 'German',  level: 'C1 · Fließend',  levelEn: 'C1 · Fluent',  flag: '🇩🇪' },
  { lang: 'Englisch', langEn: 'English', level: 'B2',             levelEn: 'B2',            flag: '🇬🇧' },
  { lang: 'Italiano', langEn: 'Italian', level: 'B2',             levelEn: 'B2',            flag: '🇮🇹' },
];

export const hobbies = ['Krafttraining', 'Malen', 'Videospiele', 'Laufen', 'Kochen'];
export const hobbiesEn: Record<string, string> = {
  'Krafttraining': 'Strength Training',
  'Malen':         'Painting',
  'Videospiele':   'Video Games',
  'Laufen':        'Running',
  'Kochen':        'Cooking',
};

/* ── Diorama annotation chips ───────────────────────────────── */
export const ANNOS = [
  { key: 'info',    num: '01', label: 'Über mich',  color: '#FF9A5A', lx: 0.16, ly: 0.24, side: 'left'  as const, anchor: [-3.0, 3.05, -1.65] as [number,number,number] },
  { key: 'galerie', num: '02', label: 'Projekte',   color: '#FF5F00', lx: 0.70, ly: 0.22, side: 'right' as const, anchor: [0,    3.4,  -4.5 ] as [number,number,number] },
  { key: 'kontakt', num: '03', label: 'Arbeitsweise', color: '#FF9A5A', lx: 0.14, ly: 0.50, side: 'left' as const, anchor: [-4.25,2.7, 1.45] as [number,number,number] },
  { key: 'skills',  num: '04', label: 'Skills',     color: '#FF9A5A', lx: 0.15, ly: 0.76, side: 'left'  as const, anchor: [-4.3, 2.05,  3.0 ] as [number,number,number] },
  { key: 'hobbys',  num: '05', label: 'Hobbys',     color: '#FF5F00', lx: 0.70, ly: 0.76, side: 'right' as const, anchor: [0.3,  1.0,   2.9 ] as [number,number,number] },
];

export const ANNO_TINTS: Record<string, { s1: string; s2: string }> = {
  info:    { s1: '#FF9A5A', s2: '#FF9A5A' },
  galerie: { s1: '#FF7A26', s2: '#FF5F00' },
  kontakt: { s1: '#FF9A5A', s2: '#FF9A5A' },
  skills:  { s1: '#FF9A5A', s2: '#FF9A5A' },
  hobbys:  { s1: '#FF7A26', s2: '#FF5F00' },
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
  liveUrl?: string;
  liveLabel?: string;
  isNew?: boolean;
  role: string;
  year: string;
  accent: string;
  tags: string[];
  logo?: string;
  orgEn?: string;
  descEn?: string;
  roleEn?: string;
  tagsEn?: string[];
}

export const liveProjects: LiveProject[] = [
  {
    slug: 'arvaloo',
    name: 'Arvaloo — SMASH.',
    org: 'Arvaloo GmbH · Mainz',
    cat: 'Packaging · Druckvorstufe · Produktkommunikation',
    desc: 'Verpackungsdesign, Druckvorstufe und Produktkommunikation für die Marke SMASH. (Super Sauce, Cloud Sauce, CBD Pods) — von Faltschachtel und Thekendisplay bis Packshot und POS, für die Märkte DE, AT und FR.',
    img: '/img/projects/arvaloo/banner.jpg',
    imgPos: '50% 50%',
    role: 'Produkt-, Grafik- & Kommunikationsdesigner',
    year: '2026–heute',
    accent: '#FF5F00',
    isNew: true,
    tags: ['Packaging', 'Druckvorstufe', 'Lokalisierung', 'KI-Workflow'],
    descEn: 'Packaging design, prepress and product communication for the SMASH. brand (Super Sauce, Cloud Sauce, CBD Pods) — from folding boxes and counter displays to packshots and POS, for the German, Austrian and French markets.',
    roleEn: 'Product, Graphic & Communication Designer',
    tagsEn: ['Packaging', 'Prepress', 'Localization', 'AI Workflow'],
  },
  {
    slug: 'smash-cbd',
    name: 'SMASH. CBD — Gorilla Glue & Mango Ice',
    org: 'Arvaloo GmbH · Mainz',
    cat: 'Packaging · Druckvorstufe · Launch-Kampagne',
    desc: 'Neue CBD-Linie von SMASH. in zwei Sorten und zwei Formaten — mit eigenen Illustrationen: Faltschachteln für Prefilled Pods und 10-ml-Liquids samt Flaschenetikett — von der Stanzkontur bis zur Launch-Kampagne mit Shop-Banner und Story.',
    img: '/img/projects/arvaloo/cbd/live-card.jpg',
    imgPos: '50% 50%',
    role: 'Produkt-, Grafik- & Kommunikationsdesigner',
    year: '2026',
    accent: '#FF5F00',
    isNew: true,
    tags: ['Packaging', 'Illustration', 'Druckvorstufe', 'Kampagne'],
    descEn: 'A new CBD line for SMASH. in two flavours and two formats — with my own illustrations: folding boxes for prefilled pods and 10 ml liquids with bottle label — from dieline to launch campaign with shop banner and story.',
    roleEn: 'Product, Graphic & Communication Designer',
    tagsEn: ['Packaging', 'Illustration', 'Prepress', 'Campaign'],
  },
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
    accent: '#FF5F00',
    tags: ['Produktfotografie', 'KI-Workflow', 'UX-Optimierung', 'HTML/CSS'],
    logo: '/img/logos/vicampo.svg',
    descEn: 'Two years as Junior Graphic & UX Designer at one of Germany\'s largest online wine retailers — product photography, AI image production and UX optimization in the live shop.',
    roleEn: 'Junior Graphic & UX Designer',
    tagsEn: ['Product Photography', 'AI Workflow', 'UX Optimization', 'HTML/CSS'],
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
    accent: '#FF9A5A',
    tags: ['Grafikdesign', 'Web', 'Kampagne', 'Branding'],
    logo: '/img/logos/weinfuerst.svg',
    orgEn: 'Weinfürst · Online Wine Retail',
    descEn: 'Design work around the Gold Status loyalty programme of the online wine retailer Weinfürst — best-price guarantee, exclusive range and campaign assets for the live shop.',
    roleEn: 'Graphics & Design',
    tagsEn: ['Graphic Design', 'Web', 'Campaign', 'Branding'],
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
    accent: '#FF5F00',
    tags: ['Illustration', 'E-Learning', 'Animation', 'Whitepaper'],
    logo: '/img/logos/smartfox.svg',
    descEn: 'Illustrations and motion for interactive e-learning courses of the TÜV Nord Akademie (occupational health & safety) plus digital articles and a whitepaper.',
    roleEn: 'Illustration & Motion',
    tagsEn: ['Illustration', 'E-Learning', 'Animation', 'Whitepaper'],
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
    accent: '#FF9A5A',
    tags: ['UI-Design', 'Illustration', 'Mockups', 'Videoschnitt'],
    logo: '/img/logos/vinou.svg',
    orgEn: 'Vinou · Wine Management',
    descEn: 'Illustrations, UI design, mockups and website optimization for Vinou — digitalization partner for wine producers. Including production and editing of the brand videos.',
    roleEn: 'UI Design, Illustration & Video',
    tagsEn: ['UI Design', 'Illustration', 'Mockups', 'Video Editing'],
  },
];
