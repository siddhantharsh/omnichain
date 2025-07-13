import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value }) => (
  <div className="bg-white shadow-sm rounded-2xl p-4 flex flex-col items-center justify-center min-w-[140px]">
    <div className="text-wmt-gray-500 text-sm mb-1">{title}</div>
    <div className="text-2xl font-semibold text-wmt-dark">{value}</div>
  </div>
);

export default StatsCard;
