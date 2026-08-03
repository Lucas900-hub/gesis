"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '../ui/Button';
import { HeartHandshake, Scale, Lightbulb, Leaf } from 'lucide-react';

export function MissionSection() {
  const t = useTranslations('Index');

  const values = [
    { id: 'solidarity', icon: HeartHandshake, color: 'text-secondary', bg: 'group-hover:bg-secondary/10' },
    { id: 'justice', icon: Scale, color: 'text-primary', bg: 'group-hover:bg-primary/10' },
    { id: 'innovation', icon: Lightbulb, color: 'text-secondary', bg: 'group-hover:bg-secondary/10' },
    { id: 'responsibility', icon: Leaf, color: 'text-accent', bg: 'group-hover:bg-accent/10' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative blurred background circle */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary mb-6 text-sm font-semibold tracking-wide uppercase">
              {t('mission.label')}
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              {t('mission.title')}
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-muted-foreground text-lg mb-4">
              {t('mission.desc1')}
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-muted-foreground text-lg mb-8">
              {t('mission.desc2')}
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Link href="/about">
                <Button>En savoir plus →</Button>
              </Link>
              <a href="/legacy/docs/Statuts_ONG_GESIS.pdf" target="_blank" rel="noreferrer">
                <Button variant="outline">📄 Nos statuts</Button>
              </a>
            </motion.div>
          </motion.div>

          {/* Values Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((val, index) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ 
                    y: -8, 
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                    borderColor: "var(--color-primary-muted, rgba(37, 99, 235, 0.3))"
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group bg-card border border-border p-6 rounded-2xl shadow-sm transition-colors cursor-default relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full transition-colors duration-500 -z-10 ${val.bg}`} />
                  
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block"
                  >
                    <Icon size={32} className={`${val.color} mb-4`} />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {t(`values.${val.id}`)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(`values.${val.id}Desc`)}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
