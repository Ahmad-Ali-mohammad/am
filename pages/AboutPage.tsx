
import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CheckBadgeIcon } from '../components/icons/CheckBadgeIcon';
import { LightBulbIcon } from '../components/icons/LightBulbIcon';
import { RocketLaunchIcon } from '../components/icons/RocketLaunchIcon';
import { UserGroupIcon } from '../components/icons/UserGroupIcon';


const AnimatedStat = ({ finalValue, label }: { finalValue: number, label: string }) => {
    const [count, setCount] = useState(0);
    const targetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                let start = 0;
                const duration = 2000;
                const end = finalValue;
                if (start === end) return;

                let startTimestamp: number | null = null;
                const step = (timestamp: number) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    setCount(Math.floor(progress * (end - start) + start));
                    if (progress < 1) window.requestAnimationFrame(step);
                };
                window.requestAnimationFrame(step);
                observer.unobserve(targetRef.current!);
            }
        }, { threshold: 0.5 });

        if (targetRef.current) observer.observe(targetRef.current);
        return () => { if (targetRef.current) observer.unobserve(targetRef.current); };
    }, [finalValue]);

    return (
        <div ref={targetRef} className="text-center bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
            <p className="text-4xl md:text-5xl font-black text-primary-600">
                {count.toLocaleString('ar-EG')}+
            </p>
            <p className="text-lg text-slate-500 mt-2 font-bold">{label}</p>
        </div>
    );
};


