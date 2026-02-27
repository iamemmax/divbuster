import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";
import { Diveequipment } from "../types/buddies/diveLogTypes";









export interface singleDiveProp {
  detail: string;
  data: Data;
}

interface Data {
  id: number;
  user: number;
  dive_equipment:Diveequipment| null;
  dive_plan: Diveplan;
  dive_photos: Divephoto[];
  number: number;
  name: string;
  air_start: number;
  air_stop: number;
  start_date: string;
  end_date: string;
  bottom_time: string;
  dive_depth: string;
  average_elevation: number;
  average_intensity: number;
  average_pressure_of_oxygen: number;
  maximum_pressure_of_oxygen: number;
  decompression_dive: boolean;
  min_water_temperature: number;
  max_water_temperature: number;
  avg_water_temperature: number;
  surface_interval: number;
  likes: number;
  dislikes: number;
  public: boolean;
  private_note: null;
  public_note: null;
  show_notes: boolean;
  show_map_first: boolean;
  sync_status: boolean;
}

interface Diveplan {
  id: number;
  dive_site: Divesite;
  dive_logs: number[];
  name: string;
  description: string;
  meet_up_address: string;
  longitude: string;
  latitude: string;
  buddies: string;
  dive_log_completed: boolean;
  created_on: string;
  updated_on: string;
  created_by: number;
}

interface Divesite {
  id: number;
  average_rating: number;
  ranking: string;
  title: string;
  slug: string;
  address: string;
  lon: string;
  lag: string;
  tag: null;
  entry_type: string;
  water_type: string;
  water_body: string;
  site_type: string;
  parking_available: boolean;
  max_depth: number;
  public_site: boolean;
  description: string;
  conditions: string;
  additional_information: string;
  under_water_map_url: string;
  emergency_info: null;
  created_on: string;
  updated_on: string;
  country: number;
}
interface Divephoto {
  id: number;
  image: string;
  created_on: string;
  dive_log: number;
}


const fetchSingleDivLog = async (id:string):Promise<singleDiveProp> => {
 const response = await adminAxios.get(`divelog/${id}`);
    return response.data as singleDiveProp;
}

export const useFetchSingleDivLog = (id:string) => {
  return useQuery({
    queryKey: ["single-div-log",id],
    queryFn: ()=>fetchSingleDivLog(id),
    enabled:!!id
    
  });
};