import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon';
import { useContent } from '../../context/ContentContext';
import ConfirmDialog from '../../components/ConfirmDialog';

const EditorTeam = () => {
  const { t } = useTranslation();
  const { content, updateContent } = useContent();
  const [team, setTeam] = useState(content.team || []);
  const [departments, setDepartments] = useState(content.departments || []);
  const [editingMember, setEditingMember] = useState(null);
  const [editingDept, setEditingDept] = useState(null);
  const [showConfirm, setShowConfirm] = useState(null);
  const [activeTab, setActiveTab] = useState('team');
  
  const handleSaveTeam = () => updateContent('team', team);
  const handleSaveDepts = () => updateContent('departments', departments);
  
  const handleAddMember = () => {
    setEditingMember({
      id: `member_${Date.now()}`,
      name: '',
      role: '',
      departmentId: departments[0]?.id || '',
      image: '',
      bio: '',
      skills: [],
      experienceYears: 0,
      certifications: [],
      achievements: [],
      social: {}
    });
  };
  
  const handleSaveMember = () => {
    if (!editingMember) return;
    const exists = team.find(m => m.id === editingMember.id);
    let newTeam;
    if (exists) {
      newTeam = team.map(m => m.id === editingMember.id ? editingMember : m);
    } else {
      newTeam = [...team, editingMember];
    }
    setTeam(newTeam);
    updateContent('team', newTeam);
    setEditingMember(null);
  };
  
  const handleDeleteMember = (id) => {
    const newTeam = team.filter(m => m.id !== id);
    setTeam(newTeam);
    updateContent('team', newTeam);
    setShowConfirm(null);
  };
  
  const handleAddDept = () => {
    setEditingDept({ id: `dept_${Date.now()}`, name: '' });
  };
  
  const handleSaveDept = () => {
    if (!editingDept) return;
    const exists = departments.find(d => d.id === editingDept.id);
    let newDepts;
    if (exists) {
      newDepts = departments.map(d => d.id === editingDept.id ? editingDept : d);
    } else {
      newDepts = [...departments, editingDept];
    }
    setDepartments(newDepts);
    updateContent('departments', newDepts);
    setEditingDept(null);
  };
  
  if (editingMember) {
    return (
      <div className="p-6 max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">
          {editingMember.name ? 'تعديل عضو الفريق' : 'إضافة عضو جديد'}
        </h2>
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">الاسم</label>
              <input
                type="text"
                value={editingMember.name}
                onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">المنصب</label>
              <input
                type="text"
                value={editingMember.role}
                onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">القسم</label>
              <select
                value={editingMember.departmentId}
                onChange={(e) => setEditingMember({ ...editingMember, departmentId: e.target.value })}
                className="w-full p-2 border rounded-lg"
              >
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">سنوات الخبرة</label>
              <input
                type="number"
                value={editingMember.experienceYears}
                onChange={(e) => setEditingMember({ ...editingMember, experienceYears: parseInt(e.target.value) || 0 })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">رابط الصورة</label>
            <input
              type="text"
              value={editingMember.image}
              onChange={(e) => setEditingMember({ ...editingMember, image: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">السيرة الذاتية</label>
            <textarea
              value={editingMember.bio}
              onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
              className="w-full p-2 border rounded-lg"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">المهارات (مفصولة بفواصل)</label>
            <input
              type="text"
              value={editingMember.skills?.join(', ')}
              onChange={(e) => setEditingMember({ ...editingMember, skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">LinkedIn</label>
              <input
                type="text"
                value={editingMember.social?.linkedin || ''}
                onChange={(e) => setEditingMember({ ...editingMember, social: { ...editingMember.social, linkedin: e.target.value } })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Twitter</label>
              <input
                type="text"
                value={editingMember.social?.twitter || ''}
                onChange={(e) => setEditingMember({ ...editingMember, social: { ...editingMember.social, twitter: e.target.value } })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">البريد الإلكتروني</label>
              <input
                type="email"
                value={editingMember.social?.email || ''}
                onChange={(e) => setEditingMember({ ...editingMember, social: { ...editingMember.social, email: e.target.value } })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button onClick={handleSaveMember} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2">
              <Icon name="Save" size={18} />
              {t('save')}
            </button>
            <button onClick={() => setEditingMember(null)} className="bg-slate-200 px-6 py-2 rounded-lg hover:bg-slate-300">
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
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('team')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'team' ? 'bg-blue-500 text-white' : 'bg-slate-100'}`}
          >
            أعضاء الفريق
          </button>
          <button
            onClick={() => setActiveTab('departments')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'departments' ? 'bg-blue-500 text-white' : 'bg-slate-100'}`}
          >
            الأقسام
          </button>
        </div>
        <button
          onClick={activeTab === 'team' ? handleAddMember : handleAddDept}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <Icon name="Plus" size={18} />
          {activeTab === 'team' ? 'عضو جديد' : 'قسم جديد'}
        </button>
      </div>
      
      {activeTab === 'team' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map(member => (
            <div key={member.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <img src={member.image} alt={member.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-slate-500 text-sm">{member.role}</p>
                <p className="text-blue-500 text-xs mt-1">
                  {departments.find(d => d.id === member.departmentId)?.name}
                </p>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => setEditingMember(member)} className="flex-1 p-2 bg-blue-50 text-blue-500 rounded hover:bg-blue-100">
                    <Icon name="Edit2" size={18} className="mx-auto" />
                  </button>
                  <button onClick={() => setShowConfirm(member.id)} className="flex-1 p-2 bg-red-50 text-red-500 rounded hover:bg-red-100">
                    <Icon name="Trash2" size={18} className="mx-auto" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm">
          {editingDept && (
            <div className="p-4 border-b bg-slate-50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={editingDept.name}
                  onChange={(e) => setEditingDept({ ...editingDept, name: e.target.value })}
                  className="flex-1 p-2 border rounded-lg"
                  placeholder="اسم القسم"
                />
                <button onClick={handleSaveDept} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                  {t('save')}
                </button>
                <button onClick={() => setEditingDept(null)} className="px-4 py-2 bg-slate-200 rounded-lg">
                  {t('cancel')}
                </button>
              </div>
            </div>
          )}
          <ul className="divide-y">
            {departments.map(dept => (
              <li key={dept.id} className="p-4 flex justify-between items-center hover:bg-slate-50">
                <span className="font-medium">{dept.name}</span>
                <div className="flex gap-2">
                  <button onClick={() => setEditingDept(dept)} className="p-2 text-blue-500 hover:bg-blue-50 rounded">
                    <Icon name="Edit2" size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <ConfirmDialog
        isOpen={!!showConfirm}
        onConfirm={() => handleDeleteMember(showConfirm)}
        onCancel={() => setShowConfirm(null)}
      />
    </div>
  );
};

export default EditorTeam;
