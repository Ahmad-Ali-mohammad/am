import React from 'react';
import { useContent } from '../context/ContentContext';
import Icon from '../components/Icon';

const DonatePage = () => {
  const { content } = useContent();
  const { donation, donatePage } = content;
  const progress = Math.min((donation?.current / donation?.goal) * 100, 100) || 0;
  
  return (
    <div className="py-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Icon name="Heart" size={64} className="mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">{donatePage?.title || 'تبرع الآن'}</h1>
          <p className="text-xl opacity-90">{donatePage?.subtitle}</p>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Progress */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">{donation?.title || 'هدف التبرعات'}</h2>
          <p className="text-slate-600 mb-6">{donation?.description}</p>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-bold text-green-600">${(donation?.current || 0).toLocaleString()} تم جمعه</span>
              <span className="text-slate-500">الهدف: ${(donation?.goal || 0).toLocaleString()}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all duration-500" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center text-slate-500 text-sm mt-2">
              {progress.toFixed(0)}% من الهدف
            </p>
          </div>
        </div>
        
        {/* Donation Options */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">اختر مبلغ التبرع</h2>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[10, 25, 50, 100, 250, 500].map(amount => (
              <button 
                key={amount}
                className="p-4 border-2 border-slate-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition text-center"
              >
                <span className="text-2xl font-bold text-slate-800">${amount}</span>
              </button>
            ))}
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">مبلغ مخصص</label>
            <div className="relative">
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
              <input
                type="number"
                placeholder="أدخل المبلغ"
                className="w-full p-3 pr-8 border rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
          
          <button className="w-full bg-red-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-red-600 transition flex items-center justify-center gap-2">
            <Icon name="Heart" size={24} />
            تبرع الآن
          </button>
          
          <p className="text-center text-slate-500 text-sm mt-4">
            تبرعاتكم تصل مباشرة للمستفيدين
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;
