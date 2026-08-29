import React from 'react';

export default function SideDotNav() {
  const [activeSection, setActiveSection] = React.useState('home');
  const sections = ['home', 'about', 'experience', 'focus', 'work', 'skills', 'contact'];

  React.useEffect(() => {
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
          rootMargin: '-40% 0px -50% 0px', // trigger when section dominates viewport
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
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4 select-none">
      {sections.map((id) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          aria-label={`Scroll to ${id}`}
          className="group relative flex items-center justify-end p-2 cursor-pointer"
        >
          {/* Label text on hover */}
          <span className="absolute right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] tracking-[0.25em] text-accentBlue uppercase font-semibold pointer-events-none whitespace-nowrap bg-bgNearBlack/60 backdrop-blur-sm px-2.5 py-0.5 rounded border border-accentBlue/10">
            {id}
          </span>
          
          {/* Circular dot */}
          <span
            className={`w-2 h-2 rounded-full border transition-all duration-300 ${
              activeSection === id
                ? 'bg-accentBlue border-accentBlue scale-125 shadow-[0_0_8px_rgba(110,168,232,0.8)]'
                : 'bg-transparent border-gray-600 group-hover:border-accentBlue'
            }`}
          />
        </button>
      ))}
    </div>
  );
}
