
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ContactPage: React.FC = () => {
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('شكراً لتواصلك معنا! سنقوم بالرد عليك في أقرب وقت ممكن.');
        // Here you would typically handle form submission to a backend
    };

    return (
        <div className="bg-gray-50">
            <Header />
            <main>
                 <div className="text-center py-16 bg-white">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">تواصل معنا</h1>
                    <p className="mt-4 text-lg text-gray-600">نحن هنا للمساعدة. كيف يمكننا خدمتك اليوم؟</p>
                </div>

                <div className="container mx-auto px-6 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">أرسل لنا رسالة</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">الاسم الكامل</label>
                                    <input type="text" id="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                                    <input type="email" id="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">رسالتك</label>
                                    <textarea id="message" rows={5} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"></textarea>
                                </div>
                                <div>
                                    <button type="submit" className="w-full bg-primary-600 text-white font-bold py-3 px-6 rounded-md hover:bg-primary-700 transition-colors">
                                        إرسال
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Contact Info & Map */}
                        <div className="space-y-8">
                             <div className="bg-white p-8 rounded-lg shadow-md">
                                 <h3 className="text-xl font-bold text-gray-800 mb-4">معلومات الاتصال</h3>
                                 <p className="text-gray-600 mb-2"><strong className="ml-2">البريد الإلكتروني:</strong> support@almanassa.com</p>
                                 <p className="text-gray-600 mb-2"><strong className="ml-2">الهاتف:</strong> +966 11 123 4567</p>
                                 <p className="text-gray-600"><strong className="ml-2">العنوان:</strong> 1234 طريق الملك فهد، الرياض، المملكة العربية السعودية</p>
                             </div>
                             <div className="rounded-lg shadow-md overflow-hidden h-80">
                                 <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.582236357908!2d46.6721868150000!3d24.7061389841267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03260a312a81%3A0x5db358a984a6c2f!2sKingdom%20Centre!5e0!3m2!1sen!2ssa!4v1626265678120!5m2!1sen!2ssa"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    title="Location Map"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ContactPage;
