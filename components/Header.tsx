
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import { UserCircleIcon } from './icons/UserCircleIcon';
import { ArrowRightOnRectangleIcon } from './icons/ArrowRightOnRectangleIcon';
import { Squares2x2Icon } from './icons/Squares2x2Icon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { MagnifyingGlassIcon } from './icons/MagnifyingGlassIcon';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isStagesMenuOpen, setIsStagesMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
    navigate('/');
  };
  
  const getDashboardPath = () => {
    if (!user) return "/";
    return "/dashboard";
  }

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-gray-800 ml-8">
                المنصّة
              </Link>
               <nav className="hidden lg:flex items-center space-x-reverse space-x-6">
                <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors font-bold text-sm">الرئيسية</Link>
                <Link to="/courses" className="text-gray-600 hover:text-primary-600 transition-colors font-bold text-sm">الدورات</Link>
                <Link to="/syrian-curriculum" className="text-primary-600 hover:text-primary-700 transition-colors font-bold text-sm">المنهج السوري</Link>
                <Link to="/learning-paths" className="text-gray-600 hover:text-primary-600 transition-colors font-bold text-sm">المسارات التعليمية</Link>
                <Link to="/syrian-universities" className="text-gray-600 hover:text-primary-600 transition-colors font-bold text-sm">دليل الجامعات</Link>
                 {/* Stages Dropdown */}
                 <div className="relative" onMouseLeave={() => setIsStagesMenuOpen(false)}>
                    <button onMouseEnter={() => setIsStagesMenuOpen(true)} className="flex items-center text-gray-600 hover:text-primary-600 transition-colors focus:outline-none font-bold text-sm">
                        المراحل الدراسية
                        <ChevronDownIcon className={`w-4 h-4 mr-1 transition-transform ${isStagesMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isStagesMenuOpen && (
                        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                            <Link to="/stages/primary" onClick={() => setIsStagesMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-right">ابتدائي</Link>
                            <Link to="/stages/preparatory" onClick={() => setIsStagesMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-right">إعدادي</Link>
                            <Link to="/stages/secondary" onClick={() => setIsStagesMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-right">ثانوي</Link>
                            <Link to="/stages/academic" onClick={() => setIsStagesMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-right">أكاديمي</Link>
                        </div>
                    )}
                </div>
                 {/* More Dropdown */}
                <div className="relative" onMouseLeave={() => setIsMoreMenuOpen(false)}>
                    <button onMouseEnter={() => setIsMoreMenuOpen(true)} className="flex items-center text-gray-600 hover:text-primary-600 transition-colors focus:outline-none font-bold text-sm">
                        المزيد
                        <ChevronDownIcon className={`w-4 h-4 mr-1 transition-transform ${isMoreMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isMoreMenuOpen && (
                        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                            <Link to="/content-library" onClick={() => setIsMoreMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-right">مكتبة المحتوى</Link>
                            <Link to="/skills" onClick={() => setIsMoreMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-right">تعلم مهنة</Link>
                            <Link to="/rewards" onClick={() => setIsMoreMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-right">المكافآت</Link>
                            <Link to="/study-groups" onClick={() => setIsMoreMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-right">مجموعات دراسية</Link>
                            <Link to="/calendar" onClick={() => setIsMoreMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-right">التقويم</Link>
                            <Link to="/advanced-search" onClick={() => setIsMoreMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-right">بحث متقدم</Link>
                            <Link to="/institutes" onClick={() => setIsMoreMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-right">الشركاء</Link>
                            <Link to="/about" onClick={() => setIsMoreMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-right">من نحن</Link>
                            <Link to="/contact" onClick={() => setIsMoreMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-right">تواصل معنا</Link>
                        </div>
                    )}
                </div>
              </nav>
            </div>
            
             <div className="hidden xl:flex flex-1 mx-8 justify-center">
                <div className="relative w-full max-w-xs">
                    <input 
                        type="search" 
                        placeholder="ابحث..."
                        className="w-full pl-10 pr-4 py-1.5 border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-400 text-sm"
                    />
                    <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"/>
                </div>
            </div>


            <div className="flex items-center">
              {user ? (
                <div className="relative">
                  <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 rounded-full">
                    <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                  </button>
                  {isProfileMenuOpen && (
                    <div 
                      className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-50 ring-1 ring-black ring-opacity-5"
                      onMouseLeave={() => setIsProfileMenuOpen(false)}
                    >
                      <div className="px-4 py-3 border-b border-gray-200 text-right">
                        <p className="font-semibold text-sm text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.role}</p>
                      </div>
                      <div className="py-1">
                        <Link to={getDashboardPath()} onClick={() => setIsProfileMenuOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-right justify-end">
                          لوحة التحكم
                          <Squares2x2Icon className="w-5 h-5 mr-3 text-gray-400" />
                        </Link>
                         <Link to="/dashboard/profile" onClick={() => setIsProfileMenuOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-right justify-end">
                          ملفي الشخصي
                          <UserCircleIcon className="w-5 h-5 mr-3 text-gray-400" />
                        </Link>
                      </div>
                      <div className="py-1 border-t border-gray-200">
                        <button onClick={handleLogout} className="flex items-center w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 justify-end">
                           تسجيل الخروج
                           <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center">
                  <Link to="/login" className="px-5 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-sm font-medium transition-colors">
                    تسجيل الدخول
                  </Link>
                </div>
              )}
              <div className="lg:hidden ml-4">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 focus:outline-none">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                </button>
              </div>
            </div>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200 text-right">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block py-2 px-4 text-gray-600 hover:bg-gray-50 rounded font-bold">الرئيسية</Link>
              <Link to="/courses" onClick={() => setIsMenuOpen(false)} className="block py-2 px-4 text-gray-600 hover:bg-gray-50 rounded font-bold">الدورات</Link>
              <Link to="/syrian-curriculum" onClick={() => setIsMenuOpen(false)} className="block py-2 px-4 text-primary-600 hover:bg-gray-50 rounded font-bold">المنهج السوري</Link>
              <Link to="/syrian-universities" onClick={() => setIsMenuOpen(false)} className="block py-2 px-4 text-gray-600 hover:bg-gray-50 rounded font-bold">دليل الجامعات</Link>
              <Link to="/content-library" onClick={() => setIsMenuOpen(false)} className="block py-2 px-4 text-gray-600 hover:bg-gray-50 rounded font-bold">مكتبة المحتوى</Link>
              <Link to="/learning-paths" onClick={() => setIsMenuOpen(false)} className="block py-2 px-4 text-gray-600 hover:bg-gray-50 rounded font-bold">المسارات التعليمية</Link>
              <Link to="/skills" onClick={() => setIsMenuOpen(false)} className="block py-2 px-4 text-gray-600 hover:bg-gray-50 rounded font-bold">تعلم مهنة</Link>
              <Link to="/rewards" onClick={() => setIsMenuOpen(false)} className="block py-2 px-4 text-gray-600 hover:bg-gray-50 rounded font-bold">المكافآت</Link>
              <Link to="/study-groups" onClick={() => setIsMenuOpen(false)} className="block py-2 px-4 text-gray-600 hover:bg-gray-50 rounded font-bold">مجموعات دراسية</Link>
              <Link to="/calendar" onClick={() => setIsMenuOpen(false)} className="block py-2 px-4 text-gray-600 hover:bg-gray-50 rounded font-bold">التقويم</Link>
              <Link to="/advanced-search" onClick={() => setIsMenuOpen(false)} className="block py-2 px-4 text-gray-600 hover:bg-gray-50 rounded font-bold">بحث متقدم</Link>
              <Link to="/institutes" onClick={() => setIsMenuOpen(false)} className="block py-2 px-4 text-gray-600 hover:bg-gray-50 rounded font-bold">الشركاء</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block py-2 px-4 text-gray-600 hover:bg-gray-50 rounded font-bold">من نحن</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block py-2 px-4 text-gray-600 hover:bg-gray-50 rounded font-bold">تواصل معنا</Link>

              {!user && (
                 <Link to="/login" onClick={() => setIsMenuOpen(false)} className="mt-4 block text-center w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                  تسجيل الدخول
                </Link>
              )}
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
