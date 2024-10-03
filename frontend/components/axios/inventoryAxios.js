// src/api/inventoryAxios.js
import axiosInstance from './axiosInstance';

const inventoryAxios = axiosInstance.create({
  baseURL: `${axiosInstance.defaults.baseURL}/inventory`,
  headers: {
    ...axiosInstance.defaults.headers,
   
  },
});
inventoryAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default inventoryAxios;
