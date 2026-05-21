import { AuthCard } from '@/components/auth/auth-card';
import { LoginForm } from '@/components/auth/login-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Přihlásit se',
  description: 'Přihlaste se k vašemu NEXTIT Technologies účtu.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(79,142,247,0.15) 0%, transparent 70%)', filter: 'blur(80px)' }}
        aria-hidden="true"
      />
      <div className="absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)', filter: 'blur(80px)' }}
        aria-hidden="true"
      />

      <AuthCard>
        <LoginForm />
      </AuthCard>
    </div>
  );
}
