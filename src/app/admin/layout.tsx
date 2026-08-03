import React from 'react';
import '../globals.css';

export const metadata = {
  title: 'Admin - GESIS',
  description: 'Tableau de bord d\'administration',
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
