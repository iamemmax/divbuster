import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";

interface VerifyEmailParams {
  email: string;

  lang:string
}

/**
 * Verifies a user's email with the provided verification code
 * @param params Object containing email and verification code
 * @returns Promise with the API response
 */
const resendVerifyEmail = async (params: VerifyEmailParams) => {
  const { email, lang } = params;
  const response = await adminAxios.post("resend-verification", { email,lang:lang||"en" });
  return response.data;
};

/**
 * React Query hook for resend  email verification
 * @returns Mutation object for resend verifying email
 */
export const useResendVerifyEmail = () => {
  return useMutation({
    mutationFn: resendVerifyEmail,
   
  });
}
