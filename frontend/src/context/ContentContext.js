import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { contentAPI, historyAPI } from '../api';
import { useAuth } from './AuthContext';

const ContentContext = createContext(null);

// المحتوى الأصلي من المشروع
const INITIAL_CONTENT = {
  hero: {
    title: "منظمة إنسانية: نصنع الأمل، نبني المستقبل",
    subtitle: "نحن منظمة تنمية مجتمعية في شمال شرق سوريا، نُمكّن المجتمعات المحلية بالأدوات والمعرفة لبناء مستقبل مستدام ومستقل.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
    cta_text: "شاهد تأثيرنا",
    cta_link: "#about"
  },
  about: {
    title: "عن منظمة أمل أفضل الطبقة (BHT)",
    intro: "في قلب مدينة الطبقة، حيث الحاجة تلتقي بالإصرار، ولدت فكرة منظمة إنسانية تهدف لصناعة أمل أفضل. بدأت رحلتنا في عام 2017 بمجموعة من الشباب الذين آمنوا بقدرة مجتمعهم على النهوض.",
    description: "تأسست منظمتنا الإنسانية بتاريخ 2017/6/6 على يد مجموعة من شباب مدينة الطبقة العاملين في المجال الإنساني والمهتمين بالشأن المدني بهدف تحسين الواقع الاقتصادي وتنمية قطاع الخدمات الأساسية. نسعى ان نكون أصحاب دور فعال ومكانة متميزة في مجال التنمية المجتمعية على مستوى شمال شرق سوريا.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    vision: "أن نكون أصحاب دور فعال ومكانة متميزة في مجال التنمية المجتمعية على مستوى شمال شرق سوريا.",
    mission: "تحسين الواقع الاقتصادي وتنمية قطاع الخدمات الأساسية وتمكين المجتمعات المحلية بالأدوات والمعرفة لبناء مستقبل مستدام ومستقل."
  },
  services: [
    { id: "1", icon: "BookOpen", title: "التعليم ودعم الأطفال", description: "نفتح أبواب المستقبل للأطفال المهمشين في سوريا. كل طفل يستحق فرصة للتعلم، وبرامجنا التعليمية تمنحهم الأدوات اللازمة لبناء غدٍ أفضل." },
    { id: "2", icon: "Briefcase", title: "سبل العيش وتمكين الشباب", description: "نحوّل الأفكار إلى مشاريع ناجحة. نستثمر في رواد الأعمال المحليين بالتدريب والتوجيه لتحقيق استقلالهم المادي ودعم الاقتصاد المحلي." },
    { id: "3", icon: "HeartHandshake", title: "بناء السلام المجتمعي", description: "نزرع بذور السلام في مجتمعنا. من خلال جلسات الحوار ومبادرات المناصرة، نعمل على حل النزاعات وتعزيز التماسك الاجتماعي." }
  ],
  projects: [
    { id: "1", title: "مشروع التدريب المهني للشباب في الطبقة", description: "تمكين الشباب والشابات من اكتساب مهارات عملية في مجالات الخياطة والحلاقة وصيانة الهواتف. يهدف المشروع إلى تزويد 150 شابًا وشابة بالمهارات اللازمة لدخول سوق العمل.", image: "https://images.unsplash.com/photo-1581092921461-eab6245b0262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: 'latest', status: 'completed', gallery: [] },
    { id: "2", title: "دعم المزارعين في ريف الرقة", description: "توزيع البذور والأسمدة على المزارعين المتضررين لإعادة إحياء الأراضي الزراعية. استفاد من المشروع أكثر من 300 مزارع.", image: "https://images.unsplash.com/photo-1625246333195-551e5088921b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: 'success_story', status: 'ongoing', gallery: [] },
    { id: "3", title: "إعادة تأهيل المدارس", description: "ترميم 10 مدارس في ريف الطبقة لتوفير بيئة تعليمية آمنة للأطفال.", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: 'success_story', status: 'completed', gallery: [] },
    { id: "4", title: "حملات توعية صحية مجتمعية", description: "تنظيم ورش عمل وجلسات توعية حول النظافة الشخصية والوقاية من الأمراض.", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: 'latest', status: 'ongoing', gallery: [] }
  ],
  jobs: [
    { id: "1", title: "منسق مشاريع ميداني", description: "مسؤول عن متابعة تنفيذ أنشطة المشروع في الميدان ورفع التقارير الدورية.", skills: "خبرة 3 سنوات، إجادة اللغة الإنجليزية، مهارات تواصل ممتازة", location: "الطبقة", type: "دوام كامل" },
    { id: "2", title: "موظف مراقبة وتقييم", description: "جمع البيانات وتحليلها لضمان جودة تنفيذ المشاريع وتحقيق المؤشرات.", skills: "خبرة في أدوات الجمع (Kobo)، تحليل البيانات", location: "الرقة", type: "دوام جزئي" },
    { id: "3", title: "محاسب", description: "إدارة السجلات المالية وإعداد التقارير المالية الشهرية.", skills: "شهادة جامعية في المحاسبة، خبرة سنتين", location: "الطبقة", type: "دوام كامل" }
  ],
  departments: [
    { id: "dept_1", name: "الإدارة العليا" },
    { id: "dept_2", name: "إدارة البرامج" },
    { id: "dept_3", name: "القسم المالي" },
    { id: "dept_4", name: "القسم التقني" }
  ],
  team: [
    { id: "1", name: "أحمد العلي", role: "المدير التنفيذي", departmentId: "dept_1", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", bio: "أحمد هو قائد ذو رؤية مع أكثر من 10 سنوات من الخبرة في قطاع المنظمات غير الحكومية.", skills: ["التخطيط الاستراتيجي", "القيادة"], experienceYears: 12, certifications: [], achievements: [], social: { email: "ahmad.ali@bht-sy.org" } },
    { id: "2", name: "سارة محمد", role: "مديرة البرامج", departmentId: "dept_2", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", bio: "سارة شغوفة بإحداث تأثير إيجابي. تدير حافظة مشاريعنا التعليمية وسبل العيش.", skills: ["إدارة المشاريع", "المراقبة والتقييم"], experienceYears: 8, certifications: [], achievements: [], social: { email: "sara.mohamed@bht-sy.org" } }
  ],
  categories: [
    { id: 'cat1', name: 'أخبار المؤسسة' },
    { id: 'cat2', name: 'تقارير المشاريع' },
    { id: 'cat3', name: 'قصص نجاح' }
  ],
  tags: [
    { id: 'tag1', name: 'تعليم' },
    { id: 'tag2', name: 'تنمية مستدامة' },
    { id: 'tag3', name: 'شباب' },
    { id: 'tag4', name: 'زراعة' }
  ],
  articles: [
    { id: '1', title: 'مبادرة جديدة لدعم التعليم في المناطق النائية', content: 'أطلقت مؤسستنا مبادرة شاملة تهدف إلى تحسين جودة التعليم في القرى النائية من خلال توفير المواد التعليمية وتدريب المعلمين.', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60', date: '2024-05-20T10:00:00Z', categoryId: 'cat1', tagIds: ['tag1', 'tag3'] },
    { id: '2', title: 'حصاد ناجح: مشروع دعم المزارعين يحقق أهدافه', content: 'اختتم مشروع دعم المزارعين موسمه الأول بنجاح باهر، حيث تجاوزت معدلات الإنتاج التوقعات بنسبة 20%.', image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60', date: '2024-04-15T14:30:00Z', categoryId: 'cat2', tagIds: ['tag2', 'tag4'] }
  ],
  events: [
    { id: '1', title: 'ورشة عمل حول ريادة الأعمال للشباب', description: 'انضموا إلينا في ورشة عمل تفاعلية لتعلم أساسيات بدء المشاريع الصغيرة وإدارتها.', date: '2024-06-25T09:00:00Z', location: 'مركز التدريب المجتمعي، الطبقة' },
    { id: '2', title: 'اليوم المفتوح للتوعية الصحية', description: 'فعالية مجتمعية تتضمن فحوصات طبية مجانية، محاضرات توعوية، وأنشطة ترفيهية للأطفال.', date: '2024-07-10T11:00:00Z', location: 'الحديقة العامة، الرقة' }
  ],
  pages: [],
  navigation: [
    { id: 'nav1', label: 'الرئيسية', path: '/' },
    { id: 'nav2', label: 'من نحن', path: '/about' },
    { id: 'nav3', label: 'المشاريع', path: '/projects' },
    { id: 'nav4', label: 'الوظائف', path: '/jobs' },
    { id: 'nav5', label: 'الخدمات', path: '/services' },
    { id: 'nav6', label: 'قصص النجاح', path: '/success-stories' },
    { id: 'nav7', label: 'المستفيدين', path: '/beneficiaries' },
    { id: 'nav8', label: 'فريق العمل', path: '/team' },
    { id: 'nav_news', label: 'الأخبار', path: '/articles' },
    { id: 'nav9', label: 'اتصل بنا', path: '/contact' }
  ],
  mediaLibrary: [],
  stats: {
    visible: true,
    items: [
      { id: "1", label: "مستفيد", value: "15,000+" },
      { id: "2", label: "مشروع مكتمل", value: "45" },
      { id: "3", label: "شريك وداعم", value: "12" },
      { id: "4", label: "سنة خبرة", value: "7" }
    ]
  },
  donation: {
    title: "مساهمتك تُعيد الأمل",
    description: "كل مساهمة، مهما كانت بسيطة، هي استثمار مباشر في مستقبل مجتمعاتنا. تبرعك اليوم يمكن أن يوفر كتابًا لطفل، أو يدعم تدريبًا لشاب.",
    goal: 50000,
    current: 32500
  },
  contact: {
    email: "info@bht-sy.org",
    phone: "+963 900 000 000",
    address: "سوريا - الطبقة - الحي الأول",
    facebook: "facebook.com/bht",
    website: "www.bht-sy.org",
    lat: 35.8345,
    lng: 38.5444
  },
  seo: {
    metaDescription: "منظمة أمل أفضل للطبقة (BHT) هي منظمة إنسانية غير ربحية تهدف لتمكين المجتمعات عبر برامج التعليم، سبل العيش، وبناء السلام.",
    metaKeywords: "منظمة إنسانية, تنمية مجتمعية, دعم سوريا, التعليم في سوريا"
  },
  aboutPage: { title: "من نحن | منظمة أمل أفضل الطبقة", subtitle: "تعرف على قصتنا، رؤيتنا، ورسالتنا في تمكين المجتمعات المحلية في شمال شرق سوريا." },
  beneficiariesPage: {
    title: "قصص المستفيدين",
    subtitle: "شاهد الأثر الحقيقي لبرامجنا التنموية من خلال قصص نجاح ملهمة.",
    stories: [
      { id: '1', name: 'عائشة', story: 'بفضل التدريب المهني في الخياطة، تمكنت من بدء مشروعي الصغير وإعالة أسرتي.', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', project: 'Training', year: 2023 },
      { id: '2', name: 'علي', story: 'دعم البذور والأسمدة ساعدني على الوقوف على قدمي مرة أخرى وزراعة أرضي بنجاح.', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', project: 'Farming', year: 2022 }
    ]
  },
  contactPage: { title: "اتصل بنا", subtitle: "تواصل معنا للاستفسارات، الشراكات، أو فرص التطوع." },
  projectsPage: { title: "مشاريعنا التنموية", subtitle: "استكشف مشاريعنا في التعليم، سبل العيش، وبناء السلام." },
  teamPage: { title: "فريقنا", subtitle: "تعرف على العقول والقلوب التي تقود التغيير في منظمتنا." },
  articlesPage: { title: "أخبار ومقالات", subtitle: "تابع آخر أخبار مبادراتنا التنموية." },
  donatePage: { title: "تبرع الآن", subtitle: "انضم إلينا في رحلتنا لإعادة بناء الأمل." },
  jobsPage: { title: "الوظائف الشاغرة", subtitle: "اكتشف الفرص المتاحة وكن جزءاً من التغيير." },
  servicesPage: { title: "خدماتنا", subtitle: "نقدم مجموعة من البرامج المصممة لتمكين الأفراد." },
  successStoriesPage: { title: "قصص النجاح", subtitle: "شاهد كيف تساهم مشاريعنا في تغيير حياة الناس." }
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(INITIAL_CONTENT);
  const [loading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [history, setHistory] = useState([]);
  const { isAuthenticated } = useAuth();

  const loadContent = useCallback(async () => {
    try {
      setLoading(true);
      const response = await contentAPI.get();
      if (response.data && Object.keys(response.data).length > 1) {
        setContent({ ...INITIAL_CONTENT, ...response.data });
      }
    } catch (error) {
      console.error('Failed to load content:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadHistory = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const response = await historyAPI.get();
      setHistory(response.data || []);
    } catch (error) {
      console.error('Failed to load history:', error);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  useEffect(() => {
    if (isAuthenticated) {
      loadHistory();
    }
  }, [isAuthenticated, loadHistory]);

  const updateContent = useCallback((section, data) => {
    setContent(prev => ({
      ...prev,
      [section]: data
    }));
    setHasChanges(true);
  }, []);

  const saveContent = useCallback(async () => {
    try {
      await contentAPI.update(content);
      setHasChanges(false);
      return true;
    } catch (error) {
      console.error('Failed to save content:', error);
      return false;
    }
  }, [content]);

  const publishContent = useCallback(async () => {
    try {
      // Save to history first
      await historyAPI.save(content);
      // Then save content
      await contentAPI.update(content);
      setHasChanges(false);
      await loadHistory();
      return true;
    } catch (error) {
      console.error('Failed to publish content:', error);
      return false;
    }
  }, [content, loadHistory]);

  const restoreVersion = useCallback(async (version) => {
    try {
      setContent(version.content);
      await contentAPI.update(version.content);
      setHasChanges(false);
      return true;
    } catch (error) {
      console.error('Failed to restore version:', error);
      return false;
    }
  }, []);

  const discardChanges = useCallback(async () => {
    await loadContent();
    setHasChanges(false);
  }, [loadContent]);

  return (
    <ContentContext.Provider value={{
      content,
      loading,
      hasChanges,
      history,
      updateContent,
      saveContent,
      publishContent,
      restoreVersion,
      discardChanges,
      refreshContent: loadContent,
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentProvider');
  }
  return context;
};
