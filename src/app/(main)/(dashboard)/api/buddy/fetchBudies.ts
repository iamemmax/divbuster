import { adminAxios } from "@/lib/axios";
import { useInfiniteQuery, useQuery } from "react-query";


export interface buddyListProp {
  count: number;
  next: null;
  previous: null;
  results: buddyResult[];
}

export interface buddyResult {
  id: number;
  profile_details: Profiledetails;
  diver_profile: Diverprofile;
  current_location: Currentlocation;
  wallet: Wallet;
  archievements: Archievement[];
  certificates: Certificate[] | null;
  active_subscription: Activesubscription | null;
  latest_transactions: Latesttransaction[] | null;
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
  buddies: string;
  height: null | string;
  body_size: string;
  measurement_unit: string;
  temp_unit: string;
  shoe_size: string;
  shoe_value: null | number;
  diver_type: string;
  facebook: null;
  online: boolean;
  created_on: string;
  updated_on: string;
  favourite_sites: any[];
  diver_buddy:any[]
}

interface Profiledetails {
  id: number;
  language: string;
  phone_number: null | string;
  nickname: null | string;
  dob: null | string;
  invite_id: string;
  account_type: string;
  profile_picture: null | string;
  referral_code: string;
  verified: boolean;
  verification_token: null | string;
  auth_provider: string;
  token_expiry: null | string;
  stripe_customer_id: null | string;
  created_on: string;
  updated_on: string;
  country: null | number;
  referred_by: null | number;
}




// const fetchBuddyList = async (pageParam?: string) => {
//   let url: string;
  
//   if (pageParam) {
//     // If pageParam is a full URL, extract just the path and query parameters
//     try {
//       const urlObj = new URL(pageParam);
//       url = urlObj.pathname + urlObj.search;
//     } catch {
//       // If pageParam is not a full URL, use it as is
//       url = pageParam;
//     }
//   } else {
//     // Initial request
//     url = `buddies?lang=${language}`;
//   }
  
//   const response = await adminAxios.get(url);
//   return response.data as buddyListProp;
// };

// export const useFetchBuddyList = () => {
//   return useInfiniteQuery({
//     queryKey: ["buddy-list"],
//     queryFn: ({ pageParam }) => fetchBuddyList(pageParam),
//     getNextPageParam: (lastPage) => {
//       return lastPage.next;
//     },
//     getPreviousPageParam: (firstPage) => {
//       return firstPage.previous;
//     },
//     keepPreviousData: true,
//   });
// };



const fetchBuddyList = async (pageParam?: string, language?: string) => {
  let url: string;

  if (pageParam) {
    try {
      const urlObj = new URL(pageParam);
      url = urlObj.pathname + urlObj.search;
    } catch {
      url = pageParam;
    }
  } else {
    url = `buddies?lang=${language}`;
  }

  try {
    const response = await adminAxios.get(url);
    return response.data as buddyListProp;
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error;
  }
};

const fetchAllBuddies = async (language?: string) => {
  const url = `buddies?lang=${language}&no_paginate=yes`;
  try {
    const response = await adminAxios.get(url);
    return response.data as buddyListProp;
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error;
  }
};

export const useFetchBuddyList = (language: string) => {
  return useInfiniteQuery({
    queryKey: ["buddy-list", language],
    queryFn: ({ pageParam }) => fetchBuddyList(pageParam, language),
    getNextPageParam: (lastPage) => lastPage.next,
    getPreviousPageParam: (firstPage) => firstPage.previous,
    keepPreviousData: true,
  });
};

export const useFetchAllBuddies = (language: string) => {
  return useQuery({
    queryKey: ["all-buddies", language],
    queryFn: () => fetchAllBuddies(language),
    keepPreviousData: true,
  });
};
