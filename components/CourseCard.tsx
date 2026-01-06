
import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  progress?: number; // Optional progress percentage (0-100)
}

const CourseCard: React.FC<CourseCardProps> = ({ course, progress }) => {
  const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg className={`w-4 h-4 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.446a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.54 1.118l-3.368-2.446a1 1 0 00-1.175 0l-3.368 2.446c-.784.57-1.838-.197-1.539-1.118l1.287-3.955a1 1 0 00-.364-1.118L2.06 9.382c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
    </svg>
  );

  return (
    <Link to={`/course/${course.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transform group-hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full">
        <img className="w-full h-48 object-cover" src={course.imageUrl} alt={course.title} />
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-primary-600 bg-primary-100 px-2 py-1 rounded">{course.category}</span>
               <div className="flex items-center" role="img" aria-label={`التقييم: ${course.rating.toFixed(1)} من 5 نجوم`}>
                  {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} filled={i < Math.round(course.rating)} />
                  ))}
                  <span className="text-xs text-gray-500 mr-2" aria-hidden="true">{course.rating.toFixed(1)} ({course.reviews})</span>
              </div>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2 h-16 group-hover:text-primary-600 transition-colors">{course.title}</h3>
          <div className="flex items-center text-gray-600 mb-4">
            <img src={course.instructorAvatar} alt={course.instructor} className="w-8 h-8 rounded-full object-cover ml-3" />
            <span>{course.instructor}</span>
          </div>
          
          {progress !== undefined && (
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>التقدم</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-auto">
            <span className="text-2xl font-bold text-primary-600">${course.price}</span>
            <span className="px-4 py-2 bg-primary-600 text-white rounded-md group-hover:bg-primary-700 transition-colors">
              {progress !== undefined ? 'متابعة التعلم' : 'عرض التفاصيل'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
