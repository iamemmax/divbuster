import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";
export interface diveEventByCountryTypes {
  country: string;
  dive_school_event_count: number;
  dive_school_events: Diveschoolevent[];
}

interface Diveschoolevent {
  id: number;
  event_dates: Eventdate[];
  dive_school_name: string;
  dive_site_name: string;
  dive_instructors: Diveinstructor[];
  name: string;
  description: string;
  amount: string;
  service_charge: string;
  created_on: string;
  updated_on: string;
  dive_school: number;
  dive_site: number;
}

interface Diveinstructor {
  id: number;
  name: string;
}

interface Eventdate {
  id: number;
  event_date: string;
  duration: number;
  remaining_slots: number;
}
const fetchDiveEventByCountry = async (date?:string) => {
  const response = await adminAxios.get(`dive/dive-event-by-country?date=${date}`);
  return response.data as diveEventByCountryTypes;
};

export const useFetchDiveEventCountry = (date?:string) => {
  return useQuery({
    queryKey: ["dive-Event",date],
    queryFn: () => fetchDiveEventByCountry(date),
    keepPreviousData: true
  });
};
