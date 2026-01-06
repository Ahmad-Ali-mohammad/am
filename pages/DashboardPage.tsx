
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import DashboardNav from '../components/DashboardNav';

// Import dashboard content components
import StudentDashboard from './dashboards/StudentDashboardPage';
import { InstructorCourseManagement, InstructorQA } from './dashboards/InstructorDashboardPage';
import { ContentReview, LibraryManagement, CategoryManagement, SkillsManagement } from './dashboards/ContentManagerDashboardPage';
import AdminDashboardLayout from './dashboards/admin/AdminDashboardLayout';
import ProfilePage from './ProfilePage';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Use window.location for safe global access in browser environment
      const currentPath = window.location.hash.split('?')[0];
      const dashboardBasePath = '#/dashboard';
      
      if (currentPath === dashboardBasePath || currentPath === `${dashboardBasePath}/`) {
         switch (user.role) {
            case UserRole.STUDENT:
                navigate('/dashboard/student');
                break;
            case UserRole.INSTRUCTOR:
                navigate('/dashboard/courses');
                break;
            case UserRole.CONTENT_MANAGER:
                navigate('/dashboard/review');
                break;
            case UserRole.ADMIN:
                navigate('/dashboard/overview');
                break;
            default:
                break;
         }
      }
    }
  }, [user, navigate]);


  const renderRoutesByRole = () => {
    if (!user) return null;

    switch (user.role) {
      case UserRole.STUDENT:
        return <Route path="/student" element={<StudentDashboard />} />;
      
      case UserRole.INSTRUCTOR:
        return (
          <>
            <Route path="/courses" element={<InstructorCourseManagement />} />
            <Route path="/qa" element={<InstructorQA />} />
          </>
        );

      case UserRole.CONTENT_MANAGER:
         return (
          <>
            <Route path="/review" element={<ContentReview />} />
            <Route path="/library" element={<LibraryManagement />} />
            <Route path="/categories" element={<CategoryManagement />} />
            <Route path="/skills-management" element={<SkillsManagement />} />
          </>
        );
      
      case UserRole.ADMIN:
        // Admin uses a nested layout with its own sidebar
        return <Route path="/*" element={<AdminDashboardLayout />} />;

      default:
        return <Route path="/" element={<div className="p-8 text-center text-gray-600">مرحباً بك في لوحة التحكم!</div>} />;
    }
  };

  return (
       <div className="bg-slate-100 min-h-screen">
        {/* Hide default dashboard nav for Admin as they have their own specific layout */}
        {user?.role !== UserRole.ADMIN && <DashboardNav />}
        
        <main className={`transition-all duration-300 ${user?.role === UserRole.ADMIN ? '' : 'pt-20'}`}>
          <div className={`${user?.role === UserRole.ADMIN ? '' : 'p-4 sm:p-6 md:p-8'}`}>
            <Routes>
                {renderRoutesByRole()}
                {/* Profile page is available to all dashboard roles */}
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </div>
        </main>
      </div>
  );
};

export default DashboardPage;
