'use client';

import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  FileCode,
  Globe,
  Layers,
  Wrench,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Section } from '@/types';

const topicIcons = [FileCode, Code2, Globe, Layers, Wrench];

const sections: Section[] = [
  {
    href: '/frontend/junior/html&css',
    title: 'HTML & CSS',
    description:
      'Semantic HTML, accessibility basics, Flexbox, Grid, responsive design',
    inProgress: false,
  },
  {
    href: '#',
    title: 'JavaScript Fundamentals',
    description: 'ES6+ syntax, scope, closures, async patterns, DOM APIs',
    inProgress: true,
  },
  {
    href: '#',
    title: 'API Integration',
    description: 'fetch/axios, REST, GraphQL, error handling, loading states',
    inProgress: true,
  },
  {
    href: '#',
    title: 'Framework Basics (React)',
    description: 'Components, props, state, hooks, Context API, lifecycle',
    inProgress: true,
  },
  {
    href: '#',
    title: 'Tooling & Debugging',
    description: 'Chrome DevTools, ESLint/Prettier, npm scripts, build tools',
    inProgress: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function FrontendJunior() {
  const router = useRouter();

  return (
    <div className='flex min-h-screen flex-col items-center px-4 py-12 sm:px-6 md:py-20'>
      {/* Back nav */}
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        className='mb-8 w-full max-w-4xl'
        initial={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.3 }}
      >
        <button
          className='group inline-flex items-center gap-1.5 text-[var(--muted)] text-sm transition-colors hover:text-[var(--accent)]'
          onClick={() => router.push('/')}
          type='button'
        >
          <ArrowLeft className='group-hover:-translate-x-0.5 h-3.5 w-3.5 transition-transform' />
          Back to topics
        </button>
      </motion.div>

      {/* Header */}
      <motion.div
        animate='visible'
        className='mb-12 w-full max-w-4xl md:mb-16'
        initial='hidden'
        variants={containerVariants}
      >
        <motion.div
          className='mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card-bg)] px-3 py-1 font-medium text-[var(--accent)] text-xs'
          variants={itemVariants}
        >
          Junior Level
        </motion.div>
        <motion.h1
          className='mb-3 font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl'
          variants={itemVariants}
        >
          Frontend Development
        </motion.h1>
        <motion.p
          className='max-w-lg text-[var(--muted)] text-sm leading-relaxed sm:text-base'
          variants={itemVariants}
        >
          Master the fundamentals of modern frontend development. Topics marked
          as in progress are coming soon.
        </motion.p>
      </motion.div>

      {/* Topic Grid */}
      <motion.div
        animate='visible'
        className='w-full max-w-4xl'
        initial='hidden'
        variants={containerVariants}
      >
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3'>
          {sections.map((section, index) => {
            const Icon = topicIcons[index] || Code2;
            const isDisabled = section.inProgress;

            return (
              <motion.button
                className={`glass-card group relative flex flex-col overflow-hidden rounded-xl p-5 text-left sm:p-6 ${
                  isDisabled ? 'cursor-not-allowed opacity-50' : ''
                }`}
                disabled={isDisabled}
                key={section.title}
                onClick={() => !isDisabled && router.push(section.href)}
                type='button'
                variants={itemVariants}
                whileHover={isDisabled ? {} : { scale: 1.02, y: -2 }}
                whileTap={isDisabled ? {} : { scale: 0.98 }}
              >
                {/* Top gradient bar */}
                {!isDisabled && (
                  <div
                    className='absolute top-0 right-0 left-0 h-px'
                    style={{ background: 'var(--accent-gradient)' }}
                  />
                )}

                <div className='mb-3 flex items-center gap-3'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)]/10'>
                    <Icon className='h-4 w-4 text-[var(--accent)]' />
                  </div>
                  <span className='font-mono text-[var(--muted)] text-xs'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h2 className='mb-2 font-semibold text-[var(--foreground)] text-base'>
                  {section.title}
                </h2>

                {section.inProgress && (
                  <span className='mb-2 inline-block w-fit rounded-full bg-amber-500/10 px-2 py-0.5 text-amber-400 text-xs'>
                    In Progress
                  </span>
                )}

                <p className='mb-4 flex-1 text-[var(--muted)] text-xs leading-relaxed'>
                  {section.description}
                </p>

                <div
                  className={`flex items-center gap-1 font-medium text-xs transition-all duration-300 ${
                    isDisabled
                      ? 'text-[var(--muted)]'
                      : 'text-[var(--accent)] group-hover:gap-2'
                  }`}
                >
                  {isDisabled ? (
                    'Coming soon'
                  ) : (
                    <>
                      Start learning
                      <ArrowRight className='h-3 w-3' />
                    </>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
