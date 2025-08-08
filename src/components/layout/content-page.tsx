'use client';

import { PageHeader } from '@/components/page-header';
import { TableOfContents } from '@/components/table-of-contents';
import type { ContentPageProps } from '@/types';
import { PageContainer } from './page-container';

export function ContentPage({
  title,
  description,
  topicHome,
  children,
  initialWidth = 'comfortable',
  allowWidthToggle = true,
}: ContentPageProps) {
  return (
    <div className='min-h-screen text-white'>
      <PageHeader
        description={description}
        title={title}
        topicHome={topicHome}
      />
      {/* Mobile spacer follows current header height (0 or 128). Desktop keeps constant offset. */}
      <div
        aria-hidden='true'
        className='block sm:hidden'
        style={{ height: 'var(--page-header-height, 128px)' }}
      />
      <div aria-hidden='true' className='hidden h-[180px] sm:block' />
      <TableOfContents />
      <PageContainer
        allowWidthToggle={allowWidthToggle}
        initialWidth={initialWidth}
      >
        {children}
      </PageContainer>
    </div>
  );
}
