import Link from 'next/link';
import { cookies } from 'next/headers';
import type { Lang } from '@/lib/i18n';

export const metadata = { title: '404 — Hector Uribe' };

export default async function NotFound() {
  const lang = (((await cookies()).get('lang')?.value as Lang) || 'de');
  const t = (de: string, en: string) => (lang === 'en' ? en : de);

  return (
    <section className="not-found theme-dark">
      <p className="not-found-code" aria-hidden>404</p>
      <h1 className="not-found-title">{t('Diese Seite gibt es nicht.', 'This page doesn’t exist.')}</h1>
      <p className="not-found-text">
        {t('Vielleicht wurde sie verschoben — die Projekte findest du im Portfolio.', 'It may have moved — you’ll find all projects in the portfolio.')}
      </p>
      <div className="not-found-actions">
        <Link href="/" className="btn btn-primary">{t('Zum Portfolio', 'Back to portfolio')}</Link>
        <Link href="/#work" className="btn btn-secondary lq">{t('Projekte ansehen', 'View projects')}</Link>
      </div>
    </section>
  );
}
