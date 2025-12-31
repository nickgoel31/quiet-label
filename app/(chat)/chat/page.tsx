"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Info, Layers, Zap, ShieldCheck, MousePointer2, RefreshCcw, Sparkles,  Camera, Clock, Activity,  X, User, 
  BrainCircuit,
  Globe,
  Cpu,
  Menu
} from 'lucide-react';

import { analyzeIngredients } from '@/actions/analyse-ing';
import { readStreamableValue } from '@ai-sdk/rsc'; // Add this
import { chatFollowUp } from '@/actions/chat';

import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import ScrollToTop from '@/components/scroll-to-top';
import { TradeoffsCard } from '@/components/trade-offs-card';
import { analyzeIngredientsOpenSource } from '@/actions/groq/analyze-ingredients';
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/chat-ui/navbar';
import { UserSettings } from '@/types';
import Samples from '@/components/samples';
import ProductTour from '@/components/tour-component';

// --- Sub-Components ---

const UncertaintyBar = ({ level, label }: { level: number; label: string }) => (
  <div className="mt-4 pt-4 border-t border-neutral-100">
    <div className="flex justify-between text-[10px] text-neutral-400 uppercase tracking-widest font-bold mb-2">
      <span>Mixed Evidence</span>
      <span>Consensus</span>
    </div>
    <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden relative">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${level * 100}%` }}
        className="h-full bg-neutral-900 shadow-[0_0_10px_rgba(0,0,0,0.1)]"
        transition={{ duration: 1.2, ease: "circOut" }}
      />
    </div>
    <p className="text-xs text-neutral-500 mt-2 italic flex items-center gap-1">
      <Info size={12} /> {label}
    </p>
  </div>
);

