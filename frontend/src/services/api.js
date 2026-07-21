import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const checkHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

export const startResearch = async (topic) => {
  const response = await api.post('/research', { topic });
  return response.data;
};

export const getResearchStatus = async (taskId) => {
  const response = await api.get(`/history/${taskId}`);
  return response.data;
};

export const getHistory = async () => {
  const response = await api.get('/history');
  return response.data;
};

export const getReportDetail = async (reportId) => {
  const response = await api.get(`/history/${reportId}`);
  return response.data;
};

export const deleteReport = async (reportId) => {
  return { success: true };
};

export default api;
