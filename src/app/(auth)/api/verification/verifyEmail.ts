import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";

interface VerifyEmailParams {
  email: string;
  token: string;
  lang:string
}

/**
 * Verifies a user's email with the provided verification code
 * @param params Object containing email and verification code
 * @returns Promise with the API response
 */
const verifyEmail = async (params: VerifyEmailParams) => {
  const { email, token,lang } = params;
  const response = await adminAxios.post("email-verification", { email, token,lang });
  return response.data;
};

/**
 * React Query hook for email verification
 * @returns Mutation object for verifying email
 */
export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmail,
   
  });
}
