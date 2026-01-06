
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BriefcaseIcon } from '../components/icons/BriefcaseIcon';

const CareersPage: React.FC = () => {
    const jobOpenings = [
        { title: 'مهندس برمجيات أول', location: 'الرياض، عن بعد', type: 'دوام كامل' },
        { title: 'مصمم واجهات مستخدم', location: 'عن بعد', type: 'دوام كامل' },
    ];
    return (
        <div className="bg-slate-50 min-h-screen">
            <Header />
            <main className="container mx-auto p-8">
                <div className="text-center mb-12">
                     <BriefcaseIcon className="w-16 h-16 text-primary-500 mx-auto mb-4"/>
                    <h1 className="text-3xl font-bold mb-2">انضم إلى فريقنا</h1>
                    <p className="text-gray-600">نبحث دائمًا عن مواهب استثنائية لمساعدتنا في بناء مستقبل التعليم.</p>
                </div>

                <div className="max-w-3xl mx-auto space-y-6">
                    {jobOpenings.map((job, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                            <div>
                                <h2 className="font-bold text-xl">{job.title}</h2>
                                <p className="text-sm text-gray-500">{job.location} • {job.type}</p>
                            </div>
                            <button className="font-bold text-primary-600 hover:underline">عرض التفاصيل</button>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CareersPage;
