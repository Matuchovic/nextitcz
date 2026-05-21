'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase';

const schema = z.object({
  name: z.string().min(2, 'Zadejte celé jméno'),
  email: z.string().email('Neplatný email'),
  password: z.string().min(8, 'Heslo musí mít alespoň 8 znaků'),
  company: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: { name: data.name, company: data.company },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success('Účet vytvořen! Zkontrolujte email pro potvrzení.');
      router.push('/dashboard');
    } catch {
      toast.error('Nastala neočekávaná chyba.');
    } finally {
      setLoading(false);
    }
  }

  const fields = [
    { name: 'name', label: 'CELÉ JMÉNO', type: 'text', placeholder: 'Jan Novák', autoComplete: 'name' },
    { name: 'email', label: 'PRACOVNÍ EMAIL', type: 'email', placeholder: 'jan@firma.cz', autoComplete: 'email' },
    { name: 'password', label: 'HESLO', type: 'password', placeholder: 'Min. 8 znaků', autoComplete: 'new-password' },
    { name: 'company', label: 'SPOLEČNOST (volitelné)', type: 'text', placeholder: 'ACME s.r.o.', autoComplete: 'organization' },
  ] as const;

  return (
    <>
      <h1 className="text-[22px] font-bold tracking-[-0.8px] mb-1.5">Vytvořit účet</h1>
      <p className="text-[13px] text-[var(--gray-500)] mb-7">Spusťte svůj první projekt zdarma</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5" noValidate>
        {fields.map(f => (
          <div key={f.name}>
            <label className="block text-[11px] font-mono text-[var(--gray-500)] tracking-wide mb-1.5">{f.label}</label>
            <input
              {...register(f.name)}
              type={f.type}
              autoComplete={f.autoComplete}
              placeholder={f.placeholder}
              className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-lg text-sm text-white placeholder-[var(--gray-700)] outline-none focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/20 focus:bg-white/[0.06] transition-all font-sans"
            />
            {errors[f.name] && <p className="text-[11px] text-red-400 mt-1">{errors[f.name]?.message}</p>}
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg btn-primary text-sm font-medium mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Vytváření účtu...' : 'Zaregistrovat se →'}
        </button>
      </form>

      <p className="text-[10px] text-[var(--gray-700)] text-center mt-4 leading-relaxed">
        Registrací souhlasíte s{' '}
        <Link href="/terms" className="text-[var(--gray-600)] hover:text-[var(--gray-400)] transition-colors">Podmínkami použití</Link>
        {' '}a{' '}
        <Link href="/privacy" className="text-[var(--gray-600)] hover:text-[var(--gray-400)] transition-colors">Zásadami ochrany soukromí</Link>.
      </p>

      <p className="text-center text-xs text-[var(--gray-600)] mt-4">
        Máte účet?{' '}
        <Link href="/auth/login" className="text-[var(--accent)] hover:underline">Přihlaste se</Link>
      </p>
    </>
  );
}
