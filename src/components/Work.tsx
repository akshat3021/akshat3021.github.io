import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import WireframeShape from '../lib/WireframeShape';
import projectsData from '../data/projects.json';

// Import project screenshots from the new assets folder
import aegisImg from '../assets/projects/aegis.png';
import cloudstorageImg from '../assets/projects/cloudstorage.png';
import civicfixImg from '../assets/projects/civicfix.png';
import smartseatImg from '../assets/projects/smartseat.png';
import bookmyslotImg from '../assets/projects/bookmyslot.png';

const imagesMap: Record<string, string> = {
  aegis: aegisImg,
  cloudstorage: cloudstorageImg,
  civicfix: civicfixImg,
  smartseat: smartseatImg,
  bookmyslot: bookmyslotImg,
};

interface ProjectItem {
  id: number;
  title: string;
  year: string;
  status: string;
  description: string;
  url: string;
  git: string;
  domain: string;
  imageKey: string;
  tech: string[];
}

export default function Work() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedProject, setSelectedProject] = React.useState<ProjectItem | null>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Escape key handler for modal dismissal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Mouse drag-to-scroll logic on desktop
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      el.style.scrollBehavior = 'auto'; // disable smooth during drag
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const handleMouseLeave = () => {
      isDown = false;
      el.style.scrollBehavior = 'smooth';
    };
    const handleMouseUp = () => {
      isDown = false;
      el.style.scrollBehavior = 'smooth';
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mouseup', handleMouseUp);
    el.addEventListener('mousemove', handleMouseMove);

    return () => {
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('mouseup', handleMouseUp);
      el.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = 'smooth';
      scrollRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = 'smooth';
      scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  const gridVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { scale: 0.95, opacity: 0, y: 25 },
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
    <section className="py-16 md:py-24 px-4 md:px-8 text-textOffWhite max-w-6xl mx-auto relative">
      {/* Header block */}
      <div className="text-left mb-16">
        <p className="text-accentBlue tracking-[0.25em] text-xs font-semibold uppercase mb-2">
          SELECTED WORK
        </p>
        <h2 className="text-2xl md:text-4xl font-bold font-sans text-textOffWhite mb-4">
          Featured <span className="font-serif-accent italic text-accentBlue">projects</span>
        </h2>
        <p className="text-gray-400 text-base md:text-lg max-w-xl">
          A selection of projects I've built, from concept to deployment.
        </p>
      </div>

      {/* Carousel Wrapper containing controls and scroll panels */}
      <div className="relative group/carousel">
        {/* Scroll Control Prev Button */}
        <button
          onClick={scrollLeft}
          aria-label="Scroll left"
          className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-accentBlue/20 bg-bgNearBlack/60 backdrop-blur-md text-accentBlue hover:text-textOffWhite hover:border-accentBlue/60 hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer z-20 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>

        {/* Scroll Control Next Button */}
        <button
          onClick={scrollRight}
          aria-label="Scroll right"
          className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-accentBlue/20 bg-bgNearBlack/60 backdrop-blur-md text-accentBlue hover:text-textOffWhite hover:border-accentBlue/60 hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer z-20 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>

        {/* Horizontal scroll panel */}
        <motion.div
          ref={scrollRef}
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory py-6 px-2 scrollbar-none select-none cursor-grab active:cursor-grabbing"
          style={{ overflowY: 'hidden' }}
        >
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              onClick={() => setSelectedProject(project as any)}
              className="w-[300px] md:w-[340px] flex-shrink-0 snap-center bg-bgNearBlack/40 border border-gray-800 rounded-2xl p-4 cursor-pointer hover:border-accentBlue/30 transition-all duration-500 flex flex-col justify-between relative"
            >
              {/* Corner R3F rotating polyhedron diamond accent */}
              <div className="absolute top-2 right-2 w-14 h-14 z-20 pointer-events-none select-none">
                <Canvas camera={{ position: [0, 0, 2], fov: 60 }}>
                  <ambientLight intensity={0.5} />
                  <WireframeShape type="octahedron" position={[0, 0, 0]} scale={0.7} />
                </Canvas>
              </div>

              <div>
                {/* Photo container / mockup frame (subtly rotated) */}
                <div className="relative w-full h-[160px] md:h-[180px] rounded-xl overflow-hidden mb-4 bg-bgNearBlack border border-border/5 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <img
                    src={imagesMap[project.imageKey]}
                    alt={project.title}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bgNearBlack/60 to-transparent pointer-events-none" />
                </div>

                {/* Info area */}
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-base font-bold text-textOffWhite tracking-tight">
                    {project.title}
                  </h3>
                  <span className="text-[10px] text-gray-500 font-bold tracking-wider">{project.year}</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[9px] tracking-wider uppercase font-semibold bg-accentBlue/10 text-accentBlue px-2 py-0.5 rounded-full">
                    {project.status}
                  </span>
                  <span className="text-[10px] text-gray-500 truncate font-mono">{project.domain}</span>
                </div>

                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4 text-left font-sans">
                  {project.description}
                </p>
              </div>

              {/* Tech tag row */}
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {project.tech.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] tracking-wide text-gray-500 bg-bgNearBlack border border-gray-800/80 px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Details modal panel */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 bg-bgNearBlack/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop click listener */}
            <div className="absolute inset-0 cursor-default" onClick={() => setSelectedProject(null)} />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-bgNearBlack border border-accentBlue/20 rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-bgNearBlack/60 backdrop-blur-sm border border-border/20 text-textOffWhite hover:border-textOffWhite hover:text-accentBlue hover:scale-105 transition-all duration-300 z-10 cursor-pointer"
                title="Close modal"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                </svg>
              </button>

              {/* Mockup larger image */}
              <div className="w-full h-[220px] sm:h-[300px] rounded-xl overflow-hidden border border-border/10 mb-6 bg-bgNearBlack">
                <img
                  src={imagesMap[selectedProject.imageKey]}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Year */}
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl md:text-2xl font-bold text-textOffWhite tracking-tight">
                  {selectedProject.title}
                </h3>
                <span className="text-xs text-gray-500 font-semibold tracking-wider">{selectedProject.year}</span>
              </div>

              {/* Status & Domain */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] tracking-wider uppercase font-semibold bg-accentBlue/10 text-accentBlue px-2.5 py-0.5 rounded-full">
                  {selectedProject.status}
                </span>
                <span className="text-xs text-gray-500 font-mono">{selectedProject.domain}</span>
              </div>

              {/* Detailed Description */}
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6 font-sans">
                {selectedProject.description} This application is engineered to operate with high performance, supporting responsive grid views, localized operations, and optimal layouts. Developed using modern clean code guidelines.
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedProject.tech.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] tracking-wide text-gray-400 bg-bgNearBlack border border-gray-800 px-3 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Source/Demo Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {selectedProject.url && (
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-full bg-accentBlue text-bgNearBlack font-semibold text-center text-xs hover:bg-accentBlue/90 active:scale-[0.98] transition-all duration-300"
                  >
                    Live Demo ↗
                  </a>
                )}
                {selectedProject.git && (
                  <a
                    href={selectedProject.git}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-full border border-textOffWhite/30 text-textOffWhite font-semibold text-center text-xs hover:border-textOffWhite hover:bg-textOffWhite/5 active:scale-[0.98] transition-all duration-300"
                  >
                    GitHub Source
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
