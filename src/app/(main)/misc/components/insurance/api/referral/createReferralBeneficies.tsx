import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";

interface planProp {
  phone_number: string;
  packages: string;
  number_of_recipient: number;
  duration: number;
  referral_code: string;
  first_name?:string;
  last_name?:string;
}

export const createReferralBeneficiaries = async ({
  packages,
  phone_number,
  number_of_recipient,
  duration,
  referral_code,
  first_name,last_name
}: planProp) => {
  const response = await adminAxios.post(
    `add_beneficiary_for_un_authenticated_user/`,
    {
      package: packages,
      phone_number,
      number_of_recipient,
      duration,
      referral_code,
      first_name,last_name
    }
  );
  return response?.data;
};

export const useCreateReferralBeneficiaries = () =>
  useMutation({
    mutationFn: createReferralBeneficiaries,
  });
