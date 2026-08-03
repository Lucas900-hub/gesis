import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed' // Only prefix /en for English, default / for French
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
