'use client';

const ACTIVITIES = [
  { color: 'bg-[var(--accent3)]', text: '<strong>nextit-api</strong> nasazen na produkci', time: 'před 2 min.' },
  { color: 'bg-[var(--accent)]', text: '<strong>Marta K.</strong> přidala nový projekt', time: 'před 14 min.' },
  { color: 'bg-[var(--accent2)]', text: 'AI analýza dokončena pro <strong>e-shop CZ</strong>', time: 'před 31 min.' },
  { color: 'bg-amber-500', text: '<strong>Pavel N.</strong> otevřel 3 issues', time: 'před 1 h.' },
  { color: 'bg-[var(--accent3)]', text: '<strong>Nový klient</strong> Sigma Corp se zaregistroval', time: 'před 2 h.' },
];

export function ActivityFeed() {
  return (
    <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-5">
      <div className="text-[13px] font-medium tracking-tight mb-1">Aktivita týmu</div>
      <div className="text-[10px] text-[var(--gray-600)] font-mono mb-4">POSLEDNÍ UDÁLOSTI</div>

      <div className="flex flex-col gap-0.5" role="feed">
        {ACTIVITIES.map((a, i) => (
          <div
            key={i}
            className="flex items-start gap-2.5 px-2.5 py-2.5 rounded-xl hover:bg-white/[0.03] transition-colors cursor-default"
            role="article"
          >
            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${a.color}`} />
            <div>
              <div
                className="text-xs text-[var(--gray-400)] leading-relaxed [&_strong]:text-[var(--gray-200)] [&_strong]:font-medium"
                dangerouslySetInnerHTML={{ __html: a.text }}
              />
              <div className="text-[10px] font-mono text-[var(--gray-700)] mt-0.5">{a.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
