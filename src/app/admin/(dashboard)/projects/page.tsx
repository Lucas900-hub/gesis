"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Edit, Trash2, FolderKanban, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title_fr: '',
    title_en: '',
    category_fr: '',
    description_fr: '',
    is_published: true
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { data, error } = await supabase
      .from('projects')
      .insert([formData])
      .select();

    if (!error && data) {
      setProjects([data[0], ...projects]);
      setIsModalOpen(false);
      setFormData({ title_fr: '', title_en: '', category_fr: '', description_fr: '', is_published: true });
    } else {
      alert("Erreur lors de l'ajout.");
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
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <Plus size={18} /> Nouveau Projet
        </Button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-lg rounded-2xl p-6 shadow-xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold mb-6">Nouveau Projet</h2>
            <form onSubmit={handleSave} className="space-y-4">
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
                <Button type="submit" disabled={saving}>{saving ? 'Sauvegarde...' : 'Créer le projet'}</Button>
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
            <Button onClick={() => setIsModalOpen(true)} variant="outline" className="flex items-center gap-2">
              <Plus size={18} /> Nouveau Projet
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
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
                      <button className="p-2 text-muted-foreground hover:text-primary transition-colors bg-muted/50 hover:bg-primary/10 rounded-lg">
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
