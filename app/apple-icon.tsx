import { ImageResponse } from 'next/og';

/* iOS home-screen icon — same mark as app/icon.svg, full-bleed (iOS rounds it). */
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', background: '#FF5F00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="132" height="132" viewBox="0 0 32 32">
          <g transform="translate(16 16) skewX(-10) translate(-16 -16)" fill="#1E1F22">
            <rect x="8.5" y="7.5" width="4.2" height="17" rx="0.8" />
            <rect x="19.3" y="7.5" width="4.2" height="17" rx="0.8" />
            <rect x="10" y="14" width="12" height="3.8" />
          </g>
        </svg>
      </div>
    ),
    size,
  );
}
