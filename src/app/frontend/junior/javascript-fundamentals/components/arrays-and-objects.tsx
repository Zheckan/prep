'use client';

import dedent from 'dedent';
import { CodeBlock, CodeSpan, Header, SectionCard, Subheader, Text } from '@/components';

export function ArraysAndObjects() {
  return (
    <SectionCard title='Arrays & Objects'>
      <div className='space-y-6'>
        <div>
          <Header>Working with Arrays</Header>
          <Text>
            Arrays hold ordered lists of values. Useful helpers include <CodeSpan>map</CodeSpan>, <CodeSpan>filter</CodeSpan> and <CodeSpan>find</CodeSpan>.
          </Text>
        </div>

        {(() => {
          const arrayCode = dedent`const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2); // [2, 4, 6]`;
          return (
            <CodeBlock
              code={arrayCode}
              comment='Array example'
              language='javascript'
              showLineNumbers={true}
            />
          );
        })()}

        <div>
          <Subheader>Objects</Subheader>
          <Text>
            Objects store key–value pairs. Use dot or bracket notation to access properties.
          </Text>
        </div>

        {(() => {
          const objCode = dedent`const user = { id: 1, name: 'Sam' };
console.log(user.name); // Sam`;
          return (
            <CodeBlock
              code={objCode}
              comment='Object example'
              language='javascript'
              showLineNumbers={true}
            />
          );
        })()}
      </div>
    </SectionCard>
  );
}
