
import React, { useState, useEffect } from 'react';

const LiveLineChart: React.FC<{ title: string; initialData?: number[], color: string }> = ({ title, color }) => {
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    // Initialize with random data
    const initialData = Array.from({ length: 30 }, () => Math.floor(Math.random() * 80) + 20);
    setData(initialData);

    // Simulate WebSocket connection for real-time updates
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData.slice(1), Math.floor(Math.random() * 80) + 20];
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const width = 500;
  const height = 150;
  const maxVal = 120;
  
  const points = data
    .map((point, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - (point / maxVal) * height;
      return `${x},${y}`;
    })
    .join(' ');
    
  const firstPoint = points.split(' ')[0];
  const lastPoint = points.split(' ').pop();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
      <div className="relative">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" preserveAspectRatio="none">
          {/* Gradient */}
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.4} />
              <stop offset="100%" stopColor={color} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          {/* Area fill */}
          <polygon points={`0,${height} ${points} ${width},${height}`} fill={`url(#gradient-${color})`} />
          {/* Line */}
          <polyline fill="none" stroke={color} strokeWidth="3" points={points} />
        </svg>
      </div>
    </div>
  );
};

export default LiveLineChart;
