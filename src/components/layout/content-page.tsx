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
