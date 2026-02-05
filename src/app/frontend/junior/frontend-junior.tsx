'use client';

import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Code2,
  Globe,
  Paintbrush,
  Terminal,
  Wrench,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Section } from '@/types';

interface TopicSection extends Section {
  icon: typeof Code2;
  color: string;
  gradient: string;
}

const sections: TopicSection[] = [
  {
    href: '/frontend/junior/html&css',
    title: 'HTML & CSS',
    description:
      'Semantic HTML, accessibility basics, Flexbox, Grid, responsive design',
    inProgress: false,
    icon: Paintbrush,
    color: 'var(--aurora-3)',
    gradient: 'from-pink-500/10 to-rose-500/10',
  },
  {
    href: '#',
    title: 'JavaScript Fundamentals',
    description: 'ES6+ syntax, scope, closures, async patterns, DOM APIs',
    inProgress: true,
    icon: Code2,
    color: 'var(--aurora-1)',
    gradient: 'from-indigo-500/10 to-violet-500/10',
  },
  {
    href: '#',
    title: 'API Integration',
    description: 'fetch/axios, REST, GraphQL, error handling, loading states',
    inProgress: true,
    icon: Globe,
    color: 'var(--aurora-4)',
    gradient: 'from-cyan-500/10 to-teal-500/10',
  },
  {
    href: '#',
    title: 'Framework Basics (React)',
    description: 'Components, props, state, hooks, Context API, lifecycle',
    inProgress: true,
    icon: Terminal,
    color: 'var(--aurora-2)',
    gradient: 'from-violet-500/10 to-purple-500/10',
  },
  {
    href: '#',
    title: 'Tooling & Debugging',
    description: 'Chrome DevTools, ESLint/Prettier, npm scripts, build tools',
    inProgress: true,
    icon: Wrench,
    color: 'var(--aurora-5)',
    gradient: 'from-emerald-500/10 to-green-500/10',
  },
];

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function FrontendJunior() {
  const router = useRouter();

  const completedCount = sections.filter((s) => !s.inProgress).length;
  const totalCount = sections.length;

  return (
    <div className='flex min-h-screen flex-col'>
      {/* Header */}
      <header className='border-[var(--border)] border-b px-4 py-4'>
        <div className='mx-auto flex max-w-6xl items-center gap-4'>
          <button
            className='flex items-center gap-2 rounded-lg px-3 py-2 text-[var(--muted)] text-sm transition-colors hover:bg-[var(--glass-bg)] hover:text-[var(--foreground)]'
            onClick={() => router.push('/')}
            type='button'
          >
            <ArrowLeft className='h-4 w-4' />
            Home
          </button>
        </div>
      </header>

      {/* Content */}
      <main className='flex-grow px-4 py-16'>
        <motion.div
          animate='show'
          className='mx-auto max-w-4xl'
          initial='hidden'
          variants={stagger}
        >
          {/* Page Title */}
          <motion.div className='mb-12' variants={fadeUp}>
            <h1 className='mb-3 font-bold text-4xl tracking-tight md:text-5xl'>
              <span className='gradient-text'>Junior Frontend</span>
              <br />
              <span className='text-[var(--foreground)]'>Developer Prep</span>
            </h1>
            <p className='max-w-lg text-[var(--muted)]'>
              Master the fundamentals of frontend development. Complete each
              topic to build a strong foundation for your interviews.
            </p>

            {/* Progress bar */}
            <div className='mt-6 flex items-center gap-4'>
              <div className='h-2 flex-grow overflow-hidden rounded-full bg-[var(--surface-2)]'>
                <motion.div
                  animate={{ width: `${(completedCount / totalCount) * 100}%` }}
                  className='h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)]'
                  initial={{ width: 0 }}
                  transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                />
              </div>
              <span className='whitespace-nowrap text-[var(--muted)] text-sm'>
                {completedCount}/{totalCount} topics
              </span>
            </div>
          </motion.div>

          {/* Topic Cards */}
          <div className='flex flex-col gap-4'>
            {sections.map((section, index) => (
              <motion.button
                className={`card-glow group relative flex items-center gap-5 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 text-left backdrop-blur-sm transition-all duration-300 hover:border-[var(--border-hover)] ${
                  section.inProgress
                    ? 'cursor-default opacity-60'
                    : 'hover:bg-[var(--glass-bg)]'
                }`}
                disabled={section.inProgress}
                key={section.title}
                onClick={() => !section.inProgress && router.push(section.href)}
                type='button'
                variants={fadeUp}
                whileHover={section.inProgress ? {} : { x: 4 }}
              >
                {/* Number */}
                <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border)] font-mono text-[var(--muted)] text-xs'>
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${section.gradient}`}
                >
                  <section.icon
                    className='h-6 w-6'
                    style={{ color: section.color }}
                  />
                </div>

                {/* Content */}
                <div className='min-w-0 flex-grow'>
                  <h3 className='mb-1 font-semibold text-[var(--foreground)]'>
                    {section.title}
                  </h3>
                  <p className='text-[var(--muted)] text-sm leading-relaxed'>
                    {section.description}
                  </p>
                </div>

                {/* Status */}
                <div className='shrink-0'>
                  {section.inProgress ? (
                    <div className='flex items-center gap-2 text-[var(--muted)] text-sm'>
                      <Clock className='h-4 w-4' />
                      <span className='hidden sm:inline'>Coming soon</span>
                    </div>
                  ) : (
                    <div className='flex items-center gap-2 text-[var(--tertiary)] text-sm'>
                      <CheckCircle2 className='h-4 w-4' />
                      <ArrowRight className='h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100' />
                    </div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
