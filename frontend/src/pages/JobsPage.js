import React from 'react';
import { useContent } from '../context/ContentContext';
import Icon from '../components/Icon';

const JobsPage = () => {
  const { content } = useContent();
  const { jobs, jobsPage } = content;
  
  return (
    <div className="py-20">
      {/* Header */}
      <div className="bg-blue-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{jobsPage?.title || 'الوظائف'}</h1>
          <p className="text-xl opacity-90">{jobsPage?.subtitle}</p>
        </div>
      </div>
      
      {/* Jobs List */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {jobs?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Briefcase" size={64} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">لا توجد وظائف شاغرة حالياً</p>
          </div>
        ) : (
          <div className="space-y-6">
            {jobs?.map(job => (
              <div key={job.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">{job.title}</h3>
                    <div className="flex gap-4 mt-2 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Icon name="MapPin" size={16} />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Clock" size={16} />
                        {job.type}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 mb-4">{job.description}</p>
                {job.skills && (
                  <div className="text-sm">
                    <span className="font-bold text-slate-700">المهارات المطلوبة:</span>
                    <span className="text-slate-600 mr-2">{job.skills}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;
