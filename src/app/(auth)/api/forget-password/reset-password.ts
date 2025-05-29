import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";

interface VerifyEmailParams {
  email: string;
otp:string;
password:string;

}

/**
 * add new password and otp to update password
 * @param params add new password and otp to update password
 * @returns Promise with the API response
 */
const UpdatePassword = async (params: VerifyEmailParams) => {
  const { email, otp,password } = params;
  const response = await adminAxios.post("reset-password", { email, otp,password });
  return response.data;
};

/**
 * React Query hook for resend  email verification
 * @returns Mutation object for resend verifying email
 */
export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: UpdatePassword,
   
  });
}
