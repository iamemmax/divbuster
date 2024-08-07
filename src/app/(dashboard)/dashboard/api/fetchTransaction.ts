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
// http://127.0.0.1:8000/life-insurance/transactions/?phone_number=09033531336