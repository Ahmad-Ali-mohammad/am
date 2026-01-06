
import React, { useState, useRef } from 'react';
import { UserRole, UserStatus, User } from '../../../types';
import { ALL_MOCK_USERS } from '../../../constants';

// Icon Imports
import { MagnifyingGlassIcon } from '../../../components/icons/MagnifyingGlassIcon';
import { PencilSquareIcon } from '../../../components/icons/PencilSquareIcon';
import { NoSymbolIcon } from '../../../components/icons/NoSymbolIcon';
import { TrashIcon } from '../../../components/icons/TrashIcon';
import { EllipsisVerticalIcon } from '../../../components/icons/EllipsisVerticalIcon';
import { CheckCircleIcon } from '../../../components/icons/CheckCircleIcon';
import { XCircleIcon } from '../../../components/icons/XCircleIcon';
import { PlayCircleIcon } from '../../../components/icons/PlayCircleIcon';
import { UserPlusIcon } from '../../../components/icons/UserPlusIcon';

const getStatusBadge = (status: UserStatus) => { 
    switch(status) { 
        case 'active': return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">نشط</span>; 
        case 'pending': return <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">معلق</span>; 
        case 'suspended': return <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">موقوف</span>; 
        default: return null; 
    } 
}

const UserManagementPage: React.FC = () => {
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
            <h1 className="text-3xl font-bold text-gray-800 mb-1">إدارة المستخدمين</h1>
            <p className="text-gray-500 mb-6">عرض وتعديل وإدارة جميع حسابات المستخدمين في المنصة.</p>
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

export default UserManagementPage;
