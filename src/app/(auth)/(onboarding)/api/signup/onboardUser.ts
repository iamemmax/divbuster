import { adminAxios } from '@/lib/axios';
import { useMutation } from 'react-query';

interface onboardingProp {
    data: {
        bvn?: string;
        confirm_password: string;
        email: string;
        password: string;
        phone_number: string;
        full_name: string;
        dob: string;
    }
}


interface userData {
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
  organization: string;
  date_of_birth: string;
  state: string;
  due_date: string;
  wema_account_details: string;
  account_number: string;
  has_set_password: boolean;
  bvn: string;
  bvn_verified: boolean;
  nin: string;
  nin_verified: boolean;
  hospitals: string;
  exists_on_loandisk: boolean;
  loandisk_borrower_id: string;
  referral_code: string;
  is_a_liberty_staff: boolean;
  new_user_from_packages: boolean;
  new_user_from_packages_and_has_completed_the_flow: boolean;
  has_created_individual_health: boolean;
  is_a_company: boolean;
  company_name: string;
  is_remita: boolean;
  is_active: boolean;
  profile_image: string;
  channel: string;
  is_a_test_account: boolean;
}
export const OnboardUser = async ({data:{bvn, dob,confirm_password,email,full_name,password,phone_number}}:onboardingProp) => {
    
  const response = await adminAxios.post(`/user/create_user_profile/`, {
      full_name,
      phone_number,
      email,
    bvn,
    dob,
    confirm_password,
    password,
      
    });
    return response?.data as userData;
};


export const useOnboardUser = () =>

  useMutation({
    mutationFn: OnboardUser
  })







