import axiosInstance from './axiosInstance';

const employeeAxios = axiosInstance.create({
  baseURL: `${axiosInstance.defaults.baseURL}/employee`,
    headers: {
      ...axiosInstance.defaults.headers,
     
    },
});

employeeAxios.interceptors.request.use(
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

export default employeeAxios;