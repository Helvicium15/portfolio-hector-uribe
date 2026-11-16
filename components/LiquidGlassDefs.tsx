/**
 * SVG filter used by the `.lq` liquid-glass layer (`backdrop-filter: url(#lq-refract)`).
 * A low-frequency noise field displaces the backdrop so whatever sits behind a
 * glass button bends like through a thick lens. Chromium renders it; other
 * browsers ignore the url() and keep the plain blurred glass declared before it.
 * Rendered once in the root layout.
 */
export default function LiquidGlassDefs() {
  return (
    <svg aria-hidden width="0" height="0" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
      <defs>
        <filter id="lq-refract" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" seed="7" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="2" result="soft" />
          <feDisplacementMap in="SourceGraphic" in2="soft" scale="22" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}
