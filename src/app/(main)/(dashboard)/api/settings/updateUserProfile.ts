import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";

interface UserProp {
  data:{
    height: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: "Male" | "Female" | "Other";
  body_size: string;
  shoe_size: string;
  shoe_value: string;
  profile_picture: File;
  }
}

const updateUserProfile = async ({data:user}: UserProp) => {
  const formData = new FormData();

  formData.append("height", user.height);
  formData.append("email", user.email);
  formData.append("first_name", user.first_name);
  formData.append("last_name", user.last_name);
  formData.append("gender", user.gender);
  formData.append("body_size", user.body_size);
  formData.append("shoe_size", user.shoe_size);
  formData.append("shoe_value", user.shoe_value);

  if (user.profile_picture) {
    formData.append("profile_picture", user.profile_picture);
  }

  const response = await adminAxios.put(`/profile`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const useUpdateUserProfile = () => {
  return useMutation({
    mutationFn: updateUserProfile,
  });
};
