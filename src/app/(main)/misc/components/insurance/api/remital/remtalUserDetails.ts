import { adminAxios } from '@/lib/axios';
import { useMutation, useQuery } from 'react-query';


interface regionTypes {
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
    verifiedPhoneNumber: string;
    state: string,
    hospital:string
}

export const userHospitalChoice = async ({ verifiedPhoneNumber, state, hospital }: hopitalChoiceProp) => {
    
  const response = await adminAxios.post(`life-insurance/hospital-choice/?phone_number=${verifiedPhoneNumber}`, {
        state,
        hospital
    });
    return response?.data;
};


export const useUserHospitalChoice = () =>

  useMutation({
    mutationFn: userHospitalChoice
  })







