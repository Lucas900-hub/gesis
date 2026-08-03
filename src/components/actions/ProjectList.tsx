"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { createClient } from '@/lib/supabase/client';

import { useLocale, useTranslations } from 'next-intl';

export function ProjectList() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const locale = useLocale();
  const t = useTranslations('Actions');

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (data) {
        setProjects(data);
      }
      setLoading(false);
    }
    fetchProjects();
  }, [supabase]);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-foreground mb-4">{t('listTitle')}</h2>
            <p className="text-muted-foreground text-lg">
              {t('listDesc')}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground bg-muted/20 rounded-3xl border border-border">
            {t('empty')}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map((project, idx) => {
              const title = locale === 'en' ? (project.title_en || project.title_fr) : project.title_fr;
              const category = locale === 'en' ? (project.category_en || project.category_fr) : project.category_fr;
              const description = locale === 'en' ? (project.description_en || project.description_fr) : project.description_fr;

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group bg-card rounded-3xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden shrink-0">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                    <img 
                      src={project.cover_image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800'} 
                      alt={title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 bg-muted"
                    />
                    <div className="absolute top-4 left-4 z-20 flex gap-2">
                      <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-primary/90 text-white backdrop-blur-md shadow-sm">
                        {category}
                      </span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {description}
                    </p>

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/50">
                    <div className="flex flex-col gap-1">
                      {project.date_start && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar size={14} className="text-primary" />
                          <span>{new Date(project.date_start).getFullYear()}</span>
                        </div>
                      )}
                    </div>
                    
                    <button className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
