import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroProps {
  onStart: () => void;
}

export default function Intro({ onStart }: IntroProps) {
  const [showGate, setShowGate] = React.useState(() => {
    return sessionStorage.getItem('hasStarted') !== 'true';
  });

  React.useEffect(() => {
    if (showGate) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showGate]);

  const handleStart = () => {
    sessionStorage.setItem('hasStarted', 'true');
    setShowGate(false);
    onStart();
    window.dispatchEvent(new CustomEvent('intro-completed'));
  };

  return (
    <AnimatePresence>
      {showGate && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bgNearBlack/60 backdrop-blur-[2px] select-none pointer-events-auto"
        >
          {/* Start Gate Content */}
          <div className="text-center max-w-lg px-6 flex flex-col items-center gap-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center gap-1"
            >
            <h1 className="text-4xl md:text-5xl font-bold tracking-[0.3em] uppercase text-textOffWhite font-sans leading-none">
              Akshat Aswal
            </h1>
            {/* Small decorative animated line */}
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "40px", opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="h-[1px] bg-accentBlue/50 mt-4 mb-2"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="text-xs md:text-sm tracking-[0.4em] uppercase text-accentBlue font-semibold font-sans mt-2"
          >
            Software Engineer
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-10 relative group"
          >
            {/* Subtle outer pulsing ring */}
            <span className="absolute inset-0 rounded-full border border-accentBlue/30 animate-ping opacity-40 group-hover:opacity-70 transition-opacity duration-300 pointer-events-none" />
            
            <button
              onClick={handleStart}
              className="relative px-10 py-3.5 rounded-full border border-accentBlue/50 text-accentBlue font-semibold text-sm hover:border-accentBlue hover:text-textOffWhite hover:bg-accentBlue/20 transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(110,168,232,0.15)] group-hover:shadow-[0_0_30px_rgba(110,168,232,0.3)] bg-transparent hover:scale-105"
            >
              Start
            </button>
          </motion.div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
}
