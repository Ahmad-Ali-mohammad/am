import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon';
import { commentAPI } from '../../api';
import ConfirmDialog from '../../components/ConfirmDialog';

const EditorComments = () => {
  const { t } = useTranslation();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(null);
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    loadComments();
  }, []);
  
  const loadComments = async () => {
    try {
      const res = await commentAPI.getAll();
      setComments(res.data);
    } catch (error) {
      console.error('Failed to load comments:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpdateStatus = async (id, status) => {
    try {
      await commentAPI.updateStatus(id, status);
      await loadComments();
    } catch (error) {
      console.error('Failed to update comment:', error);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      await commentAPI.delete(id);
      await loadComments();
      setShowConfirm(null);
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };
  
  const filteredComments = filter === 'all' 
    ? comments 
    : comments.filter(c => c.status === filter);
  
  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Icon name="Loader2" className="animate-spin" size={32} />
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t('comments')}</h2>
        <div className="flex gap-2">
          {['all', 'pending', 'approved', 'rejected'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg transition ${filter === status ? 'bg-blue-500 text-white' : 'bg-slate-100 hover:bg-slate-200'}`}
            >
              {status === 'all' ? 'الكل' : t(status)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredComments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <Icon name="MessageSquare" size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">لا توجد تعليقات</p>
          </div>
        ) : (
          filteredComments.map(comment => (
            <div key={comment.id} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-slate-800">{comment.author}</span>
                    <span className="text-slate-400 text-sm">{comment.email}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      comment.status === 'approved' ? 'bg-green-100 text-green-700' :
                      comment.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {t(comment.status)}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm">
                    {new Date(comment.createdAt).toLocaleDateString('ar-SA')}
                  </p>
                </div>
                <div className="flex gap-2">
                  {comment.status !== 'approved' && (
                    <button
                      onClick={() => handleUpdateStatus(comment.id, 'approved')}
                      className="p-2 text-green-500 hover:bg-green-50 rounded"
                      title="موافقة"
                    >
                      <Icon name="Check" size={18} />
                    </button>
                  )}
                  {comment.status !== 'rejected' && (
                    <button
                      onClick={() => handleUpdateStatus(comment.id, 'rejected')}
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                      title="رفض"
                    >
                      <Icon name="X" size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => setShowConfirm(comment.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                    title="حذف"
                  >
                    <Icon name="Trash2" size={18} />
                  </button>
                </div>
              </div>
              <p className="text-slate-600 bg-slate-50 p-4 rounded-lg">{comment.content}</p>
            </div>
          ))
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

export default EditorComments;
