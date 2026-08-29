import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface EducationItem {
  id: number;
  title: string;
  institution: string;
  location: string;
  badges: string[];
  coursework?: string[];
  stream?: string;
}

export default function Education() {
  const shouldReduceMotion = useReducedMotion();
  const educationData: EducationItem[] = [
    {
      id: 1,
      title: 'B.Tech Computer Science & Engineering',
      institution: 'Graphic Era University',
      location: 'Dehradun, Uttarakhand',
      badges: ['Expected Graduation: 2028', 'B.TECH CSE'],
      coursework: [
        'Data Structures & Algorithms',
        'Operating Systems',
        'DBMS',
        'Computer Networks',
        'Software Engineering',
        'Cloud Computing',
      ],
    },
    {
      id: 2,
      title: 'Higher Secondary Education',
      institution: 'St Thomas School',
      location: 'Pauri, Uttarakhand',
      badges: ['Class XII', '2024'],
      stream: 'PCM',
    },
    {
      id: 3,
      title: 'Secondary Education',
      institution: 'St Thomas School',
      location: 'Pauri, Uttarakhand',
      badges: ['Class X', '2022'],
    },
  ];

  const gridVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { 
      scale: shouldReduceMotion ? 1 : 0.95, 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 30 
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

  const gradCapIcon = (
    <div className="w-12 h-12 rounded-xl bg-accentBlue/10 border border-accentBlue/20 text-accentBlue flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(110,168,232,0.1)]">
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
      </svg>
    </div>
  );

  return (
    <section className="py-24 px-8 text-textOffWhite max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-left mb-16">
        <p className="text-accentBlue tracking-[0.25em] text-xs font-semibold uppercase mb-2">
          Education
        </p>
        <h2 className="text-3xl md:text-4xl font-bold font-sans text-textOffWhite mb-4">
          Academic <span className="font-serif-accent italic text-accentBlue">background</span>
        </h2>
      </div>

      {/* Grid of Education Cards */}
      <motion.div
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {educationData.map((item) => (
          <motion.div
            key={item.id}
            variants={cardVariants}
            className="p-6 rounded-2xl border border-accentBlue/10 bg-bgNearBlack/30 hover:border-accentBlue/25 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] text-left flex flex-col justify-between"
          >
            <div>
              {/* Header: Icon + Title */}
              <div className="flex gap-4 items-start mb-6">
                {gradCapIcon}
                <div>
                  <h3 className="text-lg font-bold text-textOffWhite leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium mt-1">
                    {item.institution}
                  </p>
                  <p className="text-xs text-gray-600 font-medium">
                    {item.location}
                  </p>
                </div>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {item.badges.map((badge) => (
                  <span
                    key={badge}
                    className="px-2.5 py-0.5 rounded-full bg-accentBlue/10 border border-accentBlue/20 text-accentBlue text-[9px] tracking-wider uppercase font-bold"
                  >
                    {badge}
                  </span>
                ))}
                {item.stream && (
                  <span className="px-2.5 py-0.5 rounded-full bg-textOffWhite/5 border border-textOffWhite/10 text-gray-400 text-[9px] tracking-wider uppercase font-bold">
                    Stream: {item.stream}
                  </span>
                )}
              </div>

              {/* Coursework Tags */}
              {item.coursework && (
                <div className="mt-6 pt-6 border-t border-border/5">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-3">
                    Relevant Coursework
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.coursework.map((course) => (
                      <span
                        key={course}
                        className="px-2 py-0.5 rounded bg-textOffWhite/5 border border-textOffWhite/5 text-gray-400 text-xs select-none"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
