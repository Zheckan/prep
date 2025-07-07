'use client';

import dedent from 'dedent';
import { useRouter } from 'next/navigation';
import {
  Callout,
  CodeBlock,
  CodeSpan,
  Header,
  PageHeader,
  SectionCard,
  Subheader,
  Text,
} from '@/components';

export default function HTMLCSSComponent() {
  const router = useRouter();
  return (
    <div className='min-h-screen bg-black text-white'>
      <PageHeader
        description='Semantic HTML, accessibility basics, Flexbox, Grid, responsive design'
        title='HTML & CSS Notes'
      />

      {/* Spacer to account for fixed header */}
      <div className='h-[140px]' />

      <div className='mx-auto max-w-4xl px-6 py-8'>
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
                <ul className='list-inside list-disc space-y-2 text-gray-50'>
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

              {(() => {
                const semanticHtmlCode = dedent /* HTML */`<!DOCTYPE html>
                  <html lang="en">
                    <body>
                      <header>
                        <nav>
                          <ul>
                            <li><a href="/home">Home</a></li>
                            <li><a href="/about">About</a></li>
                          </ul>
                        </nav>
                      </header>
                      <main>
                        <section>
                          <h1>Welcome</h1>
                          <article>
                            <h2>Blog Post Title</h2>
                            <p>Content here...</p>
                          </article>
                        </section>
                        <aside>
                          <h3>Related Links</h3>
                        </aside>
                      </main>
                      <footer>
                        <p>&copy; 2024 Company Name</p>
                      </footer>
                    </body>
                  </html>`;

                return (
                  <CodeBlock
                    code={semanticHtmlCode}
                    comment='Semantic HTML Page Structure'
                    highlightLines='4,5,10,13,15,20,24'
                    highlightLinesEnd='10,11,18,19,22,23,26'
                    language='html'
                    showLineNumbers={true}
                  />
                );
              })()}

              <div>
                <Header>Accessibility Basics</Header>

                <div className='mb-4'>
                  <Subheader>
                    ARIA (Accessible Rich Internet Applications)
                  </Subheader>
                  <Text variant='muted'>
                    ARIA attributes provide additional semantic information when
                    HTML alone isn&apos;t enough. Think of them as
                    &quot;instructions for screen readers&quot; - they tell
                    assistive technology how to interpret and interact with
                    elements that HTML semantics alone can&apos;t fully
                    describe. For example, a button with an icon and no text
                    would be difficult to understand for a screen reader.
                  </Text>
                  <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
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

                {(() => {
                  const ariaExamplesCode = dedent /* HTML */`<!-- Button with accessible label -->
                    <!-- Does not rely on a text of the button, but have a helpful label that explains what the button does -->
                    <button aria-label="Close dialog">×</button>

                    <!-- Expandable content -->
                    <button aria-expanded="false" aria-controls="menu">
                      Menu
                    </button>
                    <ul id="menu" hidden>
                      <li>Item 1</li>
                    </ul>

                    <!-- Custom element with role -->
                    <div role="alert">Error: Please fill required fields</div>`;

                  return (
                    <CodeBlock
                      code={ariaExamplesCode}
                      comment='ARIA Examples'
                      language='html'
                      showLineNumbers={true}
                    />
                  );
                })()}

                <div className='mb-4'>
                  <Subheader>Tab Order & Keyboard Navigation</Subheader>
                  <Text variant='muted'>
                    Ensures users can navigate your site using only a keyboard.
                  </Text>
                  <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
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
                    {/* <li className='text-amber-400'>
                      <strong>Avoid positive tabindex values</strong> (1, 2, 3...) -
                      they break natural reading order and create accessibility issues
                    </li> */}
                    <li>
                      Use CSS <CodeSpan>order</CodeSpan> property for visual
                      layout instead of manipulating tab order
                    </li>
                  </ul>
                  <Callout className='mt-4'>
                    <strong>Important:</strong>{' '}
                    <strong className='font-semibold text-red-400'>
                      Do not use custom tab sequences!
                    </strong>{' '}
                    The browser&apos;s natural tab order follows DOM structure,
                    which matches logical reading flow - this is better than
                    custom sequences. You can do this via custom CSS (ex.{' '}
                    <CodeSpan>order: n;</CodeSpan> or in HTML{' '}
                    <CodeSpan>tabindex=&quot;n&quot;</CodeSpan> where{' '}
                    <CodeSpan>n</CodeSpan> is a positive integer), but it&apos;s
                    not recommended.
                  </Callout>
                </div>

                {(() => {
                  const tabOrderCode = dedent /* HTML */`<!-- Custom focusable element -->
                    <div tabindex="0" role="button">Custom Button</div>

                    <!-- Skip to main content link -->
                    <a href="#main" class="skip-link"> Skip to main content </a>

                    <!-- Element removed from tab order -->
                    <div tabindex="-1" id="modal-content">
                      Modal content (programmatically focusable)
                    </div>

                    <!-- CSS for focus indicators -->
                    <style>
                      button:focus,
                      a:focus {
                        outline: 2px solid #007acc;
                        outline-offset: 2px;
                      }
                    </style>`;

                  return (
                    <CodeBlock
                      code={tabOrderCode}
                      comment='Tab Order Examples'
                      language='html'
                      showLineNumbers={true}
                    />
                  );
                })()}

                <div>
                  <Subheader>Alt Text for Images</Subheader>
                  <Text variant='muted'>
                    Describes images for users who can&apos;t see them.
                    Decorative images are purely visual enhancements (borders,
                    dividers, background patterns) that don&apos;t convey
                    meaningful content - use empty{' '}
                    <CodeSpan>alt=&quot;&quot;</CodeSpan> so screen readers skip
                    them.
                  </Text>
                  <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
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

                  {(() => {
                    const altTextCode = dedent /* HTML */`<!-- Descriptive alt text -->
                      <img
                        src="sales-chart.png"
                        alt="Sales increased 40% from Q1 to Q2 2024"
                      />

                      <!-- Decorative image (empty alt) -->
                      <img
                        src="decorative-border.png"
                        alt=""
                        role="presentation"
                      />

                      <!-- Complex image with description -->
                      <img
                        src="complex-diagram.png"
                        alt="Network architecture diagram"
                        aria-describedby="diagram-desc"
                      />
                      <div id="diagram-desc">
                        This diagram shows the flow from user devices through
                        load balancer to web servers...
                      </div>

                      <!-- Background image with text alternative -->
                      <div
                        style="background-image: url('hero.jpg')"
                        role="img"
                        aria-label="Mountain landscape at sunset"
                      >
                        <h1>Welcome to our site</h1>
                      </div>`;

                    return (
                      <div className='mt-4'>
                        <CodeBlock
                          code={altTextCode}
                          comment='Alt Text Examples'
                          language='html'
                          showLineNumbers={true}
                        />
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title='CSS Flexbox'>
            <div className='space-y-6'>
              <div>
                <Header>What is Flexbox?</Header>
                <Text>
                  Flexbox (Flexible Box Layout) is a CSS layout method that
                  makes it easy to arrange elements in a row or column. It
                  automatically handles spacing, alignment, and distribution of
                  elements, even when their size is unknown or dynamic.
                </Text>
                <Callout>
                  <strong>Perfect for:</strong> Navigation bars, centering
                  content, equal-height columns, distributing space between
                  elements, and responsive layouts.
                </Callout>
              </div>

              <div>
                <Subheader>Key Concepts:</Subheader>
                <ul className='list-inside list-disc space-y-2 text-gray-50'>
                  <li>
                    <strong>Flex Container</strong> - The parent element with{' '}
                    <CodeSpan>display: flex</CodeSpan>
                  </li>
                  <li>
                    <strong>Flex Items</strong> - Direct children of the flex
                    container
                  </li>
                  <li>
                    <strong>Main Axis</strong> - Primary direction (horizontal
                    by default).
                  </li>
                  <li>
                    <strong>Cross Axis</strong> - Perpendicular to main axis
                    (vertical by default).
                  </li>
                </ul>
                <div>
                  For <strong>Main and Cross Axis</strong>, values can be:{' '}
                  <CodeSpan>row</CodeSpan> (left to right),{' '}
                  <CodeSpan>row-reverse</CodeSpan> (right to left),{' '}
                  <CodeSpan>column</CodeSpan> (top to bottom),{' '}
                  <CodeSpan>column-reverse</CodeSpan> (bottom to top) or{' '}
                  <CodeSpan>initial</CodeSpan> (browser default).
                </div>
              </div>
              <Callout>
                To use flexbox, you need to set the parent element to{' '}
                <CodeSpan>display: flex</CodeSpan>. This creates a flex
                container and all direct children become flex items. Parent
                element is the flex container, and children are the flex items.
                Parent and children can be the same element.
              </Callout>

              {(() => {
                const flexBasicsCode = dedent /* CSS */`/* Basic Flexbox Setup */
                  .container {
                    display: flex;
                    /* Creates a flex container - all direct children become flex items */
                  }

                  /* Flex Direction - Controls the main axis */
                  .row { flex-direction: row; }        /* Default: left to right */
                  .column { flex-direction: column; }  /* Top to bottom */
                  .row-reverse { flex-direction: row-reverse; }    /* Right to left */
                  .column-reverse { flex-direction: column-reverse; } /* Bottom to top */`;

                return (
                  <div className='mb-4'>
                    <CodeBlock
                      code={flexBasicsCode}
                      comment='Flexbox Basics'
                      language='css'
                      showLineNumbers={true}
                    />
                  </div>
                );
              })()}

              <div>
                <Subheader>Alignment Properties:</Subheader>

                <div className='mb-4'>
                  <Text variant='muted'>
                    <strong>Main Axis Alignment</strong> -{' '}
                    <CodeSpan>justify-content</CodeSpan>
                  </Text>
                  <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
                    <li>
                      <CodeSpan>flex-start</CodeSpan> - Pack items at the start
                    </li>
                    <li>
                      <CodeSpan>flex-end</CodeSpan> - Pack items at the end
                    </li>
                    <li>
                      <CodeSpan>center</CodeSpan> - Center items
                    </li>
                    <li>
                      <CodeSpan>space-between</CodeSpan> - Space between items
                      (no space at edges)
                    </li>
                    <li>
                      <CodeSpan>space-around</CodeSpan> - Space around items
                      (half space at edges)
                    </li>
                    <li>
                      <CodeSpan>space-evenly</CodeSpan> - Equal space everywhere
                    </li>
                  </ul>
                </div>

                <div className='mb-4'>
                  <Text variant='muted'>
                    <strong>Cross Axis Alignment</strong> -{' '}
                    <CodeSpan>align-items</CodeSpan>
                  </Text>
                  <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
                    <li>
                      <CodeSpan>stretch</CodeSpan> - Stretch to fill container
                      (default)
                    </li>
                    <li>
                      <CodeSpan>flex-start</CodeSpan> - Align to start of cross
                      axis
                    </li>
                    <li>
                      <CodeSpan>flex-end</CodeSpan> - Align to end of cross axis
                    </li>
                    <li>
                      <CodeSpan>center</CodeSpan> - Center items on cross axis
                    </li>
                    <li>
                      <CodeSpan>baseline</CodeSpan> - Align text baselines
                    </li>
                  </ul>
                </div>

                <div className='mb-4'>
                  <Text variant='muted'>
                    <strong>Multiple Lines Alignment</strong> -{' '}
                    <CodeSpan>align-content</CodeSpan>
                  </Text>
                  <p className='mb-4 text-gray-400 text-sm'>
                    Used when you have multiple rows/columns (when items wrap).
                    Controls spacing between lines, not individual items.
                  </p>
                  <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
                    <li>
                      <CodeSpan>stretch</CodeSpan> - Stretch lines to fill
                      container (default)
                    </li>
                    <li>
                      <CodeSpan>flex-start</CodeSpan> - Pack lines at the start
                    </li>
                    <li>
                      <CodeSpan>flex-end</CodeSpan> - Pack lines at the end
                    </li>
                    <li>
                      <CodeSpan>center</CodeSpan> - Center lines
                    </li>
                    <li>
                      <CodeSpan>space-between</CodeSpan> - Space between lines
                    </li>
                    <li>
                      <CodeSpan>space-around</CodeSpan> - Space around lines
                    </li>
                    <li>
                      <CodeSpan>space-evenly</CodeSpan> - Equal space between
                      lines
                    </li>
                  </ul>
                </div>

                <div className='mb-4'>
                  <Text variant='muted'>
                    <strong>Individual Item (Child) Alignment</strong> -{' '}
                    <CodeSpan>align-self</CodeSpan>
                  </Text>
                  <p className='mb-4 text-gray-400 text-sm'>
                    Overrides <CodeSpan>align-items</CodeSpan> for a single item
                    (child).
                  </p>
                  <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
                    <li>
                      <CodeSpan>auto</CodeSpan> - Use parent&apos;s align-items
                      value (default)
                    </li>
                    <li>
                      <CodeSpan>stretch</CodeSpan> - Stretch to fill container
                    </li>
                    <li>
                      <CodeSpan>flex-start</CodeSpan> - Align to start of cross
                      axis
                    </li>
                    <li>
                      <CodeSpan>flex-end</CodeSpan> - Align to end of cross axis
                    </li>
                    <li>
                      <CodeSpan>center</CodeSpan> - Center on cross axis
                    </li>
                    <li>
                      <CodeSpan>baseline</CodeSpan> - Align text baseline
                    </li>
                  </ul>
                </div>

                {(() => {
                  const alignmentCode = dedent /* CSS */`/* Centering content - Most common use case */
                    .center-everything {
                      display: flex;
                      justify-content: center;  /* Center horizontally */
                      align-items: center;      /* Center vertically */
                      height: 100vh;           /* Full viewport height */
                    }

                    /* Navigation bar spacing */
                    .navbar {
                      display: flex;
                      justify-content: space-between;  /* Logo left, menu right */
                      align-items: center;             /* Vertically center items */
                      padding: 1rem;
                    }

                    /* Equal spacing distribution */
                    .button-group {
                      display: flex;
                      justify-content: space-evenly;   /* Equal space around buttons */
                      gap: 1rem;                       /* Additional space between items */
                    }`;

                  return (
                    <CodeBlock
                      code={alignmentCode}
                      comment='Common Alignment Patterns'
                      highlightLines='4,5,12,13,20'
                      language='css'
                      showLineNumbers={true}
                    />
                  );
                })()}
              </div>

              <div>
                <Subheader>Flex Item Properties:</Subheader>

                <ul className='list-inside list-disc space-y-2 text-gray-50'>
                  <li>
                    <CodeSpan>flex-grow</CodeSpan> - How much an item should
                    grow (0 = don&apos;t grow, 1 = grow equally)
                  </li>
                  <li>
                    <CodeSpan>flex-shrink</CodeSpan> - How much an item should
                    shrink (1 = shrink equally, 0 = don&apos;t shrink)
                  </li>
                  <li>
                    <CodeSpan>flex-basis</CodeSpan> - Initial size before
                    growing/shrinking
                  </li>
                  <li>
                    <CodeSpan>flex</CodeSpan> - Shorthand for grow, shrink,
                    basis
                  </li>
                  <li>
                    <CodeSpan>align-self</CodeSpan> - Override align-items for
                    individual item
                  </li>
                </ul>

                {(() => {
                  const flexItemsCode = dedent /* CSS */`/* Flexible sidebar layout */
                    .layout {
                      display: flex;
                      height: 100vh;
                    }

                    .sidebar {
                      flex: 0 0 250px;  /* Don't grow, don't shrink, 250px wide */
                      /* Same as: flex-grow: 0; flex-shrink: 0; flex-basis: 250px; */
                    }

                    .main-content {
                      flex: 1;  /* Grow to fill remaining space */
                      /* Same as: flex-grow: 1; flex-shrink: 1; flex-basis: 0; */
                    }

                    /* Card layout with different sized items */
                    .card-container {
                      display: flex;
                      gap: 1rem;
                    }

                    .card {
                      flex: 1;  /* All cards equal width */
                    }

                    .featured-card {
                      flex: 2;  /* This card takes twice the space */
                    }

                    /* Individual alignment override */
                    .special-item {
                      align-self: flex-end;  /* Align this item to bottom */
                    }`;

                  return (
                    <div className='mt-4'>
                      <CodeBlock
                        code={flexItemsCode}
                        comment='Flex Item Control'
                        highlightLines='8,13,24,28,33'
                        language='css'
                        showLineNumbers={true}
                      />
                    </div>
                  );
                })()}
              </div>

              <div>
                <Subheader>Practical Examples:</Subheader>

                {(() => {
                  const practicalCode = dedent /* HTML */`<!-- Complete responsive card layout -->
                    <div class="card-grid">
                      <div class="card">Card 1</div>
                      <div class="card">Card 2</div>
                      <div class="card">Card 3</div>
                    </div>

                    <style>
                      .card-grid {
                        display: flex;
                        flex-wrap: wrap; /* Allow items to wrap to new line */
                        gap: 1rem; /* Space between items */
                        justify-content: center; /* Center the grid */
                      }

                      .card {
                        flex: 1 1 300px; /* Grow, shrink, min 300px wide */
                        min-height: 200px;
                        background: #333;
                        padding: 1rem;
                        border-radius: 8px;
                      }

                      /* Mobile: Stack vertically */
                      @media (max-width: 768px) {
                        .card {
                          flex: 1 1 100%; /* Full width on mobile */
                        }
                      }
                    </style>

                    <!-- Header with logo and navigation -->
                    <header class="site-header">
                      <div class="logo">My Site</div>
                      <nav class="main-nav">
                        <a href="/home">Home</a>
                        <a href="/about">About</a>
                        <a href="/contact">Contact</a>
                      </nav>
                    </header>

                    <style>
                      .site-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 1rem 2rem;
                        background: #222;
                      }

                      .main-nav {
                        display: flex;
                        gap: 2rem;
                      }

                      .main-nav a {
                        text-decoration: none;
                        color: white;
                      }
                    </style>`;

                  return (
                    <CodeBlock
                      code={practicalCode}
                      comment='Real-World Examples'
                      language='html'
                      showLineNumbers={true}
                    />
                  );
                })()}

                <Callout className='mt-4'>
                  <strong>Pro Tips:</strong>
                </Callout>
                <ul className='mt-2 list-inside list-disc space-y-1'>
                  <li>
                    Use <CodeSpan>gap</CodeSpan> property instead of margins for
                    spacing between flex items
                  </li>
                  <li>
                    <CodeSpan>flex: 1</CodeSpan> is perfect for equal-width
                    columns
                  </li>
                  <li>
                    Combine <CodeSpan>flex-wrap: wrap</CodeSpan> with{' '}
                    <CodeSpan>flex-basis</CodeSpan> for responsive grids
                  </li>
                  <li>
                    Always test with different content lengths to ensure layout
                    doesn&apos;t break
                  </li>
                </ul>
              </div>
            </div>
          </SectionCard>

          <SectionCard title='CSS Grid'>
            <div className='space-y-6'>
              <div>
                <Header>What is CSS Grid?</Header>
                <Text>
                  CSS Grid is a 2-dimensional layout system that allows you to
                  create complex layouts with rows and columns. Unlike Flexbox
                  (which is 1-dimensional), Grid lets you control both
                  horizontal and vertical positioning simultaneously, making it
                  perfect for page layouts and complex component arrangements.
                </Text>
                <Subheader>Perfect for:</Subheader>
                <Text variant='muted'>
                  Page layouts, card grids, dashboards, magazine-style layouts,
                  and any design where you need precise control over both rows
                  and columns. (see{' '}
                  <button
                    className='cursor-pointer text-yellow-500 underline hover:text-yellow-400'
                    onClick={() => router.push('/')}
                    type='button'
                  >
                    main page
                  </button>{' '}
                  as an example of grid layout)
                </Text>
              </div>

              <div>
                <Subheader>Key Concepts:</Subheader>
                <ul className='list-inside list-disc space-y-2 text-gray-50'>
                  <li>
                    <strong>Grid Container</strong> - The parent element with{' '}
                    <CodeSpan>display: grid</CodeSpan>
                  </li>
                  <li>
                    <strong>Grid Items</strong> - Direct children of the grid
                    container
                  </li>
                  <li>
                    <strong>Grid Lines</strong> - The dividing lines that make
                    up the structure
                  </li>
                  <li>
                    <strong>Grid Tracks</strong> - The space between two
                    adjacent grid lines (rows/columns)
                  </li>
                  <li>
                    <strong>Grid Cell</strong> - A single unit of the grid
                    (intersection of row and column)
                  </li>
                  <li>
                    <strong>Grid Area</strong> - Any rectangular space bounded
                    by grid lines
                  </li>
                </ul>
              </div>

              {(() => {
                const gridBasicsCode = dedent /* CSS */`/* Basic Grid Setup */
                  .container {
                    display: grid;
                    /* Creates a grid container - all direct children become grid items */
                  }

                  /* Define columns and rows */
                  .basic-grid {
                    display: grid;
                    grid-template-columns: 200px 1fr 100px;  /* 3 columns: fixed, flexible, fixed */
                    grid-template-rows: 50px 1fr 50px;       /* 3 rows: header, content, footer */
                    gap: 1rem;                               /* Space between grid items */
                    height: 100vh;
                  }`;

                return (
                  <CodeBlock
                    code={gridBasicsCode}
                    comment='Grid Basics'
                    language='css'
                    showLineNumbers={true}
                  />
                );
              })()}

              <div>
                <Subheader>Grid Sizing & Units:</Subheader>

                <div className='mb-4'>
                  <Text variant='muted'>
                    <strong>Fractional Units (fr)</strong> - Represents a
                    fraction of available space
                  </Text>
                  <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
                    <li>
                      <CodeSpan>1fr</CodeSpan> - Takes 1 fraction of available
                      space
                    </li>
                    <li>
                      <CodeSpan>1fr 2fr</CodeSpan> - First column gets 1/3,
                      second gets 2/3
                    </li>
                    <li>
                      <CodeSpan>100px 1fr</CodeSpan> - First column fixed,
                      second flexible
                    </li>
                  </ul>
                </div>

                <div className='mb-4'>
                  <Text variant='muted'>
                    <strong>Repeat Function</strong> - Simplifies repetitive
                    patterns
                  </Text>
                  <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
                    <li>
                      <CodeSpan>repeat(3, 1fr)</CodeSpan> - 3 equal columns
                    </li>
                    <li>
                      <CodeSpan>repeat(auto-fit, minmax(200px, 1fr))</CodeSpan>{' '}
                      - Responsive columns
                    </li>
                    <li>
                      <CodeSpan>repeat(auto-fill, 100px)</CodeSpan> - Fill with
                      100px columns
                    </li>
                  </ul>
                </div>

                <div className='mb-4'>
                  <Text variant='muted'>
                    <strong>Sizing Functions</strong> - Control minimum and
                    maximum sizes
                  </Text>
                  <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
                    <li>
                      <CodeSpan>minmax(100px, 1fr)</CodeSpan> - Minimum 100px,
                      maximum flexible
                    </li>
                    <li>
                      <CodeSpan>fit-content(300px)</CodeSpan> - Shrink to
                      content, max 300px
                    </li>
                    <li>
                      <CodeSpan>min-content</CodeSpan> - Smallest possible size
                    </li>
                    <li>
                      <CodeSpan>max-content</CodeSpan> - Largest needed size
                    </li>
                  </ul>
                </div>

                {(() => {
                  const gridSizingCode = dedent /* CSS */`/* Responsive card grid */
                    .card-grid {
                      display: grid;
                      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                      gap: 2rem;
                      /* Cards automatically wrap to new rows when screen gets smaller */
                    }

                    /* Complex layout with mixed sizing */
                    .dashboard {
                      display: grid;
                      grid-template-columns:
                        200px                    /* Sidebar: fixed width */
                        1fr                      /* Main: flexible */
                        minmax(200px, 300px);    /* Aside: responsive between 200-300px */
                      grid-template-rows:
                        60px                     /* Header: fixed height */
                        1fr                      /* Content: fills remaining space */
                        40px;                    /* Footer: fixed height */
                      gap: 1rem;
                      height: 100vh;
                    }`;

                  return (
                    <CodeBlock
                      code={gridSizingCode}
                      comment='Grid Sizing Examples'
                      highlightLines='4,12,16'
                      language='css'
                      showLineNumbers={true}
                    />
                  );
                })()}
              </div>

              <div>
                <Subheader>Grid Item Placement:</Subheader>
                <Text className='text-gray-200' variant='muted'>
                  In other words, select specific grid items and do what you
                  want with them.
                </Text>
                <ul className='list-inside list-disc space-y-2 text-gray-50'>
                  <li>
                    <CodeSpan>grid-column</CodeSpan> - Shorthand for
                    grid-column-start/end
                  </li>
                  <li>
                    <CodeSpan>grid-row</CodeSpan> - Shorthand for
                    grid-row-start/end
                  </li>
                  <li>
                    <CodeSpan>grid-area</CodeSpan> - Shorthand for all four
                    line-based properties
                  </li>
                  <li>
                    <CodeSpan>span</CodeSpan> - Span across multiple tracks
                  </li>
                </ul>

                {(() => {
                  const gridPlacementCode = dedent /* CSS */`/* Grid item placement */
                    .grid-container {
                      display: grid;
                      grid-template-columns: repeat(4, 1fr);
                      grid-template-rows: repeat(3, 100px);
                      gap: 1rem;
                    }

                    .header {
                      grid-column: 1 / -1;      /* Span entire width (first to last line) */
                      /* Same as: grid-column: 1 / 5; */
                    }

                    .sidebar {
                      grid-column: 1 / 2;       /* First column only */
                      grid-row: 2 / 4;          /* Span 2 rows */
                    }

                    .main-content {
                      grid-column: 2 / -1;      /* Columns 2 to end */
                      grid-row: 2;              /* Second row only */
                    }

                    .footer {
                      grid-column: 2 / -1;      /* Columns 2 to end */
                      grid-row: 3;              /* Third row */
                    }

                    /* Using span notation */
                    .featured-item {
                      grid-column: span 2;      /* Span 2 columns from current position */
                      grid-row: span 2;         /* Span 2 rows from current position */
                    }`;

                  return (
                    <div className='mt-4'>
                      <CodeBlock
                        code={gridPlacementCode}
                        comment='Grid Item Placement'
                        highlightLines='10,15,16,20,21,25,26,31,32'
                        language='css'
                        showLineNumbers={true}
                      />
                    </div>
                  );
                })()}
              </div>

              <div>
                <Subheader>Named Grid Areas:</Subheader>
                <Text variant='muted'>
                  A more intuitive way to create layouts by naming areas and
                  assigning items to them.
                </Text>

                {(() => {
                  const namedAreasCode = dedent /* CSS */`/* Define layout with named areas */
                    .page-layout {
                      display: grid;
                      grid-template-columns: 200px 1fr 200px;
                      grid-template-rows: 60px 1fr 40px;
                      grid-template-areas:
                        "header  header  header"
                        "sidebar main    aside"
                        "footer  footer  footer";
                      gap: 1rem;
                      height: 100vh;
                    }

                    /* Assign items to named areas */
                    .page-header { grid-area: header; }
                    .page-sidebar { grid-area: sidebar; }
                    .page-main { grid-area: main; }
                    .page-aside { grid-area: aside; }
                    .page-footer { grid-area: footer; }

                    /* Responsive: Stack on mobile */
                    @media (max-width: 768px) {
                      .page-layout {
                        grid-template-columns: 1fr;
                        grid-template-areas:
                          "header"
                          "main"
                          "sidebar"
                          "aside"
                          "footer";
                      }
                    }`;

                  return (
                    <CodeBlock
                      code={namedAreasCode}
                      comment='Named Grid Areas'
                      highlightLines='6,7,8,9,15,16,17,18,19,23,24,25,26,27,28,29,30'
                      language='css'
                      showLineNumbers={true}
                    />
                  );
                })()}
              </div>

              <div>
                <Subheader>Grid Alignment:</Subheader>

                <div className='mb-4'>
                  <Text variant='muted'>
                    <strong>Item Alignment</strong> - Controls individual grid
                    items within their cells
                  </Text>
                  <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
                    <li>
                      <CodeSpan>justify-items</CodeSpan> - Align items
                      horizontally (start, end, center, stretch)
                    </li>
                    <li>
                      <CodeSpan>align-items</CodeSpan> - Align items vertically
                      (start, end, center, stretch)
                    </li>
                    <li>
                      <CodeSpan>place-items</CodeSpan> - Shorthand for both
                    </li>
                  </ul>
                </div>

                <div className='mb-4'>
                  <Text variant='muted'>
                    <strong>Content Alignment</strong> - Controls the entire
                    grid within the container
                  </Text>
                  <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
                    <li>
                      <CodeSpan>justify-content</CodeSpan> - Align grid
                      horizontally
                    </li>
                    <li>
                      <CodeSpan>align-content</CodeSpan> - Align grid vertically
                    </li>
                    <li>
                      <CodeSpan>place-content</CodeSpan> - Shorthand for both
                    </li>
                  </ul>
                </div>

                <div className='mb-4'>
                  <Text variant='muted'>
                    <strong>Individual Item Override</strong> - Override
                    alignment for specific items
                  </Text>
                  <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
                    <li>
                      <CodeSpan>justify-self</CodeSpan> - Align single item
                      horizontally
                    </li>
                    <li>
                      <CodeSpan>align-self</CodeSpan> - Align single item
                      vertically
                    </li>
                    <li>
                      <CodeSpan>place-self</CodeSpan> - Shorthand for both
                    </li>
                  </ul>
                </div>

                {(() => {
                  const gridAlignmentCode = dedent /* CSS */`/* Grid alignment examples */
                    .center-items {
                      display: grid;
                      grid-template-columns: repeat(3, 100px);
                      grid-template-rows: repeat(3, 100px);
                      gap: 1rem;

                      /* Center all items within their cells */
                      place-items: center;
                      /* Same as: align-items: center; justify-items: center; */

                      /* Center the entire grid within container */
                      place-content: center;
                      height: 100vh;
                    }

                    /* Individual item alignment */
                    .special-item {
                      place-self: end start;  /* Bottom-left of its cell */
                      /* Same as: align-self: end; justify-self: start; */
                    }`;

                  return (
                    <CodeBlock
                      code={gridAlignmentCode}
                      comment='Grid Alignment'
                      language='css'
                      showLineNumbers={true}
                    />
                  );
                })()}
              </div>

              <div>
                <Subheader>Practical Examples:</Subheader>

                {(() => {
                  const practicalGridCode = dedent /* HTML */`<!-- Complete responsive photo gallery -->
                    <div class="photo-gallery">
                      <div class="photo large">Photo 1</div>
                      <div class="photo">Photo 2</div>
                      <div class="photo">Photo 3</div>
                      <div class="photo wide">Photo 4</div>
                      <div class="photo">Photo 5</div>
                      <div class="photo tall">Photo 6</div>
                    </div>

                    <style>
                      .photo-gallery {
                        display: grid;
                        grid-template-columns: repeat(
                          auto-fit,
                          minmax(200px, 1fr)
                        );
                        grid-auto-rows: 200px;
                        gap: 1rem;
                      }

                      .photo {
                        background: #333;
                        border-radius: 8px;
                      }

                      /* Different sized photos */
                      .large {
                        grid-column: span 2;
                        grid-row: span 2;
                      }
                      .wide {
                        grid-column: span 2;
                      }
                      .tall {
                        grid-row: span 2;
                      }
                    </style>

                    <!-- Dashboard layout with named areas -->
                    <div class="dashboard">
                      <header class="dash-header">Dashboard Header</header>
                      <nav class="dash-nav">Navigation</nav>
                      <main class="dash-main">Main Content</main>
                      <aside class="dash-sidebar">Sidebar</aside>
                      <footer class="dash-footer">Footer</footer>
                    </div>

                    <style>
                      .dashboard {
                        display: grid;
                        grid-template-columns: 250px 1fr;
                        grid-template-rows: 60px 1fr 40px;
                        grid-template-areas:
                          'header header'
                          'nav    main'
                          'footer footer';
                        gap: 1rem;
                        height: 100vh;
                      }

                      .dash-header {
                        grid-area: header;
                        background: #222;
                      }
                      .dash-nav {
                        grid-area: nav;
                        background: #333;
                      }
                      .dash-main {
                        grid-area: main;
                        background: #444;
                      }
                      .dash-footer {
                        grid-area: footer;
                        background: #222;
                      }
                    </style>`;

                  return (
                    <CodeBlock
                      code={practicalGridCode}
                      comment='Real-World Grid Examples'
                      language='html'
                      showLineNumbers={true}
                    />
                  );
                })()}

                <Callout className='mt-4'>
                  <strong>Pro Tips:</strong>
                </Callout>
                <ul className='mt-2 list-inside list-disc space-y-1'>
                  <li>
                    Use <CodeSpan>auto-fit</CodeSpan> for responsive grids that
                    collapse empty columns
                  </li>
                  <li>
                    Use <CodeSpan>auto-fill</CodeSpan> to maintain empty columns
                    for consistent spacing
                  </li>
                  <li>
                    Combine Grid for overall layout and Flexbox for
                    component-level alignment
                  </li>
                  <li>
                    Named grid areas make complex layouts much more readable and
                    maintainable
                  </li>
                  <li>
                    <CodeSpan>grid-template</CodeSpan> is shorthand for columns,
                    rows, and areas combined
                  </li>
                </ul>
              </div>
            </div>
          </SectionCard>

          <SectionCard title='Responsive Design'>
            <div className='space-y-6'>
              <div>
                <Header>What is Responsive Design?</Header>
                <Text>
                  Responsive design ensures your website looks and works great
                  on all devices - from smartphones to ultra-wide monitors.
                  Instead of creating separate mobile and desktop versions,
                  responsive design uses flexible layouts, images, and CSS media
                  queries to automatically adapt to different screen sizes.
                </Text>
                <Callout>
                  <strong>Core principle:</strong> Design for mobile first, then
                  enhance for larger screens. This approach ensures better
                  performance, faster loading, and a solid foundation that works
                  everywhere.
                </Callout>
              </div>

              <div>
                <Subheader>Key Concepts:</Subheader>
                <ul className='list-inside list-disc space-y-2 text-gray-50'>
                  <li>
                    <strong>Mobile-First</strong> - Start with mobile design,
                    add features for larger screens
                  </li>
                  <li>
                    <strong>Fluid Grids</strong> - Layouts that scale
                    proportionally using percentages and flexible units
                  </li>
                  <li>
                    <strong>Flexible Images</strong> - Images that scale with
                    their container
                  </li>
                  <li>
                    <strong>Media Queries</strong> - CSS rules that apply based
                    on device characteristics
                  </li>
                  <li>
                    <strong>Breakpoints</strong> - Specific screen widths where
                    layout changes occur
                  </li>
                  <li>
                    <strong>Viewport</strong> - The visible area of a web page
                    on a device
                  </li>
                </ul>
              </div>

              {(() => {
                const mobileFirstCode = dedent /* CSS */`/* Mobile-First Approach */
                  /* Base styles for mobile (no media query needed) */
                  .container {
                    padding: 1rem;
                    max-width: 100%;
                  }

                  .navigation {
                    display: flex;
                    flex-direction: column;  /* Stack vertically on mobile */
                    gap: 0.5rem;
                  }

                  /* Tablet and up */
                  @media (min-width: 768px) {
                    .container {
                      padding: 2rem;
                      max-width: 1200px;
                      margin: 0 auto;
                    }

                    .navigation {
                      flex-direction: row;  /* Horizontal on larger screens */
                      gap: 2rem;
                    }
                  }

                  /* Desktop and up */
                  @media (min-width: 1024px) {
                    .container {
                      padding: 3rem;
                    }
                  }`;

                return (
                  <CodeBlock
                    code={mobileFirstCode}
                    comment='Mobile-First CSS Structure'
                    highlightLines='15,29'
                    language='css'
                    showLineNumbers={true}
                  />
                );
              })()}

              <div>
                <Subheader>Common Breakpoints:</Subheader>

                <div className='mb-4'>
                  <Text variant='muted'>
                    <strong>Standard Breakpoints</strong> - Based on common
                    device sizes (width)
                  </Text>
                  <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
                    <li>
                      <CodeSpan>320px+</CodeSpan> - Small phones (base mobile)
                    </li>
                    <li>
                      <CodeSpan>480px+</CodeSpan> - Large phones
                    </li>
                    <li>
                      <CodeSpan>768px+</CodeSpan> - Tablets
                    </li>
                    <li>
                      <CodeSpan>1024px+</CodeSpan> - Small laptops
                    </li>
                    <li>
                      <CodeSpan>1200px+</CodeSpan> - Desktop
                    </li>
                    <li>
                      <CodeSpan>1440px+</CodeSpan> - Large desktop
                    </li>
                  </ul>
                </div>
                <Text className='text-gray-200' variant='muted'>
                  Bigger or smaller screen sizes are not considered standard.
                  After all, there are a lot of devices out there. And 99% of
                  them are in this range. We can&apos;t make it work for all of
                  them. So, we need to use breakpoints.
                </Text>
                {(() => {
                  const breakpointsCode = dedent /* CSS */`/* Responsive Breakpoints System */
                    /* Mobile first - no media query */
                    .card-grid {
                      display: grid;
                      grid-template-columns: 1fr;  /* Single column on mobile */
                      gap: 1rem;
                      padding: 1rem;
                    }

                    /* Small phones (landscape) */
                    @media (min-width: 480px) {
                      .card-grid {
                        grid-template-columns: repeat(2, 1fr);  /* 2 columns */
                        gap: 1.5rem;
                      }
                    }

                    /* Tablets */
                    @media (min-width: 768px) {
                      .card-grid {
                        grid-template-columns: repeat(3, 1fr);  /* 3 columns */
                        padding: 2rem;
                      }
                    }

                    /* Desktop */
                    @media (min-width: 1024px) {
                      .card-grid {
                        grid-template-columns: repeat(4, 1fr);  /* 4 columns */
                        max-width: 1200px;
                        margin: 0 auto;
                      }
                    }

                    /* Large desktop */
                    @media (min-width: 1440px) {
                      .card-grid {
                        grid-template-columns: repeat(5, 1fr);  /* 5 columns */
                        max-width: 1400px;
                      }
                    }`;

                  return (
                    <CodeBlock
                      code={breakpointsCode}
                      comment='Responsive Breakpoints'
                      highlightLines='5,11,19,27,36'
                      language='css'
                      showLineNumbers={true}
                    />
                  );
                })()}
              </div>

              <div>
                <Subheader>Flexible Units & Sizing:</Subheader>

                <div className='mb-4'>
                  <Text variant='muted'>
                    <strong>Relative Units</strong> - Scale with context
                  </Text>
                  <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
                    <li>
                      <CodeSpan>%</CodeSpan> - Percentage of parent element
                    </li>
                    <li>
                      <CodeSpan>em</CodeSpan> - Relative to parent font size
                    </li>
                    <li>
                      <CodeSpan>rem</CodeSpan> - Relative to root font size{' '}
                      <span className='text-yellow-500'>(recommended)</span>
                    </li>
                    <li>
                      <CodeSpan>ch</CodeSpan> - Width of the &quot;0&quot;
                      character{' '}
                      <span className='text-yellow-500'>(great for text)</span>
                    </li>
                  </ul>
                </div>

                <div className='mb-4'>
                  <Text variant='muted'>
                    <strong>Viewport Units</strong> - Based on browser window
                    size
                  </Text>
                  <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
                    <li>
                      <CodeSpan>vw</CodeSpan> - 1% of viewport width
                    </li>
                    <li>
                      <CodeSpan>vh</CodeSpan> - 1% of viewport height
                    </li>
                    <li>
                      <CodeSpan>vmin</CodeSpan> - 1% of smaller viewport
                      dimension
                    </li>
                    <li>
                      <CodeSpan>vmax</CodeSpan> - 1% of larger viewport
                      dimension
                    </li>
                    <li>
                      <CodeSpan>dvh</CodeSpan> - Dynamic viewport height
                      (accounts for mobile browsers)
                    </li>
                  </ul>
                </div>

                {(() => {
                  const flexibleUnitsCode = dedent /* CSS */`/* Flexible Typography */
                  html {
                    font-size: 16px;  /* Base size for rem calculations */
                  }

                  h1 {
                    font-size: 2.5rem;    /* 40px at base 16px */
                    line-height: 1.2;
                    margin-bottom: 1rem;
                  }

                  p {
                    font-size: 1rem;      /* 16px at base 16px */
                    line-height: 1.6;
                    margin-bottom: 1rem;
                    max-width: 65ch;      /* Optimal reading width */
                  }

                  /* Responsive font scaling */
                  @media (min-width: 768px) {
                    html {
                      font-size: 18px;    /* Larger base on tablets+ */
                    }
                  }

                  /* Flexible spacing */
                  .section {
                    padding: clamp(1rem, 5vw, 3rem);  /* Responsive padding */
                    margin-bottom: 2rem;
                  }

                  /* Viewport-based hero section */
                  .hero {
                    height: 100vh;       /* Full viewport height */
                    min-height: 500px;   /* Ensure minimum height */
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  }`;

                  return (
                    <CodeBlock
                      code={flexibleUnitsCode}
                      comment='Flexible Units Examples'
                      language='css'
                      showLineNumbers={true}
                    />
                  );
                })()}
              </div>

              <div>
                <Subheader>Responsive Images & Media:</Subheader>
                <Text variant='muted'>
                  Images and media need special handling to scale properly
                  across devices and load efficiently.
                </Text>

                {(() => {
                  const responsiveMediaCode = dedent /* HTML */`<!-- Basic responsive image -->
                    <img
                      src="image.jpg"
                      alt="Description"
                      style="max-width: 100%; height: auto;"
                    />

                    <!-- Responsive images with different sources -->
                    <picture>
                      <source
                        media="(min-width: 1024px)"
                        srcset="large-image.jpg"
                      />
                      <source
                        media="(min-width: 768px)"
                        srcset="medium-image.jpg"
                      />
                      <img
                        src="small-image.jpg"
                        alt="Responsive image"
                        style="width: 100%; height: auto;"
                      />
                    </picture>

                    <!-- CSS for responsive images -->
                    <style>
                      .responsive-img {
                        max-width: 100%;
                        height: auto;
                        display: block;
                      }

                      /* Image containers with aspect ratio */
                      .image-container {
                        width: 100%;
                        aspect-ratio: 16 / 9; /* Maintain 16:9 ratio */
                        overflow: hidden;
                        border-radius: 8px;
                      }

                      .image-container img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover; /* Fill container while maintaining aspect ratio */
                      }

                      /* Responsive background images */
                      .hero-bg {
                        background-image: url('mobile-bg.jpg');
                        background-size: cover;
                        background-position: center;
                        min-height: 50vh;
                      }

                      @media (min-width: 768px) {
                        .hero-bg {
                          background-image: url('desktop-bg.jpg');
                          min-height: 70vh;
                        }
                      }
                    </style>`;

                  return (
                    <CodeBlock
                      code={responsiveMediaCode}
                      comment='Responsive Images & Media'
                      highlightLines='5,27,28,29,30,31,34,35,36,37,38,39,41,42,43,44,45'
                      language='html'
                      showLineNumbers={true}
                    />
                  );
                })()}
              </div>

              <div>
                <Subheader>Modern CSS Features:</Subheader>

                <div className='mb-4'>
                  <Text variant='muted'>
                    <strong>Container Queries</strong> - Style based on
                    container size, not viewport
                  </Text>
                  <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
                    <li>
                      More precise than media queries for component-based design
                    </li>
                    <li>
                      Components adapt based on their container, not the whole
                      screen
                    </li>
                    <li>
                      Perfect for reusable components in different contexts
                    </li>
                  </ul>
                </div>

                <div className='mb-4'>
                  <Text variant='muted'>
                    <strong>CSS Functions for Responsiveness</strong>
                  </Text>
                  <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
                    <li>
                      <CodeSpan>clamp(min, preferred, max)</CodeSpan> -
                      Responsive values with limits
                    </li>
                    <li>
                      <CodeSpan>min()</CodeSpan> - Use the smaller of multiple
                      values
                    </li>
                    <li>
                      <CodeSpan>max()</CodeSpan> - Use the larger of multiple
                      values
                    </li>
                    <li>
                      <CodeSpan>calc()</CodeSpan> - Mathematical calculations
                      with mixed units
                    </li>
                  </ul>
                </div>

                {(() => {
                  const modernCSSCode = dedent /* CSS */`/* Container Queries (Modern browsers) */
                  .card-container {
                    container-type: inline-size;  /* Enable container queries */
                  }

                  .card {
                    padding: 1rem;
                    background: #333;
                  }

                  /* Style based on container width, not viewport */
                  @container (min-width: 300px) {
                    .card {
                      padding: 2rem;
                      display: flex;
                      gap: 1rem;
                    }
                  }

                  /* CSS Math Functions */
                  .responsive-text {
                    /* Font size between 16px and 32px, scales with viewport */
                    font-size: clamp(1rem, 4vw, 2rem);
                  }

                  .responsive-width {
                    /* Width is 90% of container, but never more than 600px */
                    width: min(90%, 600px);
                    margin: 0 auto;
                  }

                  .flexible-grid {
                    display: grid;
                    /* Columns: minimum 250px, but fill available space */
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: clamp(1rem, 3vw, 2rem);  /* Responsive gap */
                  }

                  /* Intrinsic responsive design */
                  .auto-fit-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    /* No media queries needed - automatically responsive! */
                  }`;

                  return (
                    <CodeBlock
                      code={modernCSSCode}
                      comment='Modern Responsive CSS'
                      highlightLines='3,11,12,13,14,15,21,26,27,32'
                      language='css'
                      showLineNumbers={true}
                    />
                  );
                })()}
              </div>

              <div>
                <Subheader>Practical Examples:</Subheader>

                {(() => {
                  const practicalResponsiveCode = dedent /* HTML */`<!-- Complete responsive landing page -->
                    <!DOCTYPE html>
                    <html lang="en">
                      <head>
                        <meta charset="UTF-8" />
                        <meta
                          name="viewport"
                          content="width=device-width, initial-scale=1.0"
                        />
                        <title>Responsive Page</title>
                      </head>
                      <body>
                        <header class="site-header">
                          <nav class="navbar">
                            <div class="logo">Brand</div>
                            <div class="nav-links">
                              <a href="#home">Home</a>
                              <a href="#about">About</a>
                              <a href="#contact">Contact</a>
                            </div>
                          </nav>
                        </header>

                        <main class="main-content">
                          <section class="hero">
                            <h1>Responsive Design</h1>
                            <p>Works on all devices</p>
                          </section>

                          <section class="features">
                            <div class="feature-grid">
                              <div class="feature-card">Feature 1</div>
                              <div class="feature-card">Feature 2</div>
                              <div class="feature-card">Feature 3</div>
                            </div>
                          </section>
                        </main>
                      </body>
                    </html>

                    <style>
                      /* Reset and base styles */
                      * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                      }

                      body {
                        font-family: system-ui, sans-serif;
                        line-height: 1.6;
                      }

                      /* Mobile-first navigation */
                      .navbar {
                        display: flex;
                        flex-direction: column;
                        padding: 1rem;
                        gap: 1rem;
                      }

                      .nav-links {
                        display: flex;
                        flex-direction: column;
                        gap: 0.5rem;
                      }

                      /* Hero section */
                      .hero {
                        padding: 2rem 1rem;
                        text-align: center;
                        background: linear-gradient(
                          135deg,
                          #667eea 0%,
                          #764ba2 100%
                        );
                        color: white;
                        min-height: 50vh;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                      }

                      .hero h1 {
                        font-size: clamp(2rem, 8vw, 4rem);
                        margin-bottom: 1rem;
                      }

                      /* Feature grid */
                      .feature-grid {
                        display: grid;
                        grid-template-columns: 1fr;
                        gap: 1rem;
                        padding: 2rem 1rem;
                        max-width: 1200px;
                        margin: 0 auto;
                      }

                      .feature-card {
                        padding: 2rem;
                        background: #f5f5f5;
                        border-radius: 8px;
                        text-align: center;
                      }

                      /* Tablet styles */
                      @media (min-width: 768px) {
                        .navbar {
                          flex-direction: row;
                          justify-content: space-between;
                          align-items: center;
                        }

                        .nav-links {
                          flex-direction: row;
                          gap: 2rem;
                        }

                        .feature-grid {
                          grid-template-columns: repeat(2, 1fr);
                          gap: 2rem;
                          padding: 3rem 2rem;
                        }

                        .hero {
                          min-height: 70vh;
                          padding: 3rem 2rem;
                        }
                      }

                      /* Desktop styles */
                      @media (min-width: 1024px) {
                        .feature-grid {
                          grid-template-columns: repeat(3, 1fr);
                          gap: 2rem;
                        }

                        .navbar {
                          padding: 1rem 2rem;
                        }
                      }
                    </style>`;

                  return (
                    <CodeBlock
                      code={practicalResponsiveCode}
                      comment='Complete Responsive Page'
                      language='html'
                      showLineNumbers={true}
                    />
                  );
                })()}

                <Callout className='mt-4'>
                  <strong>Pro Tips:</strong>
                </Callout>
                <ul className='mt-2 list-inside list-disc space-y-1'>
                  <li>
                    Always include the viewport meta tag:{' '}
                    <CodeSpan>
                      &lt;meta name=&quot;viewport&quot;
                      content=&quot;width=device-width,
                      initial-scale=1.0&quot;&gt;
                    </CodeSpan>
                  </li>
                  <li>
                    Test on real devices, not just browser dev tools - they
                    behave differently
                  </li>
                  <li>
                    Use <CodeSpan>clamp()</CodeSpan> for responsive typography
                    without media queries
                  </li>
                  <li>
                    Consider <CodeSpan>aspect-ratio</CodeSpan> property for
                    maintaining proportions
                  </li>
                  <li>
                    Use CSS Grid with <CodeSpan>auto-fit</CodeSpan> and{' '}
                    <CodeSpan>minmax()</CodeSpan> for intrinsically responsive
                    layouts
                  </li>
                  <li>
                    Optimize images with multiple formats (WebP, AVIF) and sizes
                    for different devices
                  </li>
                </ul>
              </div>
            </div>
          </SectionCard>

          <SectionCard title='CSS Functions & Modern Features'>
            <div className='space-y-6'>
              <div>
                <Header>CSS Functions for Design Systems</Header>
                <Text>
                  Modern CSS functions help create more maintainable design
                  systems by allowing dynamic color calculations, better
                  contrast handling, and responsive value generation.
                </Text>

                <div className='mb-4'>
                  <Subheader>Color Functions</Subheader>
                  <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
                    <li>
                      <CodeSpan>color-mix()</CodeSpan> - Blend two colors
                      together
                    </li>
                    <li>
                      <CodeSpan>color-contrast()</CodeSpan> - Automatically
                      choose contrasting colors
                    </li>
                    <li>
                      <CodeSpan>light-dark()</CodeSpan> - Theme-aware color
                      selection
                    </li>
                  </ul>
                </div>

                {(() => {
                  const colorFunctionsCode = dedent /* CSS */`/* Modern Color Functions */
                    :root {
                      --primary-color: #007acc;
                      --secondary-color: #ff6b6b;

                      /* Color mixing for variations */
                      --primary-light: color-mix(in srgb, var(--primary-color) 80%, white);
                      --primary-dark: color-mix(in srgb, var(--primary-color) 80%, black);

                      /* Automatic contrast (when supported) */
                      --text-on-primary: color-contrast(
                        var(--primary-color)
                        vs white, black
                      );

                      /* Theme-aware colors */
                      --background: light-dark(white, #1a1a1a);
                      --text: light-dark(black, white);
                    }

                    .button {
                      background: var(--primary-color);
                      color: var(--text-on-primary);
                      border: 2px solid var(--primary-dark);
                    }

                    .button:hover {
                      background: var(--primary-light);
                    }`;

                  return (
                    <CodeBlock
                      code={colorFunctionsCode}
                      comment='Modern Color Functions'
                      language='css'
                      showLineNumbers={true}
                    />
                  );
                })()}
              </div>

              <div>
                <Header>Cascade Layers & Design Tokens</Header>
                <Text>
                  Cascade layers provide explicit control over CSS specificity,
                  making it easier to manage design tokens and prevent
                  specificity wars. Think of layers as a way to organize your
                  CSS into priority levels - styles in later layers always win
                  over earlier layers, regardless of specificity.
                </Text>

                <div className='mb-4'>
                  <Subheader>Why Use Cascade Layers?</Subheader>
                  <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
                    <li>
                      <strong>Predictable specificity:</strong> No more{' '}
                      <CodeSpan>!important</CodeSpan> hacks or ultra-specific
                      selectors
                    </li>
                    <li>
                      <strong>Better organization:</strong> Separate reset
                      styles, design tokens, components, and utilities
                    </li>
                    <li>
                      <strong>Third-party integration:</strong> Easily control
                      where external CSS fits in your cascade
                    </li>
                    <li>
                      <strong>Team collaboration:</strong> Clear rules about
                      which styles take precedence
                    </li>
                  </ul>
                </div>

                <div className='mb-4'>
                  <Subheader>How Layers Work</Subheader>
                  <Text className='text-gray-50'>
                    CSS applies all layers in order (Layer 1, then Layer 2,
                    etc.). Each later layer only{' '}
                    <strong>
                      updates/overrides the specific properties it declares
                    </strong>{' '}
                    - properties not mentioned in later layers remain from
                    earlier layers. It's like updating an object - only the keys
                    you specify get changed, the rest stay the same.
                  </Text>

                  <Callout>
                    <strong>Example:</strong> If Layer 1 sets{' '}
                    <CodeSpan>color: blue; font-size: 16px;</CodeSpan> and Layer
                    2 only sets <CodeSpan>color: red;</CodeSpan>, the final
                    result will be <CodeSpan>color: red;</CodeSpan> (overridden)
                    and <CodeSpan>font-size: 16px;</CodeSpan> (inherited from
                    Layer 1).
                  </Callout>
                </div>

                <Callout className='!border-yellow-500 !bg-yellow-900/50 !p-3 mt-4'>
                  <strong>Senior Note:</strong> Cascade layers also support
                  nesting and anonymous layers. You can create sub-layers like{' '}
                  <CodeSpan>@layer components.buttons</CodeSpan> for even more
                  granular control. Anonymous layers (just{' '}
                  <CodeSpan>@layer</CodeSpan> without a name) are useful for
                  isolating third-party CSS without affecting your named layer
                  order.
                </Callout>

                {(() => {
                  const cascadeLayersCode = dedent /* CSS */`/* Cascade Layers for Design System */
                    @layer reset, design-tokens, components, utilities;

                    @layer design-tokens {
                      :root {
                        /* Color tokens */
                        --color-primary: #007acc;
                        --color-secondary: #ff6b6b;
                        --color-neutral-100: #f8f9fa;
                        --color-neutral-900: #1a1a1a;

                        /* Spacing tokens */
                        --space-xs: 0.25rem;
                        --space-sm: 0.5rem;
                        --space-md: 1rem;
                        --space-lg: 1.5rem;
                        --space-xl: 2rem;

                        /* Typography tokens */
                        --font-size-sm: 0.875rem;
                        --font-size-base: 1rem;
                        --font-size-lg: 1.125rem;
                        --font-size-xl: 1.25rem;

                        /* Border radius tokens */
                        --radius-sm: 0.25rem;
                        --radius-md: 0.5rem;
                        --radius-lg: 1rem;
                      }
                    }

                    @layer components {
                      .card {
                        background: var(--color-neutral-100);
                        padding: var(--space-lg);
                        border-radius: var(--radius-md);
                        margin-bottom: var(--space-md);
                      }

                      .button {
                        background: var(--color-primary);
                        color: white;
                        padding: var(--space-sm) var(--space-md);
                        border: none;
                        border-radius: var(--radius-sm);
                        font-size: var(--font-size-base);
                      }
                    }

                    @layer utilities {
                      .text-center { text-align: center; }
                      .mb-0 { margin-bottom: 0; }
                      .p-0 { padding: 0; }
                    }`;

                  return (
                    <CodeBlock
                      code={cascadeLayersCode}
                      comment='Cascade Layers with Design Tokens'
                      language='css'
                      showLineNumbers={true}
                    />
                  );
                })()}
              </div>

              <div>
                <Header>Print Styles & Color Scheme</Header>

                <Text>
                  CSS allows you to adapt your website for different contexts,
                  such as printing or user color preferences (light/dark mode).
                  This ensures your site is accessible, readable, and visually
                  appealing in all scenarios.
                </Text>
                <Text>
                  <b>Print styles</b> let you hide navigation or interactive
                  elements, optimize typography for paper, and even show link
                  URLs so users can reference them offline.{' '}
                </Text>
                <Text>
                  <b>Color scheme media queries</b> let your site automatically
                  match the user's system preference for light or dark mode,
                  improving comfort and accessibility.
                </Text>

                {(() => {
                  const printStylesCode = dedent /* CSS */`/* Print Styles */
                    @media print {
                      /* Hide navigation and interactive elements */
                      .navbar,
                      .sidebar,
                      .floating-action-button {
                        display: none;
                      }

                      /* Optimize typography for print */
                      body {
                        font-size: 12pt;
                        line-height: 1.4;
                        color: black;
                        background: white;
                      }

                      /* Show link URLs in print */
                      a[href]:after {
                        content: " (" attr(href) ")";
                        color: #666;
                        font-size: 0.8em;
                      }

                      /* Page breaks */
                      .page-break {
                        page-break-before: always;
                      }
                    }

                    /* Color Scheme Preferences */
                    @media (prefers-color-scheme: dark) {
                      :root {
                        --background: #1a1a1a;
                        --text: #ffffff;
                        --border: #333333;
                      }
                    }

                    @media (prefers-color-scheme: light) {
                      :root {
                        --background: #ffffff;
                        --text: #000000;
                        --border: #e0e0e0;
                      }
                    }`;

                  const printExampleCode = dedent /* HTML */`
                    <!-- Example HTML for print styles and color scheme -->
                    <nav class="navbar">Site Navigation</nav>
                    <aside class="sidebar">Sidebar</aside>
                    <button class="floating-action-button" type="button">+</button>
                    <main>
                      <h1>Article Title</h1>
                      <p>Read more at <a href="https://example.com">example.com</a></p>
                      <div class="page-break"></div>
                      <p>Next page content...</p>
                    </main>
                  `;

                  return (
                    <>
                      <CodeBlock
                        code={printStylesCode}
                        comment='Print Styles & Color Scheme'
                        language='css'
                        showLineNumbers={true}
                      />
                      <CodeBlock
                        code={printExampleCode}
                        comment='Example HTML'
                        language='html'
                        showLineNumbers={true}
                      />
                    </>
                  );
                })()}
              </div>

              <div>
                <Header>Interactive Demo: :has() Selector</Header>
                <Text>
                  The <CodeSpan>:has()</CodeSpan> selector allows parent
                  elements to be styled based on their children, creating
                  powerful interactive patterns. For example, you can style a
                  card to change color when a checkbox is checked. This is
                  useful for creating interactive components like accordions or
                  collapsible sections.
                </Text>
                <Text>
                  Here is an example of such a card. When the checkbox is
                  checked, the card changes color and scales up.
                </Text>

                <div className='not-prose mt-6'>
                  <div className='interactive-card-demo'>
                    <div className='interactive-card'>
                      <input
                        className='card-checkbox'
                        id='card-toggle'
                        type='checkbox'
                      />
                      <label className='card-label' htmlFor='card-toggle'>
                        <h3 className='mb-2 font-semibold text-lg'>
                          Interactive Card
                        </h3>
                        <p className='text-gray-300'>
                          Check the box to see the card transform!
                        </p>
                      </label>
                    </div>
                  </div>

                  <style jsx>{`
                    .interactive-card {
                      background: #3f3f46;
                      border: 2px solid #52525b;
                      border-radius: 0.5rem;
                      padding: 1.5rem;
                      transition: all 0.3s ease;
                      cursor: pointer;
                      margin: 1rem 0;
                    }

                    /* Reduce motion for users who prefer it */
                    @media (prefers-reduced-motion: reduce) {
                      .interactive-card {
                        transition: none;
                      }
                    }

                    .card-checkbox {
                      position: absolute;
                      opacity: 0;
                      pointer-events: none;
                    }

                    .card-label {
                      display: block;
                      cursor: pointer;
                    }

                    /* Style card when checkbox is checked using :has() */
                    .interactive-card:has(.card-checkbox:checked) {
                      background: #eab308;
                      color: #18181b;
                      transform: scale(1.02);
                      box-shadow: 0 8px 32px rgba(234, 179, 8, 0.3);
                      border-color: #facc15;
                    }

                    .interactive-card:has(.card-checkbox:checked) h3 {
                      color: #18181b;
                    }

                    .interactive-card:has(.card-checkbox:checked) p {
                      color: #27272a;
                    }

                    /* Fallback for browsers without :has() support */
                    @supports not selector(:has(*)) {
                      .card-checkbox:checked + .card-label {
                        background: #eab308;
                        color: #18181b;
                        border-radius: 0.5rem;
                        padding: 1.5rem;
                        margin: -1.5rem;
                      }
                    }

                    /* Focus styles for accessibility */
                    .card-checkbox:focus + .card-label {
                      outline: 2px solid #eab308;
                      outline-offset: 2px;
                    }
                  `}</style>
                </div>

                <Text className='mb-4' variant='muted'>
                  <strong>How it works:</strong> The <CodeSpan>:has()</CodeSpan>{' '}
                  selector checks if the parent element contains a specific
                  child element in a certain state. In this case,{' '}
                  <CodeSpan>
                    .interactive-card:has(.card-checkbox:checked)
                  </CodeSpan>{' '}
                  means "style the card when it contains a checked checkbox".
                  This lets parent elements react to their children's state
                  without JavaScript.
                </Text>

                {(() => {
                  const hasDemo = dedent /* HTML */`<!-- Interactive Card Demo - Click the card to see it transform -->
                    <div class="interactive-card-demo">
                      <div class="interactive-card">
                        <input type="checkbox" id="card-toggle" class="card-checkbox" />
                        <label for="card-toggle" class="card-label">
                          <h3>Interactive Card</h3>
                          <p>Check the box to see the card transform!</p>
                        </label>
                      </div>
                    </div>

                    <style>
                      .interactive-card {
                        background: #3f3f46;          /* zinc-700 */
                        border: 2px solid #52525b;    /* zinc-600 */
                        border-radius: 0.5rem;
                        padding: 1.5rem;
                        transition: all 0.3s ease;
                        cursor: pointer;
                        margin: 1rem 0;
                      }

                      /* Hide the actual checkbox - we use the label for clicking */
                      .card-checkbox {
                        position: absolute;
                        opacity: 0;
                        pointer-events: none;
                      }

                      .card-label {
                        display: block;
                        cursor: pointer;
                      }

                      /* 🎯 THE MAGIC: Parent styles based on child state */
                      .interactive-card:has(.card-checkbox:checked) {
                        background: #eab308;                    /* yellow-500 */
                        color: #18181b;                         /* zinc-900 for contrast */
                        transform: scale(1.02);                 /* Slight scale up */
                        box-shadow: 0 8px 32px rgba(234, 179, 8, 0.3);  /* Yellow glow */
                        border-color: #facc15;                  /* yellow-400 */
                      }

                      /* Style text specifically when card is checked */
                      .interactive-card:has(.card-checkbox:checked) h3 {
                        color: #18181b;  /* Dark text for contrast on yellow */
                      }

                      .interactive-card:has(.card-checkbox:checked) p {
                        color: #27272a;  /* Slightly lighter dark text */
                      }

                      /* Fallback for browsers without :has() support (older browsers) */
                      @supports not selector(:has(*)) {
                        .card-checkbox:checked + .card-label {
                          background: #eab308;
                          color: #18181b;
                          border-radius: 0.5rem;
                          padding: 1.5rem;
                          margin: -1.5rem;
                        }
                      }

                      /* Accessibility: Focus styles for keyboard navigation */
                      .card-checkbox:focus + .card-label {
                        outline: 2px solid #eab308;
                        outline-offset: 2px;
                      }

                      /* Respect user motion preferences */
                      @media (prefers-reduced-motion: reduce) {
                        .interactive-card {
                          transition: none;
                        }
                      }
                    </style>

                    <!-- Key Benefits of :has() selector:
                         ✅ No JavaScript needed for interactivity
                         ✅ Parent elements can react to child state
                         ✅ Perfect for accordions, cards, form validation
                         ✅ More semantic than complex CSS tricks
                         ✅ Works with any form elements (checkbox, radio, input)
                    -->`;

                  return (
                    <CodeBlock
                      code={hasDemo}
                      comment='Interactive :has() Demo - Actual Implementation'
                      language='html'
                      showLineNumbers={true}
                    />
                  );
                })()}
              </div>
            </div>
          </SectionCard>

          <SectionCard title='CSS Fundamentals'>
            <div className='space-y-6'>
              <div>
                <Header>Box Model & Reset</Header>
                <Text>
                  The box model defines how browsers calculate element sizes and
                  spacing, while CSS resets eliminate inconsistent browser
                  defaults.
                </Text>

                <div className='mb-4'>
                  <Subheader>What is the Box Model?</Subheader>
                  <Text variant='muted'>
                    Every HTML element is essentially a rectangular box. The box
                    model defines how the browser calculates the total space an
                    element occupies, consisting of four areas:
                  </Text>
                  <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
                    <li>
                      <strong>Content:</strong> The actual content (text,
                      images, etc.)
                    </li>
                    <li>
                      <strong>Padding:</strong> Space between content and border
                      (inside the element)
                    </li>
                    <li>
                      <strong>Border:</strong> The border around the padding and
                      content
                    </li>
                    <li>
                      <strong>Margin:</strong> Space outside the border (between
                      elements)
                    </li>
                  </ul>
                </div>

                <div className='mb-4'>
                  <Subheader>The Problem: Two Box Models</Subheader>
                  <Text variant='muted'>
                    By default, browsers use the <strong>content-box</strong>{' '}
                    model, where width/height only applies to content. This
                    creates confusion because adding padding or borders makes
                    elements larger than expected.
                  </Text>
                  <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
                    <li>
                      <strong>content-box (default):</strong> Total width =
                      width + padding + border
                    </li>
                    <li>
                      <strong>border-box (preferred):</strong> Total width =
                      width (includes padding + border)
                    </li>
                  </ul>
                  <Callout className='mt-4'>
                    <strong>Why border-box is better:</strong> When you set
                    width: 300px, the element is exactly 300px wide regardless
                    of padding or borders. This makes layouts predictable and
                    responsive design much easier.
                  </Callout>
                </div>

                <div className='mb-4'>
                  <Subheader>Why We Need CSS Resets</Subheader>
                  <Text variant='muted'>
                    Different browsers have different default styles for HTML
                    elements. Without a reset, your site might look different
                    across browsers because:
                  </Text>
                  <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
                    <li>
                      Browsers add different margins/padding to headings,
                      paragraphs, lists
                    </li>
                    <li>Font sizes and line heights vary between browsers</li>
                    <li>Some browsers style form elements differently</li>
                    <li>
                      Image display and sizing behavior can be inconsistent
                    </li>
                  </ul>
                  <Text className='mt-2' variant='muted'>
                    <strong>CSS resets solve this</strong> by either removing
                    all default styles (hard reset) or applying consistent
                    styles across browsers (normalize approach).
                  </Text>
                </div>

                {(() => {
                  const boxModelCode = dedent /* CSS */`/* Universal Box Model Reset - Apply to ALL elements */
                    *,
                    *::before,
                    *::after {
                      box-sizing: border-box;  /* Makes width/height include padding + border */
                    }

                    /* Modern CSS Reset (Josh Comeau style) */
                    * {
                      margin: 0;
                      padding: 0;
                    }

                    body {
                      font-family: system-ui, -apple-system, sans-serif;
                      line-height: 1.6;
                      color: #333;
                      /* Improved font rendering */
                      -webkit-font-smoothing: antialiased;
                      -moz-osx-font-smoothing: grayscale;
                    }

                    /* Make images responsive by default */
                    img,
                    picture,
                    video,
                    canvas,
                    svg {
                      display: block;
                      max-width: 100%;
                      height: auto;  /* Maintain aspect ratio */
                    }

                    /* Form elements inherit typography */
                    input,
                    button,
                    textarea,
                    select {
                      font: inherit;
                      color: inherit;
                    }

                    /* Remove default list styles */
                    ul, ol {
                      list-style: none;
                    }

                    /* Remove default button styles */
                    button {
                      background: none;
                      border: none;
                      cursor: pointer;
                    }

                    /* Box Model Demonstration */
                    
                    /* ❌ content-box (default) - confusing behavior */
                    .content-box-example {
                      box-sizing: content-box;
                      width: 200px;           /* Content width only */
                      padding: 20px;          /* Added to width */
                      border: 5px solid red;  /* Added to width */
                      margin: 10px;           /* Doesn't affect element size */
                      
                      /* Total width = 200px + 40px padding + 10px border = 250px! */
                      /* This is why layouts break when you add padding */
                    }

                    /* ✅ border-box (preferred) - predictable behavior */
                    .border-box-example {
                      box-sizing: border-box;
                      width: 200px;           /* Total width including padding + border */
                      padding: 20px;          /* Included in width */
                      border: 5px solid green; /* Included in width */
                      margin: 10px;           /* Still doesn't affect element size */
                      
                      /* Total width = exactly 200px */
                      /* Content width = 200px - 40px padding - 10px border = 150px */
                    }

                    /* Why this matters for responsive design */
                    .responsive-grid {
                      display: grid;
                      grid-template-columns: repeat(3, 1fr);
                      gap: 20px;
                    }

                    .grid-item {
                      /* With border-box, padding doesn't break the grid */
                      padding: 20px;
                      border: 2px solid #ddd;
                      background: #f5f5f5;
                      /* Items stay exactly 1fr wide regardless of padding/border */
                    }`;

                  return (
                    <CodeBlock
                      code={boxModelCode}
                      comment='Box Model & Modern CSS Reset'
                      language='css'
                      showLineNumbers={true}
                    />
                  );
                })()}
              </div>

              <div>
                <Header>CSS Variables (Custom Properties)</Header>
                <Text>
                  CSS variables enable dynamic theming and make maintaining
                  consistent design systems much easier.
                </Text>

                {(() => {
                  const cssVariablesCode = dedent /* CSS */`/* CSS Variables for Theming */
                    :root {
                      /* Define global variables */
                      --primary-color: #007acc;
                      --secondary-color: #ff6b6b;
                      --text-color: #333;
                      --background-color: #ffffff;
                      --border-radius: 8px;
                      --spacing-unit: 1rem;

                      /* Typography scale */
                      --font-size-small: 0.875rem;
                      --font-size-base: 1rem;
                      --font-size-large: 1.25rem;
                      --font-size-xl: 1.5rem;
                    }

                    /* Dark theme override */
                    [data-theme="dark"] {
                      --text-color: #ffffff;
                      --background-color: #1a1a1a;
                      --primary-color: #4da6ff;
                    }

                    /* Using variables */
                    .button {
                      background: var(--primary-color);
                      color: var(--background-color);
                      padding: calc(var(--spacing-unit) * 0.5) var(--spacing-unit);
                      border: none;
                      border-radius: var(--border-radius);
                      font-size: var(--font-size-base);
                    }

                    .button:hover {
                      background: var(--secondary-color);
                    }

                    /* Component-level variables */
                    .card {
                      --card-padding: calc(var(--spacing-unit) * 1.5);
                      --card-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

                      padding: var(--card-padding);
                      box-shadow: var(--card-shadow);
                      border-radius: var(--border-radius);
                    }`;

                  return (
                    <CodeBlock
                      code={cssVariablesCode}
                      comment='CSS Variables & Theming'
                      language='css'
                      showLineNumbers={true}
                    />
                  );
                })()}
              </div>

              <div>
                <Header>Cascade & Specificity</Header>
                <Text>
                  Understanding how CSS selectors are weighted helps avoid
                  specificity conflicts and creates more maintainable code. You
                  can try to play this game to have practical experience with
                  selecting elements in CSS.{' '}
                  <a
                    className='text-yellow-500'
                    href='https://flukeout.github.io/'
                    rel='noopener'
                    target='_blank'
                  >
                    Link
                  </a>
                </Text>

                {(() => {
                  const specificityCode = dedent /* CSS */`/* Specificity Weights (from lowest to highest) */

                    /* Universal selector: 0 points */
                    * {
                      color: gray;
                    }

                    /* Element selector: 1 point */
                    p {
                      color: blue;
                    }

                    /* Class selector: 10 points */
                    .text {
                      color: green;
                    }

                    /* ID selector: 100 points */
                    #main-text {
                      color: red;
                    }

                    /* Inline style: 1000 points */
                    /* style="color: purple" */

                    /* !important: 10000 points (avoid when possible) */
                    .emergency {
                      color: orange !important;
                    }

                    /* Best practices to avoid specificity wars */

                    /* ❌ Avoid deeply nested selectors */
                    .header .navigation .menu .item .link {
                      color: blue;
                    }

                    /* ✅ Use single class selectors */
                    .nav-link {
                      color: blue;
                    }

                    /* ❌ Avoid IDs for styling */
                    #header {
                      background: blue;
                    }

                    /* ✅ Use classes instead */
                    .header {
                      background: blue;
                    }

                    /* ✅ Use CSS layers for predictable cascade */
                    @layer base, components, utilities;

                    @layer base {
                      p { color: blue; }
                    }

                    @layer components {
                      .text { color: green; } /* This wins despite lower specificity */
                    }`;

                  return (
                    <CodeBlock
                      code={specificityCode}
                      comment='Cascade & Specificity'
                      language='css'
                      showLineNumbers={true}
                    />
                  );
                })()}
              </div>

              <div>
                <Header>Pseudo-classes & Pseudo-elements</Header>
                <Text>
                  Pseudo-classes and pseudo-elements add interactivity and
                  decorative elements without additional markup. Used for
                  creating dynamic, accessible interfaces and reducing HTML
                  clutter.
                </Text>

                <div className='mb-4'>
                  <Subheader>Understanding the Difference</Subheader>
                  <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
                    <li>
                      <strong>Pseudo-classes (single colon `:`):</strong> Target
                      elements in specific states (hover, focus, visited, etc.)
                    </li>
                    <li>
                      <strong>Pseudo-elements (double colon `::`):</strong>{' '}
                      Create virtual elements that don't exist in HTML (before,
                      after, first-letter, etc.)
                    </li>
                  </ul>
                  <Callout className='mt-4'>
                    <strong>Memory tip:</strong> Pseudo-classes select existing
                    elements in different states. Pseudo-elements create new
                    "fake" elements in your CSS.
                  </Callout>
                </div>

                <div className='mb-4'>
                  <Subheader>Common Pseudo-classes</Subheader>
                  <div className='mb-3'>
                    <Text variant='muted'>
                      <strong>Interactive States:</strong>
                    </Text>
                    <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
                      <li>
                        <CodeSpan>:hover</CodeSpan> - Mouse over element
                      </li>
                      <li>
                        <CodeSpan>:focus</CodeSpan> - Element has keyboard focus
                      </li>
                      <li>
                        <CodeSpan>:active</CodeSpan> - Element is being clicked
                      </li>
                      <li>
                        <CodeSpan>:visited</CodeSpan> - Link has been visited
                      </li>
                      <li>
                        <CodeSpan>:disabled</CodeSpan> - Form element is
                        disabled
                      </li>
                    </ul>
                  </div>
                  <div className='mb-3'>
                    <Text variant='muted'>
                      <strong>Structural Selectors:</strong>
                    </Text>
                    <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
                      <li>
                        <CodeSpan>:first-child</CodeSpan> - First child element
                      </li>
                      <li>
                        <CodeSpan>:last-child</CodeSpan> - Last child element
                      </li>
                      <li>
                        <CodeSpan>:nth-child(n)</CodeSpan> - Nth child element
                      </li>
                      <li>
                        <CodeSpan>:nth-of-type(n)</CodeSpan> - Nth element of
                        same type
                      </li>
                      <li>
                        <CodeSpan>:not(selector)</CodeSpan> - Elements that
                        don't match selector
                      </li>
                    </ul>
                  </div>
                  <div className='mb-3'>
                    <Text variant='muted'>
                      <strong>Form States:</strong>
                    </Text>
                    <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
                      <li>
                        <CodeSpan>:valid</CodeSpan> - Form input is valid
                      </li>
                      <li>
                        <CodeSpan>:invalid</CodeSpan> - Form input is invalid
                      </li>
                      <li>
                        <CodeSpan>:required</CodeSpan> - Form input is required
                      </li>
                      <li>
                        <CodeSpan>:checked</CodeSpan> - Checkbox/radio is
                        checked
                      </li>
                      <li>
                        <CodeSpan>:placeholder-shown</CodeSpan> - Input showing
                        placeholder
                      </li>
                    </ul>
                  </div>
                </div>

                <div className='mb-4'>
                  <Subheader>Common Pseudo-elements</Subheader>
                  <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
                    <li>
                      <CodeSpan>::before</CodeSpan> - Insert content before
                      element
                    </li>
                    <li>
                      <CodeSpan>::after</CodeSpan> - Insert content after
                      element
                    </li>
                    <li>
                      <CodeSpan>::first-letter</CodeSpan> - Style first letter
                    </li>
                    <li>
                      <CodeSpan>::first-line</CodeSpan> - Style first line
                    </li>
                    <li>
                      <CodeSpan>::placeholder</CodeSpan> - Style input
                      placeholder text
                    </li>
                    <li>
                      <CodeSpan>::selection</CodeSpan> - Style selected text
                    </li>
                  </ul>
                  <Callout className='mt-4'>
                    <strong>Important:</strong> <CodeSpan>::before</CodeSpan>{' '}
                    and <CodeSpan>::after</CodeSpan> pseudo-elements require the{' '}
                    <CodeSpan>content</CodeSpan> property to work, even if it's
                    empty: <CodeSpan>content: "";</CodeSpan>
                  </Callout>
                </div>

                {(() => {
                  const pseudoCode = dedent /* CSS */`/* PSEUDO-CLASSES - Target elements in specific states */

                    /* Interactive states */
                    button:hover { background: blue; }
                    button:focus { outline: 2px solid blue; }
                    button:active { transform: scale(0.95); }

                    /* Structural selectors */
                    li:first-child { margin-top: 0; }
                    li:last-child { margin-bottom: 0; }
                    tr:nth-child(even) { background: #f5f5f5; }
                    p:not(:first-child) { margin-top: 1rem; }

                    /* Form states */
                    input:valid { border-color: green; }
                    input:invalid { border-color: red; }
                    input:checked + label { font-weight: bold; }

                    /* PSEUDO-ELEMENTS - Create virtual elements */

                    /* Add content before/after elements */
                    .icon::before {
                      content: "★";  /* Required property for ::before/::after */
                      margin-right: 0.5rem;
                    }

                    .link::after {
                      content: " →";
                      color: blue;
                    }

                    /* Decorative elements */
                    .quote::before {
                      content: """;
                      font-size: 2em;
                      color: gray;
                    }

                    /* Typography effects */
                    .article::first-letter {
                      font-size: 3em;
                      float: left;
                    }

                    /* Style selected text */
                    ::selection {
                      background: yellow;
                      color: black;
                    }

                    /* Usage examples:
                       <button>Click me</button>     → :hover, :focus, :active
                       <ul><li>Item 1</li></ul>      → :first-child, :last-child
                       <input type="email">          → :valid, :invalid
                       <span class="icon">Star</span> → ::before adds ★
                    */`;

                  return (
                    <CodeBlock
                      code={pseudoCode}
                      comment='Essential Pseudo-classes & Pseudo-elements'
                      language='css'
                      showLineNumbers={true}
                    />
                  );
                })()}
              </div>
            </div>
          </SectionCard>

          <SectionCard title='Forms & Accessibility'>
            <div className='space-y-6'>
              <div>
                <Header>Semantic Forms</Header>
                <Text>
                  Properly structured forms with semantic HTML improve
                  accessibility and user experience across all devices.
                </Text>
                <Text>
                  Semantic forms use the correct HTML elements, like{' '}
                  <CodeSpan>&lt;form&gt;</CodeSpan>,{' '}
                  <CodeSpan>&lt;label&gt;</CodeSpan>,{' '}
                  <CodeSpan>&lt;input&gt;</CodeSpan>,{' '}
                  <CodeSpan>&lt;fieldset&gt;</CodeSpan>, and{' '}
                  <CodeSpan>&lt;legend&gt;</CodeSpan>, to describe the purpose
                  and structure of each part of the form. This helps screen
                  readers and assistive technologies understand how to interact
                  with the form, making it easier for everyone to use.
                </Text>
                <Text>
                  For example, always use a <CodeSpan>&lt;label&gt;</CodeSpan>{' '}
                  for each input so users know what information to enter. Group
                  related fields with <CodeSpan>&lt;fieldset&gt;</CodeSpan> and
                  describe the group with a <CodeSpan>&lt;legend&gt;</CodeSpan>.
                  This is especially important for users who rely on keyboard
                  navigation or screen readers.
                </Text>
                <Text>
                  Using semantic HTML also makes your forms easier to style and
                  maintain, and helps browsers provide helpful features like
                  autofill and validation. Remember: good form structure is not
                  just about looks - it's about making your site usable for
                  everyone.
                </Text>

                {(() => {
                  const formsCode = dedent /* HTML */`<!-- Essential Semantic Form Structure -->
                    <form>
                      <!-- Group related fields -->
                      <fieldset>
                        <legend>Contact Information</legend>

                        <!-- Proper label association -->
                        <label for="name">Full Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          aria-describedby="name-error"
                        />
                        <div id="name-error" role="alert"><!-- Error message --></div>

                        <!-- Input with help text -->
                        <label for="email">Email *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          aria-describedby="email-help"
                        />
                        <div id="email-help">We'll never share your email</div>

                        <!-- Textarea with placeholder -->
                        <label for="message">Message</label>
                        <textarea
                          id="message"
                          name="message"
                          placeholder="Tell us how we can help..."
                        ></textarea>

                        <!-- Checkbox after input -->
                        <input type="checkbox" id="newsletter" name="newsletter" />
                        <label for="newsletter">Subscribe to newsletter</label>

                        <button type="submit">Send Message</button>
                      </fieldset>
                    </form>

                    <!-- Key Accessibility Features:
                         ✅ <fieldset> groups related form controls
                         ✅ <legend> provides group description
                         ✅ <label for="id"> associates labels with inputs
                         ✅ type="email" provides validation
                         ✅ required attribute for required fields
                         ✅ aria-describedby links to help/error text
                         ✅ role="alert" announces errors to screen readers
                         ✅ Checkbox comes before its label (common pattern)
                    -->`;

                  return (
                    <CodeBlock
                      code={formsCode}
                      comment='Essential Semantic Forms'
                      language='html'
                      showLineNumbers={true}
                    />
                  );
                })()}
              </div>

              <div>
                <Header>Focus Management & Contrast</Header>
                <Text>
                  Proper focus management and color contrast ensure your site is
                  accessible to users with disabilities and meets WCAG 2.1
                  standards.
                </Text>
                <Text>
                  <strong>Focus management</strong> is about making sure users
                  can navigate your site using only a keyboard. This includes
                  people who can't use a mouse, use screen readers, or have
                  motor disabilities. Every interactive element should be
                  reachable and clearly show when it has focus.
                </Text>
                <Text>
                  <strong>Color contrast</strong> ensures text is readable for
                  people with visual impairments, including color blindness and
                  low vision. WCAG requires minimum contrast ratios: 4.5:1 for
                  normal text and 3:1 for large text (18pt+) and UI components.
                </Text>
                <Text>
                  Good accessibility isn't just for users with disabilities - it
                  makes your site better for everyone. Clear focus indicators
                  help all users see where they are, and good contrast improves
                  readability in bright sunlight or on poor-quality screens.
                </Text>

                {(() => {
                  const a11yCode = dedent /* CSS */`/* FOCUS MANAGEMENT - Make keyboard navigation visible */

                    /* Essential: Visible focus indicators */
                    button:focus,
                    input:focus,
                    a:focus {
                      outline: 2px solid blue;
                      outline-offset: 2px;
                    }

                    /* Skip links - Hidden until focused */
                    .skip-link {
                      position: absolute;
                      top: -40px;  /* Hidden off-screen */
                      left: 10px;
                    }

                    .skip-link:focus {
                      top: 10px;   /* Visible when focused */
                    }

                    /* COLOR CONTRAST - WCAG Requirements */

                    /* ✅ Good contrast (4.5:1 ratio minimum) */
                    .good-contrast {
                      background: white;
                      color: #333;     /* Passes WCAG AA */
                    }

                    /* ❌ Poor contrast (fails WCAG) */
                    .poor-contrast {
                      background: white;
                      color: #ccc;     /* Only 1.6:1 ratio - too low! */
                    }

                    /* MOTION PREFERENCES - Respect user settings */
                    @media (prefers-reduced-motion: reduce) {
                      * {
                        animation: none !important;
                        transition: none !important;
                      }
                    }

                    /* Usage in HTML:
                       <a href="#main" class="skip-link">Skip to content</a>
                       <button>Focusable button</button>
                       
                       Test accessibility:
                       - Tab through all interactive elements
                       - Check color contrast with tools
                       - Respect motion preferences
                    */`;

                  return (
                    <CodeBlock
                      code={a11yCode}
                      comment='Essential Focus Management & Contrast'
                      language='css'
                      showLineNumbers={true}
                    />
                  );
                })()}
              </div>
            </div>
          </SectionCard>

          <SectionCard title='Animations & Micro-interactions'>
            <div className='space-y-6'>
              <div>
                <Header>CSS Transitions & Animations</Header>
                <Text>
                  <strong>Transitions</strong> animate changes between two
                  states when triggered by user interactions (hover, focus,
                  click). They're perfect for button hovers, form validation
                  feedback, and menu toggles. Transitions make interfaces feel
                  responsive and alive.
                </Text>
                <Text>
                  <strong>Animations</strong> are more complex, multi-step
                  sequences that can run automatically or be triggered. Use them
                  for loading indicators, page entrances, and drawing attention
                  to important content. Good animations guide users and provide
                  helpful feedback.
                </Text>
                <Text>
                  <strong>Micro-interactions</strong> are small, functional
                  animations that accomplish a single task - like a button
                  changing color on hover or a form field highlighting when
                  focused. They make interfaces feel polished and help users
                  understand what's happening.
                </Text>

                {(() => {
                  const animationsCode = dedent /* CSS */`/* TRANSITIONS - Animate between states */

                    /* Basic transition syntax */
                    button {
                      background: blue;
                      transition: background 0.3s ease;  /* property duration timing */
                    }

                    button:hover {
                      background: red;  /* Smoothly animates from blue to red */
                    }

                    /* Micro-interactions - Button feedback */
                    .button {
                      transition: transform 0.2s ease;
                    }

                    .button:hover {
                      transform: scale(1.05);  /* Slightly larger on hover */
                    }

                    /* KEYFRAME ANIMATIONS - Multi-step sequences */

                    /* Define animation steps */
                    @keyframes fadeIn {
                      from { opacity: 0; }
                      to   { opacity: 1; }
                    }

                    /* Apply animation */
                    .fade-in {
                      animation: fadeIn 0.5s ease-out;
                    }

                    /* Loading spinner animation */
                    @keyframes spin {
                      to { transform: rotate(360deg); }
                    }

                    .spinner {
                      animation: spin 1s linear infinite;
                    }

                    /* ACCESSIBILITY - Respect user preferences */
                    @media (prefers-reduced-motion: reduce) {
                      * {
                        animation: none !important;
                        transition: none !important;
                      }
                    }

                    /* Performance Tips:
                       - Only animate: transform, opacity, filter
                       - Avoid: width, height, top, left (cause layout shifts)
                       - Keep micro-interactions under 300ms
                       - Always include prefers-reduced-motion
                    */`;

                  return (
                    <CodeBlock
                      code={animationsCode}
                      comment='Essential Animations & Transitions'
                      language='css'
                      showLineNumbers={true}
                    />
                  );
                })()}
              </div>

              <div>
                <Header>Performance Considerations</Header>
                <Text>
                  Optimize animations and critical CSS for the best user
                  experience and performance scores.
                </Text>

                <Subheader>
                  <strong>Animation Best Practices:</strong>
                </Subheader>
                <ul className='mt-2 list-inside list-disc space-y-1'>
                  <li>
                    Only animate properties that don't cause layout
                    recalculation: <CodeSpan>transform</CodeSpan>,{' '}
                    <CodeSpan>opacity</CodeSpan>, <CodeSpan>filter</CodeSpan>
                  </li>
                  <li>
                    Use <CodeSpan>transform</CodeSpan> instead of changing{' '}
                    <CodeSpan>top</CodeSpan>, <CodeSpan>left</CodeSpan>,{' '}
                    <CodeSpan>width</CodeSpan>, <CodeSpan>height</CodeSpan>
                  </li>
                  <li>
                    Keep animations under 300ms for micro-interactions, 600ms
                    for larger transitions
                  </li>
                  <li>
                    Always provide <CodeSpan>prefers-reduced-motion</CodeSpan>{' '}
                    alternatives
                  </li>
                  <li>
                    Use <CodeSpan>will-change</CodeSpan> sparingly and remove it
                    after animation completes
                  </li>
                </ul>
              </div>
            </div>
          </SectionCard>

          <SectionCard title='Advanced Topics'>
            <div className='space-y-6'>
              <div>
                <Header>CSS Subgrid</Header>
                <Text>
                  <strong>Subgrid</strong> lets a nested grid container use the
                  row or column tracks of its parent grid. This allows child
                  elements to align exactly with the parent’s grid lines, making
                  complex layouts (like cards, forms, or nested components)
                  consistent and easy to maintain.
                </Text>
                <Text>
                  <strong>Why use subgrid?</strong> It enables perfect alignment
                  across nested layouts and keeps your design system consistent,
                  especially for card layouts, forms, and reusable UI components
                  that need to line up with the main page grid.
                </Text>
                <Text>
                  <strong>Example:</strong> The card content below aligns with
                  the parent grid columns using <CodeSpan>subgrid</CodeSpan>.
                </Text>
                {(() => {
                  const subgridExample = dedent /* HTML */`
                    <!-- Parent grid with 3 columns -->
                    <div class="parent-grid">
                      <!-- Card uses subgrid to align with parent columns -->
                      <div class="card">
                        <div class="card-header">Card Title</div>
                        <div class="card-content">Card content aligns with parent grid columns.</div>
                      </div>
                    </div>
                  `;
                  const subgridCSS = dedent /* CSS */`
                    /* Parent grid defines 3 columns */
                    .parent-grid {
                      display: grid;
                      grid-template-columns: 1fr 2fr 1fr;
                    }

                    /* Card uses subgrid to inherit parent columns */
                    .card {
                      display: grid;
                      grid-template-columns: subgrid; /* Inherit columns from parent */
                      grid-column: 1 / -1; /* Span all parent columns */
                    }

                    /* Card header spans all columns */
                    .card-header {
                      grid-column: 1 / 4;
                    }

                    /* Card content starts at 2nd column and spans to 3rd */
                    .card-content {
                      grid-column: 2 / 4;
                    }

                    /* Fallback for browsers that don't support subgrid */
                    @supports not (grid-template-columns: subgrid) {
                      .card {
                        grid-template-columns: 1fr 2fr 1fr;
                      }
                    }
                  `;
                  return (
                    <>
                      <CodeBlock
                        code={subgridExample}
                        comment='HTML: Card aligned with parent grid using subgrid'
                        language='html'
                        showLineNumbers={true}
                      />
                      <CodeBlock
                        code={subgridCSS}
                        comment='CSS: Subgrid usage (with fallback and comments)'
                        language='css'
                        showLineNumbers={true}
                      />
                    </>
                  );
                })()}
              </div>

              <div>
                <Header>View Transitions API</Header>
                <Text>
                  View Transitions API enables smooth, performant animations
                  between different page states without complex JavaScript
                  libraries. Perfect for SPA (Single Page Application)
                  navigation, modal opens/closes, and dynamic content updates.
                  The browser handles the heavy lifting of creating seamless
                  transitions between DOM states.
                </Text>
                <Text>
                  <strong>How it works:</strong> You define which elements
                  should transition using view-transition-name, then customize
                  the animation. The API captures before/after states and
                  animates between them automatically.
                </Text>
                <Callout>
                  In simple terms, it's makes smooth transitions between pages
                  and animations. But not all browsers support it yet.
                </Callout>

                {(() => {
                  const viewTransitionsCode = dedent /* CSS */`/* Name elements that should transition smoothly */
                    .page-title {
                      view-transition-name: page-title;
                    }

                    /* Customize the transition animation */
                    ::view-transition-old(page-title) {
                      animation: slide-out 0.3s ease-in;
                    }

                    ::view-transition-new(page-title) {
                      animation: slide-in 0.3s ease-out;
                    }

                    /* JavaScript to trigger transition */
                    document.startViewTransition(() => {
                      updateContent(); // Your DOM changes here
                    });`;

                  return (
                    <CodeBlock
                      code={viewTransitionsCode}
                      comment='View Transitions - Core Implementation'
                      language='css'
                      showLineNumbers={true}
                    />
                  );
                })()}
              </div>

              <div>
                <Header>SEO Fundamentals</Header>
                <Text>
                  Search Engine Optimization through proper HTML structure
                  directly impacts discoverability and user experience. Meta
                  tags, semantic HTML, and structured data help search engines
                  understand your content, while Open Graph tags control how
                  your site appears when shared on social media.
                </Text>
                <Text>
                  <strong>Critical for modern web:</strong> Mobile-first
                  indexing, Core Web Vitals, and social sharing make proper SEO
                  essential for any production website. These fundamentals
                  should be implemented from day one.
                </Text>

                {(() => {
                  const seoCode = dedent /* HTML */`<!-- Essential SEO meta tags -->
                    <title>Descriptive Page Title - Brand Name</title>
                    <meta name="description" content="Compelling 150-160 character description" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                    <!-- Open Graph for social sharing -->
                    <meta property="og:title" content="Page Title" />
                    <meta property="og:description" content="Page description" />
                    <meta property="og:image" content="https://example.com/share-image.jpg" />

                    <!-- Canonical URL prevents duplicate content issues -->
                    <link rel="canonical" href="https://example.com/this-page" />

                    <!-- Semantic HTML structure -->
                    <main>
                      <h1>Single H1 per page</h1>
                      <section>
                        <h2>Proper heading hierarchy</h2>
                        <p>Meaningful content structure...</p>
                      </section>
                    </main>`;

                  return (
                    <CodeBlock
                      code={seoCode}
                      comment='SEO Essentials - Core Implementation'
                      language='html'
                      showLineNumbers={true}
                    />
                  );
                })()}
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
