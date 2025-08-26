import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import {ReactNode} from 'react';
import {locales, type Locale} from '../../i18n';
import '../globals.css';

export const dynamic = 'force-static'; // istersen

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

async function getMessages(locale: Locale) {
  try {
    const messages = (await import(`../../messages/${locale}.json`)).default;
    return messages;
  } catch {
    return null;
  }
}

export default async function RootLayout({
  children,
  params
}: {
  children: ReactNode;
  params: {locale: Locale};
}) {
  const {locale} = await params;
  if (!locales.includes(locale)) notFound();

  const messages = await getMessages(locale);
  if (!messages) notFound();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
