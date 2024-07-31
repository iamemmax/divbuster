import { adminAxios } from "@/lib/axios";
export interface referaListType {
  id: number;
  amount_rewarded: number;
  referee: Referee;
  referral_date: string;
  referrer_rewarded: boolean;
  created_at: string;
}

interface Referee {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  organization: string;
  gender: string;
  has_set_password: boolean;
  hospitals: string;
  phone_verified: boolean;
  nin: string;
  bvn: string;
  email: string;
  address: string;
  referral_code: string;
}
export const fetchReferralList = async () => {
  const { data } = await adminAxios.get(`referral/fetch_referrer_referee/`);
  return data as referaListType[];
};