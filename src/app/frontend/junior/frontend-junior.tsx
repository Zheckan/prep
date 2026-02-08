'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Section } from '@/types';

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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

export default function FrontendJunior() {
  const router = useRouter();

  const completedCount = sections.filter((s) => !s.inProgress).length;

  return (
    <div className='min-h-screen px-4 py-12 sm:py-20'>
      <div className='mx-auto max-w-4xl'>
        {/* Back nav */}
        <motion.button
          animate={{ opacity: 1, x: 0 }}
          className='mb-8 flex items-center gap-2 text-[var(--foreground-muted)] text-sm transition-colors hover:text-[var(--accent)]'
          initial={{ opacity: 0, x: -10 }}
          onClick={() => router.push('/')}
          transition={{ duration: 0.3 }}
          type='button'
        >
          <ArrowLeft size={16} />
          Back to home
        </motion.button>

        {/* Header */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className='mb-10'
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className='mb-3 font-bold text-3xl sm:text-4xl md:text-5xl'>
            <span className='text-gradient'>Junior Frontend</span>
            <br />
            <span className='text-[var(--foreground)]'>Developer Prep</span>
          </h1>
          <div className='flex items-center gap-4'>
            <p className='text-[var(--foreground-muted)]'>
              {completedCount} of {sections.length} topics available
            </p>
            <div className='h-1.5 w-24 overflow-hidden rounded-full bg-[var(--surface-2)]'>
              <div
                className='h-full rounded-full bg-[var(--accent)]'
                style={{
                  width: `${(completedCount / sections.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Topic grid */}
        <motion.div
          animate='show'
          className='grid gap-3 sm:grid-cols-2'
          initial='hidden'
          variants={container}
        >
          {sections.map((section, index) => (
            <motion.button
              className={`surface-card-hover group relative flex flex-col p-5 text-left sm:p-6 ${
                section.inProgress ? 'cursor-default opacity-60' : ''
              }`}
              disabled={section.inProgress}
              key={section.title}
              onClick={() => !section.inProgress && router.push(section.href)}
              type='button'
              variants={cardVariant}
              whileHover={section.inProgress ? {} : { scale: 1.01 }}
              whileTap={section.inProgress ? {} : { scale: 0.99 }}
            >
              {/* Status badge */}
              <div className='mb-3 flex items-center justify-between'>
                <span className='font-mono text-[var(--foreground-muted)] text-xs'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                {section.inProgress ? (
                  <span className='flex items-center gap-1 text-[var(--foreground-muted)] text-xs'>
                    <Clock size={12} />
                    Coming soon
                  </span>
                ) : (
                  <span className='flex items-center gap-1 text-[var(--success)] text-xs'>
                    <CheckCircle2 size={12} />
                    Available
                  </span>
                )}
              </div>

              <h2 className='mb-2 font-bold text-[var(--foreground)] text-lg'>
                {section.title}
              </h2>
              <p className='mb-4 flex-1 text-[var(--foreground-muted)] text-sm leading-relaxed'>
                {section.description}
              </p>

              {!section.inProgress && (
                <div className='flex items-center gap-1 font-medium text-[var(--accent)] text-sm'>
                  Start learning
                  <ArrowRight
                    className='transition-transform group-hover:translate-x-1'
                    size={14}
                  />
                </div>
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
