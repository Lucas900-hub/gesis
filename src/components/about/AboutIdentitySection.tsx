"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function AboutIdentitySection() {
  const t = useTranslations('About');
  
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary mb-4 text-sm font-semibold tracking-wide uppercase">
              {t('identityBadge')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 leading-tight">
              {t('identityTitle1')} <span className="text-primary italic">{t('identityTitle2')}</span> {t('identityTitle3')}
            </h2>
            
            <div className="space-y-6 mb-10">
              <motion.div 
                whileHover={{ x: 5 }}
                className="p-5 rounded-2xl bg-muted/30 border border-border/50 shadow-sm"
              >
                <p className="text-muted-foreground text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw('identityP1') }} />
              </motion.div>

              <motion.div 
                whileHover={{ x: 5 }}
                className="p-5 rounded-2xl bg-primary/5 border border-primary/10 shadow-sm relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <p className="text-muted-foreground text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw('identityP2') }} />
              </motion.div>

              <motion.div 
                whileHover={{ x: 5 }}
                className="p-5 rounded-2xl bg-secondary/5 border border-secondary/10 shadow-sm relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-secondary" />
                <p className="text-muted-foreground text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw('identityP3') }} />
              </motion.div>
            </div>
            
            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Download size={20} className="text-primary" /> {t('docsTitle')}
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/legacy/docs/Statuts_ONG_GESIS.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 bg-background border border-border rounded-xl hover:border-primary/50 transition-colors flex-1">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    📄
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t('statutsTitle')}</div>
                    <div className="text-xs text-muted-foreground">{t('statutsDesc')}</div>
                  </div>
                </a>
                <a href="/legacy/docs/Reglement_Interieur_ONG_GESIS.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 bg-background border border-border rounded-xl hover:border-primary/50 transition-colors flex-1">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    📋
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t('reglementTitle')}</div>
                    <div className="text-xs text-muted-foreground">{t('reglementDesc')}</div>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card border border-border rounded-3xl p-8 shadow-sm"
          >
            <div className="flex justify-center mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/gesis.jpeg" alt="Logo GESIS" className="w-32 h-32 rounded-full object-cover shadow-md" />
            </div>
            
            <div className="space-y-4">
              {[
                { label: t('infoAcronym'), value: t('infoAcronymVal') },
                { label: t('infoPresident'), value: t('infoPresidentVal') },
                { label: t('infoSec'), value: t('infoSecVal') },
                { label: t('infoStatus'), value: t('infoStatusVal') },
                { label: t('infoFounded'), value: t('infoFoundedVal') },
                { label: t('infoHQ'), value: t('infoHQVal') },
                { label: t('infoLaw'), value: t('infoLawVal') },
              ].map((info, idx) => (
                <div key={idx} className="flex justify-between items-start py-2 border-b border-border/50 last:border-0 gap-4">
                  <span className="text-muted-foreground text-sm font-medium w-1/3 shrink-0">{info.label}</span>
                  <span className="text-foreground font-medium text-sm text-right w-2/3 break-words">{info.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
