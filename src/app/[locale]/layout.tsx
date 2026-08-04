import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export async function generateMetadata({ params }: { params: Promise<{locale: string}> }): Promise<Metadata> {
  const { locale } = await params;
  
  const siteUrl = "https://www.egssi.org";
  const ogImage = "/images/gesis.jpeg";

  if (locale === 'en') {
    const title = "GESIS - Solidarity & Social Impact";
    const description = "Humanitarian NGO in Benin working to improve living conditions through health, education, and community development.";
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: siteUrl,
        siteName: "GESIS",
        images: [{ url: ogImage, width: 800, height: 600, alt: "GESIS Logo" }],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
      }
    };
  }

  const title = "GESIS - Solidarité & Impact Social";
  const description = "ONG humanitaire au Bénin œuvrant pour l'amélioration des conditions de vie à travers la santé, l'éducation et le développement communautaire.";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: "GESIS",
      images: [{ url: ogImage, width: 800, height: 600, alt: "Logo GESIS" }],
      locale: "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-background text-foreground`}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1 pt-24">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
