
import React from 'react';
import { ArrowUpIcon } from '../icons/ArrowUpIcon';
import { ArrowDownIcon } from '../icons/ArrowDownIcon';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change: number;
  changeType?: 'increase' | 'decrease';
  changePeriod?: string;
  colorClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, change, changePeriod = "عن الأمس", colorClass }) => {
  const isIncrease = change >= 0;

  return (
    <div className="bg-white p-5 rounded-lg shadow-md flex items-start">
      <div className={`p-3 rounded-full mr-4 ${colorClass}`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
        <div className="flex items-center text-sm mt-2">
          <span className={`flex items-center ${isIncrease ? 'text-green-500' : 'text-red-500'}`}>
            {isIncrease ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />}
            <span className="font-semibold mx-1">{Math.abs(change)}%</span>
          </span>
          <span className="text-gray-400">{changePeriod}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
