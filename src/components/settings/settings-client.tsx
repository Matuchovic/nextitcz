'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import type { User } from '@/types';

interface SettingsClientProps { user: User; }

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn(!on)}
      role="switch"
      aria-checked={on}
      className={`w-9 h-5 rounded-full transition-colors flex-shrink-0 relative ${on ? 'bg-[var(--accent)]' : 'bg-white/[0.1]'}`}
    >
      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${on ? 'translate-x-4' : 'translate-x-0.5'}`} />
    </button>
  );
}

const NOTIFICATIONS = [
  { label: 'Nasazení projektů', desc: 'Při každém úspěšném deployi', defaultOn: true },
  { label: 'Bezpečnostní alerty', desc: 'Podezřelá aktivita na účtu', defaultOn: true },
  { label: 'Týdenní report', desc: 'Souhrnný přehled každé pondělí', defaultOn: false },
  { label: 'Marketingové emaily', desc: 'Novinky a tipy od NEXTIT', defaultOn: false },
];

export function SettingsClient({ user }: SettingsClientProps) {
  return (
    <div className="p-7">
      <div className="section-tag">ÚČET</div>
      <h1 className="text-[28px] font-bold tracking-[-1px] mb-8">Nastavení</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 max-w-3xl">
        {/* Sidebar nav */}
        <nav className="flex flex-col gap-0.5">
          {['👤 Profil', '🔔 Notifikace', '🔑 Zabezpečení', '💳 Fakturace', '🌍 Jazyk & Region', '🤖 AI Preference'].map((item, i) => (
            <button key={item} className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-[12px] text-left transition-all ${i === 0 ? 'text-white bg-white/[0.07]' : 'text-[var(--gray-500)] hover:text-white hover:bg-white/[0.05]'}`}>
              {item}
            </button>
          ))}
          <button className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-[12px] text-red-400 hover:bg-red-500/[0.05] transition-all mt-4">
            🗑️ Smazat účet
          </button>
        </nav>

        {/* Content */}
        <div className="space-y-3">
          {/* Profile section */}
          <div className="bg-white/[0.02] border border-white/[0.07] rounded-xl p-6">
            <div className="text-[13px] font-medium tracking-tight mb-1">Základní informace</div>
            <div className="text-[11px] text-[var(--gray-600)] font-mono mb-5">VEŘEJNÝ PROFIL · Viditelné pro váš tým</div>
            <div className="space-y-3">
              {[
                { label: 'JMÉNO', defaultValue: user.name, type: 'text' },
                { label: 'EMAIL', defaultValue: user.email, type: 'email' },
                { label: 'SPOLEČNOST', defaultValue: user.company || '', type: 'text' },
              ].map(field => (
                <div key={field.label}>
                  <label className="block text-[11px] font-mono text-[var(--gray-500)] tracking-wide mb-1.5">{field.label}</label>
                  <input
                    type={field.type}
                    defaultValue={field.defaultValue}
                    className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-lg text-sm text-white outline-none focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/20 transition-all font-sans"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => toast.success('Profil uložen')}
              className="mt-4 px-5 py-2 rounded-lg btn-primary text-sm font-medium"
            >
              Uložit změny
            </button>
          </div>

          {/* Notifications section */}
          <div className="bg-white/[0.02] border border-white/[0.07] rounded-xl p-6">
            <div className="text-[13px] font-medium tracking-tight mb-1">Notifikace</div>
            <div className="text-[11px] text-[var(--gray-600)] font-mono mb-5">EMAIL & PUSH · Spravujte kdy vás kontaktujeme</div>
            <div className="divide-y divide-white/[0.05]">
              {NOTIFICATIONS.map(n => (
                <div key={n.label} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div>
                    <div className="text-[13px] text-[var(--gray-200)]">{n.label}</div>
                    <div className="text-[11px] text-[var(--gray-600)] mt-0.5">{n.desc}</div>
                  </div>
                  <Toggle defaultOn={n.defaultOn} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
