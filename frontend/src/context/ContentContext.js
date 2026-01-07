import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { contentAPI, historyAPI } from '../api';
import { useAuth } from './AuthContext';

const ContentContext = createContext(null);

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
    intro: "في قلب مدينة الطبقة، حيث الحاجة تلتقي بالإصرار، ولدت فكرة منظمة إنسانية تهدف لصناعة أمل أفضل.",
    description: "تأسست منظمتنا الإنسانية بتاريخ 2017/6/6 على يد مجموعة من شباب مدينة الطبقة.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    vision: "أن نكون أصحاب دور فعال ومكانة متميزة في مجال التنمية المجتمعية.",
    mission: "تحسين الواقع الاقتصادي وتنمية قطاع الخدمات الأساسية."
  },
  services: [],
  projects: [],
  jobs: [],
  team: [],
  departments: [],
  articles: [],
  categories: [],
  tags: [],
  events: [],
  pages: [],
  navigation: [
    { id: 'nav1', label: 'الرئيسية', path: '/' },
    { id: 'nav2', label: 'من نحن', path: '/about' },
    { id: 'nav3', label: 'المشاريع', path: '/projects' },
    { id: 'nav4', label: 'الوظائف', path: '/jobs' },
    { id: 'nav5', label: 'الخدمات', path: '/services' },
    { id: 'nav6', label: 'فريق العمل', path: '/team' },
    { id: 'nav7', label: 'الأخبار', path: '/articles' },
    { id: 'nav8', label: 'اتصل بنا', path: '/contact' },
  ],
  mediaLibrary: [],
  stats: { visible: true, items: [] },
  donation: { title: "", description: "", goal: 50000, current: 0 },
  contact: {
    email: "info@organization.org",
    phone: "+963 900 000 000",
    address: "سوريا - الطبقة",
    facebook: "",
    website: "",
    lat: 35.8345,
    lng: 38.5444
  },
  seo: { metaDescription: "", metaKeywords: "" },
  aboutPage: { title: "", subtitle: "" },
  beneficiariesPage: { title: "", subtitle: "", stories: [] },
  contactPage: { title: "", subtitle: "" },
  projectsPage: { title: "", subtitle: "" },
  teamPage: { title: "", subtitle: "" },
  articlesPage: { title: "", subtitle: "" },
  donatePage: { title: "", subtitle: "" },
  jobsPage: { title: "", subtitle: "" },
  servicesPage: { title: "", subtitle: "" },
  successStoriesPage: { title: "", subtitle: "" }
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
      if (response.data && Object.keys(response.data).length > 0) {
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
