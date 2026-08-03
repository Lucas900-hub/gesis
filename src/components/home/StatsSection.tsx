"use client";

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Users, Layers, CheckCircle, Calendar } from 'lucide-react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { id: 'beneficiaries', target: 500, suffix: '+', icon: Users },
  { id: 'domains', target: 9, suffix: '', icon: Layers },
  { id: 'activities', target: 12, suffix: '+', icon: CheckCircle },
  { id: 'founded', target: 2020, suffix: '', icon: Calendar },
];

function Counter({ target, suffix }: { target: number, suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function StatsSection() {
  const t = useTranslations('Index.stats');

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border p-8 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <Icon size={24} />
                </div>
                <div className="text-4xl font-bold text-foreground mb-2">
                  <Counter target={stat.target} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  {t(stat.id)}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
