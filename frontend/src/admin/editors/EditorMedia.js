import React, { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon';
import { useContent } from '../../context/ContentContext';
import ConfirmDialog from '../../components/ConfirmDialog';

const EditorMedia = () => {
  const { t } = useTranslation();
  const { content, updateContent } = useContent();
  const [media, setMedia] = useState(content.mediaLibrary || []);
  const [uploading, setUploading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const fileInputRef = useRef(null);
  
  const handleSave = useCallback((newMedia) => {
    updateContent('mediaLibrary', newMedia);
  }, [updateContent]);
  
  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    
    setUploading(true);
    
    const newItems = await Promise.all(
      files.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            resolve({
              id: `media_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              name: file.name,
              type: file.type,
              size: file.size,
              base64: event.target.result,
              createdAt: new Date().toISOString()
            });
          };
          reader.readAsDataURL(file);
        });
      })
    );
    
    const newMedia = [...media, ...newItems];
    setMedia(newMedia);
    handleSave(newMedia);
    setUploading(false);
  };
  
  const handleDelete = (id) => {
    const newMedia = media.filter(item => item.id !== id);
    setMedia(newMedia);
    handleSave(newMedia);
    setShowConfirm(null);
  };
  
  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t('media')}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-slate-100'}`}
          >
            <Icon name="Grid" size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-slate-100'}`}
          >
            <Icon name="List" size={20} />
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
          >
            <Icon name="Upload" size={18} />
            رفع ملفات
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>
      
      {uploading && (
        <div className="bg-blue-50 text-blue-600 p-4 rounded-lg mb-4 flex items-center gap-2">
          <Icon name="Loader2" className="animate-spin" size={20} />
          جاري رفع الملفات...
        </div>
      )}
      
      {media.length === 0 ? (
        <div 
          className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center cursor-pointer hover:border-blue-400 transition bg-white"
          onClick={() => fileInputRef.current?.click()}
        >
          <Icon name="Upload" size={48} className="mx-auto text-slate-400 mb-4" />
          <p className="text-slate-600 mb-2">اضغط لرفع الصور</p>
          <p className="text-slate-400 text-sm">أو اسحب الملفات هنا</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {media.map(item => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-sm group relative">
              <img src={item.base64} alt={item.name} className="w-full h-32 object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <button
                  onClick={() => setShowConfirm(item.id)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <Icon name="Trash2" size={18} />
                </button>
              </div>
              <div className="p-2">
                <p className="text-xs text-slate-600 truncate">{item.name}</p>
                <p className="text-xs text-slate-400">{formatSize(item.size)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-right">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-4">الصورة</th>
                <th className="p-4">الاسم</th>
                <th className="p-4">الحجم</th>
                <th className="p-4">التاريخ</th>
                <th className="p-4">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {media.map(item => (
                <tr key={item.id} className="border-t hover:bg-slate-50">
                  <td className="p-4">
                    <img src={item.base64} alt="" className="w-12 h-12 object-cover rounded" />
                  </td>
                  <td className="p-4">{item.name}</td>
                  <td className="p-4 text-slate-500">{formatSize(item.size)}</td>
                  <td className="p-4 text-slate-500">{new Date(item.createdAt).toLocaleDateString('ar-SA')}</td>
                  <td className="p-4">
                    <button onClick={() => setShowConfirm(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                      <Icon name="Trash2" size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default EditorMedia;
