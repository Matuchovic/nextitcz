'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { CommandPalette } from '@/components/ui/command-palette';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/services', labelKey: 'services' },
  { href: '/pricing', labelKey: 'pricing' },
  { href: '/contact', labelKey: 'contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('nav');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(true);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-48px)] max-w-6xl"
      >
        <nav
          className={cn(
            'flex items-center h-13 px-5 rounded-2xl transition-all duration-300',
            'glass-nav',
            scrolled && 'shadow-lg shadow-black/50'
          )}
          role="navigation"
          aria-label="Hlavní navigace"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-accent2 flex items-center justify-center text-xs font-bold text-white shadow-[0_0_16px_rgba(79,142,247,0.4)] group-hover:shadow-[0_0_24px_rgba(79,142,247,0.6)] transition-shadow">
              NX
            </div>
            <span className="text-sm font-semibold tracking-tight">
              NEXTIT <span className="text-[var(--gray-400)] font-normal">Technologies</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5 ml-3">
            {navLinks.map(({ href, labelKey }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'text-sm px-2.5 py-1.5 rounded-lg transition-all duration-150',
                  pathname === href
                    ? 'text-white bg-white/[0.08]'
                    : 'text-[var(--gray-400)] hover:text-white hover:bg-white/[0.06]'
                )}
              >
                {t(labelKey)}
              </Link>
            ))}
            <Link
              href="/dashboard"
              className={cn(
                'text-sm px-2.5 py-1.5 rounded-lg transition-all duration-150',
                pathname.startsWith('/dashboard')
                  ? 'text-white bg-white/[0.08]'
                  : 'text-[var(--gray-400)] hover:text-white hover:bg-white/[0.06]'
              )}
            >
              Dashboard
            </Link>
          </div>

          <div className="flex-1" />

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />

            <button
              onClick={() => setCmdOpen(true)}
              className="hidden sm:flex items-center gap-1.5 text-[11px] text-[var(--gray-600)] px-2 py-1.5 rounded-lg hover:bg-white/[0.05] transition-colors font-mono"
              aria-label="Otevřít příkazovou paletu (⌘K)"
            >
              <span>⌘K</span>
            </button>

            <Link
              href="/auth/login"
              className="hidden sm:block text-sm text-[var(--gray-300)] px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:text-white transition-all"
            >
              {t('login')}
            </Link>
            <Link
              href="/auth/register"
              className="text-sm font-medium px-3.5 py-1.5 rounded-lg btn-primary"
            >
              {t('register')}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <div className="w-4 h-3 flex flex-col justify-between">
                <span className={cn('h-px bg-white/60 transition-all', mobileOpen && 'rotate-45 translate-y-1.5')} />
                <span className={cn('h-px bg-white/60 transition-all', mobileOpen && 'opacity-0')} />
                <span className={cn('h-px bg-white/60 transition-all', mobileOpen && '-rotate-45 -translate-y-1.5')} />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-2 rounded-2xl glass-nav p-3 md:hidden"
            >
              {navLinks.map(({ href, labelKey }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-[var(--gray-400)] hover:text-white hover:bg-white/[0.06] transition-all"
                >
                  {t(labelKey)}
                </Link>
              ))}
              <Link
                href="/auth/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-[var(--gray-400)] hover:text-white hover:bg-white/[0.06] transition-all"
              >
                {t('login')}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </>
  );
}
