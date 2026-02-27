import { adminAxios } from "@/lib/axios";
import { useInfiniteQuery, useQuery } from "react-query";
import { buddyListProp, buddyResult } from "../types/buddies/buddyType";

export type { buddyListProp, buddyResult };


const fetchBuddyList = async (pageParam?: string, language?: string, search?:string) => {
  let url: string;

  if (pageParam) {
    try {
      const urlObj = new URL(pageParam);
      url = urlObj.pathname + urlObj.search;
    } catch {
      url = pageParam;
    }
  } else {
    url = `buddies?lang=${language}&search=${search}`;
  }

  try {
    const response = await adminAxios.get(url);
    return response.data as buddyListProp;
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error;
  }
};

const fetchAllBuddies = async (language?: string,search?:string) => {
  const url = `buddies?lang=${language}&no_paginate=yes&search=${search}`;
  try {
    const response = await adminAxios.get(url);
    return response.data as buddyListProp;
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error;
  }
};

export const useFetchBuddyList = (language: string,search?:string) => {
  return useInfiniteQuery({
    queryKey: ["buddy-list", language],
    queryFn: ({ pageParam }) => fetchBuddyList(pageParam, language,search),
    getNextPageParam: (lastPage) => lastPage.next,
    getPreviousPageParam: (firstPage) => firstPage.previous,
    keepPreviousData: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });
};

export const useFetchAllBuddies = (language: string,search?:string) => {
  return useQuery({
    queryKey: ["all-buddies", language,search],
    queryFn: () => fetchAllBuddies(language,search),
    keepPreviousData: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};