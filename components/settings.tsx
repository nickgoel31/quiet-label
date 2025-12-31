"use client"

import { UserSettings } from '@/types';
import { AnimatePresence, motion } from 'framer-motion'
import { 
  Settings, 
  MessageSquare, 
  Eye, 
  Brain, 
  CheckCircle2,
  Zap,
  Lock,
  Apple,
  AlertCircle,
  X,
  Plus
} from 'lucide-react'
import React, { useEffect, useState } from 'react'

const fadeInVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.3 } },
  exit: { opacity: 0, x: -5, transition: { duration: 0.1 } }
};

const STORAGE_KEY = 'user_ai_settings';

/* =========================
   SIDEBAR TRIGGER
========================= */

const SettingsMenu = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)} 
        className={`mt-auto flex gap-2 uppercase tracking-wider font-bold text-neutral-500 items-center w-full cursor-pointer hover:bg-neutral-100 rounded-xl transition-all ${isSidebarOpen ? 'p-2' : 'py-2 px-[5.5px]'}`}
      >
        <Settings size={20} strokeWidth={2.5} className='text-neutral-400' />
        <AnimatePresence mode="wait">
          {isSidebarOpen && (
            <motion.span variants={fadeInVariants} initial="hidden" animate="visible" exit="exit" className='text-xs font-semibold'>
              Settings
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className=''>
      <AnimatePresence>
        {isModalOpen && (
          <SettingsModal setIsModalOpen={setIsModalOpen} />
        )}
      </AnimatePresence>
      </div>
    </>
  )
}

export default SettingsMenu

/* =========================
   MODAL
========================= */

const SettingsModal = ({ setIsModalOpen }: { setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [settings, setSettings] = useState<UserSettings>({
    tone: 'neutral',
    takeaway: 'yes',
    allergies: [],
    dietaryPreferences: [],
    uncertainty: 'normal',
  });

  const [customAllergy, setCustomAllergy] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSettings(JSON.parse(stored));
      } catch {}
    }
  }, []);

  const persist = (next: UserSettings) => {
    setSettings(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  /* =========================
     MULTI-SELECT HANDLERS
  ========================= */

  const toggleMultiValue = (key: 'allergies' | 'dietaryPreferences', value: string) => {
    const current = settings[key];
    const updated = current?.includes(value)
      ? current.filter(v => v !== value)
      : [...current || [], value];

    persist({ ...settings, [key]: updated });
  };

  const addCustomAllergy = () => {
    const trimmed = customAllergy.trim();
    if (!trimmed || settings?.allergies?.includes(trimmed)) return;

    persist({
      ...settings,
      allergies: [...settings?.allergies || [], trimmed],
    });

    setCustomAllergy('');
  };

  const sections = [
    {
      title: "Dietary Profile",
      icon: <Apple size={16} />,
      options: [
        {
          label: "Allergies (select all that apply)",
          key: "allergies",
          icon: <AlertCircle size={14} className="text-red-400" />,
          choices: [
            'Peanuts',
            'Dairy',
            'Gluten',
            'Soy',
            'Shellfish',
            'Eggs',
            'Tree Nuts',
          ]
        },
        {
          label: "Dietary Preferences",
          key: "dietaryPreferences",
          choices: [
            'Vegan',
            'Vegetarian',
            'Keto',
            'Paleo',
            'Halal',
            'Kosher',
          ]
        }
      ]
    },
    {
      title: "How I Explain Things",
      icon: <MessageSquare size={16} />,
      options: [
        {
          label: "Tone Preference",
          key: "tone",
          single: true,
          choices: [
            { id: 'neutral', label: 'Calm & neutral (default)' },
            { id: 'direct', label: 'More direct' },
            { id: 'cautious', label: 'Extra cautious' },
            { id: 'humorous', label: 'Humorous' }
          ]
        },
      ]
    },
    {
      title: "Trust & Transparency",
      icon: <Eye size={16} />,
      infoCard: {
        title: "How this AI thinks",
        points: [
          "I don't score foods",
          "I focus on context",
          "I explain uncertainty",
          "I may change my mind"
        ]
      }
    },
    {
      title: "Decision Style",
      icon: <Brain size={16} />,
      options: [
        {
          label: "End with a clear takeaway",
          key: "takeaway",
          single: true,
          choices: [
            { id: 'yes', label: 'Yes' },
            { id: 'necessary', label: 'Only when necessary' },
            { id: 'no', label: 'No, let me decide' }
          ]
        },
      ],
      footerNote: "Your data never leaves your device. All preferences are stored locally and are not shared or logged."
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className='fixed inset-0 bg-neutral-900/60 backdrop-blur-md flex items-center justify-center z-[9999] p-4'
      onClick={() => setIsModalOpen(false)}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className='bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl border border-neutral-200 flex flex-col'
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className='p-8 border-b border-neutral-100 flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold'>Settings</h2>
            <p className='text-sm text-neutral-500'>Personalize your AI thought partner</p>
          </div>
          <button onClick={() => setIsModalOpen(false)} className='p-3 hover:bg-neutral-100 rounded-full'>
            <X size={22} />
          </button>
        </div>

        {/* CONTENT */}
        <div className='flex-1 overflow-y-auto p-8 space-y-10'>
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-6">
              <div className="flex items-center gap-2 text-neutral-500">
                {section.icon}
                <h3 className="text-xs font-bold uppercase tracking-widest">
                  {section.title}
                </h3>
              </div>

              {section.options?.map((opt, i) => (
                <div key={i} className="space-y-3">
                  <p className="text-sm font-bold">{opt.label}</p>

                  <div className="flex flex-wrap gap-2">
                    {opt.choices.map((choice: any) => {
                      const value = typeof choice === 'string' ? choice : choice.id;
                      const label = typeof choice === 'string' ? choice : choice.label;
                      const isSingle = 'single' in opt && opt.single;
                      const selected = isSingle
                        ? settings[opt.key as keyof UserSettings] === value
                        : (settings[opt.key as keyof UserSettings] as string[]).includes(value);

                      return (
                        <button
                          key={value}
                          onClick={() =>
                            isSingle
                              ? persist({ ...settings, [opt.key]: value })
                              : toggleMultiValue(opt.key as any, value)
                          }
                          className={`px-4 py-2 rounded-2xl border text-sm font-medium transition ${
                            selected
                              ? 'bg-neutral-900 text-white border-neutral-900'
                              : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>

                  {/* CUSTOM ALLERGY INPUT */}
                  {/* {opt.key === 'allergies' && (
                    <div className="flex gap-2 pt-2">
                      <input
                        value={customAllergy}
                        onChange={(e) => setCustomAllergy(e.target.value)}
                        placeholder="Add another allergy…"
                        className="flex-1 px-4 py-2 rounded-xl border border-neutral-200 text-sm"
                      />
                      <button
                        onClick={addCustomAllergy}
                        className="px-4 py-2 rounded-xl bg-neutral-900 text-white flex items-center gap-1"
                      >
                        <Plus size={14} />
                        Add
                      </button>
                    </div>
                  )} */}
                </div>
              ))}

              {section.infoCard && (
                <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-sm uppercase">
                    <Zap size={16} />
                    {section.infoCard.title}
                  </div>
                  {section.infoCard.points.map((p, i) => (
                    <div key={i} className="text-sm text-neutral-600">• {p}</div>
                  ))}
                </div>
              )}

              {section.footerNote && (
                <div className="flex gap-3 text-xs text-neutral-500 bg-neutral-50 border border-dashed border-neutral-300 p-4 rounded-xl">
                  <Lock size={14} />
                  {section.footerNote}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
