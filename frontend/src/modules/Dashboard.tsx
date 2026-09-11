import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { PIPELINE_DATA, REVENUE_DATA, MOCK_LEADS } from '../data/mockDb';
import { TrendingUp, Users, Home, DollarSign } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend }: any) => (
  <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors shadow-lg">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-muted text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-white">{value}</h3>
      </div>
      <div className="p-3 bg-white/5 rounded-xl text-primary">
        <Icon className="w-6 h-6" />
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2 text-sm">
      <span className="text-accent flex items-center gap-1 font-medium bg-accent/10 px-2 py-0.5 rounded-full">
        <TrendingUp className="w-3 h-3" /> {trend}
      </span>
      <span className="text-muted">vs last month</span>
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  const totalLeads = MOCK_LEADS.length * 120; // scale up for demo
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Overview</h1>
          <p className="text-muted">Welcome back. Here's what's happening today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Leads" value={totalLeads} icon={Users} trend="+12.5%" />
        <StatCard title="Active Properties" value="42" icon={Home} trend="+4.1%" />
        <StatCard title="Revenue (YTD)" value="$2.4M" icon={DollarSign} trend="+22.4%" />
        <StatCard title="Conversion Rate" value="14.2%" icon={TrendingUp} trend="+1.2%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-lg">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white">Revenue Forecast</h3>
            <p className="text-sm text-muted">Monthly projected revenue</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                <CartesianGrid strokeDasharray="3 3" stroke="#2E3A59" vertical={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A2235', borderColor: '#2E3A59', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#3B82F6' }}
                  formatter={(val: any) => [`$${val.toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white">Sales Pipeline</h3>
            <p className="text-sm text-muted">Current lead stages</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PIPELINE_DATA} layout="vertical" margin={{ top: 0, right: 0, left: 20, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: '#2E3A59', opacity: 0.4}}
                  contentStyle={{ backgroundColor: '#1A2235', borderColor: '#2E3A59', borderRadius: '12px', color: '#fff' }}
                />
                <Bar dataKey="value" fill="#6366F1" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
