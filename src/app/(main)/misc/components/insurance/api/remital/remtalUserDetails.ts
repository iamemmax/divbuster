import { adminAxios } from '@/lib/axios';
import { useMutation, useQuery } from 'react-query';


export interface regionTypes {
  state: string;
  region: string;
  provider_id: number;
}

interface hopitalTypes {
  state: string;
  region: string;
  provider_id: number;
  hospital: string;
}

export const fetchStateList = async () => {
    const {data} = await adminAxios.get( `life-insurance/filter_provider/`);
    return data as string[] 
};

export const fetchRegionByState = async (state:string) => {
    const {data} = await adminAxios.get(`life-insurance/filter_provider/?state=${state}`);
    return data as regionTypes[] 
};




export const fetchHospitalListByState = async ( state: string,region:string) => {
    const {data} = await adminAxios.get(`life-insurance/filter_provider/?state=${state}&region=${region}`);
    return data as hopitalTypes[] 
     
};
   


interface hopitalChoiceProp{
    userId: string;
  state: string;
  hospital: string;
  region: string;
  provider_id: number;
}

export const userHospitalChoice = async ({ userId, state, hospital,provider_id,region }: hopitalChoiceProp) => {
    
  const response = await adminAxios.put(`life-insurance/accept_users_hospital/${userId}`, {
        state,
    hospital,
    provider_id,
        region
    });
    return response?.data;
};


export const useUserHospitalChoice = () =>

  useMutation({
    mutationFn: userHospitalChoice
  })







