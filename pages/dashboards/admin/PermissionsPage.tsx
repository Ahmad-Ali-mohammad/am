
import React, { useState } from 'react';
import { UserRole } from '../../../types';
import { MOCK_AUDIT_LOGS } from '../../../constants';
import { ChevronDownIcon } from '../../../components/icons/ChevronDownIcon';
import { MagnifyingGlassIcon } from '../../../components/icons/MagnifyingGlassIcon';

// Mock Data
const ALL_ROLES = [UserRole.ADMIN, UserRole.CONTENT_MANAGER, UserRole.INSTRUCTOR, UserRole.STUDENT];

interface Permission {
  id: string;
  label: string;
  children?: Permission[];
}

const PERMISSIONS_TREE: Permission[] = [
    { id: 'users', label: 'إدارة المستخدمين', children: [
        { id: 'users.view', label: 'عرض المستخدمين' },
        { id: 'users.edit', label: 'تعديل المستخدمين' },
        { id: 'users.delete', label: 'حذف المستخدمين' },
        { id: 'users.change_role', label: 'تغيير أدوار المستخدمين' },
    ]},
    { id: 'courses', label: 'إدارة الدورات', children: [
        { id: 'courses.view_all', label: 'عرض جميع الدورات' },
        { id: 'courses.approve', label: 'اعتماد/رفض الدورات' },
        { id: 'courses.edit_any', label: 'تعديل أي دورة' },
    ]},
    { id: 'billing', label: 'إدارة الفواتير', children: [
        { id: 'billing.view_reports', label: 'عرض تقارير الإيرادات' },
        { id: 'billing.manage_plans', label: 'إدارة خطط الأسعار' },
    ]},
    { id: 'settings', label: 'إعدادات النظام', children: [
        { id: 'settings.manage_general', label: 'تعديل الإعدادات العامة' },
        { id: 'settings.manage_integrations', label: 'إدارة التكاملات' },
    ]}
];

const MOCK_ROLE_PERMISSIONS: Record<UserRole, string[]> = {
    [UserRole.ADMIN]: ['users.view', 'users.edit', 'users.delete', 'users.change_role', 'courses.view_all', 'courses.approve', 'courses.edit_any', 'billing.view_reports', 'billing.manage_plans', 'settings.manage_general', 'settings.manage_integrations'],
    [UserRole.CONTENT_MANAGER]: ['courses.view_all', 'courses.approve'],
    [UserRole.INSTRUCTOR]: [],
    [UserRole.STUDENT]: [],
    [UserRole.VISITOR]: [],
};

// Sub-components
const PermissionNode: React.FC<{ node: Permission; checked: boolean; onToggle: (id: string, isChecked: boolean) => void; isChild?: boolean }> = ({ node, checked, onToggle, isChild = false }) => {
    const [isOpen, setIsOpen] = useState(true);
    const hasChildren = node.children && node.children.length > 0;

    return (
        <div className={isChild ? 'mr-6' : ''}>
            <div className="flex items-center p-2 rounded-md hover:bg-gray-100">
                {hasChildren && <ChevronDownIcon className={`w-5 h-5 ml-2 cursor-pointer transition-transform ${isOpen ? '' : '-rotate-90'}`} onClick={() => setIsOpen(!isOpen)} />}
                <input type="checkbox" id={node.id} checked={checked} onChange={e => onToggle(node.id, e.target.checked)} className="ml-2 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"/>
                <label htmlFor={node.id} className="text-gray-800 font-semibold">{node.label}</label>
            </div>
            {isOpen && hasChildren && (
                <div className="mt-2 space-y-2 border-r-2 border-gray-200 mr-3 pr-3">
                    {node.children?.map(child => (
                        <PermissionNode key={child.id} node={child} checked={checked} onToggle={onToggle} isChild />
                    ))}
                </div>
            )}
        </div>
    );
};

const PermissionsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('roles');
    const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.CONTENT_MANAGER);
    const [permissions, setPermissions] = useState<string[]>(MOCK_ROLE_PERMISSIONS[selectedRole]);

    const handleRoleChange = (role: UserRole) => {
        setSelectedRole(role);
        setPermissions(MOCK_ROLE_PERMISSIONS[role] || []);
    };
    
    const handlePermissionToggle = (id: string, isChecked: boolean) => {
        // This is a simplified toggle logic for demonstration.
        // A real implementation would handle parent/child relationships.
        setPermissions(prev => isChecked ? [...prev, id] : prev.filter(p => p !== id));
    };

    const tabs = [
        { id: 'roles', label: 'إدارة الأدوار والصلاحيات' },
        { id: 'hierarchy', label: 'التدرج الإداري' },
        { id: 'monitoring', label: 'مراقبة الوصول' },
        { id: 'audit', label: 'أدوات التدقيق' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">إدارة الصلاحيات المتقدمة</h1>
                <p className="text-gray-500 mt-1">تحكم دقيق في أدوار المستخدمين وصلاحيات الوصول وأمان النظام.</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-2">
                <nav className="flex space-x-4 space-x-reverse" aria-label="Tabs">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 font-medium text-sm rounded-md transition-colors ${activeTab === tab.id ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                           {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Content for each tab */}
            <div className="bg-white rounded-lg shadow-md p-6">
                {activeTab === 'roles' && (
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         {/* Roles List */}
                         <div className="md:col-span-1 border-l border-gray-200 pl-6">
                             <h3 className="font-bold text-lg mb-4">الأدوار</h3>
                             <div className="space-y-2">
                                 {ALL_ROLES.map(role => (
                                     <button key={role} onClick={() => handleRoleChange(role)} className={`w-full text-right p-3 rounded-md text-sm font-semibold ${selectedRole === role ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-50'}`}>{role}</button>
                                 ))}
                             </div>
                         </div>
                         {/* Permissions Tree */}
                         <div className="md:col-span-2">
                             <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-lg">صلاحيات دور: <span className="text-primary-600">{selectedRole}</span></h3>
                                <select className="text-sm border-gray-300 rounded-md">
                                    <option>نسخ الصلاحيات من...</option>
                                    {ALL_ROLES.filter(r => r !== selectedRole).map(r => <option key={r}>{r}</option>)}
                                </select>
                             </div>
                             <div className="space-y-4 p-4 border rounded-md max-h-96 overflow-y-auto">
                                {PERMISSIONS_TREE.map(node => (
                                    <PermissionNode key={node.id} node={node} checked={permissions.includes(node.id)} onToggle={handlePermissionToggle} />
                                ))}
                             </div>
                              <div className="mt-6 text-left">
                                <button className="bg-primary-600 text-white font-bold py-2 px-6 rounded-md hover:bg-primary-700">حفظ التغييرات</button>
                            </div>
                         </div>
                     </div>
                )}
                {activeTab === 'hierarchy' && (
                     <div>
                        <h3 className="font-bold text-lg mb-4">الهيكل التنظيمي (مثال)</h3>
                         <div className="p-4 bg-gray-50 rounded-md text-center text-sm text-gray-600">سيتم عرض مخطط مرئي للهيكل التنظيمي هنا.</div>
                          <h3 className="font-bold text-lg mt-8 mb-4">تفويض الصلاحيات المؤقت</h3>
                         <div className="p-4 border rounded-md grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium">من المستخدم</label>
                                <input type="text" placeholder="خالد بن الوليد" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100" disabled />
                            </div>
                             <div>
                                <label className="block text-sm font-medium">إلى المستخدم</label>
                                <input type="text" placeholder="ابحث عن مستخدم..." className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                               <button className="w-full bg-primary-600 text-white font-bold py-2 px-4 rounded-md hover:bg-primary-700">تفويض</button>
                            </div>
                         </div>
                    </div>
                )}
                {activeTab === 'monitoring' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                           <h3 className="font-bold text-lg mb-4">خريطة حرارية للأنشطة (محاكاة)</h3>
                           <div className="p-4 bg-gray-50 rounded-md text-center text-sm text-gray-600">سيتم عرض خريطة الأنشطة هنا.</div>
                        </div>
                        <div>
                             <h3 className="font-bold text-lg mb-4">محاولات الوصول غير المصرح بها</h3>
                             <div className="text-center p-4 border rounded-md">
                                 <p className="text-gray-500 text-sm">لا توجد محاولات مشبوهة مسجلة حاليًا.</p>
                             </div>
                        </div>
                    </div>
                )}
                {activeTab === 'audit' && (
                     <div>
                        <h3 className="font-bold text-lg mb-4">بحث متقدم في سجلات الأنشطة</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 border rounded-md">
                            <input type="text" placeholder="بحث..." className="md:col-span-2 w-full px-4 py-2 border border-gray-300 rounded-md"/>
                            <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-500"/>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-md">
                                <option>كل الإجراءات</option>
                                <option>تسجيل دخول</option>
                                <option>تغيير صلاحيات</option>
                            </select>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50"><tr><th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">المستخدم</th><th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">الإجراء</th><th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">التوقيت</th></tr></thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {MOCK_AUDIT_LOGS.slice(0, 3).map(log => (
                                        <tr key={log.id}><td className="px-4 py-3">{log.user.name}</td><td className="px-4 py-3">{log.action}</td><td className="px-4 py-3">{log.timestamp}</td></tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                     </div>
                )}
            </div>
        </div>
    );
};

export default PermissionsPage;
