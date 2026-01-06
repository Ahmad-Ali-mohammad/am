
import React, { useState } from 'react';
import CourseCard from '../../components/CourseCard';
import { MOCK_COURSES, MOCK_LECTURES, MOCK_QUIZZES, MOCK_NOTIFICATIONS, MOCK_TASKS } from '../../constants';
import { Task } from '../../types';

// Icon Imports
import { BellIcon } from '../../components/icons/BellIcon';
import { CalendarDaysIcon } from '../../components/icons/CalendarDaysIcon';
import { QuestionMarkCircleIcon } from '../../components/icons/QuestionMarkCircleIcon';
import { ClipboardDocumentListIcon } from '../../components/icons/ClipboardDocumentListIcon';

// --- Reusable Components ---
const InfoCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; }> = ({ icon, title, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
        <div className="flex items-center mb-4">
            <div className="bg-primary-100 p-2 rounded-full ml-3">{icon}</div>
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        </div>
        {children}
    </div>
);

const ToDoList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
    const [newTask, setNewTask] = useState('');

    const handleToggle = (id: number) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    };
    
    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if(newTask.trim()) {
            const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
            setTasks([...tasks, { id: newId, text: newTask, completed: false }]);
            setNewTask('');
        }
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
             <div className="flex items-center mb-4">
                <div className="bg-primary-100 p-2 rounded-full ml-3">
                    <ClipboardDocumentListIcon className="w-6 h-6 text-primary-600"/>
                </div>
                <h3 className="text-lg font-bold text-gray-800">قائمة مهامي</h3>
            </div>
            <ul className="space-y-3 max-h-48 overflow-y-auto pr-2">
                {tasks.map(task => (
                    <li key={task.id} className="flex items-center">
                        <input type="checkbox" checked={task.completed} onChange={() => handleToggle(task.id)} className="ml-3 h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                        <span className={`flex-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>{task.text}</span>
                    </li>
                ))}
            </ul>
             <form onSubmit={handleAddTask} className="mt-4 flex space-x-2 space-x-reverse">
                <input type="text" value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="إضافة مهمة جديدة..." className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm" />
                <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-semibold">إضافة</button>
            </form>
        </div>
    );
};


// --- Main Dashboard Component ---
const StudentDashboard: React.FC = () => {
    // Mock enrolled courses
    const enrolledCourses = MOCK_COURSES.slice(0, 2);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-3">
                 <h1 className="text-3xl font-bold text-gray-800">مرحباً بعودتك، أحمد!</h1>
                <p className="text-gray-600 mt-1">لنجعل اليوم يوماً مثمراً. ماذا تريد أن تتعلم اليوم؟</p>
            </div>
            
            {/* Quick Access Cards */}
            <InfoCard icon={<CalendarDaysIcon className="w-6 h-6 text-primary-600"/>} title="محاضرات قادمة">
                 <ul className="space-y-2 text-sm">
                    {MOCK_LECTURES.slice(0,2).map(lec => <li key={lec.id} className="text-gray-700"><strong>{lec.lectureTitle}</strong> في <span className="font-semibold text-primary-700">{lec.courseTitle}</span> - {lec.time}</li>)}
                 </ul>
            </InfoCard>
            <InfoCard icon={<QuestionMarkCircleIcon className="w-6 h-6 text-primary-600"/>} title="اختبارات معلقة">
                  <ul className="space-y-2 text-sm">
                    {MOCK_QUIZZES.map(quiz => <li key={quiz.id} className="text-gray-700"><strong>{quiz.quizTitle}</strong> - <span className="text-red-600">{quiz.dueDate}</span></li>)}
                 </ul>
            </InfoCard>
            <InfoCard icon={<BellIcon className="w-6 h-6 text-primary-600"/>} title="آخر الإشعارات">
                  <ul className="space-y-2 text-sm">
                    {MOCK_NOTIFICATIONS.filter(n => !n.isRead).map(n => <li key={n.id} className="text-gray-700">{n.message} <span className="text-xs text-gray-400">({n.time})</span></li>)}
                 </ul>
            </InfoCard>

            {/* My Courses Section */}
            <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">متابعة التعلم</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <CourseCard course={enrolledCourses[0]} progress={75} />
                    <CourseCard course={enrolledCourses[1]} progress={30} />
                </div>
            </div>

            {/* To-Do List */}
            <div className="lg:col-span-3">
                <ToDoList />
            </div>

        </div>
    );
};

export default StudentDashboard;
