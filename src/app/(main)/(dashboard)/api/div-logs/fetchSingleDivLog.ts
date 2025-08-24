import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";


interface singleDiveProp {
  detail: string;
  data: Data;
}

interface Data {
  id: number;
  user: number;
  dive_equipment: Diveequipment;
  dive_plan: Diveplan;
  dive_photos: null;
  number: number;
  name: string;
  air_start: number;
  air_stop: number;
  start_date: string;
  end_date: null;
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
  private_note: string;
  public_note: string;
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
  meet_up_address: null;
  longitude: null;
  latitude: null;
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

interface Diveequipment {
  id: number;
  gas_mixture: string;
  oxygen_value: number;
  nitrogen_value: number;
  helium_value: number;
  cylinder_type: string;
  cylinder_size: number;
  weight: string;
  weight_value: number;
  mask: string;
  wetsuit: string;
  fin: boolean;
  regulator: boolean;
  bcd: boolean;
  hoody: boolean;
  gloves: boolean;
  boots: boolean;
  others: boolean;
  dive_log: number;
}

const fetchSingleDivLog = async (id:string) => {
 const response = await adminAxios.get(`divelog/${id}`);
    return response.data as singleDiveProp;
}

export const usefetchSingleDivLog = (id:string) => {
  return useQuery({
    queryKey: ["single-div-log",id],
    queryFn: ()=>fetchSingleDivLog(id),
  });
};