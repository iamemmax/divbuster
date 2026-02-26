import { adminAxios } from "@/lib/axios";
import { useInfiniteQuery } from "react-query";

export interface divingSchoolsProp {
  count: number;
  next: string | null;
  previous: string | null;
  results: Result[];
}

interface Result {
  id: number;
  photos: Photo[] | null;
  dive_instructors: Diveinstructor[];
  name: string;
  address: string;
  contact_info: string;
  qr_code: null | string;
  created_on: string;
  updated_on: string;
}

interface Diveinstructor {
  user_id: number;
  dive_instructor_id: number;
  full_name: string;
  image: string;
}

interface Photo {
  id: number;
  file: string;
  created_on: string;
}

const fetchDiveSchools = async ({
  pageParam = "dive/dive-schools",
  address,
  search
}: {
  pageParam?: string;
  address?: string;
  search?: string;
}) => {
  // If next is a full URL, strip the domain part
  let relativeUrl = pageParam.replace(/^https?:\/\/[^/]+/, "");

  // Build query parameters
  const params = new URLSearchParams();

  // Add address filter if provided and it's the first page
  if (address && pageParam === "dive/dive-schools") {
    params.append("address", address);
  }

  // Add search filter if provided and it's the first page
  if (search && pageParam === "dive/dive-schools") {
    params.append("search", search);
  }

  // Add params to URL if any exist
  if (params.toString() && pageParam === "dive/dive-schools") {
    relativeUrl += `?${params.toString()}`;
  }

  const response = await adminAxios.get(relativeUrl);
  return response.data as divingSchoolsProp;
};


export const useFetchDiveSchools = (address?: string, search?: string) => {
  return useInfiniteQuery({
    queryKey: ["booking-schools", address, search],
    queryFn: ({ pageParam }) => fetchDiveSchools({ pageParam, address, search }),
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};

