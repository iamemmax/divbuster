import { adminAxios } from "@/lib/axios";
import { useInfiniteQuery } from "react-query";
interface SchoolBookingProp {
  count: number;
  next: null;
  previous: null;
  results: bookingResult[];
}

export interface bookingResult {
  id: number;
  participant_count: number;
  participants: Participant[];
  amount: string;
  level: string;
  created_on: string;
  updated_on: string;
  event: Event;
  date: Date;
  contact_info: {
    location:string;
  };
  dive_instructor: Diveinstructor;
}

interface Diveinstructor {
  id: number;
  user: number;
}

interface Date {
  id: number;
  event_date: string;
  duration: number;
  remaining_slots: number;
  dive_school_event: number;
}

interface Event {
  id: number;
  name: string;
  description: string;
  amount: string;
  service_charge: string;
  created_on: string;
  updated_on: string;
  dive_school: number;
  dive_site: number;
}

interface Participant {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  dob: null;
  terms_accepted: boolean;
  certification: null;
  checked_in: boolean;
  contact_info: Contactinfo;
  primary: boolean;
  created_on: string;
  dive_school_booking: number;
}

interface Contactinfo {
}



const fetchSchoolBooking = async (
  lang: string,
  { pageParam = `dive/dive-booking?lang=${lang}` }
) => {
  // Strip domain if next is a full URL
  const relativeUrl = pageParam.replace(/^https?:\/\/[^/]+/, "");
  const response = await adminAxios.get(relativeUrl);
  return response.data as SchoolBookingProp;
};

export const useFetchSchoolBooking = (lang?: string) => {
  return useInfiniteQuery({
    queryKey: ["dive-school-booking", lang], // cache per dive school
    queryFn: ({ pageParam }) => fetchSchoolBooking(String(lang), { pageParam }),
    getNextPageParam: (lastPage) => lastPage?.next ?? undefined,
  });
};
