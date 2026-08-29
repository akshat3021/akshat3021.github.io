import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 3D Polyhedron Brain Cluster Component
function PolyhedronCluster() {
  const centerRef = React.useRef<THREE.Mesh>(null);
  const sat1Ref = React.useRef<THREE.Mesh>(null);
  const sat2Ref = React.useRef<THREE.Mesh>(null);
  const sat3Ref = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scroll = window.scrollY * 0.0006;

    if (centerRef.current) {
      centerRef.current.rotation.x = time * 0.05 + scroll;
      centerRef.current.rotation.y = time * 0.07;
    }
    if (sat1Ref.current) {
      sat1Ref.current.rotation.x = -time * 0.1;
      sat1Ref.current.rotation.y = time * 0.08 + scroll;
      // Orbit path
      sat1Ref.current.position.x = Math.sin(time * 0.3) * 1.5;
      sat1Ref.current.position.z = Math.cos(time * 0.3) * 1.5;
    }
    if (sat2Ref.current) {
      sat2Ref.current.rotation.x = time * 0.12;
      sat2Ref.current.rotation.y = -time * 0.06 + scroll;
      // Orbit path
      sat2Ref.current.position.y = Math.sin(time * 0.25) * 1.3;
      sat2Ref.current.position.x = Math.cos(time * 0.25) * 1.3;
    }
    if (sat3Ref.current) {
      sat3Ref.current.rotation.x = -time * 0.08 + scroll;
      sat3Ref.current.rotation.z = time * 0.1;
      // Orbit path
      sat3Ref.current.position.y = Math.cos(time * 0.2) * 1.4;
      sat3Ref.current.position.z = Math.sin(time * 0.2) * 1.4;
    }
  });

  return (
    <group>
      {/* Central brain polyhedron */}
      <mesh ref={centerRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshBasicMaterial color="#6EA8E8" wireframe transparent opacity={0.12} />
      </mesh>
      
      {/* Satellite orbiting shapes */}
      <mesh ref={sat1Ref} position={[1.5, 0, 0]} scale={[0.35, 0.35, 0.35]}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#6EA8E8" wireframe transparent opacity={0.16} />
      </mesh>
      <mesh ref={sat2Ref} position={[0, 1.3, 0]} scale={[0.3, 0.3, 0.3]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#6EA8E8" wireframe transparent opacity={0.16} />
      </mesh>
      <mesh ref={sat3Ref} position={[0, 0, 1.4]} scale={[0.25, 0.25, 0.25]}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#6EA8E8" wireframe transparent opacity={0.16} />
      </mesh>
    </group>
  );
}

export default function Focus() {
  const shouldReduceMotion = useReducedMotion();

  const focusData = [
    {
      title: 'Full-Stack Development',
      description: 'Building complete web applications end to end, from clean REST APIs to responsive, accessible frontends.',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accentBlue">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <line x1="14" y1="4" x2="10" y2="20" />
        </svg>
      ),
    },
    {
      title: 'Cloud & DevOps',
      description: 'Deploying and managing applications with CI/CD pipelines, using tools like Netlify, Render, and Vercel.',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accentBlue">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      ),
    },
    {
      title: 'AI-Powered Products',
      description: 'Integrating AI/ML capabilities into practical tools that solve real user problems.',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accentBlue">
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-4.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2z" />
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-4.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2z" />
        </svg>
      ),
    },
    {
      title: 'Database Design',
      description: 'Structuring reliable, secure data models across SQL and NoSQL systems — MySQL, PostgreSQL, Supabase.',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accentBlue">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      ),
    },
    {
      title: 'Open Source & Collaboration',
      description: 'Contributing to and maintaining public repositories, writing clean and reusable code.',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accentBlue">
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M18 15V9a4 4 0 0 0-4-4H9" />
          <line x1="6" y1="9" x2="6" y2="15" />
        </svg>
      ),
    },
    {
      title: 'System Design',
      description: 'Thinking through scalable architecture for real-world applications, from data flow to component structure.',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accentBlue">
          <rect x="3" y="3" width="7" height="9" />
          <rect x="14" y="3" width="7" height="5" />
          <rect x="14" y="12" width="7" height="9" />
          <rect x="3" y="16" width="7" height="5" />
        </svg>
      ),
    },
  ];

  const gridVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { 
      scale: shouldReduceMotion ? 1 : 0.95, 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 25 
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.8,
        ease: shouldReduceMotion ? 'easeOut' : [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 text-textOffWhite max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-left mb-16">
        <p className="text-accentBlue tracking-[0.25em] text-xs font-semibold uppercase mb-2">
          WHAT I FOCUS ON
        </p>
        <h2 className="text-2xl md:text-4xl font-bold font-sans text-textOffWhite mb-4">
          Where I add <span className="font-serif-accent italic text-accentBlue">value</span>
        </h2>
        <p className="text-gray-400 text-base md:text-lg max-w-xl">
          Areas I've built real experience in — through coursework, projects, and hands-on internship work.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start justify-between">
        {/* Sticky Abstract Wireframe Polyhedron Cluster Column */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-32 h-[300px] lg:h-[450px] flex-shrink-0 flex items-center justify-center select-none pointer-events-none">
          <Canvas camera={{ position: [0, 0, 4.5], fof: 60 } as any}>
            <ambientLight intensity={0.5} />
            <PolyhedronCluster />
          </Canvas>
        </div>

        {/* 2x3 Outlined, Glowing Hover Service Cards Grid */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {focusData.map((item, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ 
                y: -6, 
                boxShadow: '0 10px 30px -10px rgba(110,168,232,0.2)',
                borderColor: 'rgba(110,168,232,0.3)'
              }}
              className="p-6 rounded-2xl border border-gray-800 bg-bgNearBlack/30 hover:bg-bgNearBlack/50 transition-all duration-300 text-left flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-accentBlue/20 bg-accentBlue/5 mb-5 shadow-[0_2px_8px_rgba(110,168,232,0.05)]">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-textOffWhite tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
