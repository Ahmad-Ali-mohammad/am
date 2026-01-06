
import { Course, User, UserRole, SkillCourse, EducationalStage, UpcomingLecture, Quiz, Notification, Task, AuditLog, LibraryResource, Achievement, UserActivity, Transaction, Campaign, Survey, Feedback, Curriculum, LearningPath, Talent, InnovationIdea, ClassificationNode, LearningPathDetailed, SyrianUniversity, SpecializationGuide, Review } from './types';

export const MOCK_SYRIAN_UNIVERSITIES: SyrianUniversity[] = [
  {
    id: 'uni-1',
    name: 'جامعة دمشق',
    logoUrl: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=200&h=200&auto=format&fit=crop',
    campusImages: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541339907198-e08756defeec?q=80&w=1000&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000&h=600&auto=format&fit=crop'
    ],
    foundationYear: 1923,
    location: 'دمشق',
    address: 'ساحة البرامكة، دمشق، سوريا',
    phone: '+963 11 33923123',
    email: 'info@damascusuniversity.edu.sy',
    type: 'public',
    collegeCount: 18,
    ranking: 1,
    studentCount: 150000,
    facultyCount: 3500,
    description: 'أقدم وأكبر جامعة في الجمهورية العربية السورية، تعد منارة العلم والمعرفة في المنطقة وتضم كليات عريقة تخرج منها أبرز العلماء والمفكرين.',
    history: 'تأسست الجامعة في عام 1923 من خلال دمج مدرسة الطب ومدرسة الحقوق. وقد كانت وما زالت المركز الأكاديمي الرائد في سوريا والمنطقة العربية.',
    achievements: [
      'المرتبة الأولى محلياً لأكثر من 50 عاماً متتالية.',
      'تخريج أكثر من مليون طالب منذ التأسيس.',
      'الحصول على شهادة الآيزو في الجودة الأكاديمية عام 2021.'
    ],
    partnerships: [
      'جامعة موسكو الحكومية (روسيا)',
      'جامعة السوربون (فرنسا)',
      'جامعة بكين (الصين)'
    ],
    coords: { lat: 33.5138, lng: 36.2765 },
    colleges: [
      {
        id: 'col-1',
        name: 'كلية الطب البشري',
        dean: 'د. رائد أبو حرب',
        vision: 'الريادة في التعليم الطبي والبحث العلمي على المستوى العالمي.',
        mission: 'إعداد أطباء متميزين قادرين على تلبية احتياجات المجتمع وتقديم رعاية صحية عالية الجودة.',
        departments: [
          { id: 'dep-1', name: 'قسم الجراحة العامة', degrees: ['إجازة في الطب', 'ماجستير تأهيل وتخصص'], curriculumLink: '#', admissionRequirements: 'معدل عام مرتفع في الثانوية (فرع علمي) حصراً.' }
        ],
        graduationStats: 'معدل التخرج السنوي: 92%، معدل التوظيف: 98%.'
      },
      {
        id: 'col-2',
        name: 'كلية الهندسة المعلوماتية',
        dean: 'د. عمار خير بك',
        vision: 'تخريج مهندسين مبدعين يقودون التحول الرقمي في سوريا.',
        mission: 'تقديم تعليم تقني متميز يواكب التطورات العالمية المتسارعة في علوم الحاسب.',
        departments: [
          { id: 'dep-2', name: 'قسم هندسة البرمجيات', degrees: ['إجازة في الهندسة', 'دكتوراه'], curriculumLink: '#', admissionRequirements: 'نجاح في مفاضلة الهندسات الموحدة.' }
        ],
        graduationStats: 'معدل التخرج السنوي: 85%، معدل التوظيف في القطاع التقني: 95%.'
      }
    ],
    scholarships: [
      'منحة التميز الأكاديمي لأوائل الدفعات.',
      'منحة التبادل الطلابي (Erasmus+).',
      'منحة البحث العلمي لطلاب الدراسات العليا.'
    ],
    studentClubs: [
      'نادي الروبوت والذكاء الاصطناعي',
      'النادي السينمائي الجامعي',
      'فريق دمشق التطوعي'
    ]
  },
  {
    id: 'uni-2',
    name: 'جامعة حلب',
    logoUrl: 'https://images.unsplash.com/photo-1541339907198-e08756defeec?q=80&w=200&h=200&auto=format&fit=crop',
    campusImages: [
        'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1000&h=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1562774053-625791082592?q=80&w=1000&h=600&auto=format&fit=crop'
    ],
    foundationYear: 1958,
    location: 'حلب',
    address: 'شارع الجامعة، حلب، سوريا',
    phone: '+963 21 2631234',
    email: 'contact@alep-univ.edu.sy',
    type: 'public',
    collegeCount: 20,
    ranking: 2,
    studentCount: 120000,
    facultyCount: 2800,
    description: 'صرح علمي عريق في شمال سوريا، يتميز بتنوعه الأكاديمي ومكانته البحثية المرموقة عالمياً.',
    history: 'تأسست جامعة حلب في عام 1958، لتكون ثاني جامعة حكومية في البلاد.',
    achievements: ['المركز الأول في مسابقة البرمجة الجامعية لعام 2022.', 'اعتماد كلية الهندسة المدنية من قبل اتحاد المهندسين العرب.'],
    partnerships: ['جامعة برلين التقنية (ألمانيا)', 'معهد grenoble INP (فرنسا)'],
    coords: { lat: 36.2021, lng: 37.1343 },
    colleges: [
      { id: 'col-3', name: 'كلية الهندسة المدنية', dean: 'د. محمد الأحمد', vision: 'الريادة في علوم الهندسة المدنية وتطبيقاتها.', mission: 'تخريج مهندسين مدنيين ذوي كفاءة عالية.', departments: [], graduationStats: 'معدل التخرج: 88%.' }
    ],
    scholarships: ['منحة التفوق الهندسي.', 'منحة دعم البحث العلمي.'],
    studentClubs: ['نادي الهندسة الإنشائية', 'فريق حلب المعماري']
  },
  {
    id: 'uni-3',
    name: 'جامعة تشرين',
    logoUrl: 'https://images.unsplash.com/photo-1562774053-625791082592?q=80&w=200&h=200&auto=format&fit=crop',
    campusImages: [],
    foundationYear: 1971,
    location: 'اللاذقية',
    address: 'اللاذقية، سوريا',
    phone: '+963 41 2423456',
    email: 'info@tishreen.edu.sy',
    type: 'public',
    collegeCount: 17,
    ranking: 3,
    studentCount: 70000,
    facultyCount: 1500,
    description: 'تقع على ساحل البحر الأبيض المتوسط، وتعد مركزًا هامًا للتعليم العالي والبحث العلمي في المنطقة الساحلية.',
    history: 'تأسست في مايو 1971 باسم جامعة اللاذقية، ثم تغير اسمها إلى جامعة تشرين تخليدًا لحرب تشرين التحريرية.',
    achievements: ['التميز في أبحاث الهندسة البحرية', 'عضو اتحاد الجامعات العربية'],
    partnerships: ['جامعة الإسكندرية (مصر)'],
    coords: { lat: 35.5224, lng: 35.7925 },
    colleges: [],
    scholarships: [],
    studentClubs: []
  },
  {
    id: 'uni-4',
    name: 'جامعة البعث',
    logoUrl: 'https://images.unsplash.com/photo-1599493356613-85317a3a6a57?q=80&w=200&h=200&auto=format&fit=crop',
    campusImages: [],
    foundationYear: 1979,
    location: 'حمص',
    address: 'حمص، سوريا',
    phone: '+963 31 2130000',
    email: 'info@albaath-univ.edu.sy',
    type: 'public',
    collegeCount: 22,
    ranking: 4,
    studentCount: 90000,
    facultyCount: 1800,
    description: 'تخدم المنطقة الوسطى من سوريا، وتضم مجموعة واسعة من الكليات العلمية والإنسانية.',
    history: 'تأسست عام 1979 وتعد رابع جامعة حكومية في سوريا من حيث تاريخ التأسيس.',
    achievements: [],
    partnerships: [],
    coords: { lat: 34.7325, lng: 36.7143 },
    colleges: [],
    scholarships: [],
    studentClubs: []
  },
  {
    id: 'uni-5',
    name: 'الجامعة الدولية الخاصة للعلوم والتكنولوجيا',
    logoUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=200&h=200&auto=format&fit=crop',
    campusImages: [],
    foundationYear: 2005,
    location: 'ريف دمشق',
    address: 'غباغب، درعا، سوريا',
    phone: '+963 15 450 450',
    email: 'info@iust.edu.sy',
    type: 'private',
    collegeCount: 6,
    ranking: 1,
    studentCount: 8000,
    facultyCount: 300,
    description: 'من أوائل الجامعات الخاصة في سوريا، تقدم برامج أكاديمية حديثة ومعتمدة دولياً.',
    history: 'تأسست عام 2005 لتكون رافداً للتعليم العالي الخاص في سوريا.',
    achievements: [],
    partnerships: ['جامعة كارديف متروبوليتان (بريطانيا)'],
    coords: { lat: 33.1593, lng: 36.2084 },
    colleges: [],
    scholarships: [],
    studentClubs: []
  },
  {
    id: 'uni-6',
    name: 'جامعة الجزيرة الخاصة',
    logoUrl: 'https://picsum.photos/seed/jazeera/200/200',
    campusImages: [],
    foundationYear: 2007,
    location: 'دير الزور',
    address: 'دير الزور، سوريا',
    phone: '+963 51 222 333',
    email: 'info@jude.edu.sy',
    type: 'private',
    collegeCount: 5,
    ranking: 10,
    studentCount: 4000,
    facultyCount: 150,
    description: 'جامعة خاصة تهدف إلى خدمة المجتمع المحلي في المنطقة الشرقية من خلال تقديم تعليم عالي الجودة.',
    history: 'تأسست في عام 2007 كأول جامعة خاصة في المنطقة الشرقية.',
    achievements: [],
    partnerships: [],
    coords: { lat: 35.337, lng: 40.144 },
    colleges: [],
    scholarships: [],
    studentClubs: []
  },
  {
    id: 'uni-7',
    name: 'جامعة الرشيد الدولية الخاصة للعلوم والتكنولوجيا',
    logoUrl: 'https://picsum.photos/seed/rasheed/200/200',
    campusImages: [],
    foundationYear: 2007,
    location: 'ريف دمشق',
    address: 'غباغب، درعا، سوريا',
    phone: '+963 15 451 451',
    email: 'info@ru.edu.sy',
    type: 'private',
    collegeCount: 5,
    ranking: 8,
    studentCount: 5000,
    facultyCount: 200,
    description: 'تقدم برامج تعليمية متميزة في مجالات الهندسة والصيدلة وإدارة الأعمال.',
    history: 'تأسست في عام 2007 بهدف تقديم تعليم يواكب المعايير الدولية.',
    achievements: [],
    partnerships: [],
    coords: { lat: 33.16, lng: 36.21 },
    colleges: [],
    scholarships: [],
    studentClubs: []
  },
  {
    id: 'uni-8',
    name: 'جامعة الاتحاد الخاصة',
    logoUrl: 'https://picsum.photos/seed/ittihad/200/200',
    campusImages: [],
    foundationYear: 2005,
    location: 'حلب',
    address: 'حلب، سوريا',
    phone: '+963 21 555 666',
    email: 'info@ipu.edu.sy',
    type: 'private',
    collegeCount: 6,
    ranking: 7,
    studentCount: 6000,
    facultyCount: 250,
    description: 'جامعة خاصة رائدة في حلب، تشتهر ببرامجها الهندسية والإدارية.',
    history: 'تأسست في عام 2005 لتكون من أوائل الجامعات الخاصة في شمال سوريا.',
    achievements: [],
    partnerships: [],
    coords: { lat: 36.21, lng: 37.14 },
    colleges: [],
    scholarships: [],
    studentClubs: []
  },
  {
    id: 'uni-9',
    name: 'جامعة اليرموك الخاصة',
    logoUrl: 'https://picsum.photos/seed/yarmouk/200/200',
    campusImages: [],
    foundationYear: 2007,
    location: 'ريف دمشق',
    address: 'طريق المطار، دمشق، سوريا',
    phone: '+963 11 777 888',
    email: 'info@ypu.edu.sy',
    type: 'private',
    collegeCount: 7,
    ranking: 9,
    studentCount: 7000,
    facultyCount: 280,
    description: 'جامعة خاصة تسعى للتميز في التعليم والبحث العلمي وتنمية المجتمع.',
    history: 'تأسست في عام 2007 لتقديم تعليم عالي متميز في محيط العاصمة دمشق.',
    achievements: [],
    partnerships: [],
    coords: { lat: 33.45, lng: 36.35 },
    colleges: [],
    scholarships: [],
    studentClubs: []
  },
  {
    id: 'uni-10',
    name: 'جامعة قاسيون الخاصة',
    logoUrl: 'https://picsum.photos/seed/qasyoun/200/200',
    campusImages: [],
    foundationYear: 2007,
    location: 'ريف دمشق',
    address: 'الكسوة، دمشق، سوريا',
    phone: '+963 11 888 999',
    email: 'info@qpu.edu.sy',
    type: 'private',
    collegeCount: 4,
    ranking: 12,
    studentCount: 3500,
    facultyCount: 130,
    description: 'تقدم برامج أكاديمية في مجالات الصيدلة والهندسة المعمارية وإدارة الأعمال.',
    history: 'تأسست عام 2007 للمساهمة في تلبية احتياجات سوق العمل.',
    achievements: [],
    partnerships: [],
    coords: { lat: 33.36, lng: 36.26 },
    colleges: [],
    scholarships: [],
    studentClubs: []
  },
  {
    id: 'uni-11',
    name: 'الجامعة السورية الخاصة',
    logoUrl: 'https://picsum.photos/seed/spu/200/200',
    campusImages: [],
    foundationYear: 2005,
    location: 'ريف دمشق',
    address: 'يعفور، دمشق، سوريا',
    phone: '+963 11 999 000',
    email: 'info@spu.edu.sy',
    type: 'private',
    collegeCount: 6,
    ranking: 5,
    studentCount: 8500,
    facultyCount: 320,
    description: 'تعتبر من الجامعات الخاصة الرائدة في سوريا، وتتميز بكلياتها الطبية والهندسية.',
    history: 'تأسست عام 2005، وكانت من أوائل الجامعات الخاصة التي حصلت على ترخيص في سوريا.',
    achievements: [],
    partnerships: [],
    coords: { lat: 33.51, lng: 36.1 },
    colleges: [],
    scholarships: [],
    studentClubs: []
  },
  {
    id: 'uni-12',
    name: 'جامعة الحواش الخاصة',
    logoUrl: 'https://picsum.photos/seed/hawash/200/200',
    campusImages: [],
    foundationYear: 2007,
    location: 'حمص',
    address: 'الحواش، حمص، سوريا',
    phone: '+963 31 111 222',
    email: 'info@hpu.edu.sy',
    type: 'private',
    collegeCount: 4,
    ranking: 11,
    studentCount: 4500,
    facultyCount: 180,
    description: 'جامعة خاصة تقع في منطقة وادي النصارى، تشتهر ببرامجها في الصيدلة وطب الأسنان.',
    history: 'تأسست عام 2007 لتكون مركزاً للتعليم العالي في منطقة القلمون الغربي.',
    achievements: [],
    partnerships: [],
    coords: { lat: 34.76, lng: 36.31 },
    colleges: [],
    scholarships: [],
    studentClubs: []
  }
];

