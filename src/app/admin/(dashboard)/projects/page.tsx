"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Edit, Trash2, FolderKanban, X, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title_fr: '',
    title_en: '',
    category_fr: '',
    description_fr: '',
    is_published: true,
    cover_image: ''
  });

  const supabase = createClient();

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProjects(data);
    }
    setLoading(false);
  };

  const deleteProject = async (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer ce projet ?")) {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (!error) {
        setProjects(projects.filter(p => p.id !== id));
      }
    }
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `projects/${fileName}`;

    setSaving(true);
    const { error: uploadError } = await supabase.storage
      .from('team-images') // Réutilisation du bucket existant (qui a déjà les bonnes politiques RLS)
      .upload(filePath, file);

    if (uploadError) {
      alert("Erreur lors de l'upload de l'image.");
      setSaving(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('team-images')
      .getPublicUrl(filePath);

    setFormData({ ...formData, cover_image: publicUrl });
    setSaving(false);
  };

  const openModalForNew = () => {
    setEditingId(null);
    setFormData({ title_fr: '', title_en: '', category_fr: '', description_fr: '', is_published: true, cover_image: '' });
    setIsModalOpen(true);
  };

  const openModalForEdit = (project: any) => {
    setEditingId(project.id);
    setFormData({
      title_fr: project.title_fr || '',
      title_en: project.title_en || '',
      category_fr: project.category_fr || '',
      description_fr: project.description_fr || '',
      is_published: project.is_published ?? true,
      cover_image: project.cover_image || ''
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    if (editingId) {
      const { error } = await supabase
        .from('projects')
        .update(formData)
        .eq('id', editingId);

      if (!error) {
        setProjects(projects.map(p => p.id === editingId ? { ...p, ...formData } : p));
        setIsModalOpen(false);
      } else {
        alert("Erreur lors de la modification.");
      }
    } else {
      const { data, error } = await supabase
        .from('projects')
        .insert([formData])
        .select();

      if (!error && data) {
        setProjects([data[0], ...projects]);
        setIsModalOpen(false);
      } else {
        alert("Erreur lors de l'ajout.");
      }
    }
    setSaving(false);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Gestion des Projets</h1>
          <p className="text-muted-foreground">Ajoutez, modifiez ou supprimez les actions de l'ONG.</p>
        </div>
        <Button onClick={openModalForNew} className="flex items-center gap-2">
          <Plus size={18} /> Nouveau Projet
        </Button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-lg rounded-2xl p-6 shadow-xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold mb-6">{editingId ? 'Modifier le Projet' : 'Nouveau Projet'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Image de Couverture</label>
                {formData.cover_image && (
                  <div className="mb-2 relative w-full h-32 rounded-xl overflow-hidden border border-border">
                    <img src={formData.cover_image} alt="Couverture" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={uploadImage}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors" 
                  />
                  {saving && <span className="text-xs text-primary font-medium animate-pulse">Upload...</span>}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Titre du Projet (Français)</label>
                <input required value={formData.title_fr} onChange={e => setFormData({...formData, title_fr: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-background" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Titre (Anglais - Optionnel)</label>
                <input value={formData.title_en} onChange={e => setFormData({...formData, title_en: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-background" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Catégorie</label>
                <select required value={formData.category_fr} onChange={e => setFormData({...formData, category_fr: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-background">
                  <option value="">Sélectionnez une catégorie...</option>
                  <option value="Éducation">Éducation</option>
                  <option value="Environnement">Environnement</option>
                  <option value="Paix & Solidarité">Paix & Solidarité</option>
                  <option value="Institutionnel">Institutionnel</option>
                  <option value="Droits & Inclusion">Droits & Inclusion</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Description Courte</label>
                <textarea required rows={3} value={formData.description_fr} onChange={e => setFormData({...formData, description_fr: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-background resize-none" />
              </div>
              <div className="flex items-center gap-2 mt-4">
                <input type="checkbox" id="published" checked={formData.is_published} onChange={e => setFormData({...formData, is_published: e.target.checked})} className="w-4 h-4 rounded border-gray-300" />
                <label htmlFor="published" className="text-sm font-medium">Publier immédiatement</label>
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Annuler</Button>
                <Button type="submit" disabled={saving}>{saving ? 'Sauvegarde...' : (editingId ? 'Mettre à jour' : 'Créer le projet')}</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-muted-foreground">Chargement des projets...</div>
        ) : projects.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground mb-4">
              <FolderKanban size={32} />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-1">Aucun projet trouvé</h3>
            <p className="text-muted-foreground mb-6">Commencez par ajouter votre première action sur le terrain.</p>
            <Button onClick={openModalForNew} variant="outline" className="flex items-center gap-2">
              <Plus size={18} /> Nouveau Projet
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="p-4 font-semibold text-foreground w-16">Image</th>
                  <th className="p-4 font-semibold text-foreground">Titre (FR)</th>
                  <th className="p-4 font-semibold text-foreground">Catégorie</th>
                  <th className="p-4 font-semibold text-foreground">Statut</th>
                  <th className="p-4 font-semibold text-foreground">Date</th>
                  <th className="p-4 font-semibold text-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-muted/20 transition-colors">
                    <td className="p-4">
                      {project.cover_image ? (
                        <img src={project.cover_image} alt="" className="w-10 h-10 rounded-lg object-cover border border-border" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground border border-border">
                          <ImageIcon size={16} />
                        </div>
                      )}
                    </td>
                    <td className="p-4 font-medium text-foreground">{project.title_fr}</td>
                    <td className="p-4 text-muted-foreground">{project.category_fr}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${project.is_published ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}`}>
                        {project.is_published ? 'Publié' : 'Brouillon'}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {project.date_start ? new Date(project.date_start).getFullYear() : '-'}
                    </td>
                    <td className="p-4 flex items-center justify-end gap-2">
                      <button 
                        onClick={() => openModalForEdit(project)}
                        className="p-2 text-muted-foreground hover:text-primary transition-colors bg-muted/50 hover:bg-primary/10 rounded-lg"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => deleteProject(project.id)}
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
