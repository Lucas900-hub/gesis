"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Edit, Trash2, Users, X, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminTeamPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const initialFormState = {
    id: '',
    first_name: '',
    last_name: '',
    role_fr: '',
    role_en: '',
    description_fr: '',
    description_en: '',
    image_url: '',
    is_board_member: false
  };
  
  const [formData, setFormData] = useState(initialFormState);

  const supabase = createClient();

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    setLoading(true);
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('order_index', { ascending: true });

    if (!error && data) {
      setMembers(data);
    }
    setLoading(false);
  };

  const deleteMember = async (id: string) => {
    if (confirm("Voulez-vous vraiment retirer ce membre de l'équipe ?")) {
      const { error } = await supabase.from('team_members').delete().eq('id', id);
      if (!error) {
        setMembers(members.filter(m => m.id !== id));
      }
    }
  };

  const handleEdit = (member: any) => {
    setFormData({
      id: member.id,
      first_name: member.first_name || '',
      last_name: member.last_name || '',
      role_fr: member.role_fr || '',
      role_en: member.role_en || '',
      description_fr: member.description_fr || '',
      description_en: member.description_en || '',
      image_url: member.image_url || '',
      is_board_member: member.is_board_member || false
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setFormData(initialFormState);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Optional: show a loading state specifically for the image
    setSaving(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `team/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, image_url: publicUrl }));
    } catch (error) {
      alert("Erreur lors de l'upload de l'image. Assurez-vous d'avoir créé un bucket de stockage nommé 'images' en mode public dans Supabase.");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const payload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      role_fr: formData.role_fr,
      role_en: formData.role_en,
      description_fr: formData.description_fr,
      description_en: formData.description_en,
      image_url: formData.image_url,
      is_board_member: formData.is_board_member
    };

    let response;
    
    if (isEditing) {
      response = await supabase
        .from('team_members')
        .update(payload)
        .eq('id', formData.id)
        .select();
    } else {
      response = await supabase
        .from('team_members')
        .insert([payload])
        .select();
    }

    if (!response.error && response.data) {
      if (isEditing) {
        setMembers(members.map(m => m.id === formData.id ? response.data[0] : m));
      } else {
        setMembers([...members, response.data[0]]);
      }
      setIsModalOpen(false);
      setFormData(initialFormState);
    } else {
      alert("Erreur lors de la sauvegarde.");
      console.error(response.error);
    }
    setSaving(false);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Gestion de l'Équipe</h1>
          <p className="text-muted-foreground">Ajoutez, modifiez ou supprimez les membres de votre organisation.</p>
        </div>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <Plus size={18} /> Ajouter un membre
        </Button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card w-full max-w-2xl rounded-2xl p-6 shadow-xl relative my-8">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold mb-6">{isEditing ? 'Modifier le membre' : 'Nouveau membre'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Prénom</label>
                  <input required value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-background" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Nom</label>
                  <input required value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-background" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Rôle (Français)</label>
                  <input required value={formData.role_fr} onChange={e => setFormData({...formData, role_fr: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-background" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Rôle (Anglais)</label>
                  <input value={formData.role_en} onChange={e => setFormData({...formData, role_en: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-background" placeholder="Optionnel" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Description (Français)</label>
                <textarea rows={3} value={formData.description_fr} onChange={e => setFormData({...formData, description_fr: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-background resize-none" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Description (Anglais)</label>
                <textarea rows={3} value={formData.description_en} onChange={e => setFormData({...formData, description_en: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-background resize-none" placeholder="Optionnel" />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Photo</label>
                <div className="flex gap-2 items-center">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload} 
                    className="w-full px-3 py-2 border rounded-lg bg-background text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer" 
                  />
                </div>
                {formData.image_url && (
                  <div className="mt-2 text-xs text-muted-foreground break-all">
                    Aperçu: <img src={formData.image_url} alt="Preview" className="w-16 h-16 object-cover rounded-full inline-block ml-2 border" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mt-4">
                <input type="checkbox" id="board" checked={formData.is_board_member} onChange={e => setFormData({...formData, is_board_member: e.target.checked})} className="w-4 h-4 rounded border-gray-300" />
                <label htmlFor="board" className="text-sm font-medium">Fait partie du Bureau Exécutif (affiché sur l'accueil)</label>
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Annuler</Button>
                <Button type="submit" disabled={saving}>{saving ? 'Sauvegarde...' : 'Enregistrer'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-muted-foreground">Chargement de l'équipe...</div>
        ) : members.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground mb-4">
              <Users size={32} />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-1">L'équipe est vide</h3>
            <p className="text-muted-foreground mb-6">Ajoutez les membres du bureau et les responsables de pôles.</p>
            <Button onClick={handleAddNew} variant="outline" className="flex items-center gap-2">
              <Plus size={18} /> Ajouter un membre
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="p-4 font-semibold text-foreground">Nom & Prénom</th>
                  <th className="p-4 font-semibold text-foreground">Rôle</th>
                  <th className="p-4 font-semibold text-foreground">Membre du Bureau</th>
                  <th className="p-4 font-semibold text-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-bold text-foreground">
                      {member.first_name} {member.last_name}
                    </td>
                    <td className="p-4 text-muted-foreground">{member.role_fr}</td>
                    <td className="p-4">
                      {member.is_board_member ? (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary">
                          Oui
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-sm">Non</span>
                      )}
                    </td>
                    <td className="p-4 flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleEdit(member)}
                        className="p-2 text-muted-foreground hover:text-primary transition-colors bg-muted/50 hover:bg-primary/10 rounded-lg"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => deleteMember(member.id)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors bg-muted/50 hover:bg-destructive/10 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
