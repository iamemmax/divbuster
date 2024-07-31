import { adminAxios } from "@/lib/axios";

interface accoutTypes {
  data: Data;
}

interface Data {
  account_name: string;
  account_number: string;
  bank_name: string;
}


export const getUserAccountDetails = async (phone:string) => {
  const { data } = await adminAxios.get(`account-details/?phone_number=${phone}`);
  return data as accoutTypes;
};
