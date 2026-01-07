import React from 'react';
import Icon from '../components/Icon';

const NotFoundPage = ({ navigate }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center px-4">
        <div className="text-9xl font-bold text-slate-200 mb-4">404</div>
        <Icon name="FileQuestion" size={64} className="mx-auto text-slate-400 mb-4" />
        <h1 className="text-3xl font-bold text-slate-800 mb-4">الصفحة غير موجودة</h1>
        <p className="text-slate-600 mb-8">عذراً، الصفحة التي تبحث عنها غير موجودة.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          <Icon name="Home" className="inline ml-2" size={20} />
          العودة للرئيسية
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
