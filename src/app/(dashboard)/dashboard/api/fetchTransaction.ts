import { adminAxios } from "@/lib/axios";


interface TransactionType {
  transactions: TransactionTypes[];
  count: number;
}

export interface TransactionTypes {
  's/n': number;
  'date/time': string;
  type: string;
  mode: string;
  amount: number;
  reference_id: string;
  status: string;
}

export const    getTransaction = async (phone:string) => {
  const { data } = await adminAxios.get(`transactions/?phone_number=${phone}`);
  return data as TransactionType
};
