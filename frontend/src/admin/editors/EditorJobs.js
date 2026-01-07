import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon';
import { useContent } from '../../context/ContentContext';
import ConfirmDialog from '../../components/ConfirmDialog';

const EditorJobs = () => {
  const { t } = useTranslation();
  const { content, updateContent } = useContent();
  const [jobs, setJobs] = useState(content.jobs || []);
  const [editingJob, setEditingJob] = useState(null);
  const [showConfirm, setShowConfirm] = useState(null);
  
  const handleAddJob = () => {
    setEditingJob({
      id: `job_${Date.now()}`,
      title: '',
      description: '',
      skills: '',
      location: '',
      type: 'دوام كامل'
    });
  };
  
  const handleSaveJob = () => {
    if (!editingJob) return;
    const exists = jobs.find(j => j.id === editingJob.id);
    let newJobs;
    if (exists) {
      newJobs = jobs.map(j => j.id === editingJob.id ? editingJob : j);
    } else {
      newJobs = [...jobs, editingJob];
    }
    setJobs(newJobs);
    updateContent('jobs', newJobs);
    setEditingJob(null);
  };
  
  const handleDelete = (id) => {
    const newJobs = jobs.filter(j => j.id !== id);
    setJobs(newJobs);
    updateContent('jobs', newJobs);
    setShowConfirm(null);
  };
  
  if (editingJob) {
    return (
      <div className="p-6 max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">
          {editingJob.title ? 'تعديل الوظيفة' : 'إضافة وظيفة جديدة'}
        </h2>
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">المسمى الوظيفي</label>
            <input
              type="text"
              value={editingJob.title}
              onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">الوصف</label>
            <textarea
              value={editingJob.description}
              onChange={(e) => setEditingJob({ ...editingJob, description: e.target.value })}
              className="w-full p-2 border rounded-lg"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">المهارات المطلوبة</label>
            <textarea
              value={editingJob.skills}
              onChange={(e) => setEditingJob({ ...editingJob, skills: e.target.value })}
              className="w-full p-2 border rounded-lg"
              rows={2}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">الموقع</label>
              <input
                type="text"
                value={editingJob.location}
                onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">نوع العمل</label>
              <select
                value={editingJob.type}
                onChange={(e) => setEditingJob({ ...editingJob, type: e.target.value })}
                className="w-full p-2 border rounded-lg"
              >
                <option value="دوام كامل">دوام كامل</option>
                <option value="دوام جزئي">دوام جزئي</option>
                <option value="عن بعد">عن بعد</option>
                <option value="عقد مؤقت">عقد مؤقت</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button onClick={handleSaveJob} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2">
              <Icon name="Save" size={18} />
              {t('save')}
            </button>
            <button onClick={() => setEditingJob(null)} className="bg-slate-200 px-6 py-2 rounded-lg hover:bg-slate-300">
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
        <h2 className="text-2xl font-bold">إدارة الوظائف</h2>
        <button
          onClick={handleAddJob}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <Icon name="Plus" size={18} />
          وظيفة جديدة
        </button>
      </div>
      
      <div className="space-y-4">
        {jobs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <Icon name="Briefcase" size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">لا توجد وظائف</p>
          </div>
        ) : (
          jobs.map(job => (
            <div key={job.id} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{job.title}</h3>
                  <p className="text-slate-600 mb-3">{job.description}</p>
                  <div className="flex gap-4 text-sm text-slate-500">
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
                <div className="flex gap-2">
                  <button onClick={() => setEditingJob(job)} className="p-2 text-blue-500 hover:bg-blue-50 rounded">
                    <Icon name="Edit2" size={18} />
                  </button>
                  <button onClick={() => setShowConfirm(job.id)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                    <Icon name="Trash2" size={18} />
                  </button>
                </div>
              </div>
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

export default EditorJobs;
