import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const carAPI = {
  getAllCars: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  getCarById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  createCar: async (carData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/products`, carData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  updateCar: async (id, carData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/products/${id}`, carData);
      return response.data.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  deleteCar: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error);
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
