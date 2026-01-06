
import React, { useState, useEffect } from 'react';
import Gauge from '../../../components/admin/Gauge';

const ServiceStatus: React.FC = () => {
    const services = [
        { name: 'API الرئيسية', status: 'online' },
        { name: 'قاعدة البيانات', status: 'online' },
        { name: 'خدمة التخزين', status: 'online' },
        { name: 'خادم المصادقة', status: 'error' },
        { name: 'بوابة الدفع', status: 'maintenance' },
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'online': return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">متصل</span>;
            case 'error': return <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">خطأ</span>;
            case 'maintenance': return <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">صيانة</span>;
            default: return null;
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">حالة الخدمات</h3>
            <div className="space-y-3">
                {services.map(service => (
                    <div key={service.name} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                        <span className="font-semibold text-gray-700">{service.name}</span>
                        {getStatusBadge(service.status)}
                    </div>
                ))}
            </div>
        </div>
    );
};

const SystemHealthPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">صحة النظام</h1>
        <p className="text-gray-500 mt-1">مراقبة حية لأداء الخوادم والخدمات.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Gauge label="استخدام المعالج" unit="%" color="#3b82f6" />
        <Gauge label="استخدام الذاكرة" unit="%" color="#22c55e" />
        <Gauge label="استخدام التخزين" unit="%" color="#f59e0b" />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <ServiceStatus />
      </div>
    </div>
  );
};

export default SystemHealthPage;
