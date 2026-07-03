export type Lang = 'de' | 'en' | 'es';

export const ui = {
  de: {
    openToHire:   'Offen für Festanstellung · Open to hire',
    kicker:       'Hector Uribe · Mediengestalter · UX/UI Designer · Mainz',
    subtitle:     'Mediengestalter Digital & Print mit 4+ Jahren Erfahrung in Branding, UX/UI und Motion, ansässig in Mainz.',
    ctaProjects:  'Projekte ansehen',
    ctaCV:        'Lebenslauf',
    ctaContact:   'Kontakt',
    dioramaHint:  'Drehen & Objekte anklicken',
    panelGalerieTitle: 'Ausgewählte Projekte',
    panelSkillsTitle:  'Skills & Software',
    panelKontaktTitle: 'Jetzt Kontakt aufnehmen',
    downloadCV:   'Lebenslauf herunterladen',
  },
  en: {
    openToHire:   'Open to work · Available for hire',
    kicker:       'Hector Uribe · Media Designer · UX/UI Designer · Mainz',
    subtitle:     'Media Designer (Digital & Print) with 4+ years of experience in Branding, UX/UI and Motion, based in Mainz.',
    ctaProjects:  'View projects',
    ctaCV:        'Download CV',
    ctaContact:   'Contact',
    dioramaHint:  'Rotate & click objects',
    panelGalerieTitle: 'Selected Projects',
    panelSkillsTitle:  'Skills & Software',
    panelKontaktTitle: 'Get in touch',
    downloadCV:   'Download CV',
  },
  es: {
    openToHire:   'Disponible · En búsqueda activa',
    kicker:       'Hector Uribe · Diseñador Gráfico · UX/UI · Maguncia',
    subtitle:     'Diseñador gráfico y UX/UI con 4+ años de experiencia en Branding, UX/UI y Motion, radicado en Maguncia.',
    ctaProjects:  'Ver proyectos',
    ctaCV:        'Descargar CV',
    ctaContact:   'Contacto',
    dioramaHint:  'Girar y hacer clic en objetos',
    panelGalerieTitle: 'Proyectos seleccionados',
    panelSkillsTitle:  'Skills & Software',
    panelKontaktTitle: 'Ponerse en contacto',
    downloadCV:   'Descargar CV',
  },
} as const;

export const annoLabels: Record<string, Record<Lang, string>> = {
  info:    { de: 'About',        en: 'About',    es: 'Sobre mí'    },
  galerie: { de: 'Projects',     en: 'Projects', es: 'Proyectos'   },
  kontakt: { de: 'Arbeitsweise', en: 'Approach', es: 'Método'      },
  skills:  { de: 'Skills',       en: 'Skills',   es: 'Habilidades' },
  hobbys:  { de: 'Hobbies',      en: 'Hobbies',  es: 'Pasatiempos' },
};
