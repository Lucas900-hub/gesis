"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Stethoscope, LifeBuoy, Leaf, Briefcase, Baby, Paintbrush, Trophy, Bird } from 'lucide-react';
import { useTranslations } from 'next-intl';

const domainIcons = [
  BookOpen, Stethoscope, LifeBuoy, Leaf, Briefcase, Baby, Paintbrush, Trophy, Bird
];

export function DomainsSection() {
  const t = useTranslations('Index.domains');
  const domains = t.raw('list');

  return (
    <section className="py-24 bg-muted/20 overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-16">
        <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary mb-4 text-sm font-semibold uppercase tracking-wide">
          {t('title')}
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('heading')}</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {t('desc')}
        </p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          className="flex gap-6 px-3"
        >
          {/* Double the domains for seamless marquee */}
          {[...domains, ...domains].map((domain: any, idx: number) => {
            const Icon = domainIcons[idx % domainIcons.length];
            return (
              <div 
                key={`${idx}`}
                className="flex-shrink-0 w-80 bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{domain.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{domain.desc}</p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
