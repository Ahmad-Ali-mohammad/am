import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (!window.location.hash.includes('login')) {
        window.location.hash = '#/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
};

// User APIs
export const userAPI = {
  getAll: () => api.get('/users'),
  create: (data) => api.post('/users', data),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
};

// Content APIs
export const contentAPI = {
  get: () => api.get('/content'),
  update: (content) => api.put('/content', content),
  updateSection: (section, data) => api.put(`/content/${section}`, data),
};

// Comment APIs
export const commentAPI = {
  getAll: () => api.get('/comments'),
  getByArticle: (articleId) => api.get(`/comments/article/${articleId}`),
  create: (comment) => api.post('/comments', comment),
  updateStatus: (id, status) => api.put(`/comments/${id}/status`, { status }),
  delete: (id) => api.delete(`/comments/${id}`),
};

// Settings APIs
export const settingsAPI = {
  get: () => api.get('/settings'),
  update: (settings) => api.put('/settings', settings),
};

// Newsletter APIs
export const newsletterAPI = {
  subscribe: (email) => api.post('/newsletter/subscribe', { email }),
  getSubscribers: () => api.get('/newsletter/subscribers'),
};

// Contact APIs
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getMessages: () => api.get('/contact/messages'),
  markRead: (id) => api.put(`/contact/messages/${id}/read`),
};

// History APIs
export const historyAPI = {
  get: () => api.get('/history'),
  save: (content) => api.post('/history', { content }),
};

// Analytics APIs
export const analyticsAPI = {
  get: () => api.get('/analytics'),
};

export default api;
