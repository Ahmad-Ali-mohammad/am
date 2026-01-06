
import React, { useState, useEffect } from 'react';

interface GaugeProps {
  label: string;
  unit: string;
  color: string;
}

const Gauge: React.FC<GaugeProps> = ({ label, unit, color }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setValue(Math.floor(Math.random() * 101));
    }, 2500 + Math.random() * 1000);
    return () => clearInterval(interval);
  }, []);
  
  const percentage = value / 100;
  const strokeWidth = 10;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - percentage * circumference;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md text-center flex flex-col items-center justify-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full" viewBox="0 0 120 120">
          <circle
            className="text-gray-200"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
          />
          <circle
            style={{ stroke: color }}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transform -rotate-90 origin-center transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-gray-800">{value}</span>
            <span className="text-lg text-gray-500 -mb-4">{unit}</span>
        </div>
      </div>
      <p className="mt-3 text-lg font-semibold text-gray-700">{label}</p>
    </div>
  );
};

export default Gauge;
