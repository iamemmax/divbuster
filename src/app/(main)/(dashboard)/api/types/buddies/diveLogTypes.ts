
export interface divLogsProp {
  count: number;
  next: null;
  previous: null;
  results: diveResult[];
}

export interface diveResult {
  id: number;
  user: number;
  dive_equipment: Diveequipment | null;
  dive_plan: Diveplan;
  dive_photos: [];
  number: number;
  name: string;
  air_start: number;
  air_stop: number;
  start_date: string;
  end_date: null | string;
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
  private_note: null | string;
  public_note: null | string;
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
  meet_up_address: null | string;
  longitude: null | string;
  latitude: null | string;
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
  tag: [];
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

export interface Diveequipment {
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

export interface DiveLogsFilters {
  data_type?: string;
  date_from?: string;
  date_to?: string;
}