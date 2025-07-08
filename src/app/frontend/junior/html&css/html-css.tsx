'use client';

import { PageHeader, TableOfContents } from '@/components';
import {
  CssFlexbox,
  CssFunctionsAndModernFeatures,
  CssGrid,
  ResponsiveDesign,
  SemanticHtmlAndAccessibility,
} from './components';

export default function HTMLCSSComponent() {
  return (
    <div className='min-h-screen bg-black text-white'>
      <PageHeader
        description='Semantic HTML, accessibility basics, Flexbox, Grid, responsive design'
        title='HTML & CSS Notes'
        topicHome='/frontend/junior'
      />

      {/* Spacer to account for fixed header */}
      <div className='h-[140px]' />

      <TableOfContents />

      <div className='mx-auto max-w-4xl px-6 py-8'>
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
