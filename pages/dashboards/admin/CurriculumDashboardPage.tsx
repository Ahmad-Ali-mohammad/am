
import React, { useState } from 'react';
// FIX: Import MOCK_USERS to use it for collaboration section avatars.
// FIX: Import missing constants
import { MOCK_CURRICULA, MOCK_LEARNING_PATHS, MOCK_USERS } from '../../../constants';
import StatCard from '../../../components/admin/StatCard';
import { BookOpenIcon } from '../../../components/icons/BookOpenIcon';
import { UserCircleIcon } from '../../../components/icons/UserCircleIcon';
import { EyeIcon } from '../../../components/icons/EyeIcon';

const CurriculumDashboardPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('curriculum-editor');
    const curriculum = MOCK_CURRICULA[0];

    const tabs = [
        { id: 'curriculum-editor', label: 'محرر المناهج المرئي' },
        { id: 'adaptive-learning', label: 'نظام التكيف التعليمي' },
        { id: 'curriculum-analytics', label: 'تحليل المناهج' },
        { id: 'collaboration', label: 'أدوات التطوير الجماعي' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">لوحة تخصيص المناهج</h1>
                <p className="text-gray-500 mt-1">أدوات متقدمة لبناء، تكييف، وتحليل المناهج التعليمية.</p>
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
                 {activeTab === 'curriculum-editor' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1 border-l border-gray-200 pl-6">
                            <h3 className="font-bold text-lg mb-4">مكونات المنهج</h3>
                            <div className="space-y-2">
                                <div className="p-3 border rounded-md cursor-grab active:cursor-grabbing bg-blue-50">الوحدة الدراسية</div>
                                <div className="p-3 border rounded-md cursor-grab active:cursor-grabbing bg-green-50">درس</div>
                                <div className="p-3 border rounded-md cursor-grab active:cursor-grabbing bg-yellow-50">اختبار</div>
                                <div className="p-3 border rounded-md cursor-grab active:cursor-grabbing bg-purple-50">مشروع</div>
                            </div>
                        </div>
                        <div className="lg:col-span-2">
                            <h3 className="font-bold text-lg mb-4">{curriculum.title} (v{curriculum.version})</h3>
                            <div className="p-4 border-2 border-dashed rounded-lg min-h-[400px] space-y-4 bg-gray-50">
                                {curriculum.modules.map(mod => (
                                    <div key={mod.id} className="p-4 bg-white border rounded-md shadow-sm">
                                        <h4 className="font-bold">{mod.title}</h4>
                                        <div className="mt-2 space-y-2 pr-4">
                                            {mod.lessons.map(les => <div key={les.id} className="p-2 bg-gray-100 rounded-md text-sm">{les.title}</div>)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                             <div className="mt-4 flex space-x-2 space-x-reverse">
                                <button className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md text-sm">معاينة كطالب</button>
                                <button className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md text-sm">اختبار الاتساق</button>
                                <button className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md text-sm">سجل الإصدارات</button>
                            </div>
                        </div>
                    </div>
                 )}
                 {activeTab === 'adaptive-learning' && (
                     <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-4 border rounded-md">
                                <h4 className="font-bold mb-2">المسار الأساسي</h4>
                                <p className="text-sm text-gray-500">الوحدة 1 &rarr; الوحدة 2 &rarr; مشروع أساسي</p>
                            </div>
                             <div className="p-4 border rounded-md bg-green-50 border-green-200">
                                <h4 className="font-bold text-green-800 mb-2">المسار المتقدم</h4>
                                <p className="text-sm text-green-700">الوحدة 1 &rarr; درس إضافي &rarr; الوحدة 2 &rarr; مشروع متقدم</p>
                            </div>
                        </div>
                        <div>
                             <h3 className="font-bold text-lg mb-4">تحليل أداء الطلاب</h3>
                             <div className="overflow-x-auto border rounded-md">
                                 <table className="min-w-full divide-y divide-gray-200 text-sm">
                                    <thead className="bg-gray-50"><tr><th className="px-4 py-2 text-right">الطالب</th><th className="px-4 py-2 text-right">القدرة</th><th className="px-4 py-2 text-right">المسار الحالي</th><th className="px-4 py-2 text-right">الفعالية</th></tr></thead>
                                    <tbody>
                                        {MOCK_LEARNING_PATHS.map(lp => (
                                            <tr key={lp.id}>
                                                <td className="px-4 py-3">{lp.studentName}</td>
                                                <td className="px-4 py-3">{lp.studentAbility}</td>
                                                <td className="px-4 py-3">{lp.currentPath}</td>
                                                <td className="px-4 py-3">{lp.effectiveness}%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                 </table>
                             </div>
                        </div>
                     </div>
                 )}
                 {activeTab === 'curriculum-analytics' && (
                      <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatCard icon={<UserCircleIcon className="w-6 h-6 text-white"/>} label="متوسط وقت الإكمال" value="8.5 ساعات" change={-5} colorClass="bg-blue-500" />
                            <StatCard icon={<UserCircleIcon className="w-6 h-6 text-white"/>} label="معدل النجاح بالاختبارات" value="88%" change={2} colorClass="bg-green-500" />
                            <StatCard icon={<EyeIcon className="w-6 h-6 text-white"/>} label="معدل التفاعل" value="95%" change={1.2} colorClass="bg-yellow-500" />
                        </div>
                         <div>
                            <h3 className="font-bold text-lg mb-4">معدل إكمال الوحدات (اكتشاف نقاط الضعف)</h3>
                             <div className="space-y-2">
                                 <div className="w-full bg-gray-200 rounded-full h-4"><div className="bg-green-500 h-4 rounded-full text-right px-2 text-xs text-white" style={{width: '95%'}}>الوحدة 1</div></div>
                                 <div className="w-full bg-gray-200 rounded-full h-4"><div className="bg-red-500 h-4 rounded-full text-right px-2 text-xs text-white" style={{width: '60%'}}>الوحدة 2</div></div>
                             </div>
                        </div>
                      </div>
                 )}
                 {activeTab === 'collaboration' && (
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-bold text-lg mb-4">فريق العمل لمنهج علوم الحاسب</h3>
                            <div className="flex -space-x-2 overflow-hidden mb-4">
                                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src={MOCK_USERS.admin.avatarUrl} alt=""/>
                                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src={MOCK_USERS.instructor.avatarUrl} alt=""/>
                                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src={MOCK_USERS.manager.avatarUrl} alt=""/>
                            </div>
                            <h3 className="font-bold text-lg mb-4">نظام المراجعة</h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-gray-50 border-r-4 border-blue-400">
                                    <p className="text-sm">"أقترح إضافة درس عن التعقيد الزمني والمكاني في الوحدة 2."</p>
                                    <p className="text-xs text-gray-500 mt-1">- فاطمة الزهراء</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-4">أدوات إضافية</h3>
                            <div className="space-y-3">
                                 <button className="w-full text-left p-3 border rounded-md hover:bg-gray-50">تصدير المنهج (SCORM, xAPI)</button>
                                 <button className="w-full text-left p-3 border rounded-md hover:bg-gray-50">استيراد منهج</button>
                            </div>
                        </div>
                     </div>
                 )}
            </div>
        </div>
    );
};

export default CurriculumDashboardPage;
