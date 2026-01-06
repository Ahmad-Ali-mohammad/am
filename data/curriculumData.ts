
export interface Lesson {
  id: string;
  title: string;
  type: 'lesson';
  content: {
    text: string;
    explanation: string;
    exercises: { q: string; a: string }[];
    media: { type: 'video' | 'image'; url: string }[];
  };
  objectives: string[];
}

export interface Unit {
  id: string;
  title: string;
  type: 'unit';
  children: Lesson[];
}

export interface Subject {
  id: string;
  title: string;
  type: 'subject';
  children: Unit[];
}

export interface Grade {
  id: string;
  title: string;
  type: 'grade';
  children: Subject[];
}

export interface Stage {
  id: string;
  title: string;
  type: 'stage';
  children: Grade[];
}

export type CurriculumNode = Stage | Grade | Subject | Unit | Lesson;

const mockLesson: Lesson = {
  id: 'math-g9-u1-l1',
  title: 'الدرس الأول: نظرية فيثاغورس',
  type: 'lesson',
  objectives: [
    'أن يفهم الطالب العلاقة بين أضلاع المثلث القائم.',
    'أن يتمكن الطالب من تطبيق النظرية لحل المسائل.',
    'أن يستنتج الطالب عكس نظرية فيثاغورس.'
  ],
  content: {
    text: 'في المثلث القائم، مربع طول الوتر يساوي مجموع مربعي طولي الضلعين القائمين. (صفحة 15)',
    explanation: 'تعتبر نظرية فيثاغورس من أهم النظريات في الهندسة الإقليدية. سميت على اسم الفيلسوف والرياضي اليوناني فيثاغورس. تنص النظرية على أنه في أي مثلث قائم الزاوية، مساحة المربع الذي ضلعه الوتر (الضلع المقابل للزاوية القائمة) تساوي مجموع مساحتي المربعين على الضلعين الآخرين.',
    exercises: [
      { q: 'مثلث قائم أطوال أضلاعه القائمة 3 سم و 4 سم. ما طول الوتر؟', a: 'طول الوتر هو 5 سم، لأن 3^2 + 4^2 = 9 + 16 = 25، وجذر الـ 25 هو 5.' },
      { q: 'هل المثلث الذي أطوال أضلاعه 5، 12، 13 هو مثلث قائم؟', a: 'نعم، لأن 5^2 + 12^2 = 25 + 144 = 169، و 13^2 = 169. بما أن مجموع مربعي الضلعين الأصغرين يساوي مربع الضلع الأكبر، فالمثلث قائم حسب عكس نظرية فيثاغورس.' }
    ],
    media: [
      { type: 'video', url: 'https://www.youtube.com/embed/наклейка' },
      { type: 'image', url: 'https://picsum.photos/seed/pythagoras/600/400' }
    ]
  }
};

export const SYRIAN_CURRICULUM_DATA: Stage[] = [
    {
        id: 'stage-secondary',
        title: 'المرحلة الثانوية (منهج 2024 المطور)',
        type: 'stage',
        children: [
            {
                id: 'grade-10',
                title: 'الصف العاشر',
                type: 'grade',
                children: [
                    { id: 'math-g10', title: 'الرياضيات', type: 'subject', children: [] },
                    { id: 'arabic-g10', title: 'اللغة العربية', type: 'subject', children: [] },
                ]
            }
        ]
    },
    {
        id: 'stage-preparatory',
        title: 'المرحلة الإعدادية',
        type: 'stage',
        children: [
            {
                id: 'grade-9',
                title: 'الصف التاسع',
                type: 'grade',
                children: [
                     {
                        id: 'math-g9',
                        title: 'الرياضيات (الجبر والهندسة)',
                        type: 'subject',
                        children: [
                            {
                                id: 'math-g9-u1',
                                title: 'الوحدة الأولى: الهندسة',
                                type: 'unit',
                                children: [mockLesson]
                            },
                             {
                                id: 'math-g9-u2',
                                title: 'الوحدة الثانية: الجبر',
                                type: 'unit',
                                children: [{...mockLesson, id: 'math-g9-u2-l1', title: 'الدرس الأول: التحليل إلى جداء عوامل'}]
                            }
                        ]
                    },
                    { id: 'science-g9', title: 'العلوم', type: 'subject', children: [] },
                ]
            },
            { id: 'grade-8', title: 'الصف الثامن', type: 'grade', children: [] },
            { id: 'grade-7', title: 'الصف السابع', type: 'grade', children: [] },
        ]
    },
    {
        id: 'stage-primary',
        title: 'المرحلة الابتدائية',
        type: 'stage',
        children: [
            { id: 'grade-6', title: 'الصف السادس', type: 'grade', children: [] },
        ]
    }
];
