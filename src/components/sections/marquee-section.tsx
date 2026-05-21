const TECH = [
  'Next.js 15', 'React 19', 'TypeScript 5', 'Python FastAPI', 'PostgreSQL',
  'Supabase', 'Vercel Edge', 'Railway', 'Three.js', 'Framer Motion',
  'GSAP', 'TailwindCSS', 'Prisma ORM', 'Redis', 'Docker',
  'Kubernetes', 'AWS', 'OpenAI', 'Anthropic Claude', 'WebGL',
];

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="overflow-hidden py-3" aria-hidden="true">
      <div
        className="flex gap-0 w-max"
        style={{ animation: `scroll-marquee 24s linear infinite ${reverse ? 'reverse' : ''}` }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-2 px-8 text-[11px] font-mono text-[var(--gray-600)] whitespace-nowrap">
            <span className="w-1 h-1 rounded-full bg-[var(--gray-700)]" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function MarqueeSection() {
  return (
    <div className="border-y border-white/[0.05]" aria-label="Technologie které používáme">
      <MarqueeRow items={TECH} />
    </div>
  );
}
