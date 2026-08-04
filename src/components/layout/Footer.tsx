"use client";

import React from 'react';
import { Link } from '@/i18n/routing';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navigation');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-muted pt-16 pb-8 border-t border-border mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">GESIS</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t('desc')}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="https://www.facebook.com/profile.php?id=100056785756664" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/ong-gesis-g%C3%A9n%C3%A9ration-%C3%A9mergente-pour-la-solidarit%C3%A9-et-impact-social/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{t('nav')}</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">{tNav('home')}</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">{tNav('about')}</Link></li>
              <li><Link href="/actions" className="text-sm text-muted-foreground hover:text-primary transition-colors">{tNav('actions')}</Link></li>
              <li><Link href="/get-involved" className="text-sm text-muted-foreground hover:text-primary transition-colors">{tNav('getInvolved')}</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">{tNav('contact')}</Link></li>
            </ul>
          </div>

          {/* Documents */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{t('docs')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="/legacy/docs/Statuts_ONG_GESIS.pdf" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('statuts')}
                </a>
              </li>
              <li>
                <a href="/legacy/docs/Reglement_Interieur_ONG_GESIS.pdf" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('reglement')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{t('contact')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-primary shrink-0 mt-0.5" />
                <a href="mailto:contact@egssi.org" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  contact@egssi.org
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-primary shrink-0 mt-0.5" />
                <a href="tel:+2290161868920" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  +229 01 61 86 89 20
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.raw('address') }} />
              </li>
            </ul>
          </div>

        </div>
        
        {/* Footer Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            {t('rights', { year })}
          </p>
          <p className="text-xs text-muted-foreground text-center md:text-left">
            {t('law')}
          </p>
        </div>
      </div>
    </footer>
  );
}
