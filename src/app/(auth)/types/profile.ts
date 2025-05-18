export interface ProfileResponse {
  detail: string;
  data: ProfileData;
}

export interface ProfileData {
  id: number;
  profile_details: ProfileDetails;
  diver_profile: DiverProfile;
  current_location: CurrentLocation;
  wallet: Wallet;
  archievements: null;
  certificates: null;
  active_subscription: null;
  latest_transactions: LatestTransaction[];
  dashboard_analysis: DashboardAnalysis;
  suggested_divers: SuggestedDiver[];
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

export interface SuggestedDiver {
  id: number;
  full_name: string;
  profile_picture: null | string;
  coordinate: Coordinate;
  invite_id: string;
  recent_dive_info: RecentDiveInfo;
}

export interface RecentDiveInfo {
  start_date: null;
  end_date: null;
  bottom_time: null;
  depth: null;
  other_divers: null;
  dive_image: null;
}

export interface Coordinate {
  lon: string;
  lat: string;
}

export interface DashboardAnalysis {
  dives: number;
  dives_last_month: number;
  dive_spots: number;
  dive_spots_last_month: number;
  bottom_time: number;
  bottom_time_last_month: number;
  max_depth: number;
  max_depth_last_month: number;
}

export interface LatestTransaction {
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

export interface Wallet {
  balance: number;
  created_on: string;
  updated_on: string;
}

export interface CurrentLocation {
  id: number;
  lon: number;
  lat: number;
  updated_on: string;
}

export interface DiverProfile {
  id: number;
  dive_spots: number;
  dive_image: null;
  certification_level: null;
  dive_count: number;
  public: boolean;
  buddies: null;
  height: string;
  body_size: string;
  measurement_unit: string;
  temp_unit: string;
  shoe_size: string;
  shoe_value: number;
  diver_type: string;
  facebook: null;
  online: boolean;
  created_on: string;
  updated_on: string;
  favourite_sites: any[];
}

export interface ProfileDetails {
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
  stripe_customer_id: null;
  created_on: string;
  updated_on: string;
  country: number;
  referred_by: null;
}