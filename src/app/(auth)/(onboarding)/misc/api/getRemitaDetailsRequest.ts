import { adminAxios } from '@/lib/axios';
import { useMutation, useQuery } from 'react-query';

export interface remitadetails {
    existing_user: boolean;
    is_from_remita: boolean;
    user_details: UserDetails;
  }
  export interface UserDetails {
    full_name: string;
    ministry: string;
    state: string;
  }
  


export const RemitaUserDetails= async(phonenumber:string):Promise<remitadetails>=>{
    const {data} = await adminAxios.post(

        `life-insurance/check-remita-user/`,{

          phone_number: phonenumber
        }
    );
    return data;
};


export const useRemitaDetailsData = () =>

  useMutation({
    mutationFn: RemitaUserDetails
  })


  