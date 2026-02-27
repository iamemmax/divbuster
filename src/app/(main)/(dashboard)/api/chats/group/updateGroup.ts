import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";

interface Prop {
  id: string;
  name: string;
  image: any; // image should be a File (from <input type="file" />)
  members: string; // comma separated string e.g. "1,2,3,4"
  description?: string;
  lang?: string;

}

const updateGroupChat = async ({ description, image, lang, members, name, id }: Prop) => {

  const formData = new FormData();

  formData.append("name", name);
  formData.append("description", description as string);
  formData.append("members", members); // string separated with comma
  if (image) {
    formData.append("image", image);
  }
  if (lang) {
    formData.append("lang", lang as string);

  }

  const response = await adminAxios.put(`group-chat/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const useUpdateGroupChat = () => {
  return useMutation({
    mutationFn: updateGroupChat,
  });
};
