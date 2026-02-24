import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";





interface prop {
  insurance_report: string;
  issuer_name: string;
  date_issued: string;
  start_date: string;
  end_date: string;
  policy_number: string;
}

const submiInsuranceDocument = async (payload:prop) => {
 const response = await adminAxios.post(`/dive-insurance-document/create`,payload);
    return response.data ;
}

export const useSubmiInsuranceDocument = () => {
  return useMutation({
    mutationFn: submiInsuranceDocument,
   
  });
};



