'use client';

import { useEffect, useState } from 'react';
import { PageHeader, TableOfContents } from '@/components';
import {
  CssFlexbox,
  CssFunctionsAndModernFeatures,
  CssGrid,
  ResponsiveDesign,
  SemanticHtmlAndAccessibility,
} from './components';

export default function HTMLCSSComponent() {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.getElementById('page-header');
    if (!header) {
      return;
    }
    const updateHeight = () =>
      setHeaderHeight(header.getBoundingClientRect().height);
    updateHeight();
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(header);
    window.addEventListener('scroll', updateHeight);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', updateHeight);
    };
  }, []);

  return (
    <div className='min-h-screen bg-black text-white'>
      <PageHeader
        description='Semantic HTML, accessibility basics, Flexbox, Grid, responsive design'
        title='HTML & CSS Notes'
        topicHome='/frontend/junior'
      />

      <TableOfContents />

      <div
        className='mx-auto max-w-4xl px-6 py-8'
        style={{ paddingTop: headerHeight }}
      >
        <div className='prose prose-invert prose-zinc max-w-none'>
          <SemanticHtmlAndAccessibility />
          <CssFlexbox />
          <CssGrid />
          <ResponsiveDesign />
          <CssFunctionsAndModernFeatures />
        </div>
      </div>
    </div>
  );
}
