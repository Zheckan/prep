import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { cookies } from 'next/headers';
import Script from 'next/script';
import './globals.css';
import { AmbientBackground } from '@/components';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Prep',
  description: 'Prep for interviews and practice',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const contentWidth = cookieStore.get('prep-content-width')?.value;
  const widthAttr =
    contentWidth &&
    ['narrow', 'comfortable', 'wide', 'full'].includes(contentWidth)
      ? { 'data-content-width': contentWidth }
      : {};
  return (
    <html lang='en' {...widthAttr}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AmbientBackground />
        <Script id='content-width-boot' strategy='beforeInteractive'>
          {`(function(){try{var d=document.documentElement;var key='prep:content-width';if(!d.hasAttribute('data-content-width')){var w=localStorage.getItem(key);if(w){d.setAttribute('data-content-width', w);}}}catch(e){}})();`}
        </Script>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
