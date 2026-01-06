
import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';

// Icons
import { UserCircleIcon } from './icons/UserCircleIcon';
import { ArrowRightOnRectangleIcon } from './icons/ArrowRightOnRectangleIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { Bars3Icon } from './icons/Bars3Icon';
import { ChatBubbleLeftRightIcon } from './icons/ChatBubbleLeftRightIcon';
import { TagIcon } from './icons/TagIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { Squares2x2Icon } from './icons/Squares2x2Icon';

const NavItem: React.FC<{ to: string, label: string, onClick?: () => void }> = ({ to, label, onClick }) => (
    <NavLink 
        to={to} 
        end 
        onClick={onClick}
        className={({ isActive }) =>
            `px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
            isActive 
                ? 'bg-white text-primary-700 shadow-sm' 
                : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'
            }`
        }
    >
        {label}
    </NavLink>
);

const DashboardNav: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    if (!user || user.role === UserRole.ADMIN) return null;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const studentLinks = [
        { to: '/dashboard/student', label: 'دوراتي' },
        { to: '/dashboard/profile', label: 'ملفي الشخصي' },
        { to: '/content-library', label: 'مكتبة المحتوى' },
    ];
    
    const instructorLinks = [
        { to: '/dashboard/courses', label: 'إدارة الدورات' },
        { to: '/dashboard/qa', label: 'أسئلة الطلاب' },
        { to: '/content-library', label: 'مكتبة المحتوى' },
        { to: '/dashboard/profile', label: 'ملفي الشخصي' },
    ];
    
    const contentManagerLinks = [
        { to: '/dashboard/review', label: 'مراجعة المحتوى' },
        { to: '/dashboard/library', label: 'إدارة مكتبة المحتوى' },
        { to: '/dashboard/categories', label: 'التصنيفات' },
        { to: '/dashboard/skills-management', label: 'إدارة المهارات' },
        { to: '/dashboard/profile', label: 'ملفي الشخصي' },
    ];

    let navLinks;
    switch(user.role) {
        case UserRole.STUDENT: navLinks = studentLinks; break;
        case UserRole.INSTRUCTOR: navLinks = instructorLinks; break;
        case UserRole.CONTENT_MANAGER: navLinks = contentManagerLinks; break;
        default: navLinks = [];
    }

    return (
        <header className="bg-white shadow-sm fixed top-0 right-0 left-0 z-30 h-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link to="/" className="flex items-center text-sm font-bold text-slate-600 hover:text-primary-600 transition-colors group">
                        <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        العودة للمنصة
                    </Link>
                    <nav className="hidden md:flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl">
                        {navLinks.map(link => <NavItem key={link.to} {...link} />)}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center gap-2 focus:outline-none">
                            <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full object-cover"/>
                            <div className="hidden sm:block text-right">
                                <p className="text-sm font-bold text-slate-800">{user.name}</p>
                                <p className="text-xs text-slate-500">{user.role}</p>
                            </div>
                        </button>
                        {isProfileMenuOpen && (
                            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                                <div className="px-4 py-2 border-b sm:hidden">
                                     <p className="text-sm font-bold text-slate-800">{user.name}</p>
                                     <p className="text-xs text-slate-500">{user.role}</p>
                                </div>
                                <Link to="/dashboard/profile" onClick={() => setIsProfileMenuOpen(false)} className="flex items-center w-full text-right px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                                    <UserCircleIcon className="w-5 h-5 ml-2 text-slate-400" />
                                    عرض الملف الشخصي
                                </Link>
                                <button onClick={handleLogout} className="flex items-center w-full text-right px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                                    <ArrowRightOnRectangleIcon className="w-5 h-5 ml-2 text-slate-400" />
                                    تسجيل الخروج
                                </button>
                            </div>
                        )}
                    </div>
                     <div className="md:hidden">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600">
                            <Bars3Icon className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg p-4 border-t">
                    <nav className="flex flex-col gap-2">
                         {navLinks.map(link => (
                            <NavLink 
                                key={link.to}
                                to={link.to} 
                                end 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) => `px-4 py-3 rounded-lg text-base font-bold transition-colors ${isActive ? 'bg-primary-100 text-primary-700' : 'text-slate-600 hover:bg-slate-100'}`}
                            >
                                {link.label}
                            </NavLink>
                         ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default DashboardNav;
