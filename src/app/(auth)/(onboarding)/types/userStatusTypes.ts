export interface userStatusTypes {
  message:string;
user_found:boolean;
  id: string;
  last_login: null;
  is_superuser: boolean;
  created_at: string;
  updated_at: string;
  first_name: string;
  middle_name: null;
  last_name: string;
  email: string;
  email_verified: boolean;
  phone_number: string;
  phone_verified: boolean;
  address: string;
  gender: null;
  organization: null;
  date_of_birth: string;
  state: null;
  due_date: null;
  wema_account_details: null;
  account_number: string;
  has_set_password: boolean;
  bvn: null;
  bvn_verified: boolean;
  nin: string;
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
  is_staff: boolean;
  groups: any[];
  user_permissions: any[];
}

interface Hospitals {
  lga: string;
  state: string;
  hospital: string;
  provider_id: string;
}