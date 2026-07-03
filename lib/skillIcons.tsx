/* ─────────────────────────────────────────────────────────────────
   Skill icon tiles — brand badges for tools, evocative line icons
   for soft/conceptual skills. Brand glyph paths sourced from the
   `simple-icons` package (official marks); Adobe apps + a few tools
   not covered there use the same lettermark convention Adobe itself
   uses for its own app icons.
   ───────────────────────────────────────────────────────────────── */
import type { CSSProperties, ReactNode } from 'react';

interface SkillIconDef {
  bg: string;
  fg: string;
  render: (fg: string) => ReactNode;
}

function pathIcon(d: string) {
  return (fg: string) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill={fg}>
      <path d={d} />
    </svg>
  );
}

function lettermark(text: string, size = 17) {
  return (fg: string) => (
    <span style={{
      fontFamily: 'var(--font-display)', fontWeight: 800,
      fontSize: size, color: fg, letterSpacing: '-0.01em',
    }}>{text}</span>
  );
}

function lineIcon(paths: ReactNode) {
  return (fg: string) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={fg} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {paths}
    </svg>
  );
}

/* ── Brand / program icons ──────────────────────────────────────── */
const BRAND_ICONS: Record<string, SkillIconDef> = {
  'Figma': {
    bg: '#1A1A22', fg: '#A259FF',
    render: pathIcon('M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z'),
  },
  'Adobe Photoshop': {
    bg: '#001E36', fg: '#31A8FF',
    render: lettermark('Ps'),
  },
  'Adobe Illustrator': {
    bg: '#330000', fg: '#FF9A00',
    render: lettermark('Ai'),
  },
  'InDesign': {
    bg: '#49021F', fg: '#FF3366',
    render: lettermark('Id'),
  },
  'Procreate': {
    bg: '#0B0B0E', fg: '#ffffff',
    render: () => (
      <span aria-hidden style={{
        width: 22, height: 22, borderRadius: '50%', display: 'block',
        background: 'conic-gradient(from 200deg, #ff5f6d, #ffc371, #6dd5ed, #c279f9, #ff5f6d)',
        boxShadow: 'inset 0 0 0 2px rgba(0,0,0,0.5)',
      }} />
    ),
  },
  'FigJam': {
    bg: '#FFC700', fg: '#1A1A2E',
    render: lettermark('FJ'),
  },
  'Miro': {
    bg: '#050038', fg: '#FFD02F',
    render: pathIcon('M17.392 0H13.9L17 4.808 10.444 0H6.949l3.102 6.3L3.494 0H0l3.05 8.131L0 24h3.494L10.05 6.985 6.949 24h3.494L17 5.494 13.899 24h3.493L24 3.672 17.392 0z'),
  },
  'HTML5': {
    bg: '#E34F26', fg: '#ffffff',
    render: pathIcon('M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z'),
  },
  'CSS3': {
    bg: '#264DE4', fg: '#ffffff',
    render: lettermark('CSS3', 12.5),
  },
  'TypeScript': {
    bg: '#3178C6', fg: '#ffffff',
    render: lettermark('TS'),
  },
  'React': {
    bg: '#0B0B14', fg: '#61DAFB',
    render: pathIcon('M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z'),
  },
  'Three.js': {
    bg: '#0B0B0E', fg: '#ffffff',
    render: pathIcon('M.38 0a.268.268 0 0 0-.256.332l2.894 11.716a.268.268 0 0 0 .01.04l2.89 11.708a.268.268 0 0 0 .447.128L23.802 7.15a.268.268 0 0 0-.112-.45l-5.784-1.667a.268.268 0 0 0-.123-.035L6.38 1.715a.268.268 0 0 0-.144-.04L.456.01A.268.268 0 0 0 .38 0zm.374.654L5.71 2.08 1.99 5.664zM6.61 2.34l4.864 1.4-3.65 3.515zm-.522.12l1.217 4.926-4.877-1.4zm6.28 1.538l4.878 1.404-3.662 3.53zm-.52.13l1.208 4.9-4.853-1.392zm6.3 1.534l4.947 1.424-3.715 3.574zm-.524.12l1.215 4.926-4.876-1.398zm-15.432.696l4.964 1.424-3.726 3.586zM8.047 8.15l4.877 1.4-3.66 3.527zm-.518.137l1.236 5.017-4.963-1.432zm6.274 1.535l4.965 1.425-3.73 3.586zm-.52.127l1.235 5.012-4.958-1.43zm-9.63 2.438l4.873 1.406-3.656 3.523zm5.854 1.687l4.863 1.403-3.648 3.51zm-.54.04l1.214 4.927-4.875-1.4zm-3.896 4.02l5.037 1.442-3.782 3.638z'),
  },
  'Next.js': {
    bg: '#000000', fg: '#ffffff',
    render: pathIcon('M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z'),
  },
  'Git': {
    bg: '#F03C2E', fg: '#ffffff',
    render: pathIcon('M13.09 23.549a1.54 1.54 0 0 1-2.18 0L.451 13.089a1.54 1.54 0 0 1 0-2.179l7.191-7.19 2.733 2.733a1.85 1.85 0 0 0 .964 2.326v6.66a1.849 1.849 0 1 0 1.54 0V8.957l2.508 2.508a1.85 1.85 0 1 0 1.09-1.09l-2.634-2.634a1.85 1.85 0 0 0-2.378-2.377L8.73 2.63 10.91.451a1.54 1.54 0 0 1 2.179 0l10.459 10.46a1.54 1.54 0 0 1 0 2.179z'),
  },
  'Adobe After Effects': {
    bg: '#00004C', fg: '#CCC9FF',
    render: lettermark('Ae'),
  },
  'Adobe XD': {
    bg: '#2E001E', fg: '#FF61F6',
    render: lettermark('Xd'),
  },
  'Autodesk Maya': {
    bg: '#0E1B2A', fg: '#3DC5D6',
    render: lettermark('Ma'),
  },
  'Autodesk 3ds Max': {
    bg: '#0E1B2A', fg: '#4FC1E9',
    render: lettermark('3ds', 13),
  },
  'Midjourney': {
    bg: '#0B0B0E', fg: '#ffffff',
    render: lettermark('MJ'),
  },
  'Freepik AI': {
    bg: '#1273EB', fg: '#ffffff',
    render: lettermark('Fp'),
  },
};

