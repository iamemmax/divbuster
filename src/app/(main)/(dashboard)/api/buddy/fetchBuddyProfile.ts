import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";


export interface BuddyProfile {
  id: number;
  profile_details: Profiledetails;
  diver_profile: Diverprofile;
  current_location: Currentlocation;
  wallet: Wallet;
  archievements: Archievement[];
  certificates: certificates[];
  active_subscription: Activesubscription;
  latest_transactions: Latesttransaction[];
  dashboard_analysis: Dashboardanalysis;
  suggested_divers: Suggesteddiver[];
  suggested_challenges: null;
  suggested_activities: null;
  is_dive_instructor: null;
  last_login: null;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  date_joined: string;
}

interface Suggesteddiver {
  id: number;
  full_name: string;
  profile_picture: null | string;
  coordinate: Coordinate;
  invite_id: string;
  recent_dive_info: Recentdiveinfo;
}

interface Recentdiveinfo {
  start_date: null;
  end_date: null;
  bottom_time: null;
  depth: null;
  other_divers: null;
  dive_image: null;
}

interface Coordinate {
  lon: string;
  lat: string;
}

interface Dashboardanalysis {
  dives: number;
  dives_last_month: number;
  dive_spots: number;
  dive_spots_last_month: number;
  bottom_time: number;
  bottom_time_last_month: number;
  max_depth: number;
  max_depth_last_month: number;
}

interface Latesttransaction {
  id: number;
  amount: number;
  direction: string;
  transaction_type: string;
  payment_method: string;
  transaction_status: string;
  payment_gateway: null | string;
  return_url: null | string;
  narration: string;
  reference: string;
  created_on: string;
  updated_on: string;
  plan: null | number;
}

interface Activesubscription {
  id: number;
  start_date: string;
  end_date: string;
  status: string;
  user: number;
  subscription: number;
}

interface Archievement {
  id: number;
  created_on: string;
  updated_on: string;
  archievements: any[];
}

interface Wallet {
  balance: number;
  created_on: string;
  updated_on: string;
}

interface Currentlocation {
  id: number;
  lon: number;
  lat: number;
  updated_on: string;
}

interface Diverprofile {
  id: number;
  dive_spots: number;
  dive_image: string;
  certification_level: string;
  dive_count: number;
  public: boolean;
  buddies: string;
  height: string;
  body_size: string;
  measurement_unit: string;
  temp_unit: string;
  shoe_size: string;
  shoe_value: number;
  diver_type: string;
  facebook: string;
  online: boolean;
  created_on: string;
  updated_on: string;
  favourite_sites: any[];
}

interface Profiledetails {
  id: number;
  language: string;
  phone_number: string;
  nickname: string;
  dob: string;
  invite_id: string;
  account_type: string;
  profile_picture: string;
  referral_code: string;
  verified: boolean;
  verification_token: string;
  auth_provider: string;
  token_expiry: string;
  stripe_customer_id: string;
  created_on: string;
  updated_on: string;
  country: number;
  referred_by: string;
}






export interface certificates {
  id: number;
  image: string;
  certification_no: string;
  trainer_no: string;
  full_name: string;
  issuer: string;
  issuer_name: string;
  certificate_type: string;
  issue_date: string;
  date_of_birth: string;
  school_name: string;
  trainer_name: string;
  created_on: string;
}
const fetchBuddyProfile = async (id: string): Promise<BuddyProfile | null> => {
  if (!id) return null;
  try {
    const response = await adminAxios.get(`buddies/${id}`);
    return response.data as BuddyProfile;
  } catch (error) {
    console.error("Failed to fetch buddy profile:", error);
    throw error;
  }
};


// export const usefetchBuddyProfile = (id:string) => {
//   return useQuery({
//     queryKey: ["buddy-profile",id],
//     queryFn: ()=>fetchBuddyProfile(id),
//     enabled:!!id
//   });
// };

export const usefetchBuddyProfile = (id: string | null) => {
  return useQuery({
    queryKey: ["buddy-profile", id],
    queryFn: () => {
      if (!id) return Promise.resolve(null);
      return fetchBuddyProfile(id);
    },
    enabled: !!id,
  });
};