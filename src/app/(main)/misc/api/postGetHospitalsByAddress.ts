import { adminAxios } from '@/lib/axios';
import { useMutation } from 'react-query';

export interface Hospital {
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
  address: string;
  myAddress?:string
 
}
export const getHospitalsByAddress = async ({ address, myAddress }: getHospitalsInputProp) => {
  const searchFilter = address !== "" ? address : myAddress;

  try {
    const response = await adminAxios.post('get-nem-location/', { searchFilter });
    return response?.data as Response;
  } catch (error) {
    // Handle the error (e.g., log it, show a message, etc.)
    throw new Error('Failed to fetch hospitals');
  }
};

export const usegetHospitalsByAddress = () =>

  useMutation({
    mutationFn: getHospitalsByAddress
  })







