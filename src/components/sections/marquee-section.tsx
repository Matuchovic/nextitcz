const TECH = [
  { name: 'Next.js 15', icon: '▲' }, { name: 'React 19', icon: '⚛' },
  { name: 'TypeScript 5', icon: '⟨/⟩' }, { name: 'Python FastAPI', icon: '⚡' },
  { name: 'PostgreSQL', icon: '◈' }, { name: 'Supabase', icon: '⚡' },
  { name: 'Vercel Edge', icon: '◆' }, { name: 'Three.js', icon: '△' },
  { name: 'Framer Motion', icon: '◉' }, { name: 'TailwindCSS', icon: '✦' },
  { name: 'Prisma ORM', icon: '◈' }, { name: 'Redis', icon: '⬡' },
  { name: 'Docker', icon: '◼' }, { name: 'Kubernetes', icon: '☸' },
  { name: 'OpenAI GPT-4', icon: '◎' }, { name: 'Claude AI', icon: '◐' },
  { name: 'WebGL', icon: '▣' }, { name: 'GSAP', icon: '⟳' },
];

export function MarqueeSection() {
  return (
    <div className="relative overflow-hidden py-4 border-y border-white/[0.04]"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(20px)' }}>
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, black, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(-90deg, black, transparent)' }} />

      {/* Row 1 */}
      <div className="flex w-max mb-2" style={{ animation: 'scroll-marquee 35s linear infinite' }}>
        {[...TECH, ...TECH].map((t, i) => (
          <div key={i} className="flex items-center gap-2 px-6 whitespace-nowrap group cursor-default">
            <span className="text-[11px] text-white/15 font-mono">{t.icon}</span>
            <span className="text-[11px] font-mono text-white/25 group-hover:text-white/60 transition-colors tracking-wide">{t.name}</span>
            <span className="text-white/10 text-[10px] ml-2">·</span>
          </div>
        ))}
      </div>

      {/* Row 2 reverse */}
      <div className="flex w-max" style={{ animation: 'scroll-marquee 28s linear infinite reverse' }}>
        {[...TECH.slice(9), ...TECH.slice(0, 9), ...TECH.slice(9), ...TECH.slice(0, 9)].map((t, i) => (
          <div key={i} className="flex items-center gap-2 px-6 whitespace-nowrap group cursor-default">
            <span className="text-[11px] text-white/10 font-mono">{t.icon}</span>
            <span className="text-[11px] font-mono text-white/15 group-hover:text-white/50 transition-colors tracking-wide">{t.name}</span>
            <span className="text-white/8 text-[10px] ml-2">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
