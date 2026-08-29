import React from 'react';
import { motion, useInView, animate, useReducedMotion } from 'framer-motion';

function CountUp({ end, suffix = "", duration = 2 }: { end: number | string, suffix?: string, duration?: number }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  React.useEffect(() => {
    if (inView && ref.current) {
      if (typeof end === 'number') {
        const controls = animate(0, end, {
          duration,
          onUpdate(value) {
            if (ref.current) {
              ref.current.textContent = Math.round(value) + suffix;
            }
          }
        });
        return () => controls.stop();
      } else {
        ref.current.textContent = end + suffix;
      }
    }
  }, [inView, end, duration, suffix]);

  return <span ref={ref}>{typeof end === 'number' ? 0 : end}{suffix}</span>;
}

const skillCategories = [
  {
    title: "Languages",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-accentBlue">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    skills: ["C++", "Java", "Python", "JavaScript"]
  },
  {
    title: "Frontend",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-accentBlue">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L4 12l5.75-5M14.25 7L20 12l-5.75 5" />
      </svg>
    ),
    skills: ["HTML", "CSS", "React", "Tailwind CSS", "Next.js"]
  },
  {
    title: "Backend",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-accentBlue">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    ),
    skills: ["Node.js", "Express", "Flask", "Java", "Socket.io"]
  },
  {
    title: "Databases",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-accentBlue">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    skills: ["MySQL", "SQLite", "PostgreSQL", "Supabase"]
  },
  {
    title: "Cloud & DevOps",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-accentBlue">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
    skills: ["Git", "GitHub", "Netlify", "Render", "Vercel"]
  },
  {
    title: "Tools & Other",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-accentBlue">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.83M11.42 15.17l-.582-.583m.582.583L9 17.5l-3 3-3-3 3-3 2.33-2.33m5.5-2.5l2.5-2.5a2.652 2.652 0 00-3.75-3.75l-2.5 2.5m-5.5 2.5l-2.5 2.5a2.65 2.65 0 003.75 3.75l2.5-2.5m5.5-2.5l2.5-2.5a2.652 2.652 0 00-3.75-3.75l-2.5 2.5" />
      </svg>
    ),
    skills: ["VS Code", "Postman", "REST APIs", "Linux"]
  }
];

const profiles = [
  {
    platform: "GitHub",
    handle: "akshat3021",
    url: "https://github.com/akshat3021",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 group-hover:text-accentBlue transition-colors">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    )
  },
  {
    platform: "LinkedIn",
    handle: "akshat-aswal-3021m",
    url: "https://linkedin.com/in/akshat-aswal-3021m",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 group-hover:text-accentBlue transition-colors">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    )
  },
  {
    platform: "LeetCode",
    handle: "@akshat3021",
    url: "https://leetcode.com/u/akshat3021",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 group-hover:text-accentBlue transition-colors">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.939 5.939 0 0 0 1.271 1.543l3.995 3.906a1.304 1.304 0 0 0 1.99-.013c.5-.504.618-1.162-.162-1.922l-3.755-3.669a3.247 3.247 0 0 1-.767-1.171 3.111 3.111 0 0 1-.162-1.126c.142-.83.47-1.436.982-1.97l3.844-4.094 5.811-5.698c.35-.34.341-.933.024-1.258a1.282 1.282 0 0 0-.894-.438zM22.063 11.23a1.446 1.446 0 0 0-1.077.411l-3.951 3.992-1.55 1.517c-.328.324-.316.898.026 1.25a1.259 1.259 0 0 0 .89.447c.365-.008.73-.178.995-.44l5.52-5.46a1.218 1.218 0 0 0 .342-.871c.01-.35-.125-.708-.37-.962a1.311 1.311 0 0 0-.825-.436v-.44zm-5.744 1.62l-1.396 1.373a1.284 1.284 0 0 0-.343.834c.005.342.13.682.352.923.238.261.564.4.92.4h5.275a1.144 1.144 0 0 0 1.149-1.15 1.14 1.14 0 0 0-1.149-1.149h-4.808z" />
      </svg>
    )
  }
];

