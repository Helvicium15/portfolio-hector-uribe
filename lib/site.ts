/* Public base URL of the portfolio, used for absolute URLs (sitemap, robots,
   Open Graph). Set NEXT_PUBLIC_SITE_URL once a custom domain exists; on Vercel
   the production URL is picked up automatically. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '') ||
  'http://localhost:3000'
).replace(/\/$/, '');
