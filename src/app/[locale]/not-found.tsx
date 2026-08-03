import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/Button';

export default function NotFoundPage() {
  const t = useTranslations('NotFound');

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <span className="text-4xl font-bold text-primary">404</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
        {t('title')}
      </h1>
      <p className="text-muted-foreground text-lg mb-8 max-w-md">
        {t('description')}
      </p>
      <Link href="/">
        <Button size="lg">{t('backHome')}</Button>
      </Link>
    </div>
  );
}
