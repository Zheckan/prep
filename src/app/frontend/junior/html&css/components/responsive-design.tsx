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

export function ResponsiveDesign() {
  return (
    <SectionCard title='Responsive Design'>
      <div className='space-y-6'>
        <div>
          <Header>What is Responsive Design?</Header>
          <Text>
            Responsive design ensures your website looks and works great on all
            devices - from smartphones to ultra-wide monitors. Instead of
            creating separate mobile and desktop versions, responsive design
            uses flexible layouts, images, and CSS media queries to
            automatically adapt to different screen sizes.
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
              <strong>Mobile-First</strong> - Start with mobile design, add
              features for larger screens
            </li>
            <li>
              <strong>Fluid Grids</strong> - Layouts that scale proportionally
              using percentages and flexible units
            </li>
            <li>
              <strong>Flexible Images</strong> - Images that scale with their
              container
            </li>
            <li>
              <strong>Media Queries</strong> - CSS rules that apply based on
              device characteristics
            </li>
            <li>
              <strong>Breakpoints</strong> - Specific screen widths where layout
              changes occur
            </li>
            <li>
              <strong>Viewport</strong> - The visible area of a web page on a
              device
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
              <strong>Standard Breakpoints</strong> - Based on common device
              sizes (width)
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
            Bigger or smaller screen sizes are not considered standard. After
            all, there are a lot of devices out there. And 99% of them are in
            this range. We can&apos;t make it work for all of them. So, we need
            to use breakpoints.
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
                <CodeSpan>ch</CodeSpan> - Width of the &quot;0&quot; character{' '}
                <span className='text-yellow-500'>(great for text)</span>
              </li>
            </ul>
          </div>

          <div className='mb-4'>
            <Text variant='muted'>
              <strong>Viewport Units</strong> - Based on browser window size
            </Text>
            <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
              <li>
                <CodeSpan>vw</CodeSpan> - 1% of viewport width
              </li>
              <li>
                <CodeSpan>vh</CodeSpan> - 1% of viewport height
              </li>
              <li>
                <CodeSpan>vmin</CodeSpan> - 1% of smaller viewport dimension
              </li>
              <li>
                <CodeSpan>vmax</CodeSpan> - 1% of larger viewport dimension
              </li>
              <li>
                <CodeSpan>dvh</CodeSpan> - Dynamic viewport height (accounts for
                mobile browsers)
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
            Images and media need special handling to scale properly across
            devices and load efficiently.
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
              <strong>Container Queries</strong> - Style based on container
              size, not viewport
            </Text>
            <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
              <li>
                More precise than media queries for component-based design
              </li>
              <li>
                Components adapt based on their container, not the whole screen
              </li>
              <li>Perfect for reusable components in different contexts</li>
            </ul>
          </div>

          <div className='mb-4'>
            <Text variant='muted'>
              <strong>CSS Functions for Responsiveness</strong>
            </Text>
            <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
              <li>
                <CodeSpan>clamp(min, preferred, max)</CodeSpan> - Responsive
                values with limits
              </li>
              <li>
                <CodeSpan>min()</CodeSpan> - Use the smaller of multiple values
              </li>
              <li>
                <CodeSpan>max()</CodeSpan> - Use the larger of multiple values
              </li>
              <li>
                <CodeSpan>calc()</CodeSpan> - Mathematical calculations with
                mixed units
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
                content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
              </CodeSpan>
            </li>
            <li>
              Test on real devices, not just browser dev tools - they behave
              differently
            </li>
            <li>
              Use <CodeSpan>clamp()</CodeSpan> for responsive typography without
              media queries
            </li>
            <li>
              Consider <CodeSpan>aspect-ratio</CodeSpan> property for
              maintaining proportions
            </li>
            <li>
              Use CSS Grid with <CodeSpan>auto-fit</CodeSpan> and{' '}
              <CodeSpan>minmax()</CodeSpan> for intrinsically responsive layouts
            </li>
            <li>
              Optimize images with multiple formats (WebP, AVIF) and sizes for
              different devices
            </li>
          </ul>
        </div>
      </div>
    </SectionCard>
  );
}
