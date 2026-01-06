
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MagnifyingGlassIcon } from '../components/icons/MagnifyingGlassIcon';

const AdvancedSearchPage: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            <Header />
            <main className="container mx-auto p-8">
                <h1 className="text-3xl font-bold mb-6 text-center">البحث المتقدم</h1>
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">الكلمات المفتاحية</label>
                            <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">الفئة</label>
                            <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                                <option>الكل</option>
                                <option>الهندسة</option>
                                <option>الطب</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">المستوى</label>
                            <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                                <option>الكل</option>
                                <option>مبتدئ</option>
                                <option>متوسط</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                             <button type="submit" className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
                                <MagnifyingGlassIcon className="w-5 h-5 ml-2" />
                                بحث
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdvancedSearchPage;
