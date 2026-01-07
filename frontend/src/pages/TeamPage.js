import React from 'react';
import { useContent } from '../context/ContentContext';
import Icon from '../components/Icon';

const TeamPage = ({ navigate }) => {
  const { content } = useContent();
  const { team, departments, teamPage } = content;
  
  return (
    <div className="py-20">
      {/* Header */}
      <div className="bg-blue-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{teamPage?.title || 'فريق العمل'}</h1>
          <p className="text-xl opacity-90">{teamPage?.subtitle}</p>
        </div>
      </div>
      
      {/* Team by Department */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {team?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Users" size={64} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">لا يوجد أعضاء في الفريق حالياً</p>
          </div>
        ) : (
          departments?.map(dept => {
            const deptMembers = team?.filter(m => m.departmentId === dept.id) || [];
            if (deptMembers.length === 0) return null;
            
            return (
              <div key={dept.id} className="mb-12">
                <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">{dept.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {deptMembers.map(member => (
                    <div 
                      key={member.id} 
                      className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer hover:-translate-y-2 transition-all duration-300" 
                      onClick={() => navigate(`/team/${member.id}`)}
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                      </div>
                      <div className="p-6 text-center">
                        <h4 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-blue-500 transition">
                          {member.name}
                        </h4>
                        <p className="text-slate-500 font-medium text-sm">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TeamPage;
