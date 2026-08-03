"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, Users, Search, Rocket } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function AboutGovernanceSection() {
  const t = useTranslations('About');
  const govBlocks = t.raw('govBlocks') as any[];
  
  const blocks = [
    {
      icon: Landmark,
      title: govBlocks[0].title,
      role: govBlocks[0].role,
      desc: govBlocks[0].desc,
      color: 'text-primary'
    },
    {
      icon: Users,
      title: govBlocks[1].title,
      role: govBlocks[1].role,
      desc: govBlocks[1].desc,
      color: 'text-secondary'
    },
    {
      icon: Search,
      title: govBlocks[2].title,
      role: govBlocks[2].role,
      desc: govBlocks[2].desc,
      color: 'text-primary'
    },
    {
      icon: Rocket,
      title: govBlocks[3].title,
      role: govBlocks[3].role,
      desc: govBlocks[3].desc,
      color: 'text-accent'
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary mb-4 text-sm font-semibold uppercase tracking-wide">
            {t('govBadge')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('govTitle')}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('govDesc')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {blocks.map((block, idx) => {
            const Icon = block.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-card border border-border rounded-2xl p-8 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    <Icon size={24} className={block.color} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{block.title}</h3>
                    <span className={`text-sm font-semibold uppercase tracking-wider ${block.color}`}>
                      {block.role}
                    </span>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {block.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
