export interface userStatusTypes {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  organization: string;
  gender: string;
  has_set_password: boolean;
  hospitals: Hospitals;
  phone_verified: boolean;
  nin: string;
  bvn: string;
  email: string;
  address: string;
}

interface Hospitals {
  lga: string;
  state: string;
  hospital: string;
  provider_id: string;
}