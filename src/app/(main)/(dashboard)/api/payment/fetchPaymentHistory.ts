import { adminAxios } from "@/lib/axios";
import { useInfiniteQuery } from "react-query";

interface historyProp {
  detail: string;
  data: Data;
}

interface Data {
  count: number;
  next: string | null;
  previous: string | null;
  results: TransHistoryResult[];
}

interface TransHistoryResult {
  id: number;
  amount: number;
  direction: string;
  transaction_type: string;
  payment_method: string;
  transaction_status: string;
  payment_gateway: string;
  return_url: string;
  narration: string;
  reference: string;
  created_on: string;
  updated_on: string;
  plan: number;
}

const fetchPaymentHistory = async ({ pageParam = 1 }): Promise<Data> => {
  const response = await adminAxios.get(`payment-history?page=${pageParam}`);
  return response.data.data; // since your API response has { detail, data }
};

export const useFetchPaymentHistory = () => {
  return useInfiniteQuery<Data>({
    queryKey: ["payment-history"],
    queryFn: fetchPaymentHistory,
    getNextPageParam: (lastPage, pages) => {
      // if your API returns next page URL, extract page number
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        return url.searchParams.get("page"); // returns next page param
      }
      return undefined; // stop fetching when no next
    },
    getPreviousPageParam: (firstPage, pages) => {
      if (firstPage.previous) {
        const url = new URL(firstPage.previous);
        return url.searchParams.get("page");
      }
      return undefined;
    },
  });
};