const AboutPage: React.FC = () => {
    const values = [
        { icon: <CheckBadgeIcon className="w-10 h-10 text-primary-500"/>, title: "الجودة", description: "نلتزم بتقديم محتوى تعليمي عالي الجودة يلبي أعلى المعايير الأكاديمية."},
        { icon: <LightBulbIcon className="w-10 h-10 text-primary-500"/>, title: "الابتكار", description: "نسعى دائمًا لابتكار أساليب تعليمية جديدة وتفاعلية تجعل التعلم أكثر متعة وفعالية."},
        { icon: <RocketLaunchIcon className="w-10 h-10 text-primary-500"/>, title: "التمكين", description: "نؤمن بتمكين المتعلمين من خلال تزويدهم بالمعرفة والمهارات اللازمة لتحقيق أهدافهم."},
        { icon: <UserGroupIcon className="w-10 h-10 text-primary-500"/>, title: "الشراكة", description: "نعمل جنبًا إلى جنب مع شركائنا الأكاديميين لضمان تقديم أفضل تجربة تعليمية ممكنة."}
    ];

    const teamMembers = [
        { name: 'د. أحمد الخليفي', role: 'المؤسس والرئيس التنفيذي', imageUrl: 'https://picsum.photos/seed/ceo/200/200', bio: 'خبير في تكنولوجيا التعليم وشغوف بإحداث تغيير إيجابي في العالم العربي.' },
        { name: 'أ. فاطمة الأنصاري', role: 'رئيسة قسم المحتوى', imageUrl: 'https://picsum.photos/seed/contenthead/200/200', bio: 'متخصصة في تصميم المناهج التعليمية وتطوير المحتوى الرقمي.' },
        { name: 'م. خالد الغامدي', role: 'المدير التقني', imageUrl: 'https://picsum.photos/seed/cto/200/200', bio: 'مهندس برمجيات متمرس يقود فريق التطوير لبناء منصة مستقرة وآمنة.' },
        { name: 'أ. نورة المطيري', role: 'مديرة علاقات الشركاء', imageUrl: 'https://picsum.photos/seed/partners/200/200', bio: 'خبيرة في بناء الشراكات الاستراتيجية مع المؤسسات الأكاديمية.' },
    ];
    
    const testimonials = [
      { name: 'علياء منصور', role: 'طالبة جامعية', quote: 'المنصة غيرت طريقة دراستي تمامًا. المحتوى عالي الجودة والمدربون خبراء بمعنى الكلمة. أنصح بها بشدة!', avatarUrl: 'https://picsum.photos/seed/testimonial1/100/100' },
      { name: 'خالد الغامدي', role: 'مهندس برمجيات', quote: 'كمحترف، أبحث دائمًا عن تطوير مهاراتي. الدورات المتقدمة في المنصة ساعدتني على البقاء في طليعة التكنولوجيا.', avatarUrl: 'https://picsum.photos/seed/testimonial2/100/100' },
      { name: 'سارة عبدالله', role: 'مصممة جرافيك', quote: 'وجدت الإلهام والمعرفة في دورات الفنون. المجتمع التفاعلي والمدربون كانوا داعمين جدًا في رحلتي الإبداعية.', avatarUrl: 'https://picsum.photos/seed/testimonial3/100/100' },
  ];


    return (
        <div className="bg-slate-50">
            <Header />
            <main>
                {/* Hero Section */}
                <section className="relative bg-slate-900 text-white text-center py-24">
                    <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{backgroundImage: "url('https://picsum.photos/seed/about-hero/1600/800')"}}></div>
                    <div className="container mx-auto px-6 relative z-10">
                        <h1 className="text-4xl md:text-6xl font-black">عن المنصة: رحلتنا نحو تمكين العقول العربية</h1>
                        <p className="mt-6 text-xl text-slate-300 max-w-3xl mx-auto">
                           نحن أكثر من مجرد منصة تعليمية؛ نحن مجتمع من الباحثين والخبراء نسعى لبناء مستقبل مشرق من خلال المعرفة.
                        </p>
                    </div>
                </section>
                
                {/* Mission and Vision */}
                <section className="py-20">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="bg-white p-10 rounded-3xl shadow-lg border border-slate-100">
                                <h2 className="text-3xl font-black text-slate-800 mb-4">رسالتنا</h2>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    توفير بيئة تعليمية رقمية موثوقة ومبتكرة، تسهل الوصول إلى المعرفة المتقدمة وتساهم في تطوير البحث العلمي في العالم العربي.
                                </p>
                            </div>
                            <div className="bg-primary-600 text-white p-10 rounded-3xl shadow-2xl shadow-primary-200">
                                <h2 className="text-3xl font-black mb-4">رؤيتنا</h2>
                                <p className="text-primary-100 leading-relaxed text-lg">
                                    أن نكون المنصة التعليمية الرائدة في العالم العربي، والشريك المعتمد للجامعات والمؤسسات الأكاديمية، والوجهة الأولى للباحثين عن التميز.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Our Values */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                           <h2 className="text-4xl font-black text-slate-800">قيمنا الأساسية</h2>
                           <p className="text-slate-500 mt-4 max-w-2xl mx-auto">المبادئ التي توجه عملنا وتلهمنا لتقديم الأفضل دائمًا.</p>
                       </div>
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                           {values.map((v, i) => (
                               <div key={i} className="text-center p-8 bg-slate-50 rounded-3xl border border-slate-100 transform hover:-translate-y-2 transition-transform duration-300">
                                   <div className="inline-block bg-white p-4 rounded-2xl shadow-sm mb-6">{v.icon}</div>
                                   <h3 className="text-xl font-bold text-slate-800 mb-2">{v.title}</h3>
                                   <p className="text-sm text-slate-500 leading-relaxed">{v.description}</p>
                               </div>
                           ))}
                       </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-20">
                    <div className="container mx-auto px-6">
                         <div className="text-center mb-16">
                            <h2 className="text-4xl font-black text-slate-800">فريقنا المتميز</h2>
                            <p className="text-slate-500 mt-4">القوة الدافعة وراء نجاح المنصة.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                            {teamMembers.map(member => (
                                <div key={member.name} className="text-center bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
                                    <img src={member.imageUrl} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-xl border-4 border-white" />
                                    <h3 className="text-xl font-bold text-slate-800">{member.name}</h3>
                                    <p className="text-primary-600 font-semibold mb-3">{member.role}</p>
                                    <p className="text-sm text-slate-500 mb-4">{member.bio}</p>
                                </div>
                            ))}
                        </div>
                        <div className="text-center">
                             <h3 className="text-2xl font-bold text-slate-800 mb-4">وفرق العمل المتخصصة</h3>
                             <div className="flex flex-wrap justify-center gap-4">
                                <span className="bg-white px-6 py-2 rounded-full font-bold text-slate-700 shadow-sm border">فريق المحتوى التعليمي</span>
                                <span className="bg-white px-6 py-2 rounded-full font-bold text-slate-700 shadow-sm border">فريق الدعم الفني</span>
                                <span className="bg-white px-6 py-2 rounded-full font-bold text-slate-700 shadow-sm border">فريق التطوير التقني</span>
                             </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-20 bg-slate-900 text-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-black">أرقامنا تتحدث</h2>
                            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">إنجازات نفخر بها ونطمح للمزيد.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            <AnimatedStat finalValue={45678} label="مستخدم مسجل" />
                            <AnimatedStat finalValue={1234} label="دورة متاحة" />
                            <AnimatedStat finalValue={567} label="مدرب خبير" />
                            <AnimatedStat finalValue={12345} label="شهادة ممنوحة" />
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="py-20">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-black text-slate-800">ماذا يقولون عنا</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {testimonials.map((testimonial, index) => (
                                 <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                                    <p className="text-slate-600 italic mb-6">"{testimonial.quote}"</p>
                                    <div className="flex items-center">
                                        <img src={testimonial.avatarUrl} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover" />
                                        <div className="mr-4">
                                            <h4 className="font-bold text-slate-800">{testimonial.name}</h4>
                                            <p className="text-sm text-slate-500">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default AboutPage;
