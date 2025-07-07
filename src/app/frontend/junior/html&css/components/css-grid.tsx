'use client';

import dedent from 'dedent';
import { useRouter } from 'next/navigation';
import {
  Callout,
  CodeBlock,
  CodeSpan,
  Header,
  SectionCard,
  Subheader,
  Text,
} from '@/components';

export function CssGrid() {
  const router = useRouter();
  return (
    <SectionCard title='CSS Grid'>
      <div className='space-y-6'>
        <div>
          <Header>What is CSS Grid?</Header>
          <Text>
            CSS Grid is a 2-dimensional layout system that allows you to create
            complex layouts with rows and columns. Unlike Flexbox (which is
            1-dimensional), Grid lets you control both horizontal and vertical
            positioning simultaneously, making it perfect for page layouts and
            complex component arrangements.
          </Text>
          <Subheader>Perfect for:</Subheader>
          <Text variant='muted'>
            Page layouts, card grids, dashboards, magazine-style layouts, and
            any design where you need precise control over both rows and
            columns. (see{' '}
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
              <strong>Grid Lines</strong> - The dividing lines that make up the
              structure
            </li>
            <li>
              <strong>Grid Tracks</strong> - The space between two adjacent grid
              lines (rows/columns)
            </li>
            <li>
              <strong>Grid Cell</strong> - A single unit of the grid
              (intersection of row and column)
            </li>
            <li>
              <strong>Grid Area</strong> - Any rectangular space bounded by grid
              lines
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
              <strong>Fractional Units (fr)</strong> - Represents a fraction of
              available space
            </Text>
            <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
              <li>
                <CodeSpan>1fr</CodeSpan> - Takes 1 fraction of available space
              </li>
              <li>
                <CodeSpan>1fr 2fr</CodeSpan> - First column gets 1/3, second
                gets 2/3
              </li>
              <li>
                <CodeSpan>100px 1fr</CodeSpan> - First column fixed, second
                flexible
              </li>
            </ul>
          </div>

          <div className='mb-4'>
            <Text variant='muted'>
              <strong>Repeat Function</strong> - Simplifies repetitive patterns
            </Text>
            <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
              <li>
                <CodeSpan>repeat(3, 1fr)</CodeSpan> - 3 equal columns
              </li>
              <li>
                <CodeSpan>repeat(auto-fit, minmax(200px, 1fr))</CodeSpan> -
                Responsive columns
              </li>
              <li>
                <CodeSpan>repeat(auto-fill, 100px)</CodeSpan> - Fill with 100px
                columns
              </li>
            </ul>
          </div>

          <div className='mb-4'>
            <Text variant='muted'>
              <strong>Sizing Functions</strong> - Control minimum and maximum
              sizes
            </Text>
            <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
              <li>
                <CodeSpan>minmax(100px, 1fr)</CodeSpan> - Minimum 100px, maximum
                flexible
              </li>
              <li>
                <CodeSpan>fit-content(300px)</CodeSpan> - Shrink to content, max
                300px
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
            In other words, select specific grid items and do what you want with
            them.
          </Text>
          <ul className='list-inside list-disc space-y-2 text-gray-50'>
            <li>
              <CodeSpan>grid-column</CodeSpan> - Shorthand for
              grid-column-start/end
            </li>
            <li>
              <CodeSpan>grid-row</CodeSpan> - Shorthand for grid-row-start/end
            </li>
            <li>
              <CodeSpan>grid-area</CodeSpan> - Shorthand for all four line-based
              properties
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
            A more intuitive way to create layouts by naming areas and assigning
            items to them.
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
              <strong>Item Alignment</strong> - Controls individual grid items
              within their cells
            </Text>
            <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
              <li>
                <CodeSpan>justify-items</CodeSpan> - Align items horizontally
                (start, end, center, stretch)
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
              <strong>Content Alignment</strong> - Controls the entire grid
              within the container
            </Text>
            <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
              <li>
                <CodeSpan>justify-content</CodeSpan> - Align grid horizontally
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
              <strong>Individual Item Override</strong> - Override alignment for
              specific items
            </Text>
            <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
              <li>
                <CodeSpan>justify-self</CodeSpan> - Align single item
                horizontally
              </li>
              <li>
                <CodeSpan>align-self</CodeSpan> - Align single item vertically
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
              Use <CodeSpan>auto-fill</CodeSpan> to maintain empty columns for
              consistent spacing
            </li>
            <li>
              Combine Grid for overall layout and Flexbox for component-level
              alignment
            </li>
            <li>
              Named grid areas make complex layouts much more readable and
              maintainable
            </li>
            <li>
              <CodeSpan>grid-template</CodeSpan> is shorthand for columns, rows,
              and areas combined
            </li>
          </ul>
        </div>
      </div>
    </SectionCard>
  );
}
