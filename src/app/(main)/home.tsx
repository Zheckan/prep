'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Code2, Layers, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Section } from '@/types';

const sections: Section[] = [
  {
    href: '/frontend/junior',
    title: 'Frontend Development',
    level: 'Junior Level',
    description:
      'HTML & CSS, JavaScript fundamentals, React basics, API integration, and essential debugging tools',
    inProgress: false,
  },
];

const features = [
  {
    icon: Code2,
    title: 'Code Examples',
    description:
      'Syntax-highlighted, real-world code snippets you can learn from',
  },
  {
    icon: BookOpen,
    title: 'Interactive Notes',
    description: 'Structured study materials with clear explanations',
  },
  {
    icon: Layers,
    title: 'Topic Navigation',
    description: 'Organized by skill level with table of contents',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function HomeComponent() {
  const router = useRouter();

  return (
    <div className='flex min-h-screen flex-col items-center px-4 py-16 sm:px-6 md:py-24'>
      {/* Hero */}
      <motion.div
        animate='visible'
        className='mb-16 max-w-3xl text-center md:mb-24'
        initial='hidden'
        variants={containerVariants}
      >
        <motion.div
          className='mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card-bg)] px-4 py-1.5 text-[var(--muted)] text-sm'
          variants={itemVariants}
        >
          <Sparkles className='h-3.5 w-3.5 text-[var(--accent)]' />
          Interview Preparation Platform
        </motion.div>

        <motion.h1
          className='mb-6 font-bold text-4xl leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl'
          variants={itemVariants}
        >
          Ace your next <span className='text-gradient'>interview</span>
        </motion.h1>

        <motion.p
          className='mx-auto mb-10 max-w-xl text-[var(--muted)] text-base leading-relaxed sm:text-lg'
          variants={itemVariants}
        >
          Structured study materials, real code examples, and comprehensive
          topic coverage to help you prepare with confidence.
        </motion.p>

        <motion.div variants={itemVariants}>
          <button
            className='group inline-flex items-center gap-2.5 rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-[#0b0f1a] text-sm transition-all duration-300 hover:shadow-[0_0_24px_rgba(52,211,153,0.3)] hover:brightness-110 sm:px-8 sm:py-3.5 sm:text-base'
            onClick={() => router.push('/frontend/junior')}
            type='button'
          >
            Start Preparing
            <ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5' />
          </button>
        </motion.div>
      </motion.div>

      {/* Topic Cards */}
      <motion.div
        className='mb-20 w-full max-w-4xl md:mb-28'
        initial='hidden'
        variants={containerVariants}
        viewport={{ once: true, margin: '-50px' }}
        whileInView='visible'
      >
        <motion.h2
          className='mb-8 text-center font-semibold text-[var(--muted)] text-lg uppercase tracking-wide'
          variants={itemVariants}
        >
          Topics
        </motion.h2>
        <div className='grid grid-cols-1 gap-4 sm:gap-6'>
          {sections.map((section) => (
            <motion.button
              className='glass-card group relative flex flex-col overflow-hidden rounded-2xl p-6 text-left sm:flex-row sm:items-center sm:p-8'
              disabled={section.inProgress}
              key={`${section.title}-${section.level}`}
              onClick={() => router.push(section.href)}
              type='button'
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.995 }}
            >
              {/* Gradient accent line at top */}
              <div
                className='absolute top-0 right-0 left-0 h-px'
                style={{ background: 'var(--accent-gradient)' }}
              />

              <div className='flex-1'>
                <div className='mb-2 flex items-center gap-3'>
                  <h3 className='font-bold text-[var(--foreground)] text-lg sm:text-xl'>
                    {section.title}
                  </h3>
                  {section.level && (
                    <span className='rounded-full bg-[var(--accent)]/10 px-2.5 py-0.5 font-medium text-[var(--accent)] text-xs'>
                      {section.level}
                    </span>
                  )}
                  {section.inProgress && (
                    <span className='rounded-full bg-amber-500/10 px-2.5 py-0.5 text-amber-400 text-xs'>
                      In Progress
                    </span>
                  )}
                </div>
                <p className='text-[var(--muted)] text-sm leading-relaxed'>
                  {section.description}
                </p>
              </div>

              <div className='mt-4 flex items-center gap-1 font-medium text-[var(--accent)] text-sm transition-all duration-300 group-hover:gap-2 sm:mt-0 sm:ml-6'>
                {section.inProgress ? (
                  'Coming soon'
                ) : (
                  <>
                    Explore
                    <ArrowRight className='h-4 w-4' />
                  </>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        className='w-full max-w-4xl'
        initial='hidden'
        variants={containerVariants}
        viewport={{ once: true, margin: '-50px' }}
        whileInView='visible'
      >
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6'>
          {features.map((feature) => (
            <motion.div
              className='glass-card rounded-2xl p-6'
              key={feature.title}
              variants={itemVariants}
            >
              <feature.icon className='mb-3 h-5 w-5 text-[var(--accent)]' />
              <h3 className='mb-1.5 font-semibold text-[var(--foreground)] text-sm'>
                {feature.title}
              </h3>
              <p className='text-[var(--muted)] text-xs leading-relaxed'>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
