import { requireAuth } from '@/lib/auth';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { SettingsClient } from '@/components/settings/settings-client';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Nastavení' };

export default async function SettingsPage() {
  const user = await requireAuth();
  return (
    <DashboardLayout user={user}>
      <SettingsClient user={user} />
    </DashboardLayout>
  );
}
