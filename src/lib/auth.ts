import { createServerSupabaseClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import type { User } from '@/types';

export async function getUser(): Promise<User | null> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    return {
      id: user.id,
      email: user.email!,
      name: user.user_metadata?.name ?? user.email!.split('@')[0],
      role: user.user_metadata?.role ?? 'user',
      avatar_url: user.user_metadata?.avatar_url ?? null,
      company: user.user_metadata?.company ?? null,
      created_at: user.created_at,
    };
  } catch {
    return null;
  }
}

export async function requireAuth() {
  const user = await getUser();
  if (!user) redirect('/auth/login');
  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();
  if (user.role !== 'admin') redirect('/dashboard');
  return user;
}
