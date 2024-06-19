import Axios from "axios";
import type { AxiosInstance } from "axios";

const ADMIN_API_BASE_URL = process.env
  .NEXT_PUBLIC_LIFE_SAVINGS_API_BASE_URL as string;

export const adminAxios = Axios.create({
  baseURL: ADMIN_API_BASE_URL,
});

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
