import React from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  React.useEffect(() => {
    if (!isInView) return;

    const duration = 1200; // 1.2s animation duration
    const startTime = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      // easeOutQuad transition curve
      const ease = progress * (2 - progress);
      const current = Math.floor(ease * target);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-serif-accent italic text-accentBlue text-5xl md:text-6xl font-bold tracking-tight">
      {count}
      {suffix}
    </span>
  );
}

interface StatItem {
  id: number;
  label: string;
  isInfinity?: boolean;
  target?: number;
  suffix?: string;
}

export default function Stats() {
  const shouldReduceMotion = useReducedMotion();
  const statsData: StatItem[] = [
    { id: 1, label: 'Live Projects Shipped', target: 4, suffix: '+' },
    { id: 2, label: 'Technologies Used', target: 30 },
    { id: 3, label: 'Certifications Earned', target: 2 },
    { id: 4, label: 'NSS Volunteer Hours', target: 100, suffix: '+' },
    { id: 5, label: 'GitHub Repositories', target: 10, suffix: '+' },
    { id: 6, label: 'Curiosity & Drive', isInfinity: true },
  ];

  const gridVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
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
      {/* Grid of Stats Cards */}
      <motion.div
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {statsData.map((stat) => (
          <motion.div
            key={stat.id}
            variants={cardVariants}
            className="p-8 rounded-2xl border border-accentBlue/10 bg-bgNearBlack/30 hover:border-accentBlue/25 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center text-center gap-3 min-h-[160px]"
          >
            {stat.isInfinity ? (
              <span className="font-serif-accent italic text-accentBlue text-5xl md:text-6xl font-bold tracking-tight select-none">
                &infin;
              </span>
            ) : (
              <CountUp target={stat.target || 0} suffix={stat.suffix} />
            )}
            
            <span className="text-[10px] tracking-[0.25em] text-gray-500 font-bold uppercase mt-1">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
