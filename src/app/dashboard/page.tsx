import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { KpiCards } from '@/components/dashboard/kpi-cards';
import { RevenueChart } from '@/components/dashboard/revenue-chart';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { ProjectsTable } from '@/components/dashboard/projects-table';

const mockUser = {
  id: '1',
  email: 'matuchovic@nextit.cz',
  name: 'Ondřej Matuchovic',
  role: 'admin' as const,
  avatar_url: null,
  company: 'NEXTIT Technologies',
  created_at: new Date().toISOString(),
};

export default function DashboardPage() {
  return (
    <DashboardLayout user={mockUser}>
      <div className="p-7 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Dobrý den, <span className="text-[var(--gray-500)] font-light">{mockUser.name} ✦</span>
            </h1>
          </div>
        </div>
        <KpiCards />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-3">
          <RevenueChart />
          <ActivityFeed />
        </div>
        <ProjectsTable />
      </div>
    </DashboardLayout>
  );
}
