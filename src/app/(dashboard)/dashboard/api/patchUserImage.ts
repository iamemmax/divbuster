import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";

interface Prop{
    profile_image: {
        img_id: string;
        img_url: string;
    }
}
export const updateUserImage = async ( {profile_image:{img_id,img_url}}:Prop ) => {
    // console.log(file);
    
    // const formData = new FormData()
    // formData.append('file', file)
    const response = await adminAxios.patch('user/update_user_profile_image/', {profile_image:{
        img_id,
        img_url
    }})
    return response?.data
}

export const useUpdateUserImage = () => 
    useMutation ({
        mutationFn: updateUserImage
    })

