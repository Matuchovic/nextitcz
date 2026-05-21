import { AuthCard } from '@/components/auth/auth-card';
import { RegisterForm } from '@/components/auth/register-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registrace',
  description: 'Vytvořte si účet a spusťte první projekt zdarma.',
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-25"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', filter: 'blur(80px)' }}
        aria-hidden="true"
      />
      <AuthCard>
        <RegisterForm />
      </AuthCard>
    </div>
  );
}
