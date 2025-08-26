import createMiddleware from 'next-intl/middleware';
import {locales, defaultLocale} from './i18n';


export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always' // URL her zaman /tr /en ile başlar
});

export const config = {
  matcher: [
    // Next.js statik dosyaları vs hariç tut
    '/((?!_next|.*\\..*|api).*)'
  ]
};
