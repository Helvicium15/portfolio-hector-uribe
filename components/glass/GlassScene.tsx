'use client';

/* CSS-animated ambient background — replaces the R3F scene.
   Identical visual output: 3 slow-floating colour blobs.
   No WebGL required, no React 19 compatibility issues. */
export default function GlassScene() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute',
        width: '60vw', height: '60vw',
        left: '-5%', top: '-15%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(61,90,128,0.22) 0%, transparent 68%)',
        filter: 'blur(70px)',
        animation: 'blobA 18s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        width: '52vw', height: '52vw',
        right: '-10%', top: '10%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(74,96,128,0.16) 0%, transparent 68%)',
        filter: 'blur(80px)',
        animation: 'blobB 22s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        width: '48vw', height: '48vw',
        left: '20%', bottom: '-10%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(45,64,96,0.18) 0%, transparent 68%)',
        filter: 'blur(75px)',
        animation: 'blobC 26s ease-in-out infinite',
      }} />
    </div>
  );
}