export default function Skills() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    },
  };

  return (
    <section id="skills" className="py-24 px-8 text-textOffWhite max-w-6xl mx-auto relative border-t border-border/10">
      
      {/* 1. Skills Grid */}
      <div className="mb-24">
        <div className="text-left mb-12">
          <p className="text-accentBlue tracking-[0.25em] text-xs font-semibold uppercase mb-2">
            TECHNOLOGIES I USE
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-sans text-textOffWhite">
            Technologies I use
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="bg-bgNearBlack/40 border border-gray-800 rounded-2xl p-6 hover:border-accentBlue/30 transition-colors duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2.5 rounded-lg bg-accentBlue/10 border border-accentBlue/20">
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold font-sans text-textOffWhite">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs tracking-wide text-gray-300 bg-bgNearBlack border border-gray-800 px-3 py-1.5 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 2. Stats Subsection */}
      <div className="mb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
          <div className="flex flex-col items-center justify-center text-center p-6 bg-bgNearBlack/20 border border-gray-800/50 rounded-2xl">
            <span className="text-4xl md:text-5xl font-black text-accentBlue mb-2 font-mono">
              <CountUp end={4} suffix="+" />
            </span>
            <span className="text-sm text-gray-400 font-semibold tracking-wide uppercase">Live Projects Shipped</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-6 bg-bgNearBlack/20 border border-gray-800/50 rounded-2xl">
            <span className="text-4xl md:text-5xl font-black text-accentBlue mb-2 font-mono">
              <CountUp end={26} suffix="" />
            </span>
            <span className="text-sm text-gray-400 font-semibold tracking-wide uppercase">Technologies Used</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-6 bg-bgNearBlack/20 border border-gray-800/50 rounded-2xl">
            <span className="text-4xl md:text-5xl font-black text-accentBlue mb-2 font-mono">
              <CountUp end={2} suffix="" />
            </span>
            <span className="text-sm text-gray-400 font-semibold tracking-wide uppercase">Certifications Earned</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-6 bg-bgNearBlack/20 border border-gray-800/50 rounded-2xl">
            <span className="text-4xl md:text-5xl font-black text-accentBlue mb-2 font-mono">
              <CountUp end={100} suffix="+" />
            </span>
            <span className="text-sm text-gray-400 font-semibold tracking-wide uppercase">NSS Volunteer Hours</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-6 bg-bgNearBlack/20 border border-gray-800/50 rounded-2xl">
            <span className="text-4xl md:text-5xl font-black text-accentBlue mb-2 font-mono">
              <CountUp end={10} suffix="+" />
            </span>
            <span className="text-sm text-gray-400 font-semibold tracking-wide uppercase">GitHub Repositories</span>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center justify-center text-center p-6 bg-bgNearBlack/20 border border-gray-800/50 rounded-2xl"
          >
            <span className="text-4xl md:text-5xl font-black text-accentBlue mb-2 font-serif-accent">
              <CountUp end="∞" suffix="" />
            </span>
            <span className="text-sm text-gray-400 font-semibold tracking-wide uppercase">Curiosity & Drive</span>
          </motion.div>
        </div>
      </div>

      {/* 3. Coding Profiles Subsection */}
      <div>
        <div className="text-center mb-12">
          <p className="text-accentBlue tracking-[0.25em] text-xs font-semibold uppercase mb-2">
            FIND ME ONLINE
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-sans text-textOffWhite">
            Coding profiles
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap justify-center gap-6 md:gap-8"
        >
          {profiles.map((profile) => (
            <motion.a
              key={profile.platform}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group flex items-center gap-4 bg-bgNearBlack/60 border border-gray-800 rounded-2xl p-4 pr-8 hover:border-accentBlue/50 hover:shadow-[0_0_20px_rgba(110,168,232,0.15)] transition-all duration-300"
            >
              <div className="text-gray-400">
                {profile.icon}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold text-textOffWhite group-hover:text-accentBlue transition-colors">
                  {profile.platform}
                </span>
                <span className="text-xs font-mono text-gray-500">
                  {profile.handle}
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
