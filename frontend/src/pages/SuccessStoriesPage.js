import React from 'react';
import { useContent } from '../context/ContentContext';
import Icon from '../components/Icon';

const SuccessStoriesPage = ({ navigate }) => {
  const { content } = useContent();
  const { projects, successStoriesPage } = content;
  
  const successStories = projects?.filter(p => p.category === 'success_story') || [];
  
  return (
    <div className="py-20">
      {/* Header */}
      <div className="bg-blue-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{successStoriesPage?.title || 'قصص النجاح'}</h1>
          <p className="text-xl opacity-90">{successStoriesPage?.subtitle}</p>
        </div>
      </div>
      
      {/* Stories Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {successStories.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Award" size={64} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">لا توجد قصص نجاح حالياً</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map(story => (
              <div 
                key={story.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition cursor-pointer" 
                onClick={() => navigate(`/projects/${story.id}`)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs">
                    قصة نجاح
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{story.title}</h3>
                  <div 
                    className="text-slate-600 text-sm line-clamp-3" 
                    dangerouslySetInnerHTML={{ __html: story.description?.substring(0, 150) + '...' }} 
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessStoriesPage;
