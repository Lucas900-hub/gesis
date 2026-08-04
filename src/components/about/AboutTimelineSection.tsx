import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function AboutTimelineSection() {
  const t = useTranslations('About');
  const timelineItems = t.raw('timelineItems') as any[];
  
  const timeline = [
    { date: timelineItems[0].date, title: timelineItems[0].title, desc: timelineItems[0].desc, color: 'bg-primary' },
    { date: timelineItems[1].date, title: timelineItems[1].title, desc: timelineItems[1].desc, color: 'bg-primary' },
    { date: timelineItems[2].date, title: timelineItems[2].title, desc: timelineItems[2].desc, color: 'bg-secondary' },
    { date: timelineItems[3].date, title: timelineItems[3].title, desc: timelineItems[3].desc, color: 'bg-primary' },
    { date: timelineItems[4].date, title: timelineItems[4].title, desc: timelineItems[4].desc, color: 'bg-accent' },
    { date: timelineItems[5].date, title: timelineItems[5].title, desc: timelineItems[5].desc, color: 'bg-secondary' }
  ];
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 bg-muted/20 relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary mb-4 text-sm font-semibold uppercase tracking-wide"
          >
            {t('timelineBadge')}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            {t('timelineTitle')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            {t('timelineDesc')}
          </motion.p>
        </div>

        <div className="relative">
          {/* Animated central line (desktop) or left line (mobile) */}
          <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-[2px] bg-border/50 -translate-x-1/2">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-primary origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-12">
            {timeline.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`relative flex items-center justify-between md:justify-normal ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                  
                  {/* Icon point */}
                  <div className="absolute left-[31px] md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-background bg-card flex items-center justify-center shadow-md z-10">
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                      className={`w-4 h-4 rounded-full ${item.color}`} 
                    />
                  </div>

                  {/* Content Card */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                    className={`w-full md:w-5/12 pl-20 pr-4 md:px-0 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}
                  >
                    <div className="bg-card p-6 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow relative group overflow-hidden">
                      <div className={`absolute top-0 ${isEven ? 'left-0' : 'right-0'} w-1 h-full ${item.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${item.color.replace('bg-', 'text-').replace('primary', 'primary').replace('secondary', 'secondary').replace('accent', 'accent')} bg-opacity-10`} style={{ backgroundColor: 'var(--color-muted)' }}>
                        {item.date}
                      </span>
                      <h4 className="text-xl font-bold text-foreground mb-2">{item.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
