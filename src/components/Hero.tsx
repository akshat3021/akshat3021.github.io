import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';

export default function Hero() {
  const words = ['Cloud', 'Full-Stack', 'AI-Powered'];
  const [wordIndex, setWordIndex] = React.useState(0);
  const shouldReduceMotion = useReducedMotion();
  const [introCompleted, setIntroCompleted] = React.useState(() => {
    return sessionStorage.getItem('hasStarted') === 'true';
  });

  React.useEffect(() => {
    const handleIntroComplete = () => {
      setIntroCompleted(true);
    };
    window.addEventListener('intro-completed', handleIntroComplete);
    return () => window.removeEventListener('intro-completed', handleIntroComplete);
  }, []);

  React.useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { 
      y: shouldReduceMotion ? 0 : 30, 
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.8,
      },
    },
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-transparent flex flex-col justify-center items-center px-4 md:px-8">
      {/* Cinematic Staggered Entrance Elements */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center justify-center pt-24 pb-16 transition-opacity duration-500 ${
          !introCompleted ? 'opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto' : 'opacity-100'
        }`}
      >
        {/* Eyebrow, letter-spaced caps */}
        <motion.p
          variants={itemVariants}
          className="text-accentBlue tracking-[0.25em] text-xs md:text-sm font-semibold uppercase mb-4"
        >
          SOFTWARE ENGINEER &middot; DEHRADUN, IN
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-7xl font-bold font-sans text-textOffWhite mb-4 md:mb-6 tracking-tight"
        >
          Akshat Aswal
        </motion.h1>

        {/* Tagline */}
        <motion.h2
          variants={itemVariants}
          className="text-xl sm:text-2xl md:text-4xl text-textOffWhite/90 mb-6 font-sans font-light tracking-wide min-h-[36px] sm:min-h-[44px] md:min-h-[56px] flex items-center justify-center flex-wrap"
        >
          <span className="whitespace-pre">A </span>
          {/* Inline fixed-width container left-aligned to prevent text reflow while keeping natural left spacing */}
          <span className="inline-flex relative h-[28px] sm:h-[36px] md:h-[48px] overflow-hidden align-bottom justify-start min-w-[110px] sm:min-w-[130px] md:min-w-[210px]">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[wordIndex]}
                initial={shouldReduceMotion ? { opacity: 0 } : { y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { y: -25, opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="font-serif-accent italic text-accentBlue absolute text-left w-full left-0"
              >
                {words[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="whitespace-pre"> developer building real-world software.</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          className="text-sm md:text-lg text-gray-400 max-w-2xl mb-10 md:mb-12 font-sans font-normal leading-relaxed px-4 md:px-0"
        >
          B.Tech CSE student crafting full-stack applications, cloud solutions, and AI-powered products that solve real problems.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button
            onClick={() => scrollToSection('work')}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-accentBlue text-bgNearBlack font-semibold text-base hover:bg-accentBlue/90 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(110,168,232,0.25)] cursor-pointer"
          >
            See Projects
          </button>
          
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center px-6 py-3 rounded-full border border-textOffWhite/30 text-textOffWhite hover:border-textOffWhite font-semibold text-base hover:bg-textOffWhite/5 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Download Resume &darr;
          </a>

          <button
            onClick={() => scrollToSection('contact')}
            className="text-textOffWhite/60 hover:text-accentBlue text-base font-semibold hover:underline transition-all duration-300 flex items-center gap-1 cursor-pointer"
          >
            Reach out...
          </button>
        </motion.div>
      </motion.div>

      {/* Animated Down Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none">
        <span className="text-[10px] tracking-[0.4em] text-gray-500 font-semibold uppercase">
          Scroll
        </span>
        <div className="scroll-indicator-line rounded-full" />
      </div>
    </section>
  );
}
