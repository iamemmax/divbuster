import { adminAxios } from "@/lib/axios";

export const getTransactionStatus = async (reference:string) => {
  const { data } = await adminAxios.get(`paystack_payment_verification/?reference=${reference}`);
  return data 
};
