
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Course, CourseStatus, SkillCourse } from '../../types';
import { MOCK_COURSES, MOCK_LIBRARY_RESOURCES, MOCK_SKILL_COURSES } from '../../constants';

// Icon Imports
import { PlusCircleIcon } from '../../components/icons/PlusCircleIcon';
import { PencilSquareIcon } from '../../components/icons/PencilSquareIcon';
import { TrashIcon } from '../../components/icons/TrashIcon';
import { TagIcon } from '../../components/icons/TagIcon';
import { EyeIcon } from '../../components/icons/EyeIcon';

const getStatusBadge = (status: CourseStatus) => {
    switch(status) {
        case 'Approved': return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">معتمد</span>;
        case 'Pending Review': return <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">قيد المراجعة</span>;
        case 'Needs Revision': return <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">يحتاج لمراجعة</span>;
        case 'Draft': return <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 rounded-full">مسودة</span>;
        default: return null;
    }
}

export const ContentReview: React.FC = () => {
    const coursesForReview = MOCK_COURSES.filter(c => c.status === 'Pending Review');
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">دورات بانتظار المراجعة ({coursesForReview.length})</h2>
             <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الدورة</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المدرب</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th></tr></thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {coursesForReview.map(course => (
                            <tr key={course.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.instructor}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(course.status)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-reverse space-x-2">
                                    <button className="px-3 py-1 text-xs text-white bg-green-600 rounded-md hover:bg-green-700">اعتماد</button>
                                    <button className="px-3 py-1 text-xs text-white bg-yellow-600 rounded-md hover:bg-yellow-700">طلب تعديل</button>
                                    <Link to={`/course/${course.id}`} className="px-3 py-1 text-xs text-primary-800 bg-primary-100 rounded-md hover:bg-primary-200">عرض</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export const LibraryManagement: React.FC = () => {
    const [resources, setResources] = useState(MOCK_LIBRARY_RESOURCES);
    return(
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">إدارة مكتبة المحتوى</h2>
                <div className="flex items-center gap-4">
                    <Link to="/content-library" target="_blank" className="flex items-center bg-white text-primary-600 font-bold py-2 px-4 rounded-md border border-primary-500 hover:bg-primary-50">
                        <EyeIcon className="w-5 h-5 ml-2" />
                        عرض المكتبة
                    </Link>
                    <button className="flex items-center bg-primary-600 text-white font-bold py-2 px-4 rounded-md hover:bg-primary-700">
                        <PlusCircleIcon className="w-5 h-5 ml-2" />
                        إضافة مورد جديد
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                     <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">العنوان</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المؤلف</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">النوع</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th></tr></thead>
                     <tbody className="bg-white divide-y divide-gray-200">
                         {resources.map(res => (
                            <tr key={res.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{res.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{res.author}</td>
                                <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 text-xs font-semibold text-indigo-800 bg-indigo-100 rounded-full">{res.type}</span></td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-reverse space-x-2">
                                    <button className="text-gray-500 hover:text-primary-600"><PencilSquareIcon className="w-5 h-5"/></button>
                                    <button className="text-gray-500 hover:text-red-600"><TrashIcon className="w-5 h-5"/></button>
                                </td>
                            </tr>
                         ))}
                     </tbody>
                </table>
            </div>
        </div>
    );
}

export const CategoryManagement: React.FC = () => {
    // Mock categories
    const categories = ['تكنولوجيا', 'أعمال', 'فنون', 'علوم', 'تأسيس'];
    return (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
             <TagIcon className="w-16 h-16 mx-auto text-gray-300" />
             <h2 className="text-2xl font-bold text-gray-800 mt-4">إدارة تصنيفات الدورات</h2>
             <p className="text-gray-500 mt-2 max-w-lg mx-auto">هنا يمكنك إضافة، تعديل، أو حذف التصنيفات المستخدمة في المنصة لضمان تنظيم المحتوى بشكل فعال.</p>
        </div>
    );
};


export const SkillsManagement: React.FC = () => {
    const [skills, setSkills] = useState<SkillCourse[]>(MOCK_SKILL_COURSES);

    const handleDelete = (id: string) => {
        if (window.confirm('هل أنت متأكد من رغبتك في حذف هذه المهارة؟')) {
            setSkills(skills.filter(s => s.id !== id));
        }
    };
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">إدارة قسم "تعلم مهنة"</h2>
                <button className="flex items-center bg-primary-600 text-white font-bold py-2 px-4 rounded-md hover:bg-primary-700">
                    <PlusCircleIcon className="w-5 h-5 ml-2" />
                    إضافة مهارة جديدة
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                     <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">العنوان</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التصنيف</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المنصة</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                        </tr>
                    </thead>
                     <tbody className="bg-white divide-y divide-gray-200">
                         {skills.map(skill => (
                            <tr key={skill.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{skill.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{skill.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${skill.platform === 'YouTube' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                                        {skill.platform === 'YouTube' ? 'يوتيوب' : 'المنصّة'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-reverse space-x-2">
                                    <button className="text-gray-500 hover:text-primary-600"><PencilSquareIcon className="w-5 h-5"/></button>
                                    <button onClick={() => handleDelete(skill.id)} className="text-gray-500 hover:text-red-600"><TrashIcon className="w-5 h-5"/></button>
                                </td>
                            </tr>
                         ))}
                     </tbody>
                </table>
            </div>
        </div>
    );
};
