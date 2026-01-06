
import React from 'react';
import { MOCK_SURVEYS } from '../../../constants';

const SurveysPage: React.FC = () => {
    const survey = MOCK_SURVEYS[0];
    const totalVotes = survey.results.reduce((sum, item) => sum + item.count, 0);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">الاستبيانات والتقييمات</h1>
                <p className="text-gray-500 mt-1">إنشاء وتحليل استطلاعات الرأي لجمع آراء المستخدمين.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg mb-4">{survey.title} ({survey.responses} رد)</h3>
                <div className="space-y-3">
                    {survey.results.map(res => {
                        const percentage = totalVotes > 0 ? ((res.count / totalVotes) * 100).toFixed(1) : 0;
                        return (
                            <div key={res.option}>
                                <div className="flex justify-between text-sm"><span className="font-medium">{res.option}</span><span>{res.count}</span></div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-blue-500 h-2.5 rounded-full" style={{width: `${percentage}%`}}></div></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SurveysPage;
