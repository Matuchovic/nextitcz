import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Naše služby',
  description: 'Webové platformy, mobilní aplikace, AI systémy a cloud infrastruktura od NEXTIT Technologies.',
};

const SERVICES = [
  {
    icon: '🌐', color: 'blue',
    name: 'Webové platformy',
    desc: 'Full-stack webové aplikace s moderními frameworky, optimalizované pro výkon a škálovatelnost od prvního dne.',
    tags: ['Next.js', 'React', 'TypeScript', 'FastAPI'],
  },
  {
    icon: '📱', color: 'purple',
    name: 'Mobilní aplikace',
    desc: 'Nativní a cross-platform mobilní aplikace pro iOS i Android s plynulými animacemi a prémiovým UX.',
    tags: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
  },
  {
    icon: '🤖', color: 'green',
    name: 'AI & ML Systémy',
    desc: 'Integrace pokročilých jazykových modelů, počítačového vidění a prediktivní analytiky přímo do vašich produktů.',
    tags: ['GPT-4', 'Claude', 'TensorFlow', 'PyTorch'],
  },
  {
    icon: '☁️', color: 'amber',
    name: 'Cloud & DevOps',
    desc: 'Navrhujeme a spravujeme cloudovou infrastrukturu pro nulový downtime a maximální bezpečnost vašich dat.',
    tags: ['AWS', 'Vercel', 'Docker', 'Kubernetes'],
  },
  {
    icon: '🔗', color: 'blue',
    name: 'API & Integrace',
    desc: 'Propojíme vaše systémy s libovolnými třetími stranami — ERP, CRM, platební brány a stovky dalších služeb.',
    tags: ['REST', 'GraphQL', 'WebSockets', 'gRPC'],
  },
  {
    icon: '🎨', color: 'purple',
    name: 'UI/UX Design',
    desc: 'Cinematic designové systémy na úrovni Apple a Linear — rozhraní, která uživatelé milují a konvertují.',
    tags: ['Figma', 'Framer', 'Design System', 'Motion'],
  },
];

const COLOR_MAP: Record<string, string> = {
  blue: 'bg-[var(--accent)]/10 border-[var(--accent)]/20',
  purple: 'bg-[var(--accent2)]/10 border-[var(--accent2)]/20',
  green: 'bg-[var(--accent3)]/10 border-[var(--accent3)]/20',
  amber: 'bg-amber-500/10 border-amber-500/20',
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 px-6 max-w-6xl mx-auto">
        <div className="section-tag">PORTFOLIO</div>
        <h1 className="text-4xl lg:text-[52px] font-bold tracking-[-2px] leading-tight mb-4">Naše služby</h1>
        <p className="text-[15px] text-[var(--gray-400)] max-w-[520px] leading-relaxed font-light mb-14">
          Od návrhu UX po plnou produkci — pokrýváme celý životní cyklus vašeho digitálního produktu.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
          {SERVICES.map(s => (
            <div
              key={s.name}
              className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-7 hover:bg-white/[0.04] hover:border-white/[0.12] hover:-translate-y-0.5 transition-all duration-200 cursor-default"
              role="listitem"
            >
              <div className={`w-11 h-11 rounded-xl border flex items-center justify-center text-xl mb-4 ${COLOR_MAP[s.color]}`}>
                {s.icon}
              </div>
              <h2 className="text-[16px] font-semibold tracking-tight mb-2">{s.name}</h2>
              <p className="text-[13px] text-[var(--gray-500)] leading-relaxed mb-4">{s.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-mono text-[var(--gray-600)] bg-white/[0.04] border border-white/[0.08] rounded px-2 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
