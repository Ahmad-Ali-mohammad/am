
import React, { useState } from 'react';
// FIX: Import missing constants and types.
import { MOCK_TALENTS, MOCK_INNOVATION_IDEAS } from '../../../constants';
import StatCard from '../../../components/admin/StatCard';
import { SparklesIcon } from '../../../components/icons/SparklesIcon';
import { TrophyIcon } from '../../../components/icons/TrophyIcon';
import { LightBulbIcon } from '../../../components/icons/LightBulbIcon';
import { AcademicCapIcon } from '../../../components/icons/AcademicCapIcon';
import { UserCircleIcon } from '../../../components/icons/UserCircleIcon';
import { InnovationIdea, InnovationStatus } from '../../../types';

const ExcellenceDashboardPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('indicators');
    const [ideas, setIdeas] = useState<InnovationIdea[]>(MOCK_INNOVATION_IDEAS);

    const tabs = [
        { id: 'indicators', label: 'مؤشرات التميز' },
        { id: 'innovation', label: 'إدارة الابتكار' },
        { id: 'development', label: 'أدوات التنمية' },
        { id: 'analytics', label: 'تحليل التميز' },
    ];

    const kanbanColumns: { id: InnovationStatus; title: string; color: string }[] = [
        { id: 'New', title: 'أفكار جديدة', color: 'bg-blue-100' },
        { id: 'Reviewing', title: 'قيد المراجعة', color: 'bg-yellow-100' },
        { id: 'Approved', title: 'مقبولة', color: 'bg-purple-100' },
        { id: 'Implemented', title: 'منفذة', color: 'bg-green-100' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">لوحة إدارة التميز</h1>
                <p className="text-gray-500 mt-1">اكتشاف ورعاية المواهب وتشجيع الابتكار في المنصة.</p>
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

            <div className="bg-white rounded-lg shadow-md p-6">
                {activeTab === 'indicators' && (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <StatCard icon={<TrophyIcon className="w-6 h-6 text-white"/>} label="المواهب المكتشفة" value={MOCK_TALENTS.length} change={10} colorClass="bg-yellow-500" />
                            <StatCard icon={<AcademicCapIcon className="w-6 h-6 text-white"/>} label="متوسط أداء المتميزين" value="97%" change={1.2} colorClass="bg-blue-500" />
                            <StatCard icon={<LightBulbIcon className="w-6 h-6 text-white"/>} label="نسبة تبني الابتكار" value="75%" change={5} colorClass="bg-purple-500" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-4">قاعة الشرف</h3>
                            <div className="overflow-x-auto border rounded-md">
                                 <table className="min-w-full divide-y divide-gray-200 text-sm">
                                    <thead className="bg-gray-50"><tr><th className="px-4 py-2 text-right">الموهبة</th><th className="px-4 py-2 text-right">درجة التميز</th><th className="px-4 py-2 text-right">الإنجاز الرئيسي</th><th className="px-4 py-2 text-right">الإجراء</th></tr></thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {MOCK_TALENTS.map(talent => (
                                            <tr key={talent.id}>
                                                <td className="px-4 py-3 font-medium flex items-center"><img src={talent.user.avatarUrl} className="w-8 h-8 rounded-full ml-3" />{talent.user.name}</td>
                                                <td className="px-4 py-3">{talent.excellenceScore}/100</td>
                                                <td className="px-4 py-3">{talent.keyAchievement}</td>
                                                <td className="px-4 py-3">
                                                    {talent.honored ? <span className="flex items-center text-green-600">تم تكريمه</span> : <button className="bg-yellow-400 text-yellow-900 font-semibold px-3 py-1 rounded-md text-xs hover:bg-yellow-500">تكريم</button>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                 </table>
                             </div>
                        </div>
                    </div>
                )}
                {activeTab === 'innovation' && (
                    <div className="overflow-x-auto p-2">
                        <div className="flex space-x-4 space-x-reverse min-w-max">
                            {kanbanColumns.map(col => (
                                <div key={col.id} className={`w-72 rounded-lg p-3 ${col.color}`}>
                                    <h3 className="font-bold mb-3">{col.title} ({ideas.filter(i => i.status === col.id).length})</h3>
                                    <div className="space-y-3">
                                        {ideas.filter(i => i.status === col.id).map(idea => (
                                            <div key={idea.id} className="bg-white p-3 rounded-md shadow-sm">
                                                <p className="font-semibold text-sm">{idea.title}</p>
                                                <p className="text-xs text-gray-500 mt-1">بواسطة: {idea.submittedBy}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {activeTab === 'development' && (
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-bold text-lg mb-4">خطط تنمية المواهب</h3>
                            <div className="space-y-3">
                                {MOCK_TALENTS.map(talent => (
                                    <div key={talent.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                        <div className="flex items-center">
                                            <img src={talent.user.avatarUrl} className="w-10 h-10 rounded-full ml-3"/>
                                            <span className="font-semibold">{talent.user.name}</span>
                                        </div>
                                        <button className="text-sm font-medium text-primary-600 hover:underline">إنشاء خطة تنمية</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                         <div>
                            <h3 className="font-bold text-lg mb-4">برنامج الإرشاد</h3>
                             <div className="p-4 border rounded-md">
                                 <h4 className="font-semibold mb-2">ربط موهبة بمرشد</h4>
                                 <div className="flex items-center space-x-4 space-x-reverse">
                                    <select className="flex-1 p-2 border rounded-md text-sm"><option>اختر موهبة...</option><option>{MOCK_TALENTS[0].user.name}</option></select>
                                    <select className="flex-1 p-2 border rounded-md text-sm"><option>اختر مرشدًا...</option><option>د. علي حسن</option></select>
                                    <button className="bg-primary-600 text-white font-bold py-2 px-4 rounded-md">ربط</button>
                                 </div>
                             </div>
                        </div>
                    </div>
                )}
                {activeTab === 'analytics' && (
                    <div className="space-y-8">
                        <div>
                            <h3 className="font-bold text-lg mb-4">أهم عوامل التميز</h3>
                            <div className="space-y-2">
                                 <div className="w-full bg-gray-200 rounded-full h-4"><div className="bg-blue-500 h-4 rounded-full text-right px-2 text-xs text-white" style={{width: '90%'}}>إكمال الدورات المتقدمة</div></div>
                                 <div className="w-full bg-gray-200 rounded-full h-4"><div className="bg-blue-400 h-4 rounded-full text-right px-2 text-xs text-white" style={{width: '75%'}}>المشاركة في المنتديات</div></div>
                                 <div className="w-full bg-gray-200 rounded-full h-4"><div className="bg-blue-300 h-4 rounded-full text-right px-2 text-xs text-white" style={{width: '60%'}}>الحصول على شهادات</div></div>
                             </div>
                        </div>
                         <div className="p-4 bg-green-50 text-green-800 border-l-4 border-green-500 rounded-md">
                            <h4 className="font-bold">توصية استراتيجية</h4>
                            <p className="text-sm">تشجيع الطلاب على المشاركة في المنتديات قد يرفع معدلات التميز بنسبة 15%. نقترح إطلاق مسابقة لأفضل مساهمة.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExcellenceDashboardPage;
