
import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CourseCard from '../components/CourseCard';
import { MOCK_COURSES } from '../constants';
import { Course, EducationalStage, CurriculumType } from '../types';
import { MagnifyingGlassIcon } from '../components/icons/MagnifyingGlassIcon';
import { AcademicCapIcon } from '../components/icons/AcademicCapIcon';

const CoursesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStage, setSelectedStage] = useState<EducationalStage | 'All'>('All');
  const [selectedCurriculum, setSelectedCurriculum] = useState<CurriculumType | 'All'>('All');
  const [priceRange, setPriceRange] = useState(100);

  const categories = ['All', ...Array.from(new Set(MOCK_COURSES.map(c => c.category)))];
  const stages = ['All', 'primary', 'preparatory', 'secondary', 'academic', 'continuous'];
  const curricula = ['All', 'syrian', 'saudi', 'egyptian', 'international'];

  const filteredCourses = useMemo(() => {
    return MOCK_COURSES.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      const matchesStage = selectedStage === 'All' || course.stage === selectedStage;
      const matchesCurriculum = selectedCurriculum === 'All' || course.curriculum === selectedCurriculum;
      const matchesPrice = course.price <= priceRange;
      
      return matchesSearch && matchesCategory && matchesStage && matchesCurriculum && matchesPrice;
    });
  }, [searchTerm, selectedCategory, selectedStage, selectedCurriculum, priceRange]);

  return (
    <div className="bg-slate-50 min-h-screen" dir="rtl">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">اكتشف مستقبلك التعليمي</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">تصفح مئات الدورات الأكاديمية المصممة خصيصاً للمناهج السورية والعربية، بجودة عالية وإشراف خبراء.</p>
        </div>

        {/* Advanced Filter Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-10">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Search */}
                <div className="relative">
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">البحث الحر</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="ابحث عن دورة أو مدرب..."
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                </div>

                {/* Stages */}
                <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">المرحلة الدراسية</label>
                    <select 
                        value={selectedStage} 
                        onChange={(e) => setSelectedStage(e.target.value as any)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none cursor-pointer"
                    >
                        <option value="All">كل المراحل</option>
                        <option value="primary">الابتدائية</option>
                        <option value="preparatory">الإعدادية</option>
                        <option value="secondary">الثانوية</option>
                        <option value="academic">الجامعية</option>
                        <option value="continuous">التعليم المستمر</option>
                    </select>
                </div>

                {/* Curriculum */}
                <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">نوع المنهج</label>
                    <select 
                        value={selectedCurriculum} 
                        onChange={(e) => setSelectedCurriculum(e.target.value as any)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none cursor-pointer"
                    >
                        <option value="All">كل المناهج</option>
                        <option value="syrian">المنهج السوري</option>
                        <option value="international">منهج دولي</option>
                        <option value="saudi">المنهج السعودي</option>
                        <option value="egyptian">المنهج المصري</option>
                    </select>
                </div>

                {/* Price Range */}
                <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">السعر الأقصى: ${priceRange}</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        step="5"
                        value={priceRange} 
                        onChange={(e) => setPriceRange(Number(e.target.value))} 
                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary-600 mt-4" 
                    />
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-1 uppercase">
                        <span>مجاني</span>
                        <span>$100+</span>
                    </div>
                </div>
            </div>
            
            {/* Quick Category Tabs */}
            <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                <span className="text-xs font-bold text-slate-400 whitespace-nowrap ml-2">الفئات السريعة:</span>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                            selectedCategory === cat 
                            ? 'bg-primary-600 text-white shadow-md shadow-primary-200' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        {cat === 'All' ? 'الكل' : cat}
                    </button>
                ))}
            </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        ) : (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200 shadow-sm">
                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AcademicCapIcon className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">لا توجد نتائج لمطابقة بحثك</h3>
                <p className="text-slate-500 mt-2">جرب تغيير الفلاتر أو استخدام كلمات بحث مختلفة.</p>
                <button 
                    onClick={() => {setSearchTerm(''); setSelectedCategory('All'); setSelectedStage('All'); setSelectedCurriculum('All'); setPriceRange(100);}}
                    className="mt-6 text-primary-600 font-bold hover:underline"
                >
                    إعادة تعيين كافة الفلاتر
                </button>
            </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CoursesPage;
