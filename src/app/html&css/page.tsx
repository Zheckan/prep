import { PageHeader, SectionCard, CodeBlock, NotesArea } from '@/components';

export default function HTMLCSS() {
  return (
    <div className='min-h-screen bg-black text-white'>
      <PageHeader
        title='HTML & CSS Notes'
        description='Semantic HTML, accessibility basics, Flexbox, Grid, responsive design'
      />

      <div className='max-w-4xl mx-auto px-6 py-8'>
        <div className='prose prose-invert prose-zinc max-w-none'>
          <SectionCard title='Semantic HTML'>
            <p>Write your notes about semantic HTML here. You can include:</p>
            <ul className='list-disc list-inside space-y-2 text-gray-50'>
              <li>
                HTML5 semantic elements (header, nav, main, section, article,
                aside, footer)
              </li>
              <li>Proper heading hierarchy (h1-h6)</li>
              <li>When to use different elements</li>
              <li>Best practices for structure</li>
            </ul>
          </SectionCard>

          <SectionCard title='Accessibility Basics'>
            <p>Add your accessibility notes here:</p>
            <ul className='list-disc list-inside space-y-2 text-gray-50'>
              <li>ARIA attributes and roles</li>
              <li>Alt text for images</li>
              <li>Keyboard navigation</li>
              <li>Color contrast requirements</li>
              <li>Screen reader considerations</li>
            </ul>
          </SectionCard>

          <SectionCard title='Flexbox'>
            <p>Your Flexbox notes and examples:</p>
            <CodeBlock comment='Example CSS'>
              <div className='text-blue-400'>.container</div>
              <div className='text-white'>{' {'}</div>
              <div className='ml-4 text-white'>
                <span className='text-yellow-400'>display</span>:{' '}
                <span className='text-green-400'>flex</span>;
              </div>
              <div className='ml-4 text-white'>
                <span className='text-yellow-400'>justify-content</span>:{' '}
                <span className='text-green-400'>center</span>;
              </div>
              <div className='ml-4 text-white'>
                <span className='text-yellow-400'>align-items</span>:{' '}
                <span className='text-green-400'>center</span>;
              </div>
              <div className='text-white'>{'}'}</div>
            </CodeBlock>
          </SectionCard>

          <SectionCard title='CSS Grid'>
            <p>CSS Grid layout notes:</p>
            <CodeBlock comment='Grid Example'>
              <div className='text-blue-400'>.grid-container</div>
              <div className='text-white'>{' {'}</div>
              <div className='ml-4 text-white'>
                <span className='text-yellow-400'>display</span>:{' '}
                <span className='text-green-400'>grid</span>;
              </div>
              <div className='ml-4 text-white'>
                <span className='text-yellow-400'>grid-template-columns</span>:{' '}
                <span className='text-green-400'>repeat(3, 1fr)</span>;
              </div>
              <div className='ml-4 text-white'>
                <span className='text-yellow-400'>gap</span>:{' '}
                <span className='text-green-400'>1rem</span>;
              </div>
              <div className='text-white'>{'}'}</div>
            </CodeBlock>
          </SectionCard>

          <SectionCard title='Responsive Design'>
            <p>Responsive design principles and techniques:</p>
            <ul className='list-disc list-inside space-y-2 text-gray-50'>
              <li>Mobile-first approach</li>
              <li>Media queries and breakpoints</li>
              <li>Flexible units (rem, em, %, vw, vh)</li>
              <li>Responsive images</li>
              <li>Container queries</li>
            </ul>
          </SectionCard>

          <SectionCard title='Additional Notes'>
            <p>
              Space for your additional notes, code snippets, and examples...
            </p>
            <NotesArea placeholder='Add your custom notes here...' />
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
