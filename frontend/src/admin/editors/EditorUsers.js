import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon';
import { userAPI } from '../../api';
import ConfirmDialog from '../../components/ConfirmDialog';

const EditorUsers = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [showConfirm, setShowConfirm] = useState(null);
  const [error, setError] = useState('');
  
  useEffect(() => {
    loadUsers();
  }, []);
  
  const loadUsers = async () => {
    try {
      const res = await userAPI.getAll();
      setUsers(res.data);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddUser = () => {
    setEditingUser({
      name: '',
      email: '',
      password: '',
      role: 'viewer',
      is_active: true
    });
  };
  
  const handleSaveUser = async () => {
    if (!editingUser) return;
    setError('');
    
    try {
      if (editingUser.id) {
        const updateData = { ...editingUser };
        if (!updateData.password) delete updateData.password;
        await userAPI.update(editingUser.id, updateData);
      } else {
        await userAPI.create(editingUser);
      }
      await loadUsers();
      setEditingUser(null);
    } catch (error) {
      setError(error.response?.data?.detail || t('error'));
    }
  };
  
  const handleDelete = async (id) => {
    try {
      await userAPI.delete(id);
      await loadUsers();
      setShowConfirm(null);
    } catch (error) {
      alert(error.response?.data?.detail || t('error'));
    }
  };
  
  const handleToggleActive = async (user) => {
    try {
      await userAPI.update(user.id, { is_active: !user.is_active });
      await loadUsers();
    } catch (error) {
      console.error('Failed to toggle user:', error);
    }
  };
  
  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Icon name="Loader2" className="animate-spin" size={32} />
      </div>
    );
  }
  
  if (editingUser) {
    return (
      <div className="p-6 max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">
          {editingUser.id ? 'تعديل المستخدم' : 'إضافة مستخدم جديد'}
        </h2>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">{error}</div>
        )}
        
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">{t('name')}</label>
            <input
              type="text"
              value={editingUser.name}
              onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">{t('email')}</label>
            <input
              type="email"
              value={editingUser.email}
              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
              disabled={!!editingUser.id}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">
              {t('password')} {editingUser.id && '(اتركه فارغاً للإبقاء على الحالي)'}
            </label>
            <input
              type="password"
              value={editingUser.password || ''}
              onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required={!editingUser.id}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">{t('role')}</label>
            <select
              value={editingUser.role}
              onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
              className="w-full p-2 border rounded-lg"
            >
              <option value="admin">{t('admin')}</option>
              <option value="editor">{t('editor')}</option>
              <option value="viewer">{t('viewer')}</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={editingUser.is_active}
              onChange={(e) => setEditingUser({ ...editingUser, is_active: e.target.checked })}
              id="is_active"
            />
            <label htmlFor="is_active">حساب نشط</label>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSaveUser}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
            >
              <Icon name="Save" size={18} />
              {t('save')}
            </button>
            <button
              onClick={() => setEditingUser(null)}
              className="bg-slate-200 px-6 py-2 rounded-lg hover:bg-slate-300"
            >
              {t('cancel')}
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t('users')}</h2>
        <button
          onClick={handleAddUser}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <Icon name="UserPlus" size={18} />
          مستخدم جديد
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4">{t('name')}</th>
              <th className="p-4">{t('email')}</th>
              <th className="p-4">{t('role')}</th>
              <th className="p-4">الحالة</th>
              <th className="p-4">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-t hover:bg-slate-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      {user.name?.charAt(0) || 'U'}
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </td>
                <td className="p-4 text-slate-600">{user.email}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.role === 'admin' ? 'bg-red-100 text-red-700' :
                    user.role === 'editor' ? 'bg-blue-100 text-blue-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {user.role === 'admin' ? t('admin') : user.role === 'editor' ? t('editor') : t('viewer')}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleToggleActive(user)}
                    className={`px-2 py-1 rounded-full text-xs ${user.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                  >
                    {user.is_active ? 'نشط' : 'معطل'}
                  </button>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => setEditingUser(user)} className="p-2 text-blue-500 hover:bg-blue-50 rounded">
                      <Icon name="Edit2" size={18} />
                    </button>
                    <button onClick={() => setShowConfirm(user.id)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                      <Icon name="Trash2" size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <ConfirmDialog
        isOpen={!!showConfirm}
        onConfirm={() => handleDelete(showConfirm)}
        onCancel={() => setShowConfirm(null)}
      />
    </div>
  );
};

export default EditorUsers;
