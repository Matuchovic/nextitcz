import { requireAdmin } from '@/lib/auth';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Admin Panel' };

const USERS = [
  { name: 'Martin Dvořák', email: 'm.dvorak@acme.cz', role: 'admin', date: '1. 1. 2024' },
  { name: 'Lucie Procházková', email: 'lucie@startup.io', role: 'dev', date: '15. 3. 2024' },
  { name: 'Petr Horáček', email: 'p.horacek@corp.com', role: 'user', date: '2. 5. 2024' },
  { name: 'Anna Šimková', email: 'anna@design.studio', role: 'user', date: '18. 6. 2024' },
  { name: 'Tomáš Kratochvíl', email: 'tomas@fintech.eu', role: 'dev', date: '7. 8. 2024' },
];

const ROLE_STYLES: Record<string, string> = {
  admin: 'bg-red-500/10 text-red-400 border border-red-500/20',
  dev: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
  user: 'bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20',
};

export default async function AdminPage() {
  const user = await requireAdmin();

  return (
    <DashboardLayout user={user}>
      <div className="p-7 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Admin <span className="text-[var(--gray-500)] font-light">Dashboard</span></h1>
            <p className="text-[11px] font-mono text-[var(--gray-700)] mt-1">Systémový přehled · NEXTIT Technologies</p>
          </div>
          <div className="flex gap-2">
            <button className="text-[11px] font-mono px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/15 transition-colors">⚠️ Alerty (3)</button>
            <button className="text-[11px] font-mono px-3 py-2 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] hover:bg-[var(--accent)]/15 transition-colors">📊 Export dat</button>
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'CELKEM UŽIVATELÉ', value: '3,842', delta: '▲ +127 tento měsíc', accent: 'kpi-accent-blue' },
            { label: 'AKTIVNÍ SUBSCRIPTIONS', value: '1,204', delta: '▲ 31.3% konverze', accent: 'kpi-accent-purple' },
            { label: 'SERVER LOAD', value: '23%', delta: '● Normální stav', accent: 'kpi-accent-green' },
            { label: 'CHYBY / HODINU', value: '0.02%', delta: '▲ Pod prahem', accent: 'kpi-accent-amber' },
          ].map(k => (
            <div key={k.label} className="relative bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 overflow-hidden hover:border-white/[0.12] transition-colors">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
              <div className="text-[10px] text-[var(--gray-600)] font-mono tracking-wide mb-2">{k.label}</div>
              <div className="text-[26px] font-bold tracking-[-1.5px] leading-none text-white">{k.value}</div>
              <div className="text-[11px] font-mono mt-1.5 text-[var(--accent3)]">{k.delta}</div>
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${k.accent}`} />
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 flex-wrap">
          {['+ Přidat uživatele', '📧 Hromadný email', '🔄 Synchronizace', '🔒 Lockout test'].map((label, i) => (
            <button key={label} className={`text-[11px] font-mono px-3 py-2 rounded-lg transition-colors ${i === 3 ? 'bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/15' : 'bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] hover:bg-[var(--accent)]/15'}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Users table */}
        <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/[0.07]">
            <span className="text-[13px] font-medium tracking-tight">Správa uživatelů</span>
            <input
              placeholder="🔍 Hledat..."
              className="w-48 px-3 py-1.5 text-[11px] bg-white/[0.04] border border-white/[0.1] rounded-lg text-white placeholder-[var(--gray-700)] outline-none focus:border-[var(--accent)]/40 transition-colors font-sans"
            />
          </div>

          <div className="grid grid-cols-[2fr_1.5fr_80px_100px_80px] px-4 py-2.5 border-b border-white/[0.06]">
            {['UŽIVATEL', 'EMAIL', 'ROLE', 'REGISTRACE', 'AKCE'].map(h => (
              <span key={h} className="text-[10px] font-mono text-[var(--gray-700)] tracking-wide">{h}</span>
            ))}
          </div>

          {USERS.map(u => {
            const initials = u.name.split(' ').map(n => n[0]).join('').slice(0, 2);
            return (
              <div key={u.email} className="grid grid-cols-[2fr_1.5fr_80px_100px_80px] px-4 py-3 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors items-center">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] flex items-center justify-center text-[9px] font-semibold flex-shrink-0">{initials}</div>
                  <span className="text-[12px] text-[var(--gray-200)] font-medium truncate">{u.name}</span>
                </div>
                <span className="text-[11px] text-[var(--gray-500)] font-mono truncate">{u.email}</span>
                <span><span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${ROLE_STYLES[u.role]}`}>{u.role.toUpperCase()}</span></span>
                <span className="text-[11px] text-[var(--gray-600)] font-mono">{u.date}</span>
                <button className="text-[9px] font-mono px-2 py-1 rounded bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] hover:bg-[var(--accent)]/15 transition-colors">Upravit</button>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
