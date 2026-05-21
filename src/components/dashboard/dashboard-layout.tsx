'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { User } from '@/types';
import { cn, getInitials } from '@/lib/utils';

const NAV_SECTIONS = [
  {
    label: 'PŘEHLED',
    items: [
      { href: '/dashboard', icon: '📊', label: 'Dashboard' },
      { href: '/dashboard/projects', icon: '📁', label: 'Projekty', badge: '12' },
      { href: '/dashboard/ai', icon: '🤖', label: 'AI Asistent' },
      { href: '/dashboard/analytics', icon: '📈', label: 'Analytika' },
    ],
  },
  {
    label: 'SPRÁVA',
    items: [
      { href: '/dashboard/team', icon: '👥', label: 'Tým' },
      { href: '/dashboard/api-keys', icon: '🔑', label: 'API klíče' },
      { href: '/dashboard/domains', icon: '🌐', label: 'Domény' },
    ],
  },
  {
    label: 'ÚČET',
    items: [
      { href: '/profile', icon: '👤', label: 'Profil' },
      { href: '/settings', icon: '⚙️', label: 'Nastavení' },
    ],
  },
];

interface DashboardLayoutProps {
  user: User;
  children: React.ReactNode;
}

export function DashboardLayout({ user, children }: DashboardLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen pt-0">
      {/* Sidebar */}
      <aside
        className="hidden md:flex flex-col w-[220px] bg-[rgba(10,10,10,0.9)] border-r border-white/[0.06] backdrop-blur-xl fixed top-0 left-0 h-full z-40 pt-20"
        role="navigation"
        aria-label="Dashboard navigace"
      >
        {/* Workspace header */}
        <div className="px-4 pb-5 border-b border-white/[0.05]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] flex items-center justify-center text-[10px] font-bold">
              NX
            </div>
            <span className="text-xs font-semibold tracking-tight">Workspace</span>
          </div>
          {/* User info */}
          <div className="flex items-center gap-2 mt-4 px-1">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] flex items-center justify-center text-[10px] font-semibold flex-shrink-0">
              {getInitials(user.name)}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-medium truncate">{user.name}</div>
              <div className="text-[10px] text-[var(--gray-600)] font-mono truncate">{user.role.toUpperCase()}</div>
            </div>
          </div>
        </div>

        {/* Nav sections */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
          {NAV_SECTIONS.map(section => (
            <div key={section.label}>
              <div className="text-[9px] font-mono text-[var(--gray-700)] tracking-[1.5px] uppercase px-2.5 mb-1.5">
                {section.label}
              </div>
              <div className="space-y-0.5">
                {section.items.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm transition-all duration-150',
                      pathname === item.href
                        ? 'text-white bg-white/[0.08]'
                        : 'text-[var(--gray-500)] hover:text-white hover:bg-white/[0.05]'
                    )}
                  >
                    <span className="text-sm w-4 flex-shrink-0">{item.icon}</span>
                    <span className="flex-1 font-sans">{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] font-mono text-[var(--accent)] bg-[var(--accent)]/20 px-1.5 py-0.5 rounded">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sign out */}
        <div className="p-3 border-t border-white/[0.05]">
          <button className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm text-[var(--gray-600)] hover:text-[#f87171] hover:bg-red-500/[0.05] transition-all">
            <span>🚪</span>
            <span>Odhlásit</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-[220px] bg-[var(--gray-950)] min-h-screen pt-14" role="main">
        {children}
      </main>
    </div>
  );
}
