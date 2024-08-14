import { adminAxios } from "@/lib/axios"
import { useMutation } from "react-query"


interface UserDetailsDTO {
    name : string
    email : string
    phone_number : string
    state: string
    lga: string
    hospital: string
    bvn:string
    nin:string
}

export const updateUserDetails = async ({ name, email, bvn, hospital,lga, nin, phone_number, state}: UserDetailsDTO) => {
    const response = await adminAxios.patch('/user/update_user_details/', {
        
        name, email, bvn, hospital,lga, nin, phone_number, state
    })
    return response?.data
}


export const useUpdateUserDetails = () =>

    useMutation({
      mutationFn: updateUserDetails
    })
    