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
  <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: 'var(--text-2)' }}>{text}</p>
);

const cardTitle = (t: string, _accent?: string) => (
  <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' as const, marginBottom: 14, color: 'var(--text-2)', fontFamily: 'var(--font-mono)' }}>{t}</div>
);

/* ── Responsive YouTube embed ──────────────────────────────────── */
const ytEmbed = (id: string, title: string) => (
  <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: 14, overflow: 'hidden', border: '1px solid var(--line)', boxShadow: '0 8px 28px rgba(0,0,0,0.42)' }}>
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
    <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--line)', boxShadow: '0 8px 28px rgba(0,0,0,0.36)', background: 'var(--inset)' }}>
      <img src={src} alt={alt} style={{ width: '100%', display: 'block', aspectRatio: '16 / 10', objectFit: 'cover', objectPosition: pos }} />
    </div>
    {caption && <figcaption style={{ margin: '10px 2px 0', fontSize: 12, lineHeight: 1.5, color: 'var(--text-2)', fontFamily: 'var(--font-mono)' }}>{caption}</figcaption>}
  </figure>
);

/* ── Plain image tile (natural aspect ratio) ───────────────────── */
const imgTile = (src: string, alt: string, radius = 12) => (
  <div style={{ borderRadius: radius, overflow: 'hidden', border: '1px solid var(--line)', boxShadow: '0 6px 20px rgba(0,0,0,0.3)', background: 'var(--inset)' }}>
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
    <figcaption style={{ margin: '10px 2px 0', fontSize: 12, lineHeight: 1.5, color: 'var(--text-2)', fontFamily: 'var(--font-mono)' }}>{caption}</figcaption>
  </figure>
);

/* ── Local (self-hosted) video card ────────────────────────────── */
const videoCard = (src: string, caption?: string, key?: number | string) => (
  <figure key={key} style={{ margin: 0 }}>
    <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--line)', boxShadow: '0 8px 28px rgba(0,0,0,0.36)', background: 'var(--surface)' }}>
      <video controls preload="metadata" style={{ width: '100%', display: 'block' }}>
        <source src={src} type="video/mp4" />
      </video>
    </div>
    {caption && <figcaption style={{ margin: '10px 2px 0', fontSize: 12, lineHeight: 1.5, color: 'var(--text-2)', fontFamily: 'var(--font-mono)' }}>{caption}</figcaption>}
  </figure>
);

/* ── Section intro paragraph ───────────────────────────────────── */
const lead = (text: string) => (
  <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: 'var(--text-2)', maxWidth: 760 }}>{text}</p>
);

/* ══════════════════════════════════════════════════════════════
   PROJECT CONTENT MAP
   ══════════════════════════════════════════════════════════════ */
