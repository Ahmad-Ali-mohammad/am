
import React from 'react';
import { MOCK_AUDIT_LOGS } from '../../../constants';

const AuditLogPage: React.FC = () => ( 
    <div className="bg-white p-6 rounded-lg shadow-md"> 
        <h1 className="text-3xl font-bold text-gray-800 mb-1">سجل الأنشطة</h1>
        <p className="text-gray-500 mb-6">تتبع الإجراءات المهمة التي يقوم بها المستخدمون عبر النظام.</p>
        <div className="overflow-x-auto"> 
            <table className="min-w-full divide-y divide-gray-200"> 
                <thead className="bg-gray-50"> 
                    <tr> 
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المستخدم</th> 
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراء</th> 
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التوقيت</th> 
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">عنوان IP</th> 
                    </tr> 
                </thead> 
                <tbody className="bg-white divide-y divide-gray-200"> 
                    {MOCK_AUDIT_LOGS.map(log => ( 
                        <tr key={log.id}> 
                            <td className="px-6 py-4 whitespace-nowrap"> 
                                <div className="flex items-center"> 
                                    <img className="h-10 w-10 rounded-full ml-4" src={log.user.avatarUrl} alt="" /> 
                                    <div><div className="text-sm font-medium text-gray-900">{log.user.name}</div></div> 
                                </div> 
                            </td> 
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.action}</td> 
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp}</td> 
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.ipAddress}</td> 
                        </tr> 
                    ))} 
                </tbody> 
            </table> 
        </div> 
    </div> 
);

export default AuditLogPage;
