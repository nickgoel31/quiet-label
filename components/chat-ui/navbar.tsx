"use client"

import { Zap, BrainCircuit, ListFilter, Menu } from 'lucide-react';
import React from 'react'
import ModelSelector from '../modelselector';

const Navbar = ({ 
  viewMode, 
  setViewMode, 
  selectedModel, 
  setSelectedModel, 
  setIsSidebarOpen, // Pass this from your parent component
  setCurrentSelectedBlock, // Pass this from your parent component
}: any) => {

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-zinc-50/80 backdrop-blur-sm pt-1.5 pb-2 px-4">
      <div className="flex items-center justify-between gap-4">
        
        {/* --- LEFT SIDE: MOBILE HAMBURGER & TABS --- */}
        <div className='flex items-center gap-2 overflow-hidden'>
          
          {/* Mobile Menu Toggle (Visible only on small screens) */}
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 lg:hidden text-neutral-600 hover:bg-zinc-200/50 rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>

          {/* View Mode Tabs (Scrollable on Mobile) */}
          <div id='navigation' className='flex gap-1 overflow-x-auto no-scrollbar pb-1 sm:pb-0'>
            <button 
              onClick={() => {
                setViewMode('whisper')
                // scroll back to top when clicked
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              className={`flex items-center gap-2 px-3 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all border-b-2 ${
                viewMode === 'whisper' ? 'text-neutral-900 border-neutral-900' : 'text-neutral-400 border-transparent hover:text-neutral-600'
              }`}
            >
              <Zap size={14} /> 
              <span className="hidden lg:block">The Whisper</span>
            </button>

            <button 
              onClick={() => {
                setViewMode('deep-dive')
                // scroll back to top when clicked
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              className={`flex items-center gap-2 px-3 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all border-b-2 ${
                viewMode === 'deep-dive' ? 'text-neutral-900 border-neutral-900' : 'text-neutral-400 border-transparent hover:text-neutral-600'
              }`}
            >
              <BrainCircuit size={14} /> 
              <span className="hidden lg:block">Deep Dive</span>
            </button>

            <button 
              onClick={() => {
                setViewMode('full')
                // scroll back to top when clicked
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              className={`flex items-center gap-2 px-3 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all border-b-2 ${
                viewMode === 'full' ? 'text-neutral-900 border-neutral-900' : 'text-neutral-400 border-transparent hover:text-neutral-600'
              }`}
            >
              <ListFilter size={14} /> 
              <span className="hidden lg:block">Full Comp</span>
            </button>
          </div>
        </div>

        {/* --- RIGHT SIDE: MODEL SELECTOR --- */}
        <div id="model-select" className="flex-shrink-0">
          <ModelSelector 
            selectedModel={selectedModel} 
            setSelectedModel={setSelectedModel} 
            setCurrentSelectedBlock={setCurrentSelectedBlock}
          />
        </div>

      </div>
    </nav>
  )
}

export default Navbar