import { adminAxios } from "@/lib/axios";
interface benficiariesType {
  package_type: string;
  data: Datum[];
}

interface Datum {
  enrolee: Enrolee;
  hospital: number;
  name: string;
  phone_number: string;
  email: string;
  state: string;
  lga: string;
}

interface Enrolee {
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
export const getBeneficiaries = async () => {
  const { data } = await adminAxios.get(`beneficiary/`);
  
  return data as benficiariesType[];
};