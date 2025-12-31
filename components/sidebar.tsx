"use client"

import { HelpCircle, History, Plus, Settings, X } from 'lucide-react';
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SettingsMenu from './settings';

const Sidebar = ({ setCurrentAnalysis, setModel, isSidebarOpen, setIsSidebarOpen, reset, currentAnalysisLocalStorage, setCurrentAnalysisLocalStorage }: { setCurrentAnalysis: React.Dispatch<React.SetStateAction<any>>, setModel: React.Dispatch<React.SetStateAction<"both" | "gemini" | "llama" | null>>, isSidebarOpen: boolean, setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>, reset: () => void, currentAnalysisLocalStorage: any, setCurrentAnalysisLocalStorage: React.Dispatch<React.SetStateAction<any>> }) => {

    const [analyses, setAnalyses] = React.useState<any[]>([]);

    useEffect(() => {
        function getAnalysesFromLocalStorage() {
            if (typeof window !== 'undefined') {
                const analyses = localStorage.getItem('analyses');
                return analyses ? JSON.parse(analyses) : [];
            }
            return [];
        }
        const storedAnalyses = getAnalysesFromLocalStorage();
        setAnalyses(storedAnalyses);

        // Listen for the custom event
        window.addEventListener("analysesUpdated", getAnalysesFromLocalStorage);
        return () => window.removeEventListener("analysesUpdated", getAnalysesFromLocalStorage);
    }, []);

    const handleSetAnalysisToLocalStorage = (analysis: any) => {
        setCurrentAnalysis(analysis.data);
        setCurrentAnalysisLocalStorage(analysis);
        setModel('gemini');
    };

    // Shared animation variants for labels/content
    const fadeInVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.3 } },
        exit: { opacity: 0, x: -5, transition: { duration: 0.1 } }
    };

    return (
        <>
            {/* --- DESKTOP SIDEBAR --- */}
            <aside className={`hidden lg:flex sticky top-0 left-0 h-screen border-r border-neutral-300 bg-white flex-col items-start py-6 space-y-4 ${isSidebarOpen ? 'w-64 px-4' : 'w-16 px-4'} transition-all duration-500 ease-in-out overflow-hidden`}>
                
                <div className='cursor-pointer p-1 rounded-full hover:bg-neutral-100 transition-all' onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-neutral-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>

                <div className="flex flex-col w-full">
                    <AnimatePresence>
                    {isSidebarOpen && (
                        
                    <button onClick={reset} className={`flex items-center justify-center gap-3 w-full bg-neutral-100 text-neutral-900 rounded-2xl transition-all duration-300 hover:bg-neutral-200 active:scale-95 cursor-pointer py-4 ${!isSidebarOpen && 'px-0'}`}>
                        <Plus size={20} strokeWidth={2.5} />
                        
                            
                                <motion.span 
                                    variants={fadeInVariants} initial="hidden" animate="visible" exit="exit"
                                    className='text-xs font-bold uppercase tracking-widest whitespace-nowrap'
                                >
                                    New Analysis
                                </motion.span>
                            
                       
                    </button>
                    )}
                    </AnimatePresence>
                </div>

                <div className='w-full flex-1 overflow-hidden'>
                    <AnimatePresence>
                            {isSidebarOpen && (
                    <div className='flex items-center gap-2 uppercase tracking-wider font-bold text-neutral-500 mt-2 mb-4'>
                        <History size={20} strokeWidth={2.5} className='text-neutral-400' />
                        
                                <motion.span variants={fadeInVariants} initial="hidden" animate="visible" exit="exit" className='text-xs font-semibold'>
                                    History
                                </motion.span>
                            
                    </div>
                    )}
                        </AnimatePresence>

                    <AnimatePresence>
                        {isSidebarOpen && (
                            <motion.div variants={fadeInVariants} initial="hidden" animate="visible" exit="exit" className='w-full'>
                                {analyses.length === 0 && <p className='text-xs text-neutral-400 mt-2'>No analyses yet.</p>}
                                <div className='mt-2 flex flex-col gap-2 max-h-[60vh] overflow-y-auto no-scrollbar'>
                                    {analyses.map((analysis, index) => (
                                        <div onClick={() => handleSetAnalysisToLocalStorage(analysis)} key={index} className={`flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-100 cursor-pointer transition-all w-full ${currentAnalysisLocalStorage?.id === analysis.id ? 'bg-neutral-200' : ''}`}>
                                            <span className='text-sm font-medium truncate'>{analysis.data.gemini.product_name || `Analysis ${index + 1}`}</span>
                                        </div>
                                    ))}
                                </div>
                                <p className='text-xs text-neutral-400 mt-4 text-center'>3 analyses can be stored at a time. Older analyses will be removed.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <SettingsMenu isSidebarOpen={isSidebarOpen} />
            </aside>

            {/* --- MOBILE SIDEBAR --- */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)} 
                            className="fixed inset-0 z-[200] lg:hidden bg-black/20 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className='fixed top-0 left-0 w-72 bg-white h-full z-[201] shadow-xl border-r border-neutral-300 flex flex-col py-6 px-4 space-y-4 lg:hidden'
                        >
                            <div className='cursor-pointer p-1 w-fit rounded-full hover:bg-neutral-100 transition-all mb-4' onClick={() => setIsSidebarOpen(false)}>
                                <X size={20} className="text-neutral-600" />
                            </div>
                            
                            <button onClick={reset} className="flex items-center justify-center gap-3 w-full bg-neutral-100 text-neutral-900 rounded-2xl py-4 font-bold uppercase tracking-widest text-xs">
                                <Plus size={20} /> New Analysis
                            </button>

                            <div className='flex items-center gap-2 uppercase tracking-wider font-bold text-neutral-500 mt-4'>
                                <History size={20} className='text-neutral-400' />
                                <span className='text-xs font-semibold'>History</span>
                            </div>

                            <div className='flex-1 overflow-y-auto no-scrollbar'>
                                {analyses.length === 0 && <p className='text-xs text-neutral-400 mt-2'>No analyses yet.</p>}
                                <div className='mt-2 flex flex-col gap-2 max-h-[60vh] overflow-y-auto no-scrollbar'>
                                    {analyses.map((analysis, index) => (
                                        <div onClick={() => {
                                            handleSetAnalysisToLocalStorage(analysis)
                                            setIsSidebarOpen(false);
                                        }} key={index} className={`flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-100 cursor-pointer transition-all w-full ${currentAnalysisLocalStorage?.id === analysis.id ? 'bg-neutral-200' : ''}`}>
                                            <span className='text-sm font-medium truncate'>{analysis.data.gemini.product_name || `Analysis ${index + 1}`}</span>
                                        </div>
                                    ))}
                                </div>
                                <p className='text-xs text-neutral-400 mt-4 text-center'>3 analyses can be stored at a time. Older analyses will be removed.</p>
                            </div>

                           <SettingsMenu isSidebarOpen={isSidebarOpen} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Sidebar;