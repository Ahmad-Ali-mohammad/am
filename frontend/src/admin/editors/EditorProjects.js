import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon';
import { useContent } from '../../context/ContentContext';
import ConfirmDialog from '../../components/ConfirmDialog';
import MediaLibraryModal from '../../components/MediaLibraryModal';

const EditorProjects = () => {
  const { t } = useTranslation();
  const { content, updateContent } = useContent();
  const [projects, setProjects] = useState(content.projects || []);
  const [editingProject, setEditingProject] = useState(null);
  const [showConfirm, setShowConfirm] = useState(null);
  const [showMedia, setShowMedia] = useState(false);
  
  const handleSave = () => {
    updateContent('projects', projects);
  };
  
  const handleAddProject = () => {
    setEditingProject({
      id: `project_${Date.now()}`,
      title: '',
      description: '',
      image: '',
      category: 'latest',
      status: 'ongoing',
      gallery: []
    });
  };
  
  const handleSaveProject = () => {
    if (!editingProject) return;
    const exists = projects.find(p => p.id === editingProject.id);
    if (exists) {
      setProjects(projects.map(p => p.id === editingProject.id ? editingProject : p));
    } else {
      setProjects([...projects, editingProject]);
    }
    setEditingProject(null);
    setTimeout(handleSave, 0);
  };
  
  const handleDelete = (id) => {
    setProjects(projects.filter(p => p.id !== id));
    setShowConfirm(null);
    setTimeout(handleSave, 0);
  };
  
  if (editingProject) {
    return (
      <div className="p-6 max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">
          {editingProject.title ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
        </h2>
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">عنوان المشروع</label>
            <input
              type="text"
              value={editingProject.title}
              onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">وصف المشروع</label>
            <textarea
              value={editingProject.description}
              onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
              className="w-full p-2 border rounded-lg"
              rows={5}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">صورة المشروع</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={editingProject.image}
                onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                className="flex-1 p-2 border rounded-lg"
              />
              <button
                onClick={() => setShowMedia(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                <Icon name="Image" size={20} />
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">التصنيف</label>
              <select
                value={editingProject.category}
                onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                className="w-full p-2 border rounded-lg"
              >
                <option value="latest">حديث</option>
                <option value="success_story">قصة نجاح</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">الحالة</label>
              <select
                value={editingProject.status}
                onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value })}
                className="w-full p-2 border rounded-lg"
              >
                <option value="ongoing">جاري</option>
                <option value="completed">مكتمل</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSaveProject}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
            >
              <Icon name="Save" size={18} />
              {t('save')}
            </button>
            <button
              onClick={() => setEditingProject(null)}
              className="bg-slate-200 px-6 py-2 rounded-lg hover:bg-slate-300"
            >
              {t('cancel')}
            </button>
          </div>
        </div>
        
        <MediaLibraryModal
          isOpen={showMedia}
          onClose={() => setShowMedia(false)}
          onSelectImage={(img) => setEditingProject({ ...editingProject, image: img })}
          media={content.mediaLibrary || []}
          onUpdateMedia={(media) => updateContent('mediaLibrary', media)}
        />
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">إدارة المشاريع</h2>
        <button
          onClick={handleAddProject}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <Icon name="Plus" size={18} />
          مشروع جديد
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4">الصورة</th>
              <th className="p-4">العنوان</th>
              <th className="p-4">التصنيف</th>
              <th className="p-4">الحالة</th>
              <th className="p-4">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id} className="border-t hover:bg-slate-50">
                <td className="p-4">
                  <img src={project.image} alt="" className="w-16 h-12 object-cover rounded" />
                </td>
                <td className="p-4 font-medium">{project.title}</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                    {project.category === 'latest' ? 'حديث' : 'قصة نجاح'}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${project.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {project.status === 'completed' ? 'مكتمل' : 'جاري'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => setEditingProject(project)} className="p-2 text-blue-500 hover:bg-blue-50 rounded">
                      <Icon name="Edit2" size={18} />
                    </button>
                    <button onClick={() => setShowConfirm(project.id)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                      <Icon name="Trash2" size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {projects.length === 0 && (
          <div className="text-center py-12">
            <Icon name="FolderOpen" size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">لا توجد مشاريع</p>
          </div>
        )}
      </div>
      
      <ConfirmDialog
        isOpen={!!showConfirm}
        onConfirm={() => handleDelete(showConfirm)}
        onCancel={() => setShowConfirm(null)}
      />
    </div>
  );
};

export default EditorProjects;
