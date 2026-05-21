'use client';

const KPIS = [
  { label: 'PŘÍJMY / MĚS.', value: '€284k', delta: '▲ +18.4% vs. min. měsíc', color: 'kpi-accent-blue', deltaColor: 'text-[var(--accent3)]' },
  { label: 'AKTIVNÍ UŽIVATELÉ', value: '12,847', delta: '▲ +6.2% tento týden', color: 'kpi-accent-purple', deltaColor: 'text-[var(--accent3)]' },
  { label: 'PROJEKTY LIVE', value: '237', delta: '▲ +3 dnes nasazeno', color: 'kpi-accent-green', deltaColor: 'text-[var(--accent3)]' },
  { label: 'LATENCE API P99', value: '42ms', delta: '● Výborný výkon', color: 'kpi-accent-amber', deltaColor: 'text-[var(--accent3)]' },
];

export function KpiCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3" role="list">
      {KPIS.map((kpi) => (
        <div
          key={kpi.label}
          className="relative bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 overflow-hidden hover:border-white/[0.12] transition-colors"
          role="listitem"
        >
          {/* Top shine */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />

          <div className="text-[10px] text-[var(--gray-600)] font-mono tracking-wide mb-2">{kpi.label}</div>
          <div className="text-[26px] font-bold tracking-[-1.5px] leading-none text-white">{kpi.value}</div>
          <div className={`text-[11px] font-mono mt-1.5 ${kpi.deltaColor}`}>{kpi.delta}</div>

          {/* Bottom accent line */}
          <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${kpi.color}`} />
        </div>
      ))}
    </div>
  );
}
