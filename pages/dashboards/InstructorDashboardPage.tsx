
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { MOCK_COURSES } from '../../constants';
import { Course, CourseStatus } from '../../types';

// Icon Imports
import { BookOpenIcon } from '../../components/icons/BookOpenIcon';
import { UserGroupIcon } from '../../components/icons/UserGroupIcon';
import { StarIcon } from '../../components/icons/StarIcon';
import { PlusCircleIcon } from '../../components/icons/PlusCircleIcon';
import { PencilSquareIcon } from '../../components/icons/PencilSquareIcon';
import { EyeIcon } from '../../components/icons/EyeIcon';
import { PaperAirplaneIcon } from '../../components/icons/PaperAirplaneIcon';
import { ClockIcon } from '../../components/icons/ClockIcon';
import { ChatBubbleLeftRightIcon } from '../../components/icons/ChatBubbleLeftRightIcon';

// --- Reusable Components ---
const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string; }> = ({ icon, label, value }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
        <div className="ml-4 flex-shrink-0">{icon}</div>
        <div>
            <h3 className="text-sm font-medium text-gray-500">{label}</h3>
            <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
    </div>
);

const getStatusBadge = (status: CourseStatus) => {
    switch(status) {
        case 'Approved': return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">معتمد</span>;
        case 'Pending Review': return <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">قيد المراجعة</span>;
        case 'Needs Revision': return <span className="px-2 py-1 text-xs font-semibold text-orange-800 bg-orange-100 rounded-full">يحتاج لمراجعة</span>;
        case 'Draft': return <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 rounded-full">مسودة</span>;
        default: return null;
    }
};

const CourseActions: React.FC<{ course: Course }> = ({ course }) => {
    switch (course.status) {
        case 'Draft':
        case 'Needs Revision':
            return (
                <div className="flex items-center space-x-2 space-x-reverse">
                    <Link to={`/edit-course/${course.id}`} className="flex items-center text-sm text-gray-600 hover:text-primary-600 p-2 rounded-md bg-gray-100 hover:bg-primary-50">
                        <PencilSquareIcon className="w-4 h-4 ml-1" /> تعديل
                    </Link>
                    <button className="flex items-center text-sm text-white p-2 rounded-md bg-primary-600 hover:bg-primary-700">
                        <PaperAirplaneIcon className="w-4 h-4 ml-1" /> إرسال للمراجعة
                    </button>
                </div>
            );
        case 'Pending Review':
            return (
                 <div className="flex items-center text-sm text-yellow-600 p-2 rounded-md bg-yellow-50">
                    <ClockIcon className="w-4 h-4 ml-1" /> قيد المراجعة
                </div>
            );
        case 'Approved':
             return (
                <Link to={`/course/${course.id}`} className="flex items-center text-sm text-green-600 hover:text-green-800 p-2 rounded-md bg-green-50 hover:bg-green-100">
                    <EyeIcon className="w-4 h-4 ml-1" /> عرض الدورة
                </Link>
            );
        default:
            return null;
    }
};


export const InstructorCourseManagement: React.FC = () => {
    const { user } = useAuth();
    const instructorCourses = MOCK_COURSES.filter(c => c.instructor === user?.name);

    const totalStudents = instructorCourses.reduce((sum, course) => sum + course.reviews, 0);
    const averageRating = instructorCourses.length > 0
        ? (instructorCourses.reduce((sum, course) => sum + course.rating, 0) / instructorCourses.length).toFixed(1)
        : 'N/A';

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={<BookOpenIcon className="w-8 h-8 text-primary-500"/>} label="دوراتي" value={instructorCourses.length.toString()} />
                <StatCard icon={<UserGroupIcon className="w-8 h-8 text-green-500"/>} label="إجمالي الطلاب" value={totalStudents.toLocaleString('ar-EG')} />
                <StatCard icon={<StarIcon className="w-8 h-8 text-yellow-500"/>} label="متوسط التقييم" value={averageRating.toString()} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">إدارة الدورات</h2>
                    <Link to="/create-course" className="flex items-center bg-primary-600 text-white font-bold py-2 px-4 rounded-md hover:bg-primary-700 transition-colors">
                        <PlusCircleIcon className="w-5 h-5 ml-2" />
                        إنشاء دورة جديدة
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">عنوان الدورة</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الطلاب</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {instructorCourses.map(course => (
                                <tr key={course.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(course.status)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.reviews.toLocaleString('ar-EG')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium"><CourseActions course={course} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export const InstructorQA: React.FC = () => (
    <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <ChatBubbleLeftRightIcon className="w-16 h-16 mx-auto text-gray-300" />
        <h3 className="text-2xl font-bold text-gray-800 mt-4">قسم الأسئلة والأجوبة</h3>
        <p className="text-gray-500 mt-2 max-w-lg mx-auto">هنا ستظهر جميع استفسارات الطلاب من مختلف دوراتك. يمكنك الرد عليها مباشرةً لتقديم الدعم وتعزيز التفاعل.</p>
    </div>
);
