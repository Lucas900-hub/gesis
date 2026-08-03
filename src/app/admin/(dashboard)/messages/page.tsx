"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Mail, CheckCircle, Clock } from 'lucide-react';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    setLoading(true);
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setMessages(data);
    }
    setLoading(false);
  };

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from('contact_messages')
      .update({ is_read: true })
      .eq('id', id);
    
    if (!error) {
      setMessages(messages.map(m => m.id === id ? { ...m, is_read: true } : m));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Boîte de réception</h1>
          <p className="text-muted-foreground">Gérez les formulaires de contact soumis sur le site.</p>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-muted-foreground">Chargement des messages...</div>
        ) : messages.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground">Aucun message pour le moment.</div>
        ) : (
          <div className="divide-y divide-border">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`p-6 transition-colors ${message.is_read ? 'bg-card' : 'bg-primary/5'}`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${message.is_read ? 'bg-muted text-muted-foreground' : 'bg-primary text-white'}`}>
                      <Mail size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-foreground">
                          {message.first_name} {message.last_name}
                        </h3>
                        {!message.is_read && (
                          <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                            Nouveau
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <a href={`mailto:${message.email}`} className="hover:text-primary transition-colors">
                          {message.email}
                        </a>
                        {message.phone && <span>• {message.phone}</span>}
                        <span>• Sujet : {message.subject}</span>
                      </div>
                      <div className="text-foreground bg-muted/30 p-4 rounded-xl border border-border/50 whitespace-pre-wrap">
                        {message.message}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-4 md:min-w-[150px]">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock size={12} />
                      {new Date(message.created_at).toLocaleDateString('fr-FR', { 
                        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </div>
                    
                    {!message.is_read && (
                      <button 
                        onClick={() => markAsRead(message.id)}
                        className="flex items-center gap-1 text-sm text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors font-medium"
                      >
                        <CheckCircle size={16} /> Marquer lu
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
