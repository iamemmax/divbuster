import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";


export interface countryResponse {
  count: number;
  next: null;
  previous: null;
  results: countryResult[];
}

export interface countryResult {
  id: number;
  name: string;
  alpha2code: string;
  alpha3code: string;
  currency_name: string;
  currency_code: string;
  currency_symbol: string;
  calling_code: string;
  flag_link: string;
  is_default: boolean;
  active: boolean;
}
const fetchCountry = async () => {
 const response = await adminAxios.get<countryResponse>(`location/country`);
    return response.data;
}

export const useFetchCountry = () => {
  return useQuery({
    queryKey: ["country"],
    queryFn: fetchCountry,
  });
};