export const MOCK_SPECIALIZATIONS: SpecializationGuide[] = [
  {
    id: 'spec-1',
    name: 'الذكاء الاصطناعي',
    category: 'تكنولوجي',
    workFields: ['تطوير البرمجيات', 'تحليل البيانات', 'أمن المعلومات'],
    skillsRequired: ['Python', 'الرياضيات المتقدمة'],
    careerOpportunities: 'شركات التكنولوجيا الكبرى والمختبرات البحثية.',
    averageSalaryGrade: 'high'
  },
  {
    id: 'spec-2',
    name: 'علم البيانات',
    category: 'تكنولوجي',
    workFields: ['تحليل البيانات', 'تعلم الآلة', 'إدارة قواعد البيانات'],
    skillsRequired: ['Python', 'SQL', 'الإحصاء'],
    careerOpportunities: 'شركات تحليل البيانات، البنوك، المؤسسات البحثية.',
    averageSalaryGrade: 'high'
  },
  {
    id: 'spec-3',
    name: 'الأمن السيبراني',
    category: 'تكنولوجي',
    workFields: ['أمن الشبكات', 'الاختراق الأخلاقي', 'الاستجابة للحوادث'],
    skillsRequired: ['Linux', 'الشبكات', 'Cryptography'],
    careerOpportunities: 'المؤسسات الحكومية، الشركات الكبرى، شركات أمن المعلومات.',
    averageSalaryGrade: 'high'
  }
];

