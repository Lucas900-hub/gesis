"use client";

import { motion } from 'framer-motion';
import { TypewriterText } from '@/components/ui/TypewriterText';
import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/routing';
import { Heart, Users, Briefcase, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function GetInvolvedPage() {
  const t = useTranslations('GetInvolved');
  const ways = t.raw('ways') as any[];
  
  const waysToInvolve = [
    {
      icon: Users,
      title: ways[0].title,
      desc: ways[0].desc,
      color: "text-primary",
      bgColor: "bg-primary/10",
      link: "/contact?subject=volunteer",
      cta: ways[0].cta
    },
    {
      icon: Briefcase,
      title: ways[1].title,
      desc: ways[1].desc,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      link: "/contact?subject=partnership",
      cta: ways[1].cta
    },
    {
      icon: Heart,
      title: ways[2].title,
      desc: ways[2].desc,
      color: "text-accent",
      bgColor: "bg-accent/10",
      link: "/donate",
      cta: ways[2].cta
    }
  ];

  return (
    <main className="min-h-screen pb-24">
      {/* Hero Get Involved */}
      <section className="relative bg-gradient-to-br from-secondary/10 via-background to-accent/10 pt-32 pb-20 text-center border-b border-border overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
        
        <div className="container relative z-10 mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary mb-6 text-sm font-semibold uppercase tracking-wide border border-secondary/20 shadow-sm"
          >
            {t('badge')}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight"
          >
            {t('title1')} <TypewriterText text={t('title2')} delay={0.6} className="text-secondary" />
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

      <section className="container mx-auto px-4 max-w-6xl mt-24">
        <div className="grid md:grid-cols-3 gap-8">
          {waysToInvolve.map((way, idx) => {
            const Icon = way.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + (idx * 0.1) }}
                className="bg-card border border-border rounded-3xl p-8 flex flex-col hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full transition-colors duration-500 -z-10 ${way.bgColor} opacity-0 group-hover:opacity-100`} />
                
                <div className={`w-16 h-16 rounded-2xl ${way.bgColor} ${way.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon size={32} />
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4">{way.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                  {way.desc}
                </p>
                
                <Link href={way.link} className="mt-auto block">
                  <Button variant="outline" className={`w-full justify-between group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all`}>
                    {way.cta} <ArrowRight size={18} />
                  </Button>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
