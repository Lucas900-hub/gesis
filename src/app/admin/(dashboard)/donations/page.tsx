"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Heart, CheckCircle, Clock, Banknote, CreditCard, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchDonations();
  }, []);

  async function fetchDonations() {
    setLoading(true);
    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setDonations(data);
    }
    setLoading(false);
  };

  const markAsCompleted = async (id: string) => {
    const { error } = await supabase
      .from('donations')
      .update({ status: 'completed' })
      .eq('id', id);
    
    if (!error) {
      setDonations(donations.map(d => d.id === id ? { ...d, status: 'completed' } : d));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dons</h1>
          <p className="text-muted-foreground">Gérez les promesses de dons soumises sur le site.</p>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-muted-foreground">Chargement des dons...</div>
        ) : donations.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground">Aucun don pour le moment.</div>
        ) : (
          <div className="divide-y divide-border">
            {donations.map((donation) => (
              <div 
                key={donation.id} 
                className={`p-6 transition-colors ${donation.status === 'completed' ? 'bg-card' : 'bg-accent/5'}`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className={`mt-1 w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${donation.status === 'completed' ? 'bg-muted text-muted-foreground' : 'bg-accent text-white'}`}>
                      <Heart size={20} className={donation.status === 'completed' ? '' : 'fill-white'} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-foreground text-lg">
                          {donation.first_name} {donation.last_name}
                        </h3>
                        {donation.status === 'pending' && (
                          <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs font-bold uppercase tracking-wider">
                            En attente
                          </span>
                        )}
                        {donation.status === 'completed' && (
                          <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-600 text-xs font-bold uppercase tracking-wider">
                            Complété
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-3">
                        <a href={`mailto:${donation.email}`} className="hover:text-primary transition-colors">
                          {donation.email}
                        </a>
                        <span className="font-semibold text-foreground bg-muted px-2 py-1 rounded-md">
                          {donation.amount} {donation.currency}
                        </span>
                      </div>
                      <div className="text-foreground bg-muted/30 p-4 rounded-xl border border-border/50 whitespace-pre-wrap text-sm">
                        <span className="font-semibold block mb-1">Détails :</span>
                        {donation.message}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-4 md:min-w-[150px]">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock size={12} />
                      {new Date(donation.created_at).toLocaleDateString('fr-FR', { 
                        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </div>
                    
                    {donation.status === 'pending' && (
                      <button 
                        onClick={() => markAsCompleted(donation.id)}
                        className="flex items-center gap-1 text-sm text-green-600 hover:bg-green-500/10 px-3 py-1.5 rounded-lg transition-colors font-medium border border-green-500/20"
                      >
                        <CheckCircle size={16} /> Marquer reçu
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
