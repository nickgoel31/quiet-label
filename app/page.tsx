"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, ShieldCheck, Search, MessageSquare, 
  ArrowRight, Sparkles, Eye, ShieldAlert, CheckCircle2, 
  Camera
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="p-8 bg-white border border-neutral-200 rounded-3xl hover:border-neutral-900 transition-all duration-500 group"
  >
    <div className="w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-500">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-serif mb-3 italic">{title}</h3>
    <p className="text-neutral-500 leading-relaxed text-sm">{description}</p>
  </motion.div>
);

export default function LandingPage() {
  const onStart = () => {
    // Navigate to chat page
    window.location.href = '/chat';
  }
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-neutral-200">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
       

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 text-[10px] font-bold uppercase tracking-widest mb-8"
          >
            <Sparkles size={12} className="text-violet-500" />
            AI-Native Health Copilot
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif font-light tracking-tight mb-8 leading-[1.1]"
          >
            Deciphering the <br />
            <span className="italic">Hidden Language</span> of Labels.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-500 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Quiet Label doesn&apos;t just list ingredients. It reasons through them, showing you exactly what impacts your health.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={onStart}
              className="px-8 py-4 bg-neutral-900 text-white rounded-2xl font-medium hover:bg-neutral-800 transition-all flex items-center gap-3 group shadow-xl cursor-pointer"
            >
              Analyze Your Product <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
           
          </motion.div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Camera} 
            title="Label OCR" 
            description="Snap a photo of any nutrition label. Our engine extracts ingredients of it and provides a detailed analysis."
            delay={0.1}
          />
          <FeatureCard 
            icon={Zap} 
            title="Reasoning Engine" 
            description="We filter out the 'fluff'. Our AI analyzes ingredients based on your health goals, backed by scientific literature."
            delay={0.2}
          />
          <FeatureCard 
            icon={MessageSquare} 
            title="Contextual Chat" 
            description="Ask follow-up questions. 'Why is this oil bad?' or 'Is this safe for hypertension?' Get instant, science-backed answers."
            delay={0.3}
          />
        </div>
      </section>

      {/* --- THE ANATOMY OF A WHISPER --- */}
      <section className="py-24 bg-white border-y border-neutral-200 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif mb-6 italic leading-tight">Beyond Simple Scans.</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="shrink-0 w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] font-bold">1</div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest mb-1">Inferred Intent</h4>
                  <p className="text-neutral-500 text-sm">We analyze why you&apos;re looking at a product—whether it&apos;s blood sugar management or weight loss.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] font-bold">2</div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest mb-1">Uncertainty Mapping</h4>
                  <p className="text-neutral-500 text-sm">If the science is mixed, we tell you. No fake certainties—just transparent, evidence-based reasoning.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] font-bold">3</div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest mb-1">Temporal Impact</h4>
                  <p className="text-neutral-500 text-sm">Understand what happens 2 hours after consumption vs. 20 years of habituation.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-violet-500/10 blur-3xl rounded-full" />
            <motion.div 
              initial={{ rotate: -2, scale: 0.95 }}
              whileInView={{ rotate: 0, scale: 1 }}
              className="relative bg-neutral-50 border border-neutral-200 p-8 rounded-[2.5rem] shadow-2xl"
            >
               {/* Mockup UI of your app */}
               <div className="space-y-4">
                  <div className="h-4 w-full bg-neutral-200 rounded-full " />
                  <div className="h-12 w-full bg-neutral-200 rounded-2xl " />
                  <div className="p-4 bg-white border border-neutral-200 rounded-2xl shadow-sm">
                    <div className="flex justify-between mb-4"><div className="h-3 w-12 bg-neutral-100" /><div className="h-3 w-12 bg-neutral-100" /></div>
                    <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: '70%' }} transition={{ duration: 1.5 }} className="h-full bg-neutral-900" />
                    </div>
                  </div>
                  <div className="h-20 w-full bg-neutral-100 rounded-2xl border border-dashed border-neutral-300 flex items-center justify-center text-[10px] uppercase font-bold text-neutral-400">
                    Quiet Label Response
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 px-6 border-t border-neutral-200 text-center">
        <h2 className="text-2xl font-serif italic mb-8">Quiet Label</h2>
        <p className="text-neutral-400 text-sm mb-8 max-w-sm mx-auto">
          An EnCode 2026 Submission.
        </p>
        <p className='text-neutral-500 text-sm mb-2 max-w-sm mx-auto'>
          Developed by Harsh Goel
        </p>
        <div className="flex justify-center gap-6 text-neutral-400">
           <a href="https://github.com/nickgoel31/quiet-label" target="_blank" className="hover:text-neutral-900 transition-colors">GitHub</a>
        </div>
        
      </footer>
    </div>
  );
}