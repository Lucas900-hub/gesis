"use client";

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';
import { Button } from '../ui/Button';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('Navigation');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/actions', label: t('actions') },
    { href: '/get-involved', label: t('getInvolved') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/gesis.jpeg" alt="GESIS Logo" className="w-10 h-10 rounded-full object-cover" />
          <div className="flex flex-col">
            <span className="font-bold text-xl leading-tight text-primary">GESIS</span>
            <span className="text-xs text-muted-foreground hidden sm:block">Solidarité & Impact Social</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href as any}
                className={`text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-foreground/80'}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex gap-3 text-sm font-medium bg-muted/50 px-3 py-1.5 rounded-full border border-border/50">
            <Link href={pathname as any} locale="fr" className="hover:text-primary transition-colors flex items-center gap-1.5">
              <img src="https://flagcdn.com/w20/fr.png" alt="FR" className="w-4 h-auto" /> FR
            </Link>
            <span className="text-muted-foreground/50">|</span>
            <Link href={pathname as any} locale="en" className="hover:text-primary transition-colors flex items-center gap-1.5">
              <img src="https://flagcdn.com/w20/gb.png" alt="EN" className="w-4 h-auto" /> EN
            </Link>
          </div>
          <Link href="/donate">
            <Button variant="primary" size="sm" className="gap-2 shadow-md shadow-primary/20">
              <Heart size={16} />
              {t('donate')}
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="flex flex-col px-4 py-4 space-y-4">
              {links.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href as any}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium py-2 border-b border-border/50 text-foreground/80 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex justify-center gap-4 pt-4 border-t border-border/50">
                <Link href={pathname as any} locale="fr" className="font-medium px-6 py-2 bg-muted rounded-md flex items-center gap-2">
                  <img src="https://flagcdn.com/w20/fr.png" alt="FR" className="w-4 h-auto" /> FR
                </Link>
                <Link href={pathname as any} locale="en" className="font-medium px-6 py-2 bg-muted rounded-md flex items-center gap-2">
                  <img src="https://flagcdn.com/w20/gb.png" alt="EN" className="w-4 h-auto" /> EN
                </Link>
              </div>
              <Link href="/donate" className="mt-4 block" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full gap-2">
                  <Heart size={18} />
                  {t('donate')}
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
