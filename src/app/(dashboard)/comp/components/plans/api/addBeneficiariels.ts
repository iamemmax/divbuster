import { adminAxios } from '@/lib/axios';
import { useMutation } from 'react-query';

interface bebficiaryProp {
  packages: string;
  duration: number;
  beneficiariesList: beneficailData[];
}

export interface beneficailData {
  name_of_beneficiary: string;
  phone_number_of_beneficiary: string;
  type_of_beneficary: "ADULT" | "MINOR";
}
export const addbeneficiaries = async ({ packages, duration,beneficiariesList }: bebficiaryProp) => {
    
  const response = await adminAxios.post(`beneficiary/`, {
      package:packages,
      duration,
      data:beneficiariesList
    });
    return response?.data;
};


export const useAddbeneficiaries = () =>

  useMutation({
    mutationFn: addbeneficiaries
  })







