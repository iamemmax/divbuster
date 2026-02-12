import {  Lastdivedetail } from "@/app/(main)/(dashboard)/api/buddy/fetchBuddyProfile";
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
  user_archievements: Userarchievement[];
  certificates: Certificate[];
  active_subscription: Activesubscription;
  latest_transactions: Latesttransaction[];
  dashboard_analysis: Dashboardanalysis;
  suggested_divers: Suggesteddiver[];
  suggested_challenges: null;
  suggested_activities: null;
  is_dive_instructor: null;
  last_login: null;
  username: string;
  has_filled_medical: string;
has_filled_liability: string;
  first_name: string;
  last_name: string;
  email: string;
  date_joined: string;
}

interface Suggesteddiver {
  id: number;
  full_name: string;
  profile_picture: null;
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

interface Certificate {
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

interface Userarchievement {
  id: number;
  archievements: Archievement[];
  created_on: string;
  updated_on: string;
}interface Dashboardanalysis {
  dives: number;
  dive_spots: number;
  bottom_time: number;
  max_depth: number;
  dives_this_month: number;
  dive_spots_this_month: number;
  bottom_time_this_month: number;
  max_depth_this_month: number;
  dives_last_month: number;
  dive_spots_last_month: number;
  bottom_time_last_month: number;
  max_depth_last_month: number;
}

interface Archievement {
  id: number;
  image: string;
  title: string;
  achievement_type: string;
  dive_count: number;
  description: string;
  reward: null;
  reward_amount: number;
  created_on: string;
  updated_on: string;
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
  dive_image: null;
  last_dive: null;
  last_dive_detail: Lastdivedetail;
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
  facebook: null;
  online: boolean;
  favourite_sites: number[];
}

interface Profiledetails {
  id: number;
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
  country: number;
  referred_by: null;
}

interface Downline {
  id: number;
  name: string;
  image: null;
  username: string;
  date_joined: string;
}



















export const getAuthenticatedUser = async () => {
  const response = await adminAxios.get(`/profile`);
  return response?.data as userDetails;
};

export const useUser = () =>
  useQuery('user-details', getAuthenticatedUser, { cacheTime: 1000 * 60 * 5 });
