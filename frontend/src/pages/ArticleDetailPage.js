import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useContent } from '../context/ContentContext';
import { commentAPI } from '../api';
import Icon from '../components/Icon';

const ArticleDetailPage = ({ articleId, navigate }) => {
  const { t } = useTranslation();
  const { content } = useContent();
  const article = content.articles?.find(a => a.id === articleId);
  const category = content.categories?.find(c => c.id === article?.categoryId);
  const articleTags = content.tags?.filter(tag => article?.tagIds?.includes(tag.id)) || [];
  
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ author: '', email: '', content: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  useEffect(() => {
    if (articleId) {
      commentAPI.getByArticle(articleId)
        .then(res => setComments(res.data))
        .catch(console.error);
    }
  }, [articleId]);
  
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await commentAPI.create({
        ...newComment,
        articleId,
        status: 'pending'
      });
      setSubmitted(true);
      setNewComment({ author: '', email: '', content: '' });
    } catch (error) {
      console.error('Failed to submit comment:', error);
    } finally {
      setSubmitting(false);
    }
  };
  
  if (!article) {
    return (
      <div className="py-40 text-center">
        <Icon name="FileX" size={64} className="mx-auto text-slate-300 mb-4" />
        <h1 className="text-2xl font-bold text-slate-800 mb-4">المقال غير موجود</h1>
        <button onClick={() => navigate('/articles')} className="text-blue-500 hover:underline">
          العودة للمقالات
        </button>
      </div>
    );
  }
  
  return (
    <div className="py-20">
      {/* Hero Image */}
      <div className="relative h-80">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-4 mb-4">
            {category && (
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                {category.name}
              </span>
            )}
            <span className="text-slate-500 text-sm">
              {new Date(article.date).toLocaleDateString('ar-SA')}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-slate-800 mb-6">{article.title}</h1>
          
          <div 
            className="prose prose-lg max-w-none" 
            dangerouslySetInnerHTML={{ __html: article.content }} 
          />
          
          {articleTags.length > 0 && (
            <div className="mt-8 pt-6 border-t">
              <div className="flex flex-wrap gap-2">
                {articleTags.map(tag => (
                  <span key={tag.id} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm">
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Comments Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6">التعليقات ({comments.length})</h2>
          
          {comments.length === 0 ? (
            <p className="text-slate-500 text-center py-4">{t('noComments')}</p>
          ) : (
            <div className="space-y-6 mb-8">
              {comments.map(comment => (
                <div key={comment.id} className="border-b pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-slate-800">{comment.author}</span>
                    <span className="text-slate-400 text-sm">
                      {new Date(comment.createdAt).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                  <p className="text-slate-600">{comment.content}</p>
                </div>
              ))}
            </div>
          )}
          
          {/* Comment Form */}
          <div className="border-t pt-8">
            <h3 className="text-xl font-bold mb-4">{t('leaveComment')}</h3>
            
            {submitted ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-lg text-center">
                <Icon name="CheckCircle" className="inline ml-2" size={20} />
                {t('commentSubmitted')}
              </div>
            ) : (
              <form onSubmit={handleSubmitComment} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder={t('name')}
                    value={newComment.author}
                    onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                    className="p-3 border rounded-lg w-full"
                    required
                  />
                  <input
                    type="email"
                    placeholder={t('email')}
                    value={newComment.email}
                    onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                    className="p-3 border rounded-lg w-full"
                    required
                  />
                </div>
                <textarea
                  placeholder={t('yourComment')}
                  value={newComment.content}
                  onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                  className="p-3 border rounded-lg w-full"
                  rows={4}
                  required
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                >
                  {submitting ? t('loading') : t('sendMessage')}
                </button>
              </form>
            )}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button onClick={() => navigate('/articles')} className="text-blue-500 hover:underline">
            <Icon name="ArrowRight" className="inline ml-2" size={20} />
            العودة للمقالات
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
