'use client';

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
import dedent from 'dedent';
import { useRouter } from 'next/navigation';

export default function HTMLCSSComponent() {
  const router = useRouter();
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

              {(() => {
                const semanticHtmlCode = dedent /* HTML */ `<!DOCTYPE html>
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
                    comment='Semantic HTML Page Structure'
                    language='html'
                    showLineNumbers={true}
                    highlightLines='4,5,10,13,15,20,24'
                    highlightLinesEnd='10,11,18,19,22,23,26'
                    code={semanticHtmlCode}
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

                {(() => {
                  const ariaExamplesCode = dedent /* HTML */ `<!-- Button with accessible label -->
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
                      comment='ARIA Examples'
                      language='html'
                      showLineNumbers={true}
                      code={ariaExamplesCode}
                    />
                  );
                })()}

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
                    <strong className='text-red-400 font-semibold'>
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
                  const tabOrderCode = dedent /* HTML */ `<!-- Custom focusable element -->
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
                      comment='Tab Order Examples'
                      language='html'
                      showLineNumbers={true}
                      code={tabOrderCode}
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

                  {(() => {
                    const altTextCode = dedent /* HTML */ `<!-- Descriptive alt text -->
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
                          comment='Alt Text Examples'
                          language='html'
                          showLineNumbers={true}
                          code={altTextCode}
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
                <ul className='list-disc list-inside space-y-2 text-gray-50'>
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
                const flexBasicsCode = dedent /* CSS */ `/* Basic Flexbox Setup */
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
                      comment='Flexbox Basics'
                      language='css'
                      showLineNumbers={true}
                      code={flexBasicsCode}
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
                  <ul className='list-disc list-inside space-y-1 text-gray-50 ml-4'>
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
                  <ul className='list-disc list-inside space-y-1 text-gray-50 ml-4'>
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
                  <p className='text-sm text-gray-400 mb-4'>
                    Used when you have multiple rows/columns (when items wrap).
                    Controls spacing between lines, not individual items.
                  </p>
                  <ul className='list-disc list-inside space-y-1 text-gray-50 ml-4'>
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
                  <p className='text-sm text-gray-400 mb-4'>
                    Overrides <CodeSpan>align-items</CodeSpan> for a single item
                    (child).
                  </p>
                  <ul className='list-disc list-inside space-y-1 text-gray-50 ml-4'>
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
                  const alignmentCode = dedent /* CSS */ `/* Centering content - Most common use case */
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
                      comment='Common Alignment Patterns'
                      language='css'
                      showLineNumbers={true}
                      highlightLines='4,5,12,13,20'
                      code={alignmentCode}
                    />
                  );
                })()}
              </div>

              <div>
                <Subheader>Flex Item Properties:</Subheader>

                <ul className='list-disc list-inside space-y-2 text-gray-50'>
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
                  const flexItemsCode = dedent /* CSS */ `/* Flexible sidebar layout */
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
                        comment='Flex Item Control'
                        language='css'
                        showLineNumbers={true}
                        highlightLines='8,13,24,28,33'
                        code={flexItemsCode}
                      />
                    </div>
                  );
                })()}
              </div>

              <div>
                <Subheader>Practical Examples:</Subheader>

                {(() => {
                  const practicalCode = dedent /* HTML */ `<!-- Complete responsive card layout -->
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
                      comment='Real-World Examples'
                      language='html'
                      showLineNumbers={true}
                      code={practicalCode}
                    />
                  );
                })()}

                <Callout className='mt-4'>
                  <strong>Pro Tips:</strong>
                </Callout>
                <ul className='list-disc list-inside mt-2 space-y-1'>
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
                <Callout>
                  <strong>Perfect for:</strong> Page layouts, card grids,
                  dashboards, magazine-style layouts, and any design where you
                  need precise control over both rows and columns. (see{' '}
                  <span
                    className='cursor-pointer text-yellow-500 hover:text-yellow-400'
                    onClick={() => router.push('/')}
                  >
                    main page
                  </span>{' '}
                  as an example of grid layout)
                </Callout>
              </div>

              <div>
                <Subheader>Key Concepts:</Subheader>
                <ul className='list-disc list-inside space-y-2 text-gray-50'>
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
                const gridBasicsCode = dedent /* CSS */ `/* Basic Grid Setup */
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
                    comment='Grid Basics'
                    language='css'
                    showLineNumbers={true}
                    code={gridBasicsCode}
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
                  <ul className='list-disc list-inside space-y-1 text-gray-50 ml-4'>
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
                  <ul className='list-disc list-inside space-y-1 text-gray-50 ml-4'>
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
                  <ul className='list-disc list-inside space-y-1 text-gray-50 ml-4'>
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
                  const gridSizingCode = dedent /* CSS */ `/* Responsive card grid */
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
                      comment='Grid Sizing Examples'
                      language='css'
                      showLineNumbers={true}
                      highlightLines='4,12,16'
                      code={gridSizingCode}
                    />
                  );
                })()}
              </div>

              <div>
                <Subheader>Grid Item Placement:</Subheader>
                <Text variant='muted' className='text-gray-200'>
                  In other words, select specific grid items and do what you
                  want with them.
                </Text>
                <ul className='list-disc list-inside space-y-2 text-gray-50'>
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
                  const gridPlacementCode = dedent /* CSS */ `/* Grid item placement */
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
                        comment='Grid Item Placement'
                        language='css'
                        showLineNumbers={true}
                        highlightLines='10,15,16,20,21,25,26,31,32'
                        code={gridPlacementCode}
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
                  const namedAreasCode = dedent /* CSS */ `/* Define layout with named areas */
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
                      comment='Named Grid Areas'
                      language='css'
                      showLineNumbers={true}
                      highlightLines='6,7,8,9,15,16,17,18,19,23,24,25,26,27,28,29,30'
                      code={namedAreasCode}
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
                  <ul className='list-disc list-inside space-y-1 text-gray-50 ml-4'>
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
                      (align-items justify-items)
                    </li>
                  </ul>
                </div>

                <div className='mb-4'>
                  <Text variant='muted'>
                    <strong>Content Alignment</strong> - Controls the entire
                    grid within the container
                  </Text>
                  <ul className='list-disc list-inside space-y-1 text-gray-50 ml-4'>
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
                  <ul className='list-disc list-inside space-y-1 text-gray-50 ml-4'>
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
                  const gridAlignmentCode = dedent /* CSS */ `/* Grid alignment examples */
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
                      comment='Grid Alignment'
                      language='css'
                      showLineNumbers={true}
                      code={gridAlignmentCode}
                    />
                  );
                })()}
              </div>

              <div>
                <Subheader>Practical Examples:</Subheader>

                {(() => {
                  const practicalGridCode = dedent /* HTML */ `<!-- Complete responsive photo gallery -->
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
                      comment='Real-World Grid Examples'
                      language='html'
                      showLineNumbers={true}
                      code={practicalGridCode}
                    />
                  );
                })()}

                <Callout className='mt-4'>
                  <strong>Pro Tips:</strong>
                </Callout>
                <ul className='list-disc list-inside mt-2 space-y-1'>
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
