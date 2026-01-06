
import React, { useState } from 'react';
// FIX: Import missing constants.
import { MOCK_CAMPAIGNS, MOCK_SURVEYS, MOCK_FEEDBACK } from '../../../constants';
import StatCard from '../../../components/admin/StatCard';
import { BellIcon } from '../../../components/icons/BellIcon';
import { PaperAirplaneIcon } from '../../../components/icons/PaperAirplaneIcon';
import { StarIcon } from '../../../components/icons/StarIcon';
import { UserGroupIcon } from '../../../components/icons/UserGroupIcon';

const CommunicationDashboardPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('notifications');
    const survey = MOCK_SURVEYS[0];

    const tabs = [
        { id: 'notifications', label: 'إدارة الإشعارات' },
        { id: 'campaigns', label: 'المراسلة الجماعية' },
        { id: 'surveys', label: 'الاستطلاعات والبلاغات' },
        { id: 'analytics', label: 'تحليل التواصل' },
    ];

    const totalVotes = survey.results.reduce((sum, item) => sum + item.count, 0);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">لوحة إدارة التواصل</h1>
                <p className="text-gray-500 mt-1">إدارة الإشعارات والحملات والتفاعل مع المستخدمين.</p>
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
                {activeTab === 'notifications' && (
                    <div className="space-y-6">
                        <div>
                             <h3 className="font-bold text-lg mb-4">إرسال إشعار جديد</h3>
                             <div className="p-4 border rounded-md space-y-4">
                                <textarea className="w-full p-2 border rounded-md" placeholder="محتوى الإشعار..."></textarea>
                                 <div className="flex items-center justify-between">
                                    <select className="border-gray-300 rounded-md text-sm"><option>تقسيم الجمهور: كل المستخدمين</option><option>الطلاب غير النشطين</option></select>
                                    <button className="bg-primary-600 text-white font-bold py-2 px-4 rounded-md">إرسال الآن</button>
                                </div>
                             </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-4">تحليل أداء الإشعارات</h3>
                            {/* Table here */}
                            <div className="overflow-x-auto border rounded-md text-sm">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50"><tr><th className="px-4 py-2 text-right">الإشعار</th><th className="px-4 py-2 text-right">معدل الفتح</th></tr></thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr><td className="px-4 py-3">"تم إضافة دورة جديدة!"</td><td className="px-4 py-3">35%</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'campaigns' && (
                    <div className="space-y-6">
                        <h3 className="font-bold text-lg mb-4">أداء الحملات</h3>
                        <div className="overflow-x-auto border rounded-md text-sm">
                             <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50"><tr><th className="px-4 py-2 text-right">الحملة</th><th className="px-4 py-2 text-right">الحالة</th><th className="px-4 py-2 text-right">معدل الفتح</th></tr></thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {MOCK_CAMPAIGNS.map(c => (
                                         <tr key={c.id}><td className="px-4 py-3">{c.title}</td><td className="px-4 py-3">{c.status}</td><td className="px-4 py-3">{c.openRate > 0 ? `${c.openRate}%` : '-'}</td></tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {activeTab === 'surveys' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                         <div>
                            <h3 className="font-bold text-lg mb-4">{survey.title} ({survey.responses} رد)</h3>
                            <div className="space-y-3">
                                {survey.results.map(res => {
                                    const percentage = totalVotes > 0 ? ((res.count / totalVotes) * 100).toFixed(1) : 0;
                                    return (
                                        <div key={res.option}>
                                            <div className="flex justify-between text-sm"><span className="font-medium">{res.option}</span><span>{res.count}</span></div>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-blue-500 h-2.5 rounded-full" style={{width: `${percentage}%`}}></div></div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-4">لوحة التغذية الراجعة</h3>
                            <div className="space-y-3">
                                {MOCK_FEEDBACK.map(fb => (
                                     <div key={fb.id} className="p-3 bg-gray-50 rounded-md border-r-4 border-yellow-400">
                                         <p className="text-sm text-gray-800">{fb.content}</p>
                                         <p className="text-xs text-gray-500 mt-1">من: {fb.user.name} - {fb.date}</p>
                                     </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                 {activeTab === 'analytics' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <StatCard icon={<BellIcon className="w-6 h-6 text-white"/>} label="متوسط فتح الإشعارات" value="38%" change={1.5} colorClass="bg-blue-500" />
                            <StatCard icon={<PaperAirplaneIcon className="w-6 h-6 text-white"/>} label="معدل النقر للحملات" value="4.2%" change={-0.2} colorClass="bg-red-500" />
                            <StatCard icon={<StarIcon className="w-6 h-6 text-white"/>} label="متوسط رضا المستخدمين" value="4.5/5" change={0.1} colorClass="bg-green-500" />
                        </div>
                        <div className="p-4 bg-green-50 text-green-800 border-l-4 border-green-500 rounded-md">
                            <h4 className="font-bold">توصية</h4>
                            <p className="text-sm">معدلات فتح الإشعارات أعلى بنسبة 15% في المساء. جرب جدولة الإشعارات الهامة بعد الساعة 6 مساءً.</p>
                        </div>
                    </div>
                 )}
            </div>
        </div>
    );
};

export default CommunicationDashboardPage;
