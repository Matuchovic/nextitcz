'use client';

const PROJECTS = [
  { name: 'E-commerce Platform CZ', tech: 'Next.js · FastAPI', status: 'live', progress: 100, deadline: 'Dokončeno' },
  { name: 'AI Dashboard SaaS', tech: 'React · Python', status: 'dev', progress: 68, deadline: '15. 6. 2026' },
  { name: 'Mobile App v3.0', tech: 'React Native', status: 'review', progress: 88, deadline: '28. 5. 2026' },
  { name: 'ERP Integrace SK', tech: 'Node.js · PostgreSQL', status: 'dev', progress: 42, deadline: '30. 7. 2026' },
];

const STATUS_STYLES: Record<string, string> = {
  live: 'status-live',
  dev: 'status-dev',
  review: 'status-review',
};

const STATUS_LABELS: Record<string, string> = {
  live: 'LIVE',
  dev: 'V VÝVOJI',
  review: 'REVIEW',
};

export function ProjectsTable() {
  return (
    <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl overflow-hidden" role="table" aria-label="Přehled projektů">
      {/* Table header row */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/[0.06]">
        <span className="text-[13px] font-medium tracking-tight">Aktivní projekty</span>
        <button className="text-xs font-medium px-3 py-1.5 rounded-lg btn-primary">
          + Nový projekt
        </button>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[2fr_1fr_90px_120px_100px] gap-0 px-4 py-2.5 border-b border-white/[0.06]" role="row">
        {['NÁZEV', 'TECHNOLOGIE', 'STATUS', 'PRŮBĚH', 'DOKONČENÍ'].map(h => (
          <span key={h} className="text-[10px] font-mono text-[var(--gray-700)] tracking-wide" role="columnheader">{h}</span>
        ))}
      </div>

      {/* Rows */}
      {PROJECTS.map(p => (
        <div
          key={p.name}
          className="grid grid-cols-[2fr_1fr_90px_120px_100px] gap-0 px-4 py-3 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors cursor-default"
          role="row"
        >
          <span className="text-[12px] font-medium text-[var(--gray-200)] flex items-center" role="cell">{p.name}</span>
          <span className="text-[10px] text-[var(--gray-600)] font-mono flex items-center" role="cell">{p.tech}</span>
          <span className="flex items-center" role="cell">
            <span className={STATUS_STYLES[p.status]}>{STATUS_LABELS[p.status]}</span>
          </span>
          <span className="flex items-center pr-4" role="cell">
            <div className="w-full h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)]"
                style={{ width: `${p.progress}%` }}
              />
            </div>
          </span>
          <span className="text-[11px] text-[var(--gray-600)] font-mono flex items-center" role="cell">{p.deadline}</span>
        </div>
      ))}
    </div>
  );
}
