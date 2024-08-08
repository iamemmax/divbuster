import { adminAxios } from "@/lib/axios";


interface Data {
  balance: string;
  referral_balance: string;
}
export const getWalletBalance = async (phone:string) => {
  const { data } = await adminAxios.get(`wallet-balance/?phone_number=${phone}`);
  return data as Data ;
};