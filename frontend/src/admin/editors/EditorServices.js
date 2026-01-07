import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon';
import { useContent } from '../../context/ContentContext';
import ConfirmDialog from '../../components/ConfirmDialog';

const AVAILABLE_ICONS = [
  'Star', 'Heart', 'BookOpen', 'Briefcase', 'Users', 'HeartHandshake',
  'Home', 'Settings', 'Shield', 'Award', 'Target', 'Zap', 'Globe', 'Lightbulb'
];

const EditorServices = () => {
  const { t } = useTranslation();
  const { content, updateContent } = useContent();
  const [services, setServices] = useState(content.services || []);
  const [editingService, setEditingService] = useState(null);
  const [showConfirm, setShowConfirm] = useState(null);
  
  const handleSave = () => {
    updateContent('services', services);
  };
  
  const handleAddService = () => {
    setEditingService({
      id: `service_${Date.now()}`,
      icon: 'Star',
      title: '',
      description: ''
    });
  };
  
  const handleSaveService = () => {
    if (!editingService) return;
    const exists = services.find(s => s.id === editingService.id);
    if (exists) {
      setServices(services.map(s => s.id === editingService.id ? editingService : s));
    } else {
      setServices([...services, editingService]);
    }
    setEditingService(null);
    handleSave();
  };
  
  const handleDelete = (id) => {
    setServices(services.filter(s => s.id !== id));
    setShowConfirm(null);
    setTimeout(handleSave, 0);
  };
  
  if (editingService) {
    return (
      <div className="p-6 max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">
          {editingService.title ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}
        </h2>
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2">الأيقونة</label>
            <div className="grid grid-cols-7 gap-2">
              {AVAILABLE_ICONS.map(icon => (
                <button
                  key={icon}
                  onClick={() => setEditingService({ ...editingService, icon })}
                  className={`p-3 rounded-lg border-2 transition ${editingService.icon === icon ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  <Icon name={icon} size={24} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">عنوان الخدمة</label>
            <input
              type="text"
              value={editingService.title}
              onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">وصف الخدمة</label>
            <textarea
              value={editingService.description}
              onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
              className="w-full p-2 border rounded-lg"
              rows={4}
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSaveService}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
            >
              <Icon name="Save" size={18} />
              {t('save')}
            </button>
            <button
              onClick={() => setEditingService(null)}
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
        <h2 className="text-2xl font-bold">إدارة الخدمات</h2>
        <button
          onClick={handleAddService}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <Icon name="Plus" size={18} />
          خدمة جديدة
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <div key={service.id} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Icon name={service.icon} className="text-blue-500" size={24} />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingService(service)}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
                >
                  <Icon name="Edit2" size={18} />
                </button>
                <button
                  onClick={() => setShowConfirm(service.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                >
                  <Icon name="Trash2" size={18} />
                </button>
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">{service.title}</h3>
            <p className="text-slate-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
      
      {services.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl">
          <Icon name="Layers" size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500">لا توجد خدمات. اضغط لإضافة خدمة جديدة.</p>
        </div>
      )}
      
      <ConfirmDialog
        isOpen={!!showConfirm}
        onConfirm={() => handleDelete(showConfirm)}
        onCancel={() => setShowConfirm(null)}
      />
    </div>
  );
};

export default EditorServices;
