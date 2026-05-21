'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const COMMANDS = [
  { icon: '🏠', label: 'Úvodní stránka', href: '/', kbd: 'G H' },
  { icon: '📊', label: 'Dashboard', href: '/dashboard', kbd: 'G D' },
  { icon: '🛡️', label: 'Admin panel', href: '/admin', kbd: 'G A' },
  { icon: '🛠️', label: 'Naše služby', href: '/services', kbd: 'G S' },
  { icon: '💰', label: 'Ceník', href: '/pricing', kbd: 'G P' },
  { icon: '📧', label: 'Kontakt', href: '/contact', kbd: 'G C' },
  { icon: '👤', label: 'Profil', href: '/profile', kbd: 'G U' },
  { icon: '⚙️', label: 'Nastavení', href: '/settings', kbd: 'G N' },
  { icon: '🔐', label: 'Přihlásit se', href: '/auth/login', kbd: '' },
  { icon: '✨', label: 'Registrace', href: '/auth/register', kbd: '' },
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filtered = COMMANDS.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
    if (e.key === 'Enter') { if (filtered[selected]) { router.push(filtered[selected].href); onClose(); } }
    if (e.key === 'Escape') { onClose(); }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[998] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] w-full max-w-[540px] mx-4 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(12,12,12,0.96)',
              border: '0.5px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(40px)',
              boxShadow: '0 0 0 0.5px rgba(255,255,255,0.04) inset, 0 40px 80px rgba(0,0,0,0.9)',
            }}
            role="dialog"
            aria-label="Příkazová paleta"
          >
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Hledat stránky, akce..."
              className="w-full px-4 py-3.5 bg-transparent border-b border-white/[0.08] text-sm text-white placeholder-[var(--gray-700)] outline-none font-sans"
            />

            <div className="p-1.5" role="listbox">
              {filtered.length === 0 && (
                <div className="px-3 py-6 text-center text-sm text-[var(--gray-600)] font-mono">
                  Žádné výsledky
                </div>
              )}
              {filtered.map((cmd, i) => (
                <button
                  key={cmd.href}
                  role="option"
                  aria-selected={i === selected}
                  onClick={() => { router.push(cmd.href); onClose(); }}
                  onMouseEnter={() => setSelected(i)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl text-left transition-colors duration-75 ${
                    i === selected ? 'bg-white/[0.07]' : 'hover:bg-white/[0.04]'
                  }`}
                >
                  <span className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center text-sm flex-shrink-0">
                    {cmd.icon}
                  </span>
                  <span className="text-sm text-[var(--gray-200)]">{cmd.label}</span>
                  {cmd.kbd && (
                    <span className="ml-auto text-[10px] text-[var(--gray-700)] font-mono bg-white/[0.06] border border-white/10 rounded px-1.5 py-0.5">
                      {cmd.kbd}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
