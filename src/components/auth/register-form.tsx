'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { toast } from 'sonner';

export function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) {
      toast.error('Heslo musí mít alespoň 8 znaků');
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, company },
          emailRedirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      // Pokud je email confirm vypnutý, rovnou přihlásíme
      if (data.session) {
        toast.success('Účet vytvořen! Vítejte.');
        router.push('/dashboard');
        router.refresh();
        return;
      }

      // Pokud je email confirm zapnutý
      toast.success('Zkontrolujte email pro potvrzení účtu.');
      router.push('/auth/login');
    } catch {
      toast.error('Nastala chyba. Zkuste to znovu.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="text-[22px] font-bold tracking-[-0.8px] mb-1.5">Vytvořit účet</h1>
      <p className="text-[13px] text-[var(--gray-500)] mb-7">Spusťte svůj první projekt zdarma</p>

      <form onSubmit={onSubmit} className="space-y-3.5" noValidate>
        <div>
          <label className="block text-[11px] font-mono text-[var(--gray-500)] tracking-wide mb-1.5">CELÉ JMÉNO</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Jan Novák"
            autoComplete="name"
            required
            className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-lg text-sm text-white placeholder-[var(--gray-700)] outline-none focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/20 transition-all font-sans"
          />
        </div>
        <div>
          <label className="block text-[11px] font-mono text-[var(--gray-500)] tracking-wide mb-1.5">PRACOVNÍ EMAIL</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="jan@firma.cz"
            autoComplete="email"
            required
            className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-lg text-sm text-white placeholder-[var(--gray-700)] outline-none focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/20 transition-all font-sans"
          />
        </div>
        <div>
          <label className="block text-[11px] font-mono text-[var(--gray-500)] tracking-wide mb-1.5">HESLO</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Min. 8 znaků"
            autoComplete="new-password"
            required
            className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-lg text-sm text-white placeholder-[var(--gray-700)] outline-none focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/20 transition-all font-sans"
          />
        </div>
        <div>
          <label className="block text-[11px] font-mono text-[var(--gray-500)] tracking-wide mb-1.5">
            SPOLEČNOST <span className="text-[var(--gray-700)]">(volitelné)</span>
          </label>
          <input
            type="text"
            value={company}
            onChange={e => setCompany(e.target.value)}
            placeholder="ACME s.r.o."
            autoComplete="organization"
            className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-lg text-sm text-white placeholder-[var(--gray-700)] outline-none focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/20 transition-all font-sans"
          />
        </div>

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
        <Link href="/terms" className="text-[var(--gray-600)] hover:text-[var(--gray-400)]">Podmínkami použití</Link>
        {' '}a{' '}
        <Link href="/privacy" className="text-[var(--gray-600)] hover:text-[var(--gray-400)]">Zásadami ochrany soukromí</Link>.
      </p>

      <p className="text-center text-xs text-[var(--gray-600)] mt-4">
        Máte účet?{' '}
        <Link href="/auth/login" className="text-[var(--accent)] hover:underline">Přihlaste se</Link>
      </p>
    </>
  );
}
