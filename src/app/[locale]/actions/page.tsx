"use client";

import { motion } from 'framer-motion';
import { TypewriterText } from '@/components/ui/TypewriterText';
import { ProjectList } from '@/components/actions/ProjectList';
import { CtaSection } from '@/components/home/CtaSection';
import { useTranslations } from 'next-intl';

export default function ActionsPage() {
  const t = useTranslations('Actions');
  
  return (
    <main className="min-h-screen">
      {/* Hero Actions */}
      <section className="relative bg-gradient-to-bl from-accent/10 via-background to-primary/10 pt-32 pb-20 text-center border-b border-border overflow-hidden">
        <div className="absolute top-20 right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
        
        <div className="container relative z-10 mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent mb-6 text-sm font-semibold uppercase tracking-wide border border-accent/20 shadow-sm"
          >
            {t('badge')}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight"
          >
            {t('title1')} <br />
            <TypewriterText text={t('title2')} delay={0.6} className="text-primary" />
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground leading-relaxed font-light"
          >
            {t('desc')}
          </motion.p>
        </div>
      </section>

      <ProjectList />
      
      <CtaSection />
    </main>
  );
}
