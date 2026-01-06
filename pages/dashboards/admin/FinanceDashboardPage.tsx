
import React, { useState } from 'react';
import StatCard from '../../../components/admin/StatCard';
import LiveLineChart from '../../../components/admin/LiveLineChart';
// FIX: Import missing constants and types.
import { MOCK_TRANSACTIONS } from '../../../constants';
import { TransactionStatus } from '../../../types';
import { CurrencyDollarIcon } from '../../../components/icons/CurrencyDollarIcon';
import { ChartPieIcon } from '../../../components/icons/ChartPieIcon';
import { BanknotesIcon } from '../../../components/icons/BanknotesIcon';
import { ArrowTrendingUpIcon } from '../../../components/icons/ArrowTrendingUpIcon';
import { ArrowTrendingDownIcon } from '../../../components/icons/ArrowTrendingDownIcon';
import { UserGroupIcon } from '../../../components/icons/UserGroupIcon';

const getTransactionStatusBadge = (status: TransactionStatus) => {
    switch (status) {
        case 'Completed': return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">مكتمل</span>;
        case 'Pending': return <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 rounded-full">معلق</span>;
        case 'Failed': return <span className="px-2 py-1 text-xs font-semibold text-orange-800 bg-orange-100 rounded-full">فشل</span>;
        case 'Refunded': return <span className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">مسترد</span>;
        case 'Suspicious': return <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">مشبوه</span>;
    }
};

const FinanceDashboardPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const tabs = [
        { id: 'dashboard', label: 'لوحة المعلومات المالية' },
        { id: 'payments', label: 'إدارة المدفوعات' },
        { id: 'subscriptions', label: 'إدارة الاشتراكات' },
        { id: 'reports', label: 'التقارير المالية' },
    ];
    
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">لوحة التحكم المالية</h1>
                <p className="text-gray-500 mt-1">نظرة شاملة على الأداء المالي للمنصة.</p>
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
            <div>
                {activeTab === 'dashboard' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                            <StatCard icon={<CurrencyDollarIcon className="w-6 h-6 text-white"/>} label="إجمالي الإيرادات" value="$125,340" change={5.2} colorClass="bg-green-500" changePeriod="عن الشهر الماضي" />
                            <StatCard icon={<ArrowTrendingDownIcon className="w-6 h-6 text-white"/>} label="إجمالي المصروفات" value="$34,110" change={-2.1} colorClass="bg-red-500" changePeriod="عن الشهر الماضي" />
                            <StatCard icon={<ChartPieIcon className="w-6 h-6 text-white"/>} label="صافي الربح" value="$91,230" change={8.9} colorClass="bg-blue-500" changePeriod="عن الشهر الماضي" />
                            <StatCard icon={<BanknotesIcon className="w-6 h-6 text-white"/>} label="التدفق النقدي" value="$15,890" change={12.5} colorClass="bg-yellow-500" changePeriod="عن الشهر الماضي" />
                        </div>
                         <div className="bg-white p-6 rounded-lg shadow-md">
                            <LiveLineChart title="تحليل التدفق النقدي في الوقت الحقيقي" color="#3b82f6" />
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <h3 className="font-bold text-lg">تنبؤات الإيرادات (ML)</h3>
                            <p className="text-gray-600">من المتوقع أن تصل الإيرادات الشهر القادم إلى <span className="font-bold text-green-600 text-xl">$140,000</span>.</p>
                        </div>
                    </div>
                )}
                {activeTab === 'payments' && (
                     <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="font-bold text-lg mb-4">لوحة المعاملات الشاملة</h3>
                        <div className="overflow-x-auto border rounded-md">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50"><tr>
                                    <th className="px-4 py-2 text-right">المستخدم</th>
                                    <th className="px-4 py-2 text-right">المبلغ</th>
                                    <th className="px-4 py-2 text-right">الحالة</th>
                                    <th className="px-4 py-2 text-right">التاريخ</th>
                                    <th className="px-4 py-2 text-right">الإجراءات</th>
                                </tr></thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {MOCK_TRANSACTIONS.map(tx => (
                                        <tr key={tx.id} className={tx.status === 'Suspicious' ? 'bg-red-50' : ''}>
                                            <td className="px-4 py-3">{tx.user.name}</td>
                                            <td className="px-4 py-3 font-semibold">${tx.amount.toFixed(2)}</td>
                                            <td className="px-4 py-3">{getTransactionStatusBadge(tx.status)}</td>
                                            <td className="px-4 py-3">{tx.date}</td>
                                            <td className="px-4 py-3">
                                                <button className="text-primary-600 hover:underline">تفاصيل</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {activeTab === 'subscriptions' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                             <StatCard icon={<UserGroupIcon className="w-6 h-6 text-white"/>} label="المشتركون الجدد (شهري)" value="152" change={10} colorClass="bg-blue-500" />
                             <StatCard icon={<ArrowTrendingDownIcon className="w-6 h-6 text-white"/>} label="معدل التسرب (Churn)" value="3.1%" change={-0.5} colorClass="bg-red-500" />
                             <StatCard icon={<ArrowTrendingUpIcon className="w-6 h-6 text-white"/>} label="متوسط قيمة العميل (LTV)" value="$300" change={2} colorClass="bg-green-500" />
                        </div>
                         <div className="bg-white p-6 rounded-lg shadow-md">
                             <h3 className="font-bold text-lg mb-2">تحليل قيمة العميل (LTV)</h3>
                             <p className="text-sm text-gray-600">المستخدمون على الخطة <span className="font-bold">الاحترافية</span> لديهم LTV أعلى بنسبة 150% من مستخدمي الخطة الأساسية.</p>
                        </div>
                    </div>
                )}
                {activeTab === 'reports' && (
                    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
                        <div>
                            <h3 className="font-bold text-lg mb-4">منشئ التقارير المالية</h3>
                            <div className="p-4 border rounded-md grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium">نوع التقرير</label>
                                    <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                                        <option>تقرير الإيرادات</option>
                                        <option>تقرير المصروفات</option>
                                        <option>تقرير الربح والخسارة</option>
                                    </select>
                                </div>
                                 <div>
                                    <label className="block text-sm font-medium">الفترة الزمنية</label>
                                    <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                                        <option>آخر 30 يومًا</option>
                                        <option>آخر 90 يومًا</option>
                                        <option>هذا العام</option>
                                    </select>
                                </div>
                                <div>
                                   <button className="w-full bg-primary-600 text-white font-bold py-2 px-4 rounded-md hover:bg-primary-700">توليد التقرير</button>
                                </div>
                            </div>
                        </div>
                         <div>
                            <h3 className="font-bold text-lg mb-4">التقارير الجاهزة</h3>
                            <div className="flex space-x-4 space-x-reverse">
                                 <button className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300">تصدير تقرير الضرائب</button>
                                 <button className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300">تصدير تحليل الربحية</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FinanceDashboardPage;
