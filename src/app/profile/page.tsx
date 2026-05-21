import { requireAuth } from '@/lib/auth';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { getInitials } from '@/lib/utils';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Profil' };

const ACTIVITIES = [
  { color: 'bg-[var(--accent3)]', text: 'Nasazen <strong>e-commerce-cz</strong> v3.1.4', time: 'Dnes, 10:42' },
  { color: 'bg-[var(--accent)]', text: 'Vytvořen nový <strong>API klíč</strong> pro staging', time: 'Včera, 15:23' },
  { color: 'bg-[var(--accent2)]', text: 'Upgradováno předplatné na <strong>PRO</strong>', time: '18. 5. 2026' },
];

export default async function ProfilePage() {
  const user = await requireAuth();

  return (
    <DashboardLayout user={user}>
      <div className="p-7 max-w-3xl space-y-4">
        {/* Profile header card */}
        <div className="flex items-center gap-5 bg-white/[0.03] border border-white/[0.07] rounded-2xl p-7">
          <div
            className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-[0_0_24px_rgba(79,142,247,0.3)]"
            role="img"
            aria-label={`Avatar uživatele ${user.name}`}
          >
            {getInitials(user.name)}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold tracking-tight">{user.name}</h1>
            <div className="text-[12px] font-mono text-[var(--gray-500)] mt-0.5">{user.role.toUpperCase()} · PRO PLÁN</div>
            <div className="flex gap-6 mt-3">
              {[
                { num: '12', label: 'PROJEKTY' },
                { num: '237', label: 'COMMITS' },
                { num: '8', label: 'MĚSÍCE' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-[18px] font-bold tracking-tight">{s.num}</div>
                  <div className="text-[10px] font-mono text-[var(--gray-600)]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <Link href="/settings" className="btn-ghost text-sm px-3 py-1.5 rounded-lg flex-shrink-0">
            Upravit profil
          </Link>
        </div>

        {/* Account info */}
        <div className="bg-white/[0.02] border border-white/[0.07] rounded-xl p-6">
          <div className="text-[13px] font-medium tracking-tight mb-1">Informace o účtu</div>
          <div className="text-[11px] text-[var(--gray-600)] font-mono mb-5">NEXTIT ACCOUNT · Aktuální plán & využití</div>
          <div className="divide-y divide-white/[0.05]">
            <div className="flex items-center justify-between py-3 first:pt-0">
              <span className="text-[13px] text-[var(--gray-200)]">Email</span>
              <span className="text-[12px] text-[var(--gray-400)] font-mono">{user.email}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-[13px] text-[var(--gray-200)]">Předplatné</span>
              <span className="status-live">PRO ACTIVE</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-[13px] text-[var(--gray-200)]">Obnovení</span>
              <span className="text-[12px] text-[var(--gray-400)] font-mono">1. 6. 2026</span>
            </div>
            <div className="flex items-center justify-between py-3 last:pb-0">
              <span className="text-[13px] text-[var(--gray-200)]">Úložiště</span>
              <div className="flex items-center gap-3">
                <div className="w-24 h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
                  <div className="h-full w-[38%] rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)]" />
                </div>
                <span className="text-[11px] text-[var(--gray-600)] font-mono">38 / 100 GB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity */}
        <div className="bg-white/[0.02] border border-white/[0.07] rounded-xl p-6">
          <div className="text-[13px] font-medium tracking-tight mb-1">Přehled aktivit</div>
          <div className="text-[11px] text-[var(--gray-600)] font-mono mb-5">POSLEDNÍCH 30 DNÍ</div>
          <div className="flex flex-col gap-0.5">
            {ACTIVITIES.map((a, i) => (
              <div key={i} className="flex items-start gap-2.5 px-2 py-2.5 rounded-xl hover:bg-white/[0.03] transition-colors">
                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${a.color}`} />
                <div>
                  <div
                    className="text-[12px] text-[var(--gray-400)] [&_strong]:text-[var(--gray-200)] [&_strong]:font-medium"
                    dangerouslySetInnerHTML={{ __html: a.text }}
                  />
                  <div className="text-[10px] font-mono text-[var(--gray-700)] mt-0.5">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
