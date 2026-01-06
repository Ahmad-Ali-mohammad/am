
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_LIBRARY_RESOURCES } from '../../../constants';
import { ChevronDownIcon } from '../../../components/icons/ChevronDownIcon';
import { DocumentDuplicateIcon } from '../../../components/icons/DocumentDuplicateIcon';
import { ShieldCheckIcon } from '../../../components/icons/ShieldCheckIcon';
import { EyeIcon } from '../../../components/icons/EyeIcon';

const DigitalLibraryAdminPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const tabs = [
        { id: 'dashboard', label: 'لوحة الإدارة' },
        { id: 'copyright', label: 'إدارة حقوق النشر' },
        { id: 'processing', label: 'أدوات المعالجة' },
        { id: 'analytics', label: 'تحليلات المكتبة' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">نظام إدارة مكتبة المحتوى</h1>
                    <p className="text-gray-500 mt-1">إدارة شاملة لموارد المكتبة، التراخيص، والتحليلات.</p>
                </div>
                <Link to="/content-library" target="_blank" className="flex items-center bg-white text-primary-600 font-bold py-2 px-4 rounded-md border border-primary-500 hover:bg-primary-50">
                    <EyeIcon className="w-5 h-5 ml-2" />
                    عرض المكتبة للزوار
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-2">
                <nav className="flex space-x-4 space-x-reverse" aria-label="Tabs">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 font-medium text-sm rounded-md transition-colors ${activeTab === tab.id ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                           {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

             {/* Content for each tab */}
            <div className="bg-white rounded-lg shadow-md p-6">
                {activeTab === 'dashboard' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Classification Tree */}
                        <div className="lg:col-span-1 border-l border-gray-200 pl-6">
                            <h3 className="font-bold text-lg mb-4">تصنيفات المكتبة</h3>
                            {/* Tree component here */}
                            <div className="space-y-2">
                                <div className="p-2 rounded-md bg-gray-100">
                                    <p className="font-semibold">الكتب (150)</p>
                                </div>
                                 <div className="p-2 rounded-md hover:bg-gray-50">
                                    <p className="font-semibold">الأبحاث (80)</p>
                                </div>
                                <div className="p-2 rounded-md hover:bg-gray-50">
                                    <p className="font-semibold">المقالات (210)</p>
                                </div>
                            </div>
                        </div>
                        {/* File Management */}
                        <div className="lg:col-span-2">
                            <div className="flex justify-between items-center mb-4">
                               <h3 className="font-bold text-lg">إدارة الملفات</h3>
                               <button className="flex items-center text-sm bg-yellow-100 text-yellow-800 py-1 px-3 rounded-full hover:bg-yellow-200">
                                <DocumentDuplicateIcon className="w-4 h-4 ml-2"/>
                                اكتشاف التكرارات
                               </button>
                            </div>
                            <div className="overflow-x-auto border rounded-md">
                                <table className="min-w-full divide-y divide-gray-200 text-sm">
                                    <thead className="bg-gray-50"><tr><th className="px-4 py-2 text-right">العنوان</th><th className="px-4 py-2 text-right">النوع</th><th className="px-4 py-2 text-right">الإجراءات</th></tr></thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {MOCK_LIBRARY_RESOURCES.slice(0, 4).map(res => (
                                            <tr key={res.id}>
                                                <td className="px-4 py-3 font-medium">{res.title}</td>
                                                <td className="px-4 py-3">{res.type}</td>
                                                <td className="px-4 py-3"><button className="text-primary-600 hover:underline">معاينة</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
                 {activeTab === 'copyright' && (
                    <div>
                         <h3 className="font-bold text-lg mb-4">تتبع حقوق النشر والتراخيص</h3>
                         <div className="overflow-x-auto border rounded-md">
                                <table className="min-w-full divide-y divide-gray-200 text-sm">
                                    <thead className="bg-gray-50"><tr><th className="px-4 py-2 text-right">المورد</th><th className="px-4 py-2 text-right">نوع الترخيص</th><th className="px-4 py-2 text-right">تاريخ الانتهاء</th><th className="px-4 py-2 text-right">الحالة</th></tr></thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                       <tr className="bg-red-50"><td className="px-4 py-3">مقدمة في الخوارزميات</td><td className="px-4 py-3">ترخيص تعليمي</td><td className="px-4 py-3">2024-08-01</td><td className="px-4 py-3"><span className="font-bold text-red-600">منتهي الصلاحية</span></td></tr>
                                       <tr className="bg-yellow-50"><td className="px-4 py-3">ورقة بحثية: الانتباه</td><td className="px-4 py-3">استخدام عادل</td><td className="px-4 py-3">2024-09-15</td><td className="px-4 py-3"><span className="font-bold text-yellow-600">ينتهي قريبًا</span></td></tr>
                                       <tr><td className="px-4 py-3">التسويق 4.0</td><td className="px-4 py-3">شراء دائم</td><td className="px-4 py-3">-</td><td className="px-4 py-3"><span className="text-green-600">نشط</span></td></tr>
                                    </tbody>
                                </table>
                            </div>
                    </div>
                 )}
                 {activeTab === 'processing' && (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 border rounded-md">
                            <h4 className="font-bold mb-2">معالج تحويل الملفات</h4>
                            <p className="text-sm text-gray-500 mb-4">تحويل الملفات بشكل جماعي من صيغة لأخرى.</p>
                             <button className="w-full bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md hover:bg-gray-300 text-sm">بدء التحويل</button>
                        </div>
                         <div className="p-4 border rounded-md">
                            <h4 className="font-bold mb-2">إضافة البيانات الوصفية (Metadata)</h4>
                            <p className="text-sm text-gray-500 mb-4">تطبيق الوسوم والبيانات الوصفية على مجموعة ملفات.</p>
                             <button className="w-full bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md hover:bg-gray-300 text-sm">تعديل جماعي</button>
                        </div>
                        <div className="p-4 border rounded-md bg-blue-50 border-blue-200">
                             <h4 className="font-bold mb-2 text-blue-800">فحص الفيروسات</h4>
                             <p className="text-sm text-blue-700">آخر فحص: 2024-08-20. لا توجد تهديدات.</p>
                             <button className="mt-4 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 text-sm">إجراء فحص جديد</button>
                        </div>
                     </div>
                 )}
                 {activeTab === 'analytics' && (
                    <div>
                        <h3 className="font-bold text-lg mb-4">تحليلات استخدام المكتبة</h3>
                        <div className="p-4 bg-gray-50 rounded-md text-center text-sm text-gray-600">سيتم عرض رسوم بيانية وتقارير تفصيلية هنا.</div>
                    </div>
                 )}
            </div>
        </div>
    );
};

export default DigitalLibraryAdminPage;
