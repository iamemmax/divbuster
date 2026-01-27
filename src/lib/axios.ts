import Axios from "axios";
import type { AxiosInstance } from "axios";

const ADMIN_API_BASE_URL = process.env
  .NEXT_PUBLIC_LIFE_SAVINGS_API_BASE_URL as string;

console.log('API Base URL:', ADMIN_API_BASE_URL);

export const adminAxios = Axios.create({
  baseURL: ADMIN_API_BASE_URL.endsWith('/') ? ADMIN_API_BASE_URL : `${ADMIN_API_BASE_URL}/`,
});

// Request interceptor for debugging
adminAxios.interceptors.request.use(
  (config) => {
    console.log('Making API request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
      headers: config.headers
    });
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
    console.log('API response:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
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
  console.log("deleteAxiosDefaultToken: Removing Authorization header");
  console.log("deleteAxiosDefaultToken: Before deletion", adminAxios.defaults.headers.common.Authorization ? "Authorization header exists" : "No Authorization header");
  
  delete adminAxios.defaults.headers.common.Authorization;
  
  console.log("deleteAxiosDefaultToken: After deletion", adminAxios.defaults.headers.common.Authorization ? "Authorization header still exists" : "Authorization header removed");
};
