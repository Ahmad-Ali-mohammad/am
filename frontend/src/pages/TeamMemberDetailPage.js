import React from 'react';
import { useContent } from '../context/ContentContext';
import Icon from '../components/Icon';

const TeamMemberDetailPage = ({ memberId, navigate }) => {
  const { content } = useContent();
  const member = content.team?.find(m => m.id === memberId);
  const department = content.departments?.find(d => d.id === member?.departmentId);
  
  if (!member) {
    return (
      <div className="py-40 text-center">
        <Icon name="UserX" size={64} className="mx-auto text-slate-300 mb-4" />
        <h1 className="text-2xl font-bold text-slate-800 mb-4">العضو غير موجود</h1>
        <button onClick={() => navigate('/team')} className="text-blue-500 hover:underline">
          العودة للفريق
        </button>
      </div>
    );
  }
  
  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
            </div>
            <div className="md:w-2/3 p-8">
              <div className="mb-4">
                <span className="text-blue-500 text-sm font-medium">{department?.name}</span>
              </div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">{member.name}</h1>
              <p className="text-xl text-slate-600 mb-6">{member.role}</p>
              <p className="text-slate-600 leading-relaxed mb-6">{member.bio}</p>
              
              {member.skills?.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold text-slate-800 mb-2">المهارات</h3>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {member.experienceYears > 0 && (
                <p className="text-slate-600 mb-4">
                  <Icon name="Briefcase" className="inline ml-2" size={18} />
                  {member.experienceYears} سنوات خبرة
                </p>
              )}
              
              <div className="flex gap-4 mt-6">
                {member.social?.linkedin && (
                  <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    <Icon name="Linkedin" size={24} />
                  </a>
                )}
                {member.social?.twitter && (
                  <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                    <Icon name="Twitter" size={24} />
                  </a>
                )}
                {member.social?.email && (
                  <a href={`mailto:${member.social.email}`} className="text-slate-600 hover:text-slate-800">
                    <Icon name="Mail" size={24} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button onClick={() => navigate('/team')} className="text-blue-500 hover:underline">
            <Icon name="ArrowRight" className="inline ml-2" size={20} />
            العودة للفريق
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberDetailPage;
