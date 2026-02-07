import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const authAPI = {
  signup: async (email, password, fullName) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
        email,
        password,
        fullName
      });
      if (response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }
      return response.data.data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error.response?.data || error;
    }
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password
      });
      if (response.data.data && response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }
      return response.data.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      const err = new Error(errorMessage);
      err.response = error.response;
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  isLoggedIn: () => {
    return !!localStorage.getItem('token');
  },

  // Admin only: fetch all users
  getUsers: async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');
    const response = await axios.get(`${API_BASE_URL}/auth/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.data;
  },

  // Admin only: fetch all checked-out orders
  getOrders: async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');
    const response = await axios.get(`${API_BASE_URL}/auth/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.data;
  },

  // Fetch fresh user data from server (includes role)
  fetchMe: async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const response = await axios.get(`${API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.data;
  }
};
