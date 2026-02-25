import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";
interface DiveEventProp {
  detail: string;
  data: Result[];
}

interface Result {
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

const fetchDiveEvent = async () => {
  const response = await adminAxios.get(`dive/dive-event?no_paginate=yes`);
  return response.data as DiveEventProp;
};

export const useFetchDiveEvent = () => {
  return useQuery({
    queryKey: ["dive-Event"],
    queryFn: fetchDiveEvent,
  });
};
