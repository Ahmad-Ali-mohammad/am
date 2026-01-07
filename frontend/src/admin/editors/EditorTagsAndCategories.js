import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon';
import { useContent } from '../../context/ContentContext';
import ConfirmDialog from '../../components/ConfirmDialog';

const EditorTagsAndCategories = () => {
  const { t } = useTranslation();
  const { content, updateContent } = useContent();
  const [categories, setCategories] = useState(content.categories || []);
  const [tags, setTags] = useState(content.tags || []);
  const [editingItem, setEditingItem] = useState(null);
  const [editingType, setEditingType] = useState(null);
  const [showConfirm, setShowConfirm] = useState(null);
  const [activeTab, setActiveTab] = useState('categories');
  
  const handleAdd = (type) => {
    setEditingType(type);
    setEditingItem({ id: `${type}_${Date.now()}`, name: '' });
  };
  
  const handleSave = () => {
    if (!editingItem || !editingType) return;
    
    if (editingType === 'category') {
      const exists = categories.find(c => c.id === editingItem.id);
      let newCategories;
      if (exists) {
        newCategories = categories.map(c => c.id === editingItem.id ? editingItem : c);
      } else {
        newCategories = [...categories, editingItem];
      }
      setCategories(newCategories);
      updateContent('categories', newCategories);
    } else {
      const exists = tags.find(t => t.id === editingItem.id);
      let newTags;
      if (exists) {
        newTags = tags.map(t => t.id === editingItem.id ? editingItem : t);
      } else {
        newTags = [...tags, editingItem];
      }
      setTags(newTags);
      updateContent('tags', newTags);
    }
    
    setEditingItem(null);
    setEditingType(null);
  };
  
  const handleDelete = () => {
    if (!showConfirm) return;
    const { id, type } = showConfirm;
    
    if (type === 'category') {
      const newCategories = categories.filter(c => c.id !== id);
      setCategories(newCategories);
      updateContent('categories', newCategories);
    } else {
      const newTags = tags.filter(t => t.id !== id);
      setTags(newTags);
      updateContent('tags', newTags);
    }
    
    setShowConfirm(null);
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'categories' ? 'bg-blue-500 text-white' : 'bg-slate-100'}`}
          >
            التصنيفات
          </button>
          <button
            onClick={() => setActiveTab('tags')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'tags' ? 'bg-blue-500 text-white' : 'bg-slate-100'}`}
          >
            الوسوم
          </button>
        </div>
        <button
          onClick={() => handleAdd(activeTab === 'categories' ? 'category' : 'tag')}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <Icon name="Plus" size={18} />
          {activeTab === 'categories' ? 'تصنيف جديد' : 'وسم جديد'}
        </button>
      </div>
      
      {editingItem && (
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={editingItem.name}
              onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
              className="flex-1 p-2 border rounded-lg"
              placeholder={editingType === 'category' ? 'اسم التصنيف' : 'اسم الوسم'}
            />
            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
              {t('save')}
            </button>
            <button onClick={() => { setEditingItem(null); setEditingType(null); }} className="px-4 py-2 bg-slate-200 rounded-lg">
              {t('cancel')}
            </button>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-sm">
        {activeTab === 'categories' ? (
          <ul className="divide-y">
            {categories.length === 0 ? (
              <li className="p-8 text-center text-slate-500">
                <Icon name="Folder" size={48} className="mx-auto text-slate-300 mb-4" />
                لا توجد تصنيفات
              </li>
            ) : (
              categories.map(cat => (
                <li key={cat.id} className="p-4 flex justify-between items-center hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <Icon name="Folder" className="text-blue-500" />
                    <span className="font-medium">{cat.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { setEditingType('category'); setEditingItem(cat); }} 
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                    >
                      <Icon name="Edit2" size={18} />
                    </button>
                    <button 
                      onClick={() => setShowConfirm({ id: cat.id, type: 'category' })} 
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Icon name="Trash2" size={18} />
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        ) : (
          <div className="p-4">
            {tags.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <Icon name="Tag" size={48} className="mx-auto text-slate-300 mb-4" />
                لا توجد وسوم
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <div key={tag.id} className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-full">
                    <span>{tag.name}</span>
                    <button 
                      onClick={() => { setEditingType('tag'); setEditingItem(tag); }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Icon name="Edit2" size={14} />
                    </button>
                    <button 
                      onClick={() => setShowConfirm({ id: tag.id, type: 'tag' })}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      <ConfirmDialog
        isOpen={!!showConfirm}
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(null)}
      />
    </div>
  );
};

export default EditorTagsAndCategories;
