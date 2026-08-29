import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Nav() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('home');
  const [introCompleted, setIntroCompleted] = React.useState(() => {
    return sessionStorage.getItem('hasStarted') === 'true';
  });

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    const handleIntroComplete = () => {
      setIntroCompleted(true);
    };
    window.addEventListener('intro-completed', handleIntroComplete);
    return () => window.removeEventListener('intro-completed', handleIntroComplete);
  }, []);

  React.useEffect(() => {
    if (!introCompleted) return;

    const sections = ['home', 'about', 'experience', 'focus', 'work', 'skills', 'contact'];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: '-40% 0px -50% 0px',
        }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [introCompleted]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {introCompleted && (
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed left-1/2 -translate-x-1/2 z-30 transition-all duration-500 ease-in-out ${
            isScrolled
              ? 'top-4 w-[90%] max-w-4xl p-2 px-6 rounded-full border border-accentBlue/20 bg-bgNearBlack/70 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
              : 'top-0 w-full p-4 px-8 border-b border-transparent bg-transparent'
          }`}
        >
          <div className="flex justify-between items-center w-full">
            {/* Logo circle "AA" */}
            <button
              onClick={() => scrollToSection('home')}
              aria-label="Scroll to home"
              className="flex items-center justify-center w-11 h-11 rounded-full border border-accentBlue/30 bg-bgNearBlack text-accentBlue font-bold text-lg tracking-wider hover:border-accentBlue transition-colors duration-300 cursor-pointer shrink-0"
            >
              AA
            </button>

            {/* Navigation links (Home, About, Focus, Work, Skills) */}
            <nav className="hidden md:flex items-center gap-8">
              {[
                { label: 'Home', id: 'home' },
                { label: 'About', id: 'about' },
                { label: 'Experience', id: 'experience' },
                { label: 'Focus', id: 'focus' },
                { label: 'Work', id: 'work' },
                { label: 'Skills', id: 'skills' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors duration-300 cursor-pointer min-h-[44px] flex items-center ${
                    activeSection === item.id
                      ? 'text-accentBlue font-semibold'
                      : 'text-textOffWhite/70 hover:text-accentBlue'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* "Say hi ↗" pill button */}
            <button
              onClick={() => scrollToSection('contact')}
              className="px-5 min-h-[44px] flex items-center rounded-full bg-accentBlue text-bgNearBlack font-semibold text-sm hover:bg-accentBlue/80 transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(110,168,232,0.2)]"
            >
              Say hi ↗
            </button>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
