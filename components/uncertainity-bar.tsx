// components/UncertaintyBar.tsx
import { motion } from "framer-motion";

export const UncertaintyBar = ({ level }: { level: number }) => {
  // level 0.1 (Mixed Evidence) to 1.0 (Strong Consensus)
  return (
    <div className="mt-4 space-y-2">
      <div className="flex justify-between text-xs text-zinc-500 uppercase tracking-widest font-medium">
        <span>Mixed Evidence</span>
        <span>Scientific Consensus</span>
      </div>
      <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level * 100}%` }}
          className="h-full bg-zinc-900 shadow-[0_0_8px_rgba(0,0,0,0.2)]"
          transition={{ duration: 1, ease: "circOut" }}
        />
      </div>
    </div>
  );
};