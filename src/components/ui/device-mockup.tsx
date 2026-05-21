'use client';

import { motion } from 'framer-motion';

const DEPLOYMENTS = [
  { name: 'nextit-api v3.2.1', status: 'live' },
  { name: 'dashboard-ui v1.8.0', status: 'deploy' },
  { name: 'mobile-app v2.0.4', status: 'live' },
];

export function DeviceMockup() {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[rgba(15,15,15,0.9)] shadow-[0_40px_80px_rgba(0,0,0,0.8),0_0_80px_rgba(79,142,247,0.08)]"
      style={{ boxShadow: '0 0 0 0.5px rgba(255,255,255,0.04) inset, 0 40px 80px rgba(0,0,0,0.8), 0 0 80px rgba(79,142,247,0.08)' }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-1.5 px-3.5 h-9 bg-white/[0.03] border-b border-white/[0.06]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-auto text-[10px] text-[var(--gray-700)] font-mono">nextit.tech — dashboard</span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3">
        {/* Top row: 3 KPI cards */}
        <div className="grid grid-cols-3 gap-2.5">
          <KpiCard label="PŘÍJMY / MĚS." value="€284k" delta="▲ +18.4%" up>
            <Sparkline />
          </KpiCard>
          <KpiCard label="AKTIVNÍ UŽIVATELÉ" value="12,847" delta="▲ +6.2%" up />
          <KpiCard label="PROJEKTY LIVE" value="237" delta="▲ +3 dnes" up />
        </div>

        {/* Bottom row: deployments + latency */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="col-span-2 glass-card p-3.5">
            <div className="text-[9px] text-[var(--gray-500)] font-mono tracking-wide mb-2">NEJNOVĚJŠÍ NASAZENÍ</div>
            <div className="flex flex-col gap-1.5">
              {DEPLOYMENTS.map(d => (
                <div key={d.name} className="flex items-center justify-between">
                  <span className="text-[12px] text-white font-medium">{d.name}</span>
                  {d.status === 'live' ? (
                    <span className="text-[9px] text-[var(--accent3)] font-mono">● živé</span>
                  ) : (
                    <span className="text-[9px] text-[var(--accent)] font-mono">⟳ deploy</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <KpiCard label="LATENCE API" value="42ms" delta="P99 · výborné" up />
        </div>
      </div>
    </motion.div>
  );
}

function KpiCard({
  label, value, delta, up, children,
}: {
  label: string; value: string; delta: string; up: boolean; children?: React.ReactNode;
}) {
  return (
    <div className="glass-card p-3.5">
      <div className="text-[9px] text-[var(--gray-500)] font-mono tracking-wide mb-1.5">{label}</div>
      <div className="text-xl font-bold tracking-[-1px] leading-none text-white">{value}</div>
      <div className={`text-[9px] font-mono mt-1.5 ${up ? 'text-[var(--accent3)]' : 'text-red-400'}`}>{delta}</div>
      {children}
    </div>
  );
}

function Sparkline() {
  return (
    <div className="h-8 mt-2">
      <svg viewBox="0 0 120 32" preserveAspectRatio="none" className="w-full h-full">
        <polyline
          points="0,24 20,18 40,22 60,10 80,12 100,4 120,0"
          fill="none"
          stroke="rgba(79,142,247,0.6)"
          strokeWidth="1.5"
        />
        <polyline
          points="0,24 20,18 40,22 60,10 80,12 100,4 120,0 120,32 0,32"
          fill="rgba(79,142,247,0.08)"
          stroke="none"
        />
      </svg>
    </div>
  );
}
