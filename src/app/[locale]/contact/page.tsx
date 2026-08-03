"use client";

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';
import { TypewriterText } from '@/components/ui/TypewriterText';
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('Contact');
  
  const contactInfo = [
    {
      icon: MapPin,
      title: t('hq'),
      details: [t('hqDesc1'), t('hqDesc2'), t('hqDesc3')]
    },
    {
      icon: Phone,
      title: t('phone'),
      details: ["+229 00 00 00 00", "+229 00 00 00 00"]
    },
    {
      icon: Mail,
      title: t('email'),
      details: ["contact@ong-gesis.org", "partenariats@ong-gesis.org"]
    },
    {
      icon: Clock,
      title: t('hours'),
      details: [t('hoursDesc1'), t('hoursDesc2')]
    }
  ];

  return (
    <main className="min-h-screen pb-24">
      {/* Hero Contact */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 pt-32 pb-20 text-center border-b border-border overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
        
        <div className="container relative z-10 mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary mb-6 text-sm font-semibold uppercase tracking-wide border border-primary/20 shadow-sm"
          >
            {t('badge')}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight"
          >
            {t('title1')} <TypewriterText text={t('title2')} delay={0.6} className="text-primary" />
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

      <div className="container mx-auto px-4 max-w-6xl mt-16">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          
          {/* Info Section */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl font-bold text-foreground mb-8" dangerouslySetInnerHTML={{ __html: t.raw('infoTitle') }} />
            
            <div className="space-y-6">
              {contactInfo.map((info, idx) => {
                const Icon = info.icon;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + (idx * 0.1) }}
                    className="flex gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-lg mb-1">{info.title}</h4>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-muted-foreground">{detail}</p>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-12 p-6 bg-muted/50 rounded-2xl border border-border"
            >
              <h4 className="font-bold text-foreground mb-2">{t('press')}</h4>
              <p className="text-muted-foreground text-sm mb-4">{t('pressDesc')}</p>
              <a href="mailto:presse@ong-gesis.org" className="text-primary font-semibold hover:underline">
                presse@ong-gesis.org
              </a>
            </motion.div>
          </div>

          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <ContactForm />
          </motion.div>

        </div>
      </div>
    </main>
  );
}
