import { adminAxios } from "@/lib/axios";


export interface TransactionTypes {
  id: number;
  created_at: string;
  updated_at: string;
  wallet_balance_before: number;
  amount: number;
  wallet_balance_after: number;
  account_number: string;
  wema_callback_data: string;
  paystack_callback_data: string;
  transaction_reference: string;
  transaction_status: string;
  transaction_type: string;
  transaction_source: string;
  is_verified: boolean;
  insurance_id: string;
  reason_for_transaction: string | string;
  is_deleted: boolean;
  date_created: string;
  date_updated: string;
  enrolee: string;
  wallet: string;
}

export const    getTransaction = async (phone:string, fiterStatus:string) => {
  let myResponse
  if(fiterStatus){
    const { data } = await adminAxios.get(`wallet/transactions/?status=${fiterStatus}`);
    myResponse = data 
  }else{
  
      const { data } = await adminAxios.get(`wallet/transactions/`);
      myResponse = data 
  }
  return myResponse as TransactionTypes[]
};
// http://127.0.0.1:8000/life-insurance/transactions/?phone_number=09033531336