const MOCK_REVIEWS_C1: Review[] = [
  {
    id: 'r1',
    user: { name: 'علي حسن', avatarUrl: 'https://i.pravatar.cc/150?u=review1' },
    rating: 5,
    comment: 'دورة ممتازة وشرح واضح جداً. استفدت كثيراً من المحتوى العملي. أنصح بها بشدة لطلاب الهندسة.',
    date: '2024-08-15'
  },
  {
    id: 'r2',
    user: { name: 'فاطمة الزهراء', avatarUrl: 'https://i.pravatar.cc/150?u=review2' },
    rating: 4,
    comment: 'المحتوى العلمي دقيق ومفيد، لكن أتمنى لو كان هناك المزيد من التمارين العملية في نهاية كل وحدة.',
    date: '2024-08-10'
  }
];

const MOCK_REVIEWS_C3: Review[] = [
    { id: 'r3', user: { name: 'نور الشامي', avatarUrl: 'https://i.pravatar.cc/150?u=review3' }, rating: 5, comment: 'شرح رائع ومبسط جداً، شكراً أستاذة ليلى!', date: '2024-07-20' },
];


export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'خوارزميات وهياكل البيانات - المنهج الجامعي',
    instructor: 'د. سامر حسن',
    instructorBio: 'أستاذ محاضر في جامعة دمشق، خبير في هندسة البرمجيات.',
    instructorAvatar: 'https://i.pravatar.cc/150?u=instructor1',
    rating: 4.9,
    reviews: 850,
    price: 0,
    imageUrl: 'https://picsum.photos/seed/algorithms/600/400',
    category: 'هندسة معلوماتية',
    description: 'شرح شامل لمقرر هياكل البيانات والخوارزميات لطلاب السنة الثانية في كليات الهندسة السورية.',
    whatYouWillLearn: ['فهم تعقيد الخوارزميات (Big O).', 'إتقان القوائم المرتبطة (Linked Lists).'],
    duration: '25 ساعة',
    skillLevel: 'متوسط',
    stage: 'academic',
    curriculum: 'syrian',
    status: 'Approved',
    contentType: 'فيديو',
    modules: [{ title: 'الوحدة الأولى', lessons: [{title: 'المقدمة', duration: '20 دقيقة'}] }],
    reviewsData: MOCK_REVIEWS_C1,
  },
   {
    id: 'c2',
    title: 'مقدمة في الذكاء الاصطناعي',
    instructor: 'د. سامر حسن',
    instructorBio: 'أستاذ محاضر في جامعة دمشق، خبير في هندسة البرمجيات.',
    instructorAvatar: 'https://i.pravatar.cc/150?u=instructor1',
    rating: 4.8,
    reviews: 1200,
    price: 75,
    imageUrl: 'https://picsum.photos/seed/ai/600/400',
    category: 'هندسة معلوماتية',
    description: 'دورة تأسيسية تستعرض المفاهيم الأساسية للذكاء الاصطناعي وتطبيقاته العملية.',
    whatYouWillLearn: ['فهم تعلم الآلة والشبكات العصبونية.', 'بناء نماذج بسيطة باستخدام Python.'],
    duration: '30 ساعة',
    skillLevel: 'مبتدئ',
    stage: 'academic',
    curriculum: 'syrian',
    status: 'Pending Review',
    contentType: 'فيديو',
    modules: [{ title: 'الوحدة الأولى: المفاهيم', lessons: [{title: 'ما هو الذكاء الاصطناعي', duration: '15 دقيقة'}] }],
    reviewsData: [],
  },
  {
    id: 'c3',
    title: 'الفيزياء الحديثة لطلاب السنة الأولى',
    instructor: 'أ. ليلى حسن',
    instructorBio: 'خبيرة في تبسيط العلوم الفيزيائية وتطوير المناهج.',
    instructorAvatar: 'https://i.pravatar.cc/150?u=manager1',
    rating: 4.7,
    reviews: 450,
    price: 25,
    imageUrl: 'https://picsum.photos/seed/physics/600/400',
    category: 'العلوم الأساسية',
    description: 'شرح مبسط ومصور لمبادئ الفيزياء الحديثة، بما في ذلك النسبية وميكانيكا الكم.',
    whatYouWillLearn: ['فهم نظرية النسبية الخاصة لأينشتاين.', 'استيعاب المبادئ الأساسية لفيزياء الكم.'],
    duration: '18 ساعة',
    skillLevel: 'مبتدئ',
    stage: 'academic',
    curriculum: 'syrian',
    status: 'Approved',
    contentType: 'تفاعلي',
    modules: [{ title: 'الوحدة الأولى: النسبية', lessons: [{title: 'مقدمة', duration: '25 دقيقة'}] }],
    reviewsData: MOCK_REVIEWS_C3,
  },
  {
    id: 'c4',
    title: 'مبادئ التسويق الرقمي',
    instructor: 'أ. ليلى حسن',
    instructorBio: 'خبيرة في تبسيط العلوم الفيزيائية وتطوير المناهج.',
    instructorAvatar: 'https://i.pravatar.cc/150?u=manager1',
    rating: 4.6, reviews: 320, price: 50,
    imageUrl: 'https://picsum.photos/seed/marketing/600/400',
    category: 'أعمال',
    description: 'تعلم أساسيات التسويق عبر الإنترنت، من وسائل التواصل الاجتماعي إلى محركات البحث.',
    whatYouWillLearn: ['بناء استراتيجية تسويق رقمي.', 'إدارة الحملات الإعلانية على فيسبوك وجوجل.'],
    duration: '22 ساعة', skillLevel: 'مبتدئ', stage: 'continuous', curriculum: 'international',
    status: 'Approved', contentType: 'فيديو',
    modules: [{ title: 'مقدمة', lessons: [{title: 'ما هو التسويق الرقمي', duration: '10 دقائق'}] }], reviewsData: [],
  },
  {
    id: 'c5',
    title: 'الكيمياء العضوية - المنهج الجامعي',
    instructor: 'د. منى الشامي',
    instructorBio: 'أستاذة مساعدة في الكيمياء، باحثة في الكيمياء العضوية.',
    instructorAvatar: 'https://i.pravatar.cc/150?u=instructor2',
    rating: 4.9, reviews: 950, price: 0,
    imageUrl: 'https://picsum.photos/seed/chemistry/600/400',
    category: 'العلوم الأساسية',
    description: 'شرح معمق لمنهج الكيمياء العضوية لطلاب كليات الصيدلة والعلوم في سوريا.',
    whatYouWillLearn: ['فهم التفاعلات العضوية الأساسية.', 'تسمية المركبات العضوية.'],
    duration: '40 ساعة', skillLevel: 'متقدم', stage: 'academic', curriculum: 'syrian',
    status: 'Approved', contentType: 'فيديو',
    modules: [{ title: 'الألكانات', lessons: [{title: 'مقدمة', duration: '30 دقائق'}] }], reviewsData: [],
  },
  {
    id: 'c6',
    title: 'تاريخ الفن الحديث',
    instructor: 'أ. ليلى حسن',
    instructorBio: 'خبيرة في تبسيط العلوم الفيزيائية وتطوير المناهج.',
    instructorAvatar: 'https://i.pravatar.cc/150?u=manager1',
    rating: 0, reviews: 0, price: 30,
    imageUrl: 'https://picsum.photos/seed/art/600/400',
    category: 'فنون',
    description: 'استعراض للحركات الفنية الحديثة من الانطباعية إلى التكعيبية.',
    whatYouWillLearn: ['التعرف على أشهر الفنانين وأعمالهم.', 'تحليل الأعمال الفنية.'],
    duration: '15 ساعة', skillLevel: 'كل المستويات', stage: 'continuous', curriculum: 'international',
    status: 'Draft', contentType: 'فيديو',
    modules: [], reviewsData: [],
  },
  {
    id: 'c7',
    title: 'تحليل النظم - هندسة معلوماتية',
    instructor: 'د. سامر حسن',
    instructorBio: 'أستاذ محاضر في جامعة دمشق, خبير في هندسة البرمجيات.',
    instructorAvatar: 'https://i.pravatar.cc/150?u=instructor1',
    rating: 0, reviews: 0, price: 40,
    imageUrl: 'https://picsum.photos/seed/systems/600/400',
    category: 'هندسة معلوماتية',
    description: 'مقرر جامعي يغطي دورة حياة تطوير البرمجيات ومنهجيات التحليل والتصميم.',
    whatYouWillLearn: ['إنشاء مخططات UML.', 'فهم متطلبات المستخدم وتحليلها.'],
    duration: '28 ساعة', skillLevel: 'متوسط', stage: 'academic', curriculum: 'syrian',
    status: 'Needs Revision', contentType: 'تفاعلي',
    modules: [], reviewsData: [],
  }
];

