import React, { useState, useEffect, useMemo } from 'react';

// Icon Imports
import { UserGroupIcon } from '../../../components/icons/UserGroupIcon';
import { CurrencyDollarIcon } from '../../../components/icons/CurrencyDollarIcon';
import { SignalIcon } from '../../../components/icons/SignalIcon';
import { ClockIcon } from '../../../components/icons/ClockIcon';
import StatCard from '../../../components/admin/StatCard';
import LiveLineChart from '../../../components/admin/LiveLineChart';
import D3GeoHeatmap from '../../../components/admin/D3GeoHeatmap';
import { ALL_MOCK_USERS } from '../../../constants';
import { UserRole } from '../../../types';

const UserRolesChart: React.FC = () => {
    const roleCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        ALL_MOCK_USERS.forEach(user => {
            counts[user.role] = (counts[user.role] || 0) + 1;
        });
        return counts;
    }, []);

    const totalUsers = ALL_MOCK_USERS.length;
    const colors: Record<string, string> = {
      [UserRole.STUDENT]: 'bg-primary-500',
      [UserRole.INSTRUCTOR]: 'bg-green-500',
      [UserRole.ADMIN]: 'bg-red-500',
      [UserRole.CONTENT_MANAGER]: 'bg-yellow-500',
      [UserRole.VISITOR]: 'bg-gray-500'
    };
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <h3 className="font-bold text-lg mb-4 text-gray-800 border-b pb-2">توزيع المستخدمين حسب الأدوار</h3>
            <div className="space-y-4">
                {Object.entries(roleCounts).map(([role, count]) => {
                    // FIX: Explicitly cast `count` to a number to avoid potential type inference issues in the arithmetic operation.
                    const percentage = totalUsers > 0 ? ((Number(count) / totalUsers) * 100).toFixed(1) : "0";
                    return (
                        <div key={role}>
                            <div className="flex justify-between mb-1 text-sm font-semibold">
                                <span className="text-gray-700">{role}</span>
                                <span className="text-gray-500">{count} ({percentage}%)</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-3">
                                <div 
                                    className={`${colors[role] || 'bg-gray-400'} h-3 rounded-full transition-all duration-1000`} 
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


const OverviewPage: React.FC = () => {
  // Simulate real-time data
  const [liveData, setLiveData] = useState({
    totalUsers: 2530,
    revenue: 15750,
    activeSessions: 412,
    avgResponseTime: 120,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prevData => ({
        totalUsers: prevData.totalUsers + (Math.random() > 0.7 ? 1 : 0),
        revenue: prevData.revenue + Math.floor(Math.random() * 10),
        activeSessions: Math.max(100, prevData.activeSessions + Math.floor(Math.random() * 10) - 5),
        avgResponseTime: Math.max(50, prevData.avgResponseTime + Math.floor(Math.random() * 4) - 2),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
            <h1 className="text-3xl font-bold text-gray-800">لوحة المعلومات الرئيسية</h1>
            <p className="text-gray-500 mt-1 text-sm">متابعة الأداء العام للمنصة والنشاط المباشر.</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-lg border border-blue-100">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping ml-3"></div>
            <span className="text-sm font-bold">تحديث حي للبيانات</span>
        </div>
      </div>
      
      {/* KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard 
            icon={<UserGroupIcon className="w-6 h-6 text-white"/>} 
            label="إجمالي المستخدمين" 
            value={liveData.totalUsers.toLocaleString('ar-EG')}
            change={2.5}
            colorClass="bg-blue-500"
          />
          <StatCard 
            icon={<CurrencyDollarIcon className="w-6 h-6 text-white"/>} 
            label="الإيرادات (اليوم)" 
            value={`$${liveData.revenue.toLocaleString('ar-EG')}`}
            change={15.3}
            colorClass="bg-green-500"
          />
           <StatCard 
            icon={<SignalIcon className="w-6 h-6 text-white"/>} 
            label="الجلسات النشطة" 
            value={liveData.activeSessions.toLocaleString('ar-EG')}
            change={-1.8}
            colorClass="bg-yellow-500"
          />
           <StatCard 
            icon={<ClockIcon className="w-6 h-6 text-white"/>} 
            label="متوسط الاستجابة" 
            value={`${liveData.avgResponseTime}ms`}
            change={-5.2}
            colorClass="bg-red-500"
          />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <LiveLineChart title="الإيرادات المباشرة (آخر دقيقة)" color="#22c55e" />
          </div>
          <div>
            <UserRolesChart/>
          </div>
      </div>
       <div className="grid grid-cols-1 gap-6">
           <D3GeoHeatmap />
       </div>
    </div>
  );
};

export default OverviewPage;