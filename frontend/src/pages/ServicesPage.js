import React from 'react';
import { useContent } from '../context/ContentContext';
import Icon from '../components/Icon';

const ServicesPage = () => {
  const { content } = useContent();
  const { services, servicesPage } = content;
  
  return (
    <div className="py-20">
      {/* Header */}
      <div className="bg-blue-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{servicesPage?.title || 'خدماتنا'}</h1>
          <p className="text-xl opacity-90">{servicesPage?.subtitle}</p>
        </div>
      </div>
      
      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {services?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Layers" size={64} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">لا توجد خدمات حالياً</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services?.map(service => (
              <div 
                key={service.id} 
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="inline-block p-4 bg-blue-100 rounded-full mb-6">
                  <Icon name={service.icon || 'Star'} className="w-10 h-10 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
