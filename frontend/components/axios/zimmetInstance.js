import axiosInstance from './axiosInstance';

const zimmetInstance = axiosInstance.create({
  baseURL: `${axiosInstance.defaults.baseURL}/employeeInventories`,
    headers: {
      ...axiosInstance.defaults.headers,
     
    },
});

zimmetInstance.interceptors.request.use(
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

export default zimmetInstance;