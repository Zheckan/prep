'use client';

import dedent from 'dedent';
import { Callout, CodeBlock, CodeSpan, Header, SectionCard, Subheader, Text } from '@/components';

export function AsyncJavaScript() {
  return (
    <SectionCard title='Async JavaScript'>
      <div className='space-y-6'>
        <div>
          <Header>Promises & Async/Await</Header>
          <Text>
            Promises represent work that finishes in the future. <CodeSpan>async</CodeSpan>/<CodeSpan>await</CodeSpan> lets you write promise code that looks synchronous.
          </Text>
        </div>

        {(() => {
          const code = dedent`async function getUser() {
  const res = await fetch('/api/user');
  return res.json();
}

getUser().then(user => console.log(user));`;
          return (
            <CodeBlock
              code={code}
              comment='Fetching data'
              language='javascript'
              showLineNumbers={true}
            />
          );
        })()}

        <Callout>
          <strong>Senior note:</strong> Unhandled promise rejections can crash Node.js processes in strict mode. Always add error handling.
        </Callout>
      </div>
    </SectionCard>
  );
}
