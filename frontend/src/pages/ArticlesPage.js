import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useContent } from '../context/ContentContext';
import { commentAPI } from '../api';
import Icon from '../components/Icon';

const ArticlesPage = ({ navigate }) => {
  const { t } = useTranslation();
  const { content } = useContent();
  const { articles, categories, tags, articlesPage } = content;
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles?.filter(a => a.categoryId === selectedCategory);
  
  return (
    <div className="py-20">
      {/* Header */}
      <div className="bg-blue-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{articlesPage?.title || t('articles')}</h1>
          <p className="text-xl opacity-90">{articlesPage?.subtitle}</p>
        </div>
      </div>
      
      {/* Filter */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full transition ${selectedCategory === 'all' ? 'bg-blue-500 text-white' : 'bg-slate-100 hover:bg-slate-200'}`}
          >
            الكل
          </button>
          {categories?.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full transition ${selectedCategory === cat.id ? 'bg-blue-500 text-white' : 'bg-slate-100 hover:bg-slate-200'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {filteredArticles?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="FileText" size={64} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">لا توجد مقالات</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles?.map(article => {
              const category = categories?.find(c => c.id === article.categoryId);
              return (
                <div 
                  key={article.id} 
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer" 
                  onClick={() => navigate(`/articles/${article.id}`)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                    {category && (
                      <span className="absolute top-4 right-4 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                        {category.name}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-slate-500 text-sm mb-2">
                      {new Date(article.date).toLocaleDateString('ar-SA')}
                    </p>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{article.title}</h3>
                    <div 
                      className="text-slate-600 text-sm line-clamp-2" 
                      dangerouslySetInnerHTML={{ __html: article.content?.substring(0, 100) + '...' }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;
