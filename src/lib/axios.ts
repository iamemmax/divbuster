import Axios from 'axios';
import type { AxiosInstance } from 'axios';

const ADMIN_LOAN_API_BASE_URL = process.env
  .NEXT_PUBLIC_AJO_LOAN_API_BASE_URL as string;

  const SAVINGS_API_BASE_URL = process.env
  .NEXT_PUBLIC_SAVINGS_API_BASE_URL as string;

export const adminLoanAxios = Axios.create({
  baseURL: ADMIN_LOAN_API_BASE_URL,
});

export const savingsAxios = Axios.create({
  baseURL: SAVINGS_API_BASE_URL,
});

export const setAxiosDefaultToken = (
  token: string,
  axiosInstance: AxiosInstance,
  // axios_Instance: AxiosInstance,
) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  // axios_Instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const deleteAxiosDefaultToken = () => {
  delete adminLoanAxios.defaults.headers.common.Authorization;
};
