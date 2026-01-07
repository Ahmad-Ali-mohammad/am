import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon';
import { useContent } from '../../context/ContentContext';
import MediaLibraryModal from '../../components/MediaLibraryModal';

const EditorHero = () => {
  const { t } = useTranslation();
  const { content, updateContent } = useContent();
  const [data, setData] = useState(content.hero || {});
  const [showMedia, setShowMedia] = useState(false);
  
  const handleSave = () => {
    updateContent('hero', data);
  };
  
  return (
    <div className="p-6 max-w-4xl">
      <h2 className="text-2xl font-bold mb-6">تعديل الواجهة الرئيسية</h2>
      
      <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">العنوان الرئيسي</label>
          <input
            type="text"
            value={data.title || ''}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="w-full p-2 border rounded-lg"
            data-testid="hero-title"
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold mb-1">العنوان الفرعي</label>
          <textarea
            value={data.subtitle || ''}
            onChange={(e) => setData({ ...data, subtitle: e.target.value })}
            className="w-full p-2 border rounded-lg"
            rows={3}
            data-testid="hero-subtitle"
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold mb-1">صورة الخلفية</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={data.image || ''}
              onChange={(e) => setData({ ...data, image: e.target.value })}
              className="flex-1 p-2 border rounded-lg"
              placeholder="رابط الصورة"
            />
            <button
              onClick={() => setShowMedia(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Icon name="Image" size={20} />
            </button>
          </div>
          {data.image && (
            <img src={data.image} alt="Preview" className="mt-2 h-40 object-cover rounded-lg" />
          )}
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-1">نص الزر</label>
            <input
              type="text"
              value={data.cta_text || ''}
              onChange={(e) => setData({ ...data, cta_text: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">رابط الزر</label>
            <input
              type="text"
              value={data.cta_link || ''}
              onChange={(e) => setData({ ...data, cta_link: e.target.value })}
              className="w-full p-2 border rounded-lg"
              dir="ltr"
            />
          </div>
        </div>
        
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
          data-testid="hero-save"
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

export default EditorHero;
