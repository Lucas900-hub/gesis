"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>({
    site_name: '',
    contact_email: '',
    contact_phone: '',
    whatsapp_number: '',
    address: '',
    facebook_url: '',
    linkedin_url: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  
  const supabase = createClient();

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    setLoading(true);
    const { data, error } = await supabase.from('site_settings').select('*').limit(1).single();
    if (data) {
      setSettings(data);
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from('site_settings')
        .update({
          site_name: settings.site_name,
          contact_email: settings.contact_email,
          contact_phone: settings.contact_phone,
          whatsapp_number: settings.whatsapp_number,
          address: settings.address,
          facebook_url: settings.facebook_url,
          linkedin_url: settings.linkedin_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', settings.id);

      if (error) throw error;
      setMessage({ type: 'success', text: 'Paramètres mis à jour avec succès.' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center text-muted-foreground">Chargement des paramètres...</div>;
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Paramètres du Site</h1>
        <p className="text-muted-foreground">Gérez les informations générales de l'ONG (contact, réseaux sociaux).</p>
      </div>

      {message && (
        <div className={`p-4 mb-6 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-green-500/10 text-green-600 border border-green-500/20' : 'bg-destructive/10 text-destructive border border-destructive/20'}`}>
          {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-medium">{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-card rounded-2xl border border-border p-6 md:p-8 space-y-8">
        
        {/* Informations Générales */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Informations Générales</h2>
          <div className="grid gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Nom de l'organisation</label>
              <input 
                type="text" 
                value={settings.site_name || ''}
                onChange={e => setSettings({...settings, site_name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Adresse du siège</label>
              <input 
                type="text" 
                value={settings.address || ''}
                onChange={e => setSettings({...settings, address: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </div>

        <hr className="border-border" />

        {/* Contact */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Coordonnées de Contact</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email de contact</label>
              <input 
                type="email" 
                value={settings.contact_email || ''}
                onChange={e => setSettings({...settings, contact_email: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Téléphone principal</label>
              <input 
                type="text" 
                value={settings.contact_phone || ''}
                onChange={e => setSettings({...settings, contact_phone: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium text-foreground">Numéro WhatsApp (avec indicatif, ex: +229...)</label>
              <input 
                type="text" 
                value={settings.whatsapp_number || ''}
                onChange={e => setSettings({...settings, whatsapp_number: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </div>

        <hr className="border-border" />

        {/* Réseaux Sociaux */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Réseaux Sociaux</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Lien Facebook</label>
              <input 
                type="url" 
                value={settings.facebook_url || ''}
                onChange={e => setSettings({...settings, facebook_url: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Lien LinkedIn</label>
              <input 
                type="url" 
                value={settings.linkedin_url || ''}
                onChange={e => setSettings({...settings, linkedin_url: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button type="submit" disabled={saving} className="flex items-center gap-2">
            {saving ? 'Sauvegarde...' : <><Save size={18} /> Enregistrer les modifications</>}
          </Button>
        </div>

      </form>
    </div>
  );
}
