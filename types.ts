
export enum UserRole {
  VISITOR = 'Visitor',
  STUDENT = 'Student',
  INSTRUCTOR = 'Instructor',
  CONTENT_MANAGER = 'Content Manager',
  ADMIN = 'Administrator',
}

export type UserStatus = 'active' | 'pending' | 'suspended';
export type UserTag = 'مستخدم جديد' | 'مستخدم متميز' | 'في خطر';
export type UserRiskScore = 'منخفض' | 'متوسط' | 'مرتفع';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  status: UserStatus;
  joinDate: string;
  educationalStage?: EducationalStage;
  tags?: UserTag[];
  riskScore?: UserRiskScore;
  lastActivity?: string;
}

export interface Review {
  id: string;
  user: { name: string; avatarUrl: string; };
  rating: number;
  comment: string;
  date: string;
}

export type EducationalStage = 'primary' | 'preparatory' | 'secondary' | 'academic' | 'continuous';
export type CourseStatus = 'Draft' | 'Pending Review' | 'Approved' | 'Needs Revision';
export type ContentType = 'فيديو' | 'نص' | 'تفاعلي' | 'اختبار' | 'مشروع' | 'بودكاست';
export type CurriculumType = 'saudi' | 'egyptian' | 'emirati' | 'syrian' | 'international';
export type SkillLevel = 'مبتدئ' | 'متوسط' | 'متقدم' | 'متخصص' | 'كل المستويات';

export interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorBio: string;
  instructorAvatar: string;
  rating: number;
  reviews: number;
  price: number;
  imageUrl: string;
  category: string;
  description: string;
  whatYouWillLearn: string[];
  duration: string;
  skillLevel: SkillLevel;
  modules: CourseModule[];
  reviewsData: Review[];
  stage?: EducationalStage;
  status: CourseStatus;
  contentType: ContentType;
  curriculum?: CurriculumType;
  ageGroup?: string;
}

export interface CourseModule {
    title: string;
    lessons: { title: string; duration: string }[];
}

// --- Syrian University Detailed Interfaces ---
export interface SyrianUniversity {
  id: string;
  name: string;
  logoUrl: string;
  campusImages: string[];
  foundationYear: number;
  location: string;
  address: string;
  phone: string;
  email: string;
  type: 'public' | 'private';
  collegeCount: number;
  ranking: number;
  studentCount: number;
  facultyCount: number;
  description: string;
  history: string;
  achievements: string[];
  partnerships: string[];
  coords: { lat: number; lng: number };
  colleges: SyrianCollege[];
  scholarships: string[];
  studentClubs: string[];
}

export interface SyrianCollege {
  id: string;
  name: string;
  dean: string;
  vision: string;
  mission: string;
  departments: SyrianDepartment[];
  graduationStats: string;
}

export interface SyrianDepartment {
  id: string;
  name: string;
  degrees: string[];
  curriculumLink: string;
  admissionRequirements: string;
}

export interface SpecializationGuide {
  id: string;
  name: string;
  category: string;
  workFields: string[];
  skillsRequired: string[];
  careerOpportunities: string;
  averageSalaryGrade: 'low' | 'medium' | 'high';
}

export interface ClassificationNode {
  id: string;
  name: string;
  count?: number;
  children?: ClassificationNode[];
}

export interface SkillCourse {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  platform: 'YouTube' | 'Platform';
  link: string;
  category: string;
}

export type PathCourseStatus = 'completed' | 'in_progress' | 'locked';

export interface PathCourse {
  courseId: string;
  status: PathCourseStatus;
  prerequisites: string[];
}

export interface LearningPathDetailed {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  totalDuration: string;
  stages: {
    title: string;
    courses: PathCourse[];
    certificateName?: string;
  }[];
}

export interface UpcomingLecture { id: string; courseTitle: string; lectureTitle: string; time: string; }
export interface Quiz { id: string; courseTitle: string; quizTitle: string; dueDate: string; }
export interface Notification { id: string; message: string; time: string; isRead: boolean; }
export interface Task { id: number; text: string; completed: boolean; }
export interface AuditLog { id: string; user: { name: string; avatarUrl: string; }; action: string; timestamp: string; ipAddress: string; }
export interface ResourceTypeEnum { type: 'كتاب' | 'بحث' | 'مقالة' | 'فيديو'; }
export type ResourceType = 'كتاب' | 'بحث' | 'مقالة' | 'فيديو';
export interface LibraryResource { id: number; title: string; author: string; type: ResourceType; imageUrl: string; }
export interface Achievement { id: string; title: string; description: string; date: string; icon: 'trophy' | 'academic_cap' | 'star'; }
export interface UserActivity { id: string; action: string; target: string; date: string; }
export type TransactionStatus = 'Completed' | 'Pending' | 'Failed' | 'Refunded' | 'Suspicious';
export interface Transaction { id: string; user: User; amount: number; status: TransactionStatus; date: string; description: string; }
export interface Campaign { id: string; title: string; status: 'Sent' | 'Draft' | 'Scheduled'; openRate: number; targetAudience: string; }
export interface Survey { id: string; title: string; responses: number; results: { option: string; count: number }[]; }
export interface Feedback { id: string; user: User; content: string; date: string; }
export interface Curriculum { id: string; title: string; version: string; modules: { id: string; title: string; lessons: { id: string; title: string }[]; }[]; }
export interface LearningPath { id: string; studentName: string; studentAbility: 'High' | 'Medium' | 'Low'; currentPath: 'أساسي' | 'متقدم'; effectiveness: number; }
export interface Talent { id: string; user: User; excellenceScore: number; keyAchievement: string; honored: boolean; }
export type InnovationStatus = 'New' | 'Reviewing' | 'Approved' | 'Implemented';
export interface InnovationIdea { id: string; title: string; submittedBy: string; status: InnovationStatus; }
