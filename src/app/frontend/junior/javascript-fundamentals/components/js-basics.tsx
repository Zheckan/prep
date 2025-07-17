'use client';

import { Callout, CodeBlock, Header, SectionCard, Text } from '@/components';

export function JsBasics() {
  return (
    <SectionCard title='JavaScript Overview'>
      <div className='space-y-6'>
        <div>
          <Header>What is JavaScript?</Header>
          <Text>
            JavaScript (JS) runs in the browser and lets you add interactivity to
            web pages. Modern JS can also run on servers with Node.js.
          </Text>
          <Callout>
            Use JS to respond to user actions, update the page without reload and
            handle data in the browser.
          </Callout>
        </div>

        {(() => {
          const basicCode = `// Print a message
console.log('Hello world');`;

          return (
            <CodeBlock
              code={basicCode}
              comment='Small example'
              language='javascript'
              showLineNumbers={true}
            />
          );
        })()}
      </div>
    </SectionCard>
  );
}