export const MOCK_SKILL_COURSES: SkillCourse[] = [
  {
    id: 's1',
    title: 'احترف صيانة الهواتف الذكية',
    description: 'دورة تطبيقية شاملة من الألف إلى الياء في صيانة الهاردوير والسوفتوير.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600&h=400&auto=format&fit=crop',
    platform: 'Platform',
    link: '#',
    category: 'مهن تقنية'
  },
  {
    id: 's2',
    title: 'التصميم الجرافيكي باستخدام Canva',
    description: 'تعلم أسرار التصميم الجذاب للمبتدئين لإنشاء محتوى احترافي لوسائل التواصل الاجتماعي.',
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&h=400&auto=format&fit=crop',
    platform: 'YouTube',
    link: '#',
    category: 'التصميم والإبداع'
  },
  {
    id: 's3',
    title: 'أساسيات المونتاج باستخدام Adobe Premiere',
    description: 'خطوتك الأولى في عالم تحرير الفيديو الاحترافي. تعلم القص والدمج وإضافة المؤثرات.',
    imageUrl: 'https://images.unsplash.com/photo-1574717024633-6005c4864a93?q=80&w=600&h=400&auto=format&fit=crop',
    platform: 'Platform',
    link: '#',
    category: 'الفنون المرئية'
  },
  {
    id: 's4',
    title: 'إدارة وسائل التواصل الاجتماعي للشركات',
    description: 'تعلم كيف تدير حسابات الشركات باحترافية وتضع استراتيجيات محتوى ناجحة.',
    imageUrl: 'https://images.unsplash.com/photo-1611162616805-6a405b6a4a4f?q=80&w=600&h=400&auto=format&fit=crop',
    platform: 'Platform', link: '#', category: 'التسويق'
  }
];

