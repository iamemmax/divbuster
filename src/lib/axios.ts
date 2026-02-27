import Axios from "axios";
import type { AxiosInstance } from "axios";

const ADMIN_API_BASE_URL = process.env
  .NEXT_PUBLIC_LIFE_SAVINGS_API_BASE_URL as string;


export const adminAxios = Axios.create({
  baseURL: ADMIN_API_BASE_URL.endsWith('/') ? ADMIN_API_BASE_URL : `${ADMIN_API_BASE_URL}/`,
});

// Request interceptor for debugging
adminAxios.interceptors.request.use(
  (config) => {
  
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for debugging
adminAxios.interceptors.response.use(
  (response) => {
    
    return response;
  },
  (error) => {
    console.error('API error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

export const setAxiosDefaultToken = (
  token: string,
  axiosInstance: AxiosInstance
  // axios_Instance: AxiosInstance,
) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  // axios_Instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const deleteAxiosDefaultToken = () => {
   
  delete adminAxios.defaults.headers.common.Authorization;
  
  };
