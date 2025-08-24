import { adminAxios } from "@/lib/axios";
import { useInfiniteQuery } from "react-query";
interface DiveEventProp {
  detail: string;
  data: Data;
}

interface Data {
  count: number;
  next: null;
  previous: null;
  results: Result[];
}

interface Result {
  id: number;
  event_dates: Eventdate[];
  name: string;
  description: string;
  amount: string;
  service_charge: string;
  created_on: string;
  updated_on: string;
  dive_school: number;
  dive_site: number;
}

interface Eventdate {
  id: number;
  event_date: string;
  duration: number;
  remaining_slots: number;
}



const fetchDiveEvent = async (
  id: string,
  { pageParam = `dive/dive-event` }
) => {
  // Strip domain if next is a full URL
  const relativeUrl = pageParam.replace(/^https?:\/\/[^/]+/, "");
  const response = await adminAxios.get(relativeUrl);
  return response.data as DiveEventProp;
};

export const useFetchDiveEvent = (id?: string) => {
  return useInfiniteQuery({
    queryKey: ["dive-Event", id], // cache per dive school
    queryFn: ({ pageParam }) => fetchDiveEvent(String(id), { pageParam }),
    getNextPageParam: (lastPage) => lastPage.data?.next ?? undefined,
  });
};
