import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";

interface planProp {
  phone_number: string;
  packages: string;
  number_of_recipient: number;
  duration: number;
}

export const createReferralBeneficiaries = async ({
  packages,
  phone_number,
  number_of_recipient,
  duration,
}: planProp) => {
  const response = await adminAxios.post(
    `add_beneficiary_for_un_authenticated_user/`,
    {
      package: packages,
      phone_number,
      number_of_recipient,
      duration,
    }
  );
  return response?.data;
};

export const useCreateReferralBeneficiaries = () =>
  useMutation({
    mutationFn: createReferralBeneficiaries,
  });
