
import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CourseCard from '../components/CourseCard';
import { MOCK_COURSES, MOCK_CLASSIFICATION_TREE } from '../constants';
import { Course, ClassificationNode, ContentType } from '../types';
import { MagnifyingGlassIcon } from '../components/icons/MagnifyingGlassIcon';
import { MicrophoneIcon } from '../components/icons/MicrophoneIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { AcademicCapIcon } from '../components/icons/AcademicCapIcon';

// Recursive component to render the classification tree
const TreeNode: React.FC<{ node: ClassificationNode; onSelect: (id: string) => void; selectedId: string | null }> = ({ node, onSelect, selectedId }) => {
    const [isOpen, setIsOpen] = useState(true);
    const isSelected = selectedId === node.id;
    const hasChildren = node.children && node.children.length > 0;

    return (
        <div className={hasChildren ? "" : "pr-4"}>
            <div 
                className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-all ${isSelected ? 'bg-primary-50 text-primary-700 font-bold' : 'text-slate-700 hover:bg-slate-100'}`}
                onClick={() => onSelect(node.id)}
            >
                <span className="text-sm">{node.name}</span>
                {hasChildren && (
                     <button onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }} className="p-1 rounded-full hover:bg-slate-200">
                        <ChevronDownIcon className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? '' : '-rotate-90'}`} />
                     </button>
                )}
            </div>
            {isOpen && hasChildren && (
                <div className="mt-1 space-y-1 mr-4 border-r-2 border-slate-200/80">
                    {node.children?.map(child => <TreeNode key={child.id} node={child} onSelect={onSelect} selectedId={selectedId} />)}
                </div>
            )}
        </div>
    );
};

const ContentLibraryPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<ContentType | 'الكل'>('الكل');
    const [selectedLevel, setSelectedLevel] = useState<string | 'الكل'>('الكل');

    const contentTypes: (ContentType | 'الكل')[] = ['الكل', 'فيديو', 'نص', 'تفاعلي', 'اختبار', 'مشروع'];
    const levels: (string | 'الكل')[] = ['الكل', 'مبتدئ', 'متوسط', 'متقدم'];

    const handleVoiceSearch = () => {
        alert('محاكاة البحث الصوتي: سيتم تفعيل هذه الميزة قريباً!');
    };
    
    const filteredCourses = useMemo(() => {
        return MOCK_COURSES.filter(course => {
            const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || course.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = !selectedCategory || course.stage === selectedCategory || course.category.toLowerCase().includes(selectedCategory) || course.curriculum === selectedCategory;
            const matchesType = selectedType === 'الكل' || course.contentType === selectedType;
            const matchesLevel = selectedLevel === 'الكل' || course.skillLevel === selectedLevel;

            return matchesSearch && matchesCategory && matchesType && matchesLevel;
        });
    }, [searchTerm, selectedCategory, selectedType, selectedLevel]);

    const RecommendationCarousel: React.FC<{title: string, courses: Course[]}> = ({title, courses}) => (
        <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
            <div className="flex space-x-6 space-x-reverse overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar">
                {courses.map(course => (
                    <div key={course.id} className="w-80 flex-shrink-0">
                        <CourseCard course={course} />
                    </div>
                ))}
            </div>
        </section>
    );

    return (
        <div className="bg-slate-50 min-h-screen" dir="rtl">
            <Header />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-24">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 px-2">التصنيفات</h2>
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                                {MOCK_CLASSIFICATION_TREE.map(node => <TreeNode key={node.id} node={node} onSelect={setSelectedCategory} selectedId={selectedCategory} />)}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-3 space-y-12">
                         {/* Search and Filter Panel */}
                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <div className="relative mb-6">
                                <input 
                                    type="search"
                                    placeholder="ابحث بالكلمات المفتاحية في مكتبة المحتوى..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border border-gray-200 bg-slate-50 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-400"
                                />
                                <MagnifyingGlassIcon className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"/>
                                <button onClick={handleVoiceSearch} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-primary-600">
                                    <MicrophoneIcon className="w-6 h-6" />
                                </button>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex items-center flex-wrap gap-2">
                                    <span className="font-bold text-xs text-slate-400 uppercase tracking-wider ml-2">النوع:</span>
                                    {contentTypes.map(type => (
                                        <button key={type} onClick={() => setSelectedType(type)} className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${selectedType === type ? 'bg-primary-600 text-white shadow-md shadow-primary-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{type}</button>
                                    ))}
                                </div>
                                <div className="flex items-center flex-wrap gap-2">
                                    <span className="font-bold text-xs text-slate-400 uppercase tracking-wider ml-2">المستوى:</span>
                                    {levels.map(level => (
                                        <button key={level} onClick={() => setSelectedLevel(level)} className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${selectedLevel === level ? 'bg-primary-600 text-white shadow-md shadow-primary-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{level}</button>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section>
                            {filteredCourses.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredCourses.map(course => <CourseCard key={course.id} course={course} />)}
                                </div>
                            ) : (
                                <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200 shadow-sm">
                                    <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <AcademicCapIcon className="w-10 h-10 text-slate-300" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-800">لا توجد نتائج مطابقة</h3>
                                    <p className="text-slate-500 mt-2">حاول تعديل معايير البحث أو التصفية.</p>
                                </div>
                            )}
                        </section>

                        {/* Recommendations */}
                        <RecommendationCarousel title="أكمل مسارك التعليمي" courses={MOCK_COURSES.slice(3, 8)} />
                        <RecommendationCarousel title="طلاب آخرون شاهدوا أيضاً" courses={MOCK_COURSES.slice(1, 6).reverse()} />
                    </main>
                </div>
            </div>
            <Footer />
             <style dangerouslySetInnerHTML={{ __html: `
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}} />
        </div>
    );
};

export default ContentLibraryPage;
