import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";

interface UpdatePhysicianReportPayload {
  id: number;
  hospital_name: string;
  physician_name: string;
  physician_email?: string;
  physician_report: string;
  physician_license_number: string;
  physician_phone: string;
  date_issued: string;
  date_expires: string;
}

const updatePhysicianReport = async (payload: UpdatePhysicianReportPayload) => {
  const response = await adminAxios.put(
    `/dive-physician-report/${payload.id}/edit`,
    {
      hospital_name: payload.hospital_name,
      physician_name: payload.physician_name,
      physician_email: payload.physician_email,
      physician_report: payload.physician_report,
      physician_license_number: payload.physician_license_number,
      physician_phone: payload.physician_phone,
      date_issued: payload.date_issued,
      date_expires: payload.date_expires,
    }
  );
  return response.data;
};

export const useUpdatePhysicianReport = () => {
  return useMutation({
    mutationFn: updatePhysicianReport,
  });
};



