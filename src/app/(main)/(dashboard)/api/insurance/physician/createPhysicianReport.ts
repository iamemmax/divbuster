import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";





interface prop {
  hospital_name: string;
  physician_name: string;
  physician_email: string;
  physician_report: string;
  physician_license_number: string;
  physician_phone: string;
  date_issued: string;
  date_expires: string;
}


const submitPhysicianReport = async (payload:prop) => {
 const response = await adminAxios.post(`/dive-physician-report/create`,payload);
    return response.data ;
}

export const useSubmitPhysicianReport = () => {
  return useMutation({
    mutationFn: submitPhysicianReport,
   
  });
};



