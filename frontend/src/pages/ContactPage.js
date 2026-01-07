import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useContent } from '../context/ContentContext';
import { contactAPI } from '../api';
import Icon from '../components/Icon';

const ContactPage = () => {
  const { t } = useTranslation();
  const { content } = useContent();
  const { contact, contactPage } = content;
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactAPI.submit(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to submit:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="py-20">
      {/* Header */}
      <div className="bg-blue-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{contactPage?.title || t('contact')}</h1>
          <p className="text-xl opacity-90">{contactPage?.subtitle}</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6">معلومات التواصل</h2>
            <div className="space-y-6">
              {contact?.address && (
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Icon name="MapPin" className="text-blue-500" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">العنوان</h3>
                    <p className="text-slate-600">{contact.address}</p>
                  </div>
                </div>
              )}
              {contact?.phone && (
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Icon name="Phone" className="text-blue-500" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">الهاتف</h3>
                    <p className="text-slate-600" dir="ltr">{contact.phone}</p>
                  </div>
                </div>
              )}
              {contact?.email && (
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Icon name="Mail" className="text-blue-500" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">البريد الإلكتروني</h3>
                    <p className="text-slate-600">{contact.email}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">أرسل رسالة</h2>
            
            {submitted ? (
              <div className="bg-green-50 text-green-700 p-6 rounded-lg text-center">
                <Icon name="CheckCircle" size={48} className="mx-auto mb-4" />
                <p className="text-xl font-bold">تم إرسال رسالتك بنجاح!</p>
                <p className="text-sm mt-2">سنتواصل معك قريباً</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{t('name')}</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                    data-testid="contact-name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{t('email')}</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                    data-testid="contact-email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{t('message')}</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={5}
                    required
                    data-testid="contact-message"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition disabled:opacity-50"
                  data-testid="contact-submit"
                >
                  {loading ? t('loading') : t('sendMessage')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
