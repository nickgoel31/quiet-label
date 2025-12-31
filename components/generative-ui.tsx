"use client";

import { Info, AlertTriangle, ArrowRight, CheckCircle, ShieldAlert } from "lucide-react";

// 1. Tradeoff Card: For balanced reasoning (e.g., "High sugar but provides energy")
export const TradeoffCard = ({ ingredient, reasoning }: { ingredient: string, reasoning: string }) => (
  <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 animate-in fade-in slide-in-from-bottom-2">
    <div className="flex items-center gap-2 mb-2">
      <div className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/10 text-amber-500 border border-amber-500/20">
        Tradeoff Detected
      </div>
    </div>
    <h4 className="text-white font-medium mb-1">{ingredient}</h4>
    <p className="text-zinc-400 text-sm leading-relaxed">{reasoning}</p>
    <div className="mt-3 pt-3 border-t border-zinc-800 flex items-center justify-between">
      <span className="text-xs text-zinc-500 italic">Scientific confidence: High</span>
    </div>
  </div>
);

// 2. Uncertainty Alert: For honesty when data is conflicting [cite: 53, 73]
export const UncertaintyAlert = ({ topic }: { topic: string }) => (
  <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20 flex gap-3 italic animate-in fade-in slide-in-from-bottom-2">
    <Info className="w-5 h-5 text-blue-400 shrink-0" />
    <p className="text-blue-200/70 text-sm">
      My analysis of <span className="text-blue-300 font-medium">{topic}</span> is based on evolving dietary guidelines. Scientific consensus is currently mixed.
    </p>
  </div>
);

// 3. Why It Matters: Highlighting critical health context
export const WhyItMattersCard = ({ ingredient, explanation }: { ingredient: string; explanation: string; }) => (
  <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 animate-in fade-in slide-in-from-bottom-2">
    <div className="flex items-center gap-2 mb-2">
      <AlertTriangle className="w-4 h-4 text-red-400" />
      <span className="text-xs uppercase tracking-wide text-red-400 font-semibold">
        Why this matters
      </span>
    </div>
    <h4 className="text-white font-medium mb-1">{ingredient}</h4>
    <p className="text-zinc-400 text-sm leading-relaxed">{explanation}</p>
  </div>
);

// 4. Benign Insight: Reducing alarm fatigue for safe ingredients
export const BenignInsightCard = ({ ingredient, reassurance }: { ingredient: string; reassurance: string; }) => (
  <div className="p-4 rounded-2xl bg-green-500/5 border border-green-500/20 animate-in fade-in slide-in-from-bottom-2">
    <div className="flex items-center gap-2 mb-1">
      <CheckCircle className="w-4 h-4 text-green-400" />
      <span className="text-[10px] uppercase tracking-wide text-green-400 font-semibold">
        Likely fine
      </span>
    </div>
    <h4 className="text-green-300 font-medium">{ingredient}</h4>
    <p className="text-green-200/70 text-sm mt-1">{reassurance}</p>
  </div>
);

// 5. Intent Summary: Visual confirmation of what the AI "understood" 
export const IntentSummary = ({ intent }: { intent: string }) => (
  <div className="px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 animate-in fade-in slide-in-from-bottom-2">
    <p className="text-xs uppercase tracking-wider text-zinc-500 mb-1">
      Inferred intent
    </p>
    <p className="text-sm text-zinc-200 flex items-center gap-2">
      <ShieldAlert className="w-4 h-4 text-zinc-400" />
      {intent}
    </p>
  </div>
);

// 6. Actionable Advice: The "So What?" component [cite: 50, 54]
export const ActionableAdviceCard = ({ advice, actionLabel }: { advice: string; actionLabel: string }) => (
  <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-950 text-black dark:text-white border dark:border-white/10 animate-in fade-in slide-in-from-bottom-2">
    <div className="flex items-center gap-2 mb-2">
      <ArrowRight className="w-4 h-4" />
      <span className="text-xs uppercase tracking-wide font-semibold">
        What you can do
      </span>
    </div>
    
    <p className="text-sm font-medium">{advice}</p>
    <button className="mt-3 text-xs font-semibold text-blue-500 hover:underline">{actionLabel}</button>
  </div>
);