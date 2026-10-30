import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

const formatINR = (val: number) => {
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(0)}k`;
  return `₹${val}`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#090C0A] border border-[#232D27] p-2.5 rounded shadow-xl text-xs font-mono-code">
        <div className="text-neutral-400 font-sans mb-1">{label}</div>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-neutral-300 font-sans">{entry.name}:</span>
            <span className="text-white font-bold font-mono-code">
              {typeof entry.value === 'number' ? `₹${entry.value.toLocaleString('en-IN')}` : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// 1. Donor Contribution Activity Chart (Area Chart)
export const DonorActivityChart: React.FC = () => {
  const data = [
    { month: 'January', amount: 1500, verified: 1500 },
    { month: 'February', amount: 2500, verified: 2500 },
    { month: 'March', amount: 1000, verified: 1000 },
    { month: 'April', amount: 4000, verified: 4000 },
    { month: 'May', amount: 3500, verified: 3500 },
    { month: 'June', amount: 8500, verified: 8500 },
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
          <defs>
            <linearGradient id="donorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00FF87" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#00FF87" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#18211C" vertical={false} />
          <XAxis dataKey="month" stroke="#6B7280" tick={{ fontSize: 11 }} />
          <YAxis stroke="#6B7280" tick={{ fontSize: 11 }} tickFormatter={formatINR} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="amount"
            name="Your Contribution"
            stroke="#00FF87"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#donorGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// 2. Donor Allocation Donut Chart
export const DonorAllocationChart: React.FC = () => {
  const data = [
    { name: 'Emergency relief', value: 8500, color: '#00FF87' },
    { name: 'Education', value: 5000, color: '#38BDF8' },
    { name: 'Healthcare', value: 3500, color: '#A855F7' },
    { name: 'Food relief', value: 2500, color: '#FBBF24' },
    { name: 'Community development', value: 1500, color: '#34D399' },
  ];

  return (
    <div className="w-full h-64 flex flex-col md:flex-row items-center justify-center">
      <div className="w-48 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={data}
              innerRadius={50}
              outerRadius={75}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#0D110F" strokeWidth={2} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col gap-1.5 text-xs font-mono-code ml-0 md:ml-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-neutral-300 font-sans">{item.name}</span>
            </div>
            <span className="text-white font-bold">{formatINR(item.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. Admin Donation Volume Line Chart with Toggle
export const AdminDonationVolumeChart: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  const dataMap = {
    daily: [
      { period: 'Mon', volume: 18500, verified: 18500 },
      { period: 'Tue', volume: 32000, verified: 30000 },
      { period: 'Wed', volume: 24500, verified: 24500 },
      { period: 'Thu', volume: 45000, verified: 41000 },
      { period: 'Fri', volume: 62000, verified: 57000 },
      { period: 'Sat', volume: 29000, verified: 29000 },
      { period: 'Sun', volume: 37500, verified: 37500 },
    ],
    weekly: [
      { period: 'Wk 1', volume: 125000, verified: 125000 },
      { period: 'Wk 2', volume: 198000, verified: 192000 },
      { period: 'Wk 3', volume: 248500, verified: 236000 },
      { period: 'Wk 4', volume: 310000, verified: 295000 },
      { period: 'Wk 5', volume: 280000, verified: 280000 },
    ],
    monthly: [
      { period: 'May', volume: 420000, verified: 420000 },
      { period: 'Jun', volume: 560000, verified: 560000 },
      { period: 'Jul', volume: 680000, verified: 670000 },
      { period: 'Aug', volume: 890000, verified: 875000 },
      { period: 'Sep', volume: 940000, verified: 920000 },
      { period: 'Oct', volume: 1160500, verified: 1144500 },
    ],
  };

  const activeData = dataMap[timeframe];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-xs font-mono-code text-neutral-400">INFLOW TRACKING</span>
          <p className="text-xs text-neutral-500">Gross community donations indexed via Tezos RPC</p>
        </div>
        <div className="flex items-center bg-[#111612] border border-[#232D27] rounded p-0.5 text-xs font-mono-code">
          {(['daily', 'weekly', 'monthly'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-2.5 py-1 rounded text-[11px] capitalize transition-colors ${
                timeframe === t
                  ? 'bg-[#00FF87] text-black font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={activeData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="adminVolumeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00FF87" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#00FF87" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#18211C" vertical={false} />
            <XAxis dataKey="period" stroke="#6B7280" tick={{ fontSize: 11 }} />
            <YAxis stroke="#6B7280" tick={{ fontSize: 11 }} tickFormatter={formatINR} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="volume"
              name="Gross Donated"
              stroke="#00FF87"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#adminVolumeGrad)"
            />
            <Line
              type="monotone"
              dataKey="verified"
              name="Officially Verified"
              stroke="#A855F7"
              strokeWidth={2}
              dot={{ r: 3, fill: '#A855F7' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// 4. Admin Fund Allocation Donut/Bar Chart
export const AdminFundAllocationChart: React.FC = () => {
  const data = [
    { name: 'Education', value: 412000, color: '#38BDF8' },
    { name: 'Healthcare', value: 220000, color: '#A855F7' },
    { name: 'Food relief', value: 500000, color: '#FBBF24' },
    { name: 'Infrastructure', value: 350000, color: '#34D399' },
    { name: 'Emergency relief', value: 248500, color: '#00FF87' },
    { name: 'Operations', value: 45000, color: '#F43F5E' },
  ];

  return (
    <div className="w-full h-64 flex flex-col md:flex-row items-center justify-center">
      <div className="w-48 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={data}
              innerRadius={50}
              outerRadius={75}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#0D110F" strokeWidth={2} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs font-mono-code ml-0 md:ml-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-neutral-300 font-sans truncate">{item.name}</span>
            <span className="text-white font-bold ml-auto">{formatINR(item.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 5. Admin Campaign Performance Horizontal Bar Chart (Goal, Raised, Spent, Remaining)
export const AdminCampaignPerformanceChart: React.FC = () => {
  const data = [
    { name: 'Student Emergency', Goal: 300000, Raised: 248500, Spent: 182300, Remaining: 66200 },
    { name: 'Community Library', Goal: 450000, Raised: 412000, Spent: 295000, Remaining: 117000 },
    { name: 'Flood Relief Prep', Goal: 500000, Raised: 500000, Spent: 468000, Remaining: 32000 },
    { name: 'Rural Digital Lab', Goal: 350000, Raised: 120000, Spent: 45000, Remaining: 75000 },
  ];

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#18211C" horizontal={false} />
          <XAxis type="number" stroke="#6B7280" tickFormatter={formatINR} tick={{ fontSize: 11 }} />
          <YAxis dataKey="name" type="category" stroke="#9CA3AF" tick={{ fontSize: 11 }} width={120} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '11px', fontFamily: 'JetBrains Mono' }}
            iconType="circle"
          />
          <Bar dataKey="Goal" fill="#374151" radius={[0, 4, 4, 0]} />
          <Bar dataKey="Raised" fill="#00FF87" radius={[0, 4, 4, 0]} />
          <Bar dataKey="Spent" fill="#F43F5E" radius={[0, 4, 4, 0]} />
          <Bar dataKey="Remaining" fill="#38BDF8" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// 6. Admin Expense Trend Chart (Monthly Spending Trend)
export const AdminExpenseTrendChart: React.FC = () => {
  const data = [
    { month: 'Jun', spending: 65000, receipts: 14 },
    { month: 'Jul', spending: 112000, receipts: 22 },
    { month: 'Aug', spending: 148000, receipts: 29 },
    { month: 'Sep', spending: 195000, receipts: 34 },
    { month: 'Oct', spending: 182300, receipts: 23 },
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#18211C" vertical={false} />
          <XAxis dataKey="month" stroke="#6B7280" tick={{ fontSize: 11 }} />
          <YAxis stroke="#6B7280" tick={{ fontSize: 11 }} tickFormatter={formatINR} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="spending" name="Verified Spending" fill="#A855F7" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// 7. Campaign Specific Funding & Expense Charts
export const CampaignFundingProgressChart: React.FC<{ goal: number; raised: number; spent: number }> = ({
  goal,
  raised,
  spent,
}) => {
  const data = [
    { name: 'Aug', raised: Math.round(raised * 0.25), spent: Math.round(spent * 0.15) },
    { name: 'Sep', raised: Math.round(raised * 0.65), spent: Math.round(spent * 0.45) },
    { name: 'Oct', raised: raised, spent: spent },
  ];

  return (
    <div className="w-full h-56">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
          <defs>
            <linearGradient id="campRaisedGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00FF87" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#00FF87" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#18211C" vertical={false} />
          <XAxis dataKey="name" stroke="#6B7280" tick={{ fontSize: 11 }} />
          <YAxis stroke="#6B7280" tick={{ fontSize: 11 }} tickFormatter={formatINR} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="raised" name="Raised" stroke="#00FF87" strokeWidth={2} fill="url(#campRaisedGrad)" />
          <Line type="monotone" dataKey="spent" name="Spent" stroke="#F43F5E" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const CampaignCategoryExpenseChart: React.FC = () => {
  const data = [
    { category: 'Medical', amount: 48000, fill: '#A855F7' },
    { category: 'Education', amount: 32000, fill: '#38BDF8' },
    { category: 'Equipment', amount: 24500, fill: '#00FF87' },
    { category: 'Transport', amount: 18500, fill: '#FBBF24' },
    { category: 'Food', amount: 12000, fill: '#34D399' },
  ];

  return (
    <div className="w-full h-56">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 10, left: 15, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#18211C" horizontal={false} />
          <XAxis type="number" stroke="#6B7280" tickFormatter={formatINR} tick={{ fontSize: 11 }} />
          <YAxis dataKey="category" type="category" stroke="#9CA3AF" tick={{ fontSize: 11 }} width={75} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="amount" name="Disbursed" fill="#00FF87" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
