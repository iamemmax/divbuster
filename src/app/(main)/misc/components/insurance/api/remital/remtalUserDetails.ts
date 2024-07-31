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

export interface lgaTypes {
  status: string;
  message: string;
  data: hopitalTypesx[];
}

export interface hopitalTypesx {
  name: string;
  address: string;
  state: string;
  lga: string;
  provider_id: string
}


export const fetchStateList = async () => {
  const { data } = await adminAxios.get(`/filter_provider/`);
  return data as string[]
};

export const fetchRegionByState = async (state: string) => {
  const { data } = await adminAxios.get(`/lgas/?state=${state}`);
  return data as string[]
};

// /lgas/?state=Lagos


export const fetchHospitalListByLga = async (lga: string) => {
  // console.log(lga)
  const { data } = await adminAxios.get(`/get-nem-location-by-lga/?lga=${lga}`);
  return data as lgaTypes

};



interface hopitalChoiceProp {
  userId: string;
  email: string;
  state: string;
  hospital: string;
  lga: string;
  provider_id: string;
}

export const userHospitalChoice = async ({ userId, state, hospital, provider_id, lga, email}: hopitalChoiceProp) => {

  const response = await adminAxios.put(`life-insurance/accept_users_hospital/${userId}`, {
    email,
    state,
    hospital,
    provider_id,
    lga
  });
  return response?.data;
};


export const useUserHospitalChoice = () =>

  useMutation({
    mutationFn: userHospitalChoice
  })







