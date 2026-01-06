
import React from 'react';
import { Link } from 'react-router-dom';
import { CourseStatus } from '../../../types';
import { MOCK_COURSES } from '../../../constants';

const getStatusBadge = (status: CourseStatus) => { 
    switch(status) { 
        case 'Approved': return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">معتمد</span>; 
        case 'Pending Review': return <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">قيد المراجعة</span>; 
        case 'Needs Revision': return <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">يحتاج لمراجعة</span>; 
        case 'Draft': return <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 rounded-full">مسودة</span>; 
        default: return null; 
    } 
}

const ContentManagementPage: React.FC = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">إدارة المحتوى</h1>
        <p className="text-gray-500 mb-6">مراجعة واعتماد وتعديل جميع الدورات التعليمية على المنصة.</p>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الدورة</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المدرب</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th></tr></thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {MOCK_COURSES.map(course => (
                        <tr key={course.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.instructor}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(course.status)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-reverse space-x-2">
                                {course.status === 'Pending Review' && <>
                                    <button className="px-3 py-1 text-xs text-white bg-green-600 rounded-md hover:bg-green-700">اعتماد</button>
                                    <button className="px-3 py-1 text-xs text-white bg-yellow-600 rounded-md hover:bg-yellow-700">طلب تعديل</button>
                                </>}
                                <Link to={`/course/${course.id}`} className="px-3 py-1 text-xs text-primary-800 bg-primary-100 rounded-md hover:bg-primary-200">عرض</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default ContentManagementPage;
