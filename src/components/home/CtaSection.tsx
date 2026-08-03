"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { Button } from '../ui/Button';
import { Heart, Handshake } from 'lucide-react';

import { useTranslations } from 'next-intl';

export function CtaSection() {
  const t = useTranslations('Index.cta');
  
  return (
    <section className="py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Donation CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card border border-border p-10 rounded-3xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
              <Heart size={120} className="text-secondary" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/20 text-secondary mb-6">
                <Heart size={24} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">{t('supportTitle')}</h3>
              <p className="text-muted-foreground mb-8 text-lg">
                {t('supportDesc')}
              </p>
              <Link href="/donate">
                <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2">
                  <Heart size={18} /> {t('supportBtn')}
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Involvement CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-accent/10 border border-accent/20 p-10 rounded-3xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
              <Handshake size={120} className="text-accent" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/20 text-accent mb-6">
                <Handshake size={24} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">{t('joinTitle')}</h3>
              <p className="text-muted-foreground mb-8 text-lg">
                {t('joinDesc')}
              </p>
              <Link href="/get-involved">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
                  <Handshake size={18} /> {t('joinBtn')}
                </Button>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
