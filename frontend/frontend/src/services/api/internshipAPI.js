import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const internshipAPI = {
  getAll: async (page = 1, limit = 10) => {
    return axios.get(`${API_BASE_URL}/internships`, {
      params: { page, limit },
      withCredentials: true,
    });
  },

  getById: async (id) => {
    return axios.get(`${API_BASE_URL}/internships/${id}`, {
      withCredentials: true,
    });
  },

  create: async (data) => {
    return axios.post(`${API_BASE_URL}/internships`, data, {
      withCredentials: true,
    });
  },

  update: async (id, data) => {
    return axios.put(`${API_BASE_URL}/internships/${id}`, data, {
      withCredentials: true,
    });
  },

  delete: async (id) => {
    return axios.delete(`${API_BASE_URL}/internships/${id}`, {
      withCredentials: true,
    });
  },

  // Additional methods for specific features
  getApplications: async (internshipId) => {
    return axios.get(`${API_BASE_URL}/internships/${internshipId}/applications`, {
      withCredentials: true,
    });
  },

  getStats: async () => {
    return axios.get(`${API_BASE_URL}/internships/stats`, {
      withCredentials: true,
    });
  },
};

export default internshipAPI;