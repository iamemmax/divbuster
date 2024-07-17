import { adminAxios } from "@/lib/axios";

import { useQuery } from "react-query";

import { UserDataTypes, UserEntities } from "../types";

export interface NoPinError {
  error: string;
  message: string;
  create_transaction_pin_link: string;
}



interface Hospitals {
  lga: string;
  state: string;
  hospital: string;
  provider_id: string;
}
export const getAuthenticatedUser = async (): Promise<UserEntities> => {
  const { data } = await adminAxios.get("/user/get-user-details/");
  return data as UserDataTypes;
};

export const useUser = () =>
  useQuery("user-details", getAuthenticatedUser, { cacheTime: 1000 * 60 * 5 });