import React, { useState } from 'react';
import { Routes, Route, NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { UserRole } from '../../../types';

// Page Components
import OverviewPage from './OverviewPage';
import RealtimeAnalyticsPage from './RealtimeAnalyticsPage';
import SystemHealthPage from './SystemHealthPage';
import UserManagementPage from './UserManagementPage';
import SmartUserManagementPage from './SmartUserManagementPage';
import ContentManagementPage from './ContentManagementPage';
import AuditLogPage from './AuditLogPage';
import ReportsPage from './ReportsPage';
import SettingsPage from './SettingsPage';
import PermissionsPage from './PermissionsPage';
import DigitalLibraryAdminPage from './DigitalLibraryPage';
import FinanceDashboardPage from './FinanceDashboardPage';
import CommunicationDashboardPage from './CommunicationDashboardPage';
import CurriculumDashboardPage from './CurriculumDashboardPage';
import ExcellenceDashboardPage from './ExcellenceDashboardPage';
import SurveysPage from './SurveysPage';
import PartnersAdminPage from './PartnersAdminPage';
import EmergencyPage from './EmergencyPage';
import SpecialNeedsAdminPage from './SpecialNeedsAdminPage';


// Icons
import { Squares2x2Icon } from '../../../components/icons/Squares2x2Icon';
import { SignalIcon } from '../../../components/icons/SignalIcon';
import { ServerIcon } from '../../../components/icons/ServerIcon';
import { UserGroupIcon } from '../../../components/icons/UserGroupIcon';
import { UsersCogIcon } from '../../../components/icons/UsersCogIcon';
import { BookOpenIcon } from '../../../components/icons/BookOpenIcon';
import { ShieldCheckIcon } from '../../../components/icons/ShieldCheckIcon';
import { ChartBarSquareIcon } from '../../../components/icons/ChartBarSquareIcon';
import { Cog8ToothIcon } from '../../../components/icons/Cog8ToothIcon';
import { KeyIcon } from '../../../components/icons/KeyIcon';
import { ArchiveBoxIcon } from '../../../components/icons/ArchiveBoxIcon';
import { ArrowRightOnRectangleIcon } from '../../../components/icons/ArrowRightOnRectangleIcon';
import { XMarkIcon } from '../../../components/icons/XMarkIcon';
import { Bars3Icon } from '../../../components/icons/Bars3Icon';
import { DocumentChartBarIcon } from '../../../components/icons/DocumentChartBarIcon';
import { HeartIcon } from '../../../components/icons/HeartIcon';
import { ShieldExclamationIcon } from '../../../components/icons/ShieldExclamationIcon';
import { BuildingStorefrontIcon } from '../../../components/icons/BuildingStorefrontIcon';


const NavItem: React.FC<{ to: string; icon: React.ReactNode; label: string; onClick?: () => void }> = ({ to, icon, label, onClick }) => (
    <NavLink to={to} onClick={onClick} className={({isActive}) => `flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${isActive ? 'bg-primary-600 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
        {icon}
        <span className="mr-3">{label}</span>
    </NavLink>
);

const AdminDashboardLayout: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    if (user?.role !== UserRole.ADMIN) {
        navigate('/dashboard');
        return null;
    }
    
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const sidebarContent = (
         <div className="flex flex-col h-full bg-slate-800 text-white">
            {/* Header / Logo Section */}
            <div className="px-6 py-8 border-b border-slate-700 flex-shrink-0">
                <Link to="/" className="text-2xl font-black text-center block tracking-tight">
                    المنصّة <span className="text-primary-500 text-xs block font-normal">لوحة التحكم الإدارية</span>
                </Link>
            </div>

            {/* Scrollable Navigation Section */}
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto scrollbar-hide custom-scrollbar">
                <p className="px-4 pb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">الرئيسية</p>
                <NavItem to="/dashboard/overview" icon={<Squares2x2Icon className="w-5 h-5"/>} label="نظرة عامة" onClick={() => setSidebarOpen(false)} />
                <NavItem to="/dashboard/realtime" icon={<SignalIcon className="w-5 h-5"/>} label="تحليلات حية" onClick={() => setSidebarOpen(false)} />
                <NavItem to="/dashboard/health" icon={<ServerIcon className="w-5 h-5"/>} label="صحة النظام" onClick={() => setSidebarOpen(false)} />
                
                <p className="px-4 pt-6 pb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">إدارة المستخدمين</p>
                <NavItem to="/dashboard/users" icon={<UserGroupIcon className="w-5 h-5"/>} label="المستخدمون" onClick={() => setSidebarOpen(false)} />
                <NavItem to="/dashboard/smart-users" icon={<UsersCogIcon className="w-5 h-5"/>} label="إدارة ذكية" onClick={() => setSidebarOpen(false)} />
                <NavItem to="/dashboard/communication" icon={<BookOpenIcon className="w-5 h-5"/>} label="التواصل" onClick={() => setSidebarOpen(false)} />
                <NavItem to="/dashboard/surveys" icon={<DocumentChartBarIcon className="w-5 h-5"/>} label="الاستبيانات" onClick={() => setSidebarOpen(false)} />
                
                <p className="px-4 pt-6 pb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">إدارة المحتوى</p>
                <NavItem to="/dashboard/content" icon={<BookOpenIcon className="w-5 h-5"/>} label="المحتوى التعليمي" onClick={() => setSidebarOpen(false)} />
                <NavItem to="/dashboard/curriculum" icon={<BookOpenIcon className="w-5 h-5"/>} label="تخصيص المناهج" onClick={() => setSidebarOpen(false)} />
                <NavItem to="/dashboard/excellence" icon={<BookOpenIcon className="w-5 h-5"/>} label="إدارة التميز" onClick={() => setSidebarOpen(false)} />
                <NavItem to="/dashboard/library" icon={<ArchiveBoxIcon className="w-5 h-5"/>} label="مكتبة المحتوى" onClick={() => setSidebarOpen(false)} />
                
                <p className="px-4 pt-6 pb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">الإدارة المتقدمة</p>
                <NavItem to="/dashboard/partners" icon={<BuildingStorefrontIcon className="w-5 h-5"/>} label="الشركاء" onClick={() => setSidebarOpen(false)} />
                <NavItem to="/dashboard/finance" icon={<BookOpenIcon className="w-5 h-5"/>} label="المالية" onClick={() => setSidebarOpen(false)} />
                <NavItem to="/dashboard/special-needs-admin" icon={<HeartIcon className="w-5 h-5"/>} label="ذوي الاحتياجات" onClick={() => setSidebarOpen(false)} />
                <NavItem to="/dashboard/permissions" icon={<KeyIcon className="w-5 h-5"/>} label="الصلاحيات" onClick={() => setSidebarOpen(false)} />
                <NavItem to="/dashboard/audit" icon={<ShieldCheckIcon className="w-5 h-5"/>} label="سجل الأنشطة" onClick={() => setSidebarOpen(false)} />
                <NavItem to="/dashboard/reports" icon={<ChartBarSquareIcon className="w-5 h-5"/>} label="التقارير" onClick={() => setSidebarOpen(false)} />
                <NavItem to="/dashboard/settings" icon={<Cog8ToothIcon className="w-5 h-5"/>} label="إعدادات النظام" onClick={() => setSidebarOpen(false)} />
                <NavItem to="/dashboard/emergency" icon={<ShieldExclamationIcon className="w-5 h-5"/>} label="الطوارئ والأزمات" onClick={() => setSidebarOpen(false)} />

            </nav>

            {/* Footer / Logout Section - Fixed at the bottom */}
            <div className="p-4 border-t border-slate-700 bg-slate-800 flex-shrink-0">
                <button 
                    onClick={handleLogout} 
                    className="flex items-center w-full px-4 py-3 rounded-lg text-sm font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all group"
                >
                    <ArrowRightOnRectangleIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="mr-3">تسجيل الخروج</span>
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-100 font-sans" dir="rtl">
            {/* Mobile Sidebar */}
             <div className={`fixed inset-y-0 right-0 z-50 w-72 bg-slate-800 shadow-2xl transition-transform duration-300 md:hidden ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                 <button onClick={() => setSidebarOpen(false)} className="absolute top-6 left-6 text-slate-400 hover:text-white z-50">
                     <XMarkIcon className="w-8 h-8" />
                 </button>
                 {sidebarContent}
             </div>
             {isSidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"></div>}

            {/* Desktop Sidebar */}
            <aside className="hidden md:block fixed inset-y-0 right-0 w-72 bg-slate-800 shadow-xl z-30">
                {sidebarContent}
            </aside>
            
            {/* Main Content Area */}
            <div className="md:pr-72 min-h-screen flex flex-col">
                 {/* Mobile Header */}
                <header className="md:hidden bg-white shadow-sm h-16 flex items-center justify-between px-6 sticky top-0 z-20">
                    <Link to="/" className="text-xl font-black text-gray-800">المنصّة</Link>
                    <button onClick={() => setSidebarOpen(true)} className="p-2 text-gray-600 bg-gray-100 rounded-lg">
                        <Bars3Icon className="w-6 h-6" />
                    </button>
                </header>

                <main className="p-4 sm:p-6 md:p-10 flex-grow overflow-x-hidden">
                    <Routes>
                        <Route path="overview" element={<OverviewPage />} />
                        <Route path="realtime" element={<RealtimeAnalyticsPage />} />
                        <Route path="health" element={<SystemHealthPage />} />
                        <Route path="users" element={<UserManagementPage />} />
                        <Route path="smart-users" element={<SmartUserManagementPage />} />
                        <Route path="content" element={<ContentManagementPage />} />
                        <Route path="audit" element={<AuditLogPage />} />
                        <Route path="reports" element={<ReportsPage />} />
                        <Route path="settings" element={<SettingsPage />} />
                        <Route path="permissions" element={<PermissionsPage />} />
                        <Route path="library" element={<DigitalLibraryAdminPage />} />
                        <Route path="finance" element={<FinanceDashboardPage />} />
                        <Route path="communication" element={<CommunicationDashboardPage />} />
                        <Route path="curriculum" element={<CurriculumDashboardPage />} />
                        <Route path="excellence" element={<ExcellenceDashboardPage />} />
                        <Route path="surveys" element={<SurveysPage />} />
                        <Route path="partners" element={<PartnersAdminPage />} />
                        <Route path="emergency" element={<EmergencyPage />} />
                        <Route path="special-needs-admin" element={<SpecialNeedsAdminPage />} />
                        <Route path="*" element={<OverviewPage />} />
                    </Routes>
                </main>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #475569;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #64748b;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}} />
        </div>
    );
};

export default AdminDashboardLayout;