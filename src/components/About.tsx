import React from 'react';
import { motion, useReducedMotion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import WireframeShape from '../lib/WireframeShape';
import profilePhoto from '../assets/portrait-stylized.png';
import educationData from '../data/education.json';
import skillsData from '../data/skills.json';

interface SkillItem {
  name: string;
  icon: string;
}

export default function About() {
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = React.useState<'education' | 'skills'>('education');

  const photoVariants: Variants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.8,
        ease: shouldReduceMotion ? 'easeOut' : [0.16, 1, 0.3, 1],
      },
    },
  };

  const textVariants: Variants = {
    hidden: { y: shouldReduceMotion ? 0 : 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.8,
        ease: shouldReduceMotion ? 'easeOut' : [0.16, 1, 0.3, 1],
      },
    },
  };

  const tagPills = [
    'Full Stack Dev',
    'Cloud & DevOps',
    'AI/ML',
    'Open Source',
    'System Design',
    'NSS Volunteer',
  ];

  // Inline SVG icon mapper for skills
  const getIconSvg = (iconName: string) => {
    const props = { className: "text-accentBlue", width: "16", height: "16", fill: "currentColor", viewBox: "0 0 24 24" };
    switch (iconName) {
      case 'html':
        return (
          <svg {...props}>
            <path d="M12 2L2 22h20L12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
          </svg>
        );
      case 'css':
        return (
          <svg {...props}>
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 6h-4v2h4v2h-4v2h4v2H9V7h6v2z" />
          </svg>
        );
      case 'react':
        return (
          <svg {...props}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-1.41 1.41C12.54 13.79 12 14.5 12 16h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" />
          </svg>
        );
      case 'tailwind':
        return (
          <svg {...props}>
            <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.9-1.9C9.07 19.57 10.47 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
          </svg>
        );
      case 'nextjs':
        return (
          <svg {...props}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5h-2v-7h2v7zm4 0h-2v-4h2v4zm0-5.5h-2v-1.5h2v1.5z" />
          </svg>
        );
      case 'nodejs':
        return (
          <svg {...props}>
            <path d="M12 2L2 7l10 5 10-5-10-5zm0 13l-8-4v4l8 4 8-4v-4l-8 4z" />
          </svg>
        );
      case 'express':
        return (
          <svg {...props}>
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 12H9v-2h6v2zm3-4H6V8h12v4z" />
          </svg>
        );
      case 'flask':
        return (
          <svg {...props}>
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-2v2h2v2h-2v2h-2v-2h-2v-2h2v-2H9V9h8v4z" />
          </svg>
        );
      case 'java':
        return (
          <svg {...props}>
            <path d="M2 21h20v-2H2v2zM20 8h-2V5c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2zm-6 0h-4V5h4v3zm4 5H6v-3h12v3z" />
          </svg>
        );
      case 'socketio':
        return (
          <svg {...props}>
            <path d="M7 2v11h3v9l7-12h-4l4-8H7z" />
          </svg>
        );
      default:
        return (
          <svg {...props}>
            <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          </svg>
        );
    }
  };

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseXSpring = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = x / width - 0.5;
    const yPct = y / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 text-textOffWhite max-w-6xl mx-auto">
      {/* Eyebrow / Header */}
      <div className="text-left mb-16">
        <p className="text-accentBlue tracking-[0.25em] text-xs font-semibold uppercase mb-2">
          ABOUT ME
        </p>
        <h2 className="text-2xl md:text-4xl font-bold font-sans text-textOffWhite mb-4">
          Who I <span className="font-serif-accent italic text-accentBlue">am</span>
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 items-start justify-between">
        {/* Left Column: Stylized Portrait with 3D background and parallax card */}
        <motion.div
          variants={photoVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 flex-shrink-0 mx-auto lg:mx-0"
          style={{ perspective: 1000 }}
        >
          {/* Subtle outline polyhedron behind/around the photo */}
          <div className="absolute inset-0 -m-16 z-0 pointer-events-none select-none">
            <Canvas camera={{ position: [0, 0, 3], fov: 60 }}>
              <ambientLight intensity={0.5} />
              <WireframeShape type="icosahedron" position={[0, 0, 0]} scale={1.75} />
            </Canvas>
          </div>

          {/* Parallax Photo Container (No visible borders/background) */}
          <motion.div 
            className="relative z-10 w-full h-full"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={profilePhoto}
              alt="Akshat Aswal"
              className="w-full h-full object-cover transition-all duration-500 ease-in-out"
              style={{ 
                transform: "translateZ(20px)",
                WebkitMaskImage: "radial-gradient(circle, black 55%, transparent 90%)",
                maskImage: "radial-gradient(circle, black 55%, transparent 90%)"
              }}
            />
            {/* Pulsing "Open to Work" Badge */}
            <div 
              className="absolute bottom-4 left-4 bg-bgNearBlack/80 backdrop-blur-md px-3.5 py-1 rounded-full border border-green-500/20 flex items-center gap-2 z-20"
              style={{ transform: "translateZ(30px)" }}
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse block shadow-[0_0_8px_#22c55e]" />
              <span className="text-[9px] tracking-wider uppercase font-bold text-green-400">Open to Work</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Bio text + Tag pills + Tabbed content */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex-grow text-left max-w-2xl"
        >
          <div className="space-y-4 text-gray-400 text-sm md:text-base leading-relaxed mb-8">
            <p>
              Hi, I'm Akshat Aswal, a B.Tech Computer Science & Engineering student at Graphic Era University, Dehradun. I like building things end to end figuring out how the backend and frontend should talk to each other, then actually making it work cleanly on both sides.
            </p>
            <p>
              Most of what I build sits somewhere between fullstack web apps, cloud deployment, and the occasional AI experiment. I'm not attached to one stack; I just like picking whatever gets the job done well.
            </p>
            <p className="text-textOffWhite font-medium">
              Outside of coding, I volunteer with NSS and try to show up for as many hackathons as I can they're honestly where I've learned the most in the shortest time. I'm currently looking for software engineering and fullstack opportunities where I can keep building and keep learning.
            </p>
          </div>

          {/* Tags Section */}
          <div className="flex flex-wrap gap-2.5 mb-10">
            {tagPills.map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-wider uppercase font-bold text-accentBlue bg-accentBlue/5 border border-accentBlue/10 px-3 py-1 rounded-full shadow-[0_2px_8px_rgba(110,168,232,0.05)]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Tab Selection Header */}
          <div className="flex gap-8 border-b border-gray-800 pb-2 mb-6 relative">
            {['education', 'skills'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`text-xs md:text-sm font-bold tracking-[0.2em] uppercase cursor-pointer relative pb-2 transition-colors duration-300 ${
                  activeTab === tab ? 'text-accentBlue' : 'text-gray-500 hover:text-textOffWhite'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-accentBlue"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="min-h-[220px]">
            {activeTab === 'education' ? (
              <div className="space-y-6">
                {educationData.map((edu: any) => (
                  <div key={edu.id} className="relative pl-6 border-l border-accentBlue/20">
                    {/* Glowing bullet */}
                    <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accentBlue border-2 border-bgNearBlack shadow-[0_0_8px_#6EA8E8]" />
                    
                    <h4 className="text-base font-bold text-textOffWhite tracking-tight">
                      {edu.title || edu.degree}
                    </h4>
                    <p className="text-xs text-gray-500 font-medium tracking-wide mt-1">
                      {edu.institution} &middot; <span className="text-accentBlue">{(edu.badges || []).join(' | ') || edu.timeline}</span>
                    </p>
                    
                    {/* Coursework Tags */}
                    {edu.coursework && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {edu.coursework.map((course: string) => (
                          <span
                            key={course}
                            className="px-2 py-0.5 rounded-full bg-textOffWhite/5 border border-textOffWhite/10 text-gray-400 text-[10px]"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Front-End List */}
                <div>
                  <h4 className="text-[10px] tracking-[0.2em] uppercase font-bold text-accentBlue mb-4 pb-1.5 border-b border-gray-800">
                    Front-End
                  </h4>
                  <ul className="grid grid-cols-2 gap-3">
                    {skillsData.frontend.map((skill: SkillItem, idx: number) => (
                      <motion.li
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center gap-2.5 text-xs text-gray-300 font-semibold"
                      >
                        {getIconSvg(skill.icon)}
                        <span>{skill.name}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Back-End List */}
                <div>
                  <h4 className="text-[10px] tracking-[0.2em] uppercase font-bold text-accentBlue mb-4 pb-1.5 border-b border-gray-800">
                    Back-End
                  </h4>
                  <ul className="grid grid-cols-2 gap-3">
                    {skillsData.backend.map((skill: SkillItem, idx: number) => (
                      <motion.li
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center gap-2.5 text-xs text-gray-300 font-semibold"
                      >
                        {getIconSvg(skill.icon)}
                        <span>{skill.name}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
