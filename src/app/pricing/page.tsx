'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';

const PLANS = [
  {
    id: 'starter',
    name: 'STARTER',
    priceMonthly: 0,
    priceAnnual: 0,
    period: '1 projekt · Navždy zdarma',
    features: ['1 webový projekt', '5 GB úložiště', 'Základní analytika', 'Emailová podpora', 'Nextit subdoména'],
    cta: 'Začít zdarma',
    href: '/auth/register',
    featured: false,
  },
  {
    id: 'pro',
    name: 'PRO',
    priceMonthly: 99,
    priceAnnual: 79,
    period: '10 projektů',
    features: ['10 projektů', '100 GB úložiště', 'Pokročilá analytika + AI', 'Prioritní podpora 24/7', 'Vlastní domény (10)', 'CI/CD pipeline', 'Team (5 členů)'],
    cta: 'Vybrat Pro',
    href: '/auth/register',
    featured: true,
  },
  {
    id: 'business',
    name: 'BUSINESS',
    priceMonthly: 319,
    priceAnnual: 249,
    period: 'Neomezené projekty',
    features: ['Neomezené projekty', '1 TB úložiště', 'Custom AI modely', 'Dedikovaný account manager', 'Neomezené domény', 'SLA 99.99%', 'Team (25 členů)', 'White-label'],
    cta: 'Kontaktovat sales',
    href: '/contact',
    featured: false,
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 px-6 max-w-6xl mx-auto">
        <div className="section-tag">CENÍK</div>
        <h1 className="text-4xl lg:text-[52px] font-bold tracking-[-2px] leading-tight mb-4">Transparentní ceny</h1>
        <p className="text-[15px] text-[var(--gray-400)] max-w-[500px] leading-relaxed font-light mb-8">
          Bez skrytých poplatků. Vyberte plán, který odpovídá velikosti vašeho byznysu.
        </p>

        {/* Billing toggle */}
        <div className="flex items-center gap-3 mb-12">
          <button
            onClick={() => setAnnual(false)}
            className={`text-[11px] font-mono px-3 py-2 rounded-lg border transition-all ${!annual ? 'bg-[var(--accent)]/15 border-[var(--accent)]/30 text-[var(--accent)]' : 'bg-white/[0.04] border-white/[0.08] text-[var(--gray-500)]'}`}
          >
            Měsíčně
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`text-[11px] font-mono px-3 py-2 rounded-lg border transition-all ${annual ? 'bg-[var(--accent)]/15 border-[var(--accent)]/30 text-[var(--accent)]' : 'bg-white/[0.04] border-white/[0.08] text-[var(--gray-500)]'}`}
          >
            Ročně <span className="text-[var(--accent3)]">-20%</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3" role="list">
          {PLANS.map(plan => {
            const price = annual ? plan.priceAnnual : plan.priceMonthly;
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-7 flex flex-col transition-all duration-200 ${
                  plan.featured
                    ? 'bg-[var(--accent)]/[0.05] border border-[var(--accent)]/40 shadow-[0_0_40px_rgba(79,142,247,0.1)]'
                    : 'bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.15] hover:-translate-y-0.5'
                }`}
                role="listitem"
              >
                {/* Top shine */}
                <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${plan.featured ? 'via-[var(--accent)]/40' : 'via-white/[0.1]'} to-transparent`} />

                {plan.featured && (
                  <div className="inline-flex mb-4">
                    <span className="text-[9px] font-mono text-[var(--accent)] bg-[var(--accent)]/15 border border-[var(--accent)]/30 rounded px-2 py-1 tracking-wide">
                      NEJOBLÍBENĚJŠÍ
                    </span>
                  </div>
                )}

                <div className="text-[13px] font-mono text-[var(--gray-400)] mb-2 tracking-wide">{plan.name}</div>

                <div className="mb-1">
                  <span className="text-[40px] font-bold tracking-[-2px] leading-none">
                    {price === 0 ? 'Zdarma' : `€${price}`}
                  </span>
                  {price > 0 && <span className="text-[var(--gray-500)] text-base font-light">/měs.</span>}
                </div>

                <div className="text-[11px] text-[var(--gray-600)] font-mono mb-6">
                  {annual && price > 0 ? 'Fakturace ročně · ' : price > 0 ? 'Fakturace měsíčně · ' : ''}{plan.period}
                </div>

                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-[12px] text-[var(--gray-400)]">
                      <span className="w-1 h-1 rounded-full bg-[var(--accent3)] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`w-full py-2.5 rounded-xl text-[12px] font-medium text-center transition-all ${
                    plan.featured
                      ? 'btn-primary shadow-[0_0_20px_rgba(79,142,247,0.25)]'
                      : 'bg-white/[0.05] border border-white/[0.12] text-[var(--gray-300)] hover:bg-white/[0.09] hover:text-white'
                  }`}
                >
                  {plan.cta} {plan.featured ? '→' : ''}
                </Link>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
