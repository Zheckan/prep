'use client';

import { PageHeader } from '@/components/page-header';
import { TableOfContents } from '@/components/table-of-contents';
import { PageContainer } from './page-container';

interface ContentPageProps {
  title: string;
  description: string;
  topicHome?: string;
  children: React.ReactNode;
  initialWidth?: 'narrow' | 'comfortable' | 'wide' | 'full';
  allowWidthToggle?: boolean;
}

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
      <div aria-hidden='true' className='h-[140px]' />
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
