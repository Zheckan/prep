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
      {/* Spacer equal to header's maximum height for consistent offset */}
      <div aria-hidden='true' className='h-[120px] sm:h-[180px]' />
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
