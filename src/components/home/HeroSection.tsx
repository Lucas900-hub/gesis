"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/Button';
import { ArrowRight, Heart } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { TypewriterText } from '../ui/TypewriterText';

export function HeroSection() {
  const t = useTranslations('Index');

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Background patterns/blobs for modern NGO look */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent mb-6 text-sm font-medium"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          {t('badge')}
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-6"
        >
          {t('heroTitle1')} <br className="hidden sm:block"/>
          <span className="text-primary italic">
            <TypewriterText text={t('heroTitle2')} delay={0.6} />
          </span> <br className="hidden sm:block"/>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            {t('heroTitle3')}
          </motion.span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.0 }}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
        >
          {t('heroDesc')}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/actions">
            <Button size="lg" className="w-full sm:w-auto gap-2">
              {t('btnDiscover')} <ArrowRight size={18} />
            </Button>
          </Link>
          <Link href="/donate">
            <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 border-primary/20 hover:bg-primary/5">
              <Heart size={18} className="text-secondary" /> {t('btnSupport')}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
