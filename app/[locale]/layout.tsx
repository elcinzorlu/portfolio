// app/[locale]/layout.tsx
import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import type {ReactNode} from 'react';
import {locales, type Locale} from '../../i18n';
import '../globals.css';
import {Poppins} from 'next/font/google';

export const dynamic = 'force-static';

// Font
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

// (SSG için) locale paramlarını üret
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Mesajları yükle
async function getMessages(locale: Locale) {
  try {
    const messages = (await import(`../../messages/${locale}.json`)).default;
    return messages;
  } catch {
    return null;
  }
}

// ✅ Typed-routes uyumlu: params Promise olabilir → await et
export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) notFound();

  const messages = await getMessages(locale as Locale);
  if (!messages) notFound();

  return (
    <html lang={locale}>
      <body className={poppins.className}>
        <NextIntlClientProvider locale={locale as Locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
