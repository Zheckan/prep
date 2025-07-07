'use client';

import dedent from 'dedent';
import {
  Callout,
  CodeBlock,
  CodeSpan,
  Header,
  SectionCard,
  Subheader,
  Text,
} from '@/components';

export function CssFlexbox() {
  return (
    <SectionCard title='CSS Flexbox'>
      <div className='space-y-6'>
        <div>
          <Header>What is Flexbox?</Header>
          <Text>
            Flexbox (Flexible Box Layout) is a CSS layout method that makes it
            easy to arrange elements in a row or column. It automatically
            handles spacing, alignment, and distribution of elements, even when
            their size is unknown or dynamic.
          </Text>
          <Callout>
            <strong>Perfect for:</strong> Navigation bars, centering content,
            equal-height columns, distributing space between elements, and
            responsive layouts.
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
              <strong>Main Axis</strong> - Primary direction (horizontal by
              default).
            </li>
            <li>
              <strong>Cross Axis</strong> - Perpendicular to main axis (vertical
              by default).
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
          <CodeSpan>display: flex</CodeSpan>. This creates a flex container and
          all direct children become flex items. Parent element is the flex
          container, and children are the flex items. Parent and children can be
          the same element.
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
                <CodeSpan>space-between</CodeSpan> - Space between items (no
                space at edges)
              </li>
              <li>
                <CodeSpan>space-around</CodeSpan> - Space around items (half
                space at edges)
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
                <CodeSpan>flex-start</CodeSpan> - Align to start of cross axis
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
                <CodeSpan>stretch</CodeSpan> - Stretch lines to fill container
                (default)
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
                <CodeSpan>space-evenly</CodeSpan> - Equal space between lines
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
                <CodeSpan>auto</CodeSpan> - Use parent&apos;s align-items value
                (default)
              </li>
              <li>
                <CodeSpan>stretch</CodeSpan> - Stretch to fill container
              </li>
              <li>
                <CodeSpan>flex-start</CodeSpan> - Align to start of cross axis
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
              <CodeSpan>flex-grow</CodeSpan> - How much an item should grow (0 =
              don&apos;t grow, 1 = grow equally)
            </li>
            <li>
              <CodeSpan>flex-shrink</CodeSpan> - How much an item should shrink
              (1 = shrink equally, 0 = don&apos;t shrink)
            </li>
            <li>
              <CodeSpan>flex-basis</CodeSpan> - Initial size before
              growing/shrinking
            </li>
            <li>
              <CodeSpan>flex</CodeSpan> - Shorthand for grow, shrink, basis
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
              <CodeSpan>flex: 1</CodeSpan> is perfect for equal-width columns
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
  );
}
