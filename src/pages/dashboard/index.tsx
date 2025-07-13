import React from 'react';
import StatsCard from '../../components/StatsCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Mock stats and CO2 savings data
const mockStats = {
  reroutePct: 28,
  co2Saved: 120,
  snapUsers: 54,
};
const mockCO2Data = [
  { date: 'Mon', co2: 10 },
  { date: 'Tue', co2: 18 },
  { date: 'Wed', co2: 22 },
  { date: 'Thu', co2: 30 },
  { date: 'Fri', co2: 25 },
  { date: 'Sat', co2: 20 },
  { date: 'Sun', co2: 15 },
];

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-wmt-gray-100 p-8">
      <header className="bg-wmt-blue text-white rounded-2xl p-6 mb-8">
        <h1 className="text-2xl font-semibold">Analytics Dashboard</h1>
      </header>
      <main className="max-w-3xl mx-auto space-y-8">
        <div className="flex gap-4 justify-center">
          <StatsCard title="Food Rerouted" value={mockStats.reroutePct + '%'} />
          <StatsCard title="CO₂ Saved (kg)" value={mockStats.co2Saved} />
          <StatsCard title="SNAP Users" value={mockStats.snapUsers} />
        </div>
        <div className="bg-white shadow-sm rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">CO₂ Savings Over Time</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={mockCO2Data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke="#333" />
              <YAxis stroke="#333" />
              <Tooltip />
              <Bar dataKey="co2" fill="#00cc66" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
