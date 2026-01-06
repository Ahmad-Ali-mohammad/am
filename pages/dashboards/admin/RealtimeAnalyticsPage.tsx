
import React, { useState, useEffect } from 'react';
import { ALL_MOCK_USERS } from '../../../constants';
import { User } from '../../../types';

const LiveUserFeed: React.FC = () => {
    const [events, setEvents] = useState<string[]>([]);
    
    const sampleUsers = ALL_MOCK_USERS.map(u => u.name);
    const sampleActions = ['سجل الدخول', 'أكمل دورة "مقدمة في الذكاء الاصطناعي"', 'نشر سؤالاً جديداً', 'قام بالتسجيل كطالب جديد'];

    useEffect(() => {
        const interval = setInterval(() => {
            const user = sampleUsers[Math.floor(Math.random() * sampleUsers.length)];
            const action = sampleActions[Math.floor(Math.random() * sampleActions.length)];
            const newEvent = `${user} ${action}.`;
            setEvents(prev => [newEvent, ...prev.slice(0, 7)]);
        }, 3000 + Math.random() * 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">آخر أنشطة المستخدمين</h3>
            <div className="space-y-3">
                {events.map((event, index) => (
                    <p key={index} className="text-sm text-gray-600 p-3 bg-gray-50 rounded-md animate-fade-in">
                        <span className="font-mono text-gray-400 text-xs mr-2">[{new Date().toLocaleTimeString('ar-EG')}]</span>
                        {event}
                    </p>
                ))}
            </div>
        </div>
    );
};

const ActiveUsersTable: React.FC = () => {
    const [activeUsers] = useState<User[]>(ALL_MOCK_USERS.slice(0,5)); // Static for now

    return (
         <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">المستخدمون المتصلون حالياً (5)</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">المستخدم</th>
                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">الدور</th>
                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">آخر نشاط</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {activeUsers.map(user => (
                            <tr key={user.id}>
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <img className="h-8 w-8 rounded-full ml-3" src={user.avatarUrl} alt=""/>
                                        <span className="text-sm font-medium text-gray-900">{user.name}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">يتصفح /courses</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


const RealtimeAnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">التحليلات في الوقت الحقيقي</h1>
        <p className="text-gray-500 mt-1">مراقبة حية لنشاط المستخدمين على المنصة.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LiveUserFeed />
          <ActiveUsersTable />
      </div>
    </div>
  );
};

export default RealtimeAnalyticsPage;
