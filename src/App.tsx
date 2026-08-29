import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Overlays
import NoiseOverlay from './lib/NoiseOverlay';
import SideDotNav from './lib/SideDotNav';

// Lazy load WebGL background (stars + parallax polyhedrons) to optimize FCP
const StarFieldCanvas = React.lazy(() => import('./components/StarFieldCanvas'));

// Sections
import Intro from './components/Intro';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Focus from './components/Focus';
import Experience from './components/Experience';
import Work from './components/Work';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import SoundToggle from './components/SoundToggle';

function App() {
  const [isPrivacyOpen, setIsPrivacyOpen] = React.useState(false);

  // Close Privacy modal on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPrivacyOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Background & Overlay Layers */}
      <NoiseOverlay />
      
      {/* 3D Starfield & Parallax Wireframes Layer (Lazy Loaded) */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none">
        <React.Suspense fallback={<div className="absolute inset-0 bg-bgNearBlack" />}>
          <StarFieldCanvas />
        </React.Suspense>
      </div>

      <SideDotNav />
      <Intro onStart={() => {}} />
      <Nav />
      
      {/* Scrollable Layout Flow */}
      <section id="home"><Hero /></section>
      <section id="about"><About /></section>
      <section id="experience"><Experience /></section>
      <section id="focus"><Focus /></section>
      <section id="work"><Work /></section>
      <section id="skills"><Skills /></section>
      <section id="contact"><Contact /></section>
      
      <Footer onOpenPrivacy={() => setIsPrivacyOpen(true)} />
      <CookieConsent onOpenPrivacy={() => setIsPrivacyOpen(true)} />
      <SoundToggle />

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {isPrivacyOpen && (
          <div className="fixed inset-0 bg-bgNearBlack/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop click listener */}
            <div className="absolute inset-0 cursor-default" onClick={() => setIsPrivacyOpen(false)} />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-bgNearBlack border border-accentBlue/20 rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsPrivacyOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-bgNearBlack/60 backdrop-blur-sm border border-border/20 text-textOffWhite hover:border-textOffWhite hover:text-accentBlue hover:scale-105 transition-all duration-300 z-10 cursor-pointer"
                title="Close modal"
                aria-label="Close privacy modal"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                </svg>
              </button>

              <h3 className="text-xl md:text-2xl font-bold text-textOffWhite mb-4 border-b border-border/10 pb-3">
                Privacy Policy
              </h3>

              <div className="space-y-4 text-gray-400 text-xs sm:text-sm leading-relaxed max-h-[350px] overflow-y-auto pr-2 font-sans">
                <p>
                  Welcome to my portfolio site. Your privacy is highly valued. This page explains what information is processed while browsing.
                </p>
                
                <div>
                  <h4 className="font-bold text-textOffWhite uppercase text-[11px] tracking-wider mb-1.5">
                    1. Local Storage Usage
                  </h4>
                  <p>
                    We leverage client-side storage technologies to preserve local user preferences:
                  </p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li><code>sessionStorage</code>: Remembers if you have already watched the intro gate sequence during your visit.</li>
                    <li><code>localStorage</code>: Registers your acknowledgement of our Privacy Policy so the bottom consent banner remains hidden on future loads.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-textOffWhite uppercase text-[11px] tracking-wider mb-1.5">
                    2. Third-Party Integrations &amp; Audio
                  </h4>
                  <p>
                    All audio files (the loopable ambient soundtrack) are hosted locally within our repository. No tracking beacons or advertisement trackers are embedded in the code. Contact form data is validated locally and logged on the browser console for testing and verification purposes.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-textOffWhite uppercase text-[11px] tracking-wider mb-1.5">
                    3. Accessibility &amp; Compliance
                  </h4>
                  <p>
                    This site is developed following WCAG 2.1 AA design standards, supporting screen readers, keyboard-only tab paths, and OS-level motion reductions.
                  </p>
                </div>
              </div>

              {/* Close CTA button */}
              <button
                onClick={() => setIsPrivacyOpen(false)}
                className="w-full mt-6 py-2.5 rounded-full bg-accentBlue text-bgNearBlack font-semibold text-xs hover:bg-accentBlue/90 active:scale-[0.98] transition-all duration-300 cursor-pointer text-center"
              >
                Close Policy
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
