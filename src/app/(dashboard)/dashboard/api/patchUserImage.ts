import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";


export const updateUserImage = async ( file:any ) => {
    console.log(file);
    
    const formData = new FormData()
    formData.append('file', file)
    const response = await adminAxios.patch('user/update_user_profile_image/', formData)
    return response?.data
}

export const useUpdateUserImage = () => 
    useMutation ({
        mutationFn: updateUserImage
    })

