'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const schema = z.object({
  name: z.string().min(2, 'Zadejte celé jméno'),
  email: z.string().email('Neplatný email'),
  project_type: z.string().min(1, 'Vyberte typ projektu'),
  message: z.string().min(20, 'Zpráva musí mít alespoň 20 znaků'),
  company: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const INFO = [
  { icon: '📍', label: 'SÍDLO', value: 'Václavské náměstí 832/19\n110 00 Praha 1, Česká republika' },
  { icon: '📧', label: 'EMAIL', value: 'hello@nextit.tech' },
  { icon: '📞', label: 'TELEFON', value: '+420 800 123 456' },
  { icon: '🕐', label: 'PRACOVNÍ DOBA', value: 'Po–Pá: 9:00–18:00 CET\nUrgent: 24/7 pro klienty' },
];

export default function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    try {
      await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      toast.success('Zpráva odeslána! Ozveme se do 2 hodin.');
      reset();
    } catch {
      toast.error('Nepodařilo se odeslat zprávu. Zkuste to znovu.');
    }
  }

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 px-6 max-w-6xl mx-auto">
        <div className="section-tag">KONTAKT</div>
        <h1 className="text-4xl lg:text-[52px] font-bold tracking-[-2px] leading-tight mb-4">Pojďme spolupracovat</h1>
        <p className="text-[15px] text-[var(--gray-400)] max-w-[500px] leading-relaxed font-light mb-14">
          Máte projekt? Ozvěte se — odpovíme do 2 hodin v pracovní době.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <div className="space-y-6">
            {INFO.map(item => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-[9px] bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-base flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[var(--gray-600)] tracking-wide mb-1">{item.label}</div>
                  <div className="text-[13px] text-[var(--gray-300)] leading-relaxed whitespace-pre-line">{item.value}</div>
                </div>
              </div>
            ))}

            <div className="mt-8 p-5 bg-[var(--accent)]/[0.05] border border-[var(--accent)]/20 rounded-2xl">
              <div className="text-[11px] font-mono text-[var(--accent)] tracking-wide mb-3">CERTIFIKACE</div>
              <div className="flex flex-wrap gap-2">
                {['ISO 27001', 'SOC 2 Type II', 'GDPR', 'PCI DSS'].map(c => (
                  <span key={c} className="text-[10px] font-mono text-[var(--gray-600)] bg-white/[0.04] border border-white/[0.08] rounded px-2 py-1">{c}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div
            className="relative rounded-[20px] p-9 overflow-hidden"
            style={{ background: 'rgba(12,12,12,0.9)', border: '0.5px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)' }}
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.15] to-transparent" />
            <h2 className="text-[16px] font-semibold tracking-tight mb-6">Popište váš projekt</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              {[
                { name: 'name', label: 'JMÉNO', type: 'text', placeholder: 'Jan Novák' },
                { name: 'email', label: 'EMAIL', type: 'email', placeholder: 'jan@firma.cz' },
                { name: 'company', label: 'SPOLEČNOST (volitelné)', type: 'text', placeholder: 'ACME s.r.o.' },
              ].map(field => (
                <div key={field.name}>
                  <label className="block text-[11px] font-mono text-[var(--gray-500)] tracking-wide mb-1.5">{field.label}</label>
                  <input
                    {...register(field.name as keyof FormData)}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-lg text-sm text-white placeholder-[var(--gray-700)] outline-none focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/20 transition-all font-sans"
                  />
                  {errors[field.name as keyof FormData] && (
                    <p className="text-[11px] text-red-400 mt-1">{errors[field.name as keyof FormData]?.message}</p>
                  )}
                </div>
              ))}

              <div>
                <label className="block text-[11px] font-mono text-[var(--gray-500)] tracking-wide mb-1.5">TYP PROJEKTU</label>
                <select
                  {...register('project_type')}
                  className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-lg text-sm text-white outline-none focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/20 transition-all font-sans"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  <option value="" style={{ background: '#0f0f0f' }}>Vyberte typ projektu...</option>
                  {['Webová platforma', 'Mobilní aplikace', 'AI / ML systém', 'E-commerce', 'SaaS produkt', 'Jiné'].map(o => (
                    <option key={o} value={o} style={{ background: '#0f0f0f' }}>{o}</option>
                  ))}
                </select>
                {errors.project_type && <p className="text-[11px] text-red-400 mt-1">{errors.project_type.message}</p>}
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[var(--gray-500)] tracking-wide mb-1.5">ZPRÁVA</label>
                <textarea
                  {...register('message')}
                  rows={4}
                  placeholder="Popište váš projekt, budget a timeline..."
                  className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-lg text-sm text-white placeholder-[var(--gray-700)] outline-none focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/20 transition-all font-sans resize-y min-h-[100px]"
                />
                {errors.message && <p className="text-[11px] text-red-400 mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl btn-primary text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Odesílání...' : 'Odeslat zprávu →'}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