export const MOCK_USERS: { [key: string]: User } = {
  student: {
    id: '230510040001',
    name: 'أحمد علي',
    email: 'student@example.com',
    role: UserRole.STUDENT,
    avatarUrl: 'https://i.pravatar.cc/150?u=student1',
    status: 'active',
    joinDate: '2023-05-10',
    educationalStage: 'academic',
    tags: ['مستخدم متميز'],
    riskScore: 'منخفض',
    lastActivity: '2024-08-21 10:00:00',
  },
  student2: { id: '230812050002', name: 'سارة محمود', email: 'student2@example.com', role: UserRole.STUDENT, avatarUrl: 'https://i.pravatar.cc/150?u=student2', status: 'active', joinDate: '2023-08-12', educationalStage: 'academic', tags: ['مستخدم جديد'], riskScore: 'منخفض', lastActivity: '2024-08-19 14:00:00' },
  student3: { id: '240101010003', name: 'عمر ياسين', email: 'student3@example.com', role: UserRole.STUDENT, avatarUrl: 'https://i.pravatar.cc/150?u=student3', status: 'pending', joinDate: '2024-01-01', riskScore: 'مرتفع', lastActivity: '2024-08-21 01:00:00' },
  instructor: {
    id: 'instructor1',
    name: 'د. سامر حسن',
    email: 'instructor@example.com',
    role: UserRole.INSTRUCTOR,
    avatarUrl: 'https://i.pravatar.cc/150?u=instructor1',
    status: 'active',
    joinDate: '2023-01-10',
    riskScore: 'منخفض',
    lastActivity: '2024-08-21 09:00:00',
  },
  instructor2: { id: 'instructor2', name: 'د. منى الشامي', email: 'instructor2@example.com', role: UserRole.INSTRUCTOR, avatarUrl: 'https://i.pravatar.cc/150?u=instructor2', status: 'active', joinDate: '2023-06-20', riskScore: 'منخفض', lastActivity: '2024-08-20 18:00:00' },
  manager: {
    id: 'manager1',
    name: 'أ. ليلى حسن',
    email: 'manager@example.com',
    role: UserRole.CONTENT_MANAGER,
    avatarUrl: 'https://i.pravatar.cc/150?u=manager1',
    status: 'active',
    joinDate: '2023-02-15',
    riskScore: 'منخفض',
    lastActivity: '2024-08-21 08:30:00',
  },
  admin: {
    id: '220115300001',
    name: 'د. خالد بن الوليد',
    email: 'admin@example.com',
    role: UserRole.ADMIN,
    avatarUrl: 'https://i.pravatar.cc/150?u=admin',
    status: 'active',
    joinDate: '2022-01-15',
    riskScore: 'منخفض',
    lastActivity: '2024-08-21 11:00:00',
  }
};

