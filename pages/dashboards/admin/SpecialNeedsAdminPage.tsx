
import React from 'react';
import { HeartIcon } from '../../../components/icons/HeartIcon';

const SpecialNeedsAdminPage: React.FC = () => {
    return (
        <div className="space-y-6">
             <div>
                <h1 className="text-3xl font-bold text-gray-800">إدارة دعم الاحتياجات الخاصة</h1>
                <p className="text-gray-500 mt-1">تكوين وإدارة ميزات الوصولية لضمان تجربة شاملة للجميع.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg mb-4 flex items-center"><HeartIcon className="w-6 h-6 mr-2 text-primary-500"/> إعدادات الوصولية</h3>
                <div className="space-y-4">
                     <div className="flex items-center justify-between p-4 border rounded-md">
                        <span className="font-medium text-gray-700">تفعيل وضع التباين العالي</span>
                        <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" className="sr-only peer" defaultChecked /><div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div></label>
                    </div>
                     <div className="flex items-center justify-between p-4 border rounded-md">
                        <span className="font-medium text-gray-700">تمكين قارئ الشاشة المحسن</span>
                        <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" className="sr-only peer" /><div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div></label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecialNeedsAdminPage;
