// {{local_base_url}}/wallet/wallet/confirmed_transfer/?phone_number=07089887465




import { adminAxios } from "@/lib/axios";



export const confirmTransfer = async (phone:string) => {
    const {data} = await adminAxios.get(`wallet/confirmed_transfer/?phone_number=${phone}`);
    return data 
     
};

