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

export function SemanticHtmlAndAccessibility() {
  return (
    <SectionCard title='Semantic HTML & Accessibility'>
      <div className='space-y-6'>
        <div>
          <Header>What is Semantic HTML?</Header>
          <Text>
            Semantic HTML uses HTML elements to explain the meaning of the
            content structure, not just for visual appearance. It tells
            browsers, search engines, and assistive technologies what each part
            of your content represents.
          </Text>
          <Text>
            <strong>Important note:</strong> While you could technically build
            everything using <CodeSpan>&lt;div&gt;</CodeSpan> elements and CSS
            styling, semantic elements are essential for accessibility. Screen
            readers, keyboard navigation, and browser accessibility features
            rely on semantic meaning to properly interpret and navigate your
            content.
          </Text>
          <Callout>
            <strong>Why we need it:</strong> Better SEO (search engine
            optimization), accessibility for screen readers, easier maintenance,
            and future-proof code structure.
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
              <CodeSpan>&lt;main&gt;</CodeSpan> - Primary content (only one per
              page)
            </li>
            <li>
              <CodeSpan>&lt;section&gt;</CodeSpan> - Thematic grouping of
              content
            </li>
            <li>
              <CodeSpan>&lt;article&gt;</CodeSpan> - Self-contained content
              (blog posts, news articles)
            </li>
            <li>
              <CodeSpan>&lt;aside&gt;</CodeSpan> - Sidebar content, related
              information
            </li>
            <li>
              <CodeSpan>&lt;footer&gt;</CodeSpan> - Footer with contact info,
              copyright
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
            <Subheader>ARIA (Accessible Rich Internet Applications)</Subheader>
            <Text variant='muted'>
              ARIA attributes provide additional semantic information when HTML
              alone isn&apos;t enough. Think of them as &quot;instructions for
              screen readers&quot; - they tell assistive technology how to
              interpret and interact with elements that HTML semantics alone
              can&apos;t fully describe. For example, a button with an icon and
              no text would be difficult to understand for a screen reader.
            </Text>
            <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
              <li>
                <CodeSpan>aria-label</CodeSpan> - Accessible name for elements
              </li>
              <li>
                <CodeSpan>aria-describedby</CodeSpan> - Links to descriptive
                text
              </li>
              <li>
                <CodeSpan>aria-expanded</CodeSpan> - Shows if collapsible
                content is open
              </li>
              <li>
                <CodeSpan>role</CodeSpan> - Defines what an element is/does
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
                Use <CodeSpan>tabindex=&quot;0&quot;</CodeSpan> to make elements
                focusable
              </li>
              <li>
                Use <CodeSpan>tabindex=&quot;-1&quot;</CodeSpan> to remove from
                tab order
              </li>
              <li>Logical tab order follows content flow</li>
              <li>Visible focus indicators for all interactive elements</li>
              {/* <li className='text-amber-400'>
                      <strong>Avoid positive tabindex values</strong> (1, 2, 3...) -
                      they break natural reading order and create accessibility issues
                    </li> */}
              <li>
                Use CSS <CodeSpan>order</CodeSpan> property for visual layout
                instead of manipulating tab order
              </li>
            </ul>
            <Callout className='mt-4'>
              <strong>Important:</strong>{' '}
              <strong className='font-semibold text-red-400'>
                Do not use custom tab sequences!
              </strong>{' '}
              The browser&apos;s natural tab order follows DOM structure, which
              matches logical reading flow - this is better than custom
              sequences. You can do this via custom CSS (ex.{' '}
              <CodeSpan>order: n;</CodeSpan> or in HTML{' '}
              <CodeSpan>tabindex=&quot;n&quot;</CodeSpan> where{' '}
              <CodeSpan>n</CodeSpan> is a positive integer), but it&apos;s not
              recommended.
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
              Describes images for users who can&apos;t see them. Decorative
              images are purely visual enhancements (borders, dividers,
              background patterns) that don&apos;t convey meaningful content -
              use empty <CodeSpan>alt=&quot;&quot;</CodeSpan> so screen readers
              skip them.
            </Text>
            <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
              <li>
                Descriptive:{' '}
                <CodeSpan size='small'>
                  &lt;img src=&quot;chart.png&quot; alt=&quot;Sales increased
                  40% from Q1 to Q2&quot;&gt;
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
                Complex: Use <CodeSpan>aria-describedby</CodeSpan> to link to
                longer descriptions
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
  );
}
