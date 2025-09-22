import { adminAxios } from "@/lib/axios";
import moment from "moment";
import { useMutation } from "react-query";



interface payload {

  name: string;
  start_date: string;
  end_date: string;
  dive_site_id: string;
  meet_up_address?: string | undefined;
  email: string[];
  gas_mixture: string;
  bcd: string;
  weight: string;
  mask: string;
  regulator: string;
  fin: string;
  wetsuit: string;
  buddies: string;

}




const createBookingWithBuddy = async ({ buddies, dive_site_id, email, end_date, name, start_date, meet_up_address, weight, bcd, fin, gas_mixture, mask, regulator, wetsuit }: payload) => {
  const response = await adminAxios.post(`/dive/dive-log/add`, {
    buddies, 
    dive_site_id,
    weight,
    bcd, 
    fin, 
    gas_mixture, 
    mask, regulator, 
    wetsuit,
    email, 
    end_date: moment(end_date).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'), 
    name, 
    start_date: moment(start_date).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'), 
    meet_up_address
  });
  return response.data;
}

export const useCreateBookingWithBuddy = () => {
  return useMutation({
    mutationFn: createBookingWithBuddy,

  });
};