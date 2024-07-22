import { adminAxios } from '@/lib/axios';
import { useMutation } from 'react-query';

interface Hospital {
  name: string;
  address: string;
  state: string;
  lga: string;
  provider_id: string;
}

interface Response {
  status: string;
  message: string;
  data: Hospital[];
}
type getHospitalsInputProp = {
    address:string
 
}
export const getHospitalsByAddress = async ({ address }: getHospitalsInputProp) => {
    
  const response = await adminAxios.post(`life-insurance/get-nem-location/`, {
        address,
    });
    return response?.data as Response;
};


export const usegetHospitalsByAddress = () =>

  useMutation({
    mutationFn: getHospitalsByAddress
  })







