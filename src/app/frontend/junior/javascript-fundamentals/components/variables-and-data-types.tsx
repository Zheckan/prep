'use client';

import dedent from 'dedent';
import { Callout, CodeBlock, CodeSpan, Header, SectionCard, Subheader, Text } from '@/components';

export function VariablesAndDataTypes() {
  return (
    <SectionCard title='Variables & Data Types'>
      <div className='space-y-6'>
        <div>
          <Header>Declaring Variables</Header>
          <Text>
            Use <CodeSpan>let</CodeSpan> for changeable values and <CodeSpan>const</CodeSpan> for values that should not be reassigned. <CodeSpan>var</CodeSpan> is old and rarely needed.
          </Text>
        </div>

        <div>
          <Subheader>Common Data Types</Subheader>
          <ul className='list-inside list-disc space-y-2 text-gray-50'>
            <li>Number</li>
            <li>String</li>
            <li>Boolean</li>
            <li>Object</li>
            <li>Array</li>
            <li>undefined / null</li>
          </ul>
        </div>

        {(() => {
          const code = dedent`let count = 1;
const name = 'Sam';
const active = true;
const user = { id: 1, name: 'Sam' };
const items = [1, 2, 3];`;
          return (
            <CodeBlock
              code={code}
              comment='Variables in action'
              language='javascript'
              showLineNumbers={true}
            />
          );
        })()}

        <Callout>
          <strong>Senior note:</strong> <CodeSpan>const</CodeSpan> only prevents reassignment. The object it holds can still change.
        </Callout>
      </div>
    </SectionCard>
  );
}
