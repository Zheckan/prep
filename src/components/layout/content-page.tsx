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
    <div
      className='min-h-screen text-white'
      style={{
        paddingTop:
          'var(--content-top-offset, var(--page-header-height, 128px))',
        transition: 'padding-top 0.28s ease-in-out',
      }}
    >
      <PageHeader
        description={description}
        title={title}
        topicHome={topicHome}
      />
      {/* Removed hardcoded spacers; content offset handled via padding-top */}
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
