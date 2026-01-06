
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CalendarPage: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            <Header />
            <main className="container mx-auto p-8">
                <h1 className="text-3xl font-bold mb-6 text-center">التقويم التعليمي</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="text-center text-gray-500 h-96 flex items-center justify-center">
                        [مكون التقويم التفاعلي سيعرض هنا]
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CalendarPage;
