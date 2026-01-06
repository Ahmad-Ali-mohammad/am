
import React from 'react';
import { ChartBarSquareIcon } from '../../../components/icons/ChartBarSquareIcon';

const ReportsPage: React.FC = () => (
     <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <ChartBarSquareIcon className="w-16 h-16 mx-auto text-gray-300" />
        <h1 className="text-3xl font-bold text-gray-800 mt-4">مركز التقارير</h1>
        <p className="text-gray-500 mt-2 max-w-lg mx-auto">هنا يمكنك توليد وعرض تقارير شاملة عن أداء المنصة، بما في ذلك تسجيل الطلاب، إيرادات الدورات، وأداء المدربين.</p>
        <div className="mt-6">
            <button className="px-5 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-sm font-medium">
                توليد تقرير جديد
            </button>
        </div>
    </div>
);

export default ReportsPage;
