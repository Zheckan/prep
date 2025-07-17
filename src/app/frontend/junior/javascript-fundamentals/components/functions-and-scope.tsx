'use client';

import dedent from 'dedent';
import { Callout, CodeBlock, CodeSpan, Header, SectionCard, Subheader, Text } from '@/components';

export function FunctionsAndScope() {
  return (
    <SectionCard title='Functions & Scope'>
      <div className='space-y-6'>
        <div>
          <Header>Function Basics</Header>
          <Text>
            Functions let you reuse logic. They can be declared or stored in variables.
          </Text>
        </div>

        {(() => {
          const code = dedent`function greet(name) {
  return 'Hi ' + name;
}

const greetArrow = (name) => 'Hi ' + name;`;
          return (
            <CodeBlock
              code={code}
              comment='Two ways to declare'
              language='javascript'
              showLineNumbers={true}
            />
          );
        })()}

        <div>
          <Subheader>Scope & Closures</Subheader>
          <Text>
            Variables are visible only inside the block they are defined in. Functions keep access to the variables from where they were created.
          </Text>
        </div>

        {(() => {
          const closureCode = dedent`function makeCounter() {
  let count = 0;
  return () => ++count;
}

const counter = makeCounter();
counter(); // 1
counter(); // 2`;
          return (
            <CodeBlock
              code={closureCode}
              comment='Simple closure'
              language='javascript'
              showLineNumbers={true}
            />
          );
        })()}

        <Callout>
          <strong>Senior note:</strong> Closures are the basis for many patterns like currying and modules.
        </Callout>
      </div>
    </SectionCard>
  );
}
