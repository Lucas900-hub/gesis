"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { 
  MessageSquare, 
  Users, 
  FolderKanban, 
  HeartHandshake
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState([
    { name: 'Nouveaux Messages', value: '...', icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { name: 'Projets Actifs', value: '...', icon: FolderKanban, color: 'text-green-500', bg: 'bg-green-500/10' },
    { name: 'Bénévoles', value: '...', icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { name: 'Dons (Mois)', value: '...', icon: HeartHandshake, color: 'text-pink-500', bg: 'bg-pink-500/10' },
  ]);
  const supabase = createClient();

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch counts from different tables
        const [
          { count: messagesCount },
          { count: projectsCount },
          { count: volunteersCount },
          { count: donationsCount }
        ] = await Promise.all([
          supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('is_read', false),
          supabase.from('projects').select('*', { count: 'exact', head: true }),
          supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('subject', 'volunteer'),
          supabase.from('donations').select('*', { count: 'exact', head: true })
        ]);

        setStats([
          { name: 'Nouveaux Messages', value: (messagesCount || 0).toString(), icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { name: 'Total Projets', value: (projectsCount || 0).toString(), icon: FolderKanban, color: 'text-green-500', bg: 'bg-green-500/10' },
          { name: 'Candidatures Bénévoles', value: (volunteersCount || 0).toString(), icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10' },
          { name: 'Dons Initiés', value: (donationsCount || 0).toString(), icon: HeartHandshake, color: 'text-pink-500', bg: 'bg-pink-500/10' },
        ]);
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques", error);
      }
    }

    fetchStats();
  }, [supabase]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-2">Vue d'ensemble</h1>
      <p className="text-muted-foreground mb-8">Bienvenue sur le tableau de bord d'administration de GESIS.</p>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-card rounded-2xl p-6 border border-border shadow-sm flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Raccourcis ou actions rapides pourraient aller ici */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Activité récente</h2>
          <div className="flex items-center justify-center h-48 bg-muted/20 rounded-xl border border-dashed border-border text-muted-foreground text-sm">
            L'historique des activités s'affichera ici.
          </div>
        </div>
        
        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Tâches en attente</h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 p-3 bg-muted/20 rounded-xl">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-sm text-foreground">Vérifier les nouvelles candidatures de bénévoles</span>
            </li>
            <li className="flex items-center gap-3 p-3 bg-muted/20 rounded-xl">
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
              <span className="text-sm text-foreground">Mettre à jour les actualités du mois</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
