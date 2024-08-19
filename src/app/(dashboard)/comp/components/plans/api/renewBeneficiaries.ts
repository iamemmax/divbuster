import { adminAxios } from '@/lib/axios';
import { useMutation } from 'react-query';

interface beneficiaryProp {
  packages: string;
  duration: number;
  beneficiariesList: beneficailData[];
}

export interface beneficailData {
  name_of_beneficiary: string;
  phone_number_of_beneficiary: string;
  type_of_beneficary: "ADULT" | "MINOR";
}
export const renewBeneficiaryList = async ({ packages, duration,beneficiariesList }: beneficiaryProp) => {
    
  const response = await adminAxios.post(`renewal_beneficiary/`, {
      package:packages,
      duration,
      data:beneficiariesList
    });
    return response?.data;
};


export const useRenewBeneficiaryList = () =>

  useMutation({
    mutationFn: renewBeneficiaryList
  })







