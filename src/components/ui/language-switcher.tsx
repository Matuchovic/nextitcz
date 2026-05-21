'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const LANGUAGES = [
  { code: 'cs', flag: '🇨🇿', name: 'Čeština' },
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
  { code: 'sk', flag: '🇸🇰', name: 'Slovenčina' },
  { code: 'pl', flag: '🇵🇱', name: 'Polski' },
  { code: 'fr', flag: '🇫🇷', name: 'Français' },
  { code: 'es', flag: '🇪🇸', name: 'Español' },
  { code: 'it', flag: '🇮🇹', name: 'Italiano' },
];

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(LANGUAGES[0]);
  const router = useRouter();

  function selectLang(lang: typeof LANGUAGES[0]) {
    setCurrent(lang);
    setOpen(false);
    // Set cookie and refresh
    document.cookie = `locale=${lang.code}; path=/; max-age=31536000`;
    router.refresh();
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-[11px] text-[var(--gray-500)] bg-white/[0.04] border border-white/[0.08] rounded-lg px-2 py-1.5 hover:bg-white/[0.07] transition-colors font-mono"
        aria-label={`Jazyk: ${current.name}`}
        aria-expanded={open}
      >
        <span>{current.flag}</span>
        <span>{current.code.toUpperCase()}</span>
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
          <path d="M1.5 3L4 5.5L6.5 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.96 }}
              transition={{ duration: 0.12 }}
              className="absolute right-0 top-full mt-1.5 z-50 min-w-[140px] rounded-xl overflow-hidden"
              style={{
                background: 'rgba(12,12,12,0.96)',
                border: '0.5px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
              }}
              role="listbox"
              aria-label="Vyberte jazyk"
            >
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => selectLang(lang)}
                  role="option"
                  aria-selected={lang.code === current.code}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors ${
                    lang.code === current.code
                      ? 'bg-white/[0.08] text-white'
                      : 'text-[var(--gray-400)] hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span className="font-sans">{lang.name}</span>
                  {lang.code === current.code && (
                    <span className="ml-auto text-[var(--accent)] text-xs">✓</span>
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
