
import React, { useState } from 'react';
import { ALL_MOCK_USERS } from '../../../constants';
import { User, UserRiskScore, UserTag } from '../../../types';
import { ShieldExclamationIcon } from '../../../components/icons/ShieldExclamationIcon';
import StatCard from '../../../components/admin/StatCard';
import { UserGroupIcon } from '../../../components/icons/UserGroupIcon';


const SmartUserManagementPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
     const [users] = useState<User[]>(ALL_MOCK_USERS);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

    const tabs = [
        { id: 'dashboard', label: 'لوحة الإدارة المتقدمة' },
        { id: 'patterns', label: 'التعرف على الأنماط' },
        { id: 'bulk-actions', label: 'الإدارة الجماعية' },
        { id: 'analytics', label: 'تحليل المستخدمين' },
    ];

    const handleSelectUser = (id: string, checked: boolean) => {
        if (checked) {
            setSelectedUsers(prev => [...prev, id]);
        } else {
            setSelectedUsers(prev => prev.filter(userId => userId !== id));
        }
    };

    const getTagColor = (tag: UserTag) => {
        switch (tag) {
            case 'مستخدم جديد': return 'bg-blue-100 text-blue-800';
            case 'مستخدم متميز': return 'bg-green-100 text-green-800';
            case 'في خطر': return 'bg-red-100 text-red-800';
        }
    };
    
    const getRiskColor = (risk: UserRiskScore) => {
        switch (risk) {
            case 'منخفض': return 'text-green-600';
            case 'متوسط': return 'text-yellow-600';
            case 'مرتفع': return 'text-red-600';
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">نظام إدارة المستخدمين الذكي</h1>
                <p className="text-gray-500 mt-1">أدوات متقدمة لتحليل وإدارة سلوك المستخدمين بفعالية.</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-2">
                <nav className="flex space-x-4 space-x-reverse overflow-x-auto" aria-label="Tabs">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 font-medium text-sm rounded-md transition-colors whitespace-nowrap ${activeTab === tab.id ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                           {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

             {/* Content for each tab */}
            <div className="bg-white rounded-lg shadow-md p-6">
                 {activeTab === 'dashboard' && (
                     <div>
                         <h3 className="font-bold text-lg mb-4">جدول المستخدمين التفاعلي</h3>
                          <div className="overflow-x-auto border rounded-md">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-right"><input type="checkbox" /></th>
                                        <th className="px-4 py-2 text-right">المستخدم</th>
                                        <th className="px-4 py-2 text-right">التصنيفات</th>
                                        <th className="px-4 py-2 text-right">تصنيف المخاطر</th>
                                        <th className="px-4 py-2 text-right">آخر نشاط</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map(user => (
                                        <tr key={user.id}>
                                            <td className="px-4 py-3"><input type="checkbox" onChange={e => handleSelectUser(user.id, e.target.checked)} checked={selectedUsers.includes(user.id)} /></td>
                                            <td className="px-4 py-3 font-medium">{user.name}</td>
                                            <td className="px-4 py-3 space-x-1 space-x-reverse">
                                                {user.tags?.map(tag => <span key={tag} className={`px-2 py-1 text-xs font-semibold rounded-full ${getTagColor(tag)}`}>{tag}</span>)}
                                            </td>
                                            <td className={`px-4 py-3 font-bold ${getRiskColor(user.riskScore || 'منخفض')}`}>
                                                <div className="flex items-center">
                                                    {user.riskScore === 'مرتفع' && <ShieldExclamationIcon className="w-4 h-4 ml-1 text-red-500" />}
                                                    {user.riskScore || 'منخفض'}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">{user.lastActivity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                         </div>
                     </div>
                 )}
                  {activeTab === 'patterns' && (
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                             <h3 className="font-bold text-lg mb-4">تنبيهات الأنشطة المشبوهة</h3>
                             <div className="space-y-3">
                                <div className="p-3 bg-red-50 border-r-4 border-red-500 rounded-md">
                                    <p className="text-sm font-semibold text-red-800">محاولات تسجيل دخول فاشلة (5) للمستخدم <span className="font-bold">سامي مراد</span>.</p>
                                    <p className="text-xs text-red-600">منذ 10 دقائق - IP: 123.45.67.89</p>
                                </div>
                             </div>
                        </div>
                        <div>
                             <h3 className="font-bold text-lg mb-4">تصنيف المخاطر للمستخدمين</h3>
                             <div className="p-4 border rounded-md text-sm">
                               <p><span className="font-bold">سامي مراد</span> - مرتفع (محاولات دخول فاشلة)</p>
                               <p><span className="font-bold">ليلى حسن</span> - متوسط (حساب جديد من دولة غير معتادة)</p>
                             </div>
                        </div>
                     </div>
                  )}
                  {activeTab === 'bulk-actions' && (
                       <div>
                         <h3 className="font-bold text-lg mb-4">إجراءات جماعية ذكية</h3>
                         <div className="p-4 border rounded-md flex items-center space-x-4 space-x-reverse">
                            <span className="font-semibold">{selectedUsers.length} مستخدم محدد</span>
                            <button className="px-3 py-1 bg-red-600 text-white rounded-md text-sm" disabled={selectedUsers.length === 0}>تعليق الحسابات</button>
                            <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm" disabled={selectedUsers.length === 0}>إرسال رسالة</button>
                         </div>
                       </div>
                  )}
                  {activeTab === 'analytics' && (
                    <div className="space-y-8">
                         <h3 className="font-bold text-lg">تحليل دورة حياة المستخدم</h3>
                         {/* Funnel Chart Simulation */}
                         <div className="flex justify-center items-end space-x-2 space-x-reverse text-center text-xs font-semibold">
                            <div className="w-40"><p className="bg-blue-500 text-white p-2">المسجلون (100%)</p></div>
                            <div className="w-32"><p className="bg-blue-400 text-white p-2 h-20 flex items-center justify-center">أول دورة (80%)</p></div>
                            <div className="w-24"><p className="bg-blue-300 text-white p-2 h-16 flex items-center justify-center">إكمال دورة (60%)</p></div>
                         </div>
                         <h3 className="font-bold text-lg">مؤشرات الأداء الرئيسية</h3>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatCard icon={<UserGroupIcon className="w-6 h-6 text-white"/>} label="معدل الاحتفاظ (شهري)" value="95%" change={1.2} colorClass="bg-green-500" />
                            <StatCard icon={<UserGroupIcon className="w-6 h-6 text-white"/>} label="معدل التسرب (شهري)" value="5%" change={-0.5} colorClass="bg-red-500" />
                         </div>
                    </div>
                  )}
            </div>
        </div>
    );
};

export default SmartUserManagementPage;
