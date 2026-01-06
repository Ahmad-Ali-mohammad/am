
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MOCK_COURSES } from '../constants';
// Import SkillLevel for type casting
import { Course, CourseModule, SkillLevel } from '../types';
import { ArrowLeftOnRectangleIcon } from '../components/icons/ArrowLeftOnRectangleIcon';
import { DocumentArrowUpIcon } from '../components/icons/DocumentArrowUpIcon';


const CourseEditorPage: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const navigate = useNavigate();
    const isEditing = Boolean(courseId);
    
    const existingCourse = isEditing ? MOCK_COURSES.find(c => c.id === courseId) : null;
    
    const [course, setCourse] = useState<Partial<Course>>(
        existingCourse || {
            title: '',
            description: '',
            whatYouWillLearn: ['', '', ''],
            category: 'تكنولوجيا',
            price: 50,
            duration: '10',
            skillLevel: 'مبتدئ',
            modules: [{ title: 'الوحدة الأولى', lessons: [{ title: 'الدرس الأول', duration: '15' }] }]
        }
    );

    const handleSubmit = (action: 'draft' | 'review') => {
        if (action === 'draft') {
            alert('تم حفظ الدورة كمسودة بنجاح (محاكاة)!');
        } else {
            alert('تم إرسال الدورة للمراجعة بنجاح (محاكاة)!');
        }
        navigate('/dashboard');
    };
    
    const handleLearnPointChange = (index: number, value: string) => {
        const newPoints = [...(course.whatYouWillLearn || [])];
        newPoints[index] = value;
        setCourse({ ...course, whatYouWillLearn: newPoints });
    };

    const handleModuleChange = (index: number, newTitle: string) => {
        const newModules = [...(course.modules || [])];
        newModules[index].title = newTitle;
        setCourse({ ...course, modules: newModules });
    };

    const addModule = () => {
        const newModules: CourseModule[] = [...(course.modules || []), { title: `الوحدة ${ (course.modules?.length || 0) + 1}`, lessons: [{ title: 'الدرس الأول', duration: '15' }] }];
        setCourse({ ...course, modules: newModules });
    };

    return (
        <div className="bg-slate-100 min-h-screen">
             <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-20">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                    {isEditing ? 'تعديل الدورة' : 'إنشاء دورة جديدة'}
                </h1>
                <Link to="/dashboard" className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-800">
                    <span>العودة للوحة التحكم</span>
                    <ArrowLeftOnRectangleIcon className="w-5 h-5 sm:mr-1" />
                </Link>
            </header>

            <main className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
                <form onSubmit={(e) => e.preventDefault()} className="bg-white p-8 rounded-lg shadow-md space-y-8">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">عنوان الدورة</label>
                        <input type="text" id="title" value={course.title} onChange={e => setCourse({...course, title: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">الوصف</label>
                        <textarea id="description" value={course.description} onChange={e => setCourse({...course, description: e.target.value})} rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required></textarea>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">ماذا سيتعلم الطالب</h3>
                        <div className="space-y-2">
                           {course.whatYouWillLearn?.map((point, index) => (
                             <input key={index} type="text" value={point} onChange={e => handleLearnPointChange(index, e.target.value)} placeholder={`نقطة ${index + 1}`} className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                           ))}
                        </div>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                           <label htmlFor="category" className="block text-sm font-medium text-gray-700">الفئة</label>
                           <select id="category" value={course.category} onChange={e => setCourse({...course, category: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                               <option>تكنولوجيا</option>
                               <option>أعمال</option>
                               <option>فنون</option>
                               <option>علوم</option>
                           </select>
                        </div>
                         <div>
                           <label htmlFor="price" className="block text-sm font-medium text-gray-700">السعر ($)</label>
                           <input type="number" id="price" value={course.price} onChange={e => setCourse({...course, price: Number(e.target.value)})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                        </div>
                        <div>
                           <label htmlFor="skillLevel" className="block text-sm font-medium text-gray-700">مستوى المهارة</label>
                           {/* Fix: cast e.target.value to SkillLevel to match the Course type definition */}
                           <select id="skillLevel" value={course.skillLevel} onChange={e => setCourse({...course, skillLevel: e.target.value as SkillLevel})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                               <option>مبتدئ</option>
                               <option>متوسط</option>
                               <option>متقدم</option>
                               <option>كل المستويات</option>
                           </select>
                        </div>
                         <div>
                           <label htmlFor="duration" className="block text-sm font-medium text-gray-700">المدة (بالساعات)</label>
                           <input type="number" id="duration" value={course.duration} onChange={e => setCourse({...course, duration: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                        </div>
                    </div>

                    <div id="modules">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">وحدات الدورة</h3>
                        {course.modules?.map((module, index) => (
                             <div key={index} className="p-4 border rounded-md mb-4 bg-gray-50">
                                <label className="block text-sm font-medium text-gray-700">عنوان الوحدة {index + 1}</label>
                                <input type="text" value={module.title} onChange={e => handleModuleChange(index, e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md mb-4" />
                                
                                <h4 className="text-sm font-semibold mb-2">الدروس</h4>
                                {/* Simulated lesson management */}
                                <div className="p-3 border-dashed border-2 rounded-md flex items-center justify-center">
                                    <label htmlFor={`file-upload-${index}`} className="cursor-pointer text-primary-600 hover:text-primary-800 flex items-center">
                                        <DocumentArrowUpIcon className="w-5 h-5 ml-2" />
                                        <span>رفع ملفات الدرس (فيديو, PDF)</span>
                                    </label>
                                    <input id={`file-upload-${index}`} name={`file-upload-${index}`} type="file" className="sr-only" multiple />
                                </div>
                             </div>
                        ))}
                        <button type="button" onClick={addModule} className="text-sm font-semibold text-primary-600 hover:text-primary-800">
                           + إضافة وحدة جديدة
                        </button>
                    </div>


                    <div className="flex justify-end pt-4 border-t space-x-4 space-x-reverse">
                        <button type="button" onClick={() => navigate('/dashboard')} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-md hover:bg-gray-300">
                            إلغاء
                        </button>
                        <button type="button" onClick={() => handleSubmit('draft')} className="bg-slate-600 text-white font-bold py-2 px-6 rounded-md hover:bg-slate-700">
                            حفظ كمسودة
                        </button>
                         <button type="button" onClick={() => handleSubmit('review')} className="bg-primary-600 text-white font-bold py-2 px-6 rounded-md hover:bg-primary-700">
                            إرسال للمراجعة
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default CourseEditorPage;
