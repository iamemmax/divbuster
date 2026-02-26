import { adminAxios } from "@/lib/axios";
import moment from "moment";
import { QueryFunctionContext, useInfiniteQuery } from "react-query";

export interface buddyRequest {
  detail: string;
  data: Data;
}

interface Data {
  count: number;
  next: null;
  previous: null;
  results: buddyRequestResult[];
}

export interface buddyRequestResult {
  id: number;
  request_from: Requestfrom;
  request_to: Requestto;
  request_status: string;
  request_date: string;
  approve_date: null;
  decline_date: null;
}

interface Requestto {
  id: number;
  profile_details: Profiledetails2;
  diver_profile: Diverprofile2;
  current_location: Currentlocation2;
  wallet: Wallet;
  archievements: null;
  certificates: null;
  active_subscription: null;
  latest_transactions: Latesttransaction2[];
  dashboard_analysis: Dashboardanalysis;
  suggested_divers: Suggesteddiver2[];
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

interface Suggesteddiver2 {
  id: number;
  full_name: string;
  profile_picture: null | string;
  coordinate: Coordinate;
  invite_id: string;
  recent_dive_info: Recentdiveinfo;
}

interface Latesttransaction2 {
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

interface Currentlocation2 {
  id: number;
  lon: number;
  lat: number;
  updated_on: string;
}

interface Diverprofile2 {
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

interface Profiledetails2 {
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

interface Requestfrom {
  id: number;
  profile_details: Profiledetails;
  diver_profile: Diverprofile;
  current_location: Currentlocation;
  wallet: Wallet;
  archievements: Archievement[] | null;
  certificates: Certificate[] | null;
  active_subscription: Activesubscription | null;
  latest_transactions: Latesttransaction[];
  dashboard_analysis: Dashboardanalysis;
  suggested_divers: Suggesteddiver[];
  suggested_challenges: null;
  suggested_activities: null;
  is_dive_instructor: Isdiveinstructor | null;
  last_login: null;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  date_joined: string;
}

interface Isdiveinstructor {
  id: number;
  dive_schools: Diveschool[];
}

interface Diveschool {
  id: number;
  name: string;
}

interface Suggesteddiver {
  id: number;
  full_name: string;
  profile_picture: null | null | string;
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
  payment_gateway: null | string | string;
  return_url: null | string | string;
  narration: string;
  reference: string;
  created_on: string;
  updated_on: string;
  plan: null | number | number;
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
  default: boolean;
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
  lon: null | number;
  lat: null | number;
  updated_on: string;
}

interface Diverprofile {
  id: number;
  dive_spots: number;
  dive_image: null;
  certification_level: null;
  dive_count: number;
  public: boolean;
  buddies: null | string;
  height: null | string;
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
  favourite_sites: number[];
}

interface Profiledetails {
  id: number;
  language: string;
  phone_number: string;
  nickname: string;
  dob: string;
  invite_id: string;
  account_type: string;
  profile_picture: null | string;
  referral_code: string;
  verified: boolean;
  verification_token: string;
  auth_provider: string;
  token_expiry: string;
  stripe_customer_id: string;
  created_on: string;
  updated_on: string;
  country: null | number;
  referred_by: null;
}

interface Filter {
  date_to?:string;
  date_from?:string;
  search?:string;
  lang?:string;
}

const fetchBuddyRequest = async ({
  pageParam = "buddy-request",
  queryKey,
}: QueryFunctionContext): Promise<buddyRequest> => {
  const [_key, url, filters] = queryKey as [string, string?, Filter?];

  // Base URL
  let relativeUrl = (pageParam as string).replace(/^https?:\/\/[^/]+/, "");

  // If a starting url is passed
  if (url) {
    relativeUrl = url;
  }

  // Format dates with moment (default: YYYY-MM-DD)
  const dateTo = filters?.date_to
    ? moment(filters.date_to).format("YYYY-MM-DD")
    : undefined;
  const dateFrom = filters?.date_from
    ? moment(filters.date_from).format("YYYY-MM-DD")
    : undefined;

  const response = await adminAxios.get(relativeUrl, {
    params: {
      // ...(dateTo && { date_to: dateTo }),
      // ...(dateFrom && { date_from: dateFrom }),
      ...(filters?.search && { search: filters.search }),
      lang: filters?.lang || 'en',
    },
  });

  return response.data as buddyRequest;
};

export const useFetchBuddyRequest = (url?: string, filters?: Filter) => {
  return useInfiniteQuery<buddyRequest>(
    ["fetch-buddy-request", url, filters],
    fetchBuddyRequest,
    {
      getNextPageParam: (lastPage) => lastPage?.data?.next ?? undefined,
      getPreviousPageParam: (lastPage) => lastPage?.data?.previous ?? undefined,
    }
  );
};
// const fetchBuddyRequest = async ({
//   pageParam = "buddy-request",
// }: QueryFunctionContext): Promise<buddyRequest> => {
//   const relativeUrl = (pageParam as string).replace(/^https?:\/\/[^/]+/, "");

//   const response = await adminAxios.get(relativeUrl);
//   return response.data as buddyRequest;
// };

// export const useFetchBuddyRequest = (url?: string) => {
//   return useInfiniteQuery<buddyRequest>(
//     ["fetch-buddr-request", url],
//     fetchBuddyRequest,
//     {
//       getNextPageParam: (lastPage) => lastPage?.data.next ?? undefined,
//       getPreviousPageParam: (lastPage) => lastPage?.data?.previous ?? undefined,
//     }
//   );
// };
