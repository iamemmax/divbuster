import { adminAxios } from "@/lib/axios";
interface userData {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  organization: null;
  gender: string;
  has_set_password: boolean;
  hospitals: null;
  phone_verified: boolean;
  nin: null;
  bvn: string;
  email: string;
  address: string;
  referral_code: string;
}
export const fetchReferralCode = async (userId:string) => {
  const { data } = await adminAxios.get(`referral/generate_referral_code/${userId}`);
  return data as userData ;
};