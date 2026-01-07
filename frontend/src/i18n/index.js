import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ar: {
    translation: {
      // Navigation
      home: 'الرئيسية',
      about: 'من نحن',
      projects: 'المشاريع',
      jobs: 'الوظائف',
      services: 'الخدمات',
      successStories: 'قصص النجاح',
      beneficiaries: 'المستفيدين',
      team: 'فريق العمل',
      articles: 'المقالات',
      contact: 'اتصل بنا',
      donate: 'تبرع الآن',
      login: 'دخول الموظفين',
      logout: 'تسجيل خروج',
      
      // Admin
      dashboard: 'لوحة التحكم',
      pages: 'إدارة الصفحات',
      navigation: 'إدارة القوائم',
      hero: 'الواجهة الرئيسية',
      media: 'مكتبة الوسائط',
      settings: 'الإعدادات',
      users: 'إدارة المستخدمين',
      comments: 'إدارة التعليقات',
      donations: 'إدارة التبرعات',
      tagsCategories: 'الفئات والوسوم',
      events: 'الأحداث',
      
      // Actions
      save: 'حفظ',
      cancel: 'إلغاء',
      delete: 'حذف',
      edit: 'تعديل',
      add: 'إضافة',
      create: 'إنشاء',
      publish: 'نشر',
      discard: 'تجاهل',
      preview: 'معاينة',
      search: 'بحث',
      filter: 'تصفية',
      
      // Messages
      savedSuccessfully: 'تم الحفظ بنجاح',
      deleteConfirm: 'هل أنت متأكد من الحذف؟',
      publishConfirm: 'هل أنت متأكد من نشر التغييرات؟',
      loading: 'جاري التحميل...',
      error: 'حدث خطأ',
      noData: 'لا توجد بيانات',
      
      // Auth
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      name: 'الاسم',
      role: 'الدور',
      admin: 'مسؤول',
      editor: 'محرر',
      viewer: 'مشاهد',
      
      // Status
      published: 'منشورة',
      draft: 'مسودة',
      pending: 'قيد الانتظار',
      approved: 'موافق عليه',
      rejected: 'مرفوض',
      ongoing: 'جاري',
      completed: 'مكتمل',
      
      // Footer
      contactInfo: 'معلومات التواصل',
      newsletter: 'النشرة البريدية',
      quickLinks: 'روابط سريعة',
      subscribe: 'اشتراك',
      subscribedSuccess: 'شكراً لاشتراكك!',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الاستخدام',
      allRightsReserved: 'جميع الحقوق محفوظة',
      
      // Comments
      leaveComment: 'اترك تعليقاً',
      commentSubmitted: 'تم إرسال تعليقك للمراجعة',
      yourComment: 'تعليقك',
      noComments: 'لا توجد تعليقات حتى الآن',
      
      // Misc
      readMore: 'اقرأ المزيد',
      viewAll: 'عرض الكل',
      share: 'مشاركة',
      sendMessage: 'إرسال رسالة',
      message: 'الرسالة',
      systemStatus: 'حالة النظام',
      systemRunning: 'يعمل بكفاءة',
    }
  },
  en: {
    translation: {
      // Navigation
      home: 'Home',
      about: 'About Us',
      projects: 'Projects',
      jobs: 'Jobs',
      services: 'Services',
      successStories: 'Success Stories',
      beneficiaries: 'Beneficiaries',
      team: 'Team',
      articles: 'Articles',
      contact: 'Contact',
      donate: 'Donate Now',
      login: 'Staff Login',
      logout: 'Logout',
      
      // Admin
      dashboard: 'Dashboard',
      pages: 'Page Management',
      navigation: 'Menu Management',
      hero: 'Hero Section',
      media: 'Media Library',
      settings: 'Settings',
      users: 'User Management',
      comments: 'Comment Management',
      donations: 'Donation Management',
      tagsCategories: 'Tags & Categories',
      events: 'Events',
      
      // Actions
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      create: 'Create',
      publish: 'Publish',
      discard: 'Discard',
      preview: 'Preview',
      search: 'Search',
      filter: 'Filter',
      
      // Messages
      savedSuccessfully: 'Saved successfully',
      deleteConfirm: 'Are you sure you want to delete?',
      publishConfirm: 'Are you sure you want to publish changes?',
      loading: 'Loading...',
      error: 'An error occurred',
      noData: 'No data available',
      
      // Auth
      email: 'Email',
      password: 'Password',
      name: 'Name',
      role: 'Role',
      admin: 'Admin',
      editor: 'Editor',
      viewer: 'Viewer',
      
      // Status
      published: 'Published',
      draft: 'Draft',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      ongoing: 'Ongoing',
      completed: 'Completed',
      
      // Footer
      contactInfo: 'Contact Info',
      newsletter: 'Newsletter',
      quickLinks: 'Quick Links',
      subscribe: 'Subscribe',
      subscribedSuccess: 'Thank you for subscribing!',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
      allRightsReserved: 'All rights reserved',
      
      // Comments
      leaveComment: 'Leave a comment',
      commentSubmitted: 'Comment submitted for review',
      yourComment: 'Your comment',
      noComments: 'No comments yet',
      
      // Misc
      readMore: 'Read More',
      viewAll: 'View All',
      share: 'Share',
      sendMessage: 'Send Message',
      message: 'Message',
      systemStatus: 'System Status',
      systemRunning: 'Running smoothly',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar',
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
