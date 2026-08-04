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
      <section className="relative bg-gradient-to-bl from-accent/10 via-background to-primary/10 pt-32 pb-20 text-center border-b border-border overflow-hidden min-h-[70vh] flex flex-col justify-center">
        <div className="absolute top-20 right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl z-0" />
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl z-0" />
        
        <div className="container relative z-20 mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary mb-6 text-sm font-bold uppercase tracking-widest border border-primary/30 shadow-sm backdrop-blur-md"
          >
            {t('badge')}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-foreground mb-8 tracking-tight drop-shadow-sm"
          >
            {t('title1')} <br />
            <TypewriterText text={t('title2')} delay={0.6} className="text-primary drop-shadow-sm" />
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-foreground/90 leading-relaxed font-light max-w-3xl mx-auto mb-16"
          >
            {t('desc')}
          </motion.p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-border/50">
            {[
              { num: '500+', label: 'Bénéficiaires' },
              { num: '9', label: 'Domaines' },
              { num: '17+', label: 'Activités réalisées' },
              { num: '2020', label: 'Depuis' }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + (idx * 0.1) }}
                className="flex flex-col items-center p-4 bg-background/50 rounded-2xl border border-border/50 backdrop-blur-sm"
              >
                <div className="text-4xl font-extrabold text-primary mb-2">{stat.num}</div>
                <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProjectList />
      
      <CtaSection />
    </main>
  );
}
