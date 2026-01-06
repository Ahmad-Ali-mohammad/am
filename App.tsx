
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import PricingPage from './pages/PricingPage';
import FAQPage from './pages/FAQPage';
import ContentLibraryPage from './pages/ContentLibraryPage';
import LearningPathsPage from './pages/LearningPathsPage';
import LearningPathDetailPage from './pages/LearningPathDetailPage';
import InstitutesPage from './pages/InstitutesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import ProtectedRoute from './components/ProtectedRoute';
import { UserRole } from './types';
import EducationalStagePage from './pages/EducationalStagePage';
import SkillsPage from './pages/SkillsPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import TwoFactorAuthPage from './pages/TwoFactorAuthPage';
import CourseEditorPage from './pages/CourseEditorPage';
import SyrianUniversitiesPage from './pages/SyrianUniversitiesPage';
import UniversityDetailPage from './pages/UniversityDetailPage';
import RewardsPage from './pages/RewardsPage';
import AdvancedSearchPage from './pages/AdvancedSearchPage';
import CalendarPage from './pages/CalendarPage';
import StudyGroupsPage from './pages/StudyGroupsPage';
import LiveLecturePage from './pages/LiveLecturePage';
import SpecialNeedsPage from './pages/SpecialNeedsPage';
import CareersPage from './pages/CareersPage';
import MaintenancePage from './pages/MaintenancePage';
import SyrianCurriculumPage from './pages/SyrianCurriculumPage';

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/course/:courseId" element={<CourseDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/institutes" element={<InstitutesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/stages/:stageName" element={<EducationalStagePage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/content-library" element={<ContentLibraryPage />} />
          <Route path="/learning-paths" element={<LearningPathsPage />} />
          <Route path="/learning-paths/:pathId" element={<LearningPathDetailPage />} />
          <Route path="/syrian-universities" element={<SyrianUniversitiesPage />} />
          <Route path="/syrian-curriculum" element={<SyrianCurriculumPage />} />
          <Route path="/university/:uniId" element={<UniversityDetailPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/advanced-search" element={<AdvancedSearchPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/study-groups" element={<StudyGroupsPage />} />
          <Route path="/live-lecture/:lectureId" element={<LiveLecturePage />} />
          <Route path="/special-needs" element={<SpecialNeedsPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
          <Route 
            path="/dashboard/*" 
            element={
              <ProtectedRoute roles={[UserRole.STUDENT, UserRole.INSTRUCTOR, UserRole.ADMIN, UserRole.CONTENT_MANAGER]}>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
           <Route 
            path="/2fa" 
            element={
              <ProtectedRoute roles={[UserRole.INSTRUCTOR, UserRole.ADMIN, UserRole.CONTENT_MANAGER]}>
                <TwoFactorAuthPage />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/create-course"
            element={
              <ProtectedRoute roles={[UserRole.INSTRUCTOR]}>
                <CourseEditorPage />
              </ProtectedRoute>
            }
          />
           <Route 
            path="/edit-course/:courseId"
            element={
              <ProtectedRoute roles={[UserRole.INSTRUCTOR]}>
                <CourseEditorPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
