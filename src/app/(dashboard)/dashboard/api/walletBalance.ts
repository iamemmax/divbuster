import { adminAxios } from "@/lib/axios";
interface balanceType {
  data: Data;
}

interface Data {
  balance: string;
}
export const getWalletBalance = async (phone:string) => {
  const { data } = await adminAxios.get(`life-insurance/wallet-balance/?phone_number=${phone}`);
  return data as balanceType ;
};