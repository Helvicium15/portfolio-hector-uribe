import type { ReactNode } from 'react';
import type { Lang } from './i18n';

export interface ProjectSection {
  label: string;
  content: ReactNode;
}

export interface ProjectPageData {
  title: string;
  description: string;
  accent: string;
  category: string;
  tools: string;
  role: string;
  year: string;
  heroImg: string;
  heroImgPos?: string;
  logo?: string;
  liveUrl?: string;
  liveLabel?: string;
  intro: string;
  sections: ProjectSection[];
  nextSlug?: string;
  nextName?: string;
}

/* ── Shared card style helper ──────────────────────────────────── */
const card = (children: ReactNode, style?: React.CSSProperties, key?: number | string) => (
  <div key={key} className="glass-card" style={{ padding: '28px 30px', ...style }}>
    {children}
  </div>
);

const grid2 = (a: ReactNode, b: ReactNode) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
    {card(a)}
    {card(b)}
  </div>
);

const cardBody = (text: string) => (
  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.78, color: 'rgba(15,41,64,0.72)' }}>{text}</p>
);

const cardTitle = (t: string, _accent?: string) => (
  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' as const, marginBottom: 14, color: 'rgba(15,41,64,0.72)', fontFamily: 'var(--font-mono)' }}>{t}</div>
);

/* ── Responsive YouTube embed ──────────────────────────────────── */
const ytEmbed = (id: string, title: string) => (
  <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(131,202,226,0.28)', boxShadow: '0 8px 28px rgba(15,41,64,0.14)' }}>
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${id}`}
      title={title}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
    />
  </div>
);

/* ── Screenshot / image card ───────────────────────────────────── */
const shot = (src: string, alt: string, caption?: string, pos = '50% 0%') => (
  <figure style={{ margin: 0 }}>
    <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(131,202,226,0.28)', boxShadow: '0 8px 28px rgba(15,41,64,0.12)', background: '#fff' }}>
      <img src={src} alt={alt} style={{ width: '100%', display: 'block', aspectRatio: '16 / 10', objectFit: 'cover', objectPosition: pos }} />
    </div>
    {caption && <figcaption style={{ margin: '10px 2px 0', fontSize: 12, lineHeight: 1.5, color: 'rgba(15,41,64,0.72)', fontFamily: 'var(--font-mono)' }}>{caption}</figcaption>}
  </figure>
);

/* ── Plain image tile (natural aspect ratio) ───────────────────── */
const imgTile = (src: string, alt: string, radius = 12) => (
  <div style={{ borderRadius: radius, overflow: 'hidden', border: '1px solid rgba(131,202,226,0.28)', boxShadow: '0 6px 20px rgba(15,41,64,0.10)', background: '#fff' }}>
    <img src={src} alt={alt} loading="lazy" style={{ width: '100%', height: 'auto', display: 'block' }} />
  </div>
);

/* ── Image gallery grid ────────────────────────────────────────── */
const gallery = (items: { src: string; alt: string }[], min = 240) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill,minmax(${min}px,1fr))`, gap: 14, alignItems: 'start' }}>
    {items.map((it, i) => <div key={i}>{imgTile(it.src, it.alt)}</div>)}
  </div>
);

/* ── Masonry (CSS columns) — flows mixed aspect ratios neatly ───── */
const masonry = (items: { src: string; alt: string }[], colWidth = 250) => (
  <div style={{ columnWidth: colWidth, columnGap: 14 }}>
    {items.map((it, i) => (
      <div key={i} style={{ breakInside: 'avoid', marginBottom: 14 }}>{imgTile(it.src, it.alt)}</div>
    ))}
  </div>
);

/* ── Labeled figure (any node + caption) ───────────────────────── */
const figCard = (node: ReactNode, caption: string, key?: number | string) => (
  <figure key={key} style={{ margin: 0 }}>
    {node}
    <figcaption style={{ margin: '10px 2px 0', fontSize: 12, lineHeight: 1.5, color: 'rgba(15,41,64,0.72)', fontFamily: 'var(--font-mono)' }}>{caption}</figcaption>
  </figure>
);

/* ── Local (self-hosted) video card ────────────────────────────── */
const videoCard = (src: string, caption?: string, key?: number | string) => (
  <figure key={key} style={{ margin: 0 }}>
    <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(131,202,226,0.28)', boxShadow: '0 8px 28px rgba(15,41,64,0.12)', background: '#0a0e1e' }}>
      <video controls preload="metadata" style={{ width: '100%', display: 'block' }}>
        <source src={src} type="video/mp4" />
      </video>
    </div>
    {caption && <figcaption style={{ margin: '10px 2px 0', fontSize: 12, lineHeight: 1.5, color: 'rgba(15,41,64,0.72)', fontFamily: 'var(--font-mono)' }}>{caption}</figcaption>}
  </figure>
);

/* ── Section intro paragraph ───────────────────────────────────── */
const lead = (text: string) => (
  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.78, color: 'rgba(15,41,64,0.72)', maxWidth: 760 }}>{text}</p>
);

/* ══════════════════════════════════════════════════════════════
   PROJECT CONTENT MAP
   ══════════════════════════════════════════════════════════════ */
