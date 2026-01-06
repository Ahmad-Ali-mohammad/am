
import React from 'react';
import { BuildingStorefrontIcon } from '../../../components/icons/BuildingStorefrontIcon';

const PartnersAdminPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">إدارة الشركاء والمعلنين</h1>
                <p className="text-gray-500 mt-1">إدارة العلاقات مع الشركاء الأكاديميين والتجاريين.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">قائمة الشركاء</h3>
                     <button className="bg-primary-600 text-white font-bold py-2 px-4 rounded-md">إضافة شريك جديد</button>
                </div>
                 <div className="overflow-x-auto border rounded-md">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50"><tr><th className="px-4 py-2 text-right">الشريك</th><th className="px-4 py-2 text-right">نوع الشراكة</th><th className="px-4 py-2 text-right">الحالة</th></tr></thead>
                        <tbody>
                            <tr>
                                <td className="px-4 py-3">جامعة الملك سعود</td>
                                <td className="px-4 py-3">أكاديمي</td>
                                <td className="px-4 py-3 text-green-600">نشط</td>
                            </tr>
                        </tbody>
                    </table>
                 </div>
            </div>
        </div>
    );
};

export default PartnersAdminPage;
