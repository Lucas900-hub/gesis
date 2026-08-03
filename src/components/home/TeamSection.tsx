"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Link } from '@/i18n/routing';
import { createClient } from '@/lib/supabase/client';
import { Loader2 } from 'lucide-react';

import { useLocale } from 'next-intl';

interface TeamSectionProps {
  showAll?: boolean;
}

export function TeamSection({ showAll = false }: TeamSectionProps) {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const locale = useLocale();

  useEffect(() => {
    async function fetchMembers() {
      let query = supabase
        .from('team_members')
        .select('*')
        .order('order_index', { ascending: true });
        
      if (!showAll) {
        query = query.eq('is_board_member', true);
      }

      const { data, error } = await query;

      if (data) {
        setMembers(data);
      }
      setLoading(false);
    }
    fetchMembers();
  }, [supabase, showAll]);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary mb-4 text-sm font-semibold uppercase tracking-wide">
            {locale === 'en' ? 'The faces of GESIS' : 'Les visages de GESIS'}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {locale === 'en' ? 'Our Team' : 'Notre Équipe'}
          </h2>
          <p className="text-muted-foreground text-lg">
            {locale === 'en' 
              ? 'Committed men and women who carry out the mission of GESIS every day on the field in Benin.'
              : 'Des hommes et des femmes engagés qui portent la mission de GESIS chaque jour sur le terrain au Bénin.'}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground bg-muted/20 rounded-3xl border border-border">
            {locale === 'en' ? 'No team members found.' : 'Aucun membre de l\'équipe pour le moment.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {members.map((member, index) => {
              const initials = `${member.first_name?.[0] || ''}${member.last_name?.[0] || ''}`.toUpperCase();
              const role = locale === 'en' ? (member.role_en || member.role_fr) : member.role_fr;
              const description = locale === 'en' ? (member.description_en || member.description_fr) : member.description_fr;
              
              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="aspect-square bg-muted relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary/5 flex items-center justify-center text-4xl font-bold text-primary/20">
                      {initials}
                    </div>
                    {member.image_url && (
                      <img 
                        src={member.image_url} 
                        alt={`${member.first_name} ${member.last_name}`}
                        className="w-full h-full object-cover relative z-10 group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-1">{member.first_name} {member.last_name}</h3>
                    <p className="text-primary text-sm font-medium mb-4">{role}</p>
                    <p className="text-muted-foreground text-sm line-clamp-4">
                      {description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {!showAll && !loading && members.length > 0 && (
          <div className="mt-16 text-center">
            <Link href="/about#team">
              <Button variant="outline" size="lg">Voir tous les membres →</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
