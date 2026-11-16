import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import LanguageToggle from '@/components/LanguageToggle';
import GlassPointer from '@/components/GlassPointer';
import LiquidGlassDefs from '@/components/LiquidGlassDefs';
import MotionLayer from '@/components/MotionLayer';
import type { Lang } from '@/lib/i18n';

/* Mobile baseline: paint under the notch (content is padded back with env()),
   let the keyboard resize the layout, match the browser chrome to the matte-black top. */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  interactiveWidget: 'resizes-content',
  themeColor: '#1E1F22',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  title: 'Hector Uribe — Mediengestalter & UX/UI Designer',
  description: 'Portfolio von Hector Uribe — Mediengestalter Digital & Print, UX/UI Designer aus Mainz. CPUX-F zertifiziert.',
  openGraph: {
    title: 'Hector Uribe — Mediengestalter & UX/UI Designer',
    description: 'Portfolio von Hector Uribe — Mediengestalter Digital & Print, UX/UI Designer aus Mainz.',
    locale: 'de_DE',
    type: 'website',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const lang = ((cookieStore.get('lang')?.value as Lang) || 'de');

  return (
    <html lang={lang}>
      <body>
        <a href="#main" className="skip-link">
          {lang === 'en' ? 'Skip to content' : 'Zum Inhalt springen'}
        </a>
        <LanguageProvider initial={lang}>
          <LiquidGlassDefs />
          <GlassPointer />
          <MotionLayer />
          <LanguageToggle />
          <main id="main">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
