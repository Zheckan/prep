'use client';

import { PageHeader, TableOfContents } from '@/components';
import {
  JsBasics,
  VariablesAndDataTypes,
  FunctionsAndScope,
  ArraysAndObjects,
  DomManipulation,
  AsyncJavaScript,
} from './components';

export default function JavaScriptFundamentals() {
  return (
    <div className='min-h-screen text-white'>
      <PageHeader
        description='Variables, functions, DOM basics, async code'
        title='JavaScript Fundamentals'
        topicHome='/frontend/junior'
      />

      {/* Spacer to account for fixed header */}
      <div className='h-[140px]' />

      <TableOfContents />

      <div className='mx-auto max-w-4xl px-6 py-8'>
        <div className='prose prose-invert prose-zinc max-w-none'>
          <JsBasics />
          <VariablesAndDataTypes />
          <FunctionsAndScope />
          <ArraysAndObjects />
          <DomManipulation />
          <AsyncJavaScript />
        </div>
      </div>
    </div>
  );
}
