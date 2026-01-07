import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon';
import { useContent } from '../../context/ContentContext';
import MediaLibraryModal from '../../components/MediaLibraryModal';

const EditorAbout = () => {
  const { t } = useTranslation();
  const { content, updateContent } = useContent();
  const [data, setData] = useState(content.about || {});
  const [showMedia, setShowMedia] = useState(false);
  
  const handleSave = () => {
    updateContent('about', data);
  };
  
  return (
    <div className="p-6 max-w-4xl">
      <h2 className="text-2xl font-bold mb-6">تعديل من نحن</h2>
      
      <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">العنوان</label>
          <input
            type="text"
            value={data.title || ''}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold mb-1">المقدمة</label>
          <textarea
            value={data.intro || ''}
            onChange={(e) => setData({ ...data, intro: e.target.value })}
            className="w-full p-2 border rounded-lg"
            rows={3}
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold mb-1">الوصف التفصيلي</label>
          <textarea
            value={data.description || ''}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className="w-full p-2 border rounded-lg"
            rows={5}
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-1">الرؤية</label>
            <textarea
              value={data.vision || ''}
              onChange={(e) => setData({ ...data, vision: e.target.value })}
              className="w-full p-2 border rounded-lg"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">الرسالة</label>
            <textarea
              value={data.mission || ''}
              onChange={(e) => setData({ ...data, mission: e.target.value })}
              className="w-full p-2 border rounded-lg"
              rows={3}
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-bold mb-1">الصورة</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={data.image || ''}
              onChange={(e) => setData({ ...data, image: e.target.value })}
              className="flex-1 p-2 border rounded-lg"
            />
            <button
              onClick={() => setShowMedia(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              <Icon name="Image" size={20} />
            </button>
          </div>
          {data.image && (
            <img src={data.image} alt="Preview" className="mt-2 h-40 object-cover rounded-lg" />
          )}
        </div>
        
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <Icon name="Save" size={18} />
          {t('save')}
        </button>
      </div>
      
      <MediaLibraryModal
        isOpen={showMedia}
        onClose={() => setShowMedia(false)}
        onSelectImage={(img) => setData({ ...data, image: img })}
        media={content.mediaLibrary || []}
        onUpdateMedia={(media) => updateContent('mediaLibrary', media)}
      />
    </div>
  );
};

export default EditorAbout;
