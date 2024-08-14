import { adminAxios } from "@/lib/axios"
import { useQuery } from "react-query";

interface DetailsResponse {
    data: Details
    }

interface Details{
    name: string
    email: string;
    phone: string;
}



export const getUserDetails = async (phone:string) => {
    const { data } = await adminAxios.get(`get-user-details/?phone_number=${phone}`)
    return data as DetailsResponse
}

export const useGetUserDetails = (phone:string) =>
    useQuery("user-details-phone-number", () => getUserDetails(phone), { retry: 2 });