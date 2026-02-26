import { adminAxios } from "@/lib/axios";
import { useInfiniteQuery } from "react-query";

interface certificationProp {
  count: number;
  next: string | null;
  previous: string | null;
  results: certificateResult[];
}

export interface certificateResult {
  id: number;
  image: string;
  certification_no: string;
  trainer_no: string;
  full_name: string;
  issuer: string;
  issuer_name: string;
  certificate_type: string;
  issue_date: string;
  date_of_birth: string;
  school_name: string;
  trainer_name: string;
  created_on: string;
  default: boolean;
}

const fetchCertifications = async ({
  pageParam = "/certificates", // default first page
}: {
  pageParam?: string;
}): Promise<certificationProp> => {
  const response = await adminAxios.get(pageParam);
  return response.data as certificationProp;
};

export const useFetchCertifications = () => {
  return useInfiniteQuery<certificationProp>({
    queryKey: ["fetch-certifications"],
    queryFn: fetchCertifications,
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    getPreviousPageParam: (firstPage) => firstPage.previous ?? undefined,
  });
};
