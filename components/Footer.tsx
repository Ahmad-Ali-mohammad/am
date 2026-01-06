import React from 'react';
import { Link } from 'react-router-dom';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-slate-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-right">
          {/* Column 1: About */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-bold text-white mb-4">المنصّة</h3>
            <p className="text-slate-400 text-sm max-w-xs">
              بيئة تعليمية رقمية موثوقة للباحثين والمتخصصين، مصممة لتعزيز المعرفة والابتكار في العالم العربي.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-bold text-white mb-4">روابط سريعة</h4>
            <div className="space-y-2 text-sm">
              <Link to="/faq" className="block text-slate-400 hover:text-primary-400 transition-colors">الأسئلة الشائعة</Link>
              <Link to="/privacy" className="block text-slate-400 hover:text-primary-400 transition-colors">سياسة الخصوصية</Link>
              <Link to="/terms" className="block text-slate-400 hover:text-primary-400 transition-colors">شروط الخدمة</Link>
              <Link to="/careers" className="block text-slate-400 hover:text-primary-400 transition-colors">الوظائف</Link>
              <Link to="/special-needs" className="block text-slate-400 hover:text-primary-400 transition-colors">دعم الاحتياجات الخاصة</Link>
            </div>
          </div>

          {/* Column 3: Notices */}
          <div className="flex flex-col items-center md:items-start space-y-4">
             <h4 className="text-lg font-bold text-white mb-2">ملاحظات</h4>
             <div className="inline-flex items-center text-warning-400 bg-warning-900 bg-opacity-50 px-4 py-2 rounded-full">
                <SpinnerIcon className="animate-spin h-5 w-5 ml-3"/>
                <span className="font-semibold text-sm">المنصة قيد التطوير</span>
            </div>
            <div>
              <a href="https://www.instagram.com/emanismaiel12?igsh=N2hmanIza3ppZWt6" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 rounded-full group">
                <InstagramIcon className="h-5 w-5 ml-3"/>
                <span className="font-semibold text-sm text-yellow-400 group-hover:underline">Eman Ismaiel</span>
              </a>
              <div className="mt-2 flex justify-center md:justify-start">
                <ShieldCheckIcon className="h-6 w-6 text-slate-500" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider and Copyright */}
        <div className="border-t border-slate-700 my-8"></div>
        <div className="text-center text-slate-400">
          <p className="font-bold text-yellow-400">&copy; 2026 Eman Ismaiel. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;