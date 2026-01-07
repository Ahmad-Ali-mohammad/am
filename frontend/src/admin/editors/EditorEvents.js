import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon';
import { useContent } from '../../context/ContentContext';
import ConfirmDialog from '../../components/ConfirmDialog';

const EditorEvents = () => {
  const { t } = useTranslation();
  const { content, updateContent } = useContent();
  const [events, setEvents] = useState(content.events || []);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showConfirm, setShowConfirm] = useState(null);
  
  const handleAddEvent = () => {
    setEditingEvent({
      id: `event_${Date.now()}`,
      title: '',
      description: '',
      date: new Date().toISOString(),
      location: ''
    });
  };
  
  const handleSaveEvent = () => {
    if (!editingEvent) return;
    const exists = events.find(e => e.id === editingEvent.id);
    let newEvents;
    if (exists) {
      newEvents = events.map(e => e.id === editingEvent.id ? editingEvent : e);
    } else {
      newEvents = [...events, editingEvent];
    }
    setEvents(newEvents);
    updateContent('events', newEvents);
    setEditingEvent(null);
  };
  
  const handleDelete = (id) => {
    const newEvents = events.filter(e => e.id !== id);
    setEvents(newEvents);
    updateContent('events', newEvents);
    setShowConfirm(null);
  };
  
  if (editingEvent) {
    return (
      <div className="p-6 max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">
          {editingEvent.title ? 'تعديل الحدث' : 'إضافة حدث جديد'}
        </h2>
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">عنوان الحدث</label>
            <input
              type="text"
              value={editingEvent.title}
              onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">الوصف</label>
            <textarea
              value={editingEvent.description}
              onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
              className="w-full p-2 border rounded-lg"
              rows={4}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">التاريخ</label>
              <input
                type="datetime-local"
                value={editingEvent.date?.slice(0, 16)}
                onChange={(e) => setEditingEvent({ ...editingEvent, date: new Date(e.target.value).toISOString() })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">المكان</label>
              <input
                type="text"
                value={editingEvent.location}
                onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button onClick={handleSaveEvent} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2">
              <Icon name="Save" size={18} />
              {t('save')}
            </button>
            <button onClick={() => setEditingEvent(null)} className="bg-slate-200 px-6 py-2 rounded-lg hover:bg-slate-300">
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
        <h2 className="text-2xl font-bold">إدارة الأحداث</h2>
        <button
          onClick={handleAddEvent}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <Icon name="Plus" size={18} />
          حدث جديد
        </button>
      </div>
      
      <div className="space-y-4">
        {events.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <Icon name="Calendar" size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">لا توجد أحداث</p>
          </div>
        ) : (
          events.map(event => (
            <div key={event.id} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{event.title}</h3>
                  <p className="text-slate-600 mb-3">{event.description}</p>
                  <div className="flex gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Icon name="Calendar" size={16} />
                      {new Date(event.date).toLocaleDateString('ar-SA')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="MapPin" size={16} />
                      {event.location}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingEvent(event)} className="p-2 text-blue-500 hover:bg-blue-50 rounded">
                    <Icon name="Edit2" size={18} />
                  </button>
                  <button onClick={() => setShowConfirm(event.id)} className="p-2 text-red-500 hover:bg-red-50 rounded">
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

export default EditorEvents;
