/* Work process — shared by the home-page process band (components/ProcessSteps)
   and the "Arbeitsweise" panel in the diorama (components/InfoPanel).
   Accents stay hex: consumers append hex alpha (`${accent}18`). */
export const PROCESS_STEPS = [
  {
    num: '01', title: 'Verstehen', titleEn: 'Understand', accent: '#FF9A5A',
    desc: 'Nutzerforschung, Interviews und Anforderungsanalyse — verstehen, wer das Produkt nutzt und warum.',
    descEn: 'User research, interviews and requirements analysis — understanding who uses the product and why.',
    tags: ['User Research', 'Interviews', 'Personas'],
    tagsEn: ['User Research', 'Interviews', 'Personas'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7"/>
        <path d="M21 21l-4.35-4.35"/>
        <path d="M11 8v3M9.5 9.5l1.5 1.5 1.5-1.5"/>
      </svg>
    ),
  },
  {
    num: '02', title: 'Konzipieren', titleEn: 'Conceptualize', accent: '#FF5F00',
    desc: 'Ideation, User Flows und Low-Fidelity Wireframes — die Struktur vor dem Design.',
    descEn: 'Ideation, user flows and low-fidelity wireframes — structure before design.',
    tags: ['User Flows', 'Wireframes', 'FigJam'],
    tagsEn: ['User Flows', 'Wireframes', 'FigJam'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2.5"/>
        <path d="M3 9h18M9 21V9"/>
      </svg>
    ),
  },
  {
    num: '03', title: 'Gestalten', titleEn: 'Design', accent: '#FF9A5A',
    desc: 'High-Fidelity Design, Prototyping und Micro-Animationen in Figma.',
    descEn: 'High-fidelity design, prototyping and micro-animations in Figma.',
    tags: ['Figma', 'Prototyping', 'Motion'],
    tagsEn: ['Figma', 'Prototyping', 'Motion'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z"/>
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    ),
  },
  {
    num: '04', title: 'Testen & Iterieren', titleEn: 'Test & Iterate', accent: '#FF5F00',
    desc: 'Usability-Tests, Feedback-Schleifen und kontinuierliche Verbesserung.',
    descEn: 'Usability testing, feedback loops and continuous improvement.',
    tags: ['Usability-Tests', 'Maze', 'Iteration'],
    tagsEn: ['Usability Testing', 'Maze', 'Iteration'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
];
