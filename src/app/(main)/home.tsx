'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Code2, Layers } from 'lucide-react';
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
    description: 'Real-world code snippets with syntax highlighting',
  },
  {
    icon: BookOpen,
    title: 'Interactive Notes',
    description: 'Structured study notes organized by topic',
  },
  {
    icon: Layers,
    title: 'Progressive Learning',
    description: 'Topics build on each other from basics to advanced',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function HomeComponent() {
  const router = useRouter();

  return (
    <div className='flex min-h-screen flex-col'>
      {/* Hero */}
      <motion.section
        animate={{ opacity: 1 }}
        className='flex flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:py-32'
        initial={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className='mb-4 inline-block rounded-full border border-[var(--border-accent)] bg-[var(--accent-glow)] px-4 py-1.5 font-mono text-[var(--accent)] text-xs uppercase tracking-widest'>
            Interview Prep Platform
          </span>
        </motion.div>

        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className='mb-6 max-w-3xl font-bold text-4xl leading-tight sm:text-5xl md:text-7xl'
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
        >
          <span className='text-gradient'>Prepare</span>
          <br />
          <span className='text-[var(--foreground)]'>for any interview</span>
        </motion.h1>

        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className='mb-10 max-w-xl text-[var(--foreground-muted)] text-lg leading-relaxed'
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          Structured study notes, code examples, and hands-on practice for
          frontend developer interviews.
        </motion.p>

        {/* Topic Cards */}
        <motion.div
          animate='show'
          className='grid w-full max-w-3xl gap-4 px-4 sm:grid-cols-1'
          initial='hidden'
          variants={container}
        >
          {sections.map((section) => (
            <motion.button
              className='surface-card-hover group flex items-center gap-6 p-6 text-left sm:p-8'
              disabled={section.inProgress}
              key={`${section.title}-${section.level}`}
              onClick={() => router.push(section.href)}
              type='button'
              variants={item}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className='flex-1'>
                <div className='mb-1 flex items-center gap-3'>
                  <h2 className='font-bold text-[var(--foreground)] text-xl sm:text-2xl'>
                    {section.title}
                  </h2>
                  {section.level && (
                    <span className='rounded-full bg-[var(--accent-glow)] px-2.5 py-0.5 font-mono text-[var(--accent)] text-xs'>
                      {section.level}
                    </span>
                  )}
                </div>
                <p className='text-[var(--foreground-muted)] text-sm leading-relaxed sm:text-base'>
                  {section.description}
                </p>
              </div>
              <ArrowRight
                className='shrink-0 text-[var(--foreground-muted)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--accent)]'
                size={24}
              />
            </motion.button>
          ))}
        </motion.div>
      </motion.section>

      {/* Features */}
      <motion.section
        className='border-[var(--border)] border-t py-16 sm:py-24'
        initial={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
        whileInView={{ opacity: 1 }}
      >
        <div className='mx-auto grid max-w-4xl gap-8 px-4 sm:grid-cols-3'>
          {features.map((feature, i) => (
            <motion.div
              className='text-center'
              initial={{ opacity: 0, y: 20 }}
              key={feature.title}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--surface-2)]'>
                <feature.icon className='text-[var(--accent)]' size={24} />
              </div>
              <h3 className='mb-2 font-semibold text-[var(--foreground)]'>
                {feature.title}
              </h3>
              <p className='text-[var(--foreground-muted)] text-sm'>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
