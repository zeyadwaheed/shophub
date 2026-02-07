import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const accessoryAPI = {
  getAllAccessories: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching accessories:', error);
      throw error;
    }
  },

  getAccessoryById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching accessory:', error);
      throw error;
    }
  },

  createAccessory: async (accessoryData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/products`, accessoryData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating accessory:', error);
      throw error;
    }
  },

  updateAccessory: async (id, accessoryData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/products/${id}`, accessoryData);
      return response.data.data;
    } catch (error) {
      console.error('Error updating accessory:', error);
      throw error;
    }
  },

  deleteAccessory: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting accessory:', error);
      throw error;
    }
  },

  createOrder: async (orderData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/products/orders`,
        orderData,
        { headers: getAuthHeaders() }
      );
      return response.data.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  getAllOrders: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/orders`, {
        headers: getAuthHeaders()
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }
};