export const ALL_MOCK_USERS: User[] = Object.values(MOCK_USERS);

export const MOCK_CLASSIFICATION_TREE: ClassificationNode[] = [
    {
        id: 'academic-syria',
        name: 'المناهج الجامعية السورية',
        children: [
            { id: 'eng-syria', name: 'الهندسات' },
            { id: 'law-syria', name: 'الحقوق' },
            { id: 'med-syria', name: 'الطب والتمريض' },
        ]
    }
];

export const MOCK_LECTURES: UpcomingLecture[] = [ 
    { id: 'l1', courseTitle: 'خوارزميات', lectureTitle: 'جلسة Q&A', time: '7:00 PM' },
    { id: 'l2', courseTitle: 'فيزياء', lectureTitle: 'مراجعة الفصل 2', time: 'غداً 5:00 PM' },
];
export const MOCK_QUIZZES: Quiz[] = [ 
    { id: 'q1', courseTitle: 'فيزياء', quizTitle: 'اختبار الوحدة 1', dueDate: '3 أيام' },
    { id: 'q2', courseTitle: 'خوارزميات', quizTitle: 'الاختبار النصفي', dueDate: '5 أيام' },
];
export const MOCK_NOTIFICATIONS: Notification[] = [ 
    { id: 'n1', message: 'تم نشر درجتك في اختبار الفيزياء.', time: 'منذ ساعة', isRead: false },
    { id: 'n2', message: 'مرحباً بك في دورة التسويق الرقمي!', time: 'منذ يومين', isRead: true },
    { id: 'n3', message: 'قام المدرب بالرد على سؤالك.', time: 'منذ 3 ساعات', isRead: false },
];
export const MOCK_TASKS: Task[] = [ 
    { id: 1, text: 'تحميل مراجع الفيزياء', completed: false },
    { id: 2, text: 'حل واجب الخوارزميات', completed: true },
    { id: 3, text: 'مشاهدة محاضرة التسويق الأولى', completed: false },
];
export const MOCK_AUDIT_LOGS: AuditLog[] = [ 
  { id: 'log1', user: MOCK_USERS.admin, action: 'دخول', timestamp: '2024-08-21 11:00:00', ipAddress: '192.168.1.1' },
  { id: 'log2', user: MOCK_USERS.manager, action: 'اعتماد دورة "الفيزياء"', timestamp: '2024-08-21 10:30:00', ipAddress: '192.168.1.2' },
  { id: 'log3', user: MOCK_USERS.instructor, action: 'إنشاء دورة "تحليل النظم"', timestamp: '2024-08-20 18:00:00', ipAddress: '192.168.1.3' },
  { id: 'log4', user: MOCK_USERS.student, action: 'تسجيل في دورة', timestamp: '2024-08-20 15:20:00', ipAddress: '192.168.1.4' },
];
export const MOCK_LIBRARY_RESOURCES: LibraryResource[] = [ 
    { id: 1, title: 'الخوارزميات المبسطة', author: 'أحمد سعيد', type: 'كتاب', imageUrl: 'https://picsum.photos/seed/book1/300/400' },
    { id: 2, title: 'شرح نظرية النسبية', author: 'ألبرت أينشتاين (مترجم)', type: 'مقالة', imageUrl: 'https://picsum.photos/seed/article1/300/400' },
    { id: 3, title: 'فيزياء الكم للمبتدئين', author: 'قناة علمية', type: 'فيديو', imageUrl: 'https://picsum.photos/seed/video1/300/400' },
    { id: 4, title: 'بحث في الشبكات العصبونية', author: 'د. سامر حسن', type: 'بحث', imageUrl: 'https://picsum.photos/seed/research1/300/400' },
    { id: 5, title: 'مقدمة في علم الاقتصاد', author: 'آدم سميث (مترجم)', type: 'كتاب', imageUrl: 'https://picsum.photos/seed/book2/300/400' },
];
export const MOCK_ACHIEVEMENTS: Achievement[] = [ 
    { id: 'a1', title: 'المتعلم المثابر', description: 'أكملت 5 دورات.', date: '2024-07-15', icon: 'trophy' },
    { id: 'a2', title: 'خبير الفيزياء', description: 'أكملت جميع دورات الفيزياء.', date: '2024-08-01', icon: 'academic_cap' },
    { id: 'a3', title: 'مشارك فعال', description: 'نشرت 10 أسئلة مفيدة.', date: '2024-08-10', icon: 'star' },
];
export const MOCK_ACTIVITIES: UserActivity[] = [ 
    { id: 'act1', action: 'بدأ', target: 'دورة الفيزياء', date: 'منذ يومين' },
    { id: 'act2', action: 'أكمل', target: 'اختبار الوحدة 1', date: 'منذ 3 أيام' },
    { id: 'act3', action: 'حصل على شهادة', target: 'دورة الخوارزميات', date: 'منذ أسبوع' },
];
export const MOCK_TRANSACTIONS: Transaction[] = [ 
  { id: 'tx1', user: MOCK_USERS.student, amount: 25, status: 'Completed', date: '2024-08-20', description: 'شراء دورة الفيزياء' },
  { id: 'tx2', user: MOCK_USERS.student2, amount: 50, status: 'Completed', date: '2024-08-19', description: 'شراء دورة التسويق' },
  { id: 'tx3', user: MOCK_USERS.student, amount: 75, status: 'Pending', date: '2024-08-21', description: 'شراء دورة الذكاء الاصطناعي' },
  { id: 'tx4', user: MOCK_USERS.student2, amount: 25, status: 'Refunded', date: '2024-08-15', description: 'استرداد دورة الفيزياء' },
  { id: 'tx5', user: MOCK_USERS.student3, amount: 500, status: 'Suspicious', date: '2024-08-21', description: 'محاولة شراء مريبة' },
];
export const MOCK_CAMPAIGNS: Campaign[] = [ 
  { id: 'camp1', title: 'تخفيضات الصيف', status: 'Sent', openRate: 45, targetAudience: 'الكل' },
  { id: 'camp2', title: 'دورات جديدة في الهندسة', status: 'Draft', openRate: 0, targetAudience: 'طلاب الهندسة' },
  { id: 'camp3', title: 'تذكير بالعودة للمنصة', status: 'Scheduled', openRate: 0, targetAudience: 'طلاب غير نشطين' },
];
export const MOCK_SURVEYS: Survey[] = [ { id: 'surv1', title: 'تقييم تجربة الاستخدام', responses: 120, results: [{option: 'ممتاز', count: 90}, {option: 'جيد', count: 25}, {option: 'سيء', count: 5}] } ];
export const MOCK_FEEDBACK: Feedback[] = [ 
    { id: 'fb1', user: MOCK_USERS.student, content: 'محتوى رائع جداً', date: '2024-08-18' },
    { id: 'fb2', user: MOCK_USERS.student2, content: 'أتمنى إضافة المزيد من الدورات في مجال الأعمال.', date: '2024-08-20' },
];
export const MOCK_CURRICULA: Curriculum[] = [ { id: 'cur1', title: 'المنهج السوري 2024', version: '1.0', modules: [] } ];
export const MOCK_LEARNING_PATHS: LearningPath[] = [ { id: 'lp1', studentName: 'أحمد علي', studentAbility: 'High', currentPath: 'متقدم', effectiveness: 95 } ];
export const MOCK_TALENTS: Talent[] = [ 
    { id: 'tal1', user: MOCK_USERS.student, excellenceScore: 98, keyAchievement: 'الأول على الدفعة', honored: true },
    { id: 'tal2', user: MOCK_USERS.student2, excellenceScore: 95, keyAchievement: 'أعلى درجة في مشروع التخرج', honored: false },
];
export const MOCK_INNOVATION_IDEAS: InnovationIdea[] = [ 
    { id: 'idea1', title: 'مختبر افتراضي للكيمياء', submittedBy: 'م. فاطمة', status: 'Reviewing' },
    { id: 'idea2', title: 'نظام توصية بالدورات يعتمد على IA', submittedBy: 'علي حسن', status: 'New' },
    { id: 'idea3', title: 'إضافة مسارات مهنية', submittedBy: 'فريق العمل', status: 'Implemented' },
];
export const MOCK_LEARNING_PATHS_LIST: LearningPathDetailed[] = [ 
    { id: 'lp-1', title: 'مسار مطور الواجهات الأمامية (Frontend)', description: 'من الصفر للاحتراف: تعلم HTML, CSS, JavaScript, و React لبناء واجهات مستخدم تفاعلية.', imageUrl: 'https://picsum.photos/seed/frontend/600/400', totalDuration: '50 ساعة', stages: [] },
    { id: 'lp-2', title: 'مسار مطور الواجهات الخلفية (Backend)', description: 'تعلم بناء الخوادم وقواعد البيانات باستخدام Node.js, Express, و MongoDB.', imageUrl: 'https://picsum.photos/seed/backend/600/400', totalDuration: '65 ساعة', stages: [] },
    { id: 'lp-3', title: 'مسار علم البيانات', description: 'اكتشف عالم البيانات وتعلم كيفية تحليلها وتصورها باستخدام Python, Pandas, و Matplotlib.', imageUrl: 'https://picsum.photos/seed/datascience/600/400', totalDuration: '80 ساعة', stages: [] },
];
export const MOCK_SKILL_COURSES_DUMMY: SkillCourse[] = MOCK_SKILL_COURSES;
