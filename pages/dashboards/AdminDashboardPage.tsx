import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { UserRole, Course, CourseStatus, UserStatus, User } from '../../types';
import { MOCK_COURSES, MOCK_AUDIT_LOGS, ALL_MOCK_USERS } from '../../constants';

// Icon Imports
import { BookOpenIcon } from '../../components/icons/BookOpenIcon';
import { AcademicCapIcon } from '../../components/icons/AcademicCapIcon';
import { UserGroupIcon } from '../../components/icons/UserGroupIcon';
import { MagnifyingGlassIcon } from '../../components/icons/MagnifyingGlassIcon';
import { PencilSquareIcon } from '../../components/icons/PencilSquareIcon';
import { NoSymbolIcon } from '../../components/icons/NoSymbolIcon';
import { TrashIcon } from '../../components/icons/TrashIcon';
import { EllipsisVerticalIcon } from '../../components/icons/EllipsisVerticalIcon';
import { CurrencyDollarIcon } from '../../components/icons/CurrencyDollarIcon';
import { CheckCircleIcon } from '../../components/icons/CheckCircleIcon';
import { XCircleIcon } from '../../components/icons/XCircleIcon';
import { PlayCircleIcon } from '../../components/icons/PlayCircleIcon';
import { UserPlusIcon } from '../../components/icons/UserPlusIcon';
import { Cog8ToothIcon } from '../../components/icons/Cog8ToothIcon';
import { ChartBarSquareIcon } from '../../components/icons/ChartBarSquareIcon';

// --- Reusable Components ---
const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string; }> = ({ icon, label, value }) => ( <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex items-center"> <div className="ml-4 flex-shrink-0">{icon}</div> <div> <h3 className="text-sm font-medium text-gray-500">{label}</h3> <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">{value}</p> </div> </div> );
const getStatusBadge = (status: CourseStatus | UserStatus) => { switch(status) { case 'Approved': case 'active': return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">{status === 'active' ? 'نشط' : 'معتمد'}</span>; case 'Pending Review': case 'pending': return <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">{status === 'pending' ? 'معلق' : 'قيد المراجعة'}</span>; case 'Needs Revision': case 'suspended': return <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">{status === 'suspended' ? 'موقوف' : 'يحتاج لمراجعة'}</span>; case 'Draft': return <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 rounded-full">مسودة</span>; default: return null; } }

// --- Dashboard Content Components ---

