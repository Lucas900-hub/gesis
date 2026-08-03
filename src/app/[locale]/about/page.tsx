"use client";

import { motion } from 'framer-motion';
import { TypewriterText } from '@/components/ui/TypewriterText';
import { AboutIdentitySection } from '@/components/about/AboutIdentitySection';
import { AboutTimelineSection } from '@/components/about/AboutTimelineSection';
import { AboutGovernanceSection } from '@/components/about/AboutGovernanceSection';
import { MissionSection } from '@/components/home/MissionSection';
import { TeamSection } from '@/components/home/TeamSection';
import { CtaSection } from '@/components/home/CtaSection';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('About');
  
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 pt-32 pb-20 text-center border-b border-border overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
        
        <div className="container relative z-10 mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary mb-6 text-sm font-semibold uppercase tracking-wide border border-primary/20 shadow-sm"
          >
            {t('heroBadge')}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight"
          >
            {t('heroTitle1')} <span className="text-primary relative inline-block">
              <TypewriterText text={t('heroTitle2')} delay={0.6} />
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-2 bg-secondary/30 rounded-full" 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.2, duration: 0.8 }}
              />
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light"
          >
            {t('heroDesc')}
          </motion.p>
        </div>
      </section>

      <AboutIdentitySection />
      <AboutTimelineSection />
      <MissionSection />
      <AboutGovernanceSection />
      
      {/* For now, reuse TeamSection which has the core team. We could add members later */}
      <div id="team">
        <TeamSection showAll={true} />
      </div>

      <CtaSection />
    </main>
  );
}