export function getProjectContent(lang: Lang): Record<string, ProjectPageData> {
  const t = (de: string, en: string) => (lang === 'en' ? en : de);
  return {

  /* ── VICAMPO ─────────────────────────────────────────────── */
  vicampo: {
    title: t('Vicampo — Grafik & UX', 'Vicampo — Graphics & UX'),
    description: t('Junior Grafik- & UX-Designer (2023–2025): Produktfotografie, KI-Workflow, UX-Optimierung.', 'Junior Graphic & UX Designer (2023–2025): product photography, AI workflow, UX optimization.'),
    accent: '#fe8684',
    category: t('Grafikdesign · UX/UI · Frontend', 'Graphic Design · UX/UI · Frontend'),
    tools: 'Photoshop · Figma · HTML/CSS · Midjourney · Freepik AI',
    role: t('Junior Grafik- & UX-Designer', 'Junior Graphic & UX Designer'),
    year: '07/2023 – 09/2025',
    heroImg: '/img/projects/live/vicampo-shot.jpg',
    heroImgPos: '50% 0%',
    logo: '/img/logos/vicampo.svg',
    liveUrl: 'https://www.vicampo.de/',
    liveLabel: 'vicampo.de',
    intro: t('Als Junior Grafik- & UX-Designer bei Vicampo.de GmbH verantwortete ich Produktfotografie, KI-gestützte Bildproduktion, UX-Optimierung und HTML/CSS-Umsetzung — für einen der größten Online-Weinhändler Deutschlands.', 'As a Junior Graphic & UX Designer at Vicampo.de GmbH, I was responsible for product photography, AI-assisted image production, UX optimization and HTML/CSS implementation — for one of Germany\'s largest online wine retailers.'),
    sections: [
      {
        label: t('Kontext', 'Context'),
        content: grid2(
          <>{cardTitle(t('Das Unternehmen', 'The Company'), '#c9795a66')}{cardBody(t('Vicampo.de GmbH ist einer der größten deutschen Online-Weinhändler mit über 20.000 Weinen im Sortiment. Das Mainzer E-Commerce-Unternehmen bedient sowohl Privat- als auch Geschäftskunden und produziert hohe Volumina an Werbemitteln — digital und gedruckt.', 'Vicampo.de GmbH is one of Germany\'s largest online wine retailers with over 20,000 wines in its range. The Mainz-based e-commerce company serves both private and business customers and produces high volumes of advertising material — digital and print.'))}</>,
          <>{cardTitle(t('Meine Rolle', 'My Role'), '#c9795a66')}{cardBody(t('Ich arbeitete eigenständig als Junior Grafik- & UX-Designer im Marketing-Team und übernahm Verantwortung für Produktfotografie, digitale Werbemittel, Newsletter-Layouts, UX-Verbesserungen und die Einführung von KI-Tools in den Bildproduktions-Workflow.', 'I worked independently as a Junior Graphic & UX Designer in the marketing team, responsible for product photography, digital advertising, newsletter layouts, UX improvements and introducing AI tools into the image-production workflow.'))}</>,
        ),
      },
      {
        label: t('Herausforderung', 'Challenge'),
        content: card(cardBody(t('Die Produktfotografie war zeitaufwändig und qualitativ inkonsistent. Das Marketing-Team stand vor der Aufgabe, wachsende Volumina an Kampagnenmaterial zu produzieren — bei gleichzeitig knappen Ressourcen. Die Website zeigte UX-Schwächen, die durch Webanalyse identifiziert, aber noch nicht systematisch adressiert worden waren.', 'Product photography was time-consuming and inconsistent in quality. The marketing team faced the task of producing growing volumes of campaign material — with limited resources at the same time. The website showed UX weaknesses that had been identified through web analytics but not yet systematically addressed.'))),
      },
      {
        label: t('Mein Beitrag', 'My Contribution'),
        content: (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
            {[
              { t: t('Produktfotografie', 'Product Photography'), b: t('Aufbau eines effizienten, qualitätskonsistenten Foto-Workflows mit der Orbitvu Alphashot-Fotobox. Freistellung, Retusche und Compositing in Adobe Photoshop — reproduzierbar und skalierbar.', 'Built an efficient, quality-consistent photo workflow with the Orbitvu Alphashot photo box. Clipping, retouching and compositing in Adobe Photoshop — reproducible and scalable.') },
              { t: t('KI-Bildproduktion', 'AI Image Production'), b: t('Einführung von Midjourney und Freepik AI in den Kampagnen-Workflow: Prompt-Engineering, Konsistenzprüfung und Qualitätssicherung der KI-generierten Assets.', 'Introduced Midjourney and Freepik AI into the campaign workflow: prompt engineering, consistency checks and quality assurance of the AI-generated assets.') },
              { t: t('UX-Optimierung', 'UX Optimization'), b: t('Analyse von Heatmaps und Konversionsdaten; Umsetzung von A/B-Tests für Produktseiten und Newsletter-CTAs; Identifikation und Behebung von Drop-off-Punkten im Checkout-Funnel.', 'Analysis of heatmaps and conversion data; A/B tests for product pages and newsletter CTAs; identifying and fixing drop-off points in the checkout funnel.') },
              { t: t('Newsletter & Frontend', 'Newsletter & Frontend'), b: t('Gestaltung und HTML/CSS-Umsetzung von responsiven Newsletter-Templates. Iterative Optimierung auf Basis von Open-Rate und Click-Through-Daten.', 'Design and HTML/CSS implementation of responsive newsletter templates. Iterative optimization based on open-rate and click-through data.') },
            ].map((item, i) => card(
              <>{cardTitle(item.t, '#c9795a66')}{cardBody(item.b)}</>,
              undefined, i,
            ))}
          </div>
        ),
      },
      {
        label: t('UX-Analyse & Redesign', 'UX Analysis & Redesign'),
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {lead(t('Ich habe die Vicampo-Startseite systematisch analysiert, Schwachstellen annotiert und daraus ein konkretes Redesign abgeleitet — von der Platzierung der Service-Hotline über einheitliche Abstände bis zur Verschlankung überladener Bereiche.', 'I systematically analyzed the Vicampo homepage, annotated weaknesses and derived a concrete redesign — from the placement of the service hotline to consistent spacing and streamlining overloaded areas.'))}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 16 }}>
              {figCard(imgTile('/img/projects/vicampo/ux-analyse.png', 'UX-Analyse der Vicampo-Startseite mit Annotationen'), t('Analyse · Vorher — annotierte Heuristik der Startseite.', 'Analysis · Before — annotated heuristics of the homepage.'), 'a')}
              {figCard(imgTile('/img/projects/vicampo/ux-redesign.png', 'Redesign der Vicampo-Startseite'), t('Redesign · Nachher — nach Umsetzung der Findings.', 'Redesign · After — after implementing the findings.'), 'b')}
            </div>
            {card(
              <div>
                {cardTitle(t('Zentrale Findings', 'Key Findings'))}
                <ul style={{ margin: 0, paddingLeft: 18, display: 'grid', gap: 8 }}>
                  {[t('Service-Hotline prominenter platzieren — an ihrer bisherigen Stelle bietet sich ein Rabattcode an.', 'Place the service hotline more prominently — a discount code fits well in its former spot.'), t('Uneinheitliche Abstände zwischen Icons und Elementen vereinheitlichen.', 'Unify inconsistent spacing between icons and elements.'), t('Überdimensionierten Bannerbereich verschlanken; Banner und Icons als ein Block, störenden weißen Balken entfernen.', 'Slim down the oversized banner area; banner and icons as one block, remove the distracting white bar.'), t('Zu viele Elemente — teils erst bei Hover sichtbar — gezielt reduzieren.', 'Reduce too many elements — some only visible on hover.'), t('Primären CTA „Alle Weinpakete entdecken" klarer hervorheben.', 'Make the primary CTA "Discover all wine packages" stand out more clearly.')].map((tx, i) => (
                    <li key={i} style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(15,41,64,0.72)' }}>{tx}</li>
                  ))}
                </ul>
              </div>,
            )}
          </div>
        ),
      },
      {
        label: t('Banner & Kampagnen', 'Banners & Campaigns'),
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {lead(t('Aktions- und Kampagnenbanner für Startseite, Kategorien und Newsletter — von saisonalen Sales bis zu Sortiments-Highlights. Konzept, Bildauswahl, Freistellung und Layout in Adobe Photoshop.', 'Promotional and campaign banners for the homepage, categories and newsletters — from seasonal sales to range highlights. Concept, image selection, clipping and layout in Adobe Photoshop.'))}
            {gallery([
              { src: '/img/projects/vicampo/banner-wine-in-black.jpg', alt: 'Wine in Black · Los Wochos' },
              { src: '/img/projects/vicampo/banner-weinjoker.png', alt: 'Sortiments-Teaser' },
              { src: '/img/projects/vicampo/banner-frankreich.jpg', alt: 'Frankreich · Flash Sale' },
              { src: '/img/projects/vicampo/banner-zubehoer.webp', alt: 'Zubehör zum Weingenuss' },
              { src: '/img/projects/vicampo/banner-premium.webp', alt: 'Premium-Weine' },
              { src: '/img/projects/vicampo/banner-herodeal.jpg', alt: 'Hero Deal · Mobile' },
            ], 300)}
          </div>
        ),
      },
      {
        label: t('KI-Bildproduktion', 'AI Image Production'),
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {lead(t('Für Vicampos Kampagnen-Bildbibliothek — über 80 Motive im aktiven Einsatz — produzierte ich Bildmaterial mit KI-gestützten Workflows: Prompting, Generierung und Compositing in Photoshop, kombiniert mit kuratierter Fotografie.', 'For Vicampo\'s campaign image library — over 80 motifs in active use — I produced imagery with AI-assisted workflows: prompting, generation and compositing in Photoshop, combined with curated photography.'))}
            {gallery([1, 2, 3, 4, 5, 6, 7].map((n) => ({ src: `/img/projects/vicampo/ki/ki-0${n}.jpg`, alt: 'Kampagnenbild aus Vicampos Bildbibliothek' })), 240)}
          </div>
        ),
      },
      {
        label: t('Ergebnisse', 'Results'),
        content: (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
            {[
              { metric: t('2 Jahre', '2 years'), label: t('Betriebszugehörigkeit & eigenverantwortliche Tätigkeit', 'Tenure & independent responsibility') },
              { metric: t('Sehr gut', 'Very good'), label: t('Gesamtnote im Abschlusszeugnis', 'Overall grade in the final reference') },
            ].map((m) => (
              <div key={m.metric} className="glass-card" style={{ padding: '28px 28px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem,6vw,3.2rem)', letterSpacing: '-0.04em', color: '#0F2940', lineHeight: 1, marginBottom: 12, position: 'relative', zIndex: 1 }}>{m.metric}</div>
                <div style={{ fontSize: 12.5, color: 'rgba(15,41,64,0.72)', lineHeight: 1.5, position: 'relative', zIndex: 1 }}>{m.label}</div>
              </div>
            ))}
          </div>
        ),
      },
    ],
    nextSlug: 'studybuddy',
    nextName: 'StudyBuddy',
  },

  /* ── STUDYBUDDY ─────────────────────────────────────────── */
  studybuddy: {
    title: 'StudyBuddy — UX/UI',
    description: t('CPUX-Capstone: Mobile App mit strukturierten Lernblöcken, Fokus-Timer und Reflexion nach jeder Session.', 'CPUX capstone: mobile app with structured study blocks, a focus timer and reflection after each session.'),
    accent: '#83cae2',
    category: t('UX/UI · Mobile · CPUX', 'UX/UI · Mobile · CPUX'),
    tools: 'Figma · FigJam · Miro',
    role: t('Solo — UX Designer', 'Solo — UX Designer'),
    year: '2024',
    heroImg: '/img/projects/studybuddy-thumbnail.webp',
    intro: t('StudyBuddy ist mein CPUX-Capstone-Projekt: eine mobile App, die Studierende dabei unterstützt, strukturierte Lernblöcke zu planen, mit einem ablenkungsfreien Timer zu arbeiten und danach kurz zu reflektieren — alles in einer warmen, tagebuchähnlichen Ästhetik.', 'StudyBuddy is my CPUX capstone project: a mobile app that helps students plan structured study blocks, work with a distraction-free timer and briefly reflect afterwards — all in a warm, journal-like aesthetic.'),
    sections: [
      {
        label: 'Problem & Lösung',
        content: grid2(
          <>{cardTitle('Herausforderung', '#a855f766')}{cardBody('Studierende verlieren sich in langen, unstrukturierten Sessions ohne Pausen und wissen danach nicht, wie produktiv sie wirklich waren. Bestehende Tools wie Kalender-Apps oder reine Timer bieten keine Verbindung zur eigentlichen Lernerfahrung.')}</>,
          <>{cardTitle('Lösung', '#a855f766')}{cardBody('StudyBuddy ermöglicht strukturierte Lernblöcke — Fach, Dauer, Lerntyp — kombiniert mit einem fokussierten Timer und einer kurzen Post-Session-Reflexion. Der gesamte Kernflow dauert unter 15 Sekunden.')}</>,
        ),
      },
      {
        label: 'User Persona',
        content: card(
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18, marginBottom: 20, flexWrap: 'wrap' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(131,202,226,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>👩‍🎓</div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: '#0F2940', marginBottom: 3 }}>Lena Hofmann, 23</div>
                <div style={{ fontSize: 13, color: 'rgba(15,41,64,0.72)' }}>BWL, 4. Semester · iPhone — unterwegs und am Schreibtisch</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 14 }}>
              {[['Ziel','Effizient lernen ohne den Überblick zu verlieren'],['Frustration','Weiß nach stundenlangem Lernen nicht, was erreicht wurde'],['Bedarf','Struktur — aber ohne zusätzlichen Stress'],['Gerät','iPhone, unterwegs & am Schreibtisch']].map(([k,v]) => (
                <div key={k}>
                  <div className="mono-label" style={{ marginBottom: 4, fontSize: 9 }}>{k}</div>
                  <div style={{ fontSize: 13, color: 'rgba(15,41,64,0.72)' }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        label: 'UX-Prozess',
        content: (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14 }}>
            {[
              { n: 'P1', t: 'Research', b: 'Desk Research: Forest, Pomodoro Timer, StudySmarter, Notion. Key Insight: kein Tool kombiniert Planung, Timer und Reflexion. Persona Lena aus Findings entwickelt.', h: '10h' },
              { n: 'P2', t: 'Konzeption', b: '3 Kernfunktionen definiert: Blockanlage, Fokustimer, Reflexion. 6-Screen-User-Flow von App-Öffnung bis Sessionende. Low-Fi-Bleistift-Wireframes.', h: '15h' },
              { n: 'P3', t: 'Design', b: 'Style-Tile um "Tagebucheintrag"-Konzept: warme Pastelltöne auf Creme. Bewusstes Dark Mode für den Timer als psychologisches Fokussignal. Hi-Fi-Mockups & Figma-Prototyp.', h: '20h' },
              { n: 'P4', t: 'Dokumentation', b: 'Alle Designentscheidungen dokumentiert. Wichtigstes Learning: Das Schwierigste war das Weglassen von Features — jeder extra Screen ist ein potenzieller Drop-off-Punkt.', h: '5h' },
            ].map((step, i) => card(
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(15,41,64,0.72)' }}>{step.n}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(15,41,64,0.72)', background: 'rgba(131,202,226,0.12)', padding: '1px 7px', borderRadius: 4 }}>{step.h}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'rgba(15,41,64,0.90)', marginBottom: 8 }}>{step.t}</div>
                <div style={{ fontSize: 12.5, color: 'rgba(15,41,64,0.72)', lineHeight: 1.6 }}>{step.b}</div>
              </div>,
              { padding: '22px 22px' }, i,
            ))}
          </div>
        ),
      },
      {
        label: 'User Flow',
        content: card(
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
              {['Home','Block anlegen','Bereit?','Timer','Fertig!','Home'].map((step, i, arr) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="glass-pill" style={{ fontSize: 11.5, whiteSpace: 'nowrap' }}>{step}</span>
                  {i < arr.length - 1 && <span style={{ color: 'rgba(15,41,64,0.55)', fontSize: 11 }}>→</span>}
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        label: 'Key Features',
        content: (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
            {[
              { t: 'Lernblock-Erstellung', b: 'Fach, Dauer und Lerntyp (Lesen / Üben / Zusammenfassen) in einer Ansicht anlegen.' },
              { t: 'Fokus-Timer', b: 'Minimaler Dark-Mode-Timer — ein Tap zum Beenden, Wischen zum Pausieren. Keine Ablenkungen.' },
              { t: 'Post-Session-Reflexion', b: 'Stimmungs-Emoji und optionale Kurznotiz nach jeder Session — leicht, persönlich, motivierend.' },
              { t: 'Streak & Fortschritt', b: 'Täglicher Streak-Counter mit visuellem Fortschrittsfeedback. Gesamter Kernflow unter 15 Sekunden.' },
            ].map((f, i) => card(<>{cardTitle(f.t, '#a855f766')}{cardBody(f.b)}</>, undefined, i))}
          </div>
        ),
      },
    ],
    nextSlug: 'branding',
    nextName: 'Branding',
  },

  /* ── BRANDING ───────────────────────────────────────────── */
  branding: {
    title: 'Brand Identities',
    description: t('Drei vollständige Brand-Identities: AeroLeaf, NordWand und SüßMund Pâtisserie.', 'Three complete brand identities: AeroLeaf, NordWand and SüßMund Pâtisserie.'),
    accent: '#fe8684',
    category: t('Grafikdesign · Logodesign · Branding', 'Graphic Design · Logo Design · Branding'),
    tools: 'Adobe Illustrator · Photoshop',
    role: t('Solo — Brand Designer', 'Solo — Brand Designer'),
    year: '2023–2024',
    heroImg: '/img/projects/branding-thumbnail.webp',
    intro: t('Eine Auswahl vollständiger Brand-Identities — von der Positionierung über das Logo bis zu Farb- und Typografiesystem. Jede Marke folgt einem klaren Konzept und ist konsequent auf ihre Zielgruppe ausgerichtet.', 'A selection of complete brand identities — from positioning to logo to color and typography system. Each brand follows a clear concept and is consistently aligned with its target audience.'),
    sections: [
      {
        label: 'AeroLeaf',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(131,202,226,0.18)' }}>
              <img src="/img/projects/AeroLeaf_01.webp" alt="AeroLeaf Brand Mockup" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
              {card(<>{cardTitle('Konzept', '#39FF1466')}{cardBody('Berliner AgriTech-Startup für smarte Hydroponiksysteme — Gemüseanbau in kleinen Wohnungen und Büros ohne Tageslicht. Zielgruppe: umweltbewusste Stadtbewohner (25–40). Die Marke vereint Innovation, Sauberkeit und eine futuristische, aber organische Persönlichkeit.')}</>)}
              {card(<>{cardTitle('Identität', '#39FF1466')}{cardBody('Tagline: "Where nature meets German engineering." Farbpalette: Neongrün auf Tiefschwarz. Typografie: Geometric Sans mit technischem Charakter. Anwendungen: Produktpackaging, App-Icon, Showroom-Beschilderung.')}</>)}
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {['Brand Identity','Logo Design','Style Guide','AgriTech','Berlin','Sustainable'].map(t => (
                <span key={t} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(15,41,64,0.72)', border: '1px solid rgba(131,202,226,0.30)', borderRadius: 4, padding: '3px 9px', fontFamily: 'var(--font-mono)' }}>{t}</span>
              ))}
            </div>
          </div>
        ),
      },
      {
        label: 'NordWand',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(131,202,226,0.18)' }}>
              <img src="/img/projects/NordWand_01.webp" alt="NordWand Brand Mockup" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
              {card(<>{cardTitle('Konzept', '#e8601f66')}{cardBody('Hamburger Premium-Bekleidungsmarke für extreme Klimabedingungen — 100% recycelte Materialien, urbane monochromatische Ästhetik. Zielgruppe: Abenteurer, Kletterer und Stadtbewohner im Regen mit Gorpcore-Affinität. Die Marke verkörpert Belastbarkeit, Stoizismus und Minimalismus.')}</>)}
              {card(<>{cardTitle('Identität', '#e8601f66')}{cardBody('Tagline: "Protection against the elements." Farbpalette: Tiefes Schiefergrau, Schneeweiss, Eismatt-Akzent. Logo: Kondensierte Typografie mit geometrischem Berggipfelelement. Anwendungen: Jacken, Retail-Signage, Produktcards.')}</>)}
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {['Brand Identity','Logo Design','Style Guide','Outdoor Fashion','Hamburg','Sustainable','Gorpcore'].map(t => (
                <span key={t} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(15,41,64,0.72)', border: '1px solid rgba(131,202,226,0.30)', borderRadius: 4, padding: '3px 9px', fontFamily: 'var(--font-mono)' }}>{t}</span>
              ))}
            </div>
          </div>
        ),
      },
      {
        label: 'SüßMund Pâtisserie',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(131,202,226,0.18)' }}>
              <img src="/img/projects/Sussmund_03.webp" alt="SüßMund Pâtisserie" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
              {card(<>{cardTitle('Konzept', '#fa8ab466')}{cardBody('Kölner Boutique-Konditorei, die französische Pâtisserie mit deutschen Zutaten wie Marzipan und Waldbeeren verbindet. Zielgruppe: Paare, Hochzeitsplaner und Liebhaber erschwinglichen Luxus. Die Marke verkörpert Zartheit, Verspieltheit, Eleganz und Romantik.')}</>)}
              {card(<>{cardTitle('Identität', '#fa8ab466')}{cardBody('Tagline: "Little edible jewels." Farbpalette: Creme, tiefes Bordeauxrot, Goldakzent. Logo: Verschlungene Initialen mit Gebäckmotiv. Typografie: Klassische Serifenschrift für Display. Anwendungen: Packaging, Visitenkarten, Schaufensterbeschriftung.')}</>)}
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {['Brand Identity','Logo Design','Style Guide','Gastronomy','Cologne','Mascot Design','Packaging'].map(t => (
                <span key={t} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(15,41,64,0.72)', border: '1px solid rgba(131,202,226,0.30)', borderRadius: 4, padding: '3px 9px', fontFamily: 'var(--font-mono)' }}>{t}</span>
              ))}
            </div>
          </div>
        ),
      },
    ],
    nextSlug: 'schwimmspass',
    nextName: 'SchwimmSpass',
  },

  /* ── SCHWIMMSPASS ───────────────────────────────────────── */
  schwimmspass: {
    title: 'SchwimmSpass — UX/UI',
    description: t('App-Redesign für einen Mainzer Schwimmkursanbieter — optimiert für Eltern mit Kindern im Vorschulalter.', 'App redesign for a Mainz-based swimming-course provider — optimized for parents with preschool children.'),
    accent: '#83cae2',
    category: t('Mobile App · UX/UI', 'Mobile App · UX/UI'),
    tools: 'Figma · Maze · Miro',
    role: t('Solo — UX/UI Designer', 'Solo — UX/UI Designer'),
    year: '2023',
    heroImg: '/img/projects/schwimmspass-thumbnail.webp',
    intro: t('SchwimmSpass ist ein App-Redesign-Konzept für einen Mainzer Anbieter von Kinderschwimmkursen. Das Ziel: Die Kursanmeldung und -verwaltung für vielbeschäftigte Eltern so einfach wie möglich zu gestalten.', 'SchwimmSpass is an app redesign concept for a Mainz-based provider of children\'s swimming courses. The goal: to make course registration and management as simple as possible for busy parents.'),
    sections: [
      {
        label: 'Problem & Kontext',
        content: grid2(
          <>{cardTitle('Ausgangssituation', '#06b6d466')}{cardBody('Die bestehende Lösung des Anbieters war ein PDF-Formular per E-Mail. Eltern mussten Kurstermine manuell abgleichen, Dokumente ausdrucken und einschicken. Kein App-Angebot, keine digitale Rückmeldung.')}</>,
          <>{cardTitle('Zielgruppe', '#06b6d466')}{cardBody('Eltern von Kindern im Alter von 3–6 Jahren, berufstätig, mit begrenztem Zeitbudget. Hauptgerät: Smartphone. Hauptbedürfnis: schnelle, übersichtliche Kursanmeldung und -verwaltung.')}</>,
        ),
      },
      {
        label: 'Designentscheidungen',
        content: (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 16 }}>
            {[
              { t: 'Onboarding', b: 'Kinddaten einmalig anlegen; bei Folgebuchungen entfällt jede Dateneingabe.' },
              { t: 'Kursfilter', b: 'Filterung nach Altersgruppe, Uhrzeit und Wochentag — direkt auf dem Startscreen.' },
              { t: 'Buchungsflow', b: 'Unter 3 Taps vom Kurs zur Bestätigung. Kalenderintegration per Deep Link.' },
              { t: 'Fortschritt', b: 'Visueller Badge-Fortschrittsbalken für jedes Kind — motivierend für Eltern.' },
            ].map((d, i) => card(<>{cardTitle(d.t, '#06b6d466')}{cardBody(d.b)}</>, undefined, i))}
          </div>
        ),
      },
      {
        label: 'Usability-Test',
        content: card(cardBody('Fünf moderierte Tests mit Eltern (online, per Maze). Hauptfinding: Der Buchungsabschluss-Button war in der ersten Version schwer findbar (Farbe zu ähnlich wie Hintergrund). Überarbeitung: Höherer Kontrast, größere Touch-Target-Area. Sekundäres Finding: Eltern wollten den Kursleiter sehen — Leiterbild und Kurzprofil wurden in v2 ergänzt.')),
      },
    ],
    nextSlug: 'squishy-savings',
    nextName: 'Squishy Savings',
  },

  /* ── SQUISHY SAVINGS ────────────────────────────────────── */
  'squishy-savings': {
    title: 'Squishy Savings',
    description: t('Mobile Finance-App mit lokaler Datenspeicherung — Sparkonten, Ausgaben-Tracking und Sparziele ohne Cloud oder Registrierung.', 'Mobile finance app with local data storage — savings accounts, expense tracking and savings goals without cloud or registration.'),
    accent: '#fe8684',
    category: t('UX/UI · Mobile App · FinTech', 'UX/UI · Mobile App · FinTech'),
    tools: 'Figma · Procreate · FigJam',
    role: t('Solo — UX/UI Designer', 'Solo — UX/UI Designer'),
    year: '2024',
    heroImg: '/img/projects/mosaic-savings.webp',
    intro: t('Squishy Savings ist eine Mobile-Finance-App mit verspielter, weicher Ästhetik und einem klaren Ansatz: alle Finanzdaten lokal auf dem Gerät — maximale Privatsphäre, null Abhängigkeiten, keine Registrierung erforderlich.', 'Squishy Savings is a mobile finance app with a playful, soft aesthetic and a clear approach: all financial data stored locally on the device — maximum privacy, zero dependencies, no registration required.'),
    sections: [
      {
        label: 'Problem & Lösung',
        content: grid2(
          <>{cardTitle('Herausforderung', '#f59e0b66')}{cardBody('Die meisten Spar-Apps erfordern eine Kontoverbindung, Cloud-Sync oder Registrierung. Viele Nutzer möchten ihre Finanzdaten privat halten und nicht teilen — aber dennoch einen klaren Überblick über Ersparnisse, Ausgaben und Sparziele.')}</>,
          <>{cardTitle('Lösung', '#f59e0b66')}{cardBody('Ein Mobile-First-Design mit weicher, spielerischer Ästhetik (hence "Squishy"). Klare Struktur für Sparkonten, Einnahmen-/Ausgaben-Tracking und persönliche Sparziele mit visuellem Fortschritt. Alles ohne Server, ohne Login.')}</>,
        ),
      },
      {
        label: 'UX-Prozess',
        content: (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14 }}>
            {[
              { n: '01', t: 'Nutzeranalyse', b: 'Personas für Nutzer, die Privatsphäre priorisieren. Pain Points bei bestehenden Finanz-Apps: Komplexität, Datenweitergabe, Registrierungspflicht.' },
              { n: '02', t: 'Information Architecture', b: 'Low-Fidelity-Wireframes für Hauptscreens: Dashboard, Sparkonten, Transaktionen, Sparziele.' },
              { n: '03', t: 'Visuelles Design', b: 'Verspieltes Design-System in Figma — weiche Formen, warme Grüntöne, klare Datenhierarchie und zugängliche Typografie.' },
              { n: '04', t: 'Klickbarer Prototyp', b: 'Vollständiger interaktiver Prototyp: von der Kontoerstellung über Ausgaben-Tracking bis zur Zielübersicht.' },
            ].map((step, i) => card(
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(15,41,64,0.72)', marginBottom: 8 }}>{step.n}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'rgba(15,41,64,0.90)', marginBottom: 8 }}>{step.t}</div>
                <div style={{ fontSize: 12.5, color: 'rgba(15,41,64,0.72)', lineHeight: 1.6 }}>{step.b}</div>
              </div>,
              { padding: '22px 22px' }, i,
            ))}
          </div>
        ),
      },
      {
        label: 'Key Features',
        content: (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
            {[
              { t: 'Lokale Datenspeicherung', b: 'Keine Registrierung, kein Cloud-Sync. Alle Finanzdaten bleiben vollständig auf dem Gerät.' },
              { t: 'Mehrere Sparkonten', b: 'Mehrere Konten gleichzeitig verwalten — Urlaub, Notgroschen, Anschaffungen.' },
              { t: 'Einnahmen & Ausgaben', b: 'Transaktionen erfassen und kategorisieren; Ausgabenlimit pro Konto festlegen.' },
              { t: 'Visuelle Sparziele', b: 'Persönliche Ziele mit visuellem Fortschrittsbalken — motivierend, ohne Gamification-Zwang.' },
            ].map((f, i) => card(<>{cardTitle(f.t, '#f59e0b66')}{cardBody(f.b)}</>, undefined, i))}
          </div>
        ),
      },
    ],
    nextSlug: 'sentinel',
    nextName: 'Sentinel',
  },

  /* ── SENTINEL ───────────────────────────────────────────── */
  sentinel: {
    title: 'Sentinel — Dashboard',
    description: t('Web-App für das Echtzeit-Monitoring von Online-Shops — Verkäufe, Lagerbestand und Traffic in einem klaren Dark-UI-Dashboard.', 'Web app for real-time monitoring of online shops — sales, inventory and traffic in a clean dark-UI dashboard.'),
    accent: '#83cae2',
    category: t('UX/UI · Dashboard · Web App', 'UX/UI · Dashboard · Web App'),
    tools: 'Figma · React',
    role: t('Solo — UX/UI & Frontend Developer', 'Solo — UX/UI & Frontend Developer'),
    year: '2024',
    heroImg: '/img/projects/mosaic-sentinel.webp',
    intro: t('Sentinel ist eine Web-App für das Echtzeit-Monitoring von Online-Shops — Verkaufszahlen, Lagerbestand und Traffic auf einen Blick, in einem klaren Dark-UI-Dashboard. Designed in Figma, entwickelt mit React und live auf Vercel deployed.', 'Sentinel is a web app for real-time monitoring of online shops — sales figures, inventory and traffic at a glance, in a clean dark-UI dashboard. Designed in Figma, built with React and deployed live on Vercel.'),
    sections: [
      {
        label: 'Problem & Lösung',
        content: grid2(
          <>{cardTitle('Herausforderung', '#0ea5e966')}{cardBody('Betreiber von Online-Shops brauchen Echtzeit-Einblick in ihr Geschäft — Verkäufe, Lagerbestände, Traffic — aber die meisten Tools sind zu komplex, zu teuer oder nicht auf kleine und mittlere Shops zugeschnitten.')}</>,
          <>{cardTitle('Lösung', '#0ea5e966')}{cardBody('Eine fokussierte Web-App mit minimalem Dark-UI-Dashboard. Verkaufszahlen, Lagerstand und Traffic sind auf einen Blick erfassbar — mit visuellen Alerts für kritische Ereignisse und einer Oberfläche, die keine Einarbeitung erfordert.')}</>,
        ),
      },
      {
        label: 'UX-Prozess',
        content: (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14 }}>
            {[
              { n: '01', t: 'Nutzeranalyse', b: 'Interviews mit Shop-Betreibern: welche Metriken sind täglich kritisch? Welche Tools nutzen sie, was frustriert sie?' },
              { n: '02', t: 'Information Architecture', b: 'Strukturierung der Datenhierarchie — was gehört ins Dashboard, was in die Detailansicht? Low-Fi-Wireframes für alle Hauptansichten.' },
              { n: '03', t: 'Dark UI System', b: 'Design-System in Figma — Farbpalette, Komponenten, Datencharts und Typografie-Hierarchie. Optimiert für lange Monitoring-Sessions.' },
              { n: '04', t: 'Live App', b: 'Vollständige Web-App mit React entwickelt und auf Vercel deployed — Echtzeit-Daten, Alertsystem und responsives Dashboard-Layout.' },
            ].map((step, i) => card(
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(15,41,64,0.72)', marginBottom: 8 }}>{step.n}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'rgba(15,41,64,0.90)', marginBottom: 8 }}>{step.t}</div>
                <div style={{ fontSize: 12.5, color: 'rgba(15,41,64,0.72)', lineHeight: 1.6 }}>{step.b}</div>
              </div>,
              { padding: '22px 22px' }, i,
            ))}
          </div>
        ),
      },
      {
        label: 'Key Features',
        content: (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
            {[
              { t: 'Echtzeit-Verkaufsmetriken', b: 'Umsatzübersicht und Verkaufszahlen in Echtzeit — täglich, wöchentlich, monatlich vergleichbar.' },
              { t: 'Lagerbestand-Monitoring', b: 'Bestandsübersicht mit automatischen Alerts bei niedrigem Stock — kein manuelles Prüfen mehr.' },
              { t: 'Traffic-Visualisierung', b: 'Besucher, Conversion Rate und Absprungraten im Blick — mit Trend-Indikatoren.' },
              { t: 'Bestellübersicht', b: 'Aktuelle Bestellungen mit Status-Tracking auf einem zentralen Dashboard-Screen.' },
            ].map((f, i) => card(<>{cardTitle(f.t, '#0ea5e966')}{cardBody(f.b)}</>, undefined, i))}
          </div>
        ),
      },
    ],
    nextSlug: 'weinfuerst',
    nextName: 'Weinfürst',
  },

  /* ── WEINFÜRST — GOLDSTATUS ─────────────────────────────── */
  weinfuerst: {
    title: t('Weinfürst — Goldstatus', 'Weinfürst — Gold Status'),
    description: t('Grafik- und Designarbeit rund um das Goldstatus-Treueprogramm des Online-Weinhändlers Weinfürst.', 'Graphic and design work around the Gold Status loyalty programme of the online wine retailer Weinfürst.'),
    accent: '#83cae2',
    category: t('Grafik · Web · Kampagne', 'Graphics · Web · Campaign'),
    tools: 'Photoshop · Figma · Shopify',
    role: t('Grafik & Design', 'Graphics & Design'),
    year: '2023–2025',
    heroImg: '/img/projects/live/weinfuerst-shot.jpg',
    heroImgPos: '50% 0%',
    logo: '/img/logos/weinfuerst.svg',
    liveUrl: 'https://www.weinfuerst.de/pages/info-goldstatus',
    liveLabel: 'weinfuerst.de',
    intro: t('Weinfürst ist ein deutscher Online-Weinhändler mit kuratiertem Sortiment. Für die Goldstatus-Seite — das Treueprogramm mit Toppreis-Garantie, exklusivem Sortiment und regelmäßigen Aktionen — habe ich an der grafischen Gestaltung und den Kampagnen-Assets mitgewirkt.', 'Weinfürst is a German online wine retailer with a curated range. For the Gold Status page — the loyalty programme with a best-price guarantee, an exclusive range and regular promotions — I contributed to the graphic design and campaign assets.'),
    sections: [
      {
        label: t('Kontext', 'Context'),
        content: grid2(
          <>{cardTitle(t('Die Marke', 'The Brand'))}{cardBody(t('Weinfürst ist ein deutscher Online-Weinhändler mit breitem, kuratiertem Sortiment. Der Shop setzt auf klare Preise, Nachhaltigkeit (klimaneutraler Versand) und wurde u. a. als „Händler des Jahres" ausgezeichnet.', 'Weinfürst is a German online wine retailer with a broad, curated range. The shop focuses on clear pricing, sustainability (climate-neutral shipping) and was recognised as "Retailer of the Year", among other awards.'))}</>,
          <>{cardTitle(t('Das Goldstatus-Programm', 'The Gold Status Programme'))}{cardBody(t('Goldstatus ist das kostenlose Treueprogramm von Weinfürst: Toppreis-Garantie, ein exklusives Sortiment mit über 500 Weinen sowie regelmäßige Aktionen und Geschenke — Vorteile, die sich automatisch durch Einkäufe aktivieren.', 'Gold Status is Weinfürst\'s free loyalty programme: a best-price guarantee, an exclusive range of over 500 wines plus regular promotions and gifts — benefits that activate automatically through purchases.'))}</>,
        ),
      },
      {
        label: t('Mein Beitrag', 'My Contribution'),
        content: card(cardBody(t('Grafische Gestaltung und Design-Assets für die Goldstatus-Kommunikation im Live-Shop — von Kampagnen-Grafiken über Vorteils-Icons bis zu konsistenten, markengerechten Layouts. Ziel war eine klare, wertige Darstellung des Treueprogramms, die den Nutzen für Kund:innen auf einen Blick vermittelt.', 'Graphic design and design assets for the Gold Status communication in the live shop — from campaign graphics and benefit icons to consistent, on-brand layouts. The goal was a clear, high-quality presentation of the loyalty programme that conveys the benefits to customers at a glance.'))),
      },
      {
        label: t('Live im Shop', 'Live in the Shop'),
        content: shot('/img/projects/live/weinfuerst-shot.jpg', 'Weinfürst Goldstatus-Seite', t('Die Goldstatus-Seite — live im Weinfürst-Onlineshop.', 'The Gold Status page — live in the Weinfürst online shop.')),
      },
    ],
    nextSlug: 'tuv-nord-akademie',
    nextName: 'TÜV Nord Akademie',
  },

  /* ── TÜV NORD AKADEMIE (SMARTFOX) ───────────────────────── */
  'tuv-nord-akademie': {
    title: t('TÜV Nord Akademie — E-Learning', 'TÜV Nord Akademie — E-Learning'),
    description: t('Illustrationen, Animation und digitale Fachartikel für interaktive E-Learning-Kurse der TÜV Nord Akademie.', 'Illustrations, animation and digital articles for interactive e-learning courses of the TÜV Nord Akademie.'),
    accent: '#fe8684',
    category: t('Illustration · E-Learning · Motion · 3D/VR', 'Illustration · E-Learning · Motion · 3D/VR'),
    tools: 'Illustrator · Photoshop · After Effects · SimLab · Blender',
    role: t('Illustration & Motion (bei Smartfox)', 'Illustration & Motion (at Smartfox)'),
    year: '2021–2023',
    heroImg: '/img/projects/live/yt-tuv.jpg',
    heroImgPos: '50% 40%',
    logo: '/img/logos/smartfox.svg',
    liveUrl: 'https://www.youtube.com/watch?v=RUcT0AwjBN0',
    liveLabel: t('Video ansehen', 'Watch video'),
    intro: t('Während meiner Ausbildung bei der Smartfox Media Group habe ich an interaktiven Online-Unterweisungen der TÜV Nord Akademie mitgewirkt — Kurse rund um Arbeits- und Gesundheitsschutz. Mein Fokus lag auf Illustrationen, Animation und digitalen Fachartikeln.', 'During my apprenticeship at Smartfox Media Group I contributed to interactive online training courses for the TÜV Nord Akademie — courses on occupational health and safety. My focus was on illustration, animation and digital articles.'),
    sections: [
      {
        label: t('Kontext', 'Context'),
        content: grid2(
          <>{cardTitle(t('Smartfox & TÜV Nord Akademie', 'Smartfox & TÜV Nord Akademie'))}{cardBody(t('Statt aufwändiger Präsenz-Unterweisungen entwickelte Smartfox eine Vielzahl interaktiver Online-Kurse zum Thema Arbeits- und Gesundheitsschutz — eine komplette digitale Akademie mit Animationen, Storytelling und Wissensabfragen.', 'Instead of costly in-person training, Smartfox developed a wide range of interactive online courses on occupational health and safety — a complete digital academy with animations, storytelling and knowledge checks.'))}</>,
          <>{cardTitle(t('Die Aufgabe', 'The Task'))}{cardBody(t('Trockene, expert:innengeschriebene Sicherheitsinhalte sollten in ansprechende, verständliche Lernmodule verwandelt werden — visuell konsistent, zugänglich und motivierend.', 'Dry, expert-written safety content had to be turned into engaging, understandable learning modules — visually consistent, accessible and motivating.'))}</>,
        ),
      },
      {
        label: t('Mein Beitrag', 'My Contribution'),
        content: (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
            {[
              { t: t('Illustration', 'Illustration'), b: t('Charakter- und Szenen-Illustrationen im einheitlichen Line-Art-Stil — die visuelle Grundlage der Lernmodule.', 'Character and scene illustrations in a consistent line-art style — the visual foundation of the learning modules.') },
              { t: t('Animation & Motion', 'Animation & Motion'), b: t('Umsetzung der Illustrationen in animierte Sequenzen für die E-Learning-Videos.', 'Turning the illustrations into animated sequences for the e-learning videos.') },
              { t: t('Storytelling', 'Storytelling'), b: t('Übersetzung komplexer Schutz-Inhalte in nachvollziehbare, alltagsnahe Bildgeschichten.', 'Translating complex safety content into relatable, everyday visual stories.') },
              { t: t('Digitale Fachartikel', 'Digital Articles'), b: t('Gestaltung digitaler Artikel und eines Whitepapers rund um die Themen der Akademie.', 'Design of digital articles and a whitepaper around the academy\'s topics.') },
            ].map((f, i) => card(<>{cardTitle(f.t)}{cardBody(f.b)}</>, undefined, i))}
          </div>
        ),
      },
      {
        label: t('Website', 'Website'),
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {lead(t('Eine meiner ersten großen Aufgaben bei Smartfox: das Design der Website-Startseite — Aufbau, visuelle Hierarchie und Bildsprache für den Webauftritt der Agentur.', 'One of my first major tasks at Smartfox: designing the website homepage — structure, visual hierarchy and imagery for the agency\'s web presence.'))}
            <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(131,202,226,0.28)', boxShadow: '0 8px 28px rgba(15,41,64,0.12)', background: '#fff', maxWidth: 900 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 14px', borderBottom: '1px solid rgba(15,41,64,0.08)', background: 'rgba(238,247,251,0.7)' }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'rgba(15,41,64,0.16)' }} />
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'rgba(15,41,64,0.16)' }} />
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'rgba(15,41,64,0.16)' }} />
                <span style={{ marginLeft: 8, fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'rgba(15,41,64,0.5)' }}>smartfox-media.de</span>
              </div>
              <div style={{ maxHeight: 540, overflowY: 'auto' }}>
                <img src="/img/projects/smartfox/website-startseite.jpg" alt="Startseite der von mir gestalteten Smartfox-Website" style={{ width: '100%', display: 'block' }} loading="lazy" />
              </div>
            </div>
            <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'rgba(15,41,64,0.55)', fontStyle: 'italic' }}>{t('Vollständige Startseite — im Rahmen scrollbar.', 'Full homepage — scrollable within the frame.')}</p>
          </div>
        ),
      },
      {
        label: t('Illustrationen', 'Illustrations'),
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {lead(t('Über 50 Illustrationen für Arbeitsschutz- und Sicherheitsunterweisungen — ein durchgängiger, freundlicher Zeichenstil, der komplexe Vorschriften greifbar macht. Themen u. a. Führungskräfte, Erste Hilfe, Bildschirmarbeitsplätze, Brandschutz, Gabelstapler und IT-Sicherheit.', 'Over 50 illustrations for occupational-safety and health training — a consistent, friendly drawing style that makes complex regulations tangible. Topics include leadership, first aid, screen workstations, fire safety, forklifts and IT security.'))}
            {masonry([
              { src: '/img/projects/smartfox/illu/illu-01.jpg', alt: 'E-Learning Illustration' },
              { src: '/img/projects/smartfox/illu/illu-04.jpg', alt: 'E-Learning Illustration' },
              { src: '/img/projects/smartfox/illu/illu-03.jpg', alt: 'Isometrische Illustration — IT-Sicherheit' },
              { src: '/img/projects/smartfox/illu/illu-02.jpg', alt: 'E-Learning Illustration' },
            ], 250)}
          </div>
        ),
      },
      {
        label: t('Animation & Illustration', 'Animation & Illustration'),
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {ytEmbed('RUcT0AwjBN0', 'TÜV Nord Akademie — E-Learning (Illustration & Animation)')}
            {shot('/img/projects/live/tuv-mockup.webp', 'TÜV Nord Akademie E-Learning Mockup', t('Die Lernplattform im Einsatz — Mockup des Smartfox-Projekts.', 'The learning platform in use — mockup of the Smartfox project.'), '50% 50%')}
          </div>
        ),
      },
      {
        label: t('Video & Motion', 'Video & Motion'),
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {lead(t('Animierte Erklärvideos für Arbeitsschutz- und Gesundheits-E-Learnings — Storyboard, Illustration, Animation und Compositing in Adobe After Effects.', 'Animated explainer videos for occupational-safety and health e-learnings — storyboard, illustration, animation and compositing in Adobe After Effects.'))}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 16 }}>
              {videoCard('/video/smartfox-elearning-intro.mp4', t('Allgemeine Einleitung · Flurförderzeuge', 'General Introduction · Industrial Trucks'), 1)}
              {videoCard('/video/smartfox-psychische-belastung.mp4', t('Psychische Belastung · Arbeitsschutz', 'Mental Strain · Occupational Safety'), 2)}
              {videoCard('/video/smartfox-neurodermitis.mp4', t('Neurodermitis · Gesundheit', 'Atopic Dermatitis · Health'), 3)}
            </div>
          </div>
        ),
      },
      {
        label: t('VR / 3D', 'VR / 3D'),
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {lead(t('Ein interaktives VR-Trainingsumfeld zur sicheren Bedienung eines Gabelstaplers. Ich habe die komplette 3D-Umgebung modelliert und gerendert und die bereitgestellten Inhalte und Texte zu einem immersiven Lernerlebnis zusammengeführt.', 'An interactive VR training environment for the safe operation of a forklift. I modeled and rendered the complete 3D environment and brought the provided content and texts together into an immersive learning experience.'))}
            {videoCard('/video/smartfox-vr-walkthrough.mp4', t('Interaktiver Walkthrough der VR-Trainingsumgebung.', 'Interactive walkthrough of the VR training environment.'))}
            {gallery([
              { src: '/img/projects/smartfox/vr/vr-01.jpg', alt: 'Render der VR-Trainingsumgebung — Lagerhalle' },
              { src: '/img/projects/smartfox/vr/vr-02.jpg', alt: 'Render der VR-Trainingsumgebung — Innenraum' },
              { src: '/img/projects/smartfox/vr/vr-03.jpg', alt: 'Render der VR-Trainingsumgebung' },
            ], 240)}
          </div>
        ),
      },
      {
        label: t('Whitepaper & Fachartikel', 'Whitepaper & Articles'),
        content: card(
          <div>
            {cardBody(t('Neben den Kursen entstanden digitale Fachartikel und ein Whitepaper zu den Themen der Akademie. Das vollständige Projekt inkl. Leistungsumfang ist bei Smartfox dokumentiert.', 'Alongside the courses, digital articles and a whitepaper were created around the academy\'s topics. The full project including scope is documented at Smartfox.'))}
            <a href="https://smartfox-website.webflow.io/projekte/tuv-nord-akademie-lernen-leicht-gemacht" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 16, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0F2940', border: '1px solid rgba(131,202,226,0.40)', borderRadius: 999, padding: '9px 18px', textDecoration: 'none', fontWeight: 700 }}>{t('Projekt bei Smartfox ansehen ↗', 'View project at Smartfox ↗')}</a>
          </div>
        ),
      },
    ],
    nextSlug: 'vinou',
    nextName: 'Vinou',
  },

  /* ── VINOU ──────────────────────────────────────────────── */
  vinou: {
    title: t('Vinou — Weinmanagement', 'Vinou — Wine Management'),
    description: t('UI-Design, Illustrationen, Mockups und Videoproduktion für Vinou — Digitalisierungspartner der Weinbranche.', 'UI design, illustrations, mockups and video production for Vinou — digitalization partner for the wine industry.'),
    accent: '#83cae2',
    category: t('UX/UI · Illustration · Video', 'UX/UI · Illustration · Video'),
    tools: 'Figma · Illustrator · After Effects · Premiere',
    role: t('UI-Design, Illustration & Video (bei Smartfox)', 'UI Design, Illustration & Video (at Smartfox)'),
    year: '2021–2023',
    heroImg: '/img/projects/live/vinou-shot.jpg',
    heroImgPos: '50% 0%',
    logo: '/img/logos/vinou.svg',
    liveUrl: 'https://www.vinou.de/',
    liveLabel: 'vinou.de',
    intro: t('Vinou ist ein Digitalisierungspartner für Weinerzeuger und Weinhändler — mit Kellerverwaltung, Onlineshop und Warenwirtschaft in einer Plattform. Ich habe an Illustrationen, UI-Design und Mockups mitgewirkt, die Website optimiert und die Imagevideos produziert und geschnitten.', 'Vinou is a digitalization partner for wine producers and retailers — combining cellar management, online shop and inventory in one platform. I contributed to illustrations, UI design and mockups, optimized the website and produced and edited the brand videos.'),
    sections: [
      {
        label: t('Kontext', 'Context'),
        content: grid2(
          <>{cardTitle('Vinou')}{cardBody(t('Vinou vereint Onlineshop, Kellerverwaltung und Warenwirtschaft in einer Lösung, die speziell auf die Bedürfnisse der Weinbranche zugeschnitten ist — „Connected Wine Business" für Erzeuger und Händler.', 'Vinou combines online shop, cellar management and inventory in one solution tailored to the needs of the wine industry — "Connected Wine Business" for producers and retailers.'))}</>,
          <>{cardTitle(t('Meine Rolle', 'My Role'))}{cardBody(t('Gestalterische Mitarbeit an Interface, Illustrationen und Produkt-Mockups sowie Optimierungen an der Website — plus die Produktion und der Schnitt der Imagevideos.', 'Design work on the interface, illustrations and product mockups plus website optimizations — as well as the production and editing of the brand videos.'))}</>,
        ),
      },
      {
        label: t('Mein Beitrag', 'My Contribution'),
        content: (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
            {[
              { t: t('UI-Design', 'UI Design'), b: t('Gestaltung und Verfeinerung von Interface-Elementen für die Vinou-Plattform.', 'Design and refinement of interface elements for the Vinou platform.') },
              { t: t('Illustration', 'Illustration'), b: t('Illustrative Elemente und visuelle Sprache für Website und Kommunikation.', 'Illustrative elements and visual language for the website and communication.') },
              { t: t('Mockups', 'Mockups'), b: t('Produkt-Mockups (Desktop, Tablet, Mobile) für die Außendarstellung.', 'Product mockups (desktop, tablet, mobile) for external presentation.') },
              { t: t('Video', 'Video'), b: t('Produktion und Schnitt der Imagevideos — Cellar, Office und Connected Wine Business.', 'Production and editing of the brand videos — Cellar, Office and Connected Wine Business.') },
            ].map((f, i) => card(<>{cardTitle(f.t)}{cardBody(f.b)}</>, undefined, i))}
          </div>
        ),
      },
      {
        label: t('Imagevideos', 'Brand Videos'),
        content: (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 16 }}>
            {ytEmbed('LTy4vVsAkho', 'Vinou — Imagevideo')}
            {ytEmbed('B7hk0EU46mc', 'Vinou Cellar — Imagevideo')}
            {ytEmbed('XeKXNtqRiFM', 'Vinou Office — Imagevideo')}
          </div>
        ),
      },
      {
        label: t('Live-Plattform', 'Live Platform'),
        content: shot('/img/projects/live/vinou-shot.jpg', 'Vinou Website', t('Die Vinou-Plattform — live auf vinou.de.', 'The Vinou platform — live at vinou.de.')),
      },
    ],
    nextSlug: 'vicampo',
    nextName: 'Vicampo',
  },
  };
}

export const projectContent = getProjectContent('de');
