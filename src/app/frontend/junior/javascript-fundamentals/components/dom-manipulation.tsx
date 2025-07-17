'use client';

import dedent from 'dedent';
import { Callout, CodeBlock, CodeSpan, Header, SectionCard, Subheader, Text } from '@/components';

export function DomManipulation() {
  return (
    <SectionCard title='DOM Manipulation'>
      <div className='space-y-6'>
        <div>
          <Header>Selecting Elements</Header>
          <Text>
            Use <CodeSpan>document.querySelector</CodeSpan> to grab the first element that matches a CSS selector.
          </Text>
        </div>

        {(() => {
          const code = dedent`const button = document.querySelector('button');
button.addEventListener('click', () => {
  alert('Clicked!');
});`;
          return (
            <CodeBlock
              code={code}
              comment='Basic event listener'
              language='javascript'
              showLineNumbers={true}
            />
          );
        })()}

        <Callout>
          Changing the DOM too often can slow things down. Batch updates when possible.
        </Callout>
      </div>
    </SectionCard>
  );
}
