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

const fetchDiveSchools = async ({ pageParam = "dive/dive-schools" }) => {
  // If next is a full URL, strip the domain part
  const relativeUrl = pageParam.replace(/^https?:\/\/[^/]+/, "");
  const response = await adminAxios.get(relativeUrl);
  return response.data as divingSchoolsProp;
};


export const useFetchDiveSchools = () => {
  return useInfiniteQuery({
    queryKey: ["dive-schools"],
    queryFn: fetchDiveSchools,
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
  });
};

