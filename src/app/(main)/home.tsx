'use client';
import { useRouter } from 'next/navigation';

export default function HomeComponent() {
  const router = useRouter();

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-8'>
      <div className='text-center max-w-6xl px-4'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold font-sans text-balance'>
          Asana Junior Frontend Developer Preparation
        </h1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl px-4'>
        <div
          onClick={() => router.push('/html&css')}
          className='bg-zinc-900 shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-zinc-800 cursor-pointer hover:border-zinc-600'
        >
          <h2 className='text-xl font-bold text-zinc-100 mb-3'>HTML & CSS</h2>
          <p className='text-sm text-zinc-400 mb-4 leading-relaxed'>
            Semantic HTML, accessibility basics, Flexbox, Grid, responsive
            design
          </p>
          <div className='flex items-center text-zinc-500 font-medium text-sm'>
            Learn more →
          </div>
        </div>
        <div className='bg-zinc-900 shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-zinc-800 cursor-pointer hover:border-zinc-600'>
          <h2 className='text-xl font-bold text-zinc-100 mb-3'>
            JavaScript Fundamentals
          </h2>
          <p className='text-sm text-zinc-400 mb-4 leading-relaxed'>
            ES6+ syntax, scope, closures, async patterns, DOM APIs
          </p>
          <div className='flex items-center text-zinc-500 font-medium text-sm'>
            Learn more →
          </div>
        </div>
        <div className='bg-zinc-900 shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-zinc-800 cursor-pointer hover:border-zinc-600'>
          <h2 className='text-xl font-bold text-zinc-100 mb-3'>
            API Integration
          </h2>
          <p className='text-sm text-zinc-400 mb-4 leading-relaxed'>
            fetch/axios, REST, GraphQL, error handling, loading states
          </p>
          <div className='flex items-center text-zinc-500 font-medium text-sm'>
            Learn more →
          </div>
        </div>
        <div className='bg-zinc-900 shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-zinc-800 cursor-pointer hover:border-zinc-600'>
          <h2 className='text-xl font-bold text-zinc-100 mb-3'>
            Framework Basics (React)
          </h2>
          <p className='text-sm text-zinc-400 mb-4 leading-relaxed'>
            Components, props, state, hooks, Context API, lifecycle
          </p>
          <div className='flex items-center text-zinc-500 font-medium text-sm'>
            Learn more →
          </div>
        </div>
        <div className='bg-zinc-900 shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-zinc-800 cursor-pointer hover:border-zinc-600'>
          <h2 className='text-xl font-bold text-zinc-100 mb-3'>
            Tooling & Debugging
          </h2>
          <p className='text-sm text-zinc-400 mb-4 leading-relaxed'>
            Chrome DevTools, ESLint/Prettier, npm scripts, build tools
          </p>
          <div className='flex items-center text-zinc-500 font-medium text-sm'>
            Learn more →
          </div>
        </div>
        <div className='bg-zinc-900 shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-zinc-800 cursor-pointer hover:border-zinc-600'>
          <h2 className='text-xl font-bold text-zinc-100 mb-3'>
            Algorithmic Practice
          </h2>
          <p className='text-sm text-zinc-400 mb-4 leading-relaxed'>
            Arrays/strings, time/space complexity, LeetCode problems
          </p>
          <div className='flex items-center text-zinc-500 font-medium text-sm'>
            Learn more →
          </div>
        </div>
      </div>
    </div>
  );
}
