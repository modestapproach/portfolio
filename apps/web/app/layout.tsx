import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Ted Dessert — Product Designer',
  description:
    'A 0 to 1 Product Engineer with a pulse on the latest in Tech and AI. Seven years helping new products become legible, lovable, and ready to ship.',
};

export const siteConfig: Record<string, string> = {
  language: 'en',
  theme: 'light',
  customHead: '',
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
