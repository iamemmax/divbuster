import { adminAxios } from "@/lib/axios";
import { useMutation, UseMutationResult } from "react-query";

interface Prop {
  userId: string;
  address: string;
  nin: string;
  bvn: string;
  email: string;
  selectedOption: "bvn" | "nin";
}

export const checkNinUser = async ({
  userId,
  nin,
  email,
  address,
  bvn,
  selectedOption,
}: Prop) => {
  let requestData = {
    email,
    address,
    userId,
  };

  if (selectedOption === "nin") {
    requestData = {
      ...requestData,
      nin,
    } as typeof requestData & { nin: string };
  } else if (selectedOption === "bvn") {
    requestData = {
      ...requestData,
      bvn,
    } as typeof requestData & { bvn: string };
  }

  const response = await adminAxios.post(
    `/user/update_non_remita_users_details/${userId}`,
    requestData
  );

  return response?.data;
};

export const useCheckNinUser = (): UseMutationResult<
  any,
  unknown,
  Prop,
  unknown
> => useMutation(checkNinUser);
