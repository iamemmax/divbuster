import { certificates } from "@/app/(main)/(dashboard)/api/buddy/fetchBuddyProfile";
import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";


export interface userDetails {
  detail: string;
  data: User;
}

export interface User {
  id: number;
  profile_details: Profiledetails;
  diver_profile: Diverprofile;
  current_location: Currentlocation;
  wallet: Wallet;
  archievements: null;
  certificates: certificates[];
  active_subscription: null;
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
  payment_gateway: null;
  return_url: null;
  narration: string;
  reference: string;
  created_on: string;
  updated_on: string;
  plan: number;
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
  id: string;
  dive_spots: number;
  dive_image: null;
  certification_level: null;
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
  favourite_sites: number[];
}
interface Downline {
  id: number;
  name: string;
  image: null;
  username: string;
  date_joined: string;
}
interface Profiledetails {
  id: string;
  downlines: Downline[];
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
  stripe_customer_id: null;
  created_on: string;
  updated_on: string;
  country: number;
  referred_by: null;
}

























export const getAuthenticatedUser = async () => {
  const response = await adminAxios.get(`/profile`);
  return response?.data as userDetails;
};

export const useUser = () =>
  useQuery('user-details', getAuthenticatedUser, { cacheTime: 1000 * 60 * 5 });
