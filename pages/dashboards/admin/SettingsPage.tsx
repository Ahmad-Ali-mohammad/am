
import React from 'react';

const SettingsPage: React.FC = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">إعدادات النظام</h1>
        <p className="text-gray-500 mb-6">إدارة الإعدادات والتكوينات العامة للمنصة.</p>
        <div className="space-y-6 max-w-lg">
             <div>
                <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">اسم المنصة</label>
                <input type="text" id="siteName" defaultValue="المنصّة" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"/>
            </div>
             <div className="flex items-center justify-between p-4 border rounded-md">
                <span className="flex-grow flex flex-col">
                    <span className="text-sm font-medium text-gray-900">وضع الصيانة</span>
                    <span className="text-sm text-gray-500">سيؤدي هذا إلى تعطيل الوصول العام للموقع.</span>
                </span>
                <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" className="sr-only peer" /><div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div></label>
            </div>
            <div className="pt-4 border-t">
                 <button className="px-5 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-sm font-medium">حفظ التغييرات</button>
            </div>
        </div>
    </div>
);

export default SettingsPage;
