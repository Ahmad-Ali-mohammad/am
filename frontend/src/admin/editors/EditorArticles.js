import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon';
import { useContent } from '../../context/ContentContext';
import ConfirmDialog from '../../components/ConfirmDialog';

const EditorArticles = () => {
  const { t } = useTranslation();
  const { content, updateContent } = useContent();
  const [articles, setArticles] = useState(content.articles || []);
  const [editingArticle, setEditingArticle] = useState(null);
  const [showConfirm, setShowConfirm] = useState(null);
  
  const handleSave = () => {
    updateContent('articles', articles);
  };
  
  const handleAddArticle = () => {
    setEditingArticle({
      id: `article_${Date.now()}`,
      title: '',
      content: '',
      image: '',
      date: new Date().toISOString(),
      categoryId: content.categories?.[0]?.id || '',
      tagIds: []
    });
  };
  
  const handleSaveArticle = () => {
    if (!editingArticle) return;
    const exists = articles.find(a => a.id === editingArticle.id);
    let newArticles;
    if (exists) {
      newArticles = articles.map(a => a.id === editingArticle.id ? editingArticle : a);
    } else {
      newArticles = [...articles, editingArticle];
    }
    setArticles(newArticles);
    updateContent('articles', newArticles);
    setEditingArticle(null);
  };
  
  const handleDelete = (id) => {
    const newArticles = articles.filter(a => a.id !== id);
    setArticles(newArticles);
    updateContent('articles', newArticles);
    setShowConfirm(null);
  };
  
  if (editingArticle) {
    return (
      <div className="p-6 max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">
          {editingArticle.title ? 'تعديل المقال' : 'إضافة مقال جديد'}
        </h2>
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">عنوان المقال</label>
            <input
              type="text"
              value={editingArticle.title}
              onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">رابط الصورة</label>
            <input
              type="text"
              value={editingArticle.image}
              onChange={(e) => setEditingArticle({ ...editingArticle, image: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">المحتوى</label>
            <textarea
              value={editingArticle.content}
              onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
              className="w-full p-2 border rounded-lg"
              rows={10}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">التصنيف</label>
              <select
                value={editingArticle.categoryId}
                onChange={(e) => setEditingArticle({ ...editingArticle, categoryId: e.target.value })}
                className="w-full p-2 border rounded-lg"
              >
                {content.categories?.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">التاريخ</label>
              <input
                type="date"
                value={editingArticle.date?.split('T')[0]}
                onChange={(e) => setEditingArticle({ ...editingArticle, date: new Date(e.target.value).toISOString() })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">الوسوم</label>
            <div className="flex flex-wrap gap-2">
              {content.tags?.map(tag => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => {
                    const tagIds = editingArticle.tagIds || [];
                    if (tagIds.includes(tag.id)) {
                      setEditingArticle({ ...editingArticle, tagIds: tagIds.filter(id => id !== tag.id) });
                    } else {
                      setEditingArticle({ ...editingArticle, tagIds: [...tagIds, tag.id] });
                    }
                  }}
                  className={`px-3 py-1 rounded-full text-sm transition ${editingArticle.tagIds?.includes(tag.id) ? 'bg-blue-500 text-white' : 'bg-slate-100 hover:bg-slate-200'}`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button onClick={handleSaveArticle} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2">
              <Icon name="Save" size={18} />
              {t('save')}
            </button>
            <button onClick={() => setEditingArticle(null)} className="bg-slate-200 px-6 py-2 rounded-lg hover:bg-slate-300">
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
        <h2 className="text-2xl font-bold">إدارة المقالات</h2>
        <button
          onClick={handleAddArticle}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <Icon name="Plus" size={18} />
          مقال جديد
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4">الصورة</th>
              <th className="p-4">العنوان</th>
              <th className="p-4">التصنيف</th>
              <th className="p-4">التاريخ</th>
              <th className="p-4">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => {
              const category = content.categories?.find(c => c.id === article.categoryId);
              return (
                <tr key={article.id} className="border-t hover:bg-slate-50">
                  <td className="p-4">
                    <img src={article.image} alt="" className="w-16 h-12 object-cover rounded" />
                  </td>
                  <td className="p-4 font-medium">{article.title}</td>
                  <td className="p-4">
                    {category && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {category.name}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-slate-500 text-sm">
                    {new Date(article.date).toLocaleDateString('ar-SA')}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => setEditingArticle(article)} className="p-2 text-blue-500 hover:bg-blue-50 rounded">
                        <Icon name="Edit2" size={18} />
                      </button>
                      <button onClick={() => setShowConfirm(article.id)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                        <Icon name="Trash2" size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {articles.length === 0 && (
          <div className="text-center py-12">
            <Icon name="FileText" size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">لا توجد مقالات</p>
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

export default EditorArticles;
