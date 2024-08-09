import { adminAxios } from '@/lib/axios';
import { useMutation } from 'react-query';


interface  planProp{
  transaction_ref: string;
  password: string;
    confirm_password: string;
    email: string;
    selectedOption: "bvn" | "nin";
     nin: string;
  bvn: string;
}


export const updateReferralUser = async ({ transaction_ref,password,confirm_password,nin,bvn,selectedOption,email }: planProp) => {
  let requestData = {
    email, transaction_ref,password,confirm_password
  };

  if (selectedOption === "nin") {
    requestData = {
      ...requestData,
      nin,
    } as typeof requestData & { nin: string };
  } else if (selectedOption === "bvn") {
    requestData = {
      ...requestData,
      bvn,
    } as typeof requestData & { bvn: string };
  }


  const response = await adminAxios.post(`update_new_user_flow_password/`, requestData);
    return response?.data;
};


export const useUpdateReferralUser = () =>

  useMutation({
    mutationFn: updateReferralUser
  })

  

 





