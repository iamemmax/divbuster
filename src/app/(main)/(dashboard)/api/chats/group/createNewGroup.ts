import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";

interface Prop {
 
     name: string;
  image: any; // image should be a File (from <input type="file" />)
  members: string; // comma separated string e.g. "1,2,3,4"
  description?: string;
  lang?: string;
 
}

const createNewGroup = async ({description,image,lang,members,name} : Prop) => {

    const formData = new FormData();

  formData.append("name", name);
  formData.append("description", description as string);
  if(lang){
    formData.append("lang", lang as string);

  }
  formData.append("members", members); // string separated with comma
  if (image) {
    formData.append("image", image);
  }

  const response = await adminAxios.post(`group-chat/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const useCreateNewGroup = () => {
  return useMutation({
    mutationFn: createNewGroup,
  });
};
