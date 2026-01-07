import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon';
import { useContent } from '../../context/ContentContext';
import ConfirmDialog from '../../components/ConfirmDialog';

const EditorBeneficiaries = () => {
  const { t } = useTranslation();
  const { content, updateContent } = useContent();
  const [pageData, setPageData] = useState(content.beneficiariesPage || { title: '', subtitle: '', stories: [] });
  const [editingStory, setEditingStory] = useState(null);
  const [showConfirm, setShowConfirm] = useState(null);
  
  const handleSavePage = () => {
    updateContent('beneficiariesPage', pageData);
  };
  
  const handleAddStory = () => {
    setEditingStory({
      id: `story_${Date.now()}`,
      name: '',
      story: '',
      image: '',
      project: '',
      year: new Date().getFullYear()
    });
  };
  
  const handleSaveStory = () => {
    if (!editingStory) return;
    const exists = pageData.stories?.find(s => s.id === editingStory.id);
    let newStories;
    if (exists) {
      newStories = pageData.stories.map(s => s.id === editingStory.id ? editingStory : s);
    } else {
      newStories = [...(pageData.stories || []), editingStory];
    }
    const newPageData = { ...pageData, stories: newStories };
    setPageData(newPageData);
    updateContent('beneficiariesPage', newPageData);
    setEditingStory(null);
  };
  
  const handleDeleteStory = (id) => {
    const newStories = pageData.stories.filter(s => s.id !== id);
    const newPageData = { ...pageData, stories: newStories };
    setPageData(newPageData);
    updateContent('beneficiariesPage', newPageData);
    setShowConfirm(null);
  };
  
  if (editingStory) {
    return (
      <div className="p-6 max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">
          {editingStory.name ? 'تعديل القصة' : 'إضافة قصة جديدة'}
        </h2>
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">اسم المستفيد</label>
            <input
              type="text"
              value={editingStory.name}
              onChange={(e) => setEditingStory({ ...editingStory, name: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">القصة</label>
            <textarea
              value={editingStory.story}
              onChange={(e) => setEditingStory({ ...editingStory, story: e.target.value })}
              className="w-full p-2 border rounded-lg"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">رابط الصورة</label>
            <input
              type="text"
              value={editingStory.image}
              onChange={(e) => setEditingStory({ ...editingStory, image: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">المشروع</label>
              <input
                type="text"
                value={editingStory.project}
                onChange={(e) => setEditingStory({ ...editingStory, project: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">السنة</label>
              <input
                type="number"
                value={editingStory.year}
                onChange={(e) => setEditingStory({ ...editingStory, year: parseInt(e.target.value) })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button onClick={handleSaveStory} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2">
              <Icon name="Save" size={18} />
              {t('save')}
            </button>
            <button onClick={() => setEditingStory(null)} className="bg-slate-200 px-6 py-2 rounded-lg hover:bg-slate-300">
              {t('cancel')}
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">إدارة المستفيدين</h2>
      
      {/* Page Settings */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6 max-w-2xl">
        <h3 className="font-bold mb-4">إعدادات الصفحة</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">عنوان الصفحة</label>
            <input
              type="text"
              value={pageData.title || ''}
              onChange={(e) => setPageData({ ...pageData, title: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">العنوان الفرعي</label>
            <input
              type="text"
              value={pageData.subtitle || ''}
              onChange={(e) => setPageData({ ...pageData, subtitle: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <button
            onClick={handleSavePage}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
          >
            <Icon name="Save" size={18} />
            {t('save')}
          </button>
        </div>
      </div>
      
      {/* Stories */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">قصص المستفيدين</h3>
        <button
          onClick={handleAddStory}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <Icon name="Plus" size={18} />
          قصة جديدة
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {pageData.stories?.length === 0 ? (
          <div className="col-span-2 text-center py-12 bg-white rounded-xl">
            <Icon name="Users" size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">لا توجد قصص</p>
          </div>
        ) : (
          pageData.stories?.map(story => (
            <div key={story.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="flex">
                {story.image && (
                  <img src={story.image} alt={story.name} className="w-1/3 object-cover" />
                )}
                <div className="p-4 flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold">{story.name}</h4>
                    <div className="flex gap-1">
                      <button onClick={() => setEditingStory(story)} className="p-1 text-blue-500 hover:bg-blue-50 rounded">
                        <Icon name="Edit2" size={16} />
                      </button>
                      <button onClick={() => setShowConfirm(story.id)} className="p-1 text-red-500 hover:bg-red-50 rounded">
                        <Icon name="Trash2" size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2">{story.story}</p>
                  <div className="flex gap-2 mt-2 text-xs text-slate-500">
                    <span>{story.project}</span>
                    <span>|</span>
                    <span>{story.year}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <ConfirmDialog
        isOpen={!!showConfirm}
        onConfirm={() => handleDeleteStory(showConfirm)}
        onCancel={() => setShowConfirm(null)}
      />
    </div>
  );
};

export default EditorBeneficiaries;
