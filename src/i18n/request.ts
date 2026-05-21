import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

const SUPPORTED_LOCALES = ['cs', 'en', 'de', 'sk', 'pl', 'fr', 'es', 'it'] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('locale')?.value as Locale | undefined;
  const locale: Locale =
    localeCookie && SUPPORTED_LOCALES.includes(localeCookie) ? localeCookie : 'cs';

  return {
    locale,
    messages: (await import(`./locales/${locale}/common.json`)).default,
  };
});
