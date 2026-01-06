
import React from 'react';
import { ShieldExclamationIcon } from '../../../components/icons/ShieldExclamationIcon';

const EmergencyPage: React.FC = () => {
    return (
        <div className="space-y-6">
             <div>
                <h1 className="text-3xl font-bold text-gray-800">إدارة الطوارئ والأزمات</h1>
                <p className="text-gray-500 mt-1">إرسال تنبيهات عاجلة وتعطيل أجزاء من النظام عند الحاجة.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                    <h3 className="font-bold text-lg text-red-800 mb-4 flex items-center"><ShieldExclamationIcon className="w-6 h-6 mr-2"/> إرسال تنبيه طارئ</h3>
                    <textarea className="w-full p-2 border rounded-md border-red-300" placeholder="محتوى التنبيه..."></textarea>
                    <button className="mt-4 bg-red-600 text-white font-bold py-2 px-6 rounded-md">إرسال التنبيه الآن</button>
                </div>
            </div>
        </div>
    );
};

export default EmergencyPage;
