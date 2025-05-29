import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";

// Define the signup payload type
export interface SignupPayload {
  first_name: string;
  last_name: string;
  password: string;
  phone_number: string;
  nickname: string;
  email: string;
  lang: string;
  dob: string;
  profile_picture: File | null;
  account_type: string;
  referral_code: string;
  body_size: string;
//   height: string;
  measurement_unit: string;
  temp_choice: string;
  shoe_size: string;
  shoe_value: number;
  diver_type: string;
  country_id: number;
  actionType?:string
  
}

// Define the signup response type
interface SignupResponse {
  status: string;
  message: string;
  data: {
    id: number;
    email: string;
    // Add other fields as needed
  };
}

// Function to handle signup
const signup = async (payload: SignupPayload): Promise<SignupResponse> => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (key === 'profile_picture') {
      // Only append profile_picture if account_type is not "skip"
      if (payload.actionType !== 'skip' && value instanceof File) {
        formData.append(key, value);
      }
    } else if (value !== null && value !== undefined) {
      formData.append(key, String(value));
    }
  });

  const response = await adminAxios.post<SignupResponse>("register", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};


// React Query hook for signup
export const useSignup = () => {
  return useMutation({
    mutationFn: signup
  });
}
