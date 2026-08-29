import React from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WireframeShapeProps {
  type: 'octahedron' | 'icosahedron';
  position: [number, number, number];
  scale?: number;
}

export default function WireframeShape({ type, position, scale = 1 }: WireframeShapeProps) {
  const meshRef = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }
      // Axial rotation drift + response to scroll offset
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.08 + window.scrollY * 0.0006;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.12 + window.scrollY * 0.0004;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={[scale, scale, scale]}>
      {type === 'octahedron' ? (
        <octahedronGeometry args={[1, 0]} />
      ) : (
        <icosahedronGeometry args={[1, 0]} />
      )}
      <meshBasicMaterial
        color="#6EA8E8"
        wireframe={true}
        transparent={true}
        opacity={0.12}
      />
    </mesh>
  );
}
