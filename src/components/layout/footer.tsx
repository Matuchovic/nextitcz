import Link from 'next/link';

const LINKS = {
  Produkt: [
    { label: 'Služby', href: '/services' },
    { label: 'Ceník', href: '/pricing' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Changelog', href: '/changelog' },
  ],
  Firma: [
    { label: 'O nás', href: '/about' },
    { label: 'Kariéra', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'Kontakt', href: '/contact' },
  ],
  Právní: [
    { label: 'Podmínky použití', href: '/terms' },
    { label: 'Ochrana soukromí', href: '/privacy' },
    { label: 'Cookies', href: '/cookies' },
    { label: 'GDPR', href: '/gdpr' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-20" role="contentinfo">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] flex items-center justify-center text-xs font-bold">NX</div>
              <span className="text-sm font-semibold tracking-tight">NEXTIT <span className="text-[var(--gray-500)] font-normal">Technologies</span></span>
            </div>
            <p className="text-[13px] text-[var(--gray-600)] leading-relaxed max-w-[200px]">
              Building next-generation digital platforms.
            </p>
            <div className="flex gap-3 mt-5">
              {['𝕏', 'in', 'gh'].map(s => (
                <button key={s} className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[var(--gray-600)] text-xs hover:bg-white/[0.08] hover:text-white transition-all flex items-center justify-center" aria-label={s}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([section, links]) => (
            <div key={section}>
              <div className="text-[10px] font-mono text-[var(--gray-700)] tracking-widest uppercase mb-4">{section}</div>
              <ul className="space-y-2.5">
                {links.map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[13px] text-[var(--gray-500)] hover:text-[var(--gray-200)] transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.05] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-[var(--gray-700)] font-mono">
            © {new Date().getFullYear()} NEXTIT Technologies s.r.o. Všechna práva vyhrazena.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent3)] animate-blink" aria-hidden="true" />
            <span className="text-[11px] text-[var(--gray-700)] font-mono">Všechny systémy funkční</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
