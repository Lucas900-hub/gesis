'use client';

import './globals.css';

import Link from 'next/link';

export default function NotFound() {
  return (
    <html suppressHydrationWarning>
      <body className="font-sans antialiased text-center p-20 flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-900">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
          <span className="text-4xl font-bold text-blue-600">404</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Page introuvable / Page not found
        </h1>
        <p className="text-gray-500 text-lg mb-8 max-w-md">
          Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée. / Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="text-primary hover:underline">
          Retour à l&apos;accueil / Back to Home
        </Link>
      </body>
    </html>
  );
}
