import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import WireframeShape from '../lib/WireframeShape';

const generateStarField = (count: number, radius: number) => {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = radius * Math.cbrt(Math.random());
    
    points[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    points[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    points[i * 3 + 2] = r * Math.cos(phi);
  }
  return points;
};

function StarField() {
  const ref = React.useRef<THREE.Points>(null);
  const [sphere] = React.useState(() => generateStarField(1500, 10));

  useFrame((state, delta) => {
    if (ref.current) {
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }
      // Slow rotation drift
      ref.current.rotation.x -= delta * 0.02;
      ref.current.rotation.y -= delta * 0.015;
      
      // Parallax mouse movements
      const targetX = state.pointer.x * 0.15;
      const targetY = state.pointer.y * 0.15;
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, targetX, 0.05);
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, 0.05);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#6EA8E8"
          size={0.035}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function ParallaxGroup({ children }: { children: React.ReactNode }) {
  const groupRef = React.useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }
      // Parallax drift based on mouse coordinates
      const targetX = state.pointer.x * 0.35;
      const targetY = state.pointer.y * 0.35;
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function StarFieldCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <StarField />
      
      <ParallaxGroup>
        {/* Scattered background wireframe polyhedrons */}
        <WireframeShape type="icosahedron" position={[-3, 2, -1]} scale={1.1} />
        <WireframeShape type="octahedron" position={[3, -2, -1]} scale={0.9} />
        <WireframeShape type="icosahedron" position={[-2.8, -1.8, -1.5]} scale={0.7} />
        <WireframeShape type="octahedron" position={[2.8, 1.8, -1.5]} scale={0.6} />
        
        {/* Prominent wireframe shape positioned below/behind the CTA buttons */}
        <WireframeShape type="octahedron" position={[0, -1.4, -2]} scale={2.2} />
      </ParallaxGroup>
    </Canvas>
  );
}
