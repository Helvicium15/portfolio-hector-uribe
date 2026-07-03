'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

/* ── Master glass material props ────────────────────────────────── */
interface GlassMeshProps {
  width?: number;
  height?: number;
  depth?: number;
  radius?: number;
  shape?: 'round-box' | 'sphere' | 'cylinder';
  hovered?: boolean;
  transmission?: number;
  roughness?: number;
  ior?: number;
  thickness?: number;
  color?: string;
}

export function GlassMesh({
  width = 1,
  height = 1,
  depth = 0.15,
  radius = 0.3,
  shape = 'round-box',
  hovered = false,
  transmission = 0.96,
  roughness = 0.08,
  ior = 1.55,
  thickness = 0.12,
  color = '#c8d8ec',
}: GlassMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const target = hovered ? 1.025 : 1.0;
    meshRef.current.scale.x += (target - meshRef.current.scale.x) * 8 * delta;
    meshRef.current.scale.y += (target - meshRef.current.scale.y) * 8 * delta;
    meshRef.current.scale.z += (target - meshRef.current.scale.z) * 8 * delta;
  });

  const geometry =
    shape === 'sphere' ? (
      <sphereGeometry args={[width / 2, 48, 48]} />
    ) : shape === 'cylinder' ? (
      <cylinderGeometry args={[width / 2, width / 2, height, 64]} />
    ) : null;

  return (
    <mesh ref={meshRef}>
      {shape === 'round-box' ? (
        <RoundedBox args={[width, height, depth]} radius={radius} smoothness={8}>
          <MeshTransmissionMaterial
            transmission={transmission}
            roughness={roughness}
            ior={ior}
            thickness={thickness}
            color={color}
            attenuationColor="#a8c4e0"
            attenuationDistance={0.5}
            chromaticAberration={0.03}
            anisotropy={0.1}
            distortion={0.0}
            distortionScale={0.3}
            temporalDistortion={0.0}
            iridescence={0.15}
            iridescenceIOR={1.3}
            iridescenceThicknessRange={[100, 400]}
            envMapIntensity={0.8}
            backside={true}
          />
        </RoundedBox>
      ) : (
        <mesh ref={meshRef}>
          {geometry}
          <MeshTransmissionMaterial
            transmission={transmission}
            roughness={roughness}
            ior={ior}
            thickness={thickness}
            color={color}
            attenuationColor="#a8c4e0"
            chromaticAberration={0.03}
            iridescence={0.15}
            iridescenceIOR={1.3}
            iridescenceThicknessRange={[100, 400]}
            envMapIntensity={0.8}
            backside={true}
          />
        </mesh>
      )}
    </mesh>
  );
}

/* ── Glass circle button — matches reference circular element ────── */
export function GlassCircle({ radius = 0.5, hovered = false }: { radius?: number; hovered?: boolean }) {
  return (
    <GlassMesh
      shape="sphere"
      width={radius * 2}
      height={radius * 2}
      hovered={hovered}
      transmission={0.95}
      roughness={0.06}
      ior={1.6}
      thickness={0.18}
    />
  );
}

/* ── Glass lozenge (pill) — matches reference "Upload" element ────── */
export function GlassLozenge({
  width = 2.2,
  height = 0.7,
  hovered = false,
}: {
  width?: number;
  height?: number;
  hovered?: boolean;
}) {
  return (
    <GlassMesh
      shape="round-box"
      width={width}
      height={height}
      depth={0.12}
      radius={height / 2}
      hovered={hovered}
      transmission={0.94}
      roughness={0.10}
      ior={1.55}
      thickness={0.10}
    />
  );
}
