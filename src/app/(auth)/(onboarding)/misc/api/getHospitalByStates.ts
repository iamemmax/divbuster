import { adminAxios } from '@/lib/axios';
import { useQuery } from 'react-query';


export interface HospitalLists {
  hospital: string[];
}

export interface HospitalEntity {
  hospital_name: string;
  
}


export const getHospitalListData = async ( state: string):Promise<HospitalLists | any> => {
    const {data} = await adminAxios.get(
       `life-insurance/hospitals/?state=${state}`
     );
    return data as string[]
     
   };
 
   export const useHospitalListData = ( state: string) =>
   useQuery(['hospital_list_data', state], () =>getHospitalListData( state));




   

  
 


