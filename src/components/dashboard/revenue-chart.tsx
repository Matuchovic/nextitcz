'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const DATA = [
  { month: 'Č', value: 52 }, { month: 'L', value: 61 }, { month: 'Z', value: 55 },
  { month: 'Ř', value: 74 }, { month: 'Ú', value: 80 }, { month: 'B', value: 78 },
  { month: 'L', value: 90 }, { month: 'S', value: 86 }, { month: 'Ž', value: 100 },
  { month: 'Ú', value: 108 }, { month: 'K', value: 120 }, { month: 'K', value: 138 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[rgba(12,12,12,0.95)] border border-white/10 rounded-xl px-3 py-2 text-xs backdrop-blur-xl">
      <div className="text-[var(--gray-500)] font-mono mb-0.5">{label}</div>
      <div className="text-white font-semibold">€{payload[0].value}k</div>
    </div>
  );
};

export function RevenueChart() {
  return (
    <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-5">
      <div className="text-[13px] font-medium tracking-tight mb-1">Příjmy za posledních 12 měsíců</div>
      <div className="text-[10px] text-[var(--gray-600)] font-mono mb-4">MĚSÍČNÍ PŘEHLED · 2025–2026</div>

      <div className="h-[180px]" role="img" aria-label="Graf příjmů za posledních 12 měsíců">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={DATA} barCategoryGap="30%">
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--gray-700)', fontSize: 10, fontFamily: 'var(--font-dm-mono)' }}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Bar
              dataKey="value"
              radius={[3, 3, 0, 0]}
              fill="url(#barGradient)"
            >
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity={1} />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity={0.3} />
                </linearGradient>
              </defs>
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
