import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";


interface paymentProp {
  id: number;
  name: string;
  description: string;
  amount: string;
  coin_value: string;
  created_on: string;
  updated_on: string;
}
const fetchPaymentOptions = async () => {
 const response = await adminAxios.get(`payment-plans`);
    return response.data as paymentProp[];
}

export const useFetchPaymentOptions = () => {
  return useQuery({
    queryKey: ["payment-option"],
    queryFn: fetchPaymentOptions,
  });
};