import axios from 'axios';
import config from './config';

const API_URL = config.baseURLApi; // Debe resultar en "http://67.217.243.37:5000" en producción

export const getRoles = async () => {
  try {
    const response = await axios.get(`${API_URL}/roles`);
    return response.data;
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error;
  }
};
