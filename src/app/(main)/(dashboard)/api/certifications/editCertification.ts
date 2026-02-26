import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";

interface certificateProp {
  full_name: string;
  issuer: string;
  issuer_name: string;
  certificate_type: string;
  image: File | string;
  dob: string; // from <input type="date"> → "YYYY-MM-DD"
  issue_date: string;
  certificate_no: string;
  school_name: string;
  trainer_name: string;
  trainer_phone: string;
  lang: string;
  id:string;
  default: boolean;
}

const toISODate = (date: string) => {
  if (!date) return "";
  // Convert "YYYY-MM-DD" → "YYYY-MM-DDT00:00:00Z"
  return new Date(date).toISOString();
};

const updateCertification = async ({
  certificate_no,
  certificate_type,
  dob,
  full_name,
  image,
  issue_date,
  issuer,
  issuer_name,
  school_name,
  trainer_name,
  trainer_phone,
  lang,
  id,
  default: isDefault
}: certificateProp) => {
  const formData = new FormData();

  formData.append("certificate_no", certificate_no);
  formData.append("certificate_type", certificate_type);
  formData.append("dob", toISODate(dob));
  formData.append("full_name", full_name);
  formData.append("issue_date", toISODate(issue_date));
  formData.append("issuer", issuer);
  formData.append("issuer_name", issuer);
  formData.append("school_name", school_name);
  formData.append("trainer_name", trainer_name);
  formData.append("trainer_phone", trainer_phone);
  formData.append("lang", lang);
  if (isDefault !== undefined) {
    formData.append("default", String(isDefault));
  }

  if (image && image instanceof File) {
    formData.append("image", image);
  }

  const response = await adminAxios.put(`/certificates/edit/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const useUpdateCertification = () => {
  return useMutation({
    mutationFn: updateCertification,
  });
};
