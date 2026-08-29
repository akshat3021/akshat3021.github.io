import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface ProfileItem {
  id: number;
  name: string;
  handle: string;
  url: string;
  brandColor: string;
  glowClass: string;
  hoverBorderClass: string;
  svgIcon: React.ReactNode;
}

export default function Profiles() {
  const shouldReduceMotion = useReducedMotion();
  const githubIcon = (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
    </svg>
  );

  const linkedinIcon = (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );

  const leetcodeIcon = (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
      <path d="M16.102 17.93l-2.69 2.6c-.754.728-1.782 1.13-2.85 1.13-1.066 0-2.093-.4-2.85-1.13l-5.61-5.422a3.67 3.67 0 0 1 0-5.326l5.61-5.422C8.469 3.64 9.496 3.24 10.562 3.24c1.067 0 2.095.4 2.85 1.13l2.69 2.6a.718.718 0 0 1 0 1.025.748.748 0 0 1-1.047 0l-2.69-2.6a2.17 2.17 0 0 0-3.053 0l-5.61 5.422a2.183 2.183 0 0 0 0 3.163l5.61 5.422c.813.785 2.24.785 3.053 0l2.69-2.6a.748.748 0 0 1 1.047 0c.29.28.29.743 0 1.025zm2.793-2.69l2.69-2.6c.754-.728.754-1.91 0-2.638l-2.69-2.6a.748.748 0 0 0-1.047 0c-.29.28-.29.744 0 1.026l2.69 2.6c.218.21.218.552 0 .762l-2.69 2.6a.748.748 0 0 0 0 1.025.72.72 0 0 0 1.047 0z" />
    </svg>
  );

  const profilesData: ProfileItem[] = [
    {
      id: 1,
      name: 'GitHub',
      handle: '@akshat3021',
      url: 'https://github.com/akshat3021',
      brandColor: 'text-textOffWhite',
      glowClass: 'hover:shadow-[0_0_20px_rgba(255,255,255,0.12)]',
      hoverBorderClass: 'hover:border-textOffWhite/30',
      svgIcon: githubIcon,
    },
    {
      id: 2,
      name: 'LinkedIn',
      handle: 'akshat-aswal-3021m',
      url: 'https://linkedin.com/in/akshat-aswal-3021m',
      brandColor: 'text-[#0077b5]',
      glowClass: 'hover:shadow-[0_0_20px_rgba(0,119,181,0.25)]',
      hoverBorderClass: 'hover:border-[#0077b5]/50',
      svgIcon: linkedinIcon,
    },
    {
      id: 3,
      name: 'LeetCode',
      handle: '@akshat3021',
      url: 'https://leetcode.com/akshat3021',
      brandColor: 'text-[#ffa116]',
      glowClass: 'hover:shadow-[0_0_20px_rgba(255,161,22,0.25)]',
      hoverBorderClass: 'hover:border-[#ffa116]/50',
      svgIcon: leetcodeIcon,
    },
  ];

  const gridVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { 
      scale: shouldReduceMotion ? 1 : 0.95, 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 20 
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
          Find Me Online
        </p>
        <h2 className="text-2xl md:text-4xl font-bold font-sans text-textOffWhite mb-4">
          Coding <span className="font-serif-accent italic text-accentBlue">profiles</span>
        </h2>
        <p className="text-gray-400 text-base md:text-lg max-w-xl">
          Where I write code, solve problems, and connect with the community.
        </p>
      </div>

      {/* Grid of Profile Cards */}
      <motion.div
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {profilesData.map((profile) => (
          <motion.a
            key={profile.id}
            variants={cardVariants}
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-6 rounded-2xl border border-accentBlue/10 bg-bgNearBlack/30 ${profile.hoverBorderClass} ${profile.glowClass} hover:-translate-y-1.5 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex items-center gap-5 text-left cursor-pointer`}
          >
            {/* Icon Container */}
            <div className={`${profile.brandColor} p-3 rounded-xl bg-bgNearBlack/50 border border-border/5`}>
              {profile.svgIcon}
            </div>

            {/* Info */}
            <div>
              <h3 className="text-lg font-bold text-textOffWhite tracking-tight">
                {profile.name}
              </h3>
              <p className="text-sm text-gray-500 font-semibold mt-0.5">
                {profile.handle}
              </p>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
