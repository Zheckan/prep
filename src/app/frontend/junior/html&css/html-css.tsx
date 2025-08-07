import { cookies } from 'next/headers';
import { ContentPage } from '@/components';
import {
  CssFlexbox,
  CssFunctionsAndModernFeatures,
  CssGrid,
  ResponsiveDesign,
  SemanticHtmlAndAccessibility,
} from './components';

export default async function HTMLCSSComponent() {
  const cookieStore = await cookies();
  const fromCookie = cookieStore.get('prep-content-width')?.value;
  const allowed = new Set(['narrow', 'comfortable', 'wide', 'full']);
  const initialWidth = allowed.has(fromCookie || '')
    ? (fromCookie as 'narrow' | 'comfortable' | 'wide' | 'full')
    : 'comfortable';

  return (
    <ContentPage
      allowWidthToggle
      description='Semantic HTML, accessibility basics, Flexbox, Grid, responsive design'
      initialWidth={initialWidth}
      title='HTML & CSS Notes'
      topicHome='/frontend/junior'
    >
      <div className='prose prose-invert prose-zinc max-w-none'>
        <SemanticHtmlAndAccessibility />
        <CssFlexbox />
        <CssGrid />
        <ResponsiveDesign />
        <CssFunctionsAndModernFeatures />
      </div>
    </ContentPage>
  );
}
