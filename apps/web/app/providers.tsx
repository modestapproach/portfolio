'use client';

/** @revyme-providers v2 — GENERATED from i18n/config.json (locales: en).
 *  The editor regenerates this file when locales change. Do not hand-edit. */

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import { NextIntlClientProvider } from 'next-intl';

import enMessages from '@/messages/en.json';

const messagesByLocale: Record<string, any> = {
  'en': enMessages,
};
const DEFAULT_LOCALE = 'en';
const LOCALES = Object.keys(messagesByLocale);

/** '/fr/about' -> 'fr' when fr is a configured non-default locale, else null. */
function localeFromPath(pathname: string | null): string | null {
  const seg = (pathname || '/').split('/')[1];
  return seg && seg !== DEFAULT_LOCALE && LOCALES.includes(seg) ? seg : null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  // ROUTE-FIRST locale: /fr/... serves French on the server render itself
  // (usePathname resolves during SSR), so crawlers get translated HTML.
  const routeLocale = localeFromPath(usePathname());
  const [clientLocale, setClientLocale] = useState(DEFAULT_LOCALE);
  const locale = routeLocale ?? clientLocale;

  // Client channel: persisted preference + the 'locale-change' event any
  // component (LocaleSwitcher) can dispatch. Only applies on unprefixed URLs.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = window.localStorage.getItem('locale');
      if (stored && messagesByLocale[stored]) setClientLocale(stored);
    } catch { /* private mode — ignore */ }

    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const next = detail?.locale;
      if (typeof next === 'string' && messagesByLocale[next]) setClientLocale(next);
    };
    window.addEventListener('locale-change', handler);
    return () => window.removeEventListener('locale-change', handler);
  }, []);

  // Mirror the ACTIVE locale to <html lang> (+ dir for RTL scripts) and
  // persist it, so :lang() CSS fires and the choice survives navigation to
  // unprefixed URLs.
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (document.documentElement.lang !== locale) document.documentElement.lang = locale;
      const rtl = ['ar', 'he', 'fa', 'ur', 'ps', 'sd', 'ku', 'dv', 'yi'].includes(locale.split('-')[0]);
      if (rtl) document.documentElement.dir = 'rtl';
      else document.documentElement.removeAttribute('dir');
    }
    try { window.localStorage.setItem('locale', locale); } catch { /* ignore */ }
  }, [locale]);

  const messages = messagesByLocale[locale] || messagesByLocale[DEFAULT_LOCALE];

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        {/* lang on a wrapper (display:contents = no box) so :lang() styles
            match in the SERVER-rendered HTML too — <html lang> is only
            patched client-side. */}
        <div lang={locale} style={{ display: 'contents' }}>
          {children}
        </div>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