const IngredientCard = ({ data, index, onSelect, isSelected }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.15 }}
    onClick={() => onSelect({ data, cardType: 'ingredient' })}
    className={`group cursor-pointer border p-6 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md relative ${
      isSelected ? 'border-neutral-900 bg-neutral-50 shadow-inner' : 'bg-white border-neutral-200 hover:border-neutral-400'
    }`}
  >
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-xl font-medium text-neutral-900">{data.ingredient_name}</h3>
      <div className={`p-2 rounded-full transition-colors ${isSelected ? 'bg-neutral-900 text-white' : 'bg-neutral-50 group-hover:bg-neutral-900 group-hover:text-white'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clipRule="evenodd" />
</svg>

      </div>
    </div>

    <div className="space-y-4">
      <div>
        <h4 className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 mb-1">Reason for inclusion</h4>
        <p className="text-sm text-neutral-700 leading-relaxed">{data.why_its_here}</p>
      </div>
      <div>
        <h4 className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 mb-1">The Concern</h4>
        <p className="text-sm text-neutral-700 leading-relaxed italic">&quot;{data.the_worry}&quot;</p>
      </div>
      <div className="bg-white/50 p-4 rounded-xl border border-neutral-100">
        <h4 className="text-[10px] uppercase tracking-wider font-bold text-neutral-900 mb-1">Contextual Reality</h4>
        <p className="text-sm text-neutral-800 leading-relaxed">{data.contextural_reality}</p>
      </div>
    </div>

    <UncertaintyBar level={data.uncertainity} label={data.consensus} />
  </motion.div>
);

export default function App() {
  const [input, setInput] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeScenario, setActiveScenario] = useState(0); 
  const [viewMode, setViewMode] = useState<'whisper' | 'full' | 'deep-dive'>('whisper'); 
  const [currentSelectedBlock, setCurrentSelectedBlock] = useState<any>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endOfChatRef = useRef<HTMLDivElement>(null);

  const [streamingThoughts, setStreamingThoughts] = useState("");

  const [customApiKey, setCustomApiKey] = useState("");

  const [selectedModel, setSelectedModel] = useState<'gemini' | 'llama' | 'both' | null>(null);
  const [dualAnalysis, setDualAnalysis] = useState<any>(null);

  const [analysisTwo, setAnalysisTwo] = useState<any>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [currentAnalysisLocalStorage, setCurrentAnalysisLocalStorage] = useState<any>(null);

  const [runTour, setRunTour] = useState(false);

  
  useEffect(() => {
    const hasSeenTour = localStorage.getItem('has_seen_tour');
    if (!hasSeenTour && selectedModel && dualAnalysis) {
      setRunTour(true);
      localStorage.setItem('has_seen_tour', 'true');
    }
  }, [selectedModel, dualAnalysis]);

  useEffect(() => {
    if (endOfChatRef.current) {
      endOfChatRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleStoringInLocalStorage = (analysisData: any) => {
    const existingAnalyses = JSON.parse(localStorage.getItem('analyses') || '[]');

    // 2 limit
    if(existingAnalyses.length >= 3) {
      existingAnalyses.pop();
    }

    const newAnalysis = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      data: analysisData
    }
    existingAnalyses.unshift(newAnalysis);
    localStorage.setItem('analyses', JSON.stringify(existingAnalyses));

    window.dispatchEvent(new Event("analysesUpdated"));
  }

  const handleAnalyze = async (manualInput: string | null = null) => {
    const textToAnalyze = manualInput || input;
    if (!textToAnalyze && !selectedImage) return;

    const userSettings:UserSettings = JSON.parse(localStorage.getItem('user_ai_settings') || '{}');

    setIsAnalyzing(true);
    setStreamingThoughts(""); // Reset thoughts
    try {
      const geminiResult = await analyzeIngredients(textToAnalyze, selectedImage || undefined, customApiKey, userSettings);
      
      (async () => {
        for await (const delta of readStreamableValue(geminiResult!.thoughtOutput)) {
          if(delta){
            const match = delta.match(/\*\*(.*?)\*\*/);

            const extractedText = match ? match[1] : "";

            setStreamingThoughts(extractedText);
          }
        }
      })();
      const result = await geminiResult!.finalData;
      const cleanBase64 = selectedImage ? selectedImage.split(",")[1] : null;
      const llamaResult = await analyzeIngredientsOpenSource(textToAnalyze, cleanBase64 || undefined, userSettings);


      setAnalysis(result);
      setAnalysisTwo(llamaResult);
      setDualAnalysis({ gemini: result, llama: llamaResult });
      handleStoringInLocalStorage({ gemini: result, llama: llamaResult});
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setAnalysis(null);
    setAnalysisTwo(null);
    setSelectedModel(null);
    setDualAnalysis(null);
    setInput("");
    setSelectedImage(null);
    // Add this line to clear the actual HTML input
    if (fileInputRef.current) fileInputRef.current.value = "";
    setViewMode('whisper');
    setActiveScenario(0);
    setCurrentSelectedBlock(null);
    setMessages([]);
  };

  const handleSendMessage = async () => {
  if (!query.trim() || !dualAnalysis) return;

  // Capture the current focus to show in the UI and send to AI
  const activeFocus = currentSelectedBlock; 

  const userMessage = { 
    role: 'user', 
    content: query, 
    // This 'context' property is what renders the "Focus: Salt" tag in your UI
    context: activeFocus?.cardType === 'ingredient' 
      ? activeFocus.data.ingredient_name 
      : activeFocus?.cardType === 'context_scenario' 
      ? activeFocus.data.scenario
      : activeFocus?.cardType === 'time_impact'
      ? activeFocus.data
      : activeFocus?.cardType === 'conditional_insight'
      ? activeFocus.data.condition
      : activeFocus?.cardType === 'tradeoffs' 
      ? activeFocus.data
      : activeFocus?.cardType === 'spectrum'
      ? activeFocus.data.spectrum
      : activeFocus?.cardType === 'what_would_i_do'
      ? activeFocus.data.what_would_i_do
      : null
  };
  
  setMessages(prev => [...prev, userMessage]);
  const currentQuery = query;
  setQuery("");
  setIsTyping(true);

  try {
    const response = await chatFollowUp(
      currentQuery, 
      messages, 
      dualAnalysis, 
      activeFocus, // Pass the selected block data
      customApiKey
    );

    const aiMessage = { 
      role: 'model', 
      content: response
    };
    
    setMessages(prev => [...prev, aiMessage]);
  } catch (error) {
    console.error("Chat error:", error);
  } finally {
    setIsTyping(false);
  }
};

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 selection:bg-neutral-200 font-sans flex">
      <ProductTour run={runTour} setRun={setRunTour} />
      <div className='z-500'>
        <Sidebar setCurrentAnalysis={setDualAnalysis} setModel={setSelectedModel} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} reset={reset} currentAnalysisLocalStorage={currentAnalysisLocalStorage} setCurrentAnalysisLocalStorage={setCurrentAnalysisLocalStorage} />
      </div>
      <ScrollToTop />
      <div className="max-w-3xl mx-auto px-6 py-12 w-full">
        <AnimatePresence mode="wait">
          {!dualAnalysis && !analysis && !analysisTwo && !isAnalyzing && (
            <>
              <header id="welcome-area" className="mb-16 space-y-4 ">
                
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-neutral-400">
                  <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 lg:hidden text-neutral-600 hover:bg-zinc-200/50 rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-900">EnCode 2026 Submission</span>
                </motion.div>
                <motion.h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight">
                  Quiet <span className="italic">Label</span>
                </motion.h1>
              </header>

              <motion.div key="input" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                <div className="relative group z-[0]">
                   {selectedImage && (
                    <div className="absolute bottom-4 left-4 group/img">
                      <div className="relative h-12 w-12 rounded-xl overflow-hidden border-2 border-neutral-900 shadow-lg bg-white">
                        <img src={selectedImage} alt="Preview" className="h-full w-full object-cover" />
                        <button onClick={() => {
                          setSelectedImage(null)
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }} className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Paste ingredients or scan a label..."
                    className="w-full h-48 p-6 bg-white border border-neutral-200 rounded-3xl outline-none focus:border-neutral-900 transition-all duration-500 text-neutral-600 leading-relaxed shadow-sm group-hover:shadow-md resize-none"
                  />

                 <div className='absolute w-[105%] h-[105%] blur-2xl top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-[-1] overflow-hidden '>
                   <motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
  style={{
    background: "conic-gradient(from 0deg, transparent, rgba(139, 92, 246, 0.3), transparent)"
  }}
  className='w-[400%] h-[400%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
/>
                 </div>
                  
                 

                  <div className="absolute bottom-6 right-6 flex gap-3">
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                    <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 bg-neutral-100 text-neutral-900 px-6 py-3 rounded-2xl font-medium hover:bg-neutral-200 border border-neutral-200 shadow-sm">
                      <Camera size={18} />
                      <span className="hidden sm:inline">Scan Label</span>
                    </button>
                    <button onClick={() => handleAnalyze()} disabled={!input && !selectedImage} className="flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-2xl font-medium hover:bg-neutral-800 disabled:bg-neutral-200 shadow-lg">
                      <Zap size={16} /> Analyze Ingredients
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-4 flex items-center gap-2">
                    <Activity size={12} /> Use your own API Key
                  </h3>
                  <div className="p-6 bg-white border border-neutral-200 rounded-2xl shadow-sm">
                    <input 
                    className="w-full p-3 border border-neutral-300 rounded-lg mb-4 focus:outline-none focus:border-neutral-900 transition-all text-sm"
                    type="text"
                    placeholder="Enter your Google Generative AI API Key"
                    value={customApiKey}
                    onChange={(e) => setCustomApiKey(e.target.value)}
                    />
                    <p className="text-sm text-neutral-700 leading-relaxed">
                      By default, Quiet Label uses a shared and free API key for analysis. If for some reason default api key is not working then use your own API key. For enhanced privacy and control, you can provide your own API key from Google Cloud&apos;s Generative AI services. This ensures that your data remains confidential and is processed under your own account.
                    </p>
                    <a href="https://ai.google.dev/gemini-api/docs/api-key" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm text-neutral-900 font-medium underline hover:text-neutral-600">
                      Learn how to get your Gemini API Key
                    </a>
                    </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-4 flex items-center gap-2">
                    <MousePointer2 size={12} /> Quick Samples
                  </h3>
                  {/* SAMPLES */}
                 <Samples onSelect={handleAnalyze} />
                </div>
              </motion.div>
            </>
          )}
          
         {isAnalyzing && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-24 flex flex-col items-center justify-center space-y-6">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="w-12 h-12 border-2 border-neutral-100 border-t-neutral-900 rounded-full" />
              <div className="text-center max-w-md px-4">
          <p className="text-sm font-medium tracking-widest uppercase">QuietLabel is Thinking</p>

          <p className="text-xs text-neutral-600 mt-4 animate-pulse">{streamingThoughts || "Initiating reasoning engine..."}</p>
        </div>
            </motion.div>
          )} 

          {/* STAGE 3: THE EXPERT ARENA (SELECTION) */}
          {analysis && analysisTwo && dualAnalysis && !selectedModel && (
            <motion.div key="arena" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-12 py-12">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-serif">Select Your Co-Pilot</h2>
                <p className="text-zinc-500 text-sm">Two distinct reasoning models analyzed this product. Choose a perspective or compare both.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Gemini Arena Option */}
                <div className='relative p-[2px] flex items-center justify-center'>
                    <div className='w-full h-full bg-red-500 absolute z-2 p-6 bg-violet-500 border border-zinc-200 rounded-[2rem] hover:border-zinc-900 cursor-pointer transition-all hover:shadow-xl group flex flex-col'>
                    
                    </div>
                    <div className="absolute top-[-19px] left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-500 via-violet-400 to-purple-500 w-20 py-1 rounded-lg text-[10px] font-medium text-white flex items-center justify-center" >
                        Better Model
                    </div>
                <div onClick={() => setSelectedModel('gemini')} className="p-6 bg-white border border-zinc-200 rounded-[2rem] hover:border-zinc-900 cursor-pointer transition-all hover:shadow-xl group flex flex-col h-full before:content-[''] relative z-10">
                    
                  <div className="flex items-center gap-2 mb-4 text-zinc-400">
                    <Cpu size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Gemini 2.5 Flash</span>
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm leading-relaxed italic mb-6">&quot;{dualAnalysis.gemini.what_research_did_i_do}&quot;</p>
                    <div className="space-y-2 mb-6">
                      <h4 className="text-[9px] font-black uppercase text-zinc-400 tracking-tighter">Research Focus:</h4>
                      <div className="flex flex-wrap gap-2">
                        {dualAnalysis.gemini.research_focus.map(f => (
                          <span key={f} className="text-[10px] bg-zinc-50 border border-zinc-100 px-2 py-0.5 rounded-full text-zinc-500">{f}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-zinc-100 flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-zinc-400">Deep Reasoning</span>
                    <button className="p-2 bg-zinc-50 rounded-full group-hover:bg-zinc-900 group-hover:text-white transition-colors"><Zap size={14}/></button>
                  </div>
                </div>
                </div>

                {/* Llama Arena Option */}
                <div onClick={() => setSelectedModel('llama')} className="p-6 bg-white border border-zinc-200 rounded-[2rem] hover:border-zinc-900 cursor-pointer transition-all hover:shadow-xl group flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-4 text-zinc-400">
                    <Globe size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Llama 4</span>
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm leading-relaxed italic mb-6">&quot;{dualAnalysis.llama.what_research_did_i_do}&quot;</p>
                    <div className="space-y-2 mb-6">
                      <h4 className="text-[9px] font-black uppercase text-zinc-400 tracking-tighter">Research Focus:</h4>
                      <div className="flex flex-wrap gap-2">
                        {dualAnalysis.llama.research_focus.map((f: any) => (
                          <span key={f} className="text-[10px] bg-white border border-zinc-200 px-2 py-0.5 rounded-full text-zinc-500">{f}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-zinc-200/50 flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-zinc-400">
                      Dumber Model
                    </span>
                    <button className="p-2 bg-white rounded-full group-hover:bg-zinc-900 group-hover:text-white transition-colors border border-zinc-200"><Zap size={14}/></button>
                  </div>
                </div>
              </div>
             
            </motion.div>
          )}
          
          {selectedModel && dualAnalysis && (
            <>
              <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} id='main' className="space-y-12 pb-72 w-full">
                <Navbar viewMode={viewMode} setViewMode={setViewMode} selectedModel={selectedModel} setSelectedModel={setSelectedModel} setIsSidebarOpen={setIsSidebarOpen} setCurrentSelectedBlock={setCurrentSelectedBlock} />

                {viewMode === 'deep-dive' ? (
                  <div className="space-y-12 animate-in fade-in duration-500">
                    <section>
                      <h2 className="text-2xl font-serif leading-tight text-neutral-800 italic">Inferred Intent</h2>
                      
                      <p className="text-lg leading-relaxed text-neutral-700 mt-2">{dualAnalysis[selectedModel].inferred_intent_user_concern}</p>
                    </section>
                    <ProcessingSpectrum score={dualAnalysis[selectedModel].spectrum_between_whole_food_and_ultra_processed} onSelect={setCurrentSelectedBlock} isSelected={
                      currentSelectedBlock?.data?.spectrum !== dualAnalysis[selectedModel].spectrum_between_whole_food_and_ultra_processed.spectrum
                    }/>
                    
                    
                    
                    <section className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="mt-1 p-2 bg-neutral-900 text-white rounded-lg shadow-md"><ShieldCheck size={20} /></div>
                        <div className="space-y-2">
                          <h2 className="text-2xl font-serif leading-tight text-neutral-800 italic">{dualAnalysis[selectedModel].product_name}</h2>
                          <p className="text-lg leading-relaxed text-neutral-700 border-l-2 border-neutral-900 pl-6">{dualAnalysis[selectedModel].judgment}</p>
                        </div>
                      </div>
                    </section>

                    <TradeoffsCard tradeoffs={dualAnalysis[selectedModel].tradeoffs} onSelect={setCurrentSelectedBlock} isSelected={currentSelectedBlock?.data === dualAnalysis[selectedModel].tradeoffs} />

                    <section className="space-y-4">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400">INGREDIENTS THAT CAUGHT MY ATTENTION</h3>
                      <div className="grid gap-6">
                        {dualAnalysis[selectedModel].highlighted_ingredients.map((item: any, i: number) => (
                          <IngredientCard key={i} data={item} index={i} onSelect={setCurrentSelectedBlock} isSelected={currentSelectedBlock?.data?.ingredient_name === item.ingredient_name} />
                        ))}
                      </div>
                    </section>

                    <section className="space-y-5">
                      <h3>
                        <span className="text-sm font-bold uppercase tracking-widest text-neutral-400">Time-Based Impact Analysis</span>
                      </h3>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div onClick={() => setCurrentSelectedBlock({ data: dualAnalysis[selectedModel].time_impact.short_term, cardType: 'time_impact' })} className={`p-6 rounded-2xl cursor-pointer transition-all border ${currentSelectedBlock?.data === dualAnalysis[selectedModel].time_impact.short_term ? 'border-neutral-900 bg-neutral-50' : 'bg-white border-neutral-200'}`}>
                        <div className="flex items-center gap-2 text-neutral-400 mb-3"><Clock size={16} /><span className="text-[10px] font-bold uppercase tracking-widest">Short-Term Impact</span></div>
                        <p className="text-sm text-neutral-800 leading-relaxed">{dualAnalysis[selectedModel].time_impact.short_term}</p>
                      </div>
                      <div onClick={() => setCurrentSelectedBlock({ data: dualAnalysis[selectedModel].time_impact.long_term, cardType: 'time_impact' })} className={`p-6 rounded-2xl cursor-pointer transition-all border ${currentSelectedBlock?.data === dualAnalysis[selectedModel].time_impact.long_term ? 'border-neutral-900 bg-neutral-50' : 'bg-white border-neutral-200'}`}>
                        <div className="flex items-center gap-2 text-neutral-400 mb-3"><Activity size={16} /><span className="text-[10px] font-bold uppercase tracking-widest">Long-Term Impact</span></div>
                        <p className="text-sm text-neutral-800 leading-relaxed">{dualAnalysis[selectedModel].time_impact.long_term}</p>
                      </div>
                      </div>
                    </section>

                    <section className="bg-neutral-900 text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-10"><Layers size={120} /></div>
                      <div className="relative z-10 space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div><h3 className="text-lg font-serif mb-1 italic">Contextual Scenarios</h3><p className="text-neutral-400 text-xs">How impact shifts by usage pattern.</p></div>
                          <div className="flex p-1 bg-white/10 backdrop-blur rounded-xl border border-white/10">
                            {dualAnalysis[selectedModel].context_scenarios.map((s: any, idx: number) => (
                              <button key={idx} onClick={() => setActiveScenario(idx)} className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all ${activeScenario === idx ? 'bg-white text-neutral-900 shadow-lg' : 'text-neutral-400 hover:text-white'}`}>Scenario {idx + 1}</button>
                            ))}
                          </div>
                        </div>
                        <div onClick={() => setCurrentSelectedBlock({ data: dualAnalysis[selectedModel].context_scenarios[activeScenario], cardType: 'context_scenario' })} className={`bg-white/5 cursor-pointer p-5 rounded-2xl border ${currentSelectedBlock?.data?.scenario === dualAnalysis[selectedModel].context_scenarios[activeScenario].scenario ? 'border-white/40' : 'border-white/10'}`}>
                          <div className="flex justify-between items-start mb-2">
                             <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest">{dualAnalysis[selectedModel].context_scenarios[activeScenario].scenario}</span>
                             <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded ${dualAnalysis[selectedModel].context_scenarios[activeScenario].impact_shift === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>{dualAnalysis[selectedModel].context_scenarios[activeScenario].impact_shift} Impact</span>
                          </div>
                          <p className="text-sm text-neutral-300 italic leading-relaxed">{dualAnalysis[selectedModel].context_scenarios[activeScenario].explanation}</p>
                        </div>
                      </div>
                    </section>

                    <section className="space-y-4">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400">Conditional Insights</h3>
                      <div className="grid gap-4">
                        {dualAnalysis[selectedModel].conditional_insights.map((insight: any, i: number) => (
                          <div key={i} onClick={() => setCurrentSelectedBlock({ data: insight, cardType: 'conditional_insight' })} className={`p-4 bg-white border border-neutral-200 rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-all ${currentSelectedBlock?.data === insight ? 'border-neutral-500 bg-neutral-50' : ''}`}>
                            <h4 className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 mb-2">{insight.condition}</h4>
                            <p className="text-sm text-neutral-800 leading-relaxed">
                              <Markdown remarkPlugins={[remarkGfm]}>{insight.insight}</Markdown>
                            </p>
                            <hr className='border-neutral-200 my-2'/>
                            <h4 className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 mb-1">CAN YOU CONSUME THIS BASED ON THE CONDITION?</h4>
                            <p className="text-sm text-neutral-800 leading-relaxed font-bold">{insight.can_consume}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                    <ChangeMyMind points={dualAnalysis[selectedModel].what_would_change_my_mind} onSelect={setCurrentSelectedBlock}/>

                     <div className="space-y-8 animate-in fade-in duration-500">
                    <header><h2 className="text-2xl font-serif text-neutral-800">Compositional Map</h2><p className="text-neutral-500 text-sm mt-1">All detected ingredients.</p></header>
                    <section className="grid gap-4">
                      {dualAnalysis[selectedModel].all_ingredients.map((ing: any, idx: number) => (
                        <div key={idx} onClick={() => setCurrentSelectedBlock({ data: ing, cardType: 'ingredient' })} className={`p-5 rounded-2xl transition-all border cursor-pointer ${currentSelectedBlock?.data?.ingredient_name === ing.ingredient_name ? 'border-neutral-900 bg-white' : ing.impact === 'high' ? 'bg-neutral-900 text-white border-neutral-800' : 'bg-white border-neutral-200'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className={`font-semibold ${ing.impact === 'high' ? 'text-xl' : 'text-sm'}`}>{ing.ingredient_name}</h4>
                            {ing.impact === 'high' && <span className="text-[10px] uppercase font-black bg-white/20 px-2 py-0.5 rounded">Scrutiny High</span>}
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className={`text-[10px] uppercase tracking-widest font-bold ${ing.impact === 'high' ? 'text-neutral-500' : 'text-neutral-500'}`}>{ing.ingredient_function}</span>
                            {ing.reasoning && <p className="mt-3 text-sm text-neutral-400 italic">{ing.reasoning}</p>}
                          </div>
                        </div>
                      ))}
                    </section>
                    
                  </div>

                  {/* AI LIMITATIONS */}
                  <section>
                    <div className="p-6 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg shadow-sm">
                      <h4 className="text-sm font-bold text-amber-800 mb-2">AI Limitations</h4>
                      <p className="text-sm text-amber-700 leading-relaxed">
                        {dualAnalysis[selectedModel].ai_limitations}
                      </p>
                    </div>
                  </section>
                  </div>
                ) : viewMode === 'full' ? (
                  <div className="space-y-8 animate-in fade-in duration-500 w-full">
                    <header><h2 className="text-2xl font-serif text-neutral-800">Compositional Map</h2><p className="text-neutral-500 text-sm mt-1">All detected ingredients.</p></header>
                    <section className="grid gap-4">
                      {dualAnalysis[selectedModel].all_ingredients.map((ing: any, idx: number) => (
                        <div key={idx} onClick={() => setCurrentSelectedBlock({ data: ing, cardType: 'ingredient' })} className={`p-5 rounded-2xl transition-all border cursor-pointer ${currentSelectedBlock?.data?.ingredient_name === ing.ingredient_name ? 'border-neutral-900 bg-white' : ing.impact === 'high' ? 'bg-neutral-900 text-white border-neutral-800' : 'bg-white border-neutral-200'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className={`font-semibold ${ing.impact === 'high' ? 'text-xl' : 'text-sm'}`}>{ing.ingredient_name}</h4>
                            {ing.impact === 'high' && <span className="text-[10px] uppercase font-black bg-white/20 px-2 py-0.5 rounded">Scrutiny High</span>}
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className={`text-[10px] uppercase tracking-widest font-bold ${ing.impact === 'high' ? 'text-neutral-500' : 'text-neutral-500'}`}>{ing.ingredient_function}</span>
                            {ing.reasoning && <p className="mt-3 text-sm text-neutral-400 italic">{ing.reasoning}</p>}
                          </div>
                        </div>
                      ))}
                    </section>
                    
                  </div>
                ) : (
                  <div  className="space-y-12 animate-in fade-in duration-500">
                    <section id="results">
                      <h2 className="text-2xl font-serif leading-tight text-neutral-800 italic">Inferred Intent</h2>
                      <p className="text-lg leading-relaxed text-neutral-700 mt-2">{dualAnalysis[selectedModel].inferred_intent_user_concern}</p>
                    </section>
                    <ProcessingSpectrum score={dualAnalysis[selectedModel].spectrum_between_whole_food_and_ultra_processed} 
                    onSelect={setCurrentSelectedBlock} isSelected={currentSelectedBlock?.cardType === 'spectrum'}/>
                    <section>
                      <h2 className="text-2xl font-serif leading-tight text-neutral-800 italic">TL;DR</h2>
                      <div className="text-lg leading-relaxed text-neutral-700">
                        <Markdown remarkPlugins={[remarkGfm]}>{dualAnalysis[selectedModel].too_long_didnt_read}</Markdown>
                      </div>
                    </section>

                    {/* JUDGEMENT */}
                    {/* <div className="flex items-start gap-4">
                      <div className="space-y-2">
                        <h2 className="text-2xl font-serif leading-tight text-neutral-800 italic">{analysis.product_name}</h2>
                        <p className="text-lg leading-relaxed text-neutral-700">{analysis.judgment}</p>
                      </div>
                    </div> */}
                    <div onClick={() => setCurrentSelectedBlock({data: dualAnalysis[selectedModel].tradeoffs, cardType: 'tradeoffs'})} className={`rounded-2xl  bg-neutral-900 p-6 shadow-sm cursor-pointer hover:shadow-md border-2 transition-all duration-300  ${currentSelectedBlock?.data === dualAnalysis[selectedModel].tradeoffs ? 'border-violet-500 bg-neutral-50' : 'border-neutral-800'}`}>
                         <h3 className="text-xl font-serif mb-1 italic tracking-wide text-neutral-100">
                            Tradeoffs
                          </h3>
                          <p className="text-neutral-400 text-xs">
                            Every product makes tradeoffs between competing goals. Here&apos;s how this
                            product balances them:
                          </p>
                          <div className="mt-6 border-t border-neutral-800 pt-4">
                            <p className="text-sm text-neutral-300">
                              {dualAnalysis[selectedModel].tradeoffs.summary}
                            </p>
                          </div>
                    </div>
                     <section className="space-y-4">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400">INGREDIENTS THAT CAUGHT MY ATTENTION</h3>
                      <div className="grid gap-6">
                        {dualAnalysis[selectedModel].highlighted_ingredients.map((item: any, i: number) => (
                          <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    key={i}
    transition={{ delay: i * 0.15 }}
    onClick={() => setCurrentSelectedBlock({ data: item, cardType: 'ingredient' })}
    className={`group cursor-pointer border p-6 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md relative ${
      currentSelectedBlock?.data?.ingredient_name === item.ingredient_name  ? 'border-neutral-900 bg-neutral-50 shadow-inner' : 'bg-white border-neutral-200 hover:border-neutral-400'
    }`}
  >
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-xl font-medium text-neutral-900">{item.ingredient_name}</h3>
      <div className={`p-2 rounded-full transition-colors ${currentSelectedBlock?.data?.ingredient_name === item.ingredient_name ? 'bg-neutral-900 text-white' : 'bg-neutral-50 group-hover:bg-neutral-900 group-hover:text-white'}`}>
        

      </div>
    </div>

    <div className="space-y-4">
      <div>
        <h4 className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 mb-1">Reason for inclusion</h4>
        <p className="text-sm text-neutral-700 leading-relaxed">{item.why_its_here}</p>
      </div>
      <div>
        <h4 className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 mb-1">The Concern</h4>
        <p className="text-sm text-neutral-700 leading-relaxed italic">&quot;{item.the_worry}&quot;</p>
      </div>
      
    </div>

  </motion.div>
                        ))}
                      </div>
                    </section>
                  </div>
                )}
                
                <footer className="space-y-8">
                  
                  <div className="p-6 bg-white rounded-3xl border border-neutral-200">
                     <h4 className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 mb-2">Final Summary</h4>
                     <p className="text-neutral-800 leading-relaxed text-sm italic">{dualAnalysis[selectedModel].closing}</p>
                  </div>
                  
                  <div className="p-8 bg-zinc-900 text-white rounded-[2.5rem] text-center border-4 border-zinc-100 shadow-2xl relative overflow-hidden group">
                     <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />
                     <div className="relative z-10">
                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-500 mb-4">The Verdict</h4>
                        <p className="text-2xl font-serif italic leading-snug">&quot;{dualAnalysis[selectedModel].ending_decision}&quot;</p>
                     </div>
                  </div>
                 
                </footer>

                {/* --- CHAT THREAD (PLACEHOLDER) --- */}
                <div className="pt-12 border-t border-neutral-200">
                  <div className="space-y-6">
                    {messages.length === 0 && (
                      <div className=" p-2 text-center text-neutral-400 text-sm italic">
                        Ask a follow-up question about this analysis...
                      </div>
                    )}
                    {messages.map((m, i) => (
                      <motion.div initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} key={i} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${m.role === 'user' ? 'bg-neutral-900 text-white' : 'bg-white border border-neutral-200 text-neutral-900'}`}>
                          {m.role === 'user' ? <User size={14} /> : <Zap size={14} />}
                        </div>
                        <div className={`max-w-[80%] p-5 rounded-3xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-neutral-900 text-white' : 'bg-white border border-neutral-200 text-neutral-800'}`}>
                          {m.context && <div className="text-[10px] font-bold uppercase tracking-widest mb-2 pb-2 border-b border-white/20 text-neutral-400">Focus: {m.context}</div>}
                          <Markdown
                          components={{
                            // Paragraph spacing and line height
                            p: ({ children }) => (
                              <p className="leading-relaxed mb-4 last:mb-0">
                                {children}
                              </p>
                            ),
                            // List item spacing
                            li: ({ children }) => (
                              <li className="mb-2 last:mb-0">
                                {children}
                              </li>
                            ),
                            // Ensure headings have space if the AI uses them
                            h1: ({ children }) => <h1 className="text-lg font-bold mb-3">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-md font-bold mb-2">{children}</h2>,
                            hr: () => <hr className="my-4 border-neutral-200" />,
                          }}
                           remarkPlugins={[remarkGfm]}
                           >{m.content}</Markdown>
                        </div>
                      </motion.div>
                    ))}
                    {isTyping && <div className="animate-pulse">Whispering...</div>}
                    <div ref={endOfChatRef} />
                  </div>
                </div>
                 <div className="flex justify-center">
                    <button onClick={reset} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors">
                      <RefreshCcw size={14} /> New Analysis
                    </button>
                  </div>
              </motion.div>

              {/* --- FLOATING COMMAND BAR --- */}
              <div className={`fixed bottom-0 left-1/2 -translate-x-1/2 transition duration-500 ease-in-out ${isSidebarOpen ? 'md:-translate-x-[calc(50%-8rem)]' : 'md:-translate-x-[calc(50%-2rem)]'} max-w-3xl p-4 w-full z-[100] ${selectedModel === 'both' ? 'max-w-5xl' : ''}`}>
                <div className='absolute inset-0 bg-gradient-to-t from-neutral-50 via-neutral-50/90 to-transparent -z-10 h-[150%] translate-y-[-20%]' />
                <div id="follow-up" className="bg-white border border-neutral-300 rounded-2xl shadow-2xl overflow-hidden ring-4 ring-black/5">
                  {currentSelectedBlock && (
                    <div className='px-4 py-2 bg-neutral-900 text-white flex justify-between items-center'>
                      <div className="flex items-center gap-2">
                        <Sparkles size={10} />
                        <span className='text-[10px] font-bold uppercase tracking-widest line-clamp-1'>Selected: {currentSelectedBlock.cardType === 'ingredient' ? currentSelectedBlock.data.ingredient_name : currentSelectedBlock.cardType === 'context_scenario' ? currentSelectedBlock.data.scenario : currentSelectedBlock.cardType === 'time_impact' ? currentSelectedBlock.data : currentSelectedBlock.cardType === 'conditional_insight' ? currentSelectedBlock.data.condition : currentSelectedBlock.cardType === 'spectrum' ? currentSelectedBlock.data.spectrum : currentSelectedBlock.cardType === 'tradeoffs' ? 'Tradeoffs' : currentSelectedBlock.cardType === 'what_would_i_do' ? 'What would change my mind?' : ''}</span>
                      </div>
                      <button onClick={() => setCurrentSelectedBlock(null)}><X size={12} /></button>
                    </div>
                  )}
                  <div className="flex items-center p-2 gap-2">
                    <textarea 
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                      className='flex-grow bg-transparent border-none focus:ring-0 h-12 p-3 text-sm resize-none focus:outline-none'
                      placeholder="Ask a follow-up..."
                    />
                    <button onClick={handleSendMessage} disabled={!query.trim()} className="p-3 bg-neutral-900 text-white rounded-xl disabled:bg-neutral-200 cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
</svg>

                    </button>
                  </div>
                </div>
                <div className='text-xs text-center mt-3 text-black/50'>This chat uses Gemini Flash latest version</div>
              </div>
              
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const ProcessingSpectrum = ({ score, onSelect, isSelected }:{ score: number, onSelect: (block: any) => void, isSelected?: boolean }) => (
  <div className={`bg-white border border-zinc-200 p-6 rounded-3xl mb-8 cursor-pointer hover:border-zinc-900 transition-all ${isSelected ? 'border-zinc-900' : ''}`} onClick={() => onSelect({ data: {
    spectrum: `This product scores ${score}% on the ultra-processed spectrum, indicating its level of processing from whole food to ultra-processed.`
  }, cardType: 'spectrum' })}>
    <div className="flex justify-between items-end mb-4">
      <div>
        <h4 className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 mb-1">Industrial Spectrum</h4>
        <p className="text-sm font-medium">Ultra-Processed Profile</p>
      </div>
      <span className="text-2xl font-serif italic">{(score).toFixed(0)}%</span>
    </div>
    <div className="h-3 w-full bg-zinc-100 rounded-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-orange-400 to-rose-500 opacity-20" />
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        className="h-full bg-zinc-900 rounded-full relative"
        transition={{ duration: 1.5, ease: "circOut" }}
      >
        <div className="absolute right-0 top-0 h-full w-2 bg-white/40 blur-[2px]" />
      </motion.div>
    </div>
    <div className="flex justify-between mt-2 text-[9px] uppercase tracking-tighter font-bold text-zinc-400">
      <span>Whole Food</span>
      <span>Processed</span>
      <span>Ultra-Processed</span>
    </div>
  </div>
);

const ChangeMyMind = ({ points, onSelect }:{ points: string[], onSelect: (block: any) => void }) => (
  <div  className="bg-white border border-zinc-200 p-6 rounded-3xl mb-8 cursor-pointer hover:border-zinc-900 transition-all" onClick={() => onSelect({ data: {
    points: points
  }, cardType: 'what_would_i_do' })}>
    <div className="flex items-center gap-2 mb-4">
      <BrainCircuit size={16} className="text-zinc-900" />
      <h4 className="text-[10px] uppercase tracking-widest font-bold text-zinc-900">What would change my mind</h4>
    </div>
    <ul className="space-y-3">
      {points.map((p, i) => (
        <li key={i} className="flex gap-3 text-sm text-zinc-600 leading-relaxed">
          <div className="shrink-0 mt-1 w-1.5 h-1.5 bg-zinc-300 rounded-full" />
          {p}
        </li>
      ))}
    </ul>
  </div>
);