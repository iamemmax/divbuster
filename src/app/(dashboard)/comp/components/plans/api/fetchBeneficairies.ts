import { adminAxios } from "@/lib/axios";
export interface beneficiaryTypeProp {
  package_type: string;
  data: BeneficiaryData[];
}

export interface BeneficiaryData {
  enrolee: Enrolee;
  hospital: number;
  name: string;
  phone_number: string;
  email: null;
  state: null;
  lga: null;
  status: string;
}

interface Enrolee {
  id: string;
  last_login: string;
  is_superuser: boolean;
  created_at: string;
  updated_at: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  email_verified: boolean;
  phone_number: string;
  phone_verified: boolean;
  address: string;
  gender: string;
  organization: null;
  date_of_birth: string;
  state: null;
  due_date: null;
  wema_account_details: null;
  account_number: string;
  has_set_password: boolean;
  bvn: string;
  bvn_verified: boolean;
  nin: null;
  nin_verified: boolean;
  hospitals: Hospitals;
  exists_on_loandisk: boolean;
  loandisk_borrower_id: null;
  referral_code: string;
  is_a_liberty_staff: boolean;
  new_user_from_packages: boolean;
  new_user_from_packages_and_has_completed_the_flow: boolean;
  has_created_individual_health: boolean;
  is_a_company: boolean;
  is_remita: boolean;
  is_active: boolean;
  profile_image: null;
}
interface Hospitals {
  lga: string;
  state: string;
  hospital: string;
  provider_id: string;
  status: string;
}






export const getBeneficiaries = async () => {
  const { data } = await adminAxios.get(`beneficiary/`);
  
  return data as beneficiaryTypeProp[]
};