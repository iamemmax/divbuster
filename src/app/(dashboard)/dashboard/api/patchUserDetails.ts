import { adminAxios } from "@/lib/axios"

interface user {
    data: Data
}

interface Data {
    name : string
    email : string
    phone_number : string
}


export const userDetails = async () => {
    const {data} = await adminAxios.patch('/update_user_details/')
    return data as user
}
