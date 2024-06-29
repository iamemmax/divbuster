import { adminAxios } from '@/lib/axios';
import { useMutation } from 'react-query';


interface planProp{
    verifiedPhoneNumber: string;
    amount: number,
    duration:number
}

export const makeRemitalPayment = async ({ verifiedPhoneNumber, amount,duration }: planProp) => {
    
  const response = await adminAxios.post(`life-insurance/remita-payment-confirmation/?phone_number=${verifiedPhoneNumber}`, {
       phone_number:verifiedPhoneNumber, 
    amount,
  duration
    
    });
    return response?.data;
};


export const useMakeRemitalPayment = () =>

  useMutation({
    mutationFn: makeRemitalPayment
  })







