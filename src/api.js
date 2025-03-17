import axios from 'axios';

const API_URL = 'http://67.217.243.37:5000'; // Dirección del backend

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
