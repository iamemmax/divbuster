import { adminAxios } from '@/lib/axios';
import { useMutation } from 'react-query';


type contactformProps = {
    email: string;
    message: string;
    fullname: string;
    phone_number: string;
 
}
export const SendMessages = async ({ email,fullname,message,phone_number }: contactformProps) => {
    
  const response = await adminAxios.post(`/user/contact_us/`, {
        email,
        fullname,
        message,
        phone_number
    });
    return response?.data;
};


export const useSendMessages = () =>

  useMutation({
    mutationFn: SendMessages
  })