export function getProjectContent(lang: Lang): Record<string, ProjectPageData> {
  const t = (de: string, en: string) => (lang === 'en' ? en : de);
  return {

  /* ── ARVALOO — SMASH. ────────────────────────────────────── */
  arvaloo: {
    title: t('Arvaloo — Packaging & Produktkommunikation', 'Arvaloo — Packaging & Product Communication'),
    description: t('Produkt-, Grafik- & Kommunikationsdesigner (seit 07/2026): Verpackungsdesign, Druckvorstufe und Produktkommunikation für die Marke SMASH.', 'Product, Graphic & Communication Designer (since 07/2026): packaging design, prepress and product communication for the SMASH. brand.'),
    accent: '#FF5F00',
    category: t('Packaging · Druckvorstufe · Produktkommunikation', 'Packaging · Prepress · Product Communication'),
    tools: 'Illustrator · Photoshop · InDesign · Pacdora · Nano Banana · Figma Weave',
    role: t('Produkt-, Grafik- & Kommunikationsdesigner (Teilzeit)', 'Product, Graphic & Communication Designer (part-time)'),
    year: t('07/2026 – heute', '07/2026 – present'),
    heroImg: '/img/projects/arvaloo/banner.jpg',
    heroImgPos: '50% 50%',
    intro: t('Bei der Arvaloo GmbH in Mainz verantworte ich Verpackungsdesign, Druckvorstufe und Produktkommunikation der Marke SMASH. — Super Sauce, Cloud Sauce und CBD Pods — für die Märkte Deutschland, Österreich und Frankreich.', 'At Arvaloo GmbH in Mainz I am responsible for packaging design, prepress and product communication for the SMASH. brand — Super Sauce, Cloud Sauce and CBD Pods — for the German, Austrian and French markets.'),
    sections: [
      {
        label: t('Kontext', 'Context'),
        content: grid2(
          <>{cardTitle(t('Das Unternehmen', 'The Company'))}{cardBody(t('Arvaloo GmbH ist ein Mainzer Konsumgüter-Unternehmen im Bereich CBD-Produkte. Mit der Marke SMASH. Vapes ist es im deutschsprachigen Raum und in Frankreich vertreten — im Handel, im eigenen Onlineshop und im B2B-Geschäft.', 'Arvaloo GmbH is a consumer-goods company from Mainz in the CBD product sector. With its SMASH. Vapes brand it is present in German-speaking markets and France — in retail, in its own online shop and in B2B.'))}</>,
          <>{cardTitle(t('Meine Rolle', 'My Role'))}{cardBody(t('Als Produkt-, Grafik- & Kommunikationsdesigner begleite ich Produkte von der technischen Stanzkontur bis zum fertigen Packshot: Verpackung, Etikett, Druckdaten, Lokalisierung, Shop-Bilder und Kampagnen — in direkter Abstimmung mit Geschäftsführung, Druckereien und Kunden.', 'As Product, Graphic & Communication Designer I take products from the technical dieline to the finished packshot: packaging, labels, print files, localization, shop imagery and campaigns — in direct coordination with management, printers and clients.'))}</>,
        ),
      },
      {
        label: t('SMASH. Super Sauce Pods', 'SMASH. Super Sauce Pods'),
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {figCard(imgTile('/img/projects/arvaloo/banner.jpg', 'SMASH. Vapes Super Sauce Pods — Shop-Banner mit allen fünf Sorten', 14), t('Shop-Banner · Key Visual der Super Sauce Series mit allen fünf Sorten.', 'Shop banner · key visual of the Super Sauce Series with all five flavours.'), 'banner')}
            {grid2(
              <>{cardTitle(t('Das Produkt', 'The Product'))}{cardBody(t('Super Sauce ist die Prefilled-Pod-Linie von SMASH. Vapes: 2-ml-Pods mit Mesh Coil, ca. 600 Züge, nikotin- und THC-frei und kompatibel mit gängigen Akkuträgern — in fünf Sorten: Kaktus Feige Ice, Pinkberry Runtz, Cherry Bomb Ice, Blueberry Ice und Lemonade.', 'Super Sauce is the prefilled pod line of SMASH. Vapes: 2 ml pods with a mesh coil, approx. 600 puffs, nicotine- and THC-free and compatible with common battery devices — in five flavours: Kaktus Feige Ice, Pinkberry Runtz, Cherry Bomb Ice, Blueberry Ice and Lemonade.'))}</>,
              <>{cardTitle(t('Die Aufgabe', 'The Challenge'))}{cardBody(t('Fünf Sorten sollten im Regal sofort unterscheidbar sein und trotzdem klar als eine Produktfamilie wirken — auf einer kleinen Faltschachtel, die zusätzlich alle gesetzlichen Pflichtangaben tragen muss.', 'Five flavours had to be instantly distinguishable on the shelf while clearly reading as one product family — on a small folding box that also has to carry all mandatory legal information.'))}</>,
            )}
            {card(
              <div>
                {cardTitle(t('Mein Vorgehen', 'My Approach'))}
                <ol style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 10 }}>
                  {[
                    [t('Stanzkontur & Raster', 'Dieline & grid'), t('Aufbau der Faltschachtel auf der technischen Stanzkontur mit einem festen Raster für alle Sorten: Logo, „Nikotinfrei / THC-frei"-Siegel, Produktname, Kompatibilitäts-Box und EAN sitzen immer an derselben Stelle.', 'Built the folding box on the technical dieline with a fixed grid for every flavour: logo, "nicotine-free / THC-free" seal, product name, compatibility box and EAN always sit in the same place.')],
                    [t('Farbwelt & Lettering', 'Colour world & lettering'), t('Variabel sind nur die fließende Farbwelt und das Sorten-Lettering — so entsteht Wiedererkennung über die Marke und Unterscheidung über die Farbe.', 'Only the flowing colour world and the flavour lettering change — recognition comes from the brand, differentiation from colour.')],
                    [t('Pflichtangaben', 'Mandatory information'), t('CLP-Warnhinweis, Inhaltsstoffe, LOT/UFI-Codes, EAN und 18+-Kennzeichnung integriert, ohne den Markenauftritt zu stören.', 'Integrated CLP warning, ingredients, LOT/UFI codes, EAN and 18+ labelling without disrupting the brand look.')],
                    [t('Druckvorstufe', 'Prepress'), t('Druckfertige PDF/X-Daten inkl. Sonderfarben und Spot-UV, abgestimmt mit der Druckerei.', 'Print-ready PDF/X files incl. spot colours and spot UV, coordinated with the printer.')],
                    [t('Visualisierung & Kampagne', 'Visualization & campaign'), t('3D-Mockups und Packshots mit Pacdora, Nano Banana und Photoshop — daraus Poster, Shop-Banner, Social-Assets und ein B2B-One-Pager für den Großhandel.', '3D mockups and packshots with Pacdora, Nano Banana and Photoshop — turned into a poster, shop banner, social assets and a B2B one-pager for wholesale.')],
                  ].map(([h, b], i) => (
                    <li key={i} style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-2)' }}>
                      <strong style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}>{h}</strong> — {b}
                    </li>
                  ))}
                </ol>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 18 }}>
                  {['Illustrator', 'Photoshop', 'InDesign', 'Pacdora', 'Nano Banana', 'Figma Weave'].map((tool) => (
                    <span key={tool} style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, fontWeight: 600, letterSpacing: '0.04em', background: 'rgba(255,255,255,0.07)', border: '1px solid var(--line-strong)', borderRadius: 999, padding: '4px 11px', color: 'var(--text-2)' }}>{tool}</span>
                  ))}
                </div>
              </div>,
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(260px,100%),1fr))', gap: 16, alignItems: 'start' }}>
              {figCard(imgTile('/img/projects/arvaloo/poster.jpg', 'SMASH. Vapes Super Sauce Poster „Fünf Sorten ein Chill"', 14), t('Launch-Poster · Schaufenster & POS.', 'Launch poster · shop window & POS.'), 'poster')}
              {figCard(imgTile('/img/projects/arvaloo/onepager.jpg', 'SMASH. Vapes Super Sauce B2B-One-Pager mit Staffelpreisen', 14), t('B2B-One-Pager · Produktvorteile & Staffelpreise für den Großhandel.', 'B2B one-pager · product benefits & tiered pricing for wholesale.'), 'onepager')}
              {figCard(imgTile('/img/projects/arvaloo/packshot.jpg', 'SMASH. Vapes Super Sauce Packshot mit Pod und Akkuträger', 14), t('Social-Media-Packshot · Verpackung, Pod und Key-Features.', 'Social media packshot · packaging, pod and key features.'), 'packshot')}
            </div>
          </div>
        ),
      },
      {
        label: t('Weitere Verantwortung', 'Further Responsibilities'),
        content: (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(300px,100%),1fr))', gap: 16 }}>
            {[
              { t: t('Verpackung & Druckvorstufe', 'Packaging & Prepress'), b: t('Neben den Pods: Thekendisplays, Doypacks und Kartuschen-Einlagen für Super Sauce, Cloud Sauce und CBD Pods — immer auf Basis technischer Stanzkonturen.', 'Beyond the pods: counter displays, doypacks and cartridge inserts for Super Sauce, Cloud Sauce and CBD Pods — always based on technical dielines.') },
              { t: t('Lokalisierung DE · AT · FR', 'Localization DE · AT · FR'), b: t('Anpassung von Verpackungen und Werbemitteln für Frankreich und Österreich unter Einhaltung der CLP-Kennzeichnung und nationaler Vorgaben wie loi Toubon und Triman.', 'Adapting packaging and advertising material for France and Austria in line with CLP labelling and national requirements such as loi Toubon and Triman.') },
              { t: t('Private Label · SABAI Medical Labs', 'Private Label · SABAI Medical Labs'), b: t('Verpackung und Etikett für SABAI Medical Labs (Kooperation mit DJ Tomekk) — entwickelt in direkter Abstimmung mit dem Kunden.', 'Packaging and label for SABAI Medical Labs (a collaboration with DJ Tomekk) — developed in direct coordination with the client.') },
              { t: t('Packshots & Onlineshop', 'Packshots & Online Shop'), b: t('Produktbilder und Packshots für rund 40 Artikel zum Launch des neuen Onlineshops sowie Rohstoffpräsentationen für den B2B-Shop.', 'Product images and packshots for around 40 products for the launch of the new online shop, plus raw-material presentations for the B2B shop.') },
              { t: t('B2B, Social & POS', 'B2B, Social & POS'), b: t('B2B-One-Pager, Social-Media-Kampagnen, Schaufensterplakate und POS-Materialien — konsistent im Markenauftritt von SMASH.', 'B2B one-pagers, social media campaigns, shop-window posters and POS materials — consistent with the SMASH. brand identity.') },
              { t: t('KI-gestützte Workflows', 'AI-assisted Workflows'), b: t('Aufbau von Workflows für Mockups und Produktvisualisierung mit Nano Banana, Figma Weave, Pacdora und Photoshop — Abstimmungszyklen wurden dadurch deutlich verkürzt.', 'Built workflows for mockups and product visualization with Nano Banana, Figma Weave, Pacdora and Photoshop — which significantly shortened review cycles.') },
            ].map((item, i) => card(<>{cardTitle(item.t)}{cardBody(item.b)}</>, undefined, i))}
          </div>
        ),
      },
      {
        label: t('Auf einen Blick', 'At a Glance'),
        content: (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
            {[
              { metric: '5', label: t('Sorten in einem modularen Verpackungssystem', 'Flavours in one modular packaging system') },
              { metric: '~40', label: t('Packshots zum Launch des neuen Onlineshops', 'Packshots for the launch of the new online shop') },
              { metric: '3', label: t('Märkte: Deutschland, Österreich, Frankreich', 'Markets: Germany, Austria, France') },
            ].map((m) => (
              <div key={m.metric} className="glass-card" style={{ padding: '28px 28px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem,6vw,3.2rem)', letterSpacing: '-0.04em', color: 'var(--text)', lineHeight: 1, marginBottom: 12, position: 'relative', zIndex: 1 }}>{m.metric}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.5, position: 'relative', zIndex: 1 }}>{m.label}</div>
              </div>
            ))}
          </div>
        ),
      },
    ],
    nextSlug: 'smash-cbd',
    nextName: 'SMASH. CBD',
  },

  /* ── SMASH. CBD — GORILLA GLUE & MANGO ICE ───────────────── */
  'smash-cbd': {
    title: t('SMASH. CBD — Gorilla Glue & Mango Ice', 'SMASH. CBD — Gorilla Glue & Mango Ice'),
    description: t('Packaging, Druckvorstufe und Launch-Kampagne für die neue CBD-Linie von SMASH. — zwei Sorten, zwei Formate.', 'Packaging, prepress and launch campaign for the new SMASH. CBD line — two flavours, two formats.'),
    accent: '#FF5F00',
    category: t('Packaging · Illustration · Launch-Kampagne', 'Packaging · Illustration · Launch Campaign'),
    tools: 'Illustrator · Photoshop · InDesign · Pacdora',
    role: t('Produkt-, Grafik- & Kommunikationsdesigner · Arvaloo GmbH', 'Product, Graphic & Communication Designer · Arvaloo GmbH'),
    year: '2026',
    heroImg: '/img/projects/arvaloo/cbd/banner.jpg',
    heroImgPos: '30% 50%',
    intro: t('Für die neue CBD-Linie von SMASH. habe ich das bestehende Verpackungssystem auf zwei neue Sorten und ein neues Format übertragen: Gorilla Glue und Mango Ice — jeweils als Prefilled Pod und als 10-ml-Liquid. Von der technischen Stanzkontur über die Pflichtangaben bis zu Packshots, Shop-Banner und Launch-Story — inklusive eigener Illustrationen für beide Sorten.', 'For the new SMASH. CBD line I extended the existing packaging system to two new flavours and a new format: Gorilla Glue and Mango Ice — each as a prefilled pod and as a 10 ml liquid. From the technical dieline and mandatory information to packshots, shop banner and launch story — including my own illustrations for both flavours.'),
    sections: [
      {
        label: t('Kontext', 'Context'),
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {figCard(imgTile('/img/projects/arvaloo/cbd/banner.jpg', t('SMASH. Vapes CBD Pods Gorilla Glue und Mango Ice — Shop-Banner „Purer Chill."', 'SMASH. Vapes CBD pods Gorilla Glue and Mango Ice — shop banner "Purer Chill."'), 14), t('Shop-Banner · Key Visual zum Launch beider Sorten mit den drei Produktvorteilen.', 'Shop banner · launch key visual for both flavours with the three product benefits.'), 'banner')}
            {grid2(
              <>{cardTitle(t('Das Produkt', 'The Product'))}{cardBody(t('Die CBD-Linie von SMASH. gibt es in zwei Sorten und zwei Formaten: als Prefilled Pod (2 ml, Mesh Coil, bis zu 600 Züge, kompatibel mit gängigen Akkuträgern) und als 10-ml-Liquid zum Nachfüllen — jeweils mit 6 % CBD, nikotin- und THC-frei.', 'The SMASH. CBD line comes in two flavours and two formats: as a prefilled pod (2 ml, mesh coil, up to 600 puffs, compatible with common battery devices) and as a 10 ml refill liquid — each with 6 % CBD, nicotine- and THC-free.'))}</>,
              <>{cardTitle(t('Die Aufgabe', 'The Challenge'))}{cardBody(t('Zwei neue Sorten sollten sofort als SMASH. erkennbar sein, sich aber klar von der Super Sauce Series und voneinander abheben. Dazu kam ein zweites Format — Faltschachtel plus Flaschenetikett — mit eigenen Maßen und allen gesetzlichen Pflichtangaben.', 'Two new flavours had to be instantly recognisable as SMASH., yet clearly distinct from the Super Sauce Series and from each other. On top came a second format — folding box plus bottle label — with its own dimensions and all mandatory legal information.'))}</>,
            )}
          </div>
        ),
      },
      {
        label: t('Zwei Sorten, zwei Charaktere', 'Two Flavours, Two Characters'),
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {[
              {
                key: 'gorilla',
                name: 'Gorilla Glue',
                text: t('Tiefes Grün trifft Anthrazit: Der selbst gezeichnete Gorilla mit dem X-Auge trägt die Sorte, das Graffiti-Lettering in Grün und Weiß macht sie im Regal sofort lesbar.', 'Deep green meets anthracite: the gorilla with the X eye, which I drew myself, carries the flavour, while the green-and-white graffiti lettering makes it instantly readable on the shelf.'),
                imgs: [
                  ['/img/projects/arvaloo/cbd/gorilla-pods-1.jpg', t('Pod-Faltschachtel · Vorderseite & Pflichtangaben', 'Pod folding box · front & mandatory information')],
                  ['/img/projects/arvaloo/cbd/gorilla-pods-2.jpg', t('Pod-Faltschachtel · Siegel, EAN & Hersteller', 'Pod folding box · seal, EAN & manufacturer')],
                  ['/img/projects/arvaloo/cbd/gorilla-liquid.jpg', t('10-ml-Liquid · Faltschachtel & Flaschenetikett', '10 ml liquid · folding box & bottle label')],
                ],
              },
              {
                key: 'mango',
                name: 'Mango Ice',
                text: t('Warmes Orange gegen eisiges Hellblau: Die selbst gezeichnete Mango auf Eiswürfeln erzählt „fruchtig und kühl" auf einen Blick, das gelb-blaue Lettering greift beide Farben auf.', 'Warm orange against icy light blue: the mango on ice cubes, also drawn by me, says "fruity and cool" at a glance, and the yellow-and-blue lettering picks up both colours.'),
                imgs: [
                  ['/img/projects/arvaloo/cbd/mango-pods-1.jpg', t('Pod-Faltschachtel · Vorderseite & Pflichtangaben', 'Pod folding box · front & mandatory information')],
                  ['/img/projects/arvaloo/cbd/mango-pods-2.jpg', t('Pod-Faltschachtel · Perspektive', 'Pod folding box · perspective view')],
                  ['/img/projects/arvaloo/cbd/mango-liquid.jpg', t('10-ml-Liquid · Faltschachtel & Flaschenetikett', '10 ml liquid · folding box & bottle label')],
                ],
              },
            ].map((f) => (
              <div key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {card(<>{cardTitle(f.name)}{cardBody(f.text)}</>)}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(220px,100%),1fr))', gap: 14, alignItems: 'start' }}>
                  {f.imgs.map(([src, cap], i) => figCard(imgTile(src, `SMASH. ${f.name} — ${cap}`, 14), cap, i))}
                </div>
              </div>
            ))}
          </div>
        ),
      },
      {
        label: t('Mein Vorgehen', 'My Approach'),
        content: card(
          <div>
            <ol style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 10 }}>
              {[
                [t('System übertragen', 'Extending the system'), t('Raster, Logo-Position, „Nikotinfrei / THC-frei"-Siegel, Produktbezeichnung und Feature-Box aus der Super Sauce Series übernommen — die neue Linie gehört sichtbar zur Familie.', 'Carried over the grid, logo position, "nicotine-free / THC-free" seal, product name and feature box from the Super Sauce Series — the new line visibly belongs to the family.')],
                [t('Eigene Illustrationen', 'Original illustrations'), t('Gorilla und Mango habe ich selbst gezeichnet: erst als Handskizze, dann in Illustrator nachgezeichnet und vektorisiert — skalierbar von der kleinen Pod-Schachtel bis zum Shop-Banner.', 'I drew the gorilla and the mango myself: first as a hand sketch, then traced and vectorized in Illustrator — scalable from the small pod box to the shop banner.')],
                [t('Charakter & Farbwelt', 'Character & colour world'), t('Pro Sorte eine eigene Illustration, Farbwelt und Graffiti-Lettering — Unterscheidung über Farbe und Motiv, Wiedererkennung über die Marke.', 'One illustration, colour world and graffiti lettering per flavour — differentiation through colour and motif, recognition through the brand.')],
                [t('Zwei Formate', 'Two formats'), t('Pod-Faltschachtel und Liquid-Faltschachtel auf den jeweiligen technischen Stanzkonturen, dazu das Flaschenetikett für die 10-ml-Flasche; Sub-Brand „Vapes" bzw. „Liquids" zur klaren Format-Unterscheidung.', 'Pod and liquid folding boxes on their respective technical dielines, plus the label for the 10 ml bottle; "Vapes" and "Liquids" sub-brands keep the formats clearly apart.')],
                [t('Pflichtangaben', 'Mandatory information'), t('CLP-Gefahrenpiktogramm, Inhaltsstoffe, gefährliche Bestandteile, technische Daten, LOT/UFI-Codes, EAN, Herstellerangaben und 18+-Kennzeichnung — integriert, ohne den Look zu stören.', 'CLP hazard pictogram, ingredients, hazardous components, technical data, LOT/UFI codes, EAN, manufacturer details and 18+ labelling — integrated without disrupting the look.')],
                [t('Druckvorstufe', 'Prepress'), t('Druckfertige PDF/X-Daten für alle Faltschachteln und Etiketten, abgestimmt mit der Druckerei.', 'Print-ready PDF/X files for all folding boxes and labels, coordinated with the printer.')],
                [t('Visualisierung & Launch', 'Visualization & launch'), t('3D-Packshots mit Pacdora und Photoshop — daraus Shop-Banner und eine Launch-Story mit B2B-Call-to-Action für den Großhandel.', '3D packshots with Pacdora and Photoshop — turned into a shop banner and a launch story with a B2B call to action for wholesale.')],
              ].map(([h, b], i) => (
                <li key={i} style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-2)' }}>
                  <strong style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}>{h}</strong> — {b}
                </li>
              ))}
            </ol>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 18 }}>
              {['Illustrator', 'Photoshop', 'InDesign', 'Pacdora'].map((tool) => (
                <span key={tool} style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, fontWeight: 600, letterSpacing: '0.04em', background: 'rgba(255,255,255,0.07)', border: '1px solid var(--line-strong)', borderRadius: 999, padding: '4px 11px', color: 'var(--text-2)' }}>{tool}</span>
              ))}
            </div>
          </div>,
        ),
      },
      {
        label: t('Launch-Kampagne', 'Launch Campaign'),
        content: (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(280px,100%),1fr))', gap: 18, alignItems: 'center' }}>
            <div style={{ maxWidth: 380, width: '100%', justifySelf: 'center' }}>
              {figCard(imgTile('/img/projects/arvaloo/cbd/launch-story.jpg', t('SMASH. CBD Liquids Launch-Story „Purer Chill." mit Gorilla Glue und Mango Ice', 'SMASH. CBD liquids launch story "Purer Chill." with Gorilla Glue and Mango Ice'), 18), t('Instagram-Story 9:16 · Launch der Liquids mit B2B-Kontakt.', 'Instagram story 9:16 · liquids launch with B2B contact.'), 'story')}
            </div>
            {card(
              <>
                {cardTitle(t('Eine Botschaft, alle Kanäle', 'One message, every channel'))}
                {cardBody(t('„Purer Chill." trägt den Launch: dieselbe Headline, dasselbe Graffiti-„Jetzt entdecken." und dieselben drei Produktvorteile — vom 2560-px-Shop-Banner bis zur 9:16-Story. Die Story richtet sich zusätzlich an Händler und führt direkt zum Wholesale-Kontakt.', '"Purer Chill." carries the launch: the same headline, the same graffiti "Jetzt entdecken." and the same three product benefits — from the 2560 px shop banner to the 9:16 story. The story also targets retailers and leads straight to the wholesale contact.'))}
              </>,
            )}
          </div>
        ),
      },
      {
        label: t('Auf einen Blick', 'At a Glance'),
        content: (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
            {[
              { metric: '2', label: t('Sorten mit eigenem Charakter und eigener Farbwelt', 'Flavours, each with its own character and colour world') },
              { metric: '2', label: t('Formate: Prefilled Pod und 10-ml-Liquid', 'Formats: prefilled pod and 10 ml liquid') },
              { metric: '6', label: t('Druckteile: 4 Faltschachteln und 2 Flaschenetiketten', 'Print items: 4 folding boxes and 2 bottle labels') },
            ].map((m, i) => (
              <div key={i} className="glass-card" style={{ padding: '28px 28px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem,6vw,3.2rem)', letterSpacing: '-0.04em', color: 'var(--text)', lineHeight: 1, marginBottom: 12, position: 'relative', zIndex: 1 }}>{m.metric}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.5, position: 'relative', zIndex: 1 }}>{m.label}</div>
              </div>
            ))}
          </div>
        ),
      },
    ],
    nextSlug: 'vicampo',
    nextName: 'Vicampo',
  },

  /* ── VICAMPO ─────────────────────────────────────────────── */
  vicampo: {
    title: t('Vicampo — Grafik & UX', 'Vicampo — Graphics & UX'),
    description: t('Junior Grafik- & UX-Designer (2023–2025): Produktfotografie, KI-Workflow, UX-Optimierung.', 'Junior Graphic & UX Designer (2023–2025): product photography, AI workflow, UX optimization.'),
    accent: '#FF5F00',
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(340px,100%),1fr))', gap: 16 }}>
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
                    <li key={i} style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text-2)' }}>{tx}</li>
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
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem,6vw,3.2rem)', letterSpacing: '-0.04em', color: 'var(--text)', lineHeight: 1, marginBottom: 12, position: 'relative', zIndex: 1 }}>{m.metric}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.5, position: 'relative', zIndex: 1 }}>{m.label}</div>
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
    accent: '#FF9A5A',
    category: t('UX/UI · Mobile · CPUX', 'UX/UI · Mobile · CPUX'),
    tools: 'Figma · FigJam · Miro',
    role: t('Solo — UX Designer', 'Solo — UX Designer'),
    year: '2024',
    heroImg: '/img/projects/studybuddy-thumbnail.webp',
    liveUrl: 'https://study-buddy-lilac-chi.vercel.app/',
    liveLabel: t('Live ansehen', 'View live'),
    intro: t('StudyBuddy ist mein CPUX-Capstone-Projekt: eine mobile App, die Studierende dabei unterstützt, strukturierte Lernblöcke zu planen, mit einem ablenkungsfreien Timer zu arbeiten und danach kurz zu reflektieren — alles in einer warmen, tagebuchähnlichen Ästhetik.', 'StudyBuddy is my CPUX capstone project: a mobile app that helps students plan structured study blocks, work with a distraction-free timer and briefly reflect afterwards — all in a warm, journal-like aesthetic.'),
    sections: [
      {
        label: t('Problem & Lösung', 'Problem & Solution'),
        content: grid2(
          <>{cardTitle(t('Herausforderung', 'Challenge'), '#a855f766')}{cardBody(t('Studierende verlieren sich in langen, unstrukturierten Sessions ohne Pausen und wissen danach nicht, wie produktiv sie wirklich waren. Bestehende Tools wie Kalender-Apps oder reine Timer bieten keine Verbindung zur eigentlichen Lernerfahrung.', 'Students get lost in long, unstructured sessions without breaks and afterwards don\'t know how productive they really were. Existing tools like calendar apps or plain timers offer no connection to the actual learning experience.'))}</>,
          <>{cardTitle(t('Lösung', 'Solution'), '#a855f766')}{cardBody(t('StudyBuddy ermöglicht strukturierte Lernblöcke — Fach, Dauer, Lerntyp — kombiniert mit einem fokussierten Timer und einer kurzen Post-Session-Reflexion. Der gesamte Kernflow dauert unter 15 Sekunden.', 'StudyBuddy enables structured study blocks — subject, duration, study type — combined with a focused timer and a short post-session reflection. The entire core flow takes under 15 seconds.'))}</>,
        ),
      },
      {
        label: t('User Persona', 'User Persona'),
        content: card(
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18, marginBottom: 20, flexWrap: 'wrap' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>👩‍🎓</div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: 'var(--text)', marginBottom: 3 }}>Lena Hofmann, 23</div>
                <div style={{ fontSize: 13, color: 'var(--text-2)' }}>{t('BWL, 4. Semester · iPhone — unterwegs und am Schreibtisch', 'Business, 4th semester · iPhone — on the go and at the desk')}</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 14 }}>
              {[[t('Ziel','Goal'),t('Effizient lernen ohne den Überblick zu verlieren','Study efficiently without losing track')],[t('Frustration','Frustration'),t('Weiß nach stundenlangem Lernen nicht, was erreicht wurde','After hours of studying, doesn\'t know what was achieved')],[t('Bedarf','Need'),t('Struktur — aber ohne zusätzlichen Stress','Structure — but without extra stress')],[t('Gerät','Device'),t('iPhone, unterwegs & am Schreibtisch','iPhone, on the go & at the desk')]].map(([k,v]) => (
                <div key={k}>
                  <div className="mono-label" style={{ marginBottom: 4, fontSize: 11.5 }}>{k}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-2)' }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        label: t('UX-Prozess', 'UX Process'),
        content: (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14 }}>
            {[
              { n: 'P1', t: t('Research', 'Research'), b: t('Desk Research: Forest, Pomodoro Timer, StudySmarter, Notion. Key Insight: kein Tool kombiniert Planung, Timer und Reflexion. Persona Lena aus Findings entwickelt.', 'Desk research: Forest, Pomodoro Timer, StudySmarter, Notion. Key insight: no tool combines planning, timer and reflection. Persona Lena developed from the findings.'), h: '10h' },
              { n: 'P2', t: t('Konzeption', 'Concept'), b: t('3 Kernfunktionen definiert: Blockanlage, Fokustimer, Reflexion. 6-Screen-User-Flow von App-Öffnung bis Sessionende. Low-Fi-Bleistift-Wireframes.', 'Defined 3 core functions: block creation, focus timer, reflection. 6-screen user flow from app open to session end. Low-fi pencil wireframes.'), h: '15h' },
              { n: 'P3', t: t('Design', 'Design'), b: t('Style-Tile um "Tagebucheintrag"-Konzept: warme Pastelltöne auf Creme. Bewusstes Dark Mode für den Timer als psychologisches Fokussignal. Hi-Fi-Mockups & Figma-Prototyp.', 'Style tile around a "journal entry" concept: warm pastels on cream. Deliberate dark mode for the timer as a psychological focus signal. Hi-fi mockups & Figma prototype.'), h: '20h' },
              { n: 'P4', t: t('Dokumentation', 'Documentation'), b: t('Alle Designentscheidungen dokumentiert. Wichtigstes Learning: Das Schwierigste war das Weglassen von Features — jeder extra Screen ist ein potenzieller Drop-off-Punkt.', 'Documented all design decisions. Key learning: the hardest part was leaving features out — every extra screen is a potential drop-off point.'), h: '5h' },
            ].map((step, i) => card(
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--text-2)' }}>{step.n}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--text-2)', background: 'rgba(255,255,255,0.06)', padding: '1px 7px', borderRadius: 4 }}>{step.h}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 8 }}>{step.t}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.6 }}>{step.b}</div>
              </div>,
              { padding: '22px 22px' }, i,
            ))}
          </div>
        ),
      },
      {
        label: t('User Flow', 'User Flow'),
        content: card(
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
              {[t('Home','Home'),t('Block anlegen','Create block'),t('Bereit?','Ready?'),t('Timer','Timer'),t('Fertig!','Done!'),t('Home','Home')].map((step, i, arr) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="glass-pill" style={{ fontSize: 11.5, whiteSpace: 'nowrap' }}>{step}</span>
                  {i < arr.length - 1 && <span style={{ color: 'var(--text-3)', fontSize: 11 }}>→</span>}
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        label: t('Key Features', 'Key Features'),
        content: (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
            {[
              { t: t('Lernblock-Erstellung', 'Study Block Creation'), b: t('Fach, Dauer und Lerntyp (Lesen / Üben / Zusammenfassen) in einer Ansicht anlegen.', 'Create subject, duration and study type (read / practice / summarize) in one view.') },
              { t: t('Fokus-Timer', 'Focus Timer'), b: t('Minimaler Dark-Mode-Timer — ein Tap zum Beenden, Wischen zum Pausieren. Keine Ablenkungen.', 'Minimal dark-mode timer — one tap to finish, swipe to pause. No distractions.') },
              { t: t('Post-Session-Reflexion', 'Post-Session Reflection'), b: t('Stimmungs-Emoji und optionale Kurznotiz nach jeder Session — leicht, persönlich, motivierend.', 'Mood emoji and optional short note after each session — light, personal, motivating.') },
              { t: t('Streak & Fortschritt', 'Streak & Progress'), b: t('Täglicher Streak-Counter mit visuellem Fortschrittsfeedback. Gesamter Kernflow unter 15 Sekunden.', 'Daily streak counter with visual progress feedback. Entire core flow under 15 seconds.') },
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
    accent: '#FF5F00',
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
            <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line)' }}>
              <img src="/img/projects/AeroLeaf_01.webp" alt="AeroLeaf Brand Mockup" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
              {card(<>{cardTitle(t('Konzept', 'Concept'), '#39FF1466')}{cardBody(t('Berliner AgriTech-Startup für smarte Hydroponiksysteme — Gemüseanbau in kleinen Wohnungen und Büros ohne Tageslicht. Zielgruppe: umweltbewusste Stadtbewohner (25–40). Die Marke vereint Innovation, Sauberkeit und eine futuristische, aber organische Persönlichkeit.', 'Berlin AgriTech startup for smart hydroponic systems — growing vegetables in small apartments and offices without daylight. Target audience: eco-conscious city dwellers (25–40). The brand unites innovation, cleanliness and a futuristic yet organic personality.'))}</>)}
              {card(<>{cardTitle(t('Identität', 'Identity'), '#39FF1466')}{cardBody(t('Tagline: "Where nature meets German engineering." Farbpalette: Neongrün auf Tiefschwarz. Typografie: Geometric Sans mit technischem Charakter. Anwendungen: Produktpackaging, App-Icon, Showroom-Beschilderung.', 'Tagline: "Where nature meets German engineering." Color palette: neon green on deep black. Typography: geometric sans with a technical character. Applications: product packaging, app icon, showroom signage.'))}</>)}
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {['Brand Identity','Logo Design','Style Guide','AgriTech','Berlin','Sustainable'].map(t => (
                <span key={t} style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-2)', border: '1px solid var(--line-strong)', borderRadius: 4, padding: '3px 9px', fontFamily: 'var(--font-mono)' }}>{t}</span>
              ))}
            </div>
          </div>
        ),
      },
      {
        label: 'NordWand',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line)' }}>
              <img src="/img/projects/NordWand_01.webp" alt="NordWand Brand Mockup" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
              {card(<>{cardTitle(t('Konzept', 'Concept'), '#e8601f66')}{cardBody(t('Hamburger Premium-Bekleidungsmarke für extreme Klimabedingungen — 100% recycelte Materialien, urbane monochromatische Ästhetik. Zielgruppe: Abenteurer, Kletterer und Stadtbewohner im Regen mit Gorpcore-Affinität. Die Marke verkörpert Belastbarkeit, Stoizismus und Minimalismus.', 'Hamburg premium clothing brand for extreme weather conditions — 100% recycled materials, urban monochromatic aesthetic. Target audience: adventurers, climbers and city dwellers in the rain with a gorpcore affinity. The brand embodies resilience, stoicism and minimalism.'))}</>)}
              {card(<>{cardTitle(t('Identität', 'Identity'), '#e8601f66')}{cardBody(t('Tagline: "Protection against the elements." Farbpalette: Tiefes Schiefergrau, Schneeweiss, Eismatt-Akzent. Logo: Kondensierte Typografie mit geometrischem Berggipfelelement. Anwendungen: Jacken, Retail-Signage, Produktcards.', 'Tagline: "Protection against the elements." Color palette: deep slate grey, snow white, ice-matte accent. Logo: condensed typography with a geometric mountain-peak element. Applications: jackets, retail signage, product cards.'))}</>)}
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {['Brand Identity','Logo Design','Style Guide','Outdoor Fashion','Hamburg','Sustainable','Gorpcore'].map(t => (
                <span key={t} style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-2)', border: '1px solid var(--line-strong)', borderRadius: 4, padding: '3px 9px', fontFamily: 'var(--font-mono)' }}>{t}</span>
              ))}
            </div>
          </div>
        ),
      },
      {
        label: 'SüßMund Pâtisserie',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line)' }}>
              <img src="/img/projects/Sussmund_03.webp" alt="SüßMund Pâtisserie" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
              {card(<>{cardTitle(t('Konzept', 'Concept'), '#fa8ab466')}{cardBody(t('Kölner Boutique-Konditorei, die französische Pâtisserie mit deutschen Zutaten wie Marzipan und Waldbeeren verbindet. Zielgruppe: Paare, Hochzeitsplaner und Liebhaber erschwinglichen Luxus. Die Marke verkörpert Zartheit, Verspieltheit, Eleganz und Romantik.', 'Cologne boutique patisserie combining French pâtisserie with German ingredients like marzipan and wild berries. Target audience: couples, wedding planners and lovers of affordable luxury. The brand embodies delicacy, playfulness, elegance and romance.'))}</>)}
              {card(<>{cardTitle(t('Identität', 'Identity'), '#fa8ab466')}{cardBody(t('Tagline: "Little edible jewels." Farbpalette: Creme, tiefes Bordeauxrot, Goldakzent. Logo: Verschlungene Initialen mit Gebäckmotiv. Typografie: Klassische Serifenschrift für Display. Anwendungen: Packaging, Visitenkarten, Schaufensterbeschriftung.', 'Tagline: "Little edible jewels." Color palette: cream, deep bordeaux red, gold accent. Logo: intertwined initials with a pastry motif. Typography: classic serif for display. Applications: packaging, business cards, storefront lettering.'))}</>)}
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {['Brand Identity','Logo Design','Style Guide','Gastronomy','Cologne','Mascot Design','Packaging'].map(t => (
                <span key={t} style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-2)', border: '1px solid var(--line-strong)', borderRadius: 4, padding: '3px 9px', fontFamily: 'var(--font-mono)' }}>{t}</span>
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
    accent: '#FF9A5A',
    category: t('Mobile App · UX/UI', 'Mobile App · UX/UI'),
    tools: 'Figma · Maze · Miro',
    role: t('Solo — UX/UI Designer', 'Solo — UX/UI Designer'),
    year: '2023',
    heroImg: '/img/projects/schwimmspass-thumbnail.webp',
    liveUrl: 'https://xd.adobe.com/view/686d220c-8ac2-4168-8435-e61ee5c05780-3d3e/',
    liveLabel: t('Prototyp ansehen', 'View prototype'),
    intro: t('SchwimmSpass ist ein App-Redesign-Konzept für einen Mainzer Anbieter von Kinderschwimmkursen. Das Ziel: Die Kursanmeldung und -verwaltung für vielbeschäftigte Eltern so einfach wie möglich zu gestalten.', 'SchwimmSpass is an app redesign concept for a Mainz-based provider of children\'s swimming courses. The goal: to make course registration and management as simple as possible for busy parents.'),
    sections: [
      {
        label: t('Problem & Kontext', 'Problem & Context'),
        content: grid2(
          <>{cardTitle(t('Ausgangssituation', 'Starting Point'), '#06b6d466')}{cardBody(t('Die bestehende Lösung des Anbieters war ein PDF-Formular per E-Mail. Eltern mussten Kurstermine manuell abgleichen, Dokumente ausdrucken und einschicken. Kein App-Angebot, keine digitale Rückmeldung.', 'The provider\'s existing solution was a PDF form via email. Parents had to check course dates manually, print documents and mail them in. No app, no digital feedback.'))}</>,
          <>{cardTitle(t('Zielgruppe', 'Target Audience'), '#06b6d466')}{cardBody(t('Eltern von Kindern im Alter von 3–6 Jahren, berufstätig, mit begrenztem Zeitbudget. Hauptgerät: Smartphone. Hauptbedürfnis: schnelle, übersichtliche Kursanmeldung und -verwaltung.', 'Parents of children aged 3–6, working, with a limited time budget. Main device: smartphone. Main need: fast, clear course registration and management.'))}</>,
        ),
      },
      {
        label: t('Designentscheidungen', 'Design Decisions'),
        content: (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 16 }}>
            {[
              { t: t('Onboarding', 'Onboarding'), b: t('Kinddaten einmalig anlegen; bei Folgebuchungen entfällt jede Dateneingabe.', 'Enter child data once; no data entry needed for follow-up bookings.') },
              { t: t('Kursfilter', 'Course Filter'), b: t('Filterung nach Altersgruppe, Uhrzeit und Wochentag — direkt auf dem Startscreen.', 'Filter by age group, time and weekday — directly on the start screen.') },
              { t: t('Buchungsflow', 'Booking Flow'), b: t('Unter 3 Taps vom Kurs zur Bestätigung. Kalenderintegration per Deep Link.', 'Under 3 taps from course to confirmation. Calendar integration via deep link.') },
              { t: t('Fortschritt', 'Progress'), b: t('Visueller Badge-Fortschrittsbalken für jedes Kind — motivierend für Eltern.', 'Visual badge progress bar for each child — motivating for parents.') },
            ].map((d, i) => card(<>{cardTitle(d.t, '#06b6d466')}{cardBody(d.b)}</>, undefined, i))}
          </div>
        ),
      },
      {
        label: t('Usability-Test', 'Usability Test'),
        content: card(cardBody(t('Fünf moderierte Tests mit Eltern (online, per Maze). Hauptfinding: Der Buchungsabschluss-Button war in der ersten Version schwer findbar (Farbe zu ähnlich wie Hintergrund). Überarbeitung: Höherer Kontrast, größere Touch-Target-Area. Sekundäres Finding: Eltern wollten den Kursleiter sehen — Leiterbild und Kurzprofil wurden in v2 ergänzt.', 'Five moderated tests with parents (online, via Maze). Main finding: the booking-completion button was hard to find in the first version (color too similar to the background). Revision: higher contrast, larger touch-target area. Secondary finding: parents wanted to see the instructor — an instructor photo and short profile were added in v2.'))),
      },
    ],
    nextSlug: 'squishy-savings',
    nextName: 'Squishy Savings',
  },

  /* ── SQUISHY SAVINGS ────────────────────────────────────── */
  'squishy-savings': {
    title: 'Squishy Savings',
    description: t('Mobile Finance-App mit lokaler Datenspeicherung — Sparkonten, Ausgaben-Tracking und Sparziele ohne Cloud oder Registrierung.', 'Mobile finance app with local data storage — savings accounts, expense tracking and savings goals without cloud or registration.'),
    accent: '#FF5F00',
    category: t('UX/UI · Mobile App · FinTech', 'UX/UI · Mobile App · FinTech'),
    tools: 'Figma · Procreate · FigJam',
    role: t('Solo — UX/UI Designer', 'Solo — UX/UI Designer'),
    year: '2024',
    heroImg: '/img/projects/mosaic-savings.webp',
    liveUrl: 'https://squishy-savings-app.vercel.app/',
    liveLabel: t('Live ansehen', 'View live'),
    intro: t('Squishy Savings ist eine Mobile-Finance-App mit verspielter, weicher Ästhetik und einem klaren Ansatz: alle Finanzdaten lokal auf dem Gerät — maximale Privatsphäre, null Abhängigkeiten, keine Registrierung erforderlich.', 'Squishy Savings is a mobile finance app with a playful, soft aesthetic and a clear approach: all financial data stored locally on the device — maximum privacy, zero dependencies, no registration required.'),
    sections: [
      {
        label: t('Problem & Lösung', 'Problem & Solution'),
        content: grid2(
          <>{cardTitle(t('Herausforderung', 'Challenge'), '#f59e0b66')}{cardBody(t('Die meisten Spar-Apps erfordern eine Kontoverbindung, Cloud-Sync oder Registrierung. Viele Nutzer möchten ihre Finanzdaten privat halten und nicht teilen — aber dennoch einen klaren Überblick über Ersparnisse, Ausgaben und Sparziele.', 'Most savings apps require a bank connection, cloud sync or registration. Many users want to keep their financial data private and not share it — yet still have a clear overview of savings, expenses and goals.'))}</>,
          <>{cardTitle(t('Lösung', 'Solution'), '#f59e0b66')}{cardBody(t('Ein Mobile-First-Design mit weicher, spielerischer Ästhetik (hence "Squishy"). Klare Struktur für Sparkonten, Einnahmen-/Ausgaben-Tracking und persönliche Sparziele mit visuellem Fortschritt. Alles ohne Server, ohne Login.', 'A mobile-first design with a soft, playful aesthetic (hence "Squishy"). Clear structure for savings accounts, income/expense tracking and personal goals with visual progress. All without a server, without a login.'))}</>,
        ),
      },
      {
        label: 'UX-Prozess',
        content: (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14 }}>
            {[
              { n: '01', t: t('Nutzeranalyse', 'User Analysis'), b: t('Personas für Nutzer, die Privatsphäre priorisieren. Pain Points bei bestehenden Finanz-Apps: Komplexität, Datenweitergabe, Registrierungspflicht.', 'Personas for privacy-first users. Pain points with existing finance apps: complexity, data sharing, mandatory registration.') },
              { n: '02', t: t('Information Architecture', 'Information Architecture'), b: t('Low-Fidelity-Wireframes für Hauptscreens: Dashboard, Sparkonten, Transaktionen, Sparziele.', 'Low-fidelity wireframes for the main screens: dashboard, savings accounts, transactions, goals.') },
              { n: '03', t: t('Visuelles Design', 'Visual Design'), b: t('Verspieltes Design-System in Figma — weiche Formen, warme Grüntöne, klare Datenhierarchie und zugängliche Typografie.', 'Playful design system in Figma — soft shapes, warm greens, clear data hierarchy and accessible typography.') },
              { n: '04', t: t('Klickbarer Prototyp', 'Clickable Prototype'), b: t('Vollständiger interaktiver Prototyp: von der Kontoerstellung über Ausgaben-Tracking bis zur Zielübersicht.', 'Complete interactive prototype: from account creation through expense tracking to goal overview.') },
            ].map((step, i) => card(
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--text-2)', marginBottom: 8 }}>{step.n}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 8 }}>{step.t}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.6 }}>{step.b}</div>
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
              { t: t('Lokale Datenspeicherung', 'Local Data Storage'), b: t('Keine Registrierung, kein Cloud-Sync. Alle Finanzdaten bleiben vollständig auf dem Gerät.', 'No registration, no cloud sync. All financial data stays entirely on the device.') },
              { t: t('Mehrere Sparkonten', 'Multiple Savings Accounts'), b: t('Mehrere Konten gleichzeitig verwalten — Urlaub, Notgroschen, Anschaffungen.', 'Manage several accounts at once — holiday, emergency fund, purchases.') },
              { t: t('Einnahmen & Ausgaben', 'Income & Expenses'), b: t('Transaktionen erfassen und kategorisieren; Ausgabenlimit pro Konto festlegen.', 'Record and categorize transactions; set a spending limit per account.') },
              { t: t('Visuelle Sparziele', 'Visual Savings Goals'), b: t('Persönliche Ziele mit visuellem Fortschrittsbalken — motivierend, ohne Gamification-Zwang.', 'Personal goals with a visual progress bar — motivating, without forced gamification.') },
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
    accent: '#FF9A5A',
    category: t('UX/UI · Dashboard · Web App', 'UX/UI · Dashboard · Web App'),
    tools: 'Figma · React',
    role: t('Solo — UX/UI & Frontend Developer', 'Solo — UX/UI & Frontend Developer'),
    year: '2024',
    heroImg: '/img/projects/mosaic-sentinel.webp',
    liveUrl: 'https://helvicium15-sentinel2025.vercel.app/',
    liveLabel: t('Live ansehen', 'View live'),
    intro: t('Sentinel ist eine Web-App für das Echtzeit-Monitoring von Online-Shops — Verkaufszahlen, Lagerbestand und Traffic auf einen Blick, in einem klaren Dark-UI-Dashboard. Designed in Figma, entwickelt mit React und live auf Vercel deployed.', 'Sentinel is a web app for real-time monitoring of online shops — sales figures, inventory and traffic at a glance, in a clean dark-UI dashboard. Designed in Figma, built with React and deployed live on Vercel.'),
    sections: [
      {
        label: t('Problem & Lösung', 'Problem & Solution'),
        content: grid2(
          <>{cardTitle(t('Herausforderung', 'Challenge'), '#0ea5e966')}{cardBody(t('Betreiber von Online-Shops brauchen Echtzeit-Einblick in ihr Geschäft — Verkäufe, Lagerbestände, Traffic — aber die meisten Tools sind zu komplex, zu teuer oder nicht auf kleine und mittlere Shops zugeschnitten.', 'Online-shop operators need real-time insight into their business — sales, inventory, traffic — but most tools are too complex, too expensive or not tailored to small and mid-sized shops.'))}</>,
          <>{cardTitle(t('Lösung', 'Solution'), '#0ea5e966')}{cardBody(t('Eine fokussierte Web-App mit minimalem Dark-UI-Dashboard. Verkaufszahlen, Lagerstand und Traffic sind auf einen Blick erfassbar — mit visuellen Alerts für kritische Ereignisse und einer Oberfläche, die keine Einarbeitung erfordert.', 'A focused web app with a minimal dark-UI dashboard. Sales figures, inventory and traffic are graspable at a glance — with visual alerts for critical events and an interface that requires no training.'))}</>,
        ),
      },
      {
        label: 'UX-Prozess',
        content: (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14 }}>
            {[
              { n: '01', t: t('Nutzeranalyse', 'User Analysis'), b: t('Interviews mit Shop-Betreibern: welche Metriken sind täglich kritisch? Welche Tools nutzen sie, was frustriert sie?', 'Interviews with shop operators: which metrics are critical daily? Which tools do they use, what frustrates them?') },
              { n: '02', t: t('Information Architecture', 'Information Architecture'), b: t('Strukturierung der Datenhierarchie — was gehört ins Dashboard, was in die Detailansicht? Low-Fi-Wireframes für alle Hauptansichten.', 'Structuring the data hierarchy — what belongs in the dashboard, what in the detail view? Low-fi wireframes for all main views.') },
              { n: '03', t: t('Dark UI System', 'Dark UI System'), b: t('Design-System in Figma — Farbpalette, Komponenten, Datencharts und Typografie-Hierarchie. Optimiert für lange Monitoring-Sessions.', 'Design system in Figma — color palette, components, data charts and typography hierarchy. Optimized for long monitoring sessions.') },
              { n: '04', t: t('Live App', 'Live App'), b: t('Vollständige Web-App mit React entwickelt und auf Vercel deployed — Echtzeit-Daten, Alertsystem und responsives Dashboard-Layout.', 'Complete web app built with React and deployed on Vercel — real-time data, alert system and responsive dashboard layout.') },
            ].map((step, i) => card(
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--text-2)', marginBottom: 8 }}>{step.n}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 8 }}>{step.t}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.6 }}>{step.b}</div>
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
              { t: t('Echtzeit-Verkaufsmetriken', 'Real-Time Sales Metrics'), b: t('Umsatzübersicht und Verkaufszahlen in Echtzeit — täglich, wöchentlich, monatlich vergleichbar.', 'Revenue overview and sales figures in real time — comparable daily, weekly, monthly.') },
              { t: t('Lagerbestand-Monitoring', 'Inventory Monitoring'), b: t('Bestandsübersicht mit automatischen Alerts bei niedrigem Stock — kein manuelles Prüfen mehr.', 'Stock overview with automatic alerts on low inventory — no more manual checking.') },
              { t: t('Traffic-Visualisierung', 'Traffic Visualization'), b: t('Besucher, Conversion Rate und Absprungraten im Blick — mit Trend-Indikatoren.', 'Visitors, conversion rate and bounce rates at a glance — with trend indicators.') },
              { t: t('Bestellübersicht', 'Order Overview'), b: t('Aktuelle Bestellungen mit Status-Tracking auf einem zentralen Dashboard-Screen.', 'Current orders with status tracking on a central dashboard screen.') },
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
    accent: '#FF9A5A',
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
    accent: '#FF5F00',
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
            <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--line)', boxShadow: '0 8px 28px rgba(0,0,0,0.36)', background: 'var(--inset)', maxWidth: 900 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 14px', borderBottom: '1px solid var(--line)', background: 'rgba(30,31,34,0.6)' }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'rgba(0,0,0,0.48)' }} />
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'rgba(0,0,0,0.48)' }} />
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'rgba(0,0,0,0.48)' }} />
                <span style={{ marginLeft: 8, fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'rgba(0,0,0,0.85)' }}>smartfox-media.de</span>
              </div>
              <div style={{ maxHeight: 540, overflowY: 'auto' }}>
                <img src="/img/projects/smartfox/website-startseite.jpg" alt="Startseite der von mir gestalteten Smartfox-Website" style={{ width: '100%', display: 'block' }} loading="lazy" />
              </div>
            </div>
            <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--text-3)', fontStyle: 'italic' }}>{t('Vollständige Startseite — im Rahmen scrollbar.', 'Full homepage — scrollable within the frame.')}</p>
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
            <a href="https://smartfox-website.webflow.io/projekte/tuv-nord-akademie-lernen-leicht-gemacht" target="_blank" rel="noopener noreferrer" className="btn btn-secondary lq btn-sm" style={{ marginTop: 16 }}>
              {t('Projekt bei Smartfox ansehen', 'View project at Smartfox')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M7 17 17 7M8 7h9v9" /></svg>
            </a>
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
    accent: '#FF9A5A',
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
