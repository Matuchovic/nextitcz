import { DashboardLayout } from '@/components/dashboard/dashboard-layout';

const mockUser = {
  id: '1',
  email: 'matuchovic@nextit.cz',
  name: 'Ondřej Matuchovic',
  role: 'admin' as const,
  avatar_url: null,
  company: 'NEXTIT Technologies',
  created_at: new Date().toISOString(),
};

export default function AdminPage() {
  return (
    <DashboardLayout user={mockUser}>
      <div className="p-7">
        <h1 className="text-xl font-semibold tracking-tight mb-2">Admin <span className="text-[var(--gray-500)] font-light">Dashboard</span></h1>
        <p className="text-sm text-[var(--gray-500)]">Admin panel je připraven.</p>
      </div>
    </DashboardLayout>
  );
}
