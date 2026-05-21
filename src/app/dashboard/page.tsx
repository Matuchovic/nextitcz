import { requireAuth } from '@/lib/auth';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { KpiCards } from '@/components/dashboard/kpi-cards';
import { RevenueChart } from '@/components/dashboard/revenue-chart';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { ProjectsTable } from '@/components/dashboard/projects-table';

export default async function DashboardPage() {
  const user = await requireAuth();

  return (
    <DashboardLayout user={user}>
      <div className="p-7 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Dobrý den, <span className="text-[var(--gray-500)] font-light">{user.name} ✦</span>
            </h1>
            <p className="text-[11px] font-mono text-[var(--gray-700)] mt-1" suppressHydrationWarning>
              {new Date().toLocaleString('cs-CZ', { weekday: 'long', day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <button className="text-sm font-medium px-3.5 py-2 rounded-xl btn-primary">
            ⌘K Příkazy
          </button>
        </div>

        {/* KPI Cards */}
        <KpiCards />

        {/* Chart + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-3">
          <RevenueChart />
          <ActivityFeed />
        </div>

        {/* Projects table */}
        <ProjectsTable />
      </div>
    </DashboardLayout>
  );
}
