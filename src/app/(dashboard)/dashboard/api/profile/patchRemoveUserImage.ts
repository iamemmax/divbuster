import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";

// Define the function to update the user's image
export const updateRemoveUserImage = async (file:  string) => {
   
  try {
    // Send the request to update the user profile image
    const response = await adminAxios.patch('user/delete_user_profile_image/',file);
    return response?.data; // Return the response data
  } catch (error) {
    throw new Error("Failed to update profile image: " + error);
  }
};

// Custom hook for handling the user image update mutation
export const useUpdateRemoveUserImage = () => {
  return useMutation({
    mutationFn: updateRemoveUserImage,
  });
};