/* ── Evocative line icons for non-program / conceptual skills ────── */
const ACCENTS = ['#22d3ee', '#a78bfa', '#f472b6', '#34d399', '#fbbf24'];

const CONCEPT_ICONS: Record<string, (fg: string) => ReactNode> = {
  'UX Research': lineIcon(<>
    <circle cx="10" cy="10" r="6.5" />
    <path d="M14.8 14.8 21 21" />
    <path d="M7.5 10h5M10 7.5v5" />
  </>),
  'UI Design': lineIcon(<>
    <rect x="3" y="3" width="8" height="8" rx="1.6" />
    <rect x="13" y="3" width="8" height="5" rx="1.6" />
    <rect x="13" y="10" width="8" height="11" rx="1.6" />
    <rect x="3" y="13" width="8" height="8" rx="1.6" />
  </>),
  'Interaction Design': lineIcon(<>
    <path d="M6 3.5 6 16l3.2-2.7 1.9 4.6 2.4-1-1.9-4.6h4.1L6 3.5z" />
  </>),
  'Prototyping': lineIcon(<>
    <path d="M3 21 3 17.5 14.5 6l3.5 3.5L6.5 21H3z" />
    <path d="M12.5 8 16 11.5" />
    <path d="M16.5 3.5 20.5 7.5" stroke={undefined as unknown as string} />
    <path d="M17 4 21 4 21 8" />
  </>),
  'Usability Testing': lineIcon(<>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M9 8h6M9 12h6" />
    <path d="M8.5 16.5 10.5 18.5 15.5 13.5" />
  </>),
  'Brand Identity': lineIcon(<>
    <circle cx="12" cy="12" r="9" />
    <circle cx="9" cy="10" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="14.5" cy="9" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="16" cy="14" r="1.4" fill="currentColor" stroke="none" />
    <path d="M12 21a3 3 0 0 0 0-6 1.6 1.6 0 0 1 0-3.2 9 9 0 1 0 0 9.2z" fill="none" />
  </>),
  'Motion Design': lineIcon(<>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M9.5 9.2v5.6l4.8-2.8-4.8-2.8z" fill="currentColor" stroke="none" />
  </>),
  'Wireframing': lineIcon(<>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 8h18M8 8v13" />
    <path d="M11 11.5h7M11 14.5h7M11 17.5h4" />
  </>),
  'CPUX-F Zertifizierung': lineIcon(<>
    <circle cx="12" cy="9" r="5.5" />
    <path d="M8.2 13.8 6.5 21l5.5-3 5.5 3-1.7-7.2" />
  </>),
  'Eigenverantwortung': lineIcon(<>
    <path d="M12 3.5 19 6.5v5.2c0 4.6-3 7.7-7 8.8-4-1.1-7-4.2-7-8.8V6.5L12 3.5z" />
    <path d="M9 12 11 14.2 15.3 9.8" />
  </>),
  'Kommunikation': lineIcon(<>
    <path d="M4 5h13a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H10l-4.5 3.5V16H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" transform="translate(1 0)" />
  </>),
  'Agile Methoden': lineIcon(<>
    <path d="M4 12a8 8 0 0 1 13.66-5.66L20 8" />
    <path d="M20 4v4h-4" />
    <path d="M20 12a8 8 0 0 1-13.66 5.66L4 16" />
    <path d="M4 20v-4h4" />
  </>),
};

const DEFAULT_CONCEPT_ICON = lineIcon(<>
  <path d="M12 2 14.5 8.5 21 9.3 16 13.7 17.5 20.3 12 16.8 6.5 20.3 8 13.7 3 9.3 9.5 8.5z" />
</>);

interface SkillTileProps {
  name: string;
  index: number;
  size?: number;
}

export function SkillTile({ name, index, size = 58 }: SkillTileProps) {
  const brand = BRAND_ICONS[name];
  const tileStyle: CSSProperties = {
    width: size, height: size, borderRadius: 16,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  };

  if (brand) {
    return (
      <div
        style={{
          ...tileStyle,
          background: brand.bg,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -8px 14px rgba(0,0,0,0.22), 0 8px 18px rgba(0,0,0,0.32)',
        }}
      >
        {brand.render(brand.fg)}
      </div>
    );
  }

  const accent = ACCENTS[index % ACCENTS.length];
  const icon = CONCEPT_ICONS[name] ?? DEFAULT_CONCEPT_ICON;
  return (
    <div
      style={{
        ...tileStyle,
        background: `linear-gradient(160deg, ${accent}22, ${accent}0a)`,
        border: `1px solid ${accent}33`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08), 0 0 16px ${accent}1a`,
      }}
    >
      {icon(accent)}
    </div>
  );
}
