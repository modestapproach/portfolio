import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Ted Dessert — Product Designer',
  description:
    'Product designer for ambitious software with weird edges and real constraints. Seven years helping new products become legible, lovable, and ready to ship.',
};

export const siteConfig: Record<string, string> = {
  language: 'en',
  theme: 'light',
  // next-themes stringifies its theme-init function into an inline script.
  // The OpenNext/Cloudflare build runs esbuild with keepNames, which rewrites
  // that function body to call a `__name` helper the inline script never
  // defines, so the script threw on every page load and never applied the
  // theme. Defining the helper before it runs is the smallest safe fix; this
  // slot renders ahead of <Providers>, and it is the studio's own field, so a
  // studio save keeps it.
  customHead: '<script>globalThis.__name = globalThis.__name || function (t) { return t; };</script>',
  customBody: '',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {siteConfig.customHead ? (
          <div data-custom-code="head" style={{ display: 'contents' }} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: siteConfig.customHead }} />
        ) : null}
        <Providers>{children}</Providers>
        {siteConfig.customBody ? (
          <div data-custom-code="body" style={{ display: 'contents' }} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: siteConfig.customBody }} />
        ) : null}
      </body>
    </html>
  );
}
