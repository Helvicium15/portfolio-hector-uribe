// Bridges React-Three-Fiber v8's intrinsic elements (ambientLight, mesh, …)
// into React 19's JSX namespace. R3F v8 augments the legacy global `JSX`,
// but React 19's automatic runtime resolves intrinsics from `React.JSX`,
// so `next build`'s type-check couldn't find <ambientLight> etc.
import type { ThreeElements } from '@react-three/fiber';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}
