'use client';

import dedent from 'dedent';
import {
  CodeBlock,
  CodeSpan,
  Header,
  SectionCard,
  Subheader,
  Text,
} from '@/components';

export function CssFunctionsAndModernFeatures() {
  return (
    <SectionCard title='CSS Functions & Modern Features'>
      <div className='space-y-6'>
        <div>
          <Header>CSS Functions for Design Systems</Header>
          <Text>
            Modern CSS functions help create more maintainable design systems by
            allowing dynamic color calculations, better contrast handling, and
            responsive value generation.
          </Text>

          <div className='mb-4'>
            <Subheader>Color Functions</Subheader>
            <ul className='ml-4 list-inside list-disc space-y-1 text-gray-50'>
              <li>
                <CodeSpan>color-mix()</CodeSpan> - Blend two colors together
              </li>
              <li>
                <CodeSpan>color-contrast()</CodeSpan> - Automatically choose
                contrasting colors
              </li>
              <li>
                <CodeSpan>light-dark()</CodeSpan> - Theme-aware color selection
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
                      --secondary-dark: color-mix(in srgb, var(--secondary-color) 70%, black);

                      /* Dynamic text color based on background */
                      --text-on-primary: color-contrast(var(--primary-color) vs white, black);
                      --text-on-secondary: color-contrast(var(--secondary-color) vs white, black);

                      /* Light/dark mode theming */
                      --background-color: light-dark(white, #121212);
                      --text-color: light-dark(black, white);
                    }

                    .button-primary {
                      background-color: var(--primary-color);
                      color: var(--text-on-primary);
                    }

                    body {
                      background-color: var(--background-color);
                      color: var(--text-color);
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
      </div>
    </SectionCard>
  );
}
