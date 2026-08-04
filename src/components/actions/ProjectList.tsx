"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, ArrowRight, Loader2, Tag } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { createClient } from '@/lib/supabase/client';

import { useLocale, useTranslations } from 'next-intl';

export function ProjectList() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const supabase = createClient();
  const locale = useLocale();
  const t = useTranslations('Actions');

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('date_start', { ascending: false });

      if (data) {
        setProjects(data);
      }
      setLoading(false);
    }
    fetchProjects();
  }, [supabase]);

  // Extract unique categories based on locale
  const categories = ['all', ...Array.from(new Set(projects.map(p => locale === 'en' ? (p.category_en || p.category_fr) : p.category_fr).filter(Boolean)))];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => (locale === 'en' ? (p.category_en || p.category_fr) : p.category_fr) === activeCategory);

  return (
    <section className="py-24 bg-background/50 relative">
      {/* Decorative background elements */}
      <div className="absolute top-40 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-40 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col mb-16 text-center max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary/10 text-primary mb-6 text-sm font-semibold uppercase tracking-wide mx-auto w-max"
          >
            Notre Bilan
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 tracking-tight"
          >
            {t('listTitle')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg leading-relaxed"
          >
            {t('listDesc')}
          </motion.p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32 text-muted-foreground">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground bg-muted/20 rounded-3xl border border-border">
            {t('empty')}
          </div>
        ) : (
          <>
            {/* Filter Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-3 mb-16"
            >
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeCategory === cat 
                    ? 'bg-primary text-white shadow-md scale-105' 
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {cat === 'all' ? (locale === 'en' ? 'All projects' : 'Tous les projets') : cat}
                </button>
              ))}
            </motion.div>

            {/* Projects Grid */}
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, idx) => {
                  const title = locale === 'en' ? (project.title_en || project.title_fr) : project.title_fr;
                  const category = locale === 'en' ? (project.category_en || project.category_fr) : project.category_fr;
                  const description = locale === 'en' ? (project.description_en || project.description_fr) : project.description_fr;

                  // Define dynamic colors based on category keywords
                  let badgeColor = "bg-primary/90 text-white";
                  const catLower = category?.toLowerCase() || '';
                  if (catLower.includes('institutionnel') || catLower.includes('institutional')) badgeColor = "bg-blue-600/90 text-white";
                  if (catLower.includes('paix') || catLower.includes('peace')) badgeColor = "bg-orange-500/90 text-white";
                  if (catLower.includes('éducation') || catLower.includes('education')) badgeColor = "bg-indigo-700/90 text-white";
                  if (catLower.includes('environnement') || catLower.includes('environment')) badgeColor = "bg-green-600/90 text-white";
                  if (catLower.includes('droit') || catLower.includes('right')) badgeColor = "bg-red-600/90 text-white";

                  return (
                    <motion.div
                      layout
                      key={project.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                      className="group relative bg-card/60 backdrop-blur-xl rounded-3xl border border-border overflow-hidden hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/40 transition-all duration-500 flex flex-col"
                    >
                      {/* Image Container */}
                      <div className="relative h-60 overflow-hidden shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity" />
                        <img 
                          src={project.cover_image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800'} 
                          alt={title} 
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 bg-muted"
                        />
                        <div className="absolute top-4 left-4 z-20">
                          <span className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md shadow-sm flex items-center gap-2 ${badgeColor}`}>
                            <Tag size={12} /> {category}
                          </span>
                        </div>
                      </div>

                      {/* Content Container */}
                      <div className="p-8 flex flex-col flex-1 relative">
                        {/* Floating Date Badge */}
                        {project.date_start && (
                          <div className="absolute -top-6 right-6 z-20 bg-background shadow-lg rounded-xl p-3 border border-border flex flex-col items-center justify-center min-w-[3.5rem] transform group-hover:-translate-y-2 transition-transform duration-300">
                            <span className="text-xs font-bold text-muted-foreground uppercase">{new Date(project.date_start).toLocaleString(locale === 'en' ? 'en-US' : 'fr-FR', { month: 'short' })}</span>
                            <span className="text-lg font-black text-primary leading-none">{new Date(project.date_start).getDate()}</span>
                            <span className="text-xs font-bold text-muted-foreground mt-1">{new Date(project.date_start).getFullYear()}</span>
                          </div>
                        )}

                        <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors pr-12 line-clamp-2">
                          {title}
                        </h3>
                        
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-4 flex-1">
                          {description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {filteredProjects.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-center py-20 text-muted-foreground"
              >
                <div className="text-4xl mb-4">🔍</div>
                <p>{locale === 'en' ? 'No projects found in this category.' : 'Aucun projet trouvé dans cette catégorie.'}</p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
