'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Code2,
  Layers,
  Sparkles,
  Zap,
} from 'lucide-react';
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
    description: 'Syntax-highlighted snippets with line-by-line annotations',
  },
  {
    icon: BookOpen,
    title: 'Interactive Notes',
    description: 'Study materials organized by topic with deep-dive sections',
  },
  {
    icon: Layers,
    title: 'Structured Learning',
    description: 'Progressive curriculum from fundamentals to advanced topics',
  },
  {
    icon: Zap,
    title: 'Interview Ready',
    description: 'Curated content focused on what interviewers actually ask',
  },
];

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export default function HomeComponent() {
  const router = useRouter();

  return (
    <div className='flex min-h-screen flex-col'>
      {/* Hero Section */}
      <section className='relative flex min-h-[85vh] flex-col items-center justify-center px-4 py-20'>
        {/* Decorative grid */}
        <div
          className='pointer-events-none absolute inset-0 opacity-[0.03]'
          style={{
            backgroundImage:
              'linear-gradient(rgba(99, 102, 241, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <motion.div
          animate='show'
          className='relative z-10 max-w-4xl text-center'
          initial='hidden'
          variants={stagger}
        >
          {/* Badge */}
          <motion.div className='mb-8 inline-flex' variants={fadeUp}>
            <span className='inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--glass-bg)] px-4 py-2 text-sm backdrop-blur-sm'>
              <Sparkles className='h-4 w-4 text-[var(--accent)]' />
              <span className='text-[var(--muted-foreground)]'>
                Interview Preparation Platform
              </span>
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className='mb-6 font-bold text-5xl tracking-tight md:text-7xl lg:text-8xl'
            variants={fadeUp}
          >
            <span className='text-[var(--foreground)]'>Master your</span>
            <br />
            <span className='gradient-text'>next interview</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className='mx-auto mb-10 max-w-2xl text-[var(--muted)] text-lg md:text-xl'
            variants={fadeUp}
          >
            A structured study resource with code examples, interactive notes,
            and curated interview prep materials for multiple positions and
            experience levels.
          </motion.p>

          {/* CTA */}
          <motion.div className='flex justify-center gap-4' variants={fadeUp}>
            <button
              className='group inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]'
              onClick={() => router.push('/frontend/junior')}
              type='button'
            >
              Get Started
              <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          className='-translate-x-1/2 absolute bottom-8 left-1/2'
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        >
          <div className='h-10 w-6 rounded-full border-2 border-[var(--border)]'>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              className='mx-auto mt-2 h-2 w-1 rounded-full bg-[var(--accent)]'
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* Topics Section */}
      <section className='relative px-4 py-20'>
        <motion.div
          className='mx-auto max-w-6xl'
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className='mb-12 text-center'>
            <h2 className='mb-4 font-bold text-3xl tracking-tight md:text-4xl'>
              <span className='text-[var(--foreground)]'>Choose your </span>
              <span className='gradient-text-cool'>learning path</span>
            </h2>
            <p className='mx-auto max-w-lg text-[var(--muted)]'>
              Start with structured preparation tracks designed for specific
              roles and experience levels.
            </p>
          </div>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {sections.map((section) => (
              <motion.button
                className='card-glow group relative flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-8 text-left backdrop-blur-sm transition-all duration-300 hover:border-[var(--border-hover)] hover:bg-[var(--glass-bg)] md:col-span-2 lg:col-span-3'
                key={`${section.title}-${section.level}`}
                onClick={() => !section.inProgress && router.push(section.href)}
                type='button'
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
                  <div className='flex-grow'>
                    <div className='mb-3 flex items-center gap-3'>
                      <div
                        className='flex h-10 w-10 items-center justify-center rounded-lg'
                        style={{ backgroundColor: 'var(--accent-glow)' }}
                      >
                        <Code2 className='h-5 w-5 text-[var(--accent-light)]' />
                      </div>
                      <div>
                        <h3 className='font-bold text-[var(--foreground)] text-xl'>
                          {section.title}
                        </h3>
                        {section.level && (
                          <span className='font-medium text-[var(--accent-light)] text-sm'>
                            {section.level}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className='max-w-xl text-[var(--muted)]'>
                      {section.description}
                    </p>
                  </div>
                  <div className='flex items-center gap-2 font-medium text-[var(--accent-light)] text-sm transition-all group-hover:gap-3'>
                    {section.inProgress ? (
                      <span className='text-[var(--muted)]'>Coming soon</span>
                    ) : (
                      <>
                        Start learning
                        <ArrowRight className='h-4 w-4' />
                      </>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className='relative px-4 py-20'>
        <motion.div
          className='mx-auto max-w-6xl'
          initial='hidden'
          variants={stagger}
          viewport={{ once: true }}
          whileInView='show'
        >
          <div className='mb-12 text-center'>
            <h2 className='mb-4 font-bold text-3xl tracking-tight md:text-4xl'>
              <span className='text-[var(--foreground)]'>Built for </span>
              <span className='gradient-text'>real preparation</span>
            </h2>
          </div>

          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {features.map((feature) => (
              <motion.div
                className='group rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 backdrop-blur-sm transition-all duration-300 hover:border-[var(--border-hover)]'
                key={feature.title}
                variants={fadeUp}
              >
                <div
                  className='mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-colors'
                  style={{ backgroundColor: 'var(--accent-glow)' }}
                >
                  <feature.icon className='h-6 w-6 text-[var(--accent-light)]' />
                </div>
                <h3 className='mb-2 font-semibold text-[var(--foreground)]'>
                  {feature.title}
                </h3>
                <p className='text-[var(--muted)] text-sm leading-relaxed'>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className='border-[var(--border)] border-t px-4 py-8'>
        <div className='mx-auto max-w-6xl text-center text-[var(--muted)] text-sm'>
          <p>Prep — Interview preparation, simplified.</p>
        </div>
      </footer>
    </div>
  );
}
