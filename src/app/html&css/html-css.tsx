import {
  PageHeader,
  SectionCard,
  CodeBlock,
  Header,
  Subheader,
  CodeSpan,
  Callout,
  Text,
} from '@/components';

export default function HTMLCSSComponent() {
  return (
    <div className='min-h-screen bg-black text-white'>
      <PageHeader
        title='HTML & CSS Notes'
        description='Semantic HTML, accessibility basics, Flexbox, Grid, responsive design'
      />

      {/* Spacer to account for fixed header */}
      <div className='h-[140px]' />

      <div className='max-w-4xl mx-auto px-6 py-8'>
        <div className='prose prose-invert prose-zinc max-w-none'>
          <SectionCard title='Semantic HTML & Accessibility'>
            <div className='space-y-6'>
              <div>
                <Header>What is Semantic HTML?</Header>
                <Text>
                  Semantic HTML uses HTML elements to explain the meaning of the
                  content structure, not just for visual appearance. It tells
                  browsers, search engines, and assistive technologies what each
                  part of your content represents.
                </Text>
                <Text>
                  <strong>Important note:</strong> While you could technically
                  build everything using <CodeSpan>&lt;div&gt;</CodeSpan>{' '}
                  elements and CSS styling, semantic elements are essential for
                  accessibility. Screen readers, keyboard navigation, and
                  browser accessibility features rely on semantic meaning to
                  properly interpret and navigate your content.
                </Text>
                <Callout>
                  <strong>Why we need it:</strong> Better SEO (search engine
                  optimization), accessibility for screen readers, easier
                  maintenance, and future-proof code structure.
                </Callout>
              </div>

              <div>
                <Subheader>Key Semantic Elements:</Subheader>
                <ul className='list-disc list-inside space-y-2 text-gray-50'>
                  <li>
                    <CodeSpan>&lt;header&gt;</CodeSpan> - Site/page header with
                    navigation
                  </li>
                  <li>
                    <CodeSpan>&lt;nav&gt;</CodeSpan> - Navigation links
                  </li>
                  <li>
                    <CodeSpan>&lt;main&gt;</CodeSpan> - Primary content (only
                    one per page)
                  </li>
                  <li>
                    <CodeSpan>&lt;section&gt;</CodeSpan> - Thematic grouping of
                    content
                  </li>
                  <li>
                    <CodeSpan>&lt;article&gt;</CodeSpan> - Self-contained
                    content (blog posts, news articles)
                  </li>
                  <li>
                    <CodeSpan>&lt;aside&gt;</CodeSpan> - Sidebar content,
                    related information
                  </li>
                  <li>
                    <CodeSpan>&lt;footer&gt;</CodeSpan> - Footer with contact
                    info, copyright
                  </li>
                </ul>
              </div>

              <div>
                <Header>Accessibility Basics</Header>

                <div className='mb-4'>
                  <Subheader>
                    ARIA (Accessible Rich Internet Applications)
                  </Subheader>
                  <Text variant='muted'>
                    ARIA attributes provide additional semantic information when
                    HTML alone isn&apos;t enough.
                  </Text>
                  <ul className='list-disc list-inside space-y-1 text-gray-50 ml-4'>
                    <li>
                      <CodeSpan>aria-label</CodeSpan> - Accessible name for
                      elements
                    </li>
                    <li>
                      <CodeSpan>aria-describedby</CodeSpan> - Links to
                      descriptive text
                    </li>
                    <li>
                      <CodeSpan>aria-expanded</CodeSpan> - Shows if collapsible
                      content is open
                    </li>
                    <li>
                      <CodeSpan>role</CodeSpan> - Defines what an element
                      is/does
                    </li>
                  </ul>
                </div>

                <div className='mb-4'>
                  <Subheader>Tab Order & Keyboard Navigation</Subheader>
                  <Text variant='muted'>
                    Ensures users can navigate your site using only a keyboard.
                  </Text>
                  <ul className='list-disc list-inside space-y-1 text-gray-50 ml-4'>
                    <li>
                      Use <CodeSpan>tabindex=&quot;0&quot;</CodeSpan> to make
                      elements focusable
                    </li>
                    <li>
                      Use <CodeSpan>tabindex=&quot;-1&quot;</CodeSpan> to remove
                      from tab order
                    </li>
                    <li>Logical tab order follows content flow</li>
                    <li>
                      Visible focus indicators for all interactive elements
                    </li>
                  </ul>
                </div>

                <div>
                  <Subheader>Alt Text for Images</Subheader>
                  <Text variant='muted'>
                    Describes images for users who can&apos;t see them.
                  </Text>
                  <ul className='list-disc list-inside space-y-1 text-gray-50 ml-4'>
                    <li>
                      Descriptive:{' '}
                      <CodeSpan size='small'>
                        &lt;img src=&quot;chart.png&quot; alt=&quot;Sales
                        increased 40% from Q1 to Q2&quot;&gt;
                      </CodeSpan>
                    </li>
                    <li>
                      Decorative:{' '}
                      <CodeSpan size='small'>
                        &lt;img src=&quot;border.png&quot; alt=&quot;&quot;&gt;
                      </CodeSpan>{' '}
                      (empty alt)
                    </li>
                    <li>
                      Complex: Use <CodeSpan>aria-describedby</CodeSpan> to link
                      to longer descriptions
                    </li>
                  </ul>
                </div>
              </div>
            </div>
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
              <div className='font-bold text-shadow'>.container</div>
              <div className='text-white'>{' {'}</div>
              <div className='ml-4 text-white'>
                <span className='font-semibold italic'>display</span>:{' '}
                <span className='underline decoration-dotted'>flex</span>;
              </div>
              <div className='ml-4 text-white'>
                <span className='font-semibold italic'>justify-content</span>:{' '}
                <span className='underline decoration-dotted'>center</span>;
              </div>
              <div className='ml-4 text-white'>
                <span className='font-semibold italic'>align-items</span>:{' '}
                <span className='underline decoration-dotted'>center</span>;
              </div>
              <div className='text-white'>{'}'}</div>
            </CodeBlock>
          </SectionCard>

          <SectionCard title='CSS Grid'>
            <p>CSS Grid layout notes:</p>
            <CodeBlock comment='Grid Example'>
              <div className='font-bold text-shadow'>.grid-container</div>
              <div className='text-white'>{' {'}</div>
              <div className='ml-4 text-white'>
                <span className='font-semibold italic'>display</span>:{' '}
                <span className='underline decoration-dotted'>grid</span>;
              </div>
              <div className='ml-4 text-white'>
                <span className='font-semibold italic'>
                  grid-template-columns
                </span>
                :{' '}
                <span className='underline decoration-dotted'>
                  repeat(3, 1fr)
                </span>
                ;
              </div>
              <div className='ml-4 text-white'>
                <span className='font-semibold italic'>gap</span>:{' '}
                <span className='underline decoration-dotted'>1rem</span>;
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
        </div>
      </div>
    </div>
  );
}
