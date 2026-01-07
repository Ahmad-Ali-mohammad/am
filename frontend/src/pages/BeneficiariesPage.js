import React from 'react';
import { useContent } from '../context/ContentContext';
import Icon from '../components/Icon';

const BeneficiariesPage = () => {
  const { content } = useContent();
  const { beneficiariesPage, stats } = content;
  
  return (
    <div className="py-20">
      {/* Header */}
      <div className="bg-blue-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{beneficiariesPage?.title || 'المستفيدين'}</h1>
          <p className="text-xl opacity-90">{beneficiariesPage?.subtitle}</p>
        </div>
      </div>
      
      {/* Stats */}
      {stats?.visible && stats?.items?.length > 0 && (
        <div className="bg-slate-100 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.items.map(stat => (
                <div key={stat.id} className="p-4">
                  <div className="text-4xl font-bold text-blue-500 mb-2">{stat.value}</div>
                  <div className="text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Stories */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">قصص المستفيدين</h2>
        
        {beneficiariesPage?.stories?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Users" size={64} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">لا توجد قصص حالياً</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {beneficiariesPage?.stories?.map(story => (
              <div key={story.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {story.project}
                      </span>
                      <span className="text-slate-500 text-sm">{story.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{story.name}</h3>
                    <p className="text-slate-600 leading-relaxed">{story.story}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BeneficiariesPage;