const UserRolesChart: React.FC = () => {
    const roleCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        ALL_MOCK_USERS.forEach(user => {
            counts[user.role] = (counts[user.role] || 0) + 1;
        });
        return counts;
    }, []);
    const totalUsers = ALL_MOCK_USERS.length;
    const colors: Record<UserRole, string> = { [UserRole.STUDENT]: 'bg-primary-500', [UserRole.INSTRUCTOR]: 'bg-green-500', [UserRole.ADMIN]: 'bg-red-500', [UserRole.CONTENT_MANAGER]: 'bg-yellow-500', [UserRole.VISITOR]: 'bg-gray-500'};
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-4">توزيع المستخدمين</h3>
            <div className="space-y-3">
                {Object.entries(roleCounts).map(([role, count]) => {
                    // FIX: Explicitly cast `count` to a number to avoid potential type inference issues in the arithmetic operation.
                    const percentage = totalUsers > 0 ? ((Number(count) / totalUsers) * 100).toFixed(1) : "0";
                    return (
                        <div key={role}>
                            <div className="flex justify-between mb-1 text-sm font-medium">
                                <span className="text-gray-700">{role}</span>
                                <span className="text-gray-500">{count} مستخدم ({percentage}%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className={`${colors[role as UserRole]} h-2.5 rounded-full`} style={{width: `${percentage}%`}}></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export const AdminOverview: React.FC = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={<UserGroupIcon className="w-8 h-8 text-primary-500"/>} label="إجمالي المستخدمين" value={ALL_MOCK_USERS.length.toString()} />
            <StatCard icon={<BookOpenIcon className="w-8 h-8 text-green-500"/>} label="إجمالي الدورات" value={MOCK_COURSES.length.toString()} />
            <StatCard icon={<AcademicCapIcon className="w-8 h-8 text-indigo-500"/>} label="المدربين" value={ALL_MOCK_USERS.filter(u => u.role === UserRole.INSTRUCTOR).length.toString()} />
            <StatCard icon={<CurrencyDollarIcon className="w-8 h-8 text-yellow-500"/>} label="إجمالي الإيرادات (محاكاة)" value="$15,750" />
        </div>
        <UserRolesChart />
    </div>
);

export const UserManagementTable: React.FC = () => {
    const [users] = useState<User[]>(ALL_MOCK_USERS);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const filteredUsers = users
        .filter(user => roleFilter === 'All' || user.role === roleFilter)
        .filter(user => statusFilter === 'All' || user.status === statusFilter)
        .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()));

    const renderUserActions = (user: User) => {
        switch (user.status) {
            case 'pending':
                return <>
                    <button className="flex items-center w-full text-right px-4 py-2 text-sm text-green-700 hover:bg-green-50"><CheckCircleIcon className="w-4 h-4 ml-2"/>موافقة</button>
                    <button className="flex items-center w-full text-right px-4 py-2 text-sm text-red-700 hover:bg-red-50"><XCircleIcon className="w-4 h-4 ml-2"/>رفض</button>
                </>;
            case 'active':
                 return <>
                    <button className="flex items-center w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><PencilSquareIcon className="w-4 h-4 ml-2"/>تعديل</button>
                    <button className="flex items-center w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><UserPlusIcon className="w-4 h-4 ml-2"/>تغيير الدور</button>
                    <button className="flex items-center w-full text-right px-4 py-2 text-sm text-orange-700 hover:bg-orange-50"><NoSymbolIcon className="w-4 h-4 ml-2"/>تعليق</button>
                    <button className="flex items-center w-full text-right px-4 py-2 text-sm text-red-700 hover:bg-red-50"><TrashIcon className="w-4 h-4 ml-2"/>حذف</button>
                </>;
            case 'suspended':
                 return <>
                    <button className="flex items-center w-full text-right px-4 py-2 text-sm text-green-700 hover:bg-green-50"><PlayCircleIcon className="w-4 h-4 ml-2"/>تفعيل</button>
                    <button className="flex items-center w-full text-right px-4 py-2 text-sm text-red-700 hover:bg-red-50"><TrashIcon className="w-4 h-4 ml-2"/>حذف</button>
                </>;
            default:
                return null;
        }
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">إدارة المستخدمين</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="relative md:col-span-1">
                    <input type="text" placeholder="بحث بالاسم أو الإيميل..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"/>
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"/>
                </div>
                 <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md"> <option value="All">كل الأدوار</option> {Object.values(UserRole).map(r => <option key={r} value={r}>{r}</option>)} </select>
                 <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md"> <option value="All">كل الحالات</option> <option value="active">نشط</option> <option value="pending">قيد المراجعة</option> <option value="suspended">موقوف</option> </select>
            </div>
             <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المستخدم</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الدور</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تاريخ الانضمام</th><th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">الإجراءات</th></tr></thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center"><img className="h-10 w-10 rounded-full ml-4" src={user.avatarUrl} alt="" /><div><div className="text-sm font-medium text-gray-900">{user.name}</div><div className="text-sm text-gray-500">{user.email}</div></div></div></td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(user.status)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joinDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                    <div className="relative inline-block text-left" ref={menuRef}>
                                        <button onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)} className="p-1 rounded-full hover:bg-gray-100"><EllipsisVerticalIcon className="w-5 h-5"/></button>
                                        {openMenuId === user.id && (
                                            <div className="origin-top-left absolute left-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                                                <div className="py-1" role="menu" aria-orientation="vertical">
                                                    {renderUserActions(user)}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export const AdminContentManagement: React.FC = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">إدارة جميع الدورات</h2>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الدورة</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المدرب</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th></tr></thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {MOCK_COURSES.map(course => (
                        <tr key={course.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.instructor}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(course.status)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-reverse space-x-2">
                                {course.status === 'Pending Review' && <>
                                    <button className="px-3 py-1 text-xs text-white bg-green-600 rounded-md hover:bg-green-700">اعتماد</button>
                                    <button className="px-3 py-1 text-xs text-white bg-yellow-600 rounded-md hover:bg-yellow-700">طلب تعديل</button>
                                </>}
                                <Link to={`/course/${course.id}`} className="px-3 py-1 text-xs text-primary-800 bg-primary-100 rounded-md hover:bg-primary-200">عرض</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export const AuditLogTable: React.FC = () => ( <div className="bg-white p-6 rounded-lg shadow-md"> <h2 className="text-xl font-bold text-gray-800 mb-4">سجل الأنشطة</h2> <div className="overflow-x-auto"> <table className="min-w-full divide-y divide-gray-200"> <thead className="bg-gray-50"> <tr> <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المستخدم</th> <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراء</th> <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التوقيت</th> <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">عنوان IP</th> </tr> </thead> <tbody className="bg-white divide-y divide-gray-200"> {MOCK_AUDIT_LOGS.map(log => ( <tr key={log.id}> <td className="px-6 py-4 whitespace-nowrap"> <div className="flex items-center"> <img className="h-10 w-10 rounded-full ml-4" src={log.user.avatarUrl} alt="" /> <div><div className="text-sm font-medium text-gray-900">{log.user.name}</div></div> </div> </td> <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.action}</td> <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp}</td> <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.ipAddress}</td> </tr> ))} </tbody> </table> </div> </div> );

export const SystemSettings: React.FC = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-6">إعدادات النظام العامة</h2>
        <div className="space-y-6 max-w-lg">
             <div>
                <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">اسم المنصة</label>
                <input type="text" id="siteName" defaultValue="المنصّة" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"/>
            </div>
             <div className="flex items-center justify-between">
                <span className="flex-grow flex flex-col">
                    <span className="text-sm font-medium text-gray-900">وضع الصيانة</span>
                    <span className="text-sm text-gray-500">سيؤدي هذا إلى تعطيل الوصول العام للموقع.</span>
                </span>
                <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" className="sr-only peer" /><div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div></label>
            </div>
            <div className="pt-4 border-t">
                 <button className="px-5 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-sm font-medium">حفظ التغييرات</button>
            </div>
        </div>
    </div>
);

export const Reports: React.FC = () => (
     <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <ChartBarSquareIcon className="w-16 h-16 mx-auto text-gray-300" />
        <h3 className="text-2xl font-bold text-gray-800 mt-4">مركز التقارير</h3>
        <p className="text-gray-500 mt-2 max-w-lg mx-auto">هنا يمكنك توليد وعرض تقارير شاملة عن أداء المنصة، بما في ذلك تسجيل الطلاب، إيرادات الدورات، وأداء المدربين.</p>
    </div>
);