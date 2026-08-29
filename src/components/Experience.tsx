import { motion, useReducedMotion } from 'framer-motion';
import experienceData from '../data/experience.json';

export default function Experience() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-24 px-8 text-textOffWhite max-w-4xl mx-auto relative border-t border-border/10">
      <div className="mb-16">
        <p className="text-accentBlue tracking-[0.25em] text-xs font-semibold uppercase mb-2">
          EXPERIENCE
        </p>
        <h2 className="text-3xl md:text-4xl font-bold font-sans text-textOffWhite mb-4">
          Where I've worked
        </h2>
        <p className="text-gray-400 text-base md:text-lg max-w-xl">
          Professional internships and industry experience.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative"
      >
        {/* Timeline vertical line */}
        <div className="absolute left-[11px] top-4 bottom-0 w-px bg-border/20 hidden md:block"></div>

        <div className="space-y-12">
          {experienceData.map((job) => (
            <motion.div key={job.id} variants={itemVariants} className="relative flex flex-col md:flex-row gap-6 md:gap-12">
              
              {/* Timeline dot */}
              <div className="hidden md:flex flex-col items-center mt-6 z-10">
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  className="w-6 h-6 rounded-full bg-bgNearBlack border-2 border-accentBlue flex items-center justify-center shadow-[0_0_15px_rgba(110,168,232,0.4)]"
                >
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-2 h-2 rounded-full bg-accentBlue"
                  />
                </motion.div>
              </div>

              {/* Card */}
              <div className="flex-1 bg-bgNearBlack/40 border border-gray-800 rounded-2xl p-6 md:p-8 hover:border-accentBlue/30 transition-colors duration-300">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold font-sans text-textOffWhite mb-1">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-base text-accentBlue font-medium">
                        {job.company}
                      </span>
                      {('status' in job) && (job as any).status && (
                        <span className="text-[10px] tracking-wider uppercase font-bold bg-accentBlue/10 text-accentBlue px-2 py-0.5 rounded-full border border-accentBlue/20">
                          {(job as any).status}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 font-mono bg-bgNearBlack px-3 py-1.5 rounded-lg border border-gray-800 shrink-0">
                    {job.dates}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-6">
                  {job.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-3 mb-8">
                  {job.bullets.map((bullet, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-gray-300">
                      <span className="text-accentBlue mt-0.5 shrink-0 select-none">→</span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-800/50">
                  {job.tech.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] tracking-wide text-gray-400 bg-bgNearBlack border border-gray-800 px-2.5 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
