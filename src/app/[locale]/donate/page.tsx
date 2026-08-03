"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, CreditCard, Banknote, Landmark, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { TypewriterText } from '@/components/ui/TypewriterText';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';
import { useTranslations } from 'next-intl';

export default function DonatePage() {
  const t = useTranslations('Donate');
  
  const [amount, setAmount] = useState<number | 'other'>(50);
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
  const [method, setMethod] = useState<'card' | 'momo' | 'bank'>('card');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    whatsapp: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const presetAmounts = [10, 20, 50, 100];
  const supabase = createClient();

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email) return;
    
    setStatus('loading');
    
    const finalAmount = amount === 'other' ? parseFloat(customAmount) : amount;
    
    if (!finalAmount || isNaN(finalAmount)) {
      setStatus('error');
      return;
    }

    const { error } = await supabase.from('donations').insert([{
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      amount: finalAmount,
      currency: 'EUR',
      message: `Méthode: ${method}\nFréquence: ${frequency}\nWhatsApp: ${formData.whatsapp || 'Non renseigné'}`,
      status: 'pending'
    }]);

    if (error) {
      console.error(error);
      setStatus('error');
    } else {
      setStatus('success');
    }
  };

  return (
    <main className="min-h-screen pb-24">
      {/* Hero Donate */}
      <section className="relative bg-gradient-to-br from-accent/10 via-background to-primary/10 pt-32 pb-20 text-center border-b border-border overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
        
        <div className="container relative z-10 mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent mb-6 text-sm font-semibold uppercase tracking-wide border border-accent/20 shadow-sm"
          >
            <Heart size={16} className="fill-accent" /> {t('badge')}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight"
          >
            {t('title1')} <TypewriterText text={t('title2')} delay={0.6} className="text-accent" />
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground leading-relaxed font-light"
          >
            {t('desc')}
          </motion.p>
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-5xl mt-16">
        <div className="grid lg:grid-cols-5 gap-12">
          
          {/* Donation Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-3 bg-card rounded-3xl border border-border shadow-lg p-6 md:p-10"
          >
            {status === 'success' ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart size={40} className="text-primary fill-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{t('successTitle')}</h3>
                <p className="text-muted-foreground mb-8">
                  {t('successDesc', { method: method === 'card' ? t('card') : method === 'momo' ? t('momo') : t('bank') })}
                </p>
                <Button onClick={() => setStatus('idle')}>{t('btnAnother')}</Button>
              </div>
            ) : (
              <form onSubmit={handleDonate}>
                <h3 className="text-2xl font-bold text-foreground mb-8">{t('formTitle')}</h3>
                
                {status === 'error' && (
                  <div className="p-4 bg-destructive/10 text-destructive rounded-xl flex items-center gap-2 mb-6">
                    <AlertCircle size={20} />
                    <span className="text-sm font-medium">{t('errorMsg')}</span>
                  </div>
                )}
                
                {/* Contact Info */}
                <div className="mb-8 grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-2">{t('firstName')}</label>
                    <input required maxLength={50} value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full px-4 py-3 rounded-xl border bg-background" placeholder="Jean" />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">{t('lastName')}</label>
                    <input maxLength={50} value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full px-4 py-3 rounded-xl border bg-background" placeholder="Dupont" />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">{t('email')}</label>
                    <input required maxLength={100} type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border bg-background" placeholder="jean.dupont@email.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">{t('whatsapp')}</label>
                    <input type="tel" maxLength={20} value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} className="w-full px-4 py-3 rounded-xl border bg-background" placeholder="+229 00 00 00 00" />
                  </div>
                </div>

                {/* Amount */}
                <div className="mb-8">
                  <label className="text-sm font-medium text-foreground block mb-3">{t('amount')}</label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {presetAmounts.map(val => (
                      <button 
                        key={val}
                        type="button"
                        onClick={() => setAmount(val)}
                        className={`py-3 rounded-xl border font-bold text-lg transition-all ${amount === val ? 'border-primary bg-primary text-white shadow-md' : 'border-border bg-background text-foreground hover:border-primary/50'}`}
                      >
                        {val}€
                      </button>
                    ))}
                    <button 
                      type="button"
                      onClick={() => setAmount('other')}
                      className={`py-3 rounded-xl border font-semibold transition-all ${amount === 'other' ? 'border-primary bg-primary text-white shadow-md' : 'border-border bg-background text-foreground hover:border-primary/50'}`}
                    >
                      {t('other')}
                    </button>
                  </div>
                  {amount === 'other' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4"
                    >
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold text-lg">€</span>
                        <input 
                          type="number" 
                          min="1"
                          required
                          value={customAmount}
                          onChange={e => setCustomAmount(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-lg font-bold focus:outline-none focus:ring-2 focus:ring-primary/50"
                          placeholder={t('customAmount')}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Payment Method */}
                <div className="mb-10">
                  <label className="text-sm font-medium text-foreground block mb-3">{t('paymentMethod')}</label>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <button 
                      type="button"
                      onClick={() => setMethod('card')}
                      className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${method === 'card' ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-background text-muted-foreground hover:border-primary/50'}`}
                    >
                      <CreditCard size={24} />
                      <span className="text-sm font-semibold">{t('card')}</span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setMethod('momo')}
                      className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${method === 'momo' ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-background text-muted-foreground hover:border-primary/50'}`}
                    >
                      <Banknote size={24} />
                      <span className="text-sm font-semibold">{t('momo')}</span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setMethod('bank')}
                      className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${method === 'bank' ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-background text-muted-foreground hover:border-primary/50'}`}
                    >
                      <Landmark size={24} />
                      <span className="text-sm font-semibold">{t('bank')}</span>
                    </button>
                  </div>
                </div>

                <Button type="submit" disabled={status === 'loading'} className="w-full py-6 text-lg justify-center gap-2">
                  {status === 'loading' ? (
                    <><Loader2 size={20} className="animate-spin" /> {t('btnLoading')}</>
                  ) : (
                    <><Heart size={20} className="fill-current" /> {t('btnSubmit')}</>
                  )}
                </Button>
                
                <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground">
                  <ShieldCheck size={16} className="text-green-500" /> {t('secure')}
                </div>
              </form>
            )}
          </motion.div>

          {/* Impact Info */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-primary/5 border border-primary/10 rounded-3xl p-8"
            >
              <h4 className="text-xl font-bold text-foreground mb-4">{t('impactTitle')}</h4>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <CheckCircle2 className="text-primary shrink-0" size={24} />
                  <span className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.raw('impact1') }} />
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="text-primary shrink-0" size={24} />
                  <span className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.raw('impact2') }} />
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="text-primary shrink-0" size={24} />
                  <span className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.raw('impact3') }} />
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-muted/50 border border-border rounded-3xl p-8"
            >
              <h4 className="font-bold text-foreground mb-2">{t('transparencyTitle')}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('transparencyDesc')}
              </p>
            </motion.div>
          </div>

        </div>
      </section>
    </main>
  );
}
