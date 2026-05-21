'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { CommandPalette } from '@/components/ui/command-palette';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/services', label: 'Služby' },
  { href: '/pricing', label: 'Ceny' },
  { href: '/contact', label: 'Kontakt' },
  { href: '/dashboard', label: 'Dashboard' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setCmdOpen(true); }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center h-14 px-6"
        style={{
          background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '0.5px solid rgba(255,255,255,0.06)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Logo LEFT */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 mr-10 group">
          <div className="relative w-8 h-8 flex-shrink-0">
            <svg viewBox="0 0 32 32" className="w-full h-full" style={{ filter: 'drop-shadow(0 0 8px rgba(139,92,246,0.8))' }}>
              <defs>
                <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#f472b6" />
                </linearGradient>
              </defs>
              <polygon points="16,2 28,9 28,23 16,30 4,23 4,9" fill="none" stroke="url(#lg1)" strokeWidth="1.5" />
              <polygon points="16,8 22,14 16,20 10,14" fill="url(#lg1)" opacity="0.9" />
              <circle cx="16" cy="14" r="2" fill="white" opacity="0.95" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-black tracking-[0.5px] text-white leading-tight" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>NEXTIT</span>
            <span className="text-[8px] font-mono text-white/25 tracking-[2px] uppercase leading-tight">Technologies</span>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href}
              className={cn('text-[13px] px-3 py-1.5 rounded-lg transition-all duration-150 font-medium',
                pathname.startsWith(href) ? 'text-white' : 'text-white/40 hover:text-white/80')}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        {/* Right */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button onClick={() => setCmdOpen(true)}
            className="hidden sm:flex text-[11px] text-white/25 px-2 py-1.5 rounded-lg hover:text-white/50 transition-colors font-mono">
            ⌘K
          </button>
          <Link href="/auth/login" className="text-[12px] text-white/40 hover:text-white/80 px-3 py-1.5 transition-colors">
            Přihlásit
          </Link>
          <Link href="/auth/register">
            <motion.button
              className="text-[12px] font-bold text-white px-4 py-2 rounded-lg"
              style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 0 16px rgba(139,92,246,0.4)' }}
              whileHover={{ boxShadow: '0 0 24px rgba(139,92,246,0.7)' }}
            >
              Začít →
            </motion.button>
          </Link>
        </div>
      </motion.header>
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </>
  );
}
