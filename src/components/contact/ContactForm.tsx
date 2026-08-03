"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { createClient } from '@/lib/supabase/client';
import { useTranslations } from 'next-intl';

export function ContactForm() {
  const t = useTranslations('Contact');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: 'general_info',
    message: ''
  });
  
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      // Insertion dans Supabase
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          }
        ]);

      if (error) throw error;

      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', subject: 'general_info', message: '' });
      
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error("Erreur lors de l'envoi du message:", err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="bg-card p-8 md:p-10 rounded-3xl border border-border shadow-sm">
      <h3 className="text-2xl font-bold text-foreground mb-6">{t('formTitle')}</h3>
      
      {status === 'success' ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center text-center py-12"
        >
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 size={32} />
          </div>
          <h4 className="text-xl font-bold text-foreground mb-2">{t('successTitle')}</h4>
          <p className="text-muted-foreground">
            {t('successDesc')}
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {status === 'error' && (
            <div className="p-4 bg-destructive/10 text-destructive rounded-xl flex items-center gap-2 mb-6">
              <AlertCircle size={20} />
              <span className="text-sm font-medium">{t('errorMsg')}</span>
            </div>
          )}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium text-foreground">
                {t('firstName')} <span className="text-primary">*</span>
              </label>
              <input 
                type="text" 
                id="firstName" 
                required
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                maxLength={50}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                placeholder="Jean"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium text-foreground">
                {t('lastName')} <span className="text-primary">*</span>
              </label>
              <input 
                type="text" 
                id="lastName" 
                required
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                maxLength={50}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                placeholder="Dupont"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              {t('email')} <span className="text-primary">*</span>
            </label>
            <input 
              type="email" 
              id="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              maxLength={100}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
              placeholder="jean.dupont@exemple.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium text-foreground">
              {t('subject')}
            </label>
            <select 
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
            >
              <option value="general_info">{t('optGeneral')}</option>
              <option value="partnership">{t('optPartnership')}</option>
              <option value="volunteer">{t('optVolunteer')}</option>
              <option value="media">{t('optMedia')}</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-foreground">
              {t('message')} <span className="text-primary">*</span>
            </label>
            <textarea 
              id="message" 
              required
              rows={5}
              maxLength={1500}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none"
              placeholder={t('messagePlaceholder')}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full justify-center text-lg py-6"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? (
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {t('btnSubmitting')}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                {t('btnSubmit')} <Send size={18} />
              </span>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
