import { adminAxios } from '@/lib/axios';
import { useMutation, useQuery } from 'react-query';


export interface StateLists {
    state: string[];
  }

  export interface StateEntity {
    state_name: string;
    
  }

export const fetchStateList = async () => {

    const {data} = await adminAxios.get( `life-insurance/states/`);
    return data as string[]
};

export const fetchHospitalListByState = async ( state: string) => {
    const {data} = await adminAxios.get(`life-insurance/hospitals/?state=${state}`
     );
    return data as string[]
     
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







