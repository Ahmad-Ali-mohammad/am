
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MOCK_COURSES } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { ClockIcon } from '../components/icons/ClockIcon';
import { VideoCameraIcon } from '../components/icons/VideoCameraIcon';
import { ChartBarIcon } from '../components/icons/ChartBarIcon';
import { TrophyIcon } from '../components/icons/TrophyIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { StarIcon } from '../components/icons/StarIcon';
import { Review } from '../types';


const CourseDetailPage: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const course = MOCK_COURSES.find(c => c.id === courseId);
    const { user } = useAuth();
    
    const [openModule, setOpenModule] = useState<string | null>(course?.modules[0]?.title ?? null);
    const [reviews, setReviews] = useState<Review[]>(course?.reviewsData || []);
    const [newRating, setNewRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [newComment, setNewComment] = useState('');

    if (!course) {
        return (
            <>
                <Header />
                <div className="flex items-center justify-center h-screen bg-gray-100">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">الدورة غير موجودة</h1>
                        <p className="text-gray-600">عذراً، لم نتمكن من العثور على الدورة التي تبحث عنها.</p>
                        <Link to="/courses" className="mt-6 inline-block bg-primary-600 text-white font-bold py-2 px-6 rounded-md hover:bg-primary-700">
                            العودة إلى الدورات
                        </Link>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
    
    const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);

    const handleReviewSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newRating > 0 && newComment.trim() !== '' && user) {
            const newReview: Review = {
                id: `r${reviews.length + Date.now()}`,
                user: { name: user.name, avatarUrl: user.avatarUrl },
                rating: newRating,
                comment: newComment,
                date: new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })
            };
            setReviews([newReview, ...reviews]);
            setNewRating(0);
            setNewComment('');
        } else {
            alert('الرجاء تحديد تقييم وكتابة تعليق.');
        }
    };


    return (
        <div className="bg-gray-50">
            <Header />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <nav className="text-sm" aria-label="Breadcrumb">
                                <ol className="list-none p-0 inline-flex space-x-2 space-x-reverse">
                                    <li className="flex items-center">
                                        <Link to="/" className="text-gray-500 hover:text-primary-600">الرئيسية</Link>
                                    </li>
                                    <li><span className="text-gray-400 mx-2">/</span></li>
                                    <li className="flex items-center">
                                        <Link to="/courses" className="text-gray-500 hover:text-primary-600">الدورات</Link>
                                    </li>
                                    <li><span className="text-gray-400 mx-2">/</span></li>
                                    <li className="text-gray-700 font-medium">{course.title}</li>
                                </ol>
                            </nav>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{course.title}</h1>
                        
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-6">
                            <div className="flex items-center">
                                <img src={course.instructorAvatar} alt={course.instructor} className="w-10 h-10 rounded-full object-cover ml-3"/>
                                <div>
                                    <p className="text-sm text-gray-500">المدرب</p>
                                    <p className="text-gray-800 font-semibold">{course.instructor}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon key={i} className={`w-5 h-5 ${i < Math.round(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">التقييم</p>
                                    <p className="text-gray-800 font-semibold">{course.rating.toFixed(1)} ({course.reviews.toLocaleString('ar-EG')} تقييم)</p>
                                </div>
                            </div>
                        </div>

                        <p className="text-lg text-gray-600 mb-8">{course.description}</p>
                        
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">ماذا ستتعلم</h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {course.whatYouWillLearn.map((point, index) => (
                                    <li key={index} className="flex items-start">
                                        <svg className="w-5 h-5 text-success-500 ml-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                        <span className="text-gray-700">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">محتوى الدورة</h2>
                            <div className="space-y-2">
                                {course.modules.map((module, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                        <button 
                                            onClick={() => setOpenModule(openModule === module.title ? null : module.title)}
                                            className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 text-right"
                                        >
                                            <span className="font-semibold text-gray-800">{module.title}</span>
                                            <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform ${openModule === module.title ? 'rotate-180' : ''}`} />
                                        </button>
                                        {openModule === module.title && (
                                            <div className="p-4 bg-gray-50 border-t border-gray-200">
                                                <ul className="space-y-3">
                                                    {module.lessons.map((lesson, lessonIndex) => (
                                                        <li key={lessonIndex} className="flex justify-between items-center text-gray-600">
                                                            <span className="flex items-center">
                                                                <VideoCameraIcon className="w-5 h-5 text-gray-400 ml-3" />
                                                                {lesson.title}
                                                            </span>
                                                            <span className="text-sm text-gray-500">{lesson.duration}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">عن المدرب</h2>
                            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                                <img src={course.instructorAvatar} alt={course.instructor} className="w-20 h-20 rounded-full object-cover ml-6"/>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{course.instructor}</h3>
                                    <p className="text-gray-600 mt-1">{course.instructorBio}</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Student Reviews Section */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">تقييمات الطلاب</h2>
                            <div className="space-y-6">
                                {reviews.length > 0 ? (
                                    reviews.map(review => (
                                        <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
                                            <div className="flex items-start">
                                                <img src={review.user.avatarUrl} alt={review.user.name} className="w-12 h-12 rounded-full object-cover ml-4"/>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="font-bold text-gray-800">{review.user.name}</h3>
                                                        <span className="text-sm text-gray-500">{review.date}</span>
                                                    </div>
                                                    <div className="flex items-center my-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <StarIcon key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                                                        ))}
                                                    </div>
                                                    <p className="text-gray-600 mt-2">{review.comment}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-gray-500 py-8 bg-white rounded-lg shadow-md">
                                        <p>لا توجد تقييمات لهذه الدورة حتى الآن. كن أول من يقيّمها!</p>
                                    </div>
                                )}
                            </div>
                        </div>

                         {/* Add Review Section */}
                        {user && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">أضف تقييمك</h2>
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <form onSubmit={handleReviewSubmit}>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-semibold mb-2">تقييمك</label>
                                            <div className="flex items-center" onMouseLeave={() => setHoverRating(0)}>
                                                {[...Array(5)].map((_, index) => {
                                                    const ratingValue = index + 1;
                                                    return (
                                                        <StarIcon 
                                                            key={ratingValue}
                                                            className={`w-8 h-8 cursor-pointer ${ratingValue <= (hoverRating || newRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                                            onClick={() => setNewRating(ratingValue)}
                                                            onMouseEnter={() => setHoverRating(ratingValue)}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="comment" className="block text-gray-700 font-semibold mb-2">تعليقك</label>
                                            <textarea 
                                                id="comment" 
                                                rows={4} 
                                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                                placeholder="اكتب تعليقك هنا..."
                                                value={newComment}
                                                onChange={(e) => setNewComment(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <button type="submit" className="bg-primary-600 text-white font-bold py-2 px-6 rounded-md hover:bg-primary-700 transition-colors">
                                            إرسال التقييم
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}


                    </div>

                    {/* Sticky Sidebar */}
                    <div className="relative">
                        <div className="lg:sticky top-24">
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <img src={course.imageUrl} alt={course.title} className="w-full h-56 object-cover" />
                                <div className="p-6">
                                    <div className="text-4xl font-extrabold text-gray-900 mb-4 text-center">${course.price}</div>
                                    <button className="w-full bg-primary-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors text-lg">
                                        التسجيل في الدورة
                                    </button>
                                    <ul className="mt-6 space-y-3 text-gray-600">
                                        <li className="flex items-center"><ClockIcon className="w-5 h-5 ml-3 text-gray-400"/><span>المدة: <strong>{course.duration}</strong></span></li>
                                        <li className="flex items-center"><VideoCameraIcon className="w-5 h-5 ml-3 text-gray-400"/><span><strong>{totalLessons}</strong> درس</span></li>
                                        <li className="flex items-center"><ChartBarIcon className="w-5 h-5 ml-3 text-gray-400"/><span>المستوى: <strong>{course.skillLevel}</strong></span></li>
                                        <li className="flex items-center"><TrophyIcon className="w-5 h-5 ml-3 text-gray-400"/><span>شهادة إتمام</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CourseDetailPage;
