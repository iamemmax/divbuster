import { adminAxios } from "@/lib/axios"

interface user {
    data: Data
}

interface Data {
    name : string
    email : string
    phone_number : string
    state: string
    lga: string
    hospital: string
    bvn:string
    nin:string
}

export const UserDetails = async () => {
    const {data} = await adminAxios.patch('/update_user_details/')
    return data as user
}
