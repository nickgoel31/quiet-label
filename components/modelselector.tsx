"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Globe, Layers, ChevronDown, Check, Sparkles } from 'lucide-react';

interface ModelSelectorProps {
  selectedModel: 'gemini' | 'llama' | 'both';
  setSelectedModel: (model: 'gemini' | 'llama' | 'both') => void;
}

export default function ModelSelector({ selectedModel, setSelectedModel, setCurrentSelectedBlock }: ModelSelectorProps & { setCurrentSelectedBlock?: (block: any) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const models = [
    { id: 'gemini', label: 'Gemini 2.5', icon: Cpu, desc: 'More Advanced' },
    { id: 'llama', label: 'Llama 4', icon: Globe, desc: 'Fast and Efficient' },
  ];

  const activeModel = models.find(m => m.id === selectedModel) || models[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      {/* --- TRIGGER BUTTON --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-3 py-2 bg-white border border-neutral-200 rounded-xl hover:border-neutral-900 transition-all duration-300 shadow-sm group"
      >
        
        
        <div className="flex flex-col items-start pr-1">
          <span className="text-[10px] font-black uppercase tracking-wider leading-none mb-0.5">
            {activeModel.label}
          </span>
         
        </div>

        <ChevronDown 
          size={14} 
          className={`text-neutral-400 group-hover:text-neutral-900 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* --- DROPDOWN MENU --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 5, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 w-56 bg-white border border-neutral-200 rounded-2xl shadow-2xl z-[100] overflow-hidden p-1.5"
          >
            <div className="px-3 py-2 mb-1">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400">Select Intelligence</p>
            </div>

            {models.map((model) => {
              const isSelected = selectedModel === model.id;
              return (
                <button
                  key={model.id}
                  onClick={() => {
                    setSelectedModel(model.id as any);
                    setIsOpen(false);
                    setCurrentSelectedBlock && setCurrentSelectedBlock(null);

                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`
                    w-full flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 group
                    ${isSelected ? 'bg-neutral-50' : 'hover:bg-neutral-50'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-8 h-8 rounded-lg flex items-center justify-center transition-colors
                      ${isSelected ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-500 group-hover:bg-neutral-200'}
                    `}>
                      <model.icon size={16} />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-xs font-bold text-neutral-900">{model.label}</span>
                      <span className="text-[10px] text-neutral-400">{model.desc}</span>
                    </div>
                  </div>

                  {isSelected && (
                    <motion.div layoutId="check-icon">
                      <Check size={14} className="text-neutral-900" />
                    </motion.div>
                  )}
                </button>
              );
            })}

            {/* Subtle Footer */}
            <div className="mt-1 p-2 bg-neutral-50 rounded-xl flex items-center gap-2">
              <Sparkles size={10} className="text-violet-500" />
              <span className="text-[9px] font-medium text-neutral-500 italic">Switch anytime during chat</